import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { sendEmail } from "@/lib/mailer";
import { sendWhatsApp } from "@/lib/whatsapp";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  await dbConnect();
  const { productId } = req.query as { productId: string };
  if (req.method === "GET"){
    const reviews = await Review.find({ productId, status: "approved" }).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  }
  if (req.method === "POST"){
    const { userName, rating, comment } = req.body;
    const review = await Review.create({ productId, userName, rating, comment, status: "pending" });
    const adminEmail = process.env.ADMIN_EMAIL || "";
    if (adminEmail) await sendEmail(adminEmail, "New Review Pending", `Product: ${productId}\nUser: ${userName}\n⭐ ${rating}\n${comment}`);
    await sendWhatsApp(`🆕 Review Pending\n${productId}\n${userName}\n⭐ ${rating}\nApprove: ${process.env.SITE_URL}/admin/reviews`);
    return res.status(201).json({ message: "Review submitted" });
  }
  res.status(405).json({ error: "Method not allowed" });
}
