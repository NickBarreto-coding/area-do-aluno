// app/composables/useCourse.ts
import { courses as mockCourses } from '~/data/courses'
import type { Course } from '~/types/course'
import type { MaybeRefOrGetter } from 'vue'

export function useCourse(slug: MaybeRefOrGetter<string>) {
  const resolvedSlug = computed(() => String(toValue(slug) || ''))
  const key = computed(() => `course:${resolvedSlug.value}`)

  const { data, pending } = useAsyncData<Course | null>(
    key,
    async () => {
      // Comentário humano: delay curtinho só pra UX não ficar “seca” no mock.
      await new Promise((r) => setTimeout(r, 150))
      return mockCourses.find((c) => c.slug === resolvedSlug.value) ?? null
    },
    { default: () => null }
  )

  // Tipando explicitamente pra não virar aquela sopa do PickFrom no TS do Nuxt.
  const course = computed<Course | null>(() => data.value ?? null)

  return {
    course,
    isLoading: pending
  }
}
