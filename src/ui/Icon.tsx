const P: Record<string, string> = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  path: 'M5 4v16M5 8h6a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4h0M19 4v4M15 20h6',
  cards: 'M7 4h11a2 2 0 0 1 2 2v11M4 8h11a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  game: 'M6 9h4M8 7v4M15 9h.01M18 11h.01M7 4h10a5 5 0 0 1 5 5v5a3 3 0 0 1-5.2 2L15 14H9l-1.8 2A3 3 0 0 1 2 14V9a5 5 0 0 1 5-5z',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
  sound: 'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  check: 'M5 12l5 5L20 7', x: 'M6 6l12 12M18 6L6 18',
  flame: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-9-1 2-2 3-4 3 0-2 0-4-1-6-3 3-5 7-5 12 0 4 3 7 7 7z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  arrow: 'M5 12h14M13 6l6 6-6 6', back: 'M19 12H5M11 18l-6-6 6-6',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z', target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  puzzle: 'M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3z',
  ear: 'M6 9a6 6 0 1 1 12 0c0 3-2 4-3 5s-1 2-1 3a3 3 0 0 1-6 0M9 9a3 3 0 0 1 6 0',
  pen: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', shuffle: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  type: 'M4 7V4h16v3M9 20h6M12 4v16', grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  hang: 'M4 21h10M7 21V3h9v3M16 9a2 2 0 1 0 0-.01M16 11v5M13 13h6M14 20l2-4 2 4',
  swap: 'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7', globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  mic: 'M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM19 11a7 7 0 0 1-14 0M12 18v3',
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5', list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5', sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7', cloud: 'M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z',
  plane: 'M10 14l-7-3 1-2 8 1 5-6a2 2 0 0 1 3 3l-6 5 1 8-2 1-3-7z', food: 'M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14', bag: 'M5 8h14l-1 13H6zM9 8a3 3 0 0 1 6 0',
  health: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11zM9 11h6M12 8v6', phone: 'M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2',
  work: 'M4 7h16v12H4zM9 7V4h6v3M4 12h16', tie: 'M10 3h4l-1 3 2 11-3 4-3-4 2-11z', wave: 'M7 12V6a1.5 1.5 0 0 1 3 0v5M10 10V4a1.5 1.5 0 0 1 3 0v6M13 10V5a1.5 1.5 0 0 1 3 0v6M16 11V8a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-14 0v-2l-1.5-2.5a1.5 1.5 0 0 1 2.5-1.5L7 10',
  coffee: 'M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3', mail: 'M3 5h18v14H3zM3 6l9 7 9-7', alert: 'M12 3l10 18H2zM12 10v4M12 17h.01',
  more: 'M5 12h.01M12 12h.01M19 12h.01', lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4', eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
}
export function Icon({ n, s = 20, w = 2 }: { n: string; s?: number; w?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n] || P.more} /></svg>
}
export function Logo({ s = 36 }: { s?: number }) {
  return <svg className="brand-mark" width={s} height={s} viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="14" fill="none" stroke="var(--signal)" strokeWidth="7" />
    <rect x="1" y="15.5" width="38" height="9" rx="1.5" fill="var(--ink)" />
    <rect x="9" y="18.5" width="9" height="3" fill="var(--edge)" /><rect x="22" y="18.5" width="9" height="3" fill="var(--edge)" />
  </svg>
}
