import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  await dbConnect();
  if (req.method === "GET"){
    const { q, category, limit = "60" } = req.query as any;
    const where:any = {};
    if (q) where.name = { $regex: q, $options: "i" };
    if (category) where.category = category;
    const items = await Product.find(where).limit(Number(limit)).sort({ createdAt: -1 });
    return res.status(200).json(items);
  }
  if (req.method === "POST"){
    const p = await Product.create(req.body);
    return res.status(201).json(p);
  }
  res.status(405).json({ error: "Method not allowed" });
}
