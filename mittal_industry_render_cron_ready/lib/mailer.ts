import nodemailer from "nodemailer";
export async function sendEmail(to: string, subject: string, text: string, html?: string){
  const user = process.env.EMAIL_USER as string;
  const pass = process.env.EMAIL_PASS as string;
  if (!user || !pass) return;
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({ from: `"Mittal Industry" <${user}>`, to, subject, text, html });
}
