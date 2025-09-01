import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
export default function AdminHome(){
  const { data: session } = useSession({ required: true });
  if (!session) return null;
  if ((session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout>
    <div className="card"><h2>Dashboard</h2><p>Welcome back, {(session.user as any).email}</p></div>
  </AdminLayout>);
}
