import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import HeroBanner from "../components/home/HeroBanner";
import CategoryTiles from "../components/home/CategoryTiles";
import ProductCard from "../components/products/ProductCard";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((r) => setList(Array.isArray(r.data) ? r.data : []))
      .catch(() => setList([]));
  }, []);

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 900,
    dots: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const posters = [
    "/img/poster/poster_1.jpg",
    "/img/poster/poster_2.jpg",
    "/img/poster/poster_3.jpg",
    "/img/poster/ảnh4.jpg",
    "/img/poster/ảnh 5.jpg",
    "/img/poster/ảnh 6.jpg",
    "/img/poster/ảnh 7.jpg",
    "/img/poster/ảnh 8.jpg"
  ];

  return (
    <div className="content">
      <HeroBanner />
      <CategoryTiles />
      
      <h1 className="title_home_product">NEW ARRIVAL</h1>
      <div className="products_home">
        {list.slice(0, 12).map((p) => (
          <ProductCard key={p._id || p.id} p={p} />
        ))}
      </div>

      <h1 className="title_home_poster">Poster</h1>
      <div className="slick-carousel-wrapper" style={{width: '90%', margin: '0 auto'}}>
          <Slider {...sliderSettings}>
              {posters.map((src, i) => (
                  <div key={i}>
                      <img src={src} alt={`Poster ${i+1}`} className="image_poster" style={{width: '100%', padding: '5px'}} />
                  </div>
              ))}
          </Slider>
      </div>
      <br/><br/>
    </div>
  );
}
