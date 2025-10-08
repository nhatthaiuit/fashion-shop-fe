import { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <main className="home">
      <HeroBanner />
      <CategoryTiles />

      <section className="section container">
        <h2 className="section__title">SHOP NOW</h2>
        <div className="grid">
          {list.slice(0, 8).map((p) => (
            <ProductCard key={p._id || p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
