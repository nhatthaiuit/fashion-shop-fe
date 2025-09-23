import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API = import.meta.env.VITE_API_URL;

export default function Products() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(res => setList(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{padding:20}}>
      <h2>Sản phẩm mới</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:16}}>
        {list.map(p => <ProductCard key={p._id || p.name} p={p} />)}
      </div>
    </div>
  );
}
