import { getState } from './store'
let voices: SpeechSynthesisVoice[] = []
function refresh() { try { voices = speechSynthesis.getVoices() } catch { voices = [] } }
try { refresh(); speechSynthesis.onvoiceschanged = refresh } catch { /* no tts */ }
export const ttsAvailable = () => { try { return 'speechSynthesis' in window } catch { return false } }
export function pickVoice(lang: string) {
  const vs = voices.filter(v => v.lang.replace('_', '-').startsWith(lang))
  return vs.find(v => /natural|neural|premium|enhanced|google/i.test(v.name)) || vs[0] || voices.find(v => v.lang.startsWith('en'))
}
export function speak(text: string, opts: { rate?: number; lang?: string; onend?: () => void } = {}) {
  try {
    const st = getState().settings
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const lang = opts.lang || st.accent
    u.lang = lang
    const v = pickVoice(lang); if (v) u.voice = v
    u.rate = opts.rate ?? st.rate
    if (opts.onend) u.onend = opts.onend
    speechSynthesis.speak(u)
  } catch { /* ignore */ }
}
// short UI sounds with WebAudio
let ctx: AudioContext | null = null
export function blip(kind: 'ok' | 'bad' | 'done') {
  if (!getState().settings.sound) return
  try {
    ctx ||= new AudioContext()
    const notes = kind === 'ok' ? [660, 880] : kind === 'bad' ? [220, 180] : [523, 659, 784, 1047]
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain()
      o.type = kind === 'bad' ? 'square' : 'sine'; o.frequency.value = f
      const t = ctx!.currentTime + i * 0.09
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(kind === 'bad' ? 0.04 : 0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + 0.18)
    })
  } catch { /* ignore */ }
}
