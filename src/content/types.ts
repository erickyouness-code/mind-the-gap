export interface RawLesson { id: string; lv: number; title: string; en: string; tense?: boolean; body: string }
export type Block =
  | { k: 'h'; t: string }
  | { k: 'p'; t: string }
  | { k: 'li'; t: string }
  | { k: 'f'; t: string }
  | { k: 'ex'; en: string; fr: string }
  | { k: 'tip'; t: string }
  | { k: 'x'; wrong: string; right: string }
  | { k: 'table'; rows: string[][] }
export type Exercise =
  | { k: 'gap'; q: string; answers: string[][]; why: string }
  | { k: 'qcm'; q: string; options: string[]; answer: string; why: string }
export interface Lesson extends Omit<RawLesson, 'body'> { blocks: Block[]; exercises: Exercise[] }
