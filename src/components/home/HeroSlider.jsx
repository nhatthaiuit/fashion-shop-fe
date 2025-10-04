import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  "/img/Home/baner_web.jpg",
].filter(Boolean);

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true, // ⚠️ để không kéo chiều cao trắng
  };

  // util: nếu ảnh lỗi -> ẩn slide đó để khỏi để lại mảng trắng
  const handleError = (e) => {
    const el = e.currentTarget;
    el.closest(".hero_slide")?.remove(); // bỏ cả slide
  };

  return (
    <div className="hero_slider">
      <Slider {...settings}>
        {slides.map((src, idx) => (
          <div key={idx} className="hero_slide">
            <img
              src={src}
              alt={`banner-${idx}`}
              className="image_slider"
              onError={handleError}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
