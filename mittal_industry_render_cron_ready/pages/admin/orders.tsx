import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
export default function OrdersPage(){
  const { data: session } = useSession({ required: true });
  const [orders,setOrders]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/orders").then(r=>r.json()).then(setOrders); },[]);
  const updateStatus=async(id:string,status:string)=>{
    await fetch(`/api/orders/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});
    setOrders(prev=>prev.map(o=>o._id===id?{...o,status}:o));
  };
  if (!session || (session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout>
    <div className="card">
      <h2>Orders</h2>
      <table className="table"><thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>{orders.map(o=>(<tr key={o._id}><td>{o._id}</td><td>{o.userName}</td><td>₹{o.totalAmount}</td><td><span className={`tag status-${o.status}`}>{o.status}</span></td><td><button className="btn-outline" onClick={()=>updateStatus(o._id,"shipped")}>Mark Shipped</button> <button className="btn" onClick={()=>updateStatus(o._id,"delivered")}>Mark Delivered</button></td></tr>))}</tbody></table>
    </div>
  </AdminLayout>);
}
