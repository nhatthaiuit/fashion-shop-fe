// src/pages/Checkout.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Checkout() {
  const nav = useNavigate();
  const { cart, clear } = useCart();

  // 🔑 Cờ đánh dấu đã đặt hàng để không bị effect đẩy về /cart sau khi clear()
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Chặn người vào thẳng /checkout khi giỏ trống (nhưng KHÔNG áp dụng sau khi vừa đặt hàng)
  useEffect(() => {
    if (!orderPlaced && (!cart || cart.length === 0)) {
      nav("/cart", { replace: true });
    }
  }, [cart?.length, orderPlaced, nav]);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + Number(it.price || 0) * Number(it.qty || 1), 0),
    [cart]
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const [form, setForm] = useState({ full_name: "", phone: "", address: "", note: "" });
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.full_name.trim() || !form.phone.trim() || !form.address.trim()) {
      setErr("Vui lòng điền Họ tên, SĐT và Địa chỉ.");
      return;
    }
    if (!cart.length) {
      setErr("Giỏ hàng trống.");
      return;
    }

    try {
      setPlacing(true);

      const payload = {
        shipping_address: form.address,
        items: cart.map((it) => ({ product: it._id, qty: it.qty })), // gửi _id thật
      };

      const res = await axios.post(`${API}/api/orders`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res?.data || {};
      const oid = data?._id || data?.order?._id || data?.id || "success";

      // 🔑 Đặt cờ trước khi clear để effect không redirect về /cart
      setOrderPlaced(true);
      clear();

      // Điều hướng tới trang cảm ơn
      nav(`/thank-you/`, { replace: true, state: { order: data } });
    } catch (e) {
      console.error("Checkout error:", e);
      setErr(e?.response?.data?.message || e.message || "Lỗi kết nối server");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2>Thanh toán</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <form onSubmit={handleSubmit}>
          <h3>Thông tin nhận hàng</h3>
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <input name="full_name" placeholder="Họ và tên" value={form.full_name} onChange={onChange} />
            <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={onChange} />
            <input name="address" placeholder="Địa chỉ" value={form.address} onChange={onChange} />
            <textarea name="note" placeholder="Ghi chú (không bắt buộc)" rows={3} value={form.note} onChange={onChange} />
          </div>
          {err && <div style={{ color: "crimson", marginTop: 8 }}>{err}</div>}

          <button
            type="submit"
            disabled={placing}
            style={{
              marginTop: 14,
              padding: "10px 14px",
              border: 0,
              borderRadius: 8,
              background: "#000",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {placing ? "Đang đặt hàng..." : "Đặt hàng"}
          </button>
        </form>

        <aside style={{ border: "1px solid #eee", borderRadius: 10, padding: 16, height: "fit-content" }}>
          <h3>Đơn hàng</h3>
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            {cart.map((it) => (
              <div key={it._id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <img src={it.image} alt={it.name} width={56} height={56} style={{ objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div>
                    {Number(it.price).toLocaleString()}đ × {it.qty}
                  </div>
                </div>
              </div>
            ))}
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Phí vận chuyển</span>
              <span>{shippingFee.toLocaleString()}đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
              <span>Tổng</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
