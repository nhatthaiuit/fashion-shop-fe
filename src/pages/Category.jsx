// src/pages/Category.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function Category({ title, category }) {
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

  if (loading) return <div className="loading">Loading products...</div>;
  if (err) return <div className="error">Error: {err}</div>;

  return (
    <main>
      <h1 className="title_home_product">{title}</h1>

      <div className="products_home" style={{ justifyContent: 'flex-start', gap: '2%', rowGap: '30px' }}>
        {list.length === 0 ? (
          <p style={{textAlign: 'center', width: '100%'}}>No products found in this category.</p>
        ) : (
          list.map((p) => (
            <div key={p._id} className="item_products_home" style={{width: '23%', minWidth: '300px', margin: '0 1%'}}>
              <div className="image_home_item">
                  <Link to={`/products/${p._id}`}>
                      <img src={p.image || "/img/products/default.jpg"} alt={p.name} className="image_products_home" />
                  </Link>
              </div>
              <h4 className="infProducts_home">{p.product_name || p.name}</h4>
              <p className="infProducts_home">{Number(p.price || 0).toLocaleString()} VND</p>
              <div style={{textAlign: 'center', marginTop: '15px'}}>
                  <button onClick={() => add(p, 1)} style={{cursor: 'pointer', background: 'transparent', border: 'none', fontWeight: 'bold', fontSize: '14px', color: '#000'}}>
                    + ADD TO CART
                  </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
