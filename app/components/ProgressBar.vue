<template>
  <div class="w-full">
    <!-- Barra de progresso simples e limpa -->
    <div class="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
      <div
        class="h-full rounded-full bg-blue-600 transition-all"
        :style="{ width: `${value}%` }"
        aria-hidden="true"
      />
    </div>

    <div class="mt-1 text-xs text-gray-600 flex items-center justify-between">
      <span>Progresso</span>
      <span class="font-medium">{{ value }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mantive esse componente bem pequeno de propósito.
// Progresso é coisa que aparece em todo lugar e precisa ser confiável.
defineProps<{
  value: number
}>()
</script>
