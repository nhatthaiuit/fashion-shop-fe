import CategoryPage from "./_CategoryPage.jsx";

export default function Top() {
  return (
    <CategoryPage
      title="TOP"
      filter={(p) => ["top", "TOP"].includes((p.category || "").toLowerCase())}
    />
  );
}
