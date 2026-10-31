import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { speak } from '../lib/speech'
import { LEVELS } from '../lib/util'
export function Speak({ text, rate, title = 'Écouter' }: { text: string; rate?: number; title?: string }) {
  return <button className="speak" title={title} aria-label={title + ' : ' + text} onClick={e => { e.stopPropagation(); speak(text, { rate }) }}><Icon n="sound" s={17} /></button>
}
export function LvTag({ lv }: { lv: number }) { const L = LEVELS[lv - 1]; return <span className="lv-tag" style={{ background: L?.color }}>{L?.code}</span> }
export function Bar({ v, ink }: { v: number; ink?: boolean }) { return <div className={'bar' + (ink ? ' ink' : '')} role="progressbar" aria-valuenow={Math.round(v * 100)}><i style={{ width: Math.max(0, Math.min(100, v * 100)) + '%' }} /></div> }
export function Ring({ v, size = 84, label, sub }: { v: number; size?: number; label: string; sub?: string }) {
  const r = size / 2 - 7, c = 2 * Math.PI * r
  return <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
    <svg width={size} height={size}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth="9" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={v >= 1 ? 'var(--good)' : 'var(--edge)'} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * Math.min(1, v)} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dasharray .6s' }} /></svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', lineHeight: 1.05 }}><div><b className="num" style={{ fontFamily: 'var(--f-display)', fontSize: size > 70 ? '1.25rem' : '.95rem' }}>{label}</b>{sub && <div className="tiny muted">{sub}</div>}</div></div>
  </div>
}
export function Back({ to, label }: { to: string; label: string }) { return <a className="backlink" href={'#' + to}><Icon n="back" s={16} />{label}</a> }
export function Rich({ t }: { t: string }) {
  const parts = t.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return <>{parts.map((p, i) => p.startsWith('**') ? <strong className="k" key={i}>{p.slice(2, -2)}</strong> : p.startsWith('`') ? <code key={i}>{p.slice(1, -1)}</code> : p)}</>
}
export function useKey(handler: (e: KeyboardEvent) => void, deps: any[]) {
  useEffect(() => { const f = (e: KeyboardEvent) => { if ((e.target as HTMLElement)?.tagName === 'INPUT') return; handler(e) }; addEventListener('keydown', f); return () => removeEventListener('keydown', f) }, deps)
}
export function useTimer(seconds: number, running: boolean, onEnd: () => void) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => { if (!running) return; if (left <= 0) { onEnd(); return } const t = setTimeout(() => setLeft(l => l - 1), 1000); return () => clearTimeout(t) }, [left, running])
  return [left, setLeft] as const
}
