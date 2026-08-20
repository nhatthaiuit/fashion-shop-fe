// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Bottom from "./pages/Bottom";
import Accessories from "./pages/Accessories";
import Sale from "./pages/Sale";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Top from "./pages/Top";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Footer from "./components/layout/Footer";
import SimpleFooter from "./components/layout/SimpleFooter";
import AppAdmin from "./admin/AppAdmin.jsx";

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  // Determine which footer to show
  const isAdminPage = path.startsWith('/admin');
  const showNoFooter = isAdminPage || path === '/checkout';
  const showFullFooter = !showNoFooter;

  return (
    <div className="app_wrapper">
      {!isAdminPage && <Header />}
      <main className="main-content" style={{ paddingTop: isAdminPage ? 0 : undefined }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/bottom" element={<Bottom />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/top" element={<Top />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin/*" element={<AppAdmin />} />

        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
      </main>

      {/* Conditional Footer Rendering */}
      {showFullFooter && <Footer />}
    </div>
  );
}
