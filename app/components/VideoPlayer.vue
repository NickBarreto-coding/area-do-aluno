<template>
  <section class="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
    <div class="aspect-video bg-black">
      <iframe
        v-if="youtubeId"
        class="h-full w-full"
        :src="embedUrl"
        title="Aula em vídeo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <div v-else class="h-full w-full grid place-items-center text-white/80 text-sm">
        Selecione uma aula para começar
      </div>
    </div>

    <div class="p-4">
      <p class="text-sm text-gray-600">Aula atual</p>
      <h2 class="mt-1 text-lg font-semibold text-gray-900">
        {{ title || '—' }}
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  youtubeId: string | null
  title: string | null
}>()

const embedUrl = computed(() => {
  if (!props.youtubeId) return ''
  // embed padrão, sem inventar moda
  return `https://www.youtube.com/embed/${props.youtubeId}`
})
</script>
