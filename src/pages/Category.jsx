// src/pages/Category.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import "../styles/Home.css";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-backend-v4fi.onrender.com" : "http://localhost:4000")).replace(/\/$/, "");

export default function Category({ title, category }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/products`, { params: { category } })
      .then((res) => {
        setList(Array.isArray(res.data) ? res.data : res.data.items || []);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (err) return <div className="error">Error: {err}</div>;

  return (
    <main>
      <h1 className="title_home_product">{title}</h1>

      <div className="products_home">
        {list.length === 0 ? (
          <p style={{textAlign: 'center', width: '100%'}}>No products found in this category.</p>
        ) : (
          list.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))
        )}
      </div>
    </main>
  );
}
