// nuxt.config.ts
import { courses } from './app/data/courses'

export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],

  // Eu deixo isso explícito pra garantir SSG de verdade no generate.
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', '/cursos', ...courses.map((c) => `/cursos/${c.slug}`)],
      crawlLinks: true,
    },
  },

  // Recomendado pelo warn do Nuxt/Nitro (evita comportamento “mudando” conforme versões).
  compatibilityDate: '2026-02-18',

  pwa: {
    registerType: 'autoUpdate', // evita “cache eterno”
    devOptions: {
      enabled: false, // essencial: não registrar SW no dev (senão o HMR vira loteria)
    },
    manifest: {
      name: 'Área do Aluno',
      short_name: 'Área do Aluno',
      description: 'Plataforma de cursos (SSG)',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        {
          src: '/pwa-512x512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },

  devtools: { enabled: true },
})
