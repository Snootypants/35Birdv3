# 35Bird v3

Monorepo. Next.js App Router at `apps/web`. Phase 1 ships without DB/auth — content from files.

## Commands

• `pnpm dev` — run local dev (apps/web)
• `pnpm build && pnpm start` — production build & serve
• `pnpm lint`, `pnpm typecheck` — checks

## Deploy

Vercel → Import Git Repository → Root Directory = `apps/web`  
Install: `pnpm install` • Build: `pnpm build` • No env vars yet.

## Licenses

• Code (`/apps`, `/packages`): MIT
• Content & media (`/content`, `/public`): CC BY-NC-ND 4.0

See `LICENSE*` files.