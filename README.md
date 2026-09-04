# Fluxo de Chamados Genesys — Kanban Web

Kanban colaborativo com visão pública sem login e área administrativa protegida por senha.

**Status: Etapa 2 (Tarefas) concluída.**

---

## Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 15 (App Router) | Frontend e API no mesmo projeto, deploy nativo na Vercel |
| Linguagem | TypeScript | Contratos de dados verificados em tempo de build |
| Estilo | CSS Modules + variáveis CSS | Zero framework de UI, controle total da identidade visual |
| Banco (Etapa 6) | Neon Postgres | Relacional, integração nativa no marketplace da Vercel |

---

## Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Build de produção:

```bash
npm run build
npm start
```

---

## Estrutura

```
src/
├── app/
│   ├── layout.tsx           # Shell HTML, metadados, idioma pt-BR
│   ├── globals.css          # Reset + importação dos tokens
│   ├── page.tsx             # Página pública (item 1)
│   ├── page.module.css
│   └── admin/               # Área administrativa (Etapa 4)
│       ├── page.tsx
│       └── page.module.css
├── components/
│   ├── Header/              # Logo + acesso admin
│   ├── Board/               # Título, resumo, faixa de colunas e diálogos
│   ├── Column/              # Coluna com cabeçalho, lista e ação criar
│   ├── TaskCard/            # Card de tarefa com ações editar/excluir
│   ├── Modal/               # Casca de diálogo sobre <dialog> nativo
│   ├── TaskModal/           # Formulário de criação e edição
│   ├── ConfirmDialog/       # Confirmação de ação destrutiva
│   └── Logo/                # Logo com preservação de proporção
├── lib/
│   ├── types.ts             # Board, Column, Task, ColumnPermissions
│   ├── mock-data.ts         # Dados da Etapa 1 (substituídos na Etapa 6)
│   ├── selectors.ts         # Ordenação, próxima posição, renumeração
│   ├── board-store.tsx      # Reducer do quadro (criar/editar/excluir)
│   ├── validation.ts        # Regras de título e descrição (cliente + servidor)
│   ├── permissions.ts       # Leitura de permissões para a interface
│   └── format.ts            # Datas com fuso fixo (sem erro de hidratação)
└── styles/
    └── tokens.css           # Paleta oficial, tipografia, espaçamento
public/
└── logos/                   # <- os arquivos de logo entram aqui
```

---

## Estado das tarefas (Etapa 2)

Todas as mudanças passam por um único reducer em `src/lib/board-store.tsx`. A interface nunca altera o snapshot: despacha uma intenção e recebe o próximo snapshot pronto.

| Ação | O que faz |
|---|---|
| `createTask` | Insere no fim da coluna (`position` = maior + 1), grava `createdAt` e `updatedAt` |
| `updateTask` | Atualiza título e descrição e move `updatedAt`; sem mudança real, não toca na data |
| `deleteTask` | Remove e renumera a coluna para 1, 2, 3… sem lacunas |

Na Etapa 3 entra `task/moved` no mesmo reducer. Na Etapa 6 cada função vira uma chamada a `/api`, e o reducer continua sendo quem aplica o resultado na tela — os componentes não mudam nas duas etapas.

**O estado vive apenas na memória da aba.** Recarregar volta aos dados de exemplo: persistência é o assunto da Etapa 6 (item 12), e `localStorage` foi descartado como solução definitiva.

`src/lib/validation.ts` não importa React de propósito — as mesmas funções vão rodar na rota de API da Etapa 6, porque o item 13 exige que o servidor não confie no frontend.

---

## Identidade visual

Toda cor vive em `src/styles/tokens.css`, em duas camadas:

1. **Paleta bruta** — os 11 hexadecimais da especificação, nada além disso.
2. **Papéis semânticos** — `--surface-app`, `--text-primary`, `--brand-primary`…

Componentes usam apenas a segunda camada. Nenhum arquivo `.module.css` escreve hexadecimal.

Neutras para fundo, cards, bordas, campos e texto secundário. Destaque reservado para ações, indicadores e identificação das colunas — cada coluna carrega um `accent` que colore apenas a barra superior e o contador.

---

## Logos

O logo oficial está em `public/logos/logo-principal.png` (720×498, fundo transparente, 35 KB).

O componente `Logo` fixa somente a altura — a largura fica em `auto`, preservando a proporção original de 1,446:1. Se o arquivo estiver ausente, um espaço reservado com a mesma proporção é exibido, para que a troca não altere o layout.

O arquivo original recebido tinha 1462×1076 com uma larga margem transparente ao redor. As margens foram recortadas (nenhum elemento do logo foi alterado) e a imagem redimensionada para 720px de largura, reduzindo o peso de 242 KB para 35 KB.

---

## Responsividade

| Faixa | Comportamento |
|---|---|
| ≥ 861px | Colunas lado a lado, dividindo o espaço entre 258px e 380px |
| ≤ 860px | Rolagem horizontal com encaixe (scroll-snap), coluna ocupando 88% da largura |
| ≤ 620px | Cabeçalho compacto, resumo em largura total |

Abaixo da largura mínima a faixa rola em vez de espremer os cards.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Nenhuma variável é necessária na Etapa 1.

`ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` entram na Etapa 4 e `DATABASE_URL` na Etapa 6. Nenhuma delas usa o prefixo `NEXT_PUBLIC_`, portanto ficam restritas ao servidor.

---

## Etapas

- [x] **1. Interface** — estrutura, header, kanban, colunas, cards, identidade visual, responsividade
- [x] **2. Tarefas** — criar, editar, excluir, modal com título e descrição
- [ ] 3. Drag and Drop — movimentação e reordenação
- [ ] 4. Área administrativa — login por senha e gestão de colunas
- [ ] 5. Permissões — por coluna, validadas no servidor
- [ ] 6. Banco de dados — Neon Postgres, API, sincronização
- [ ] 7. Refinamento — UX, animações, loading, erros, performance
# Fluxo-Chamados-Genesys
# Fluxo-Chamados-Genesys
# Fluxo-Chamados-Genesys
