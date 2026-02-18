// nuxt.config.ts
import { courses } from './app/data/courses'

export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  //
  // Eu deixo explícito pra garantir que o generate vai virar site estático mesmo.
  nitro: {
    preset: 'static',
    prerender: {
      // Gera as rotas dinâmicas baseadas no mock
      routes: [
        '/',
        '/cursos',
        ...courses.map((c) => `/cursos/${c.slug}`)
      ],

      // Opcional: se você tem links internos no HTML, ele também “descobre” mais rotas.
      crawlLinks: true
    }
  },

  devtools: { enabled: true }
})
