<template>
  <button
    type="button"
    class="w-full text-left rounded-xl border px-3 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    :class="wrapperClass"
    @click="$emit('select')"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold" :class="titleClass">
          {{ indexLabel }}. {{ lessonTitle }}
        </p>
        <p class="mt-1 text-xs text-gray-600">
          {{ duration }}
        </p>
      </div>

      <span
        v-if="completed"
        class="shrink-0 rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700"
      >
        Concluída
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  lessonTitle: string
  duration: string
  completed: boolean
  selected: boolean
  indexLabel: number
}>()

defineEmits<{ (e: 'select'): void }>()

const wrapperClass = computed(() => {
  if (props.selected) return 'border-blue-500 bg-blue-50'
  return 'border-gray-200 bg-white hover:bg-gray-50'
})

const titleClass = computed(() => {
  if (props.selected) return 'text-blue-900'
  return 'text-gray-900'
})
</script>
