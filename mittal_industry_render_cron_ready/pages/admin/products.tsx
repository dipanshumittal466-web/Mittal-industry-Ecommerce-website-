import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
export default function AdminProducts(){
  const { data: session } = useSession({ required: true });
  const [products,setProducts]=useState<any[]>([]);
  const [form,setForm]=useState({name:"",price:0,brand:"",image:"",stock:0,category:"",description:""});
  useEffect(()=>{ fetch("/api/products").then(r=>r.json()).then(setProducts); },[]);
  const save=async()=>{
    const res=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const p=await res.json();
    setProducts(prev=>[p,...prev]);
    setForm({name:"",price:0,brand:"",image:"",stock:0,category:"",description:""});
  };
  if (!session || (session.user as any).role !== "admin") return <p>Access Denied</p>;
  return (<AdminLayout>
    <div className="card">
      <h2>Products</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        <div className="card">
          <h3>Add / Edit Product</h3>
          {Object.keys(form).map(k=>(<div key={k} style={{marginBottom:8}}>
            <label style={{display:"block",fontSize:12}}>{k}</label>
            <input className="table" value={(form as any)[k]} onChange={e=>setForm({...form,[k]:["price","stock"].includes(k)?Number(e.target.value):e.target.value})}/>
          </div>))}
          <button className="btn" onClick={save}>Save</button>
        </div>
        <div className="card">
          <table className="table"><thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th></tr></thead>
          <tbody>{products.map(p=>(<tr key={p._id}><td>{p.name}</td><td>₹{p.price}</td><td>{p.stock}</td><td>{p.category}</td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  </AdminLayout>);
}
