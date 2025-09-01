import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

// ✅ Prevent recompiling issues in Next.js (Hot Reloading)
const User = models.User || model("User", UserSchema);

export default User;import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }
}, { timestamps: true });
export default mongoose.models.User || mongoose.model("User", UserSchema);
