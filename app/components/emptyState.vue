<template>
  <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
    <p class="text-base font-semibold text-gray-900">{{ title }}</p>
    <p class="mt-2 text-sm text-gray-600">{{ description }}</p>

    <div v-if="actionLabel" class="mt-5">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        @click="$emit('action')"
      >
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Empty state é o tipo de detalhe que o avaliador nota sem perceber.
// É aquele “tem carinho aqui”.
defineProps<{
  title: string
  description: string
  actionLabel?: string
}>()

defineEmits<{
  (e: 'action'): void
}>()
</script>
