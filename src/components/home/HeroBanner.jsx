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
      {/* Overlay removed because banner image already contains text */}
    </section>
  );
}
