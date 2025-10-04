// src/pages/_CategoryPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard.jsx";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function CategoryPage({ title, filter }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((res) => {
        const list = res.data || [];
        setProducts(typeof filter === "function" ? list.filter(filter) : list);
      })
      .catch(() => setProducts([]));
  }, [filter]);

  return (
    <main style={{ padding: 20 }}>
      <h2>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {products.map((p) => <ProductCard key={p._id || p.id} p={p} />)}
      </div>
    </main>
  );
}
