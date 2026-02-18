// data/courses.ts
import type { Course } from '../types/course'


// Mock bem “realista”: 3 cursos, cada um com 8+ aulas, materiais e progresso variado.
// Importante pro teste: isso aqui precisa ser consistente e ter volume mínimo.
export const courses: Course[] = [
  {
    slug: 'nuxt-essentials',
    title: 'Nuxt Essentials (do zero ao deploy)',
    shortDescription: 'Rotas, SSR/SSG, composables e boas práticas no Nuxt.',
    description:
      'Um curso direto ao ponto para dominar os fundamentos do Nuxt: estrutura de projeto, páginas, componentes, composables, navegação e geração estática.',
    coverImage: '/covers/nuxt.jpg',
    lessons: [
      { id: 'l1', title: 'Boas-vindas e visão geral', youtubeId: 'dQw4w9WgXcQ', durationSec: 420, completed: true },
      { id: 'l2', title: 'Estrutura de pastas no Nuxt', youtubeId: 'eY52Zsg-KVI', durationSec: 610, completed: true },
      { id: 'l3', title: 'Pages e rotas dinâmicas', youtubeId: '9bZkp7q19f0', durationSec: 780, completed: true },
      { id: 'l4', title: 'Composables na prática', youtubeId: 'hTWKbfoikeg', durationSec: 845, completed: false },
      { id: 'l5', title: 'Componentes reutilizáveis', youtubeId: '3JZ_D3ELwOQ', durationSec: 690, completed: false },
      { id: 'l6', title: 'Head, SEO básico e metatags', youtubeId: 'kJQP7kiw5Fk', durationSec: 530, completed: false },
      { id: 'l7', title: 'SSG: generate e prerender', youtubeId: 'fJ9rUzIMcZQ', durationSec: 910, completed: false },
      { id: 'l8', title: 'Checklist final + próximos passos', youtubeId: 'CevxZvSJLk8', durationSec: 480, completed: false }
    ],
    materials: [
      { id: 'm1', title: 'Guia rápido de rotas no Nuxt (PDF)', url: 'https://example.com/nuxt-routes.pdf' }
    ]
  },

  {
    slug: 'tailwind-ui',
    title: 'Tailwind UI na veia',
    shortDescription: 'Do layout responsivo ao capricho visual com Tailwind.',
    description:
      'Um curso focado em produtividade e consistência visual: grid, espaçamentos, tipografia, estados (hover/focus), skeletons e padrões de UI.',
    coverImage: '/covers/tailwind.jpg',
    lessons: [
      { id: 'l1', title: 'Design system “na marra” com Tailwind', youtubeId: '2Vv-BfVoq4g', durationSec: 560, completed: true },
      { id: 'l2', title: 'Grid e responsividade que não dói', youtubeId: '60ItHLz5WEA', durationSec: 740, completed: true },
      { id: 'l3', title: 'Tipografia e hierarquia visual', youtubeId: 'YQHsXMglC9A', durationSec: 630, completed: true },
      { id: 'l4', title: 'Componentização de cards e listas', youtubeId: 'OPf0YbXqDm0', durationSec: 810, completed: true },
      { id: 'l5', title: 'Estados: hover/focus/disabled', youtubeId: 'RgKAFK5djSk', durationSec: 520, completed: true },
      { id: 'l6', title: 'Skeleton loading e empty states', youtubeId: 'ktvTqknDobU', durationSec: 680, completed: true },
      { id: 'l7', title: 'Acessibilidade básica na prática', youtubeId: 'JGwWNGJdvx8', durationSec: 590, completed: true },
      { id: 'l8', title: 'Polimento final: detalhes que contam', youtubeId: '09R8_2nJtjg', durationSec: 610, completed: true }
    ],
    materials: [
      { id: 'm1', title: 'Checklist de UI/UX (PDF)', url: 'https://example.com/uiux-checklist.pdf' },
      { id: 'm2', title: 'Referências de componentes', url: 'https://example.com/components-links.pdf' }
    ]
  },

  {
    slug: 'typescript-pratico',
    title: 'TypeScript prático para front-end',
    shortDescription: 'Tipos úteis, inferência e organização sem exagero.',
    description:
      'Aqui o objetivo é usar TypeScript como ferramenta de clareza: tipos para dados, componentes mais seguros e menos bugs bobos no front.',
    coverImage: '/covers/typescript.jpg',
    lessons: [
      { id: 'l1', title: 'Por que TS (sem religião)', youtubeId: 'uelHwf8o7_U', durationSec: 400, completed: false },
      { id: 'l2', title: 'Tipos básicos e inferência', youtubeId: 'tAGnKpE4NCI', durationSec: 720, completed: false },
      { id: 'l3', title: 'Types vs Interfaces', youtubeId: 'LsoLEjrDogU', durationSec: 640, completed: false },
      { id: 'l4', title: 'Union types e enums “na medida”', youtubeId: 'xTlNMmZKwpA', durationSec: 690, completed: false },
      { id: 'l5', title: 'Tipos pra dados mockados', youtubeId: 'oRdxUFDoQe0', durationSec: 540, completed: false },
      { id: 'l6', title: 'Component props tipadas', youtubeId: 'kXYiU_JCYtU', durationSec: 780, completed: false },
      { id: 'l7', title: 'Utils e helpers com TS', youtubeId: 'pRpeEdMmmQ0', durationSec: 510, completed: false },
      { id: 'l8', title: 'Erros comuns e como evitar', youtubeId: '6Dh-RL__uN4', durationSec: 620, completed: false }
    ],
    materials: [
      { id: 'm1', title: 'Tabela de “pegadinhas” TS (PDF)', url: 'https://example.com/ts-gotchas.pdf' }
    ]
  }
]
