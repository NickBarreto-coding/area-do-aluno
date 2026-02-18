<template>
  <article class="card overflow-hidden group">
    <!-- Capa com overlay + efeito sutil -->
    <div class="relative aspect-[16/9] bg-slate-200/40 overflow-hidden">
      <img
        v-if="showImage"
        :src="course.coverImage"
        :alt="`Capa do curso ${course.title}`"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        @error="showImage = false"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

      <div class="absolute left-4 top-4">
        <span class="badge badge-soft">
          <span class="h-1.5 w-1.5 rounded-full" :class="dotClass"></span>
          {{ badgeLabel }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4 right-4">
        <h3 class="text-lg font-extrabold tracking-tight text-white line-clamp-2">
          {{ course.title }}
        </h3>
        <p class="mt-1 text-sm text-white/80 line-clamp-2">
          {{ course.shortDescription }}
        </p>
      </div>
    </div>

    <div class="p-5">
      <div class="flex items-center justify-between text-xs text-slate-600">
        <span>{{ course.lessons.length }} aulas</span>
        <span class="font-semibold text-slate-900">{{ doneCount }}/{{ course.lessons.length }}</span>
      </div>

      <div class="mt-3">
        <ProgressBar :value="progressPercent" />
      </div>

      <div class="mt-5 grid grid-cols-2 gap-2">
        <NuxtLink :to="continueTo" class="btn-primary">
          Continuar
          <span aria-hidden="true">→</span>
        </NuxtLink>

        <NuxtLink :to="`/cursos/${course.slug}`" class="btn-ghost">
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

const props = defineProps<{ course: Course }>()

//  imagem pode falhar no mock (sem stress). A UI não deve quebrar por isso.
const showImage = ref(true)

const progressPercent = computed(() => computeProgressPercent(props.course.lessons))
const status = computed(() => computeCourseStatus(props.course.lessons))
const doneCount = computed(() => props.course.lessons.filter(l => l.completed).length)

const continueTo = computed(() => {
  const idx = findNextLessonIndex(props.course.lessons)
  return `/cursos/${props.course.slug}?lesson=${idx}`
})

const badgeLabel = computed(() => {
  if (status.value === 'completed') return 'Concluído'
  if (status.value === 'in_progress') return 'Em andamento'
  return 'Não iniciado'
})

const dotClass = computed(() => {
  if (status.value === 'completed') return 'bg-emerald-400'
  if (status.value === 'in_progress') return 'bg-amber-400'
  return 'bg-slate-300'
})
</script>
