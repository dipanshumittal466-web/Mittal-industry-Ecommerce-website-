import mongoose, { Schema, Model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    productId: { type: String, required: true },
    userName: String,
    rating: Number,
    comment: String,
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

// ✅ Explicit type define
const Review: Model<any> =
  models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
