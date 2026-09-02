# Fluxo de Chamados Genesys — Kanban Web

Kanban colaborativo com visão pública sem login e área administrativa protegida por senha.

**Status: Etapa 1 (Interface) concluída.**

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
│   ├── Board/               # Título, resumo e faixa de colunas
│   ├── Column/              # Coluna com cabeçalho, lista e ação criar
│   ├── TaskCard/            # Card de tarefa
│   └── Logo/                # Logo com preservação de proporção
├── lib/
│   ├── types.ts             # Board, Column, Task, ColumnPermissions
│   ├── mock-data.ts         # Dados da Etapa 1 (substituídos na Etapa 6)
│   ├── permissions.ts       # Leitura de permissões para a interface
│   └── format.ts            # Datas com fuso fixo (sem erro de hidratação)
└── styles/
    └── tokens.css           # Paleta oficial, tipografia, espaçamento
public/
└── logos/                   # <- os arquivos de logo entram aqui
```

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
- [ ] 2. Tarefas — criar, editar, excluir, modal
- [ ] 3. Drag and Drop — movimentação e reordenação
- [ ] 4. Área administrativa — login por senha e gestão de colunas
- [ ] 5. Permissões — por coluna, validadas no servidor
- [ ] 6. Banco de dados — Neon Postgres, API, sincronização
- [ ] 7. Refinamento — UX, animações, loading, erros, performance
# Fluxo-Chamados-Genesys
# Fluxo-Chamados-Genesys
# Fluxo-Chamados-Genesys
