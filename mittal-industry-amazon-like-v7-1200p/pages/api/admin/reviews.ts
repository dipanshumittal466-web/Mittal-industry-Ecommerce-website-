import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

interface CustomSession {
  user?: {
    role?: string;
    [key: string]: any;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const session = (await getServerSession(req, res, authOptions)) as CustomSession;

  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const reviews = await Reviewfind().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  }

  if (req.method === "PATCH") {
    const { id, status } = req.body as { id: string; status: "pending" | "approved" };
    const updated = await Review.findByIdAndUpdate(id, { status }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const { id } = req.query as { id: string };
    await Review.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
