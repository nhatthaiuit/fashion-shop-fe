// src/pages/Cart.jsx
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
export default function Cart() {
  const { cart, setQty, remove, clear } = useCart();
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  if (cart.length === 0)
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart 🛍️</p>
      </main>
    );

  return (
    <main style={{ padding: 40, minHeight: "calc(100vh - 300px)" }}>
      <h2>🛒 Shopping Cart</h2>

      {cart.map((it) => (
        <div
          key={it._id}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "12px 0",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          <img src={it.image} alt={it.name} width={80} height={80} style={{ borderRadius: 8 }} />
          <div style={{ flex: 1, marginLeft: 12 }}>
            <div style={{ fontWeight: 600 }}>{it.name}</div>
            <div>{it.price.toLocaleString()}đ</div>
            <input
              type="number"
              min={1}
              value={it.qty}
              onChange={(e) => setQty(it._id, Number(e.target.value))}
              style={{ width: 60, marginTop: 4 }}
            />
          </div>
          <button onClick={() => remove(it._id)}>Remove</button>
        </div>
      ))}

      <hr style={{ margin: "20px 0" }} />
      <h3>Total: {total.toLocaleString()}đ</h3>
      <button onClick={clear}>Clear All</button>
      <Link to="/checkout" style={{ marginLeft: 12, fontWeight: 700 }}>Checkout →</Link>
    </main>
  );
}
