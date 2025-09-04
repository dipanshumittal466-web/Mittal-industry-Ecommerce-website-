import twilio from "twilio";
export async function sendWhatsApp(message: string, to?: string){
  const sid = process.env.TWILIO_SID as string;
  const token = process.env.TWILIO_AUTH_TOKEN as string;
  const from = process.env.TWILIO_WHATSAPP as string;
  const adminTo = to ?? (process.env.ADMIN_WHATSAPP as string);
  if (!sid || !token || !from || !adminTo) return;
  const client = twilio(sid, token);
  await client.messages.create({ from, to: adminTo, body: message });
}
