// src/pages/Products.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function Products() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { add } = useCart();

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

  const sortedItems = [...items].sort((a, b) => {
    const A = (a.count_in_stock ?? 0) <= 0 ? 1 : 0;
    const B = (b.count_in_stock ?? 0) <= 0 ? 1 : 0;
    if (A !== B) return A - B; 
    return 0;
  });

  return (
    <main>
      <h1 className="title_home_product">ALL PRODUCTS</h1>

      <div className="products_home">
        {sortedItems.map((p) => {
          const out = (p.count_in_stock ?? 0) <= 0;
          return (
            <div
              key={p._id || p.name}
              className={`item_products_home ${out ? "out-of-stock" : ""}`}
              style={{opacity: out ? 0.5 : 1}}
              title={out ? "Out of Stock" : ""}
            >
              <div className="image_home_item">
                  <Link to={`/products/${p._id}`}>
                      {out && <span style={{position: 'absolute', background: 'black', color: 'white', padding: '5px 10px'}}>Out of Stock</span>}
                      <img 
                          src={p.image || "/img/products/default.jpg"} 
                          alt={p.name} 
                          className="image_products_home" 
                          onError={(e) => (e.currentTarget.src = "/img/products/default.jpg")} 
                      />
                  </Link>
              </div>
              <h4 className="infProducts_home">{p.name || p.product_name}</h4>
              <p className="infProducts_home">{Number(p.price || 0).toLocaleString()} VND</p>
              <div style={{textAlign: 'center', marginTop: '15px'}}>
                  <button className="btn_add_cart" disabled={out} onClick={() => add(p, 1)}>{out ? "OUT OF STOCK" : "+ ADD TO CART"}</button>
              </div>
            </div>
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
