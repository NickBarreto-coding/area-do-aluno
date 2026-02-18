# Área do Aluno — Plataforma de Cursos (Nuxt 4 + Tailwind + SSG + PWA)

Projeto do teste técnico **Área do Aluno**: listagem de cursos do usuário, filtros, página de detalhe com player/aulas e materiais extras.
Sem backend real: tudo vem de **mock local**.

> Objetivo: arquitetura boa, UI/UX caprichada, código legível e **SSG funcionando** com rotas dinâmicas prerenderizadas.

---

## ✅ Requisitos do enunciado (status)

### Stack / Entrega
- [x] Nuxt 4
- [x] Tailwind CSS
- [x] npm
- [x] Dados mockados (local)
- [x] SSG obrigatório: `npm run generate` funcionando
- [x] Preview do estático: `npx serve .output/public`
- [x] PWA (extra) 

### Produto
- [x] Página “Meus Cursos” (listagem)
  - [x] Cards com título, descrição, imagem, progresso, total de aulas
  - [x] Ações: “Continuar” e “Ver detalhes”
  - [x] Filtros: busca + status (não iniciado / em andamento / concluído)
  - [x] Estados de UI: skeleton + empty state
- [x] Página do Curso (detalhe + aula)
  - [x] Player de vídeo (embed)
  - [x] Lista/Sidebar de aulas
  - [x] Troca do player ao clicar na aula
  - [x] Indicação visual: aula selecionada + concluídas (mock)
  - [x] Mínimo 8 aulas por curso (mock)
- [x] Materiais extras
  - [x] Links abrindo em nova aba (PDF/docs)

### Qualidade / Arquitetura
- [x] Componentes reutilizáveis (CourseCard, FilterBar, ProgressBar, etc.)
- [x] Separação clara: dados mock / UI / composables / utils / types
- [x] TypeScript (recomendado) aplicado
- [x] Responsivo (desktop/mobile)
- [x] Revisão final de consistência (naming, comentários, limpeza)

### Git (avaliado)
- [x] Repositório público no GitHub
- [x] Commits incrementais (evitar commit único)
- [x] “Polimento do histórico” 

---

## 🧱 Stack

- **Nuxt 4**
- **Vue 3 + TypeScript**
- **Tailwind CSS**
- **SSG** via `nuxt generate` (Nitro preset: `static`)
- Mock local em `app/data/`
- (Extra) **PWA** 

---

## 📦 Pré-requisitos

- Node.js **18+** 
- npm **9+**

---

## 📁 Estrutura do projeto

- `app/pages/` — rotas
- `app/components/` — componentes reutilizáveis (UI)
- `app/composables/` — camada de estado/dados (mock)
- `app/data/` — mock de cursos/aulas
- `app/types/` — types do domínio
- `app/utils/` — helpers (progresso, status, formatação)
- `public/` — assets estáticos (ex: capas)

---

## ▶️ Rodar em desenvolvimento

```bash
npm install
npm run dev
