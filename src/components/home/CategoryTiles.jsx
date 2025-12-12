import { Link } from "react-router-dom";
import review1 from "../../assets/images/home/review_1.jpg";
import review2 from "../../assets/images/home/review_2.jpg";
import review3 from "../../assets/images/home/review_3.jpg";

const tiles = [
  { to: "/top", label: "TOP", img: review1 },
  { to: "/bottom", label: "BOTTOM", img: review2 },
  { to: "/accessories", label: "ACCESSORIES", img: review3 },
];

export default function CategoryTiles() {
  return (
    <section className="cat-tiles container">
      {tiles.map((t) => (
        <Link key={t.label} to={t.to} className="cat-tiles__item">
          <img src={t.img} alt={t.label} className="cat-tiles__img" />
          <span className="cat-tiles__title">{t.label}</span>
        </Link>
      ))}
    </section>
  );
}
