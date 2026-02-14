// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Tailwind via módulo (você já instalou no passo 2)
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      title: 'Área do Aluno',
      meta: [
        { name: 'description', content: 'Área do Aluno - Plataforma de Cursos (mock)' }
      ]
    }
  }
})
