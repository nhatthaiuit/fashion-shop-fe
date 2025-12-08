// src/pages/Products.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "../styles/products.template.css";
import { Link } from "react-router-dom";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Products() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { add } = useCart();

  // giữ phân trang/sort như cũ
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
  }, [params]); // API là hằng, không cần đưa vào deps

  if (loading) return <div className="loading">Loading products...</div>;
  if (err) return <div className="error">Error: {String(err)}</div>;

  // ✅ Đẩy sản phẩm hết hàng xuống cuối (client-side)
  const sortedItems = [...items].sort((a, b) => {
    const A = (a.countInStock ?? 0) <= 0 ? 1 : 0;
    const B = (b.countInStock ?? 0) <= 0 ? 1 : 0;
    if (A !== B) return A - B; // hết hàng (1) xuống dưới
    return 0;
  });

  return (
    <main className="products_page">
      <h2 className="products_title">ALL PRODUCTS</h2>

      <div className="products_grid">
        {sortedItems.map((p) => {
          const out = (p.countInStock ?? 0) <= 0;
          return (
            <div
              key={p._id || p.name}
              className={`product_card ${out ? "out-of-stock" : ""}`}
              title={out ? "Out of Stock" : ""}
            >
              <Link to={`/products/${p._id}`} className="product_link">
                <div className="product_image_wrapper">
                  {/* Badge Out of Stock */}
                  {out && <span className="badge_oos">Out of Stock</span>}
                  <img
                    src={p.image || "/img/products/default.jpg"}
                    alt={p.name}
                    onError={(e) =>
                      (e.currentTarget.src = "/img/products/default.jpg")
                    }
                  />
                </div>

                <div className="product_info">
                  <div className="product_name">{p.name}</div>
                  <div className="product_price">
                    {Number(p.price || 0).toLocaleString()}đ
                  </div>
                </div>
              </Link>

              {/* Nút thêm giỏ: disable khi hết hàng */}
              <button
                className="btn_add"
                disabled={out}
                onClick={() => add(p, 1)}
              >
                {out ? "Out of Stock" : "+ Add to Cart"}
              </button>
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
