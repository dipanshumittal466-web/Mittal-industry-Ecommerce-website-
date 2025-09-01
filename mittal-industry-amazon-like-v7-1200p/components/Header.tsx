import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header(){
  const router = useRouter();
  const [q,setQ]=useState("");
  const phone = process.env.NEXT_PUBLIC_BRAND_PHONE || process.env.BRAND_PHONE || "+91-7668420528";
  const email = process.env.NEXT_PUBLIC_BRAND_EMAIL || process.env.BRAND_EMAIL || "dipanshumittal466@gmail.com";
  return (
    <header className="header">
      <div className="bar">
        <Link href="/" style={{display:"flex",alignItems:"center",gap:8}}>
          <img src="/logo.png" alt="logo" width={40} height={40}/>
          <b>Mittal Industry</b>
        </Link>
        <input placeholder="Search for inverter, battery, LED, fan..." value={q} onChange={e=>setQ(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') router.push(`/search?q=${encodeURIComponent(q)}`) }}/>
        <Link className="badge" href="/cart">Cart</Link>
      </div>
      <div className="nav2">
        <span>Deliver to: <b>Enter PIN</b></span>
        <Link href="/category/electricals">Electricals</Link>
        <Link href="/category/electronics">Electronics</Link>
        <Link href="/category/wires">Wires</Link>
        <Link href="/category/fans">Fans</Link>
        <Link href="/category/stabilizers">Stabilizers</Link>
        <span style={{marginLeft:"auto"}}>{phone} • {email}</span>
      </div>
    </header>
  );
}
