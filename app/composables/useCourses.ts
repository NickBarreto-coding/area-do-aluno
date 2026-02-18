// app/composables/useCourses.ts
import { courses as mockCourses } from '~/data/courses'
import type { Course } from '~/types/course'

export function useCourses() {
  // Comentário humano:
  // useAsyncData roda no server durante o prerender, então o HTML já nasce com conteúdo.
  const { data, pending, refresh } = useAsyncData<Course[]>(
    'courses',
    async () => {
      // delay leve só pra mostrar skeleton sem virar novela
      await new Promise((r) => setTimeout(r, 250))
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
