import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userEmail: string;
  userName: string;
  productId: string;
  quantity: number;
  status: "pending" | "shipped" | "delivered";
  totalAmount: number;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
