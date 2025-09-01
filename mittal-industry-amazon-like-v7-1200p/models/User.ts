import mongoose, { Schema, model, models } from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }
}, { timestamps: true });
export default mongoose.models.User || mongoose.model("User", UserSchema);
