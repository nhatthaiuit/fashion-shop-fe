import { Link } from "react-router-dom";

export default function CategoryTiles() {
  return (
    <div className="review_home">
        <Link to="/top" className="item_review item_review1" style={{textDecoration: 'none'}}>
            <p className="text_itemReview">TOP</p>
        </Link>
        <Link to="/bottom" className="item_review item_review2" style={{textDecoration: 'none'}}>
            <p className="text_itemReview">BOTTOM</p>
        </Link>
        <Link to="/accessories" className="item_review item_review3" style={{textDecoration: 'none'}}>
            <p className="text_itemReview">ACCESSORIES</p>
        </Link>
    </div>
  );
}
