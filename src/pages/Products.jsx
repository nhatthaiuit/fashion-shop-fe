// src/pages/Products.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "../styles/Home.css";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-backend-v4fi.onrender.com" : "http://localhost:4000")).replace(/\/$/, "");

export default function Products() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { add } = useCart();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get('search') || '';

  const params = useMemo(() => ({ page: 1, limit: 999, sort: "newest" }), []);

  useEffect(() => {
    let stop = false;
    setLoading(true);
    setErr(null);

    axios
      .get(`${API}/api/products`, { params })
      .then((res) => {
        if (stop) return;
        const data = res.data;
        const list = Array.isArray(data) ? data : data.items || [];
        const m = Array.isArray(data) ? null : data.meta || null;
        setItems(list);
        setMeta(m);
      })
      .catch((e) => {
        if (!stop) setErr(e?.response?.data?.message || e.message);
      })
      .finally(() => {
        if (!stop) setLoading(false);
      });

    return () => {
      stop = true;
    };
  }, [params]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (err) return <div className="error">Error: {String(err)}</div>;

  const filteredItems = items.filter(p => {
    const itemName = p?.product_name || p?.name || "";
    return itemName.toLowerCase().includes(searchKeyword.toLowerCase().trim());
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const A = (a.count_in_stock ?? 0) <= 0 ? 1 : 0;
    const B = (b.count_in_stock ?? 0) <= 0 ? 1 : 0;
    if (A !== B) return A - B; 
    return 0;
  });

  return (
    <main>
      <h1 className="title_home_product">
        {searchKeyword ? `SEARCH RESULTS FOR "${searchKeyword.toUpperCase()}"` : "ALL PRODUCTS"}
      </h1>

      <div className="products_home">
        {sortedItems.map((p) => {
          const out = (p.count_in_stock ?? 0) <= 0;
          return (
            <ProductCard key={p._id || p.name} p={p} />
          );
        })}
      </div>

      {meta && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Page {meta.page} / {meta.totalPages}
        </div>
      )}
    </main>
  );
}
