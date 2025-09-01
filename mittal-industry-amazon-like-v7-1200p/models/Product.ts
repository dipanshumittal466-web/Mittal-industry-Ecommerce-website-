import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  image: String,
  price: Number,
  stock: Number,
  category: String,
  rating: { type: Number, default: 4.3 },
  reviews: { type: Number, default: 100 }
}, { timestamps: true });
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
