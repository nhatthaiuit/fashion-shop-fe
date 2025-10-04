import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  const id = p._id || p.id;
  const img =
    !p.image || p.image.startsWith("/images/")
      ? "/img/products/fallback.jpg"
      : p.image;

  return (
    <div className="prd">
      <Link to={`/products/${id}`} className="prd__link">
        <div className="prd__thumb">
          <img
            src={img}
            alt={p.name}
            onError={(e) => (e.currentTarget.src = "/img/products/fallback.jpg")}
          />
        </div>
        <div className="prd__meta">
          <h3 className="prd__name">{p.name}</h3>
          <div className="prd__price">
            {typeof p.price === "number" ? p.price.toLocaleString("vi-VN") : p.price || "—"} VND
          </div>
        </div>
      </Link>
      <button className="btn btn--primary prd__btn">Thêm vào giỏ</button>
    </div>
  );
}
