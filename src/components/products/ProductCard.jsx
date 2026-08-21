import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductCard({ p }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = Number(p.count_in_stock || 0) <= 0;
  const hasDiscount = p.original_price && p.original_price > p.price;
  const discountPercent = hasDiscount ? Math.round(((p.original_price - p.price) / p.original_price) * 100) : 0;

  // Sản phẩm là Freesize nếu có size Freesize hoặc mảng size rỗng
  const isFreesize = (Array.isArray(p.sizes) && p.sizes.some(s => s.label === "Freesize" || s.label === "OneSize"))
    || (!p.sizes || p.sizes.length === 0);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    add({ ...p, selectedSize: "Freesize" }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="item_products_home" style={{ position: 'relative' }}>
      {hasDiscount && (
        <div className="discount-badge">-{discountPercent}%</div>
      )}
      <div className="image_home_item">
        <Link to={`/products/${p._id || p.id}`}>
          <img 
            src={p.image || "/img/products/default.jpg"} 
            alt={p.name || p.product_name} 
            className="image_products_home"
            onError={(e) => { if (e.currentTarget.src !== window.location.origin + "/img/products/default.jpg") { e.currentTarget.src = "/img/products/default.jpg"; } }} 
          />
        </Link>
      </div>
      <h4 className="infProducts_home">{p.name || p.product_name}</h4>
      <div className="price-container" style={{ textAlign: 'center', marginBottom: '10px' }}>
        {hasDiscount ? (
          <>
            <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '10px', fontSize: '0.9em' }}>
              {Number(p.original_price).toLocaleString()}đ
            </span>
            <span style={{ color: '#EE5022', fontWeight: 'bold' }}>
              {Number(p.price || 0).toLocaleString()}đ
            </span>
          </>
        ) : (
          <span className="infProducts_home" style={{ margin: 0 }}>
            {Number(p.price || 0).toLocaleString()}đ
          </span>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        {isOutOfStock ? (
          <button className="btn_add_cart" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            OUT OF STOCK
          </button>
        ) : isFreesize ? (
          <button 
            type="button"
            className="btn_add_cart" 
            onClick={handleQuickAdd}
            style={{ 
              cursor: 'pointer', 
              border: 'none', 
              backgroundColor: added ? '#2e7d32' : '', 
              transition: 'all 0.2s ease',
              width: 'auto',
              minWidth: '130px',
              display: 'inline-block'
            }}
          >
            {added ? "✓ ADDED!" : "+ ADD TO CART"}
          </button>
        ) : (
          <Link to={`/products/${p._id || p.id}`} className="btn_add_cart" style={{ textDecoration: 'none', display: 'inline-block', boxSizing: 'border-box' }}>
            SELECT SIZE
          </Link>
        )}
      </div>
    </div>
  );
}
