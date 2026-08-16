import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  const isOutOfStock = p.count_in_stock <= 0;
  
  return (
    <div className="item_products_home">
        <div className="image_home_item">
            <Link to={`/products/${p._id || p.id}`}>
                <img 
                    src={p.image || "/img/products/default.jpg"} 
                    alt={p.name} 
                    className="image_products_home"
                    onError={(e) => (e.currentTarget.src = "/img/products/default.jpg")} 
                />
            </Link>
        </div>
        <h4 className="infProducts_home">{p.name || p.product_name}</h4>
        <p className="infProducts_home">{Number(p.price || 0).toLocaleString()} VND</p>
    </div>
  );
}
