import CategoryPage from "./_CategoryPage.jsx";

export default function Accessories() {
  return (
    <CategoryPage
      title="ACCESSORIES"
      filter={(p) => ["accessories", "phukien", "accessory"].includes((p.category || "").toLowerCase())}
    />
  );
}
