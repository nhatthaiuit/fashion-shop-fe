// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/detail.template.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="error">Lỗi tải sản phẩm: {error}</div>;
  if (!product) return <div className="error">Không tìm thấy sản phẩm</div>;

  return (
    <main className="product_detail_page">
      <div className="product_detail_container">
        {/* Ảnh sản phẩm */}
        <div className="product_detail_image">
          <img
            src={product.image || "/img/products/default.jpg"}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = "/img/products/default.jpg")}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product_detail_info">
          <h2 className="product_detail_name">{product.name}</h2>
          <div className="product_detail_price">
            {Number(product.price || 0).toLocaleString()}đ
          </div>

          <p className="product_detail_desc">{product.description || "Không có mô tả"}</p>

          <div className="product_detail_qty">
            <label>Số lượng: </label>
            <input
              type="number"
              min={1}
              max={product.countInStock || 99}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <button
            className="btn_add_to_cart"
            onClick={() => add(product, qty)}
          >
            + Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </main>
  );
}
