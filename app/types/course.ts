// app/types/course.ts
export type CourseStatus = 'not_started' | 'in_progress' | 'completed'

export type Material = {
  id: string
  title: string
  url: string
}

export type Lesson = {
  id: string
  title: string
  youtubeId: string
  durationSec: number
  completed: boolean
}

export type Course = {
  slug: string
  title: string
  shortDescription: string
  description: string

  // padrão atual
  coverImage: string

  // compat: caso algum mock antigo use "cover"
  cover?: string

  lessons: Lesson[]
  materials: Material[]
}
