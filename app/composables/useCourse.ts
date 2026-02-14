// composables/useCourse.ts
import { courses } from '~/data/courses'
import type { Course } from '~/types/course'

export function useCourse(slug: string) {
  const isLoading = ref(true)
  const course = ref<Course | null>(null)
  const notFound = ref(false)

  const load = async () => {
    isLoading.value = true
    notFound.value = false

    await new Promise((r) => setTimeout(r, 350))

    const found = courses.find((c) => c.slug === slug)
    course.value = found ?? null
    notFound.value = !found

    isLoading.value = false
  }

  onMounted(() => load())

  return {
    course,
    isLoading,
    notFound,
    reload: load
  }
}
