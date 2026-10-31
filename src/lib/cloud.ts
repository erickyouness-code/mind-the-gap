// Optional cloud backup of progress when the page runs inside a claude.ai artifact viewer.
import { getState, onSaved, replaceState, type State } from './store'
let col: any = null
export let cloudStatus: 'off' | 'on' = 'off'
const listeners = new Set<() => void>()
export const onCloud = (f: () => void) => { listeners.add(f); return () => listeners.delete(f) }
function split(s: State) {
  const { srs, ...main } = s
  const parts: Record<string, any> = { main: { json: JSON.stringify(main), at: s.updatedAt } }
  const chunks: Record<string, any>[] = [{}, {}, {}, {}]
  Object.entries(srs).forEach(([k, v], i) => { chunks[i % 4][k] = v })
  chunks.forEach((c, i) => { parts['srs' + i] = { json: JSON.stringify(c), at: s.updatedAt } })
  return parts
}
let timer: any, last: Record<string, string> = {}
async function push(s: State) {
  if (!col) return
  const parts = split(s)
  for (const [k, v] of Object.entries(parts)) {
    if (last[k] === v.json) continue
    try { await col.doc(k).set(v); last[k] = v.json } catch { /* offline or refused */ }
  }
}
export async function initCloud() {
  try {
    const c = (window as any).claude
    if (!c?.use) return
    const [db, user] = await Promise.all([c.use('db'), c.use('user')])
    if (!db || !user) return
    const id = await user.id()
    if (!id) return
    col = db.collection('data/users/' + id)
    const snaps = await Promise.all(['main', 'srs0', 'srs1', 'srs2', 'srs3'].map(k => col.doc(k).get().catch(() => null)))
    const main = snaps[0]?.exists ? snaps[0].data() : null
    if (main && main.at > getState().updatedAt) {
      const st = JSON.parse(main.json)
      st.srs = {}
      snaps.slice(1).forEach((sn: any) => { if (sn?.exists) Object.assign(st.srs, JSON.parse(sn.data().json)) })
      replaceState(st)
    } else push(getState())
    snaps.forEach((sn: any, i) => { if (sn?.exists) last[['main', 'srs0', 'srs1', 'srs2', 'srs3'][i]] = sn.data().json })
    cloudStatus = 'on'; listeners.forEach(f => f())
    onSaved.add(s => { clearTimeout(timer); timer = setTimeout(() => push(s), 3000) })
  } catch { /* cloud not available */ }
}
