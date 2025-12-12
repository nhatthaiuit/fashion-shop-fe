import { Link } from "react-router-dom";

const tiles = [
  { to: "/top", label: "TOP", img: "/img/home/review_1.jpg" },
  { to: "/bottom", label: "BOTTOM", img: "/img/home/review_2.jpg" },
  { to: "/accessories", label: "ACCESSORIES", img: "/img/home/review_3.jpg" },
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
