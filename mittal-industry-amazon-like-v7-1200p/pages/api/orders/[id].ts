import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { sendEmail } from "@/lib/mailer";
import { sendWhatsApp } from "@/lib/whatsapp";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  await dbConnect();
  const { id } = req.query as { id: string };
  if (req.method === "PUT"){
    const { status } = req.body as { status: "pending" | "shipped" | "delivered" };
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Not found" });
    if (order.userEmail) await sendEmail(order.userEmail, `Your Order is ${status}`, `Hello ${order.userName}, your order is now ${status}.`);
    await sendWhatsApp(`📦 ${order.userName}'s order is now ${status}.`);
    return res.status(200).json(order);
  }
  res.status(405).json({ error: "Method not allowed" });
}
