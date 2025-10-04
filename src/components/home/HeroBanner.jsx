export default function HeroBanner() {
    return (
      <section className="hero">
        <img
          src="/img/Home/baner_web.jpg"
          alt="NORTHSIDE CREW"
          className="hero__img"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </section>
    );
  }
  