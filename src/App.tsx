import { useEffect, useState } from 'react'
import { Icon, Logo } from './ui/Icon'
import { useRoute } from './ui/router'
import { loadData } from './lib/data'
import { dueIds, setToaster, useStore } from './lib/store'
import { initCloud } from './lib/cloud'
import { Home } from './screens/Home'
import { Path } from './screens/Path'
import { Lesson } from './screens/Lesson'
import { Placement, Exam } from './screens/Placement'
import { Vocab, Learn, Review, Dictionary } from './screens/Vocab'
import { Tenses, Conjugator, Irregulars } from './screens/Tenses'
import { GamesList, Game } from './games/Games'
import { Expressions, Situations, Pronunciation, Stats, SettingsScreen } from './screens/More'

const NAV: { h: string; n: string; i: string; group?: string }[] = [
  { h: 'accueil', n: 'Accueil', i: 'home' }, { h: 'parcours', n: 'Parcours', i: 'path' }, { h: 'revisions', n: 'Révisions', i: 'cards' },
  { h: 'vocabulaire', n: 'Vocabulaire', i: 'layers' }, { h: 'jeux', n: 'Jeux', i: 'game' },
  { h: 'temps', n: 'Tous les temps', i: 'clock', group: 'Boîte à outils' }, { h: 'conjugueur', n: 'Conjugueur', i: 'pen' }, { h: 'irreguliers', n: 'Verbes irréguliers', i: 'list' },
  { h: 'expressions', n: 'Expressions', i: 'chat' }, { h: 'situations', n: 'Situations', i: 'globe' }, { h: 'prononciation', n: 'Prononciation', i: 'mic' }, { h: 'dictionnaire', n: 'Dictionnaire', i: 'search' },
  { h: 'stats', n: 'Statistiques', i: 'chart', group: 'Moi' }, { h: 'reglages', n: 'Réglages', i: 'gear' },
]
const SECTION: Record<string, string> = { lecon: 'parcours', examen: 'parcours', test: 'accueil', apprendre: 'vocabulaire', jeu: 'jeux' }

function Toasts() {
  const [list, setList] = useState<{ id: number; title: string; sub?: string }[]>([])
  useEffect(() => { setToaster(t => { const id = Math.random(); setList(l => [...l, { id, ...t }]); setTimeout(() => setList(l => l.filter(x => x.id !== id)), 4200) }) }, [])
  return <div className="toasts" aria-live="polite">{list.map(t => <div key={t.id} className="toast"><b>{t.title}</b>{t.sub && <div className="small" style={{ opacity: .8 }}>{t.sub}</div>}</div>)}</div>
}
function MoreMenu() {
  return <div className="page"><h1>Plus</h1><div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>{NAV.slice(3).map(n => <a key={n.h} className="tile" href={'#' + n.h}><div className="ic"><Icon n={n.i} /></div><h3>{n.n}</h3></a>)}</div></div>
}
export function App() {
  const { r, p } = useRoute()
  const [ready, setReady] = useState<'load' | 'ok' | 'err'>('load')
  const theme = useStore(s => s.settings.theme)
  const due = useStore(s => dueIds(s).length)
  const streak = useStore(s => s.streak)
  const xp = useStore(s => s.xp)
  useEffect(() => { loadData().then(() => setReady('ok'), () => setReady('err')); initCloud() }, [])
  useEffect(() => { if (theme === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', theme) }, [theme])
  const section = SECTION[r] || r
  const screen = (() => {
    switch (r) {
      case 'accueil': return <Home />
      case 'parcours': return <Path />
      case 'lecon': return <Lesson id={p} key={p} />
      case 'test': return <Placement />
      case 'examen': return <Exam lv={parseInt(p)} key={p} />
      case 'vocabulaire': return <Vocab lv={p} key={p} />
      case 'apprendre': return <Learn p={p} key={p} />
      case 'revisions': return <Review />
      case 'dictionnaire': return <Dictionary />
      case 'temps': return <Tenses />
      case 'conjugueur': return <Conjugator />
      case 'irreguliers': return <Irregulars />
      case 'jeux': return <GamesList />
      case 'jeu': return <Game id={p} key={p} />
      case 'expressions': return <Expressions tab={p} />
      case 'situations': return <Situations id={p} key={p} />
      case 'prononciation': return <Pronunciation />
      case 'stats': return <Stats />
      case 'reglages': return <SettingsScreen />
      case 'plus': return <MoreMenu />
    }
    return <Home />
  })()
  let group = ''
  return <div className="app">
    <aside className="side">
      <a className="brand" href="#accueil"><Logo /><span className="brand-name">Mind the Gap<small>English · A1 → C2</small></span></a>
      <nav className="nav" aria-label="Navigation principale">{NAV.map(n => {
        const label = n.group && n.group !== group ? (group = n.group, <div className="nav-label">{n.group}</div>) : null
        return <div key={n.h} style={{ display: 'contents' }}>{label}<a href={'#' + n.h} className={section === n.h ? 'on' : ''}><Icon n={n.i} s={19} />{n.n}{n.h === 'revisions' && due > 0 && <span className="badge-dot">{due}</span>}</a></div>
      })}</nav>
      <div className="side-foot"><div className="row" style={{ gap: 8 }}><span className="stat-pill fire"><Icon n="flame" s={15} />{streak} j</span><span className="stat-pill"><Icon n="bolt" s={15} />{xp} XP</span></div></div>
    </aside>
    <header className="topbar"><a className="brand" href="#accueil" style={{ padding: 0 }}><Logo s={30} /><span className="brand-name" style={{ fontSize: '1.05rem' }}>Mind the Gap</span></a>
      <div className="row" style={{ gap: 6 }}><span className="stat-pill fire"><Icon n="flame" s={14} />{streak}</span><span className="stat-pill"><Icon n="bolt" s={14} />{xp}</span></div></header>
    <main className="main">{ready === 'ok' ? screen : ready === 'err' ? <div className="page"><div className="card pad-lg stack"><h2>Impossible de charger le vocabulaire</h2><p className="muted">Vérifie ta connexion, puis recharge la page.</p><button className="btn" onClick={() => location.reload()}>Recharger</button></div></div>
      : <div className="page"><div className="empty"><Logo s={56} /><p>Chargement de 9 500 mots et 18 000 phrases…</p></div></div>}</main>
    <nav className="tabbar" aria-label="Navigation">{[['accueil', 'Accueil', 'home'], ['parcours', 'Parcours', 'path'], ['revisions', 'Réviser', 'cards'], ['jeux', 'Jeux', 'game'], ['plus', 'Plus', 'more']].map(([h, n, i]) =>
      <a key={h} href={'#' + h} className={section === h || (h === 'plus' && !['accueil', 'parcours', 'revisions', 'jeux'].includes(section)) ? 'on' : ''}><Icon n={i} s={22} />{n}{h === 'revisions' && due > 0 ? ` (${due})` : ''}</a>)}</nav>
    <Toasts />
  </div>
}
