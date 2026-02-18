// app/composables/useCourse.ts
import { courses as mockCourses } from '~/data/courses'
import type { Course } from '~/types/course'

export function useCourse(slug: string) {
  const key = `course:${slug}`

  const { data, pending } = useAsyncData<Course | null>(
    key,
    async () => {
      await new Promise((r) => setTimeout(r, 150))
      return mockCourses.find((c) => c.slug === slug) ?? null
    },
    { default: () => null }
  )

  return {
    course: computed(() => data.value),
    isLoading: pending
  }
}
