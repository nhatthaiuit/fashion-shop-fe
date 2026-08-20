// src/pages/Checkout.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Checkout.css";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-be-one.vercel.app" : "http://localhost:4000")).replace(/\/$/, "");

export default function Checkout() {
  const nav = useNavigate();
  const { cart, clear } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | bank_transfer

  // Redirect if cart is empty
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
      axios
        .get(`${API}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          const data = res.data;
          setForm((prev) => ({
            ...prev,
            fullName: data.full_name || data.user_name || user?.user_name || prev.fullName,
            phone: data.phone_number || prev.phone,
            address: data.address || prev.address
          }));
        })
        .catch((err) => console.error("Fetch profile err:", err));
    } else if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.user_name || prev.fullName
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
    items: cart.map((it) => ({
      product_id: it._id,
      quantity: it.qty,
      size: it.selectedSize || undefined
    })),
    payment_method: paymentMethod,
    user_id: user ? user.id : null,
    total_amount: total
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setPlacing(true);
      const payload = createOrderPayload();

      if (paymentMethod === "bank_transfer") {
        payload.payment_result = {
          id: "VIETQR_" + Date.now(),
          status: "COMPLETED",
          update_time: new Date().toISOString(),
        };
        payload.is_paid = true;
        payload.paid_at = new Date();
        payload.status = "processing";
      } else {
        payload.is_paid = false;
        payload.status = "pending";
      }

      // 1. Create Order
      const res = await axios.post(`${API}/api/orders`, payload);
      const order = res.data;

      // 2. Handle Success
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

  // Dynamic VietQR generator
  const qrTransferInfo = `UIT ${form.phone ? form.phone.replace(/\s+/g, "") : "ORDER"}`;
  const vietQrUrl = `https://img.vietqr.io/image/vcb-0123456789-compact2.png?amount=${total}&addInfo=${encodeURIComponent(qrTransferInfo)}&accountName=UIT%20FASHION%20STORE`;

  return (
    <div className="checkout-page-wrapper">
      <main className="checkout-container">
      {/* Header matching UIT Store & Cart page */}
      <div className="checkout-header">
        <div className="checkout-header-info">
          <h2>Checkout</h2>
          <span className="checkout-subtitle">Complete your order</span>
        </div>
        <span className="checkout-count">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="checkout-content">
        {/* Left: Shipping & Payment Form */}
        <div className="checkout-form-card">
          <h3 className="checkout-card-title">
            <span className="step-badge">1</span> Shipping Information
          </h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-input ${isFieldInvalid("fullName") ? "input-error" : ""}`}
                placeholder="Enter your full name"
              />
              {isFieldInvalid("fullName") && (
                <span className="field-error-msg">Please enter your full name</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-input ${isFieldInvalid("phone") ? "input-error" : ""}`}
                placeholder="Enter phone number"
              />
              {isFieldInvalid("phone") && (
                <span className="field-error-msg">Please enter a valid phone number</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Shipping Address <span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-input ${isFieldInvalid("address") ? "input-error" : ""}`}
                placeholder="House number, street name, ward, district, city"
              />
              {isFieldInvalid("address") && (
                <span className="field-error-msg">Please enter your shipping address</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Order Note (Optional)</label>
              <textarea
                name="note"
                value={form.note}
                onChange={onChange}
                className="form-textarea"
                placeholder="Notes for shipping or special instructions..."
                rows={2}
              />
            </div>

            <div className="payment-method-section">
              <h3 className="checkout-card-title">
                <span className="step-badge">2</span> Payment Method
              </h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="payment-option-text">
                    <span className="payment-option-title">💵 Cash on Delivery (COD)</span>
                    <span className="payment-option-desc">Thanh toán bằng tiền mặt khi nhận hàng (Cần gọi xác nhận)</span>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === "bank_transfer" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />
                  <div className="payment-option-text">
                    <span className="payment-option-title">⚡ Chuyển khoản VietQR (Ngân hàng)</span>
                    <span className="payment-option-desc">Quét mã QR chuyển khoản nhanh 24/7 (Được duyệt đóng gói ngay)</span>
                  </div>
                </label>
              </div>

              {/* VietQR Display Box when Bank Transfer is selected */}
              {paymentMethod === "bank_transfer" && (
                <div className="vietqr-payment-box animate-fade-in" style={{ marginTop: "16px", padding: "20px", background: "#f8fafc", border: "2px dashed #0284c7", borderRadius: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <i className="fa-solid fa-qrcode" style={{ fontSize: "20px", color: "#0284c7" }}></i>
                    <span style={{ fontWeight: "bold", fontSize: "15px", color: "#0f172a" }}>Quét mã VietQR để thanh toán</span>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "#ffffff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <img 
                      src={vietQrUrl} 
                      alt="VietQR Code" 
                      style={{ width: "200px", height: "200px", objectFit: "contain", border: "1px solid #eee", borderRadius: "8px" }}
                    />
                    
                    <div style={{ width: "100%", fontSize: "13px", color: "#334155", background: "#f1f5f9", padding: "12px", borderRadius: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span>Ngân hàng:</span>
                        <strong>Vietcombank (VCB)</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span>Số tài khoản:</span>
                        <strong style={{ color: "#0284c7" }}>0123456789</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span>Chủ tài khoản:</span>
                        <strong>UIT FASHION STORE</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span>Số tiền:</span>
                        <strong style={{ color: "#EE5022", fontSize: "14px" }}>{total.toLocaleString()}đ</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Nội dung CK:</span>
                        <strong style={{ color: "#0f172a" }}>{qrTransferInfo}</strong>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", marginTop: "10px", textAlign: "center" }}>
                    💡 Sử dụng bất kỳ App ngân hàng nào (Vietcombank, MBBank, Techcombank, MoMo...) để quét mã và bấm nút đặt hàng bên dưới.
                  </p>
                </div>
              )}
            </div>

            {err && <div className="checkout-alert-error">⚠️ {err}</div>}

            <button type="submit" disabled={placing} className="checkout-submit-btn">
              {placing ? (
                <span className="spinner-text">Processing Order...</span>
              ) : (
                paymentMethod === "bank_transfer" ? "Xác Nhận Đã Chuyển Khoản & Đặt Hàng" : "Đặt Hàng (Thanh Toán COD)"
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <aside className="checkout-summary-card">
          <h3 className="checkout-card-title">Order Summary</h3>

          <div className="checkout-items-list">
            {cart.map((it) => (
              <div key={it.cartItemId || it._id} className="checkout-item">
                <img
                  src={it.image}
                  alt={it.product_name || it.name}
                  className="checkout-item-img"
                />
                <div className="checkout-item-details">
                  <h4 className="checkout-item-name">{it.product_name || it.name}</h4>
                  {it.selectedSize && (
                    <span className="checkout-item-size">Size: {it.selectedSize}</span>
                  )}
                  <div className="checkout-item-price-row">
                    <span className="unit-price">{Number(it.price).toLocaleString()}đ</span>
                    <span className="unit-qty">× {it.qty}</span>
                  </div>
                </div>
                <div className="checkout-item-subtotal">
                  {(Number(it.price) * Number(it.qty)).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-calc-block">
            <div className="calc-row">
              <span>Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"})</span>
              <span className="amount">{subtotal.toLocaleString()}đ</span>
            </div>
            <div className="calc-row">
              <span>Shipping</span>
              <span className="free-badge">FREE</span>
            </div>
            <div className="calc-row total-row">
              <span>Total Amount</span>
              <span className="total-amount">{total.toLocaleString()}đ</span>
            </div>
          </div>

          <div className="checkout-guarantee">
            <i className="fa-solid fa-shield-halved"></i>
            <span>100% Genuine Guarantee & Instant Support</span>
          </div>

          <div className="checkout-return-cart">
            <Link to="/cart">← Return to Cart</Link>
          </div>
        </aside>
      </div>
      </main>
    </div>
  );
}
