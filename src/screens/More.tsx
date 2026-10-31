import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import { Back, LvTag, Speak } from '../ui/common'
import { QuizRunner, type Q } from '../ui/Quiz'
import { falseFriends, idioms, phrasalVerbs, pronunciation, situations, minimalPairs } from '../content/extras'
import { BADGES, learnedCount, masteredCount, resetAll, setState, useStore, xpLevel, getState, replaceState } from '../lib/store'
import { LEVELS, pick, sample, shuffle, today } from '../lib/util'
import { lessons } from '../lib/lesson'
import { allWords } from '../lib/data'
import { cloudStatus } from '../lib/cloud'
import { speak, ttsAvailable } from '../lib/speech'
import { go } from '../ui/router'

export function Expressions({ tab: tab0 }: { tab: string }) {
  const tab = (['phrasal', 'idiomes', 'faux-amis'].includes(tab0) ? tab0 : 'phrasal')
  const [lv, setLv] = useState(0)
  const [quiz, setQuiz] = useState(false)
  const qs = useMemo<Q[]>(() => {
    if (tab === 'phrasal') { const src = phrasalVerbs.filter(p => !lv || p[4] <= lv); return sample(src, 10).map(p => ({ kind: 'choice', label: 'Que veut dire ce phrasal verb ?', say: p[0], prompt: <>to {p[0]}</>, options: shuffle([p[1], ...sample(src.filter(x => x !== p), 3).map(x => x[1])]), answer: p[1], why: <>{p[2]} — {p[3]}</> })) }
    if (tab === 'idiomes') { const src = idioms.filter(p => !lv || p[3] <= lv); return sample(src, 10).map(p => ({ kind: 'choice', label: 'Quel est l’équivalent français ?', say: p[0], prompt: p[0], options: shuffle([p[1], ...sample(src.filter(x => x !== p), 3).map(x => x[1])]), answer: p[1], why: p[2] })) }
    return sample(falseFriends, 10).map(f => ({ kind: 'choice', label: 'Que veut vraiment dire ce mot ?', say: f[0], prompt: f[0], options: shuffle([f[1], f[2], pick(falseFriends.filter(x => x !== f))[1]]), answer: f[1], why: <>Piège : « {f[2]} » se dit <b>{f[3]}</b>.</> }))
  }, [quiz, tab, lv])
  if (quiz) return <div className="page"><QuizRunner questions={qs} title="Expressions" onExit={() => setQuiz(false)} /></div>
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">L’anglais tel qu’on le parle</div><h1>Expressions</h1></div>
    <div className="row between">
      <div className="seg"><button className={tab === 'phrasal' ? 'on' : ''} onClick={() => go('expressions-phrasal')}>Phrasal verbs ({phrasalVerbs.length})</button><button className={tab === 'idiomes' ? 'on' : ''} onClick={() => go('expressions-idiomes')}>Idiomes ({idioms.length})</button><button className={tab === 'faux-amis' ? 'on' : ''} onClick={() => go('expressions-faux-amis')}>Faux amis ({falseFriends.length})</button></div>
      <button className="btn edge" onClick={() => setQuiz(true)}><Icon n="target" s={18} />M’entraîner</button>
    </div>
    {tab !== 'faux-amis' && <div className="seg"><button className={!lv ? 'on' : ''} onClick={() => setLv(0)}>Tous</button>{LEVELS.map(L => <button key={L.n} className={lv === L.n ? 'on' : ''} onClick={() => setLv(L.n)}>≤ {L.code}</button>)}</div>}
    {tab === 'phrasal' && <div className="grid wide">{phrasalVerbs.filter(p => !lv || p[4] <= lv).map(p => <div key={p[0]} className="card stack" style={{ gap: 6 }}>
      <div className="row between"><div className="row" style={{ gap: 8 }}><Speak text={p[0]} /><h3>to {p[0]}</h3></div><LvTag lv={p[4]} /></div>
      <b>{p[1]}</b><div className="small"><span>{p[2]}</span><div className="muted">{p[3]}</div></div></div>)}</div>}
    {tab === 'idiomes' && <div className="grid wide">{idioms.filter(p => !lv || p[3] <= lv).map(p => <div key={p[0]} className="card stack" style={{ gap: 6 }}>
      <div className="row between" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}><div className="row" style={{ gap: 8, flexWrap: 'nowrap', alignItems: 'flex-start' }}><Speak text={p[0]} /><h3>{p[0]}</h3></div><LvTag lv={p[3]} /></div>
      <b>{p[1]}</b><div className="small muted"><i>{p[2]}</i></div></div>)}</div>}
    {tab === 'faux-amis' && <><p className="muted" style={{ maxWidth: '62ch' }}>Ces mots ressemblent à des mots français mais n’ont pas le même sens. Ce sont les erreurs les plus fréquentes des francophones.</p>
      <div className="tablewrap"><table className="t"><thead><tr><th></th><th>Anglais</th><th>Veut dire</th><th>À ne pas confondre avec</th><th>Qui se dit</th></tr></thead>
        <tbody>{falseFriends.map(f => <tr key={f[0]}><td style={{ width: 44 }}><Speak text={f[0]} /></td><td><b>{f[0]}</b></td><td style={{ color: 'var(--good)' }}><b>{f[1]}</b></td><td style={{ color: 'var(--bad)' }}>{f[2]}</td><td><b>{f[3]}</b></td></tr>)}</tbody></table></div></>}
  </div>
}

export function Situations({ id }: { id: string }) {
  const sit = situations.find(s => s.id === id)
  if (sit) return <div className="page"><Back to="situations" label="Situations" />
    <div className="row"><LvTag lv={sit.lv} /><h1>{sit.title}</h1></div>
    <div className="card" style={{ padding: 0 }}>{sit.phrases.map(([en, fr]) => <div key={en} className="wordrow"><Speak text={en.replace(/\(.*?\)/g, '')} /><div style={{ minWidth: 0 }}><span className="en">{en}</span><div className="fr">{fr}</div></div><span /></div>)}</div>
    {sit.dialogue && <div className="card pad-lg stack">
      <div className="row between"><h2>Dialogue</h2><button className="btn sm ghost" onClick={() => { let i = 0; const d = sit.dialogue!; const nextLine = () => { if (i < d.length) speak(d[i][1], { lang: i % 2 ? 'en-GB' : 'en-US', onend: () => { i++; setTimeout(nextLine, 350) } }) }; nextLine() }}><Icon n="sound" s={16} />Tout écouter</button></div>
      {sit.dialogue.map(([who, en, fr], i) => <div key={i} className="dialog-line"><span className={'who' + (i % 2 ? ' b' : '')}>{who}</span><div><b>{en}</b><div className="small muted">{fr}</div></div><Speak text={en} /></div>)}
    </div>}
  </div>
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Phrases prêtes à l’emploi</div><h1>Situations de la vie réelle</h1>
      <p className="muted" style={{ maxWidth: '60ch' }}>Les phrases dont tu as vraiment besoin au restaurant, en voyage, au travail ou chez le médecin, avec la prononciation.</p></div>
    <div className="grid">{situations.map(s => <a key={s.id} className="tile" href={'#situations-' + s.id}>
      <div className="row between"><div className="ic"><Icon n={s.icon} /></div><LvTag lv={s.lv} /></div><h3>{s.title}</h3><p className="small muted">{s.phrases.length} phrases{s.dialogue ? ' · dialogue' : ''}</p></a>)}</div>
  </div>
}

export function Pronunciation() {
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Les sons difficiles pour les francophones</div><h1>Prononciation</h1>
      {!ttsAvailable() && <p className="tip">La synthèse vocale n’est pas disponible dans ce navigateur. Essaie Chrome, Edge ou Safari.</p>}</div>
    <a className="tile" href="#jeu-paires-min" style={{ maxWidth: 520 }}><div className="row"><div className="ic"><Icon n="ear" /></div><div><h3>Jeu : Oreille fine</h3><p className="small muted">Entraîne-toi à distinguer ship / sheep, think / sink…</p></div></div></a>
    <div className="grid wide">{pronunciation.map(p => <div key={p.title} className="card stack" style={{ gap: 8 }}>
      <h3>{p.title}</h3><p className="small">{p.text}</p>
      {p.examples.map(([en, note]) => <div key={en} className="row" style={{ flexWrap: 'nowrap' }}><Speak text={en.replace(/\/.*?\//g, '').replace(/→.*$/, '')} rate={0.8} /><div style={{ minWidth: 0 }}><b>{en}</b> <span className="tiny muted">{note}</span></div></div>)}
    </div>)}</div>
    <div className="card stack"><h3>Paires minimales</h3><p className="small muted">Écoute chaque paire plusieurs fois, puis répète à voix haute.</p>
      <div className="grid">{minimalPairs.map(([a, b]) => <div key={a + b} className="row" style={{ gap: 6 }}><button className="chip" onClick={() => speak(a, { rate: .8 })}>{a}</button><span className="muted">/</span><button className="chip" onClick={() => speak(b, { rate: .8 })}>{b}</button></div>)}</div></div>
  </div>
}

export function Stats() {
  const s = useStore(s => s)
  const L = xpLevel(s.xp)
  const d = today()
  const days = Array.from({ length: 7 * 18 }, (_, i) => d - (7 * 18 - 1 - i))
  const max = Math.max(...days.map(x => s.daily[x] || 0), 1)
  const total = allWords().length
  const byLv = LEVELS.map(Lv => { const ws = allWords().filter(w => w.lv === Lv.n); return { L: Lv, n: ws.length, k: ws.filter(w => s.srs[w.id]).length } })
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Ta progression</div><h1>Statistiques</h1></div>
    <div className="kpis">
      <div className="kpi"><span className="eyebrow">XP total</span><b>{s.xp.toLocaleString('fr-FR')}</b><span className="tiny muted">niveau {L.lvl}</span></div>
      <div className="kpi"><span className="eyebrow">Série</span><b>{s.streak} j</b><span className="tiny muted">{s.freeze} protection{s.freeze > 1 ? 's' : ''}</span></div>
      <div className="kpi"><span className="eyebrow">Précision</span><b>{s.answers ? Math.round(s.correct / s.answers * 100) : 0}%</b><span className="tiny muted">{s.answers} réponses</span></div>
      <div className="kpi"><span className="eyebrow">Mots</span><b>{learnedCount(s)}</b><span className="tiny muted">{masteredCount(s)} maîtrisés / {total}</span></div>
    </div>
    <div className="card stack"><div className="row between"><h3>Activité des 18 dernières semaines</h3><span className="tiny muted">XP par jour</span></div>
      <div className="heat">{days.map(x => { const v = s.daily[x] || 0; const c = !v ? '' : v >= s.settings.goal * 2 ? 'h4' : v >= s.settings.goal ? 'h3' : v / max > .3 ? 'h2' : 'h1'; return <i key={x} className={c} title={`${new Date((x) * 86400000).toLocaleDateString('fr-FR')} : ${v} XP`} /> })}</div>
      <div className="row tiny muted" style={{ gap: 8 }}>Moins <span className="heat" style={{ gridTemplateRows: '13px' }}><i /><i className="h1" /><i className="h2" /><i className="h3" /><i className="h4" /></span> Plus</div>
    </div>
    <div className="card stack"><h3>Vocabulaire par niveau</h3>
      {byLv.map(x => <div key={x.L.n} className="row" style={{ flexWrap: 'nowrap' }}><LvTag lv={x.L.n} /><div className="bar" style={{ flex: 1 }}><i style={{ width: (x.k / Math.max(1, x.n) * 100) + '%', background: x.L.color }} /></div><span className="mono tiny num" style={{ width: 90, textAlign: 'right' }}>{x.k} / {x.n}</span></div>)}
    </div>
    <div className="card stack"><h3>Grammaire</h3>
      {LEVELS.map(Lv => { const ls = lessons.filter(l => l.lv === Lv.n); const k = ls.filter(l => (s.lessons[l.id] || 0) >= 60).length; return <div key={Lv.n} className="row" style={{ flexWrap: 'nowrap' }}><LvTag lv={Lv.n} /><div className="bar" style={{ flex: 1 }}><i style={{ width: (k / ls.length * 100) + '%', background: Lv.color }} /></div><span className="mono tiny num" style={{ width: 90, textAlign: 'right' }}>{k} / {ls.length}</span></div> })}
    </div>
    <div className="stack"><h2>Badges · {s.badges.length} / {BADGES.length}</h2>
      <div className="grid">{BADGES.map(b => { const got = s.badges.includes(b.id); return <div key={b.id} className={'badge' + (got ? '' : ' locked')}><span className="medal"><Icon n={got ? 'star' : 'lock'} s={18} /></span><div><b>{b.name}</b><div className="tiny muted">{b.desc}</div></div></div> })}</div></div>
  </div>
}

export function SettingsScreen() {
  const s = useStore(s => s)
  const [confirm, setConfirm] = useState(false)
  const [io, setIo] = useState('')
  const [msg, setMsg] = useState('')
  const set = (patch: Partial<typeof s.settings>) => setState(st => ({ settings: { ...st.settings, ...patch } }))
  return <div className="page" style={{ maxWidth: 720 }}>
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Préférences</div><h1>Réglages</h1></div>
    <div className="card stack">
      <label htmlFor="name"><b>Ton prénom</b></label>
      <input id="name" className="field" value={s.name} onChange={e => setState(() => ({ name: e.target.value.slice(0, 30) }))} placeholder="Pour te saluer sur l’accueil" />
    </div>
    <div className="card stack">
      <b>Niveau actuel</b>
      <div className="seg">{LEVELS.map(L => <button key={L.n} className={s.level === L.n ? 'on' : ''} onClick={() => setState(() => ({ level: L.n }))}>{L.code}</button>)}</div>
      <a className="backlink" href="#test">Refaire le test de niveau<Icon n="arrow" s={16} /></a>
    </div>
    <div className="card stack">
      <b>Objectif quotidien</b>
      <div className="seg">{[[20, 'Tranquille'], [50, 'Régulier'], [100, 'Sérieux'], [200, 'Intensif']].map(([v, l]) => <button key={v} className={s.settings.goal === v ? 'on' : ''} onClick={() => set({ goal: v as number })}>{l} · {v} XP</button>)}</div>
    </div>
    <div className="card stack">
      <b>Voix et accent</b>
      <div className="seg"><button className={s.settings.accent === 'en-US' ? 'on' : ''} onClick={() => set({ accent: 'en-US' })}>Américain</button><button className={s.settings.accent === 'en-GB' ? 'on' : ''} onClick={() => set({ accent: 'en-GB' })}>Britannique</button></div>
      <label htmlFor="rate" className="small">Vitesse de lecture : <b className="num">{s.settings.rate.toFixed(2)}×</b></label>
      <input id="rate" type="range" min="0.5" max="1.3" step="0.05" value={s.settings.rate} onChange={e => set({ rate: parseFloat(e.target.value) })} />
      <div className="row"><button className="btn sm ghost" onClick={() => speak('Hello! This is how I sound. Practice makes perfect.')}><Icon n="sound" s={16} />Tester la voix</button>
        <label className="row small" style={{ gap: 8 }}><input id="snd" type="checkbox" checked={s.settings.sound} onChange={e => set({ sound: e.target.checked })} />Sons de réussite et d’erreur</label></div>
    </div>
    <div className="card stack">
      <b>Thème</b>
      <div className="seg">{([['system', 'Automatique'], ['light', 'Clair'], ['dark', 'Sombre']] as const).map(([v, l]) => <button key={v} className={s.settings.theme === v ? 'on' : ''} onClick={() => set({ theme: v })}>{l}</button>)}</div>
    </div>
    <div className="card stack">
      <b>Sauvegarde</b>
      <p className="small muted">{cloudStatus === 'on' ? 'Ta progression est enregistrée dans ton compte et synchronisée entre tes appareils.' : 'Ta progression est enregistrée dans ce navigateur. Copie ton code de sauvegarde pour la transférer sur un autre appareil.'}</p>
      <div className="row">
        <button className="btn sm ghost" onClick={() => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(getState())))); setIo(code); navigator.clipboard?.writeText(code).then(() => setMsg('Code copié dans le presse-papiers.'), () => setMsg('Sélectionne le code ci-dessous et copie-le.')) }}>Exporter ma progression</button>
        <button className="btn sm ghost" onClick={() => { try { const st = JSON.parse(decodeURIComponent(escape(atob(io.trim())))); if (!st.v) throw 0; replaceState(st); setMsg('Progression importée.') } catch { setMsg('Code invalide : colle le code complet exporté depuis l’application.') } }}>Importer</button>
      </div>
      <textarea id="io" className="field" rows={3} value={io} onChange={e => setIo(e.target.value)} placeholder="Code de sauvegarde" style={{ fontFamily: 'var(--f-mono)', fontSize: '.75rem' }} />
      {msg && <p className="small">{msg}</p>}
    </div>
    <div className="card stack" style={{ borderColor: 'var(--bad)' }}>
      <b>Réinitialiser</b>
      {!confirm ? <button className="btn sm line" style={{ justifySelf: 'start' }} onClick={() => setConfirm(true)}>Effacer toute ma progression</button>
        : <div className="row"><span className="small">Tout sera effacé, définitivement.</span><button className="btn sm bad" onClick={() => { resetAll(); setConfirm(false); go('accueil') }}>Oui, tout effacer</button><button className="btn sm ghost" onClick={() => setConfirm(false)}>Annuler</button></div>}
    </div>
    <p className="tiny muted">Sources : vocabulaire CEFR-J et Octanove (niveaux), traductions Wiktionary (CC BY-SA), phrases d’exemple Tatoeba (CC BY 2.0 FR), fréquences OpenSubtitles.</p>
  </div>
}
