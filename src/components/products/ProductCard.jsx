import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";


const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-backend.onrender.com" : "http://localhost:4000")).replace(/\/$/, "");
export default function ProductCard({ p }) {
  
  const isOutOfStock = p.count_in_stock <= 0;
  
  const hasDiscount = p.original_price && p.original_price > p.price;
  const discountPercent = hasDiscount ? Math.round(((p.original_price - p.price) / p.original_price) * 100) : 0;
  
  return (
    <div className="item_products_home" style={{ position: 'relative' }}>
        {hasDiscount && (
            <div className="discount-badge">-{discountPercent}%</div>
        )}
        <div className="image_home_item">
            <Link to={`/products/${p._id || p.id}`}>
                <img 
                    src={p.image || "/img/products/default.jpg"} 
                    alt={p.name} 
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
    
        <div style={{textAlign: 'center', marginTop: '15px'}}>
            <Link to={`/products/${p._id || p.id}`} className="btn_add_cart" style={{ textDecoration: 'none', display: 'inline-block', boxSizing: 'border-box' }}>
                {isOutOfStock ? "OUT OF STOCK" : "SELECT SIZE"}
            </Link>
        </div>
    </div>
  );
}
