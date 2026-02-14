<template>
  <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-semibold text-gray-900">Aulas</h3>
      <p class="text-xs text-gray-600">
        {{ doneCount }}/{{ lessons.length }}
      </p>
    </div>

    <div class="mt-4 space-y-2">
      <LessonItem
        v-for="(l, idx) in lessons"
        :key="l.id"
        :lesson-title="l.title"
        :duration="formatDuration(l.durationSec)"
        :completed="l.completed"
        :selected="idx === selectedIndex"
        :index-label="idx + 1"
        @select="$emit('select', idx)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Lesson } from '~/types/course'
import LessonItem from '~/components/LessonItem.vue'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{
  lessons: Lesson[]
  selectedIndex: number
}>()

defineEmits<{
  (e: 'select', index: number): void
}>()

const doneCount = computed(() => props.lessons.filter(l => l.completed).length)
</script>
