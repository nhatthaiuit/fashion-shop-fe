// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/ProductDetail.css";

import ImageGallery from "../components/products/ImageGallery";
import SizeSelector from "../components/products/SizeSelector";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-be-one.vercel.app" : "http://localhost:4000")).replace(/\/$/, "");

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load current product & reset state on ID change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSelectedSize(null);
    setQty(1);
    setLoading(true);
    setError(null);
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Suggested products from same category
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

  // ===== Logic Freesize vs Multiple Sizes =====
  const isFreesize = useMemo(() => {
    if (!product) return false;
    const sizes = product.sizes || [];
    if (sizes.length === 0) return true;
    if (sizes.some((s) => s.label === "Freesize" || s.label === "OneSize")) return true;
    return false;
  }, [product]);

  // Danh sách các size có thể chọn (nếu là sản phẩm phân loại size thông thường)
  const selectableSizes = useMemo(() => {
    if (!product?.sizes || isFreesize) return [];
    return product.sizes.filter((s) => s.label !== "Freesize" && s.label !== "OneSize");
  }, [product?.sizes, isFreesize]);

  const canSelectSize = !isFreesize && selectableSizes.length > 0;

  const totalStock = useMemo(() => {
    if (!product) return 0;
    const fromCount = Number(product.count_in_stock || 0);
    if (fromCount > 0) return fromCount;
    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes.reduce((sum, s) => sum + Number(s.stock || 0), 0);
    }
    return 99;
  }, [product]);

  // Available stock
  const stockAvailable = useMemo(() => {
    if (!product) return false;
    if (canSelectSize) {
      return selectableSizes.some((s) => (s.stock || 0) > 0);
    }
    return totalStock > 0;
  }, [product, canSelectSize, selectableSizes, totalStock]);

  const outOfStock = !stockAvailable;

  const getStock = () => {
    if (canSelectSize && selectedSize) {
      const s = product.sizes?.find((x) => x.label === selectedSize);
      return s ? (s.stock || 0) : 0;
    }
    return totalStock;
  };

  const selectedSizeStock = useMemo(() => {
    if (!product) return 0;
    return getStock();
  }, [product, selectedSize, canSelectSize, totalStock]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">Error loading product: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <main className="product_detail_page">
      <div className="product_detail_container">
        {/* Product Gallery */}
        <div className="product_detail_image">
          <ImageGallery main={product.image} images={product.images} />
        </div>

        {/* Product Information */}
        <div className="pt-20">
          <h2 className="text-3xl font-bold mb-4">{product.product_name}</h2>

          {product.original_price && product.original_price > product.price ? (
            <div className="mb-4" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <p className="text-xl text-red-600 font-semibold m-0">
                {Number(product.price || 0).toLocaleString()}đ
              </p>
              <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
                {Number(product.original_price).toLocaleString()}đ
              </p>
              <div className="discount-badge-detail">
                -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
              </div>
            </div>
          ) : (
            <p className="text-xl mb-4 text-red-600 font-semibold">
              {Number(product.price || 0).toLocaleString()}đ
            </p>
          )}

          <p className="product_detail_desc">
            {product.description || "No description available"}
          </p>

          {/* Size Section */}
          {isFreesize ? (
            <div className="product_detail_size" style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>Size:</label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span 
                  style={{ 
                    fontWeight: 700, 
                    color: "#ffffff", 
                    padding: "6px 18px", 
                    background: "#111111", 
                    borderRadius: "4px", 
                    fontSize: "14px", 
                    letterSpacing: "0.5px",
                    display: "inline-block",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                  }}
                >
                  Freesize
                </span>
                <span style={{ fontSize: "13px", color: "#666", fontStyle: "italic" }}>
                  (Sản phẩm Freesize — Không cần chọn size)
                </span>
              </div>
            </div>
          ) : canSelectSize ? (
            <div className="product_detail_size">
              <label>Select Size:</label>
              <SizeSelector sizes={selectableSizes} onChange={setSelectedSize} />
            </div>
          ) : null}

          {/* Quantity */}
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

          {/* Add to Cart Button */}
          <button
            className="btn_add_to_cart"
            disabled={outOfStock || (canSelectSize && !selectedSize)}
            onClick={() => add({ ...product, selectedSize: isFreesize ? "Freesize" : selectedSize }, qty)}
            title={outOfStock ? "OUT OF STOCK" : (canSelectSize && !selectedSize ? "PLEASE SELECT A SIZE" : "ADD TO CART")}
          >
            {outOfStock ? "OUT OF STOCK" : (canSelectSize && !selectedSize ? "SELECT SIZE TO ADD" : "+ ADD TO CART")}
          </button>
        </div>
      </div>

      {/* Related Products: You Might Also Like */}
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
                    alt={p.product_name || p.name}
                    onError={(e) => {
                      if (e.currentTarget.src !== window.location.origin + "/img/products/default.jpg") {
                        e.currentTarget.src = "/img/products/default.jpg";
                      }
                    }}
                  />
                </div>
                <div className="related_body">
                  <div className="related_name">{p.product_name || p.name}</div>
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
