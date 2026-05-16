# Directus CMS — BAGLUXE

## Local setup

```bash
docker compose up -d
```

Open http://localhost:8055 and log in with credentials from `docker-compose.yml`.

## Collections to create

Import schema from `snapshot/schema.json` via **Settings → Data Model → Import**.

| Collection | Purpose |
|------------|---------|
| `categories` | Product categories |
| `products` | Products (M2M categories, O2M variants) |
| `product_variants` | SKU / color / size / price |
| `blog_posts` | Blog articles |
| `site_settings` | Singleton — contact & SEO |
| `orders` | Customer orders / inquiries |
| `order_items` | Line items |
| `quote_requests` | Custom packaging quotes |
| `contact_messages` | Contact form |
| `newsletter_subscribers` | Newsletter emails |

## Server token

Create a static token for the **Server** role with create permissions on transactional collections and read on catalog collections. Set `DIRECTUS_SERVER_TOKEN` in `.env`.

## Railway

Deploy using the official Directus template with PostgreSQL plugin. Set `CORS_ORIGIN` to your Vercel domain.
