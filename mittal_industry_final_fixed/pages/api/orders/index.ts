import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { sendEmail } from "@/lib/mailer";
import { sendWhatsApp } from "@/lib/whatsapp";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  await dbConnect();
  if (req.method === "GET"){
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  }
  if (req.method === "POST"){
    const { userName, userEmail, userPhone, address, pincode, products, totalAmount } = req.body;
    const order = await Order.create({ userName, userEmail, userPhone, address, pincode, products, totalAmount });
    const summary = products.map((p:any)=>`${p.name} x${p.quantity}`).join(", ");
    const adminEmail = process.env.ADMIN_EMAIL || "";
    if (adminEmail) await sendEmail(adminEmail, "New Order", `Customer: ${userName}\n${summary}\nTotal: ₹${totalAmount}`);
    await sendWhatsApp(`🛒 New Order\n${userName}\n${summary}\nTotal: ₹${totalAmount}\nManage: ${process.env.SITE_URL}/admin/orders`);
    if (userEmail) await sendEmail(userEmail, "Order Confirmation - Mittal Industry", `Hello ${userName},\nThanks!\n${summary}\nTotal: ₹${totalAmount}`);
    return res.status(201).json(order);
  }
  res.status(405).json({ error: "Method not allowed" });
}
