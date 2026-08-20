// src/pages/Checkout.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Checkout.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function Checkout() {
  const nav = useNavigate();
  const { cart, clear } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | paypal | vnpay

  // Redirect if empty
  useEffect(() => {
    if (!orderPlaced && (!cart || cart.length === 0)) {
      nav("/cart", { replace: true });
    }
  }, [cart?.length, orderPlaced, nav]);


  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + Number(it.price || 0) * Number(it.qty || 1), 0),
    [cart]
  );
  const total = subtotal; // Free shipping

  const { user, token } = useAuth();
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", note: "" });

  useEffect(() => {
    if (token) {
      axios.get(`${API}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const data = res.data;
        setForm(prev => ({
          ...prev,
          fullName: data.full_name || data.user_name || user?.user_name || prev.fullName,
          phone: data.phone_number || prev.phone,
          address: data.address || prev.address
        }));
      })
      .catch(err => console.error("Fetch profile err:", err));
    } else if (user) {
      setForm(prev => ({
        ...prev,
        fullName: user.user_name || prev.fullName,
      }));
    }
  }, [token, user]);
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState("");
  const [touched, setTouched] = useState({});

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr("");
  };
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const validate = () => {
    setTouched({ fullName: true, phone: true, address: true });
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      setErr("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const createOrderPayload = () => ({
    shipping_address: form.address,
    phone: form.phone,
    customer_name: form.fullName,
    items: cart.map((it) => ({ product_id: it._id, quantity: it.qty })),
    payment_method: paymentMethod,
        user_id: user ? user.id : null,
    total_amount: total
  });

  // Handle Standard Submit (COD or VNPay)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setPlacing(true);
      const payload = createOrderPayload();

      if (paymentMethod === 'paypal') {
        payload.payment_result = {
          id: "MOCK_PAYPAL_" + Date.now(),
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          email_address: "mockpayer@paypal.com"
        };
        payload.is_paid = true;
        payload.paid_at = new Date();
      }

      // 1. Create Order
      const res = await axios.post(`${API}/api/orders`, payload);
      const order = res.data;

      // 2. Handle Payment Redirect
      setOrderPlaced(true);
      clear();
      nav(`/thank-you/`, { replace: true, state: { order } });

    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.message || e.message);
    } finally {
      setPlacing(false);
    }
  };



  const isFieldInvalid = (n) => touched[n] && !form[n].trim();

  return (
    <main className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={onChange} onBlur={onBlur} className={`form-input ${isFieldInvalid('fullName') ? 'error' : ''}`} placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input name="phone" value={form.phone} onChange={onChange} onBlur={onBlur} className={`form-input ${isFieldInvalid('phone') ? 'error' : ''}`} placeholder="Phone" />
              </div>
              <div className="form-group">
                <label className="form-label">Address *</label>
                <input name="address" value={form.address} onChange={onChange} onBlur={onBlur} className={`form-input ${isFieldInvalid('address') ? 'error' : ''}`} placeholder="Address" />
              </div>
              <div className="form-group">
                <label className="form-label">Note</label>
                <textarea name="note" value={form.note} onChange={onChange} className="form-textarea" placeholder="Note" />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" name="pay" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span>💵 Cash on Delivery (COD)</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                  <input type="radio" name="pay" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                  <span>💳 PayPal (Visa/Master)</span>
                </label>
              </div>
            </div>

            {err && <div className="error-message">⚠️ {err}</div>}

            <button type="submit" disabled={placing} className="submit-button">
              {placing ? "Processing..." : `Place Order (${paymentMethod.toUpperCase()})`}
            </button>
          </form>
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map(it => (
              <div key={it._id} className="order-item">
                <img src={it.image} alt={it.name} className="order-item-image" />
                <div className="order-item-details">
                  <div className="order-item-name">{it.name}</div>
                  <div className="order-item-price">{Number(it.price).toLocaleString()}đ x {it.qty}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="order-totals">
            <div className="order-total-row total">
              <span className="label">Total</span>
              <span className="amount">{total.toLocaleString()}đ</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
