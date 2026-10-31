import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import { Back, LvTag, Rich, Speak } from '../ui/common'
import { QuizRunner, gapPrompt, type Q } from '../ui/Quiz'
import { lessonById, lessons } from '../lib/lesson'
import type { Exercise, Lesson as L } from '../content/types'
import { finishLesson, useStore } from '../lib/store'
import { LEVELS, shuffle } from '../lib/util'
import { go } from '../ui/router'

export function exToQ(e: Exercise): Q {
  if (e.k === 'qcm') return { kind: 'choice', prompt: gapPrompt(e.q), options: shuffle(e.options), answer: e.answer, why: e.why }
  return { kind: 'type', prompt: gapPrompt(e.q), answers: e.answers, why: e.why }
}
export function LessonBody({ l }: { l: L }) {
  return <>{l.blocks.map((b, i) => {
    switch (b.k) {
      case 'h': return <h2 key={i} className="sec">{b.t}</h2>
      case 'p': return <p key={i}><Rich t={b.t} /></p>
      case 'li': return <ul key={i}><li><Rich t={b.t} /></li></ul>
      case 'f': return <div key={i} className="formula">{b.t}</div>
      case 'tip': return <div key={i} className="tip"><b>À retenir</b><Rich t={b.t} /></div>
      case 'ex': return <div key={i} className="ex"><Speak text={b.en.replace(/[—–].*$/, '')} /><span className="en">{b.en}</span>{b.fr && <span className="fr">{b.fr}</span>}</div>
      case 'x': return <div key={i} className="mistake"><div className="w">{b.wrong}</div><div className="r">{b.right}</div></div>
      case 'table': return <div key={i} className="tablewrap"><table className="t"><thead><tr>{b.rows[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
        <tbody>{b.rows.slice(1).map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Rich t={c} /></td>)}</tr>)}</tbody></table></div>
    }
  })}</>
}
export function Lesson({ id }: { id: string }) {
  const l = lessonById[id]
  const best = useStore(s => s.lessons[id])
  const [mode, setMode] = useState<'read' | 'quiz'>('read')
  const qs = useMemo(() => l ? shuffle(l.exercises).map(exToQ) : [], [l, mode])
  if (!l) return <div className="page"><Back to="parcours" label="Parcours" /><p>Leçon introuvable.</p></div>
  const idx = lessons.indexOf(l)
  const next = lessons[idx + 1]
  const color = LEVELS[l.lv - 1].color
  if (mode === 'quiz') return <div className="page"><QuizRunner questions={qs} title={l.title} xpPer={3}
    onDone={(c, t) => finishLesson(l.id, Math.round(c / t * 100))} onExit={() => setMode('read')} /></div>
  return <div className="page" style={{ ['--c' as any]: color }}>
    <Back to={'parcours'} label="Plan des lignes" />
    <div className="lesson">
      <div className="stack" style={{ gap: 8 }}>
        <div className="row"><LvTag lv={l.lv} /><span className="eyebrow">{l.en}{l.tense ? ' · temps verbal' : ''}</span>{best != null && <span className={'score' + (best >= 100 ? ' full' : '')}>Meilleur score {best}%</span>}</div>
        <h1>{l.title}</h1>
      </div>
      <LessonBody l={l} />
      <div className="card pad-lg stack" style={{ marginTop: 10 }}>
        <h2>Entraîne-toi</h2>
        <p className="muted">{l.exercises.length} exercices. Les erreurs reviennent à la fin pour une deuxième chance.</p>
        <div className="row">
          <button className="btn edge" onClick={() => setMode('quiz')}><Icon n="target" s={18} />Faire les exercices</button>
          {next && <button className="btn line" onClick={() => go('lecon-' + next.id)}>Leçon suivante<Icon n="arrow" s={18} /></button>}
        </div>
      </div>
    </div>
  </div>
}
