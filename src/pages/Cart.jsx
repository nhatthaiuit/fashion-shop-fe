import { useMemo } from "react";

export default function Cart() {
  // Demo: đọc cart từ localStorage (nếu bạn đã thêm logic addToCart)
  const items = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  }, []);

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  return (
    <main className="cart_container">
      <h2 className="section_title">CART</h2>

      {items.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="cart_list">
            {items.map((it, idx) => (
              <div className="cart_item" key={idx}>
                <img
                  src={it.image || "/img/products/products_1.jpg"}
                  alt={it.name}
                  className="cart_item_image"
                />
                <div className="cart_item_info">
                  <div className="cart_item_name">{it.name}</div>
                  <div className="cart_item_price">
                    {(it.price || 0).toLocaleString()}₫ x {it.qty || 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart_summary">
            <div className="cart_total">
              Subtotal: <strong>{subtotal.toLocaleString()}₫</strong>
            </div>
            <button className="btn_primary">Checkout</button>
          </div>
        </>
      )}
    </main>
  );
}
