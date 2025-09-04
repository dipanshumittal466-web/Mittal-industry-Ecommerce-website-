import Header from "@/components/Header";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Home(){
  const [deals,setDeals]=useState<any[]>([]);
  const [top,setTop]=useState<any[]>([]);
  useEffect(()=>{
    fetch("/api/products?limit=60").then(r=>r.json()).then(data=>{
      setDeals(data.slice(0,12));
      setTop(data.slice(12,36));
    });
  },[]);
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
      <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
        {deals.map(p=>(<ProductCard key={p._id} p={p} onAdd={add}/>))}
      </div>
      <h2 style={{marginTop:24}}>Top Picks</h2>
      <div className="grid" style={{gridTemplateColumns:"repeat(5,1fr)"}}>
        {top.map(p=>(<ProductCard key={p._id} p={p} onAdd={add}/>))}
      </div>
    </div>
    <footer className="footer">
      <div className="container">© {new Date().getFullYear()} Mittal Industry • All rights reserved.</div>
    </footer>
  </>);
}
