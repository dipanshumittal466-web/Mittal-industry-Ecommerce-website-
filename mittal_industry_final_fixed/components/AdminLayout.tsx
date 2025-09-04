import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React from "react";
export default function AdminLayout({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const nav = [
    {href:"/admin",label:"Dashboard"},
    {href:"/admin/orders",label:"Orders"},
    {href:"/admin/reviews",label:"Reviews"},
    {href:"/admin/products",label:"Products"},
    {href:"/admin/customers",label:"Customers"},
    {href:"/admin/settings",label:"Settings"}
  ];
  return (
    <div>
      <aside className="sidebar">
        <div style={{fontWeight:800,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
          <img src="/logo.png" alt="logo" width="28" height="28"/> Mittal Industry
        </div>
        {nav.map(n=>(<Link key={n.href} href={n.href} className={router.pathname===n.href?"active":""}>{n.label}</Link>))}
        <button className="btn" style={{marginTop:20}} onClick={()=>signOut({callbackUrl:"/"})}>Logout</button>
      </aside>
      <main className="content">
        <div className="topbar"><b>Admin</b> Panel</div>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
