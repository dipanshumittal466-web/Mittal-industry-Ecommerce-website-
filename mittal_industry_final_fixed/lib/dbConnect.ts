import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env");
}

declare global {
  // global cache to prevent multiple connections in dev
  var _mongooseConn: Promise<typeof mongoose> | null;
}

export default async function dbConnect() {
  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("🔗 Connecting to MongoDB...");
  }

  try {
    const conn = await global._mongooseConn;
    console.log("✅ MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
