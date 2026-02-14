// utils/computeProgress.ts
import type { Lesson, CourseStatus } from '~/types/course'

export function computeProgressPercent(lessons: Lesson[]): number {
  if (!lessons?.length) return 0

  const done = lessons.filter(l => l.completed).length
  const percent = Math.round((done / lessons.length) * 100)

  // Só garantindo que nunca foge de 0..100
  return Math.min(100, Math.max(0, percent))
}

export function computeCourseStatus(lessons: Lesson[]): CourseStatus {
  const percent = computeProgressPercent(lessons)

  if (percent === 0) return 'not_started'
  if (percent === 100) return 'completed'
  return 'in_progress'
}

export function findNextLessonIndex(lessons: Lesson[]): number {
  // A ideia do "Continuar": primeira aula não concluída.
  const idx = lessons.findIndex(l => !l.completed)
  return idx >= 0 ? idx : Math.max(0, lessons.length - 1)
}
