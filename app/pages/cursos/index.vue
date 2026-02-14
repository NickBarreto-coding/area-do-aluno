<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-6">
        <h1 class="text-2xl font-bold text-gray-900">Meus Cursos</h1>
        <p class="mt-1 text-sm text-gray-600">
          Seus cursos disponíveis para assistir e acompanhar o progresso.
        </p>

        <div class="mt-5">
          <FilterBar
            :search="search"
            :status="status"
            @update:search="search = $event"
            @update:status="status = $event"
          />
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8">
      <div class="mb-4 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          <span class="font-semibold text-gray-900">{{ filteredCourses.length }}</span>
          resultados
        </p>

        <button
          type="button"
          class="text-sm font-semibold text-blue-700 hover:text-blue-800"
          @click="resetFilters"
        >
          Limpar filtros
        </button>
      </div>

      <!-- Loading com skeleton -->
      <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCourseCard v-for="n in 6" :key="n" />
      </div>

      <!-- Empty state -->
      <div v-else-if="!filteredCourses.length">
        <EmptyState
          title="Nada por aqui 😅"
          description="Não encontramos cursos com esses filtros. Tenta ajustar a busca ou o status."
          action-label="Limpar filtros"
          @action="resetFilters"
        />
      </div>

      <!-- Lista -->
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.slug"
          :course="course"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import CourseCard from '~/components/CourseCard.vue'
import FilterBar from '~/components/FilterBar.vue'
import SkeletonCourseCard from '~/components/SkeletonCourseCard.vue'
import EmptyState from '~/components/EmptyState.vue'
import { useCourses } from '~/composables/useCourses'
import type { CourseStatus } from '~/types/course'
import { computeCourseStatus } from '~/utils/computeProgress'

const { courses, isLoading } = useCourses()

const search = ref('')
const status = ref<'all' | CourseStatus>('all')

const filteredCourses = computed(() => {
  const q = search.value.trim().toLowerCase()

  return courses.value
    .filter((c) => {
      const matchesSearch = !q || c.title.toLowerCase().includes(q)
      if (!matchesSearch) return false

      if (status.value === 'all') return true
      return computeCourseStatus(c.lessons) === status.value
    })
})

function resetFilters() {
  // Às vezes o simples resolve: deixa o usuário “se achar” de novo rápido.
  search.value = ''
  status.value = 'all'
}
</script>
