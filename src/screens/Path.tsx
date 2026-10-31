import { Icon } from '../ui/Icon'
import { Bar } from '../ui/common'
import { useStore } from '../lib/store'
import { lessonsByLevel } from '../lib/lesson'
import { packsOfLevel } from '../lib/data'
import { LEVELS } from '../lib/util'

const DESC = [
  'Se présenter, parler de son quotidien, comprendre des phrases très simples.',
  'Raconter au passé, parler de ses projets, se débrouiller en voyage.',
  'Exprimer son expérience, donner son avis, comprendre l’essentiel d’une conversation.',
  'Argumenter, nuancer, suivre des films et des conversations rapides.',
  'S’exprimer avec aisance, structures soutenues, registres variés.',
  'Maîtrise quasi native : nuances, style, idiomatismes.',
]
export function Path() {
  const s = useStore(s => s)
  return <div className="page">
    <div className="stack" style={{ gap: 6 }}>
      <div className="eyebrow">Ton parcours</div>
      <h1>Le plan des lignes</h1>
      <p className="muted" style={{ maxWidth: '60ch' }}>Chaque niveau du Cadre européen (CECRL) est une ligne. Chaque station est une leçon de grammaire avec exemples et exercices. Une station est validée à partir de 60 % de bonnes réponses.</p>
    </div>
    <div className="lines">
      {LEVELS.map(L => {
        const ls = lessonsByLevel(L.n)
        const done = ls.filter(l => (s.lessons[l.id] || 0) >= 60).length
        const packs = packsOfLevel(L.n)
        const learned = packs.flat().filter(w => s.srs[w.id]).length
        const total = packs.flat().length
        return <section key={L.n} className="line-card" style={{ ['--c' as any]: L.color }} id={'ligne-' + L.code}>
          <div className="line-head">
            <div className="line-roundel">{L.code}</div>
            <div className="stack" style={{ gap: 2, flex: 1, minWidth: 180 }}>
              <h2>Ligne {L.code} · {L.name}</h2>
              <p className="small muted">{DESC[L.n - 1]}</p>
            </div>
            {s.level === L.n && <span className="chip on">Ton niveau</span>}
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
            <div className="stack" style={{ gap: 6 }}><div className="row between small"><b>Grammaire</b><span className="num muted">{done}/{ls.length}</span></div><Bar v={done / Math.max(1, ls.length)} /></div>
            <div className="stack" style={{ gap: 6 }}><div className="row between small"><b>Vocabulaire</b><span className="num muted">{learned}/{total}</span></div><Bar v={learned / Math.max(1, total)} /></div>
          </div>
          <div className="stations">
            {ls.map((l, i) => {
              const sc = s.lessons[l.id]
              return <a key={l.id} href={'#lecon-' + l.id} className={'station' + (sc >= 60 ? ' done' : '') + (l.tense ? ' interchange' : '')}>
                <span className="dot" />
                <span style={{ minWidth: 0 }}><span className="st-name">{l.title}</span><br /><span className="st-sub">{l.en}{l.tense ? ' · temps verbal' : ''}</span></span>
                {sc != null ? <span className={'score' + (sc >= 100 ? ' full' : '')}>{sc}%</span> : <span className="muted"><Icon n="arrow" s={16} /></span>}
              </a>
            })}
            <a href={'#vocabulaire-' + L.n} className="station interchange">
              <span className="dot" /><span><span className="st-name">Vocabulaire {L.code}</span><br /><span className="st-sub">{total} mots en {packs.length} paquets</span></span><span className="muted"><Icon n="arrow" s={16} /></span>
            </a>
            <a href={'#examen-' + L.n} className="station interchange">
              <span className="dot" /><span><span className="st-name">Examen de fin de ligne {L.code}</span><br /><span className="st-sub">20 questions de grammaire et de vocabulaire</span></span>
              {s.games['exam' + L.n] != null ? <span className={'score' + (s.games['exam' + L.n] >= 100 ? ' full' : '')}>{s.games['exam' + L.n]}%</span> : <span className="muted"><Icon n="flag" s={16} /></span>}
            </a>
          </div>
        </section>
      })}
    </div>
  </div>
}
