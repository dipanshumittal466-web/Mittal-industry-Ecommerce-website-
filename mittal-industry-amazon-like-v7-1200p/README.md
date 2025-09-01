# Mittal Industry — Amazon-like Storefront + Admin (v7)

Single Next.js project including:
- Amazon-style storefront (home, category, search, product, cart)
- Admin dashboard (orders, reviews, products, customers, settings)
- MongoDB models, Email (Gmail), WhatsApp (Twilio)
- robots.txt + sitemap.xml
- Logo and contact details pre-wired

## Quick Start
```bash
npm install
cp .env.example .env.local
# Fill Mongo + secrets (Gmail app password, Twilio sandbox)
npm run dev
```

## Seed 1200+ Electrical/Electronic Products
```bash
npm run seed
```
This generates realistic product names with Unsplash images (inverter, battery, LED, fan, stabilizer, wire, socket, etc.) and random market-like prices.

## Admin
- /admin/login
- /admin (requires seeded admin user with bcrypt password)

## Deployment
- Render / Vercel supported. Ensure ENV vars are set.
