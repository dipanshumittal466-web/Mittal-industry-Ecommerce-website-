import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
export default function AdminLogin(){
  const [email,setEmail]=useState("dipanshumittal466@gmail.com");
  const [password,setPassword]=useState("");
  const router = useRouter();
  const handleLogin=async(e:any)=>{
    e.preventDefault();
    const res = await signIn("credentials",{redirect:false,email,password});
    if(!res?.error) router.push("/admin"); else alert("Login failed");
  };
  return (<div className="container" style={{maxWidth:420}}>
    <div className="card">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input className="table" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="table" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn" type="submit" style={{marginTop:12}}>Login</button>
      </form>
    </div>
  </div>);
}
