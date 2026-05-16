# BAGLUXE — Premium Fabric Packaging E-commerce

Independent storefront for BAGLUXE, built with **Nuxt 3/4**, **Tailwind CSS**, **shadcn-vue**, **Motion**, and **Directus** CMS.

## Product decisions (PRD defaults)

| Item | Value |
|------|-------|
| Brand | **BAGLUXE** |
| Currency | **USD** |
| Locales | **en** + **zh** (URL prefix) |
| Phase 1 | Cart + inquiry checkout (no payment) |
| Phase 2 | Stripe Checkout + account orders |
| Email | **Resend** (optional; logs to console when unset) |

## Stack

- **Frontend:** Nuxt, TypeScript, Tailwind CSS, shadcn-nuxt, Pinia, @vueuse/motion, @nuxtjs/i18n
- **CMS:** Directus 11 + PostgreSQL (Docker locally, Railway in production)
- **Deploy:** Vercel (Nuxt) + Railway (Directus)

## Quick start

```bash
nvm use          # Node 20+
npm install
cp .env.example .env
npm run dev      # http://localhost:3000
```

The storefront works **without Directus** using built-in mock catalog data.

### Directus (optional)

```bash
docker compose up -d
# Admin: http://localhost:8055 — see docker-compose.yml for credentials
# Import directus/snapshot/schema.json in Directus admin
```

Set `DIRECTUS_SERVER_TOKEN` after creating a static token for server-side writes.

### Demo account (Phase 2 stub)

- Any email + password `demo123` on `/account`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project structure

```
├── app/
│   ├── pages/          # Routes (i18n prefix: /en, /zh)
│   ├── components/     # UI (shadcn-style) + layout + product
│   ├── composables/    # useCatalog
│   ├── stores/         # cart, wishlist, auth
│   └── lib/utils.ts    # cn, formatPrice, etc.
├── server/api/         # BFF (catalog, forms, checkout, stripe)
├── server/data/mock.ts # Fallback catalog when Directus is offline
├── i18n/locales/       # en.json, zh.json
├── directus/           # Schema snapshot + docs
└── docker-compose.yml  # Local Directus + Postgres
```

## Deployment

### Vercel

Connect repo, set environment variables from `.env.example`, deploy.

### Railway

Deploy Directus template + Postgres. Set `CORS_ORIGIN` to your Vercel URL. Point `NUXT_PUBLIC_DIRECTUS_URL` and `DIRECTUS_URL` to Railway Directus URL.

## License

Private — PropersonCyber / jayp-website
