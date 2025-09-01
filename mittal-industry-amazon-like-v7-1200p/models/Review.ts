import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: String,
  rating: Number,
  comment: String,
  status: { type: String, enum: ["pending","approved"], default: "pending" }
}, { timestamps: true });
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
