import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage(){
  const router = useRouter();
  const slug = router.query.slug as string;
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{
    if(!slug) return;
    fetch(`/api/products?category=${slug}&limit=200`).then(r=>r.json()).then(setItems);
  },[slug]);
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
      <h2 style={{textTransform:"capitalize"}}>{slug}</h2>
      <div className="grid" style={{gridTemplateColumns:"240px 1fr"}}>
        <aside className="left-rail card">
          <div className="p"><b>Filters</b><div className="tag">Brand</div><div className="tag">Price</div><div className="tag">Rating</div></div>
        </aside>
        <main className="grid" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
          {items.map(p=>(<ProductCard key={p._id} p={p} onAdd={add}/>))}
        </main>
      </div>
    </div>
  </>);
}
