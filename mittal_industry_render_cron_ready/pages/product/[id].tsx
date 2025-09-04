import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail(){
  const router = useRouter();
  const id = router.query.id as string;
  const [p,setP]=useState<any|null>(null);
  useEffect(()=>{
    if(!id) return;
    fetch(`/api/products?limit=1&q=${id}`).then(r=>r.json()).then(list=>{
      // Fallback: fetch all and find
      if (list.length) setP(list.find((x:any)=>x._id===id)||list[0]);
      else fetch("/api/products?limit=500").then(r=>r.json()).then(all=>setP(all.find((x:any)=>x._id===id)));
    });
  },[id]);
  const add=()=>{
    if(!p) return;
    const cart=JSON.parse(localStorage.getItem("cart")||"[]");
    const idx=cart.findIndex((i:any)=>i._id===p._id);
    if(idx>=0) cart[idx].quantity+=1; else cart.push({...p, quantity:1});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };
  if(!p) return (<><Header/><div className="container"><div className="card"><div className="p">Loading...</div></div></div></>);
  return (<>
    <Header/>
    <div className="container">
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr 360px"}}>
        <div className="card"><img src={p.image} alt={p.name} style={{width:"100%",height:420,objectFit:"cover"}}/></div>
        <div className="card">
          <div className="p">
            <h1>{p.name}</h1>
            <div>by <b>{p.brand}</b> • ⭐ {p.rating} ({p.reviews} ratings)</div>
            <div className="price" style={{margin:"12px 0"}}>₹{p.price}</div>
            <p>{p.description}</p>
          </div>
        </div>
        <div className="buybox">
          <div className="price">₹{p.price}</div>
          <div>FREE delivery over ₹499</div>
          <label style={{display:"block",marginTop:8}}>Qty
            <select style={{display:"block",width:"100%",padding:8,marginTop:4}} id="qty">
              {[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}
            </select>
          </label>
          <button className="btn" style={{width:"100%",marginTop:8}} onClick={add}>Add to Cart</button>
          <a className="btn-outline" style={{display:"block",textAlign:"center",marginTop:8}} href="/cart">Buy Now</a>
          <div style={{marginTop:8,fontSize:12,color:"#6b7280"}}>Ships from Mittal Industry • Sold by Mittal Industry</div>
        </div>
      </div>
    </div>
  </>);
}
