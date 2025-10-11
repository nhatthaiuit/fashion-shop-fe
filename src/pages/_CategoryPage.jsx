// src/pages/_CategoryPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import "../styles/products.template.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function CategoryPage({ title, category }) {
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

  if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (err) return <div className="error">Lỗi: {err}</div>;

  return (
    <main className="products_page">
      <h2 className="products_title">{title}</h2>

      <div className="products_grid">
        {list.length === 0 ? (
          <p>Không có sản phẩm nào trong mục này.</p>
        ) : (
          list.map((p) => (
            <div key={p._id} className="product_card">
              <Link to={`/products/${p._id}`} className="product_link">
                <div className="product_image_wrapper">
                  <img src={p.image || "/img/products/default.jpg"} alt={p.name} />
                </div>
                <div className="product_info">
                  <div className="product_name">{p.name}</div>
                  <div className="product_price">{Number(p.price || 0).toLocaleString()}đ</div>
                </div>
              </Link>
              <button className="btn_add" onClick={() => add(p, 1)}>
                + Thêm vào giỏ
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
