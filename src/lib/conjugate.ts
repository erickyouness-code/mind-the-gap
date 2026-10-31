import IRR from '../content/irregular.json'
export const irregulars = IRR as [string, string, string, string, number][]
const irr = new Map(irregulars.map(v => [v[0], v]))
const DOUBLE2 = new Set(['begin', 'prefer', 'refer', 'admit', 'occur', 'permit', 'forget', 'regret', 'control', 'commit', 'upset', 'omit', 'compel', 'equip', 'submit', 'transfer', 'patrol', 'expel', 'propel', 'deter', 'incur', 'recur', 'confer', 'infer', 'abhor'])
const vowels = (w: string) => (w.match(/[aeiouy]+/g) || []).length
function cvc(w: string) {
  if (/[wxy]$/.test(w)) return false
  if (!/[^aeiou][aeiou][^aeiou]$/.test(w)) return false
  return vowels(w) === 1 || DOUBLE2.has(w)
}
export function ing(v: string) {
  if (v === 'be') return 'being'
  if (/ie$/.test(v)) return v.slice(0, -2) + 'ying'
  if (/[^aeiouy]e$/.test(v) && !/(ee|ye|oe)$/.test(v) && v !== 'be') return v.slice(0, -1) + 'ing'
  if (/c$/.test(v) && /(panic|picnic|traffic|mimic)$/.test(v)) return v + 'king'
  if (cvc(v)) return v + v.slice(-1) + 'ing'
  return v + 'ing'
}
export function third(v: string) {
  if (v === 'be') return 'is'
  if (v === 'have') return 'has'
  if (/(s|ss|sh|ch|x|z|o)$/.test(v)) return v + 'es'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies'
  return v + 's'
}
function edReg(v: string) {
  if (/e$/.test(v)) return v + 'd'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied'
  if (cvc(v)) return v + v.slice(-1) + 'ed'
  if (/c$/.test(v) && /(panic|picnic|traffic|mimic)$/.test(v)) return v + 'ked'
  return v + 'ed'
}
export const past = (v: string) => irr.get(v)?.[1].split('/')[0] ?? edReg(v)
export const pp = (v: string) => irr.get(v)?.[2].split('/')[0] ?? edReg(v)
export const isIrregular = (v: string) => irr.has(v)

export const PERSONS = ['I', 'you', 'he/she/it', 'we', 'you', 'they']
export type Form = 'aff' | 'neg' | 'q'
export interface Tense { id: string; name: string; fr: string; group: 'present' | 'past' | 'future' | 'conditional'; use: string; formula: string; lesson?: string; example: [string, string] }
export const TENSES: Tense[] = [
  { id: 'ps', name: 'Present simple', fr: 'Présent simple', group: 'present', use: 'Habitudes, vérités générales, états', formula: 'base (+ s à la 3e pers.)', lesson: 'present-simple', example: ['She works in a hospital.', 'Elle travaille dans un hôpital.'] },
  { id: 'pc', name: 'Present continuous', fr: 'Présent continu', group: 'present', use: 'Action en cours, situation temporaire, futur organisé', formula: 'am/is/are + -ing', lesson: 'present-continuous', example: ["I'm reading a great book.", 'Je lis un super livre en ce moment.'] },
  { id: 'pp', name: 'Present perfect', fr: 'Present perfect', group: 'present', use: 'Expérience, résultat présent, « depuis »', formula: 'have/has + participe passé', lesson: 'present-perfect', example: ["I've lived here for five years.", "J'habite ici depuis cinq ans."] },
  { id: 'ppc', name: 'Present perfect continuous', fr: 'Present perfect continu', group: 'present', use: 'Durée d’une activité jusqu’à maintenant', formula: 'have/has been + -ing', lesson: 'present-perfect-continuous', example: ["It's been raining all day.", 'Il pleut depuis ce matin.'] },
  { id: 'pas', name: 'Past simple', fr: 'Prétérit', group: 'past', use: 'Action terminée à un moment précis du passé', formula: 'verbe + ed / forme irrégulière', lesson: 'past-simple', example: ['We visited Rome last year.', "Nous avons visité Rome l'an dernier."] },
  { id: 'pac', name: 'Past continuous', fr: 'Passé continu', group: 'past', use: 'Action en cours dans le passé, décor d’un récit', formula: 'was/were + -ing', lesson: 'past-continuous', example: ['I was sleeping when you called.', 'Je dormais quand tu as appelé.'] },
  { id: 'pap', name: 'Past perfect', fr: 'Plus-que-parfait', group: 'past', use: 'Action antérieure à une autre action passée', formula: 'had + participe passé', lesson: 'past-perfect', example: ['The film had started when we arrived.', 'Le film avait commencé quand nous sommes arrivés.'] },
  { id: 'papc', name: 'Past perfect continuous', fr: 'Past perfect continu', group: 'past', use: 'Durée avant un moment du passé', formula: 'had been + -ing', lesson: 'past-perfect', example: ['She had been waiting for an hour.', 'Elle attendait depuis une heure.'] },
  { id: 'fs', name: 'Future simple (will)', fr: 'Futur avec will', group: 'future', use: 'Décision spontanée, prédiction, promesse', formula: 'will + base', lesson: 'future-will-going', example: ["I'll call you tomorrow.", "Je t'appellerai demain."] },
  { id: 'gt', name: 'Be going to', fr: 'Futur proche (going to)', group: 'future', use: 'Intention, prédiction avec indice', formula: 'am/is/are going to + base', lesson: 'future-will-going', example: ["It's going to rain.", 'Il va pleuvoir.'] },
  { id: 'fc', name: 'Future continuous', fr: 'Futur continu', group: 'future', use: 'Action en cours à un moment du futur', formula: 'will be + -ing', lesson: 'future-continuous-perfect', example: ["This time tomorrow I'll be flying to Rome.", "Demain à cette heure-ci, je serai dans l'avion pour Rome."] },
  { id: 'fp', name: 'Future perfect', fr: 'Futur antérieur', group: 'future', use: 'Action terminée avant un moment futur', formula: 'will have + participe passé', lesson: 'future-continuous-perfect', example: ["I'll have finished by 6.", "J'aurai fini avant 18 h."] },
  { id: 'fpc', name: 'Future perfect continuous', fr: 'Futur antérieur continu', group: 'future', use: 'Durée jusqu’à un moment futur', formula: 'will have been + -ing', lesson: 'future-continuous-perfect', example: ["By June I'll have been working here for a year.", 'En juin, ça fera un an que je travaille ici.'] },
  { id: 'cd', name: 'Conditional (would)', fr: 'Conditionnel présent', group: 'conditional', use: 'Hypothèse, politesse', formula: 'would + base', lesson: 'conditional-2', example: ['I would travel more if I could.', 'Je voyagerais plus si je pouvais.'] },
  { id: 'cdc', name: 'Conditional continuous', fr: 'Conditionnel continu', group: 'conditional', use: 'Hypothèse sur une action en cours', formula: 'would be + -ing', lesson: 'conditional-2', example: ["If I were rich, I'd be living in Bali.", 'Si j’étais riche, je vivrais à Bali.'] },
  { id: 'cdp', name: 'Conditional perfect', fr: 'Conditionnel passé', group: 'conditional', use: 'Regret, hypothèse sur le passé', formula: 'would have + participe passé', lesson: 'conditional-3-mixed', example: ['I would have come if I had known.', 'Je serais venu si j’avais su.'] },
]
const beP = ['am', 'are', 'is', 'are', 'are', 'are'], beS = ['was', 'were', 'was', 'were', 'were', 'were'], hv = ['have', 'have', 'has', 'have', 'have', 'have']
const subj = (i: number) => PERSONS[i] === 'he/she/it' ? 'he' : PERSONS[i]
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)
export function conj(v: string, t: string, form: Form, i: number): string {
  const S = subj(i), base = v, g = ing(v), P = pp(v)
  const aux = (a: string, rest: string, negA: string) => form === 'aff' ? `${S} ${a} ${rest}` : form === 'neg' ? `${S} ${negA} ${rest}` : `${cap(a)} ${S} ${rest}?`
  const isBe = v === 'be'
  switch (t) {
    case 'ps':
      if (isBe) return form === 'aff' ? `${S} ${beP[i]}` : form === 'neg' ? `${S} ${beP[i]} not` : `${cap(beP[i])} ${S}?`
      return form === 'aff' ? `${S} ${i === 2 ? third(v) : base}` : form === 'neg' ? `${S} ${i === 2 ? "doesn't" : "don't"} ${base}` : `${i === 2 ? 'Does' : 'Do'} ${S} ${base}?`
    case 'pc': return aux(beP[i], g, beP[i] + ' not')
    case 'pp': return aux(hv[i], P, hv[i] === 'has' ? "hasn't" : "haven't")
    case 'ppc': return aux(hv[i], 'been ' + g, hv[i] === 'has' ? "hasn't" : "haven't")
    case 'pas':
      if (isBe) return form === 'aff' ? `${S} ${beS[i]}` : form === 'neg' ? `${S} ${beS[i]}n't` : `${cap(beS[i])} ${S}?`
      return form === 'aff' ? `${S} ${irr.get(v)?.[1] ?? edReg(v)}` : form === 'neg' ? `${S} didn't ${base}` : `Did ${S} ${base}?`
    case 'pac': return aux(beS[i], g, beS[i] + "n't")
    case 'pap': return aux('had', P, "hadn't")
    case 'papc': return aux('had', 'been ' + g, "hadn't")
    case 'fs': return aux('will', base, "won't")
    case 'gt': return aux(beP[i], 'going to ' + base, beP[i] + ' not')
    case 'fc': return aux('will', 'be ' + g, "won't")
    case 'fp': return aux('will', 'have ' + P, "won't")
    case 'fpc': return aux('will', 'have been ' + g, "won't")
    case 'cd': return aux('would', base, "wouldn't")
    case 'cdc': return aux('would', 'be ' + g, "wouldn't")
    case 'cdp': return aux('would', 'have ' + P, "wouldn't")
  }
  return ''
}
export const fixI = (s: string) => s.replace(/^i /, 'I ')
