<!-- app/components/CourseCard.vue -->
<template>
  <article class="card group overflow-hidden">
    <!-- Capa (só a imagem + badge). Texto fica no corpo pra nunca “sumir”. -->
    <div class="relative h-44 w-full overflow-hidden">
      <img
        v-if="showImage"
        :src="coverSrc"
        :alt="`Capa do curso ${course.title}`"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        @error="onImgError"
      />

      <!-- fallback caso a imagem falhe -->
      <div v-else class="mesh-bg h-full w-full" aria-hidden="true" />

      <!-- leve “véu” pra dar acabamento, mas sem depender disso pro texto -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent"
      />

      <!-- Badge (status) -->
      <div class="absolute left-4 top-4">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
        >
          <span class="h-2 w-2 rounded-full" :class="statusDotClass"></span>
          {{ statusLabel }}
        </span>
      </div>
    </div>

    <!-- Corpo -->
    <div class="p-4">
      <h3 class="text-base font-black leading-tight text-slate-900">
        {{ course.title }}
      </h3>

      <p class="mt-1 text-sm text-slate-600">
        {{ course.shortDescription }}
      </p>

      <div class="mt-4 flex items-center justify-between text-xs text-slate-600">
        <span>{{ totalLessons }} aulas</span>
        <span class="font-semibold text-slate-900">{{ doneCount }}/{{ totalLessons }}</span>
      </div>

      <div class="mt-3">
        <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div class="h-full rounded-full bg-blue-600" :style="{ width: `${progress}%` }" />
        </div>
        <div class="mt-2 flex items-center justify-between text-xs">
          <span class="text-slate-600">Progresso</span>
          <span class="font-semibold text-slate-900">{{ progress }}%</span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <NuxtLink :to="continueHref" class="btn btn-primary">
          Continuar →
        </NuxtLink>

        <NuxtLink :to="detailsHref" class="btn btn-ghost">
          Ver detalhes
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course'
import { computed, ref } from 'vue'

const props = defineProps<{ course: Course }>()

//  imagem pode falhar no mock (sem stress). A UI não deve quebrar por isso.
const showImage = ref(true)

function onImgError() {
  // TS/Volar para de reclamar e ainda mantém o fallback consistente
  showImage.value = false
}

const coverSrc = computed(() => {
  // padrão: coverImage
  // compat: cover (caso tenha mock antigo)
  return props.course.coverImage || props.course.cover || '/covers/nuxt.jpg'
})

const totalLessons = computed(() => props.course.lessons?.length ?? 0)
const doneCount = computed(() => props.course.lessons?.filter((l) => l.completed).length ?? 0)

const progress = computed(() => {
  if (!totalLessons.value) return 0
  return Math.round((doneCount.value / totalLessons.value) * 100)
})

const statusLabel = computed(() => {
  if (progress.value === 0) return 'Não iniciado'
  if (progress.value >= 100) return 'Concluído'
  return 'Em andamento'
})

const statusDotClass = computed(() => {
  if (progress.value === 0) return 'bg-slate-300'
  if (progress.value >= 100) return 'bg-emerald-400'
  return 'bg-amber-300'
})

const continueHref = computed(() => {
  const idx = props.course.lessons.findIndex((l) => !l.completed)
  const lesson = idx >= 0 ? idx : 0
  return `/cursos/${props.course.slug}?lesson=${lesson}`
})

const detailsHref = computed(() => `/cursos/${props.course.slug}`)
</script>
