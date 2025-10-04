import CategoryPage from "./_CategoryPage.jsx";

export default function Sale() {
  return (
    <CategoryPage
      title="SALE"
      filter={(p) => p.onSale === true || (p.tags || []).includes("sale")}
    />
  );
}
