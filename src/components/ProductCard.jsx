export default function ProductCard({ p }) {
  return (
    <div style={{border:"1px solid #eee", padding:12, borderRadius:8}}>
      <img
        src={p.image || "https://placehold.co/300x300"}
        alt={p.name}
        style={{width:"100%", borderRadius:8}}
      />
      <h3 style={{margin:"8px 0"}}>{p.name}</h3>
      <p style={{opacity:0.8}}>{p.category}</p>
      <strong>{p.price.toLocaleString()} đ</strong>
      <button style={{display:"block", marginTop:10}}>Thêm vào giỏ</button>
    </div>
  );
}
