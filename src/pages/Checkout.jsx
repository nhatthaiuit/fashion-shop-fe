// src/pages/Checkout.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/Checkout.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Checkout() {
  const nav = useNavigate();
  const { cart, clear } = useCart();

  // Flag to prevent redirect after order placement
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect to cart if empty (but not after order placement)
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

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: ""
  });
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState("");
  const [touched, setTouched] = useState({});

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr(""); // Clear error when user types
  };

  const onBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // Mark all fields as touched
    setTouched({ fullName: true, phone: true, address: true });

    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      setErr("Please fill in all required fields (Full Name, Phone, and Address).");
      return;
    }
    if (!cart.length) {
      setErr("Cart is empty.");
      return;
    }

    try {
      setPlacing(true);

      const payload = {
        shipping_address: form.address,
        phone: form.phone,
        customer_name: form.fullName,
        items: cart.map((it) => ({ product: it._id, qty: it.qty })),
      };

      const res = await axios.post(`${API}/api/orders`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res?.data || {};

      // Set flag before clearing cart
      setOrderPlaced(true);
      clear();

      // Navigate to thank you page
      nav(`/thank-you/`, { replace: true, state: { order: data } });
    } catch (e) {
      console.error("Checkout error:", e);
      setErr(e?.response?.data?.message || e.message || "Server connection error");
    } finally {
      setPlacing(false);
    }
  };

  // Field validation helpers
  const isFieldInvalid = (fieldName) => {
    return touched[fieldName] && !form[fieldName].trim();
  };

  return (
    <main className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order by filling in your shipping information</p>
      </div>

      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className="progress-step completed">
          <div className="progress-step-number">✓</div>
          <span className="progress-step-label">Cart</span>
        </div>
        <div className="progress-divider"></div>
        <div className="progress-step active">
          <div className="progress-step-number">2</div>
          <span className="progress-step-label">Shipping</span>
        </div>
        <div className="progress-divider"></div>
        <div className="progress-step">
          <div className="progress-step-number">3</div>
          <span className="progress-step-label">Confirmation</span>
        </div>
      </div>

      {/* Checkout Content Grid */}
      <div className="checkout-content">
        {/* Checkout Form */}
        <div className="checkout-form">
          <h2>
            <span>📦</span>
            Shipping Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                  <span className="required">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`form-input ${isFieldInvalid('fullName') ? 'error' : ''}`}
                />
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                  <span className="required">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`form-input ${isFieldInvalid('phone') ? 'error' : ''}`}
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Shipping Address
                  <span className="required">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your shipping address"
                  value={form.address}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`form-input ${isFieldInvalid('address') ? 'error' : ''}`}
                />
              </div>

              {/* Note */}
              <div className="form-group">
                <label htmlFor="note" className="form-label">
                  Order Notes (Optional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  placeholder="Any special instructions for your order?"
                  value={form.note}
                  onChange={onChange}
                  className="form-textarea"
                />
                <p className="form-helper">
                  Add any special delivery instructions or notes
                </p>
              </div>
            </div>

            {/* Error Message */}
            {err && (
              <div className="error-message">
                <span className="error-message-icon">⚠️</span>
                <span className="error-message-text">{err}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={placing}
              className="submit-button"
            >
              {placing ? (
                <>
                  <div className="submit-button-spinner"></div>
                  Processing Order...
                </>
              ) : (
                <>
                  <span>🛍️</span>
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          {/* Order Items */}
          <div className="order-items">
            {cart.map((item) => (
              <div key={item._id} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-price">
                    {Number(item.price).toLocaleString()}đ
                  </div>
                  <div className="order-item-quantity">
                    Quantity: {item.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="order-totals">
            <div className="order-total-row">
              <span className="label">Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
              <span className="amount">{subtotal.toLocaleString()}đ</span>
            </div>

            <div className="order-total-row">
              <span className="label">Shipping Fee</span>
              <span className="amount">Free</span>
            </div>

            <div className="order-total-row total">
              <span className="label">Total</span>
              <span className="amount">{total.toLocaleString()}đ</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="security-badge">
            <span className="security-badge-icon">🔒</span>
            <p className="security-badge-text">
              Your payment information is secure. We use industry-standard encryption to protect your data.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
