import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "/src/styles/detail.template.css";

export default function DetailProduct() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => {
        setData(res.data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <div className="detail_container">Loading...</div>;
  if (status === "error") return <div className="detail_container">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="detail_container">
      <div className="detail_left">
        <img
          src={data.image || "/img/products/products_1.jpg"}
          alt={data.name}
          className="detail_image"
        />
      </div>
      <div className="detail_right">
        <h1 className="detail_title">{data.name}</h1>
        <p className="detail_price">
          {typeof data.price === "number" ? data.price.toLocaleString() : data.price}₫
        </p>
        <button className="btn_primary">
          <i className="fa-solid fa-cart-plus"></i> Add to cart
        </button>
      </div>
    </div>
  );
}
