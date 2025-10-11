// src/pages/ThankYou.jsx
import { useLocation, useParams, Link } from "react-router-dom";

export default function ThankYou() {
  const { id } = useParams();
  const { state } = useLocation(); // có thể chứa order từ navigate()
  const order = state?.order;

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h2>🎉 Đặt hàng thành công!</h2>
      <p>Mã đơn của bạn: <strong>{id}</strong></p>

      {order && (
        <div style={{ marginTop: 16 }}>
          <div>Tổng tiền: <strong>{Number(order.total || 0).toLocaleString()}đ</strong></div>
          <div>Người nhận: <strong>{order?.customer?.full_name}</strong></div>
          <div>Điện thoại: <strong>{order?.customer?.phone}</strong></div>
          <div>Địa chỉ: <strong>{order?.customer?.address}</strong></div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Link to="/products" style={{ textDecoration: "none", fontWeight: 700 }}>⬅ Tiếp tục mua hàng</Link>
      </div>
    </main>
  );
}
