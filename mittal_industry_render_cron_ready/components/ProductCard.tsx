export default function ProductCard({ p, onAdd }:{ p:any; onAdd:(p:any)=>void }){
  return (
    <div className="card hoverable">
      <img src={p.image} alt={p.name} style={{width:"100%",height:220,objectFit:"cover"}}/>
      <div className="p">
        <div style={{fontWeight:700, lineHeight:1.2}}>{p.name}</div>
        <div style={{fontSize:12,color:"#6b7280"}}>by {p.brand} • ⭐ {p.rating} ({p.reviews})</div>
        <div className="price" style={{margin:"8px 0"}}>₹{p.price}</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn" onClick={()=>onAdd(p)}>Add to Cart</button>
          <a className="btn-outline" href={`/product/${p._id}`}>View</a>
        </div>
      </div>
    </div>
  );
}
