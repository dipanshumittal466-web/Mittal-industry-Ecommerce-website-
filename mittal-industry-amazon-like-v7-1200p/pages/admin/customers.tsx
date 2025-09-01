import AdminLayout from "@/components/AdminLayout";
import { useSession } from "next-auth/react";
export default function AdminCustomers(){
  const { data: session } = useSession({ required: true });
  if (!session || (session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout><div className="card"><h2>Customers</h2><p>Coming soon.</p></div></AdminLayout>);
}
