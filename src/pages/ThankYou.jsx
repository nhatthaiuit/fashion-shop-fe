import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ThankYou() {
  const location = useLocation();
  const { user } = useAuth();
  
  const order = location.state?.order;
  const orderId = order?._id || order?.id;
  const shortOrderId = orderId ? orderId.substring(orderId.length - 8).toUpperCase() : "";
  const isBankTransfer = order?.payment_method === "bank_transfer";

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px"
      }}
    >
      <div style={{
        background: "#fff",
        padding: "50px 40px",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        maxWidth: "600px",
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: isBankTransfer ? "#0284c7" : "#EE5022",
          color: "#fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          margin: "0 auto 24px auto",
          boxShadow: isBankTransfer ? "0 8px 20px rgba(2, 132, 199, 0.3)" : "0 8px 20px rgba(238, 80, 34, 0.3)"
        }}>
          <i className="fa-solid fa-check"></i>
        </div>
        
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#111" }}>Thank You For Your Order!</h2>
        
        {shortOrderId && (
          <p style={{ fontSize: "1.1rem", color: "#555", fontWeight: "600", marginBottom: "1rem" }}>
            Order ID: #{shortOrderId}
          </p>
        )}

        <div style={{ margin: "16px 0 24px 0", display: "inline-block", padding: "8px 16px", borderRadius: "20px", background: isBankTransfer ? "#e0f2fe" : "#fef3c7", color: isBankTransfer ? "#0369a1" : "#92400e", fontWeight: "bold", fontSize: "14px" }}>
          {isBankTransfer ? "⚡ ĐÃ THANH TOÁN (PROCESSING) - ĐANG CHUẨN BỊ HÀNG" : "💵 COD (PENDING) - CHỜ GỌI XÁC NHẬN"}
        </div>
        
        <p style={{ fontSize: "1.05rem", color: "#666", lineHeight: "1.6", marginBottom: "2rem" }}>
          {isBankTransfer ? (
            "Cảm ơn bạn! Đơn hàng đã được thanh toán thành công qua chuyển khoản ngân hàng. Đơn hàng đã được duyệt và chuyển sang bộ phận kho để đóng gói ngay."
          ) : (
            "Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận. Nhân viên chăm sóc khách hàng của shop sẽ sớm liên hệ qua số điện thoại để xác nhận đơn hàng trước khi gửi đi."
          )}
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/products"
            style={{
              padding: "14px 28px",
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#111'}
          >
            Continue Shopping
          </Link>
          
          {user && (
            <Link
              to="/profile?tab=orders"
              style={{
                padding: "14px 28px",
                backgroundColor: "#fff",
                border: "2px solid #111",
                color: "#111",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#111';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#111';
              }}
            >
              View Order History
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
