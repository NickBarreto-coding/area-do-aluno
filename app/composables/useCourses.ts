// app/composables/useCourses.ts
import { courses as mockCourses } from '~/data/courses'
import type { Course } from '~/types/course'

export function useCourses() {
  const { data, pending, refresh } = useAsyncData<Course[]>(
    'courses',
    async () => {
      //  no SSG eu não quero “atrasar” o build.
      // O delay só entra no client pra skeleton existir de forma bonita.
      if (process.client) {
        await new Promise((r) => setTimeout(r, 250))
      }
      return mockCourses
    },
    { default: () => [] }
  )

  return {
    courses: computed(() => data.value),
    isLoading: pending,
    reload: refresh
  }
}
