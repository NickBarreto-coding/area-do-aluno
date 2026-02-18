<!-- app/pages/cursos/[slug].vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-6">
        <NuxtLink
          to="/cursos"
          class="text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          ← Voltar para Meus Cursos
        </NuxtLink>

        <div class="mt-3">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ course?.title || 'Curso' }}
          </h1>
          <p class="mt-1 text-sm text-gray-600">
            {{ course?.description || '—' }}
          </p>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8">
      <div v-if="isLoading" class="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div class="h-[320px] animate-pulse rounded-2xl border border-gray-200 bg-white"></div>
        <div class="h-[320px] animate-pulse rounded-2xl border border-gray-200 bg-white"></div>
      </div>

      <!-- Curso não encontrado -->
      <div v-else-if="!course" class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <EmptyState
          title="Curso não encontrado 😅"
          description="Esse curso não existe no mock. Volte para a listagem e tente novamente."
          action-label="Voltar"
          @action="navigateTo('/cursos')"
        />
      </div>

      <div v-else class="grid gap-4 lg:grid-cols-[1fr_360px]">
        <!-- Player -->
        <div class="space-y-4">
          <VideoPlayer
            :youtube-id="currentLesson?.youtubeId ?? null"
            :title="currentLesson?.title ?? null"
          />

          <!-- Materiais -->
          <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 class="text-base font-semibold text-gray-900">Materiais</h3>

            <div v-if="!course.materials.length" class="mt-2 text-sm text-gray-600">
              Nenhum material extra por enquanto.
            </div>

            <ul v-else class="mt-3 space-y-2">
              <li v-for="m in course.materials" :key="m.id">
                <a
                  :href="m.url"
                  target="_blank"
                  rel="noreferrer"
                  class="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  {{ m.title }}
                </a>
              </li>
            </ul>
          </section>
        </div>

        <!-- Lista de aulas -->
        <div class="lg:sticky lg:top-6 h-fit">
          <LessonList
            :lessons="course.lessons"
            :selected-index="selectedIndex"
            @select="selectLesson"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCourse } from '~/composables/useCourse'
import VideoPlayer from '~/components/VideoPlayer.vue'
import LessonList from '~/components/LessonList.vue'
import EmptyState from '~/components/EmptyState.vue'
import type { Course } from '~/types/course'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))

const { course, isLoading } = useCourse(slug)

// “Desembrulha” pro template ficar limpo e o TS parar de surtar.
const courseData = computed<Course | null>(() => course.value)

const selectedIndex = ref(0)

const currentLesson = computed(() => {
  if (!courseData.value) return null
  return courseData.value.lessons[selectedIndex.value] ?? null
})

function normalizeLessonIndex(value: unknown): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.floor(n))
}

function clampLessonIndex(index: number): number {
  if (!courseData.value) return 0
  const max = Math.max(0, courseData.value.lessons.length - 1)
  return Math.min(Math.max(0, index), max)
}

function selectLesson(index: number) {
  selectedIndex.value = clampLessonIndex(normalizeLessonIndex(index))

  navigateTo(
    { query: { ...route.query, lesson: String(selectedIndex.value) } },
    { replace: true }
  )
}

// Quando entrar na página, se vier ?lesson=, respeita.
watchEffect(() => {
  const q = route.query.lesson
  selectedIndex.value = clampLessonIndex(normalizeLessonIndex(q))
})
</script>
