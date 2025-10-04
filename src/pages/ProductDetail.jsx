// src/pages/ProductDetail.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => {
        setData(res.data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <div style={{ padding: 20 }}>Loading...</div>;
  if (status === "error") return <div style={{ padding: 20 }}>Không tìm thấy sản phẩm.</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 20 }}>
      <img
        src={data.image || "/img/products/products_1.jpg"}
        alt={data.name}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <div>
        <h1>{data.name}</h1>
        <p style={{ opacity: 0.8 }}>{data.category}</p>
        <h2>{typeof data.price === "number" ? data.price.toLocaleString() : data.price}₫</h2>
        <button style={{ marginTop: 12 }}>Add to cart</button>
      </div>
    </div>
  );
}
