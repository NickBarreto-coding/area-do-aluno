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
        <div class="rounded-2xl border border-gray-200 bg-white h-[320px] animate-pulse"></div>
        <div class="rounded-2xl border border-gray-200 bg-white h-[320px] animate-pulse"></div>
      </div>

      <div v-else-if="notFound">
        <EmptyState
          title="Curso não encontrado"
          description="Esse curso não existe (ou o slug mudou). Volte para a listagem."
          action-label="Voltar"
          @action="navigateTo('/cursos')"
        />
      </div>

      <div v-else-if="course" class="grid gap-4 lg:grid-cols-[1fr_360px]">
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

const route = useRoute()

// slug vindo da rota
const slug = String(route.params.slug || '')

// carrega curso mockado
const { course, isLoading, notFound } = useCourse(slug)

// Aula selecionada (por índice)
const selectedIndex = ref(0)

const currentLesson = computed(() => {
  if (!course.value) return null
  return course.value.lessons[selectedIndex.value] ?? null
})

function normalizeLessonIndex(value: unknown): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.floor(n))
}

function selectLesson(index: number) {
  selectedIndex.value = normalizeLessonIndex(index)
  // Atualiza query pra ficar “linkável”. Não é obrigatório, mas fica bem profissional.
  navigateTo({ query: { ...route.query, lesson: String(selectedIndex.value) } }, { replace: true })
}

// Quando entrar na página, se vier ?lesson=, respeita.
watchEffect(() => {
  const q = route.query.lesson
  selectedIndex.value = normalizeLessonIndex(q)
})
</script>
