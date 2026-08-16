import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="hero">
      <img
        src="/img/home/baner_web.jpg"
        alt="ACCESS WORKSHOP Collection"
        className="hero__img"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <div className="hero__overlay">
        <h1 className="hero__title">NEW COLLECTION</h1>
        <p className="hero__subtitle">Minimal • Everyday • Streetwear</p>
        <Link to="/products" className="hero__cta">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}
