import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import { Back, LvTag } from '../ui/common'
import { QuizRunner, type Q } from '../ui/Quiz'
import { lessonsByLevel } from '../lib/lesson'
import { wordsOfLevel } from '../lib/data'
import { wordQuestion } from '../lib/questions'
import { exToQ } from './Lesson'
import { gameScore, setState, toast, useStore } from '../lib/store'
import { LEVELS, sample, shuffle } from '../lib/util'
import { go } from '../ui/router'

function levelQuestions(lv: number, nGram: number, nVoc: number): Q[] {
  const ex = lessonsByLevel(lv).flatMap(l => l.exercises.filter(e => e.k === 'qcm'))
  const ws = wordsOfLevel(lv).filter(w => w.f < 30000)
  const pool = ws.length > 40 ? ws : wordsOfLevel(lv)
  return shuffle([...sample(ex, nGram).map(exToQ), ...sample(pool, nVoc).map(w => wordQuestion(w, 'en-fr', pool, false))])
}

export function Placement() {
  const [stage, setStage] = useState(0) // 0 = intro, 1..6 levels, 7 = result
  const [result, setResult] = useState(1)
  const [last, setLast] = useState({ c: 0, t: 1 })
  const qs = useMemo(() => stage >= 1 && stage <= 6 ? levelQuestions(stage, 3, 3) : [], [stage])
  if (stage === 0) return <div className="page"><Back to="accueil" label="Accueil" />
    <div className="card pad-lg stack" style={{ maxWidth: 640 }}>
      <div className="eyebrow">Test de niveau · environ 5 minutes</div>
      <h1>Trouvons ta ligne de départ</h1>
      <p>Le test monte de niveau en niveau, de A1 à C2. À chaque étape : 6 questions de grammaire et de vocabulaire. Il s’arrête dès qu’une étape devient trop difficile. Réponds sans dictionnaire, et si tu ne sais pas, choisis au hasard plutôt que de deviner trop.</p>
      <div className="row">{LEVELS.map(L => <LvTag key={L.n} lv={L.n} />)}</div>
      <button className="btn edge" onClick={() => setStage(1)}><Icon n="target" s={18} />Commencer le test</button>
    </div></div>
  if (stage === 7) return <div className="page"><div className="card pad-lg result" style={{ maxWidth: 640, margin: '0 auto' }}>
    <div className="eyebrow">Résultat du test</div>
    <div className="line-roundel" style={{ ['--c' as any]: LEVELS[result - 1].color, width: 90, height: 90, borderWidth: 12, fontSize: '1.3rem' }}>{LEVELS[result - 1].code}</div>
    <h1>Niveau {LEVELS[result - 1].code} · {LEVELS[result - 1].name}</h1>
    <p className="muted" style={{ maxWidth: '50ch' }}>Ton parcours commence sur la ligne {LEVELS[result - 1].code}. Les lignes précédentes restent ouvertes si tu veux réviser les bases.</p>
    <button className="btn edge" onClick={() => go('parcours')}>Voir mon parcours<Icon n="arrow" s={18} /></button>
  </div></div>
  return <div className="page">
    <div className="row" style={{ justifyContent: 'center' }}><span className="eyebrow">Étape {stage} sur 6</span><LvTag lv={stage} /></div>
    <QuizRunner key={stage} questions={qs} retryWrong={false} title={'Étape ' + LEVELS[stage - 1].code} xpPer={1}
      onDone={(c, t) => setLast({ c, t })}
      onExit={() => {
        const ratio = last.c / last.t, passed = ratio >= 0.67
        if (passed && stage < 6) { setStage(stage + 1); return }
        const res = passed ? 6 : stage === 1 ? 1 : ratio >= 0.5 ? stage : stage - 1
        setResult(res); setState(() => ({ level: res, placed: true })); setStage(7)
      }} />
  </div>
}

export function Exam({ lv }: { lv: number }) {
  const level = useStore(s => s.level)
  const qs = useMemo(() => levelQuestions(lv, 12, 8), [lv])
  const [score, setScore] = useState<number | null>(null)
  if (!LEVELS[lv - 1]) return null
  return <div className="page">
    <Back to="parcours" label="Plan des lignes" />
    <div className="row" style={{ justifyContent: 'center' }}><span className="eyebrow">Examen de fin de ligne</span><LvTag lv={lv} /></div>
    <QuizRunner questions={qs} retryWrong={false} title={'Examen ' + LEVELS[lv - 1].code} xpPer={4}
      onDone={(c, t) => { const p = Math.round(c / t * 100); setScore(p); gameScore('exam' + lv, p); if (p >= 80 && level === lv && lv < 6) { setState(() => ({ level: lv + 1 })); toast('Nouvelle ligne débloquée : ' + LEVELS[lv].code, 'Ton niveau passe à ' + LEVELS[lv].code + '.', 'badge') } }}
      onExit={() => go('parcours')} />
    {score != null && score < 80 && <p className="muted small" style={{ textAlign: 'center' }}>80 % sont nécessaires pour valider la ligne.</p>}
  </div>
}
