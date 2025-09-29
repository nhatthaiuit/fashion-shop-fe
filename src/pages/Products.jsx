import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

// Lấy API base từ ENV (build-time) và loại bỏ dấu "/" cuối để tránh "//api"
const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Products() {
  const [list, setList] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    console.log("VITE_API_URL =", API); // 👉 kiểm tra nhanh ở Console khi chạy trên Vercel
    axios
      .get(`${API}/api/products`)
      .then((res) => setList(res.data))
      .catch((e) => setErr(e));
  }, []);

  if (err) return <div style={{ padding: 20 }}>Lỗi tải sản phẩm: {String(err)}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Sản phẩm mới</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {list.map((p) => <ProductCard key={p._id || p.name} p={p} />)}
      </div>
    </div>
  );
}
