<template>
  <div class="card p-4">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex-1">
        <label class="sr-only" for="search">Buscar curso</label>

        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>

          <input
            id="search"
            v-model="localSearch"
            type="text"
            placeholder="Buscar por título..."
            class="w-full rounded-2xl border border-slate-900/10 bg-white/60 pl-8 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-sm font-semibold text-slate-700" for="status">Status</label>

        <select
          id="status"
          v-model="localStatus"
          class="rounded-2xl border border-slate-900/10 bg-white/60 px-3 py-2.5 text-sm text-slate-900
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Todos</option>
          <option value="in_progress">Em andamento</option>
          <option value="completed">Concluído</option>
          <option value="not_started">Não iniciado</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseStatus } from '~/types/course'

// Comentário humano:
// Esse componente é "controlado": o estado real mora no pai.
// Aqui eu uso estado local só pra deixar a digitação suave e não ficar travando a UI.

const props = defineProps<{
  search: string
  status: 'all' | CourseStatus
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:status', value: 'all' | CourseStatus): void
}>()

const localSearch = ref(props.search)
const localStatus = ref(props.status)

// Se o pai mudar por algum motivo (reset filtros), sincroniza aqui também.
watch(
  () => props.search,
  (v) => {
    if (v !== localSearch.value) localSearch.value = v
  }
)

watch(
  () => props.status,
  (v) => {
    if (v !== localStatus.value) localStatus.value = v
  }
)

watch(localSearch, (v) => emit('update:search', v))
watch(localStatus, (v) => emit('update:status', v))
</script>
