import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  address: String,
  pincode: String,
  products: [{ productId: String, name: String, price: Number, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: "pending" }
}, { timestamps: true });
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
