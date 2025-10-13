import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "40px 16px"
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎉 Cảm ơn vì đã mua hàng!</h2>
      <p style={{ fontSize: "1.2rem", color: "#333", maxWidth: 600 }}>
        Đơn hàng của bạn sẽ sớm được giao. Chúng tôi sẽ thông báo ngay khi đơn hàng được gửi đi.
      </p>

      <Link
        to="/products"
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600"
        }}
      >
        ⬅ Tiếp tục mua sắm
      </Link>
    </main>
  );
}
