// Vocabulary: [word, pos, level, fr, englishGloss, exampleIds, freqRank]
export type Word = { id: string; w: string; pos: string; lv: number; fr: string; gl: string; ex: number[]; f: number; i: number }
export type Sentence = { en: string; fr: string; lv: number; i: number }
let W: Word[] = [], S: Sentence[] = []
let loading: Promise<void> | null = null
export const posLabel: Record<string, string> = { n: 'nom', adj: 'adjectif', v: 'verbe', adv: 'adverbe', pron: 'pronom', 'prép': 'préposition', 'dét': 'déterminant', conj: 'conjonction', num: 'nombre', interj: 'interjection', part: 'particule' }
export function loadData(): Promise<void> {
  if (loading) return loading
  loading = Promise.all([
    fetch('data/words.json').then(r => { if (!r.ok) throw new Error('words'); return r.json() }),
    fetch('data/sentences.json').then(r => { if (!r.ok) throw new Error('sentences'); return r.json() }),
  ]).then(([w, s]: [any[], any[]]) => {
    W = w.map((x, i) => ({ id: x[0] + '|' + x[1], w: x[0], pos: x[1], lv: x[2], fr: x[3], gl: x[4], ex: x[5], f: x[6], i }))
    S = s.map((x, i) => ({ en: x[0], fr: x[1], lv: x[2], i }))
    byLv = [1, 2, 3, 4, 5, 6].map(l => W.filter(x => x.lv === l))
    sByLv = [1, 2, 3, 4, 5, 6].map(l => S.filter(x => x.lv === l))
    byId = new Map(W.map(x => [x.id, x]))
  }).catch(e => { loading = null; throw e })
  return loading
}
let byLv: Word[][] = [], sByLv: Sentence[][] = [], byId = new Map<string, Word>()
export const allWords = () => W
export const allSentences = () => S
export const wordsOfLevel = (lv: number) => byLv[lv - 1] || []
export const sentencesOfLevel = (lv: number) => sByLv[lv - 1] || []
export const sentencesUpTo = (lv: number) => sByLv.slice(0, lv).flat()
export const wordById = (id: string) => byId.get(id)
export const PACK = 20
export const packsOfLevel = (lv: number) => { const ws = wordsOfLevel(lv); const out: Word[][] = []; for (let i = 0; i < ws.length; i += PACK) out.push(ws.slice(i, i + PACK)); return out }
export const firstFr = (w: Word) => w.fr.split(' · ')[0].replace(/\s*\((m|f|m\/f)\)$/, '')
