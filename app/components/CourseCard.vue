<template>
  <article class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div class="aspect-[16/9] bg-gray-100">
      <!-- Imagem mock: se não existir, fica o bloco cinza mesmo -->
      <img
        :src="course.coverImage"
        :alt="`Capa do curso ${course.title}`"
        class="h-full w-full object-cover"
        loading="lazy"
        @error="onImgError"
      />
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-base font-semibold text-gray-900 leading-snug">
            {{ course.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-600 line-clamp-2">
            {{ course.shortDescription }}
          </p>
        </div>

        <span
          class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
          :class="badgeClass"
        >
          {{ badgeLabel }}
        </span>
      </div>

      <div class="mt-4">
        <ProgressBar :value="progressPercent" />
      </div>

      <div class="mt-4 flex items-center justify-between text-xs text-gray-600">
        <span>{{ course.lessons.length }} aulas</span>
        <span>{{ doneCount }}/{{ course.lessons.length }} concluídas</span>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <NuxtLink
          :to="continueTo"
          class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Continuar curso"
        >
          Continuar
        </NuxtLink>

        <NuxtLink
          :to="`/cursos/${course.slug}`"
          class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          aria-label="Ver detalhes do curso"
        >
          Ver detalhes
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course'
import ProgressBar from '~/components/ProgressBar.vue'
import { computeProgressPercent, computeCourseStatus, findNextLessonIndex } from '~/utils/computeProgress'

const props = defineProps<{
  course: Course
}>()

const progressPercent = computed(() => computeProgressPercent(props.course.lessons))
const status = computed(() => computeCourseStatus(props.course.lessons))
const doneCount = computed(() => props.course.lessons.filter(l => l.completed).length)

// “Continuar” abre a primeira aula pendente (via query)
const continueTo = computed(() => {
  const idx = findNextLessonIndex(props.course.lessons)
  return `/cursos/${props.course.slug}?lesson=${idx}`
})

const badgeLabel = computed(() => {
  if (status.value === 'completed') return 'Concluído'
  if (status.value === 'in_progress') return 'Em andamento'
  return 'Não iniciado'
})

const badgeClass = computed(() => {
  if (status.value === 'completed') return 'bg-green-100 text-green-700'
  if (status.value === 'in_progress') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
})

function onImgError(e: Event) {
  // Evita quebrar o layout se a imagem não existir ainda.
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
