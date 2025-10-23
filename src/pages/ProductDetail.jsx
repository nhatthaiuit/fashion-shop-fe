// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/detail.template.css";
import { Link } from "react-router-dom";

// Component chọn size (tích hợp sẵn trong file này)
function SizeSelector({ sizes = [], onChange }) {
  const [selected, setSelected] = useState(null);

  const options = sizes.length
    ? sizes
    : [
        { label: "S", stock: 0 },
        { label: "M", stock: 0 },
        { label: "L", stock: 0 },
      ];

  return (
    <div className="size-selector">
      {options.map(({ label, stock }) => {
        const disabled = stock <= 0;
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            className={`size-btn ${active ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
            disabled={disabled}
            onClick={() => {
              setSelected(label);
              onChange?.(label);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// Component hiển thị ảnh chính + gallery ảnh phụ
function ImageGallery({ main, images = [] }) {
  const all = images?.length ? [main, ...images] : [main].filter(Boolean);
  const [current, setCurrent] = useState(all[0]);
  if (!all.length) return null;
  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={current} alt="" />
      </div>
      {all.length > 1 && (
        <div className="thumbs">
          {all.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className={`thumb ${src === current ? "active" : ""}`}
              onClick={() => setCurrent(src)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { add } = useCart();

  // Load sản phẩm hiện tại
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Gợi ý sản phẩm cùng category
  useEffect(() => {
    if (!product?.category) return;
    axios
      .get(`${API}/api/products?category=${encodeURIComponent(product.category)}&limit=8`)
      .then((res) => {
        const list = Array.isArray(res.data.items)
          ? res.data.items
          : Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        const filtered = list.filter((x) => x._id !== product._id);
        setRelated(filtered.slice(0, 6));
      })
      .catch(() => {});
  }, [product?.category, product?._id]);

  if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="error">Lỗi tải sản phẩm: {error}</div>;
  if (!product) return <div className="error">Không tìm thấy sản phẩm</div>;

  const outOfStock = product.countInStock <= 0;

  return (
    <main className="product_detail_page">
      <div className="product_detail_container">
        {/* Ảnh sản phẩm (gallery) */}
        <div className="product_detail_image">
          <ImageGallery main={product.image} images={product.images} />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product_detail_info">
          <h2 className="product_detail_name">{product.name}</h2>
          <div className="product_detail_price">
            {Number(product.price || 0).toLocaleString()}đ
          </div>

          <p className="product_detail_desc">
            {product.description || "Không có mô tả"}
          </p>

          {/* Chọn size */}
          <div className="product_detail_size">
            <label>Chọn size:</label>
            <SizeSelector sizes={product.sizes} onChange={setSelectedSize} />
          </div>

          {/* Số lượng */}
          <div className="product_detail_qty">
            <label>Số lượng:</label>
            <input
              type="number"
              min={1}
              max={product.countInStock || 99}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              disabled={outOfStock}
            />
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            className="btn_add_to_cart"
            disabled={outOfStock || (product.sizes?.length && !selectedSize)}
            onClick={() => add({ ...product, selectedSize }, qty)}
          >
            {outOfStock ? "Hết hàng" : "+ Thêm vào giỏ hàng"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
  <section className="related_section">
    <h3 className="related_title">Gợi ý sản phẩm cùng loại</h3>

    <div className="related_grid">
      {related.map((p) => (
        <Link
          key={p._id}
          to={`/products/${p._id}`}
          className="related_card related_link"
        >
          <div className="related_media">
            <img
              src={p.image || "/img/products/default.jpg"}
              alt={p.name}
              onError={(e) => (e.currentTarget.src = "/img/products/default.jpg")}
            />
          </div>
          <div className="related_body">
            <div className="related_name">{p.name}</div>
            <div className="related_price">
              {Number(p.price || 0).toLocaleString()}đ
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}
    </main>
  );
}
