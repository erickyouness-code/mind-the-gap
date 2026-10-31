import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'
import { Back, Bar, LvTag, Speak, useKey } from '../ui/common'
import { QuizRunner } from '../ui/Quiz'
import { allSentences, allWords, packsOfLevel, posLabel, wordById, type Word } from '../lib/data'
import { vocabSession, wordQuestion } from '../lib/questions'
import { dueIds, MASTERED, review, useStore } from '../lib/store'
import { LEVELS, shuffle, stripAccents } from '../lib/util'
import { speak } from '../lib/speech'
import { go } from '../ui/router'

export function Vocab({ lv: lvp }: { lv: string }) {
  const s = useStore(s => s)
  const lv = Math.min(6, Math.max(1, parseInt(lvp) || s.level))
  const [tab, setTab] = useState<'packs' | 'list'>('packs')
  const [q, setQ] = useState('')
  const packs = packsOfLevel(lv)
  const all = packs.flat()
  const learned = all.filter(w => s.srs[w.id]).length
  const list = useMemo(() => { const n = stripAccents(q.toLowerCase().trim()); return n ? all.filter(w => w.w.toLowerCase().includes(n) || stripAccents(w.fr.toLowerCase()).includes(n)) : all }, [q, lv])
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}>
      <div className="eyebrow">Vocabulaire · {allWords().length.toLocaleString('fr-FR')} mots classés par niveau et par fréquence</div>
      <h1>Les mots de la ligne {LEVELS[lv - 1].code}</h1>
    </div>
    <div className="seg" role="tablist">{LEVELS.map(L => <button key={L.n} className={L.n === lv ? 'on' : ''} onClick={() => go('vocabulaire-' + L.n)}>{L.code}</button>)}</div>
    <div className="card row between">
      <div className="stack" style={{ gap: 6, flex: 1, minWidth: 200 }}>
        <div className="row between small"><b>{learned} / {all.length} mots appris</b><span className="muted">{packs.length} paquets de 20</span></div>
        <Bar v={learned / Math.max(1, all.length)} />
      </div>
      <div className="seg"><button className={tab === 'packs' ? 'on' : ''} onClick={() => setTab('packs')}>Paquets</button><button className={tab === 'list' ? 'on' : ''} onClick={() => setTab('list')}>Liste complète</button></div>
    </div>
    {tab === 'packs' ? <div className="grid">
      {packs.map((p, i) => {
        const k = p.filter(w => s.srs[w.id]).length, m = p.filter(w => (s.srs[w.id]?.[0] ?? -1) >= MASTERED).length
        return <button key={i} className="pack" onClick={() => go(`apprendre-${lv}-${i}`)}>
          <div className="row between"><b>Paquet {i + 1}</b>{k === p.length ? <span className="score full">{m === p.length ? 'maîtrisé' : 'appris'}</span> : k > 0 ? <span className="score">{k}/{p.length}</span> : null}</div>
          <div className="preview">{p.map(w => w.w).join(', ')}</div>
          <Bar v={k / p.length} />
        </button>
      })}
    </div> : <div className="stack">
      <input id="vocab-filter" className="field" placeholder="Filtrer (anglais ou français)…" value={q} onChange={e => setQ(e.target.value)} />
      <div className="card" style={{ padding: 0 }}>{list.slice(0, 400).map(w => <WordRow key={w.id} w={w} known={!!s.srs[w.id]} />)}</div>
      {list.length > 400 && <p className="muted small">400 premiers résultats affichés sur {list.length}. Affine ta recherche.</p>}
    </div>}
  </div>
}
export function WordRow({ w, known, showLv }: { w: Word; known?: boolean; showLv?: boolean }) {
  return <div className="wordrow"><Speak text={w.w} />
    <div style={{ minWidth: 0 }}><span className="en">{w.w}</span> <span className="pos">{posLabel[w.pos] || w.pos}</span><div className="fr">{w.fr}</div></div>
    <div className="row" style={{ gap: 6 }}>{showLv && <LvTag lv={w.lv} />}{known && <span title="appris" style={{ color: 'var(--good)' }}><Icon n="check" s={18} /></span>}</div>
  </div>
}

export function Flashcard({ w, flipped, onFlip }: { w: Word; flipped: boolean; onFlip: () => void }) {
  const S = allSentences()
  return <div className={'flash' + (flipped ? ' flipped' : '')} onClick={onFlip} role="button" tabIndex={0} aria-label="Retourner la carte">
    <div className="flash-inner">
      <div className="face"><span className="eyebrow">{posLabel[w.pos] || w.pos}</span><div className="big-word">{w.w}</div><Speak text={w.w} /><span className="tiny muted">Touche la carte pour voir la traduction</span><div className="platform" /></div>
      <div className="face back" style={{ alignContent: 'start', overflowY: 'auto' }}>
        <div className="row" style={{ justifyContent: 'center' }}><b style={{ fontFamily: 'var(--f-display)', fontSize: '1.5rem' }}>{w.w}</b><Speak text={w.w} /></div>
        <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{w.fr}</div>
        {w.gl && <div className="small muted"><i>{w.gl}</i></div>}
        {w.ex.slice(0, 1).map(i => S[i] && <div key={i} className="ex" style={{ textAlign: 'left', width: '100%' }}><Speak text={S[i].en} /><span className="en">{S[i].en}</span><span className="fr">{S[i].fr}</span></div>)}
      </div>
    </div>
  </div>
}

export function Learn({ p }: { p: string }) {
  const [lvS, packS] = p.split('-'); const lv = parseInt(lvS), pi = parseInt(packS)
  const pack = packsOfLevel(lv)[pi] || []
  const srs = useStore(s => s.srs)
  const [phase, setPhase] = useState<'cards' | 'quiz'>('cards')
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const [known, setKnown] = useState<string[]>([])
  const toStudy = useMemo(() => pack.filter(w => !known.includes(w.id)), [phase])
  const qs = useMemo(() => vocabSession(toStudy.length ? toStudy : pack, packsOfLevel(lv).flat()), [phase])
  const w = pack[i]
  function nextCard(knew: boolean) {
    if (knew) { setKnown(k => [...k, w.id]); review(w.id, true, true) }
    setFlip(false)
    if (i + 1 >= pack.length) setPhase('quiz'); else { setI(i + 1); speak(pack[i + 1].w) }
  }
  useKey(e => { if (phase !== 'cards') return; if (e.key === ' ') { e.preventDefault(); setFlip(f => !f) } if (e.key === 'ArrowRight') nextCard(false) }, [phase, i])
  if (!pack.length) return <div className="page"><Back to={'vocabulaire-' + lv} label="Vocabulaire" /><p>Paquet introuvable.</p></div>
  if (phase === 'quiz') return <div className="page"><QuizRunner questions={qs} title={`Paquet ${pi + 1} · ${LEVELS[lv - 1].code}`} onExit={() => go('vocabulaire-' + lv)} /></div>
  return <div className="page"><div className="quiz">
    <div className="quiz-top"><button className="icon-btn" onClick={() => go('vocabulaire-' + lv)} aria-label="Quitter"><Icon n="x" /></button><Bar v={i / pack.length} /><span className="tiny muted num">{i + 1}/{pack.length}</span></div>
    <div className="row between"><span className="eyebrow">Découverte · paquet {pi + 1} {LEVELS[lv - 1].code}</span>{srs[w.id] && <span className="score">déjà vu</span>}</div>
    <Flashcard w={w} flipped={flip} onFlip={() => setFlip(f => !f)} />
    <div className="row" style={{ justifyContent: 'center' }}>
      <button className="btn ghost" onClick={() => nextCard(true)}><Icon n="check" s={18} />Je le connais déjà</button>
      <button className="btn" onClick={() => flip ? nextCard(false) : setFlip(true)}>{flip ? 'Suivant' : 'Voir la traduction'}<Icon n="arrow" s={18} /></button>
    </div>
    <button className="btn line sm" style={{ justifySelf: 'center' }} onClick={() => setPhase('quiz')}>Passer directement au quiz</button>
  </div></div>
}

export function Review() {
  const s = useStore(s => s)
  const [started, setStarted] = useState(false)
  const ids = useMemo(() => shuffle(dueIds(s)).slice(0, 25), [started])
  const words = ids.map(wordById).filter(Boolean) as Word[]
  const qs = useMemo(() => words.map(w => wordQuestion(w, 'auto')), [started])
  const total = Object.keys(s.srs).length
  const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0]; Object.values(s.srs).forEach(c => boxes[c[0]]++)
  if (started && qs.length) return <div className="page"><QuizRunner questions={qs} title="Révisions" onExit={() => setStarted(false)} /></div>
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Répétition espacée</div><h1>Révisions</h1>
      <p className="muted" style={{ maxWidth: '62ch' }}>Chaque mot appris revient juste avant que tu ne l’oublies : le lendemain, puis après 2, 4, 7, 14, 30 jours… Une erreur le fait redescendre. C’est la méthode la plus efficace pour retenir des milliers de mots.</p></div>
    <div className="card pad-lg stack">
      <h2>{dueIds(s).length ? `${dueIds(s).length} mot${dueIds(s).length > 1 ? 's' : ''} à réviser aujourd’hui` : 'Tout est à jour !'}</h2>
      {dueIds(s).length ? <button className="btn edge" style={{ justifySelf: 'start' }} onClick={() => setStarted(true)}><Icon n="cards" s={18} />Réviser {Math.min(25, dueIds(s).length)} mots</button>
        : <p className="muted">{total ? 'Reviens demain, ou apprends un nouveau paquet en attendant.' : 'Apprends ton premier paquet de mots pour commencer.'}</p>}
      {!dueIds(s).length && <a className="btn ghost" style={{ justifySelf: 'start' }} href={'#vocabulaire-' + s.level}>Apprendre de nouveaux mots</a>}
    </div>
    {total > 0 && <div className="card stack">
      <h3>Tes {total} mots par étape de mémorisation</h3>
      <div className="stack" style={{ gap: 6 }}>{boxes.map((n, b) => <div key={b} className="row" style={{ flexWrap: 'nowrap' }}>
        <span className="mono tiny" style={{ width: 92, flex: 'none' }}>{['À revoir', '1 jour', '2 jours', '4 jours', '1 semaine', '2 semaines', '1 mois', '2 mois', '4 mois'][b]}</span>
        <div className="bar" style={{ flex: 1 }}><i style={{ width: (n / total * 100) + '%', background: b >= MASTERED ? 'var(--good)' : 'var(--edge)' }} /></div>
        <span className="mono tiny num" style={{ width: 40, textAlign: 'right' }}>{n}</span></div>)}</div>
    </div>}
  </div>
}

export function Dictionary() {
  const srs = useStore(s => s.srs)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Word | null>(null)
  const res = useMemo(() => {
    const n = stripAccents(q.toLowerCase().trim()); if (n.length < 1) return []
    const ws = allWords()
    const exact = ws.filter(w => w.w.toLowerCase() === n)
    const starts = ws.filter(w => w.w.toLowerCase().startsWith(n) && !exact.includes(w))
    const fr = n.length > 2 ? ws.filter(w => !w.w.toLowerCase().startsWith(n) && stripAccents(w.fr.toLowerCase()).split(/ · |, /).some(t => t.startsWith(n))) : []
    return [...exact, ...starts.sort((a, b) => a.f - b.f), ...fr.sort((a, b) => a.f - b.f)].slice(0, 60)
  }, [q])
  const S = allSentences()
  const more = useMemo(() => sel ? S.filter(s => new RegExp('\\b' + sel.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(s.en)).slice(0, 8) : [], [sel])
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}><div className="eyebrow">Dictionnaire anglais ⇄ français</div><h1>Chercher un mot</h1></div>
    <input id="dict-q" className="field" autoFocus placeholder="Tape un mot en anglais ou en français…" value={q} onChange={e => { setQ(e.target.value); setSel(null) }} />
    {sel ? <div className="card pad-lg stack">
      <button className="backlink" style={{ border: 0, background: 'none', padding: 0, justifySelf: 'start' }} onClick={() => setSel(null)}><Icon n="back" s={16} />Résultats</button>
      <div className="row"><h1>{sel.w}</h1><Speak text={sel.w} /><span className="pos">{posLabel[sel.pos]}</span><LvTag lv={sel.lv} /></div>
      <p style={{ fontSize: '1.15rem' }}><b>{sel.fr}</b></p>
      {sel.gl && <p className="muted"><i>Définition : {sel.gl}</i></p>}
      <div className="row"><button className="btn sm" onClick={() => review(sel.id, true)} disabled={!!srs[sel.id]}>{srs[sel.id] ? 'Dans tes révisions' : 'Ajouter à mes révisions'}</button><span className="tiny muted">Rang de fréquence : {sel.f < 50000 ? '#' + sel.f.toLocaleString('fr-FR') : 'rare'}</span></div>
      <h3>Exemples</h3>
      {(more.length ? more : sel.ex.map(i => S[i])).map((s, i) => s && <div key={i} className="ex"><Speak text={s.en} /><span className="en">{s.en}</span><span className="fr">{s.fr}</span></div>)}
      {!more.length && !sel.ex.length && <p className="muted">Pas d’exemple disponible pour ce mot.</p>}
    </div> : <div className="card" style={{ padding: 0 }}>
      {res.map(w => <div key={w.id} onClick={() => setSel(w)} style={{ cursor: 'pointer' }}><WordRow w={w} known={!!srs[w.id]} showLv /></div>)}
      {!res.length && <div className="empty">{q ? 'Aucun résultat. Essaie une autre orthographe.' : 'Les 9 500 mots les plus utiles, avec niveau, traductions et exemples.'}</div>}
    </div>}
  </div>
}
