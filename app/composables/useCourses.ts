// composables/useCourses.ts
import { courses } from '~/data/courses'
import type { Course } from '~/types/course'


export function useCourses() {
  const isLoading = ref(true)
  const items = ref<Course[]>([])

  // Simula carregamento (sem backend real, mas com UX decente)
  const load = async () => {
    isLoading.value = true
    await new Promise((r) => setTimeout(r, 450)) // delay curtinho pra skeleton fazer sentido
    items.value = courses
    isLoading.value = false
  }

  onMounted(() => {
    // Não inventei moda com SSR aqui, porque é mock e o teste pede mais estrutura/UX.
    load()
  })

  return {
    courses: items,
    isLoading,
    reload: load
  }
}
