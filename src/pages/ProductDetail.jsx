// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/detail.template.css";

// ========== SizeSelector (không tự bơm S/M/L 0 stock) ==========
function SizeSelector({ sizes = [], onChange }) {
  const [selected, setSelected] = useState(null);

  if (!Array.isArray(sizes) || sizes.length === 0) {
    return null; // không render nếu không có size
  }

  return (
    <div className="size-selector">
      {sizes.map(({ label, stock }) => {
        const disabled = (stock || 0) <= 0;
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            className={`size-btn ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
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

// ========== ImageGallery ==========
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
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load sản phẩm hiện tại
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Gợi ý sản phẩm cùng category
  useEffect(() => {
    if (!product?.category) return;
    axios
      .get(`${API}/api/products?category=${encodeURIComponent(product.category)}&limit=8`)
      .then((res) => {
        const list = Array.isArray(res.data?.items)
          ? res.data.items
          : Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];
        const filtered = list.filter((x) => x._id !== product._id);
        setRelated(filtered.slice(0, 6));
      })
      .catch(() => { });
  }, [product?.category, product?._id]);

  // ===== Logic hiển thị theo category/sizes =====
  const needSize = useMemo(
    () => ["Top", "Bottom"].includes(product?.category),
    [product?.category]
  );
  const hasSizes = useMemo(
    () => Array.isArray(product?.sizes) && product.sizes.length > 0,
    [product?.sizes]
  );
  const canSelectSize = needSize && hasSizes;

  // tồn hiện có
  const stockAvailable = useMemo(() => {
    if (!product) return false;
    if (canSelectSize) {
      return product.sizes.some((s) => (s.stock || 0) > 0);
    }
    return (product.countInStock || 0) > 0;
  }, [product, canSelectSize]);

  const outOfStock = !stockAvailable;

  // max theo size đã chọn hoặc countInStock
  const selectedSizeStock = useMemo(() => {
    if (!product) return 0;
    if (canSelectSize && selectedSize) {
      return product.sizes.find((s) => s.label === selectedSize)?.stock || 0;
    }
    return product.countInStock || 99;
  }, [product, canSelectSize, selectedSize]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">Error loading product: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

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
            {product.description || "No description available"}
          </p>

          {/* Chọn size: chỉ render khi cần & có sizes */}
          {canSelectSize && (
            <div className="product_detail_size">
              <label>Select Size:</label>
              <SizeSelector sizes={product.sizes} onChange={setSelectedSize} />
            </div>
          )}
          {/* Cảnh báo nếu cần size nhưng chưa cấu hình */}
          {needSize && !hasSizes && (
            <p style={{ color: "#b45309", marginTop: 6 }}>
              Product requires size selection but sizes are not configured.
            </p>
          )}

          {/* Số lượng */}
          <div className="product_detail_qty">
            <label>Quantity:</label>
            <div className="qty-controls">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={outOfStock || qty <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={selectedSizeStock}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value || 1), selectedSizeStock)))}
                disabled={outOfStock}
                aria-label="Quantity"
              />
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(Math.min(selectedSizeStock, qty + 1))}
                disabled={outOfStock || qty >= selectedSizeStock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            className="btn_add_to_cart"
            disabled={outOfStock || (canSelectSize && !selectedSize)}
            onClick={() => add({ ...product, selectedSize }, qty)}
            title={outOfStock ? "Out of Stock" : (canSelectSize && !selectedSize ? "Please select a size" : "Add to Cart")}
          >
            {outOfStock ? "Out of Stock" : "+ Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related_section">
          <h3 className="related_title">You might also like</h3>

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
