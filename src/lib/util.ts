export const LEVELS = [
  { n: 1, code: 'A1', name: 'Découverte', color: 'var(--l1)' },
  { n: 2, code: 'A2', name: 'Survie', color: 'var(--l2)' },
  { n: 3, code: 'B1', name: 'Seuil', color: 'var(--l3)' },
  { n: 4, code: 'B2', name: 'Avancé', color: 'var(--l4)' },
  { n: 5, code: 'C1', name: 'Autonome', color: 'var(--l5)' },
  { n: 6, code: 'C2', name: 'Maîtrise', color: 'var(--l6)' },
]
export const lvCode = (n: number) => LEVELS[n - 1]?.code ?? '?'
export const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000)
export function shuffle<T>(a: T[]): T[] { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]] } return r }
export const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]
export function sample<T>(a: T[], n: number): T[] { return shuffle(a).slice(0, n) }
export function norm(s: string) {
  return s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?,;:"«»()]/g, ' ').replace(/\s+/g, ' ').trim()
}
export function stripAccents(s: string) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '') }
export function closeEnough(input: string, target: string) {
  const a = stripAccents(norm(input)), b = stripAccents(norm(target))
  if (a === b) return true
  return b.length > 5 && lev(a, b) <= 1
}
export function lev(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}
export const tokens = (s: string) => s.match(/[A-Za-z0-9]+(?:['’][A-Za-z]+)?|[^\sA-Za-z0-9]/g) || []
export const words = (s: string) => s.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []
