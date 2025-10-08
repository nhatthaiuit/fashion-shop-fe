import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/api";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let stop = false;
    getProductById(id)
      .then((res) => !stop && setData(res.data))
      .catch((e) => !stop && setErr(e?.response?.data?.message || e.message));
    return () => { stop = true; };
  }, [id]);

  if (err) return <div style={{ padding: 20, color:"crimson" }}>Lỗi: {String(err)}</div>;
  if (!data) return <div style={{ padding: 20 }}>Đang tải…</div>;

  return (
    <div style={{ padding: 20 }}>
      <img src={data.image} alt={data.name} style={{ width: 360, height: 360, objectFit:"cover" }}/>
      <h2>{data.name}</h2>
      <p>{data.price?.toLocaleString()}đ</p>
      <p>{data.brand} • {data.category}</p>
      <p>{data.description}</p>
      <button onClick={() => add(data, 1)} style={{ marginTop: 12 }}>
        Thêm vào giỏ
      </button>
    </div>
  );
}
