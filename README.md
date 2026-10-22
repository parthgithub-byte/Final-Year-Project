# Fraud Investigation Agentic RAG

Proof of concept that automates evidence gathering for flagged transactions while keeping humans and deterministic rules in charge. All data is synthetic and all actions are simulated.

**Flow:** transaction event → risk score → case → analyst clicks **Investigate** → agent uses hybrid RAG (vector + keyword, merged with RRF) over customer data and policy files → cited summary and typed assessment → deterministic `decide()` picks hold / escalate / close → human approval for high-impact outcomes → hash-chained audit log.

## Stack

| Layer | Choice |
|---|---|
| Backend | Node.js 20+, JavaScript (ESM), Express, Zod |
| Database | MongoDB (Mongoose) |
| Vectors | Chroma |
| Keyword search | minisearch, merged with vectors using RRF |
| Embeddings | Local (transformers.js, `all-MiniLM-L6-v2`) |
| LLM | LangChain.js + OpenRouter |
| Agent | LangGraph.js |
| Frontend | React, Vite, TanStack Query, Tailwind |

## Quick start

```bash
cp .env.example .env          # add OPENROUTER_API_KEY
npm install
npm run dev:infra             # starts MongoDB and Chroma in Docker
npm run seed                  # loads synthetic customers and transactions
npm run dev:api               # API on http://localhost:4000
npm run dev:web               # UI on http://localhost:5173
```

No API key? Set `USE_FAKE_LLM=true` in `.env`. The first run downloads the embedding model (about 100 MB).

## Commands

| Command | What it does |
|---|---|
| `npm run dev:infra` | Start MongoDB and Chroma |
| `npm run dev:api` / `dev:web` | Run backend / frontend |
| `npm run seed` | Load synthetic data |
| `npm run simulate` | Emit demo transactions |
| `npm run eval:rag` | Check retrieval quality |
| `npm test` / `npm run lint` | Tests / linting |

## Layout

```
apps/api/src/   modules (events, cases, transactions, policies), rag, agent, decision, security
apps/web/src/   pages, components, api
packages/shared Zod schemas and event types (shared contracts)
scripts/        seed, simulator, RAG eval
docs/           contracts and decisions
```

## Team workflow

- Four owners, one per area (see `TEAM_RESPONSIBILITIES.md`).
- `main` is protected, work merges into `develop`, branches are named `feat/<area>-<task>`.
- Small PRs, one reviewer from another area, rebase on `develop` daily.
- Shared contracts in `packages/shared` are frozen after Day 1. Changes go through P1.

## Project rules

- The LLM never makes the final decision. `decide()` is plain deterministic code.
- Retrieved text, transaction notes and uploaded files are untrusted data.
- Mask PII before any LLM call.
- Every state change writes an audit entry.
- No secrets in git.

## Troubleshooting

- **Chroma will not start:** check port 8000 is free. Fallback: `MemoryVectorStore` behind `searchKb`.
- **Embedding download stalls:** retry on a stable connection, or switch to Ollama embeddings.
- **OpenRouter errors or rate limits:** set `USE_FAKE_LLM=true`.
- **Mongo connection refused:** run `docker compose ps` and confirm the container is up.
