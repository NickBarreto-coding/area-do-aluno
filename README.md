# Área do Aluno — Plataforma de Cursos

Este projeto foi desenvolvido como parte de um teste técnico de front-end.

A proposta foi construir uma Área do Aluno onde o usuário pode visualizar seus cursos, acompanhar progresso e assistir aulas, com foco em organização, arquitetura, componentização e funcionamento correto em modo estático (SSG).

Não existe backend real. Todos os dados são mockados localmente.  
A ideia foi estruturar o projeto como se ele pudesse evoluir facilmente para um produto real.

---

## Stack utilizada

- Nuxt 4  
- Vue 3 + TypeScript  
- Tailwind CSS  
- npm  
- Static Site Generation (SSG)  
- PWA básico (extra)

---

## Como rodar o projeto

Instalar dependências:

npm install

Rodar em desenvolvimento:

npm run dev

A aplicação ficará disponível em:

http://localhost:3000/cursos

Observação: o Service Worker do PWA está desabilitado no modo dev para evitar problemas de cache durante alterações no código.

---

## Geração estática (SSG)

O projeto foi configurado para funcionar corretamente como site estático.

Gerar o build:

npm run generate

Isso cria a pasta:

.output/public

Para visualizar exatamente como ficaria em produção:

npm run preview:static

ou

npx serve .output/public

As rotas dinâmicas dos cursos são prerenderizadas no nuxt.config.ts com base nos dados mockados.

---

## Estrutura do projeto

A organização foi pensada para separar responsabilidades de forma clara:

- app/pages → rotas da aplicação  
- app/components → componentes reutilizáveis  
- app/composables → camada de dados (mock)  
- app/data → dados mockados dos cursos  
- app/types → tipagens do domínio  
- app/utils → funções auxiliares  
- public → arquivos estáticos (capas, favicon e ícones PWA)

---

## Funcionalidades implementadas

### Página “Meus Cursos”

- Cards contendo:
  - Título
  - Descrição curta
  - Imagem de capa
  - Progresso (%)
  - Quantidade de aulas
- Ações:
  - Continuar (leva para a próxima aula pendente)
  - Ver detalhes
- Filtros:
  - Busca por título
  - Status (não iniciado / em andamento / concluído)
- Estados de interface:
  - Skeleton loading
  - Empty state
- Layout responsivo

---

### Página do Curso

- Player de vídeo (YouTube embed)
- Lista lateral de aulas
- Troca de aula ao clicar
- Indicação visual:
  - Aula ativa
  - Aula concluída (mock)
- Controle de aula via query param (?lesson=)
- Materiais extras abrindo em nova aba

---

## Decisões técnicas

- Uso de composables (useCourses, useCourse) para separar lógica de dados da interface
- Tipagem do domínio com TypeScript
- Cálculo de progresso isolado em util
- Rotas dinâmicas explicitamente prerenderizadas no SSG
- PWA configurado apenas para produção
- Componentização com responsabilidade única

O objetivo foi manter clareza na arquitetura, código legível e uma base organizada, pronta para evoluir com backend real no futuro.

---

## Considerações finais

O foco principal foi garantir:

- Organização consistente
- Componentização adequada
- Código limpo
- Funcionamento correto do SSG
- Estrutura escalável

O projeto está pronto para ser executado em desenvolvimento ou publicado como site estático.
