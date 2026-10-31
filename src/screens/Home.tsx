import { useMemo } from 'react'
import { Icon } from '../ui/Icon'
import { Ring, Speak, LvTag, Bar } from '../ui/common'
import { useStore, dueIds, learnedCount, masteredCount, xpLevel } from '../lib/store'
import { allWords, allSentences, packsOfLevel } from '../lib/data'
import { lessons } from '../lib/lesson'
import { LEVELS, today } from '../lib/util'
import { GAMES } from '../games/registry'

export function nextLesson(done: Record<string, number>, level: number) {
  return lessons.find(l => l.lv >= level && !(done[l.id] >= 60)) || lessons.find(l => !(done[l.id] >= 60))
}

export function Home() {
  const s = useStore(s => s)
  const d = today()
  const xpToday = s.daily[d] || 0
  const due = dueIds(s).length
  const next = nextLesson(s.lessons, s.level)
  const L = xpLevel(s.xp)
  const words = allWords()
  const wotd = useMemo(() => {
    const pool = words.filter(w => w.lv >= Math.max(1, s.level) && w.lv <= Math.min(6, s.level + 1) && w.ex.length)
    return pool.length ? pool[(d * 7919) % pool.length] : null
  }, [words.length, d, s.level])
  const ex = wotd && allSentences()[wotd.ex[0]]
  const packs = packsOfLevel(s.level)
  const nextPack = packs.findIndex(p => p.some(w => !s.srs[w.id]))
  const hour = new Date().getHours()
  const hello = hour < 5 ? 'Bonne nuit' : hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return <div className="page">
    <div className="row between">
      <div className="stack" style={{ gap: 4 }}>
        <div className="eyebrow">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <h1>{hello}{s.name ? ', ' + s.name : ''}.</h1>
      </div>
      {!s.placed && <a className="btn edge" href="#test"><Icon n="target" s={18} />Faire le test de niveau</a>}
    </div>

    <div className="hero">
      <div className="next-card">
        <div className="eyebrow">Prochaine station · ligne {LEVELS[(next?.lv || 1) - 1].code}</div>
        <h2>{next ? next.title : 'Toutes les leçons sont terminées !'}</h2>
        <p style={{ opacity: .8 }}>{next ? `${next.blocks.filter(b => b.k === 'ex').length} exemples · ${next.exercises.length} exercices` : 'Continue à réviser ton vocabulaire et à jouer.'}</p>
        {next && <a className="btn" href={'#lecon-' + next.id}>Commencer la leçon<Icon n="arrow" s={18} /></a>}
        <div className="platform" />
      </div>
      <div className="card goal">
        <Ring v={xpToday / s.settings.goal} label={`${xpToday}`} sub={`/ ${s.settings.goal} XP`} size={96} />
        <div className="stack" style={{ gap: 8 }}>
          <h3>{xpToday >= s.settings.goal ? 'Objectif du jour atteint !' : 'Objectif du jour'}</h3>
          <p className="small muted">{xpToday >= s.settings.goal ? 'Tout ce que tu fais maintenant est du bonus.' : `Encore ${s.settings.goal - xpToday} XP pour garder ta série.`}</p>
          <div className="row" style={{ gap: 8 }}>
            <span className="stat-pill fire"><Icon n="flame" s={15} />{s.streak} j</span>
            <span className="stat-pill" title="Protections de série : un jour manqué ne casse pas ta série"><Icon n="lock" s={15} />{s.freeze}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="kpis">
      <div className="kpi"><span className="eyebrow">Mots appris</span><b>{learnedCount(s)}</b><span className="tiny muted">sur {words.length.toLocaleString('fr-FR')}</span></div>
      <div className="kpi"><span className="eyebrow">Maîtrisés</span><b>{masteredCount(s)}</b><span className="tiny muted">révisés sur la durée</span></div>
      <div className="kpi"><span className="eyebrow">Niveau XP</span><b>{L.lvl}</b><Bar v={L.into / L.need} /></div>
      <div className="kpi"><span className="eyebrow">Leçons</span><b>{Object.values(s.lessons).filter(v => v >= 60).length}</b><span className="tiny muted">sur {lessons.length}</span></div>
    </div>

    <div className="grid wide">
      <a className="tile" href="#revisions" style={{ borderColor: due ? 'var(--signal)' : undefined }}>
        <div className="row between"><div className="ic"><Icon n="cards" /></div>{due > 0 && <span className="stat-pill" style={{ background: 'var(--signal)', color: '#fff' }}>{due}</span>}</div>
        <h3>Révisions du jour</h3>
        <p className="small muted">{due ? `${due} mot${due > 1 ? 's' : ''} à revoir avant de les oublier.` : learnedCount(s) ? 'Rien à réviser pour l’instant. Reviens demain !' : 'Apprends tes premiers mots pour lancer la répétition espacée.'}</p>
      </a>
      <a className="tile" href={'#vocabulaire-' + s.level}>
        <div className="ic"><Icon n="layers" /></div>
        <h3>Nouveaux mots · {LEVELS[s.level - 1].code}</h3>
        <p className="small muted">{nextPack >= 0 ? `Paquet ${nextPack + 1} sur ${packs.length} : ${packs[nextPack].slice(0, 4).map(w => w.w).join(', ')}…` : 'Niveau terminé, passe au suivant !'}</p>
      </a>
    </div>

    {wotd && <div className="card pad-lg wotd">
      <div className="row between"><span className="eyebrow">Mot du jour</span><LvTag lv={wotd.lv} /></div>
      <div className="row"><span className="w">{wotd.w}</span><Speak text={wotd.w} /></div>
      <p><b>{wotd.fr}</b>{wotd.gl && <span className="muted"> — {wotd.gl}</span>}</p>
      {ex && <div className="ex"><Speak text={ex.en} /><span className="en">{ex.en}</span><span className="fr">{ex.fr}</span></div>}
    </div>}

    <div className="stack">
      <div className="row between"><h2>Jeux rapides</h2><a className="backlink" href="#jeux">Tous les jeux<Icon n="arrow" s={16} /></a></div>
      <div className="grid">
        {GAMES.slice(0, 6).map(g => <a key={g.id} className="tile" href={'#jeu-' + g.id}>
          <div className="ic"><Icon n={g.icon} /></div><h3>{g.name}</h3><p className="small muted">{g.desc}</p>
        </a>)}
      </div>
    </div>
  </div>
}
