import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import { Bar, Speak, useKey } from './common'
import { blip, speak } from '../lib/speech'
import { addXp, recordAnswer } from '../lib/store'
import { closeEnough, norm } from '../lib/util'

export type Q =
  | { kind: 'choice'; prompt: ReactNode; label?: string; say?: string; options: string[]; answer: string; why?: ReactNode; onResult?: (ok: boolean) => void; sayOptions?: boolean }
  | { kind: 'type'; prompt: ReactNode; label?: string; say?: string; answers: string[][]; why?: ReactNode; placeholder?: string; onResult?: (ok: boolean) => void; lenient?: boolean }

export function gapPrompt(q: string) {
  const parts = q.split('___')
  return <>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <span className="gap">{parts.length > 2 ? i + 1 : ' '}</span>}</span>)}</>
}

export function QuizRunner({ questions, onExit, onDone, xpPer = 2, title, retryWrong = true }: {
  questions: Q[]; onExit: () => void; onDone?: (correct: number, total: number) => void; xpPer?: number; title?: string; retryWrong?: boolean
}) {
  const [queue, setQueue] = useState<{ q: Q; first: boolean }[]>(() => questions.map(q => ({ q, first: true })))
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [typed, setTyped] = useState<string[]>([])
  const [state, setState] = useState<'ask' | 'ok' | 'ko'>('ask')
  const [correct, setCorrect] = useState(0)
  const [combo, setCombo] = useState(0)
  const [done, setDone] = useState(false)
  const firstInput = useRef<HTMLInputElement>(null)
  const cur = queue[idx]
  const total = questions.length

  useEffect(() => { setPicked(null); setState('ask'); setTyped([]); setTimeout(() => firstInput.current?.focus(), 30); if (cur?.q.say) speak(cur.q.say) }, [idx, done])

  function judge(ok: boolean) {
    setState(ok ? 'ok' : 'ko'); blip(ok ? 'ok' : 'bad'); recordAnswer(ok); cur.q.onResult?.(ok)
    if (ok) { setCombo(c => c + 1); if (cur.first) setCorrect(c => c + 1) } else setCombo(0)
    if (!ok && retryWrong && cur.first) setQueue(qs => [...qs, { q: cur.q, first: false }])
  }
  function choose(o: string) { if (state !== 'ask' || cur.q.kind !== 'choice') return; setPicked(o); judge(o === cur.q.answer); if (cur.q.sayOptions) speak(cur.q.answer) }
  function submit() {
    if (state !== 'ask' || cur.q.kind !== 'type') return
    const q = cur.q
    const ok = q.answers.some(alt => alt.length === typed.length || alt.length === 1 ? alt.every((a, i) => {
      const t = typed[i] || ''
      return q.lenient === false ? norm(t) === norm(a) : closeEnough(t, a) || norm(t) === norm(a)
    }) : false)
    judge(ok)
  }
  function next() {
    if (state === 'ask') return
    if (idx + 1 >= queue.length) { setDone(true); const xp = correct * xpPer + 5; addXp(xp); blip('done'); onDone?.(correct, total); return }
    setIdx(i => i + 1)
  }
  useKey(e => {
    if (done) return
    if (e.key === 'Enter') { if (state !== 'ask') next() }
    else if (state === 'ask' && cur?.q.kind === 'choice') { const n = parseInt(e.key); if (n >= 1 && n <= cur.q.options.length) choose(cur.q.options[n - 1]) }
  }, [state, idx, done, queue, correct])

  if (done) {
    const pct = Math.round((correct / Math.max(1, total)) * 100)
    return <div className="quiz"><div className="result card pad-lg">
      <div className="eyebrow">{title || 'Session terminée'}</div>
      <div className="big num">{pct}%</div>
      <p className="muted">{correct} bonne{correct > 1 ? 's' : ''} réponse{correct > 1 ? 's' : ''} du premier coup sur {total}</p>
      <div className="stat-pill"><Icon n="bolt" s={16} />+{correct * xpPer + 5} XP</div>
      <p>{pct === 100 ? 'Sans faute. Impressionnant !' : pct >= 80 ? 'Très bien joué !' : pct >= 50 ? 'Pas mal, continue comme ça.' : 'Courage : refais la session, la répétition paie.'}</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <button className="btn ghost" onClick={() => { setQueue(questions.map(q => ({ q, first: true }))); setIdx(0); setCorrect(0); setDone(false) }}><Icon n="refresh" s={18} />Recommencer</button>
        <button className="btn" onClick={onExit}>Continuer<Icon n="arrow" s={18} /></button>
      </div>
    </div></div>
  }
  if (!cur) return null
  const q = cur.q
  const blanks = q.kind === 'type' ? Math.max(1, q.answers[0].length) : 0
  return <div className="quiz">
    <div className="quiz-top">
      <button className="icon-btn" onClick={onExit} aria-label="Quitter"><Icon n="x" /></button>
      <Bar v={idx / queue.length} />
      <span className="stat-pill num" title="Série de bonnes réponses"><Icon n="flame" s={15} />{combo}</span>
    </div>
    {!cur.first && <div className="eyebrow" style={{ color: 'var(--signal)' }}>Deuxième chance</div>}
    {q.label && <div className="eyebrow">{q.label}</div>}
    <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
      {q.say && <Speak text={q.say} />}
      <div className="prompt" style={{ minWidth: 0 }}>{q.prompt}</div>
    </div>
    {q.kind === 'choice' ? <div className="options">
      {q.options.map((o, i) => {
        const cls = state === 'ask' ? '' : o === q.answer ? 'ok' : o === picked ? 'ko' : ''
        return <button key={o + i} className={'opt ' + cls} disabled={state !== 'ask'} onClick={() => choose(o)}><kbd>{i + 1}</kbd><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{o}</span>{cls === 'ok' && <span style={{ marginLeft: 'auto' }}><Icon n="check" /></span>}</button>
      })}
    </div> : <form className="stack" onSubmit={e => { e.preventDefault(); state === 'ask' ? submit() : next() }}>
      {Array.from({ length: blanks }).map((_, i) => <input key={i} id={'ans' + i} ref={i === 0 ? firstInput : undefined} className="field answer-input" autoComplete="off" autoCapitalize="off" spellCheck={false}
        placeholder={blanks > 1 ? `Trou ${i + 1}` : (q.placeholder || 'Ta réponse')} value={typed[i] || ''} disabled={state !== 'ask'}
        onChange={e => { const t = typed.slice(); t[i] = e.target.value; setTyped(t) }} />)}
      {state === 'ask' && <button className="btn" type="submit" disabled={!typed.some(Boolean)}>Vérifier</button>}
    </form>}
    {state !== 'ask' && <div className={'feedback ' + state}>
      <b>{state === 'ok' ? pickPraise() : 'Pas tout à fait.'}</b>
      {state === 'ko' && <div className="why">Réponse : <b>{q.kind === 'choice' ? q.answer : q.answers[0].join(' … ')}</b></div>}
      {q.why && <div className="why">{q.why}</div>}
    </div>}
    {state !== 'ask' && <button className="btn" onClick={next} autoFocus>Continuer <span className="tiny" style={{ opacity: .6 }}>Entrée</span></button>}
  </div>
}
const praises = ['Bravo !', 'Exact !', 'Parfait !', 'Bien vu !', 'Excellent !', 'Super !']
const pickPraise = () => praises[Math.floor(Math.random() * praises.length)]

// Turn a parsed lesson exercise into a Q
export function useStable<T>(f: () => T, deps: any[]) { return useMemo(f, deps) }
