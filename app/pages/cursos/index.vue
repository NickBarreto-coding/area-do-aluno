<!-- app/pages/cursos/index.vue -->
<template>
  <div>
    <header class="sticky top-0 z-20 border-b border-slate-900/10 bg-white/50 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 py-6">
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              class="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-900/10"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              Área do Aluno
            </div>

            <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Meus Cursos
            </h1>

            <p class="mt-1 text-sm text-slate-600">
              Continue de onde parou — e sem culpa se for “só mais uma aula”.
            </p>
          </div>

          <div class="text-sm text-slate-600">
            <span class="font-semibold text-slate-900">{{ filteredCourses.length }}</span>
            curso(s) no filtro
          </div>
        </div>

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
        <p class="text-sm text-slate-600">
          <span class="font-semibold text-slate-900">{{ filteredCourses.length }}</span>
          resultados
        </p>

        <button
          type="button"
          class="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
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
import { useCourses } from '~/composables/useCourses'
import type { CourseStatus } from '~/types/course'
import { computeCourseStatus } from '~/utils/computeProgress'

// Comentário humano: aqui é “tudo mock”, então simulo loading só pra UX não ficar seca.
const { courses, isLoading } = useCourses()

const search = ref('')
const status = ref<'all' | CourseStatus>('all')

const filteredCourses = computed(() => {
  const q = search.value.trim().toLowerCase()

  return courses.value.filter((c) => {
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
