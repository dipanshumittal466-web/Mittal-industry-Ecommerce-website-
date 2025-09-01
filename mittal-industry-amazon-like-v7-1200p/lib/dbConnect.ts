import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");
declare global { var _mongooseConn: Promise<typeof mongoose> | undefined; }
export default async function dbConnect(){
  if (!global._mongooseConn) global._mongooseConn = mongoose.connect(MONGODB_URI);
  return global._mongooseConn;
}
