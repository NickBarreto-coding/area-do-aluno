// types/course.ts
export type CourseStatus = 'not_started' | 'in_progress' | 'completed'

export type Material = {
  id: string
  title: string
  // Pode ser PDF, docs, etc. Vamos manter como URL simples
  url: string
}

export type Lesson = {
  id: string
  title: string
  // Pra simplificar o player: usamos o ID do YouTube
  youtubeId: string
  // Duração mockada em segundos
  durationSec: number
  // Controle mock de conclusão
  completed: boolean
}

export type Course = {
  slug: string
  title: string
  shortDescription: string
  description: string
  // Caminho público (pode ser URL também). Ex: /covers/curso-x.jpg
  coverImage: string
  lessons: Lesson[]
  materials: Material[]
}
