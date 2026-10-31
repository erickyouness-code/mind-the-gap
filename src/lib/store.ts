import { useSyncExternalStore } from 'react'
import { today } from './util'

export type Card = [box: number, due: number, seen: number, wrong: number]
export interface Settings { accent: 'en-US' | 'en-GB'; rate: number; theme: 'system' | 'light' | 'dark'; goal: number; sound: boolean }
export interface State {
  v: 1; createdAt: number; updatedAt: number
  name: string; level: number; placed: boolean
  xp: number; streak: number; lastDay: number; freeze: number
  daily: Record<string, number>
  lessons: Record<string, number>        // best % per lesson
  srs: Record<string, Card>             // word id -> card
  games: Record<string, number>         // best score per game
  badges: string[]
  answers: number; correct: number
  settings: Settings
}
const KEY = 'mtg-state-v1'
const fresh = (): State => ({
  v: 1, createdAt: Date.now(), updatedAt: Date.now(), name: '', level: 1, placed: false,
  xp: 0, streak: 0, lastDay: 0, freeze: 1, daily: {}, lessons: {}, srs: {}, games: {}, badges: [],
  answers: 0, correct: 0,
  settings: { accent: 'en-US', rate: 0.95, theme: 'system', goal: 50, sound: true },
})
function load(): State {
  try { const s = localStorage.getItem(KEY); if (s) { const p = JSON.parse(s); return { ...fresh(), ...p, settings: { ...fresh().settings, ...p.settings } } } } catch { /* storage unavailable */ }
  return fresh()
}
let state: State = load()
const subs = new Set<() => void>()
let saveTimer: any
export const getState = () => state
export function setState(fn: (s: State) => Partial<State> | void, opts: { silent?: boolean } = {}) {
  const draft: State = { ...state }
  const patch = fn(draft)
  state = { ...draft, ...(patch || {}), updatedAt: Date.now() }
  subs.forEach(f => f())
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ } ; if (!opts.silent) onSaved.forEach(f => f(state)) }, 400)
}
export function replaceState(s: State) { state = { ...fresh(), ...s, settings: { ...fresh().settings, ...s.settings } }; subs.forEach(f => f()); try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ } }
export const onSaved = new Set<(s: State) => void>()
export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(cb => { subs.add(cb); return () => subs.delete(cb) }, () => sel(state))
}
export function resetAll() { replaceState(fresh()); onSaved.forEach(f => f(state)) }

// ---------- XP, streak, badges
export const xpLevel = (xp: number) => { let lvl = 1, need = 100, acc = 0; while (xp >= acc + need) { acc += need; lvl++; need = Math.round(need * 1.18) } return { lvl, into: xp - acc, need } }
let toastFn: ((t: { title: string; sub?: string; kind?: string }) => void) | null = null
export const setToaster = (f: typeof toastFn) => { toastFn = f }
export const toast = (title: string, sub?: string, kind = 'info') => toastFn?.({ title, sub, kind })

export function addXp(n: number) {
  const d = today()
  setState(s => {
    let { streak, lastDay, freeze } = s
    if (lastDay !== d) {
      if (lastDay === d - 1) streak += 1
      else if (lastDay === d - 2 && freeze > 0) { streak += 1; freeze -= 1 }
      else streak = 1
      lastDay = d
      if (streak % 7 === 0) freeze = Math.min(3, freeze + 1)
    }
    const daily: Record<string, number> = { ...s.daily, [d]: (s.daily[d] || 0) + n }
    const keys = Object.keys(daily).map(Number).sort((a, b) => a - b)
    while (keys.length > 400) delete daily[keys.shift()!]
    return { xp: s.xp + n, streak, lastDay, freeze, daily }
  })
  checkBadges()
}
export function recordAnswer(ok: boolean) { setState(s => ({ answers: s.answers + 1, correct: s.correct + (ok ? 1 : 0) }), { silent: true }) }

// ---------- spaced repetition (Leitner-style, boxes 0..8)
const INTERVALS = [0, 1, 2, 4, 7, 14, 30, 60, 120]
export const MASTERED = 5
export function review(id: string, ok: boolean, easy = false) {
  setState(s => {
    const c: Card = s.srs[id] ? [...s.srs[id]] as Card : [0, today(), 0, 0]
    if (ok) c[0] = Math.min(8, c[0] + (easy ? 2 : 1)); else { c[0] = Math.max(0, c[0] - 2); c[3]++ }
    c[1] = today() + (ok ? INTERVALS[c[0]] : 0)
    c[2]++
    return { srs: { ...s.srs, [id]: c } }
  })
}
export const dueIds = (s: State) => { const d = today(); return Object.entries(s.srs).filter(([, c]) => c[1] <= d).map(([k]) => k) }
export const learnedCount = (s: State) => Object.keys(s.srs).length
export const masteredCount = (s: State) => Object.values(s.srs).filter(c => c[0] >= MASTERED).length

export function finishLesson(id: string, pct: number) {
  setState(s => ({ lessons: { ...s.lessons, [id]: Math.max(pct, s.lessons[id] || 0) } }))
  checkBadges()
}
export function gameScore(id: string, score: number) {
  const best = state.games[id] || 0
  if (score > best) setState(s => ({ games: { ...s.games, [id]: score } }))
  return score > best
}

export const BADGES: { id: string; name: string; desc: string; test: (s: State) => boolean }[] = [
  { id: 'first', name: 'Premier pas', desc: 'Gagner tes premiers XP', test: s => s.xp > 0 },
  { id: 'w50', name: '50 mots', desc: 'Apprendre 50 mots', test: s => learnedCount(s) >= 50 },
  { id: 'w250', name: '250 mots', desc: 'Apprendre 250 mots', test: s => learnedCount(s) >= 250 },
  { id: 'w1000', name: 'Mille mots', desc: 'Apprendre 1 000 mots', test: s => learnedCount(s) >= 1000 },
  { id: 'w3000', name: 'Vocabulaire solide', desc: 'Apprendre 3 000 mots', test: s => learnedCount(s) >= 3000 },
  { id: 'm100', name: 'Mémoire d’acier', desc: 'Maîtriser 100 mots', test: s => masteredCount(s) >= 100 },
  { id: 's3', name: 'Lancé', desc: '3 jours d’affilée', test: s => s.streak >= 3 },
  { id: 's7', name: 'Une semaine', desc: '7 jours d’affilée', test: s => s.streak >= 7 },
  { id: 's30', name: 'Un mois', desc: '30 jours d’affilée', test: s => s.streak >= 30 },
  { id: 'l1', name: 'Grammairien', desc: 'Terminer une leçon de grammaire', test: s => Object.values(s.lessons).filter(v => v >= 60).length >= 1 },
  { id: 'l10', name: 'Dix leçons', desc: 'Terminer 10 leçons', test: s => Object.values(s.lessons).filter(v => v >= 60).length >= 10 },
  { id: 'perfect', name: 'Sans faute', desc: '100 % à une leçon', test: s => Object.values(s.lessons).some(v => v >= 100) },
  { id: 'x1000', name: '1 000 XP', desc: 'Cumuler 1 000 XP', test: s => s.xp >= 1000 },
  { id: 'x10000', name: '10 000 XP', desc: 'Cumuler 10 000 XP', test: s => s.xp >= 10000 },
  { id: 'gamer', name: 'Joueur', desc: 'Jouer à 5 jeux différents', test: s => Object.keys(s.games).length >= 5 },
]
export function checkBadges() {
  const s = state
  const got = BADGES.filter(b => !s.badges.includes(b.id) && b.test(s))
  if (got.length) {
    setState(st => ({ badges: [...st.badges, ...got.map(b => b.id)] }))
    got.forEach(b => toast('Badge débloqué : ' + b.name, b.desc, 'badge'))
  }
}
