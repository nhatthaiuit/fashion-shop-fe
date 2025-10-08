import { useCart } from "../context/CartContext.jsx";
export default function Cart() {
  const { cart, setQty, remove, clear } = useCart();
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div style={{ padding: 20 }}>
      <h2>CART</h2>
      {cart.length === 0 ? <p>No product.</p> : (
        <>
          {cart.map((it) => (
            <div key={it._id} style={{ display: "flex", gap: 12, margin: "8px 0" }}>
              <img src={it.image} alt={it.name} width={80} height={80}/>
              <div style={{ flex: 1 }}>
                <div>{it.name}</div>
                <div>{it.price.toLocaleString()}đ</div>
                <input type="number" min={1} value={it.qty} onChange={e => setQty(it._id, Number(e.target.value))}/>
              </div>
              <button onClick={() => remove(it._id)}>Xoá</button>
            </div>
          ))}
          <hr/>
          <h3>Tổng: {total.toLocaleString()}đ</h3>
          <button onClick={clear}>Xoá sạch</button>
        </>
      )}
    </div>
  );
}
