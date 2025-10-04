import CategoryPage from "./_CategoryPage.jsx";

export default function Bottom() {
  return (
    <CategoryPage
      title="BOTTOM"
      filter={(p) => ["bottom", "BOTTOM"].includes((p.category || "").toLowerCase())}
    />
  );
}

