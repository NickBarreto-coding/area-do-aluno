<template>
  <!-- Home simples: o teste é “Área do Aluno”, então já joga pra listagem -->
  <div class="min-h-screen grid place-items-center bg-gray-50">
    <p class="text-sm text-gray-600">Redirecionando…</p>
  </div>
</template>

<script setup lang="ts">
await navigateTo('/cursos', { replace: true })
</script>
