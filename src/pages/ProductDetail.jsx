// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/ProductDetail.css";

import ImageGallery from "../components/products/ImageGallery";
import SizeSelector from "../components/products/SizeSelector";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

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
    () => ["Top", "Bottom", "Accessories"].includes(product?.category),
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
    return (product.count_in_stock || 0) > 0;
  }, [product, canSelectSize]);

  const outOfStock = !stockAvailable;

  const getStock = () => {
    // max theo size đã chọn hoặc count_in_stock
    if (product.sizes?.length && selectedSize) {
      const s = product.sizes.find(x => x.label === selectedSize);
      return s ? s.stock : 0;
    }
    // ko size (phụ kiện...)
    return product.count_in_stock || 99;
  };

  const selectedSizeStock = useMemo(() => {
    if (!product) return 0;
    return getStock();
  }, [product, selectedSize, getStock]);

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
        <div className="pt-20">
          <h2 className="text-3xl font-bold mb-4">{product.product_name}</h2>
          <p className="text-xl mb-4 text-red-600 font-semibold">
            {Number(product.price || 0).toLocaleString()}đ
          </p>

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
