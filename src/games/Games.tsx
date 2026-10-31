import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon } from '../ui/Icon'
import { Back, Bar, Speak, useTimer } from '../ui/common'
import { QuizRunner, gapPrompt, type Q } from '../ui/Quiz'
import { GAMES } from './registry'
import { firstFr, sentencesOfLevel, wordsOfLevel, type Word, allSentences } from '../lib/data'
import { wordQuestion, exampleGap } from '../lib/questions'
import { addXp, gameScore, recordAnswer, toast, useStore } from '../lib/store'
import { blip, speak } from '../lib/speech'
import { LEVELS, closeEnough, norm, pick, sample, shuffle, words as wordsOf, tokens } from '../lib/util'
import { TENSES, PERSONS, conj, fixI, irregulars } from '../lib/conjugate'
import { falseFriends, minimalPairs } from '../content/extras'
import { go } from '../ui/router'

export function GamesList() {
  const best = useStore(s => s.games)
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">{GAMES.length} jeux · 2 à 5 minutes chacun</div><h1>Jeux</h1>
      <p className="muted" style={{ maxWidth: '60ch' }}>Des parties courtes pour ancrer le vocabulaire, l’oreille, l’orthographe et la grammaire. Chaque jeu s’adapte au niveau choisi, et ton record est gardé.</p></div>
    <div className="grid">{GAMES.map(g => <a key={g.id} className="tile" href={'#jeu-' + g.id}>
      <div className="row between"><div className="ic"><Icon n={g.icon} /></div>{best[g.id] != null && <span className="score"><Icon n="trophy" s={12} /> {best[g.id]}</span>}</div>
      <h3>{g.name}</h3><p className="small muted">{g.desc}</p></a>)}
    </div>
    <div className="grid">
      <a className="tile" href="#irreguliers"><div className="ic"><Icon n="list" /></div><h3>Quiz verbes irréguliers</h3><p className="small muted">Prétérit et participe passé des 148 verbes irréguliers.</p></a>
      <a className="tile" href="#prononciation"><div className="ic"><Icon n="mic" /></div><h3>Prononciation</h3><p className="small muted">Les sons difficiles pour les francophones, avec audio.</p></a>
    </div>
  </div>
}

function Shell({ id, children, lv, setLv }: { id: string; children: ReactNode; lv: number; setLv: (n: number) => void }) {
  const g = GAMES.find(x => x.id === id)!
  return <div className="page">
    <div className="row between"><Back to="jeux" label="Jeux" />
      <div className="seg" aria-label="Niveau">{LEVELS.map(L => <button key={L.n} className={L.n === lv ? 'on' : ''} onClick={() => setLv(L.n)}>{L.code}</button>)}</div></div>
    <div className="row" style={{ justifyContent: 'center', gap: 10 }}><Icon n={g.icon} /><h2>{g.name}</h2></div>
    {children}
  </div>
}
function End({ score, label, id, onAgain, extra }: { score: number; label: string; id: string; onAgain: () => void; extra?: ReactNode }) {
  const [rec] = useState(() => gameScore(id, score))
  useEffect(() => { addXp(Math.max(3, Math.round(score))); blip('done'); if (rec && score > 0) toast('Nouveau record !', `${label} : ${score}`, 'badge') }, [])
  return <div className="quiz"><div className="card pad-lg result">
    <div className="eyebrow">{rec && score > 0 ? 'Nouveau record' : 'Partie terminée'}</div>
    <div className="big num">{score}</div><p className="muted">{label}</p>{extra}
    <div className="row" style={{ justifyContent: 'center' }}><button className="btn ghost" onClick={() => go('jeux')}>Autres jeux</button><button className="btn" onClick={onAgain}><Icon n="refresh" s={18} />Rejouer</button></div>
  </div></div>
}
const usable = (lv: number) => wordsOfLevel(lv).filter(w => /^[a-z][a-z-]*$/i.test(w.w))

export function Game({ id }: { id: string }) {
  const lvDefault = useStore(s => s.level)
  const [lv, setLv] = useState(lvDefault)
  const [round, setRound] = useState(0)
  const again = () => setRound(r => r + 1)
  const props = { lv, again, key: id + lv + round }
  const body = (() => {
    switch (id) {
      case 'eclair': return <Eclair {...props} />
      case 'paires': return <Pairs {...props} />
      case 'chrono': return <Chrono {...props} />
      case 'phrase': return <Builder {...props} />
      case 'dictee': return <Dictee {...props} />
      case 'trous': return <Gaps {...props} />
      case 'traduction': return <Translate {...props} />
      case 'anagramme': return <Anagram {...props} />
      case 'pendu': return <Hangman {...props} />
      case 'epelle': return <Spell {...props} />
      case 'conjugaison': return <Conj {...props} />
      case 'fauxamis': return <FalseFriends {...props} />
      case 'paires-min': return <Minimal {...props} />
    }
    return <p>Jeu introuvable.</p>
  })()
  if (!GAMES.find(g => g.id === id)) return <div className="page"><Back to="jeux" label="Jeux" /><p>Jeu introuvable.</p></div>
  return <Shell id={id} lv={lv} setLv={setLv}>{body}</Shell>
}
type GP = { lv: number; again: () => void }

// Quiz-based games share QuizRunner and record a % score
function QuizGame({ id, qs, again, xpPer = 2 }: { id: string; qs: Q[]; again: () => void; xpPer?: number }) {
  return <QuizRunner questions={qs} xpPer={xpPer} onDone={(c, t) => { const p = Math.round(c / t * 100); if (gameScore(id, p)) toast('Nouveau record !', p + ' %', 'badge') }} onExit={again} />
}
function Eclair({ lv, again }: GP) {
  const pool = usable(lv)
  const qs = useMemo(() => sample(pool, 10).map(w => wordQuestion(w, 'auto', pool)), [])
  return <QuizGame id="eclair" qs={qs} again={again} />
}
function Gaps({ lv, again }: GP) {
  const qs = useMemo(() => {
    const ws = shuffle(usable(lv)).filter(w => w.ex.length).slice(0, 40)
    return ws.map(w => exampleGap(w) ? wordQuestion(w, 'gap', usable(lv)) : null).filter(Boolean).slice(0, 10) as Q[]
  }, [])
  return <QuizGame id="trous" qs={qs} again={again} />
}
function Translate({ lv, again }: GP) {
  const qs = useMemo<Q[]>(() => {
    const ss = sentencesOfLevel(lv).filter(s => wordsOf(s.en).length >= 4 && wordsOf(s.en).length <= 12)
    return sample(ss, 8).map(s => {
      const others = sample(ss.filter(x => x.en !== s.en && Math.abs(wordsOf(x.en).length - wordsOf(s.en).length) < 4), 3).map(x => x.en)
      return { kind: 'choice', label: 'Quelle est la bonne traduction ?', prompt: <span style={{ fontSize: '1.2rem' }}>{s.fr}</span>, options: shuffle([s.en, ...others]), answer: s.en, sayOptions: true }
    })
  }, [])
  return <QuizGame id="traduction" qs={qs} again={again} />
}
function FalseFriends({ again }: GP) {
  const qs = useMemo<Q[]>(() => sample(falseFriends, 10).map(f => Math.random() < .5
    ? { kind: 'choice', label: 'Que veut vraiment dire ce mot ?', say: f[0].replace(/\(.*\)/, ''), prompt: f[0], options: shuffle([f[1], f[2], pick(falseFriends.filter(x => x !== f))[1]]), answer: f[1], why: <>Piège : « {f[2]} » se dit <b>{f[3]}</b>.</> }
    : { kind: 'choice', label: 'Comment dit-on en anglais ?', prompt: <>« {f[2]} »</>, options: shuffle([f[3], f[0], pick(falseFriends.filter(x => x !== f))[3]]), answer: f[3], why: <>« {f[0]} » veut dire {f[1]}.</> }), [])
  return <QuizGame id="fauxamis" qs={qs} again={again} />
}
function Minimal({ again }: GP) {
  const qs = useMemo<Q[]>(() => sample(minimalPairs, 12).map(p => { const a = pick(p); return { kind: 'choice', label: 'Quel mot entends-tu ?', say: a, prompt: <span className="muted">Appuie sur le haut-parleur pour réécouter</span>, options: shuffle([...p]), answer: a, why: <>Écoute la différence : <Speak text={p[0]} /> {p[0]} · <Speak text={p[1]} /> {p[1]}</> } }), [])
  return <QuizGame id="paires-min" qs={qs} again={again} />
}
function Conj({ lv, again }: GP) {
  const qs = useMemo<Q[]>(() => {
    const allow = lv <= 1 ? ['ps', 'pc'] : lv === 2 ? ['ps', 'pc', 'pas', 'pac', 'fs', 'gt'] : lv === 3 ? ['ps', 'pc', 'pas', 'pac', 'fs', 'gt', 'pp', 'ppc', 'cd'] : TENSES.map(t => t.id)
    const tenses = TENSES.filter(t => allow.includes(t.id))
    const expand = (x: string) => x.replace(/won't/g, 'will not').replace(/can't/g, 'cannot').replace(/n't/g, ' not')
    const verbs = [...irregulars.filter(v => v[4] <= Math.max(2, lv)).map(v => v[0]), 'work', 'play', 'study', 'stop', 'live', 'watch', 'try', 'travel', 'want', 'decide']
    return Array.from({ length: 10 }, () => {
      const t = pick(tenses), v = pick(verbs), i = pick([0, 1, 2, 3, 5]), f = pick(['aff', 'aff', 'neg', 'q'] as const)
      const full = fixI(conj(v, t.id, f, i))
      const subj = i === 2 ? pick(['he', 'she', 'it']) : PERSONS[i]
      const ans = full.replace(/^(I|you|he|we|they) /, '').replace(/\?$/, '')
      const sentence = f === 'q' ? full.replace(/ he /, ` ${subj} `) : full.replace(/^he /, subj + ' ')
      return { kind: 'type', label: `${t.name} · ${f === 'aff' ? 'affirmatif' : f === 'neg' ? 'négatif' : 'question'}`,
        prompt: <>{f === 'q' ? 'Question : ' : ''}<span style={{ color: 'var(--muted)' }}>{subj}</span> + to {v}</>,
        answers: f === 'q' ? [[sentence.replace(/\?$/, '')]] : [[ans], [expand(ans)], [ans.replace(/^am not /, "'m not ").replace(/^is not /, "isn't ").replace(/^are not /, "aren't ")]],
        placeholder: f === 'q' ? 'la question complète' : 'verbe conjugué (sans le sujet)', why: <>{sentence}{f === 'q' ? '' : ''} · {t.fr}</> } as Q
    })
  }, [])
  return <QuizGame id="conjugaison" qs={qs} again={again} xpPer={3} />
}

function Pairs({ lv, again }: GP) {
  const [round, setRound] = useState(0)
  const [errors, setErrors] = useState(0)
  const [start] = useState(Date.now())
  const [end, setEnd] = useState<number | null>(null)
  const sets = useMemo(() => Array.from({ length: 3 }, () => sample(usable(lv), 6)), [])
  const ws = sets[round]
  const cards = useMemo(() => ({ en: shuffle(ws.map(w => w.id)), fr: shuffle(ws.map(w => w.id)) }), [round])
  const [sel, setSel] = useState<{ side: 'en' | 'fr'; id: string } | null>(null)
  const [gone, setGone] = useState<string[]>([])
  const [bad, setBad] = useState<string | null>(null)
  function tap(side: 'en' | 'fr', id: string) {
    if (gone.includes(id)) return
    if (side === 'en') speak(ws.find(w => w.id === id)!.w)
    if (!sel || sel.side === side) { setSel({ side, id }); return }
    if (sel.id === id) { blip('ok'); recordAnswer(true); const g = [...gone, id]; setGone(g); setSel(null)
      if (g.length === ws.length) { if (round < 2) { setTimeout(() => { setRound(round + 1); setGone([]) }, 350) } else setEnd(Date.now()) } }
    else { blip('bad'); recordAnswer(false); setErrors(e => e + 1); setBad(side + id); setTimeout(() => setBad(null), 400); setSel(null) }
  }
  if (end) { const secs = Math.round((end - start) / 1000); return <End id="paires" score={Math.max(0, 180 - secs - errors * 5)} label={`points · ${secs} s, ${errors} erreur${errors > 1 ? 's' : ''}`} onAgain={again} /> }
  const W = (id: string) => ws.find(w => w.id === id)!
  return <div className="quiz">
    <div className="row between"><span className="eyebrow">Manche {round + 1} / 3</span><span className="stat-pill">{errors} erreur{errors > 1 ? 's' : ''}</span></div>
    <div className="pairs">
      <div className="stack" style={{ gap: 10 }}>{cards.en.map(id => <button key={id} className={'pair' + (gone.includes(id) ? ' gone' : '') + (sel?.side === 'en' && sel.id === id ? ' sel' : '') + (bad === 'en' + id ? ' ko' : '')} onClick={() => tap('en', id)}>{W(id).w}</button>)}</div>
      <div className="stack" style={{ gap: 10 }}>{cards.fr.map(id => <button key={id} className={'pair' + (gone.includes(id) ? ' gone' : '') + (sel?.side === 'fr' && sel.id === id ? ' sel' : '') + (bad === 'fr' + id ? ' ko' : '')} onClick={() => tap('fr', id)}>{firstFr(W(id))}</button>)}</div>
    </div>
  </div>
}

function Chrono({ lv, again }: GP) {
  const pool = useMemo(() => usable(lv), [lv])
  const make = () => { const w = pick(pool); const truth = Math.random() < .5; const other = pick(pool.filter(x => firstFr(x) !== firstFr(w))); return { w, shown: truth ? firstFr(w) : firstFr(other), truth } }
  const [cur, setCur] = useState(make)
  const [score, setScore] = useState(0)
  const [run, setRun] = useState(false)
  const [over, setOver] = useState(false)
  const [flash, setFlash] = useState<'' | 'ok' | 'ko'>('')
  const [left] = useTimer(60, run, () => { setRun(false); setOver(true) })
  function answer(v: boolean) { if (!run) return; const ok = v === cur.truth; recordAnswer(ok); blip(ok ? 'ok' : 'bad'); setFlash(ok ? 'ok' : 'ko'); setTimeout(() => setFlash(''), 250); setScore(s => Math.max(0, s + (ok ? 1 : -1))); setCur(make()) }
  useEffect(() => { const f = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') answer(false); if (e.key === 'ArrowRight') answer(true) }; addEventListener('keydown', f); return () => removeEventListener('keydown', f) })
  if (over) return <End id="chrono" score={score} label="bonnes réponses nettes en 60 secondes" onAgain={again} />
  if (!run) return <div className="quiz"><div className="card pad-lg stack" style={{ textAlign: 'center', justifyItems: 'center' }}>
    <p>Un mot anglais et une traduction s’affichent. Est-ce juste ? Réponds le plus vite possible. +1 si juste, −1 si faux. Clavier : ← faux, → vrai.</p>
    <button className="btn edge" onClick={() => setRun(true)}><Icon n="clock" s={18} />Lancer le chrono</button></div></div>
  return <div className="quiz">
    <div className="row between"><span className={'timer' + (left <= 10 ? ' low' : '')}>{left}s</span><Bar v={left / 60} /><span className="stat-pill num">{score} pts</span></div>
    <div className={'card pad-lg stack'} style={{ textAlign: 'center', gap: 8, borderColor: flash === 'ok' ? 'var(--good)' : flash === 'ko' ? 'var(--bad)' : undefined, borderWidth: 2 }}>
      <div className="prompt">{cur.w.w}</div><div className="muted">=</div><div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{cur.shown}</div>
    </div>
    <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <button className="btn bad" onClick={() => answer(false)}><Icon n="x" />Faux</button><button className="btn good" onClick={() => answer(true)}><Icon n="check" />Vrai</button>
    </div>
  </div>
}

function Builder({ lv, again }: GP) {
  const ss = useMemo(() => sample(sentencesOfLevel(lv).filter(s => { const n = tokens(s.en).length; return n >= 4 && n <= (lv <= 2 ? 9 : 13) }), 6), [])
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const s = ss[i]
  const toks = useMemo(() => s ? tokens(s.en).filter(t => /\w/.test(t)) : [], [i])
  const [pool, setPool] = useState<number[]>([])
  const [chosen, setChosen] = useState<number[]>([])
  const [res, setRes] = useState<'' | 'ok' | 'ko'>('')
  useEffect(() => { setPool(shuffle(toks.map((_, k) => k))); setChosen([]); setRes('') }, [i])
  if (!s) return <End id="phrase" score={score} label={`phrase${score > 1 ? 's' : ''} correcte${score > 1 ? 's' : ''} sur ${ss.length}`} onAgain={again} />
  const built = chosen.map(k => toks[k]).join(' ')
  function check() { const ok = norm(built) === norm(toks.join(' ')); setRes(ok ? 'ok' : 'ko'); blip(ok ? 'ok' : 'bad'); recordAnswer(ok); if (ok) setScore(x => x + 1); speak(s.en) }
  return <div className="quiz">
    <div className="row between"><span className="eyebrow">Phrase {i + 1} / {ss.length}</span><span className="stat-pill">{score} pts</span></div>
    <div className="prompt" style={{ fontSize: '1.2rem' }}>{s.fr}</div>
    <div className="tokens target">{chosen.map((k, j) => <button key={j} className="tok" disabled={!!res} onClick={() => { setChosen(chosen.filter((_, x) => x !== j)); setPool([...pool, k]) }}>{toks[k]}</button>)}</div>
    <div className="tokens">{pool.map((k, j) => <button key={j} className="tok" disabled={!!res} onClick={() => { setPool(pool.filter((_, x) => x !== j)); setChosen([...chosen, k]) }}>{toks[k]}</button>)}</div>
    {res && <div className={'feedback ' + res}><b>{res === 'ok' ? 'Parfait !' : 'Pas tout à fait.'}</b><div className="why row" style={{ flexWrap: 'nowrap' }}><Speak text={s.en} /><span>{s.en}</span></div></div>}
    {!res ? <button className="btn" disabled={pool.length > 0} onClick={check}>Vérifier</button> : <button className="btn" onClick={() => setI(i + 1)}>Continuer</button>}
  </div>
}

function Dictee({ lv, again }: GP) {
  const ss = useMemo(() => sample(sentencesOfLevel(lv).filter(s => { const n = wordsOf(s.en).length; return n >= 3 && n <= (lv <= 2 ? 7 : 11) && !/[A-Z][a-z]+ [A-Z]/.test(s.en.slice(1)) }), 6), [])
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [res, setRes] = useState<null | { ok: boolean; diff: { w: string; ok: boolean }[] }>(null)
  const [score, setScore] = useState(0)
  const inp = useRef<HTMLInputElement>(null)
  const s = ss[i]
  useEffect(() => { if (s) { setTimeout(() => speak(s.en), 300); setTxt(''); setRes(null); inp.current?.focus() } }, [i])
  if (!s) return <End id="dictee" score={score} label={`phrases parfaites sur ${ss.length}`} onAgain={again} />
  function check() {
    const target = wordsOf(s.en).map(w => w.toLowerCase().replace(/’/g, "'")), got = wordsOf(txt).map(w => w.toLowerCase().replace(/’/g, "'"))
    const diff = target.map((w, k) => ({ w: wordsOf(s.en)[k], ok: got[k] === w }))
    const ok = diff.every(d => d.ok) && got.length === target.length
    setRes({ ok, diff }); blip(ok ? 'ok' : 'bad'); recordAnswer(ok); if (ok) setScore(x => x + 1)
  }
  return <div className="quiz">
    <div className="row between"><span className="eyebrow">Phrase {i + 1} / {ss.length}</span><span className="stat-pill">{score} pts</span></div>
    <div className="row" style={{ justifyContent: 'center' }}>
      <button className="btn edge" onClick={() => speak(s.en)}><Icon n="sound" s={18} />Écouter</button>
      <button className="btn ghost" onClick={() => speak(s.en, { rate: 0.6 })}>Lentement</button>
    </div>
    <form onSubmit={e => { e.preventDefault(); res ? setI(i + 1) : check() }} className="stack">
      <input id="dictee-in" ref={inp} className="field answer-input" value={txt} onChange={e => setTxt(e.target.value)} disabled={!!res} placeholder="Écris ce que tu entends…" autoComplete="off" spellCheck={false} />
      {res && <div className={'feedback ' + (res.ok ? 'ok' : 'ko')}><b>{res.ok ? 'Parfait !' : 'Correction :'}</b>
        <div className="why" style={{ fontSize: '1.1rem' }}>{res.diff.map((d, k) => <span key={k} style={{ color: d.ok ? 'var(--good)' : 'var(--bad)', fontWeight: 700, textDecoration: d.ok ? 'none' : 'underline' }}>{d.w} </span>)}</div>
        <div className="why muted small">{s.fr}</div></div>}
      <button className="btn" type="submit" disabled={!res && !txt.trim()}>{res ? 'Continuer' : 'Vérifier'}</button>
    </form>
  </div>
}

function Anagram({ lv, again }: GP) {
  const ws = useMemo(() => sample(usable(lv).filter(w => w.w.length >= 4 && w.w.length <= 10 && !w.w.includes('-')), 8), [])
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const w = ws[i]
  const letters = useMemo(() => { if (!w) return []; let l = shuffle(w.w.toLowerCase().split('')); if (l.join('') === w.w.toLowerCase()) l = l.reverse(); return l }, [i])
  const [used, setUsed] = useState<number[]>([])
  const [res, setRes] = useState<'' | 'ok' | 'ko'>('')
  useEffect(() => { setUsed([]); setRes('') }, [i])
  if (!w) return <End id="anagramme" score={score} label={`mots trouvés sur ${ws.length}`} onAgain={again} />
  const guess = used.map(k => letters[k]).join('')
  function add(k: number) { if (res || used.includes(k)) return; const u = [...used, k]; setUsed(u); if (u.length === letters.length) { const g = u.map(x => letters[x]).join(''); const ok = g === w.w.toLowerCase(); setRes(ok ? 'ok' : 'ko'); blip(ok ? 'ok' : 'bad'); recordAnswer(ok); speak(w.w); if (ok) setScore(s => s + 1) } }
  return <div className="quiz">
    <div className="row between"><span className="eyebrow">Mot {i + 1} / {ws.length}</span><span className="stat-pill">{score} pts</span></div>
    <div className="prompt" style={{ textAlign: 'center' }}>{firstFr(w)}</div>
    <div className="slots">{letters.map((_, k) => <span key={k} className="slot">{guess[k] || ''}</span>)}</div>
    <div className="letters">{letters.map((l, k) => <button key={k} className={'letter' + (used.includes(k) ? ' used' : '')} onClick={() => add(k)}>{l}</button>)}</div>
    {res ? <><div className={'feedback ' + res}><b>{res === 'ok' ? 'Bravo !' : 'Le mot était : ' + w.w}</b><div className="why">{w.w} = {w.fr}</div></div><button className="btn" onClick={() => setI(i + 1)}>Continuer</button></>
      : <button className="btn ghost" onClick={() => setUsed(used.slice(0, -1))} disabled={!used.length}>Effacer une lettre</button>}
  </div>
}

function Hangman({ lv, again }: GP) {
  const w = useMemo(() => pick(usable(lv).filter(x => x.w.length >= 5 && /^[a-z]+$/.test(x.w))), [])
  const [tried, setTried] = useState<string[]>([])
  const word = w.w.toLowerCase()
  const misses = tried.filter(l => !word.includes(l)).length
  const won = word.split('').every(l => tried.includes(l)), lost = misses >= 7
  function guess(l: string) { if (won || lost || tried.includes(l)) return; setTried([...tried, l]); blip(word.includes(l) ? 'ok' : 'bad') }
  useEffect(() => { const f = (e: KeyboardEvent) => { if (/^[a-z]$/.test(e.key)) guess(e.key) }; addEventListener('keydown', f); return () => removeEventListener('keydown', f) })
  useEffect(() => { if (won || lost) { recordAnswer(won); speak(w.w) } }, [won, lost])
  if (won || lost) return <End id="pendu" score={won ? (7 - misses) * 10 + word.length : 0} label={won ? `points · ${misses} erreur${misses > 1 ? 's' : ''}` : 'Perdu… le mot était « ' + w.w + ' »'} onAgain={again} extra={<p><b>{w.w}</b> = {w.fr}</p>} />
  return <div className="quiz">
    <div className="row between"><span className="eyebrow">Indice : {firstFr(w)}</span><span className="stat-pill">{7 - misses} vies</span></div>
    <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: 260, justifySelf: 'center' }} aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M20 112h90M45 112V10h70v14" />
        {misses > 0 && <circle cx="115" cy="34" r="10" />}{misses > 1 && <path d="M115 44v32" />}{misses > 2 && <path d="M115 52l-14 12" />}{misses > 3 && <path d="M115 52l14 12" />}{misses > 4 && <path d="M115 76l-12 18" />}{misses > 5 && <path d="M115 76l12 18" />}
      </g>{misses > 6 && <path d="M0 0" />}
      <rect x="130" y="108" width="60" height="6" fill="var(--edge)" />
    </svg>
    <div className="slots">{word.split('').map((l, k) => <span key={k} className="slot">{tried.includes(l) ? l : ''}</span>)}</div>
    <div className="kb">{'abcdefghijklmnopqrstuvwxyz'.split('').map(l => <button key={l} disabled={tried.includes(l)} className={tried.includes(l) ? (word.includes(l) ? 'hit' : 'miss') : ''} onClick={() => guess(l)}>{l}</button>)}</div>
  </div>
}

function Spell({ lv, again }: GP) {
  const qs = useMemo<Q[]>(() => sample(usable(lv).filter(w => w.w.length >= 4), 10).map((w: Word) => ({
    kind: 'type', label: 'Écoute et écris le mot', say: w.w, prompt: <span className="small muted" style={{ fontFamily: 'var(--f-body)' }}>Indice : {firstFr(w)}</span>, answers: [[w.w]], lenient: false, placeholder: 'orthographe exacte', why: <>{w.w} = {w.fr}</>,
  })), [])
  return <QuizGame id="epelle" qs={qs} again={again} xpPer={3} />
}
export { allSentences, closeEnough }
