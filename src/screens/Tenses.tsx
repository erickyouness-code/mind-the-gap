import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import { LvTag, Speak } from '../ui/common'
import { QuizRunner, type Q } from '../ui/Quiz'
import { TENSES, PERSONS, conj, fixI, irregulars, ing, past, pp, third, isIrregular, type Form } from '../lib/conjugate'
import { lessonById } from '../lib/lesson'
import { LEVELS, sample, stripAccents } from '../lib/util'

type Mark = { t: 'pt' | 'ev'; a: number; b?: number; c?: string }
const TL: Record<string, Mark[]> = {
  ps: [20, 32, 44, 56, 68, 80].map(a => ({ t: 'pt', a })), pc: [{ t: 'ev', a: 38, b: 62 }],
  pp: [{ t: 'ev', a: 22, b: 50, c: 'color-mix(in srgb, var(--c) 35%, transparent)' }, { t: 'pt', a: 22 }], ppc: [{ t: 'ev', a: 18, b: 50 }],
  pas: [{ t: 'pt', a: 25 }], pac: [{ t: 'ev', a: 12, b: 38 }, { t: 'pt', a: 27, c: 'var(--signal)' }],
  pap: [{ t: 'pt', a: 14 }, { t: 'pt', a: 34, c: 'var(--muted)' }], papc: [{ t: 'ev', a: 8, b: 32 }, { t: 'pt', a: 32, c: 'var(--muted)' }],
  fs: [{ t: 'pt', a: 76 }], gt: [{ t: 'ev', a: 50, b: 72, c: 'color-mix(in srgb, var(--c) 35%, transparent)' }, { t: 'pt', a: 72 }],
  fc: [{ t: 'ev', a: 64, b: 88 }], fp: [{ t: 'pt', a: 68 }, { t: 'pt', a: 86, c: 'var(--muted)' }], fpc: [{ t: 'ev', a: 56, b: 86 }, { t: 'pt', a: 86, c: 'var(--muted)' }],
  cd: [{ t: 'pt', a: 72, c: 'color-mix(in srgb, var(--c) 55%, transparent)' }], cdc: [{ t: 'ev', a: 60, b: 84, c: 'color-mix(in srgb, var(--c) 55%, transparent)' }], cdp: [{ t: 'pt', a: 26, c: 'color-mix(in srgb, var(--c) 55%, transparent)' }],
}
export function Timeline({ id }: { id: string }) {
  return <div className="timeline" aria-hidden="true"><div className="axis" /><div className="now" />
    {(TL[id] || []).map((m, i) => m.t === 'pt' ? <span key={i} className="pt" style={{ left: `calc(${m.a}% - 9px)`, background: m.c }} /> : <span key={i} className="ev" style={{ left: m.a + '%', width: (m.b! - m.a) + '%', background: m.c }} />)}
  </div>
}
const GROUPS: [string, string][] = [['present', 'Présent'], ['past', 'Passé'], ['future', 'Futur'], ['conditional', 'Conditionnel']]
const GCOL: Record<string, string> = { present: 'var(--l3)', past: 'var(--l5)', future: 'var(--l1)', conditional: 'var(--l2)' }

export function Tenses() {
  const [verb, setVerb] = useState('work')
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}>
      <div className="eyebrow">Tous les temps de l’anglais</div>
      <h1>Les temps, en un coup d’œil</h1>
      <p className="muted" style={{ maxWidth: '64ch' }}>L’anglais a 12 temps « de base » (présent, passé, futur × simple, continu, parfait, parfait continu), plus going to et le conditionnel. Chaque frise montre où se situe l’action par rapport à <b style={{ color: 'var(--signal)' }}>maintenant</b>.</p>
    </div>
    <div className="card row">
      <label htmlFor="tv" className="small"><b>Verbe d’exemple</b></label>
      <div className="seg">{['work', 'go', 'be', 'have', 'eat', 'study'].map(v => <button key={v} className={verb === v ? 'on' : ''} onClick={() => setVerb(v)}>{v}</button>)}</div>
      <a className="btn sm ghost" href="#conjugueur" style={{ marginLeft: 'auto' }}><Icon n="search" s={16} />Conjuguer un autre verbe</a>
    </div>
    {GROUPS.map(([g, name]) => <section key={g} className="stack">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 22, height: 8, borderRadius: 4, background: GCOL[g] }} />{name}</h2>
      <div className="grid wide">{TENSES.filter(t => t.group === g).map(t => {
        const l = t.lesson ? lessonById[t.lesson] : null
        return <div key={t.id} className="card stack" style={{ ['--c' as any]: GCOL[g], gap: 10 }}>
          <div className="row between"><h3>{t.name}</h3>{l && <LvTag lv={l.lv} />}</div>
          <div className="small muted" style={{ marginTop: -6 }}>{t.fr} · {t.use}</div>
          <Timeline id={t.id} />
          <div className="formula" style={{ fontSize: '.84rem', padding: '8px 12px' }}>{t.formula}</div>
          <div className="stack small" style={{ gap: 3 }}>
            {(['aff', 'neg', 'q'] as Form[]).map(f => <div key={f} className="row" style={{ gap: 8, flexWrap: 'nowrap' }}><span className="mono tiny muted" style={{ width: 22 }}>{f === 'aff' ? '+' : f === 'neg' ? '−' : '?'}</span><span>{fixI(conj(verb, t.id, f, f === 'aff' ? 2 : f === 'neg' ? 0 : 1))}</span></div>)}
          </div>
          <div className="ex"><Speak text={t.example[0]} /><span className="en">{t.example[0]}</span><span className="fr">{t.example[1]}</span></div>
          {l && <a className="backlink" href={'#lecon-' + l.id}>Leçon complète et exercices<Icon n="arrow" s={16} /></a>}
        </div>
      })}</div>
    </section>)}
  </div>
}

export function Conjugator() {
  const [v, setV] = useState('take')
  const [form, setForm] = useState<Form>('aff')
  const verb = v.trim().toLowerCase().replace(/^to /, '') || 'take'
  const irr = irregulars.find(x => x[0] === verb)
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Conjugueur</div><h1>Conjugue n’importe quel verbe</h1></div>
    <div className="card stack">
      <input id="conj-verb" className="field" value={v} onChange={e => setV(e.target.value)} placeholder="Ex. : take, study, stop, be…" />
      <div className="row">
        <span className="chip">base : <b>{verb}</b></span><span className="chip">3e pers. : <b>{third(verb)}</b></span><span className="chip">-ing : <b>{ing(verb)}</b></span>
        <span className="chip">prétérit : <b>{verb === 'be' ? 'was/were' : irr ? irr[1] : past(verb)}</b></span><span className="chip">participe : <b>{irr ? irr[2] : pp(verb)}</b></span>
        {isIrregular(verb) ? <span className="chip" style={{ borderColor: 'var(--signal)', color: 'var(--signal)' }}>irrégulier · {irr?.[3]}</span> : <span className="chip">régulier</span>}
      </div>
      <div className="seg"><button className={form === 'aff' ? 'on' : ''} onClick={() => setForm('aff')}>Affirmatif</button><button className={form === 'neg' ? 'on' : ''} onClick={() => setForm('neg')}>Négatif</button><button className={form === 'q' ? 'on' : ''} onClick={() => setForm('q')}>Question</button></div>
    </div>
    <div className="grid wide">{TENSES.map(t => <div key={t.id} className="card stack" style={{ gap: 6 }}>
      <div className="row between"><h3>{t.name}</h3><span className="tiny muted">{t.fr}</span></div>
      {PERSONS.map((_, i) => { const line = fixI(conj(verb, t.id, form, i)); return <div key={i} className="row between" style={{ flexWrap: 'nowrap', borderBottom: i < 5 ? '1px solid var(--line)' : 0, paddingBottom: 4 }}><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{line}</span><Speak text={line} /></div> })}
    </div>)}</div>
  </div>
}

export function Irregulars() {
  const [q, setQ] = useState('')
  const [lv, setLv] = useState(0)
  const [quiz, setQuiz] = useState(false)
  const list = irregulars.filter(v => (!lv || v[4] <= lv) && (!q || v.slice(0, 4).some(x => stripAccents(String(x).toLowerCase()).includes(stripAccents(q.toLowerCase())))))
  const qs = useMemo<Q[]>(() => sample(lv ? irregulars.filter(v => v[4] <= lv) : irregulars, 15).map(v => ({
    kind: 'type', label: 'Prétérit et participe passé', prompt: <>to {v[0]} <span className="small muted" style={{ fontFamily: 'var(--f-body)', fontWeight: 400 }}>({v[3]})</span></>,
    answers: v[1].split('/').flatMap(p1 => v[2].split('/').map(p2 => [p1, p2])), why: <>{v[0]} – {v[1]} – {v[2]}</>, lenient: false,
  })), [quiz])
  if (quiz) return <div className="page"><QuizRunner questions={qs} title="Verbes irréguliers" xpPer={3} onExit={() => setQuiz(false)} /></div>
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">{irregulars.length} verbes irréguliers</div><h1>Les verbes irréguliers</h1>
      <p className="muted" style={{ maxWidth: '62ch' }}>Base verbale, prétérit, participe passé. Les plus fréquents (niveau A1–A2) sont à connaître par cœur en priorité. Écoute-les à voix haute : le rythme aide à mémoriser.</p></div>
    <div className="card row">
      <input id="irr-q" className="field" style={{ flex: 1, minWidth: 180 }} placeholder="Filtrer…" value={q} onChange={e => setQ(e.target.value)} />
      <div className="seg"><button className={!lv ? 'on' : ''} onClick={() => setLv(0)}>Tous</button>{[1, 2, 3, 4].map(n => <button key={n} className={lv === n ? 'on' : ''} onClick={() => setLv(n)}>≤ {LEVELS[n - 1].code}</button>)}</div>
      <button className="btn edge" onClick={() => setQuiz(true)}><Icon n="target" s={18} />Quiz (15 verbes)</button>
    </div>
    <div className="tablewrap"><table className="t"><thead><tr><th></th><th>Base</th><th>Prétérit</th><th>Participe passé</th><th>Français</th><th>Niv.</th></tr></thead>
      <tbody>{list.map(v => <tr key={v[0]}><td style={{ width: 44 }}><Speak text={`${v[0]}, ${v[1].replace('/', ' or ')}, ${v[2].replace('/', ' or ')}`} rate={0.8} /></td><td><b>{v[0]}</b></td><td>{v[1]}</td><td>{v[2]}</td><td className="muted">{v[3]}</td><td><LvTag lv={v[4]} /></td></tr>)}</tbody></table></div>
  </div>
}
