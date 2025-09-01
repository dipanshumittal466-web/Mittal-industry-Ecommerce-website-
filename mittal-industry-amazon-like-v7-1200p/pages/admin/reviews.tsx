import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
export default function AdminReviews(){
  const { data: session } = useSession({ required: true });
  const [reviews,setReviews]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/admin/reviews").then(r=>r.json()).then(setReviews); },[]);
  const approve=async(id:string,status:"approved"|"pending")=>{
    await fetch("/api/admin/reviews",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});
    setReviews(prev=>prev.map(r=>r._id===id?{...r,status}:r));
  };
  const del=async(id:string)=>{
    await fetch(`/api/admin/reviews?id=${id}`,{method:"DELETE"});
    setReviews(prev=>prev.filter(r=>r._id!==id));
  };
  if (!session || (session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout>
    <div className="card">
      <h2>Reviews Moderation</h2>
      <table className="table"><thead><tr><th>User</th><th>Product</th><th>Rating</th><th>Comment</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>{reviews.map(r=>(<tr key={r._id}><td>{r.userName}</td><td>{r.productId}</td><td>⭐ {r.rating}</td><td>{r.comment}</td><td>{r.status}</td><td>{r.status==="pending"?<button className="btn" onClick={()=>approve(r._id,"approved")}>Approve</button>:<button className="btn-outline" onClick={()=>approve(r._id,"pending")}>Unapprove</button>} <button className="btn-outline" onClick={()=>del(r._id)}>Delete</button></td></tr>))}</tbody></table>
    </div>
  </AdminLayout>);
}
