import { useEffect, useState } from 'react'
export function parseHash() {
  const h = decodeURIComponent((location.hash || '').replace(/^#/, ''))
  const i = h.indexOf('-')
  return i < 0 ? { r: h || 'accueil', p: '' } : { r: h.slice(0, i), p: h.slice(i + 1) }
}
export function useRoute() {
  const [r, setR] = useState(parseHash())
  useEffect(() => { const f = () => { setR(parseHash()); window.scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return r
}
export const go = (h: string) => { location.hash = h }
