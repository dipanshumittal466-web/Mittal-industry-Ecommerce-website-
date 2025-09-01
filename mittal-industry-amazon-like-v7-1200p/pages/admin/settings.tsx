import AdminLayout from "@/components/AdminLayout";
import { useSession } from "next-auth/react";
export default function AdminSettings(){
  const { data: session } = useSession({ required: true });
  if (!session || (session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout>
    <div className="card">
      <h2>Settings</h2>
      <ul>
        <li>• Header contact: process.env.BRAND_PHONE / BRAND_EMAIL</li>
        <li>• WhatsApp via Twilio</li>
        <li>• Email via Gmail App Password</li>
      </ul>
    </div>
  </AdminLayout>);
}
