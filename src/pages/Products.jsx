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

  const params = useMemo(() => ({ page: 1, limit: 12, sort: "newest" }), []);

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
  }, [API, params]);

  if (loading) return <div className="loading">Đang tải sản phẩm…</div>;
  if (err) return <div className="error">Lỗi: {String(err)}</div>;

  return (
    <main className="products_page">
      <h2 className="products_title">TẤT CẢ SẢN PHẨM</h2>

      <div className="products_grid">
        {items.map((p) => (
          <div key={p._id || p.name} className="product_card">
            {/* 🖼️ Bọc ảnh và tên trong Link */}
            <Link to={`/products/${p._id}`} className="product_link">
              <div className="product_image_wrapper">
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

            {/* Nút thêm giỏ hàng */}
            <button className="btn_add" onClick={() => add(p, 1)}>
              + Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {meta && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Trang {meta.page} / {meta.totalPages}
        </div>
      )}
    </main>
  );
}
