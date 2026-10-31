import type { Q } from '../ui/Quiz'
import { gapPrompt } from '../ui/Quiz'
import { allSentences, firstFr, wordsOfLevel, type Word } from './data'
import { review } from './store'
import { sample, shuffle, pick } from './util'
import { posLabel } from './data'

function distractors(w: Word, n: number, key: (x: Word) => string, pool?: Word[]) {
  const src = (pool && pool.length > 12 ? pool : wordsOfLevel(w.lv)).filter(x => x.id !== w.id && key(x) !== key(w))
  const samePos = src.filter(x => x.pos === w.pos)
  const base = samePos.length > n * 3 ? samePos : src
  const out: string[] = []
  for (const x of shuffle(base)) { const k = key(x); if (!out.includes(k) && k !== key(w)) out.push(k); if (out.length >= n) break }
  return out
}
const POSMEANING = (w: Word) => <span className="pos">{posLabel[w.pos] || w.pos}</span>

export function exampleGap(w: Word): { q: string; en: string; fr: string } | null {
  const S = allSentences()
  for (const i of w.ex) {
    const s = S[i]; if (!s) continue
    const re = new RegExp(`\\b(${w.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i')
    if (re.test(s.en)) return { q: s.en.replace(re, '___'), en: s.en, fr: s.fr }
  }
  return null
}

export function wordQuestion(w: Word, mode: 'en-fr' | 'fr-en' | 'listen' | 'type' | 'gap' | 'auto', pool?: Word[], srs = true): Q {
  if (mode === 'auto') mode = pick(['en-fr', 'en-fr', 'fr-en', 'listen', 'type', 'gap'] as const)
  const onResult = srs ? (ok: boolean) => review(w.id, ok) : undefined
  if (mode === 'gap') {
    const g = exampleGap(w)
    if (g) return { kind: 'choice', label: 'Complète la phrase', prompt: <>{gapPrompt(g.q)}<div className="small muted" style={{ fontFamily: 'var(--f-body)', fontWeight: 400, marginTop: 8 }}>{g.fr}</div></>, options: shuffle([w.w, ...distractors(w, 3, x => x.w, pool)]), answer: w.w, why: <>« {w.w} » = {w.fr}</>, onResult }
    mode = 'en-fr'
  }
  if (mode === 'en-fr') return { kind: 'choice', label: 'Que signifie ce mot ?', say: w.w, prompt: <>{w.w} {POSMEANING(w)}</>, options: shuffle([firstFr(w), ...distractors(w, 3, firstFr, pool)]), answer: firstFr(w), why: <>Toutes les traductions : {w.fr}</>, onResult }
  if (mode === 'fr-en') return { kind: 'choice', label: 'Comment dit-on en anglais ?', prompt: <>{firstFr(w)} {POSMEANING(w)}</>, options: shuffle([w.w, ...distractors(w, 3, x => x.w, pool)]), answer: w.w, sayOptions: true, onResult }
  if (mode === 'listen') return { kind: 'choice', label: 'Écoute et choisis le mot entendu', say: w.w, prompt: <span className="muted">Appuie sur le haut-parleur pour réécouter</span>, options: shuffle([w.w, ...distractors(w, 3, x => x.w, pool)]), answer: w.w, why: <>{w.w} = {w.fr}</>, onResult }
  return { kind: 'type', label: 'Écris le mot anglais', prompt: <>{firstFr(w)} {POSMEANING(w)}</>, answers: [[w.w]], why: <>{w.w} = {w.fr}</>, placeholder: 'en anglais…', onResult }
}
export function vocabSession(ws: Word[], pool?: Word[]): Q[] {
  const modes = ['en-fr', 'fr-en', 'listen', 'gap', 'type'] as const
  return shuffle(ws).map((w, i) => wordQuestion(w, modes[i % modes.length], pool))
}
export { sample }
