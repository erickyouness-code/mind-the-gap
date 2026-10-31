import type { RawLesson, Lesson, Block, Exercise } from '../content/types'
import { grammarA } from '../content/grammar1'
import { grammarB } from '../content/grammar2'
import { grammarC } from '../content/grammar3'

function parse(raw: RawLesson): Lesson {
  const blocks: Block[] = []
  const exercises: Exercise[] = []
  let table: string[][] | null = null
  for (const line0 of raw.body.split('\n')) {
    const line = line0.trim()
    if (!line.startsWith('| ') && table) { blocks.push({ k: 'table', rows: table }); table = null }
    if (!line) continue
    const [why0] = [line.includes(' // ') ? line.split(' // ').slice(1).join(' // ') : '']
    const main = line.includes(' // ') ? line.split(' // ')[0] : line
    if (line.startsWith('# ')) blocks.push({ k: 'h', t: line.slice(2) })
    else if (line.startsWith('= ')) blocks.push({ k: 'f', t: line.slice(2) })
    else if (line.startsWith('! ')) blocks.push({ k: 'tip', t: line.slice(2) })
    else if (line.startsWith('- ')) blocks.push({ k: 'li', t: line.slice(2) })
    else if (line.startsWith('> ')) { const [en, fr] = line.slice(2).split(' | '); blocks.push({ k: 'ex', en: en.trim(), fr: (fr || '').trim() }) }
    else if (line.startsWith('x ')) { const [w, r] = line.slice(2).split(' | '); blocks.push({ k: 'x', wrong: w.trim(), right: (r || '').trim() }) }
    else if (line.startsWith('| ')) { (table ||= []).push(line.slice(2).split(' | ').map(s => s.trim())) }
    else if (line.startsWith('? ')) {
      const [q, a] = main.slice(2).split(' => ')
      exercises.push({ k: 'gap', q: q.trim(), answers: a.split('/').map(alt => alt.split(',').map(s => s.trim())), why: why0 })
    } else if (line.startsWith('* ')) {
      const m = main.slice(2).match(/^(.*)\[(.*)\]\s*=>\s*(.*)$/)
      if (m) exercises.push({ k: 'qcm', q: m[1].trim(), options: m[2].split('|').map(s => s.trim()), answer: m[3].trim(), why: why0 })
    } else blocks.push({ k: 'p', t: line })
  }
  if (table) blocks.push({ k: 'table', rows: table })
  const { body, ...rest } = raw
  return { ...rest, blocks, exercises }
}

export const lessons: Lesson[] = [...grammarA, ...grammarB, ...grammarC].map(parse)
export const lessonById = Object.fromEntries(lessons.map(l => [l.id, l]))
export const lessonsByLevel = (lv: number) => lessons.filter(l => l.lv === lv)
