
Render Web Service (Next.js + Cron) — Quick Setup
=================================================

Build Command:
  npm install && npm run build

Start Command:
  npm start

Environment Variables:
  MONGODB_URI=your-mongodb-connection-string
  NEXTAUTH_SECRET=some-long-random-string
  NEXTAUTH_URL=https://<your-domain>

Notes:
- server.js runs Next.js and a daily cron (00:00) that recreates 1280 products with real images and random prices.
- On first boot, if no products exist, it seeds automatically.
