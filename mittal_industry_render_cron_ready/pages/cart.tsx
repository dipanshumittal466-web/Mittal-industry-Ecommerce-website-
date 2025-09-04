import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";

export default function Cart(){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem("cart")||"[]")); },[]);
  const total = useMemo(()=>items.reduce((s,i)=>s+i.price*i.quantity,0),[items]);
  const checkout=async()=>{
    const name = prompt("Your Name?") || "Customer";
    const email = prompt("Email?") || "";
    const phone = prompt("Phone?") || "";
    const address = prompt("Address?") || "";
    const pincode = prompt("PIN code?") || "";
    const payload = {
      userName: name, userEmail: email, userPhone: phone, address, pincode,
      products: items.map(i=>({ productId:i._id, name:i.name, price:i.price, quantity:i.quantity })),
      totalAmount: Math.round(total)
    };
    const res = await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(res.ok){ alert("Order placed! Confirmation sent."); localStorage.removeItem("cart"); location.href="/"; }
    else alert("Order failed");
  };
  return (<>
    <Header/>
    <div className="container">
      <h2>Shopping Cart</h2>
      {items.length===0? <div className="card"><div className="p">Cart is empty.</div></div> :
      <div className="grid" style={{gridTemplateColumns:"2fr 1fr"}}>
        <div className="card">
          <table className="table"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>
          <tbody>{items.map((i,idx)=>(<tr key={idx}><td>{i.name}</td><td>₹{i.price}</td><td>{i.quantity}</td><td>₹{i.price*i.quantity}</td></tr>))}</tbody></table>
        </div>
        <div className="card"><div className="p">
          <div style={{fontWeight:800}}>Subtotal: ₹{Math.round(total)}</div>
          <button className="btn" style={{width:"100%",marginTop:8}} onClick={checkout}>Proceed to Buy</button>
        </div></div>
      </div>}
    </div>
  </>);
}
