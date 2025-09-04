import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Search(){
  const router = useRouter();
  const q = (router.query.q as string) || "";
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{
    if(!q) return;
    fetch(`/api/products?q=${encodeURIComponent(q)}&limit=100`).then(r=>r.json()).then(setItems);
  },[q]);
  const add=(p:any)=>{
    const cart=JSON.parse(localStorage.getItem("cart")||"[]");
    const idx=cart.findIndex((i:any)=>i._id===p._id);
    if(idx>=0) cart[idx].quantity+=1; else cart.push({...p, quantity:1});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };
  return (<>
    <Header/>
    <div className="container">
      <h2>Search results for “{q}”</h2>
      <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
        {items.map(p=>(<ProductCard key={p._id} p={p} onAdd={add}/>))}
      </div>
    </div>
  </>);
}
