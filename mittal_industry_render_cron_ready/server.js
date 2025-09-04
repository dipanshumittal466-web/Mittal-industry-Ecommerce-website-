const express = require('express');
const next = require('next');
const cron = require('node-cron');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in environment!");
  process.exit(1);
}

// Product model (reuse project's schema if available)
let Product;
try {
  // Try to load project's Product model (common paths)
  try { Product = require('./models/Product').default || require('./models/Product'); } catch {}
  if (!Product) try { Product = require('./models/product').default || require('./models/product'); } catch {}
  if (!Product) {
    // Fallback simple schema
    const ProductSchema = new mongoose.Schema({
      name: String,
      category: String,
      brand: String,
      description: String,
      price: Number,
      image: String,
      createdAt: { type: Date, default: Date.now }
    });
    Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    console.warn("ℹ️ Using fallback Product schema in server.js");
  }
} catch (e) {
  console.error("Product model load error:", e);
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("✅ MongoDB connected (server.js)");
}

function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CATEGORIES = ["electronics","fashion","grocery","furniture","mobile","accessories","electricals","appliances","books","toys"];
function makeImage(category) {
  return `https://source.unsplash.com/400x400/?${encodeURIComponent(category)},product`;
}

async function refreshProducts() {
  try {
    await connectDB();
    console.log("🔄 Refreshing products (daily job)...");
    await Product.deleteMany({});

    const docs = [];
    for (let i = 0; i < 1280; i++) {
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      docs.push({
        name: `${category.toUpperCase()} item ${i+1}`,
        category,
        brand: "Mittal",
        description: "Auto-generated daily product feed.",
        price: randomPrice(199, 49999),
        image: makeImage(category),
        createdAt: new Date()
      });
    }
    await Product.insertMany(docs, { ordered: false });
    console.log("✅ 1280 new products inserted.");
  } catch (err) {
    console.error("❌ Product refresh failed:", err);
  }
}

// Schedule: every day at 00:00 server time
cron.schedule("0 0 * * *", refreshProducts);

// Also run once at server start if collection is empty
(async () => {
  await connectDB();
  const count = await Product.countDocuments();
  if (!count) {
    console.log("ℹ️ No products found. Seeding initial 1280 items...");
    await refreshProducts();
  } else {
    console.log(`ℹ️ Products already present: ${count}`);
  }
})();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Next prepare error:", err);
  process.exit(1);
});