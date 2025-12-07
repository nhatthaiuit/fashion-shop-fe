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
  const showNoFooter = path.startsWith('/admin') || path === '/checkout';
  const showSimpleFooter = path === '/cart';
  const showFullFooter = !showNoFooter && !showSimpleFooter;

  return (
    <div className="app_wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/bottom" element={<Bottom />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/top" element={<Top />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin/*" element={<AppAdmin />} />

        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>

      {/* Conditional Footer Rendering */}
      {showFullFooter && <Footer />}
      {showSimpleFooter && <SimpleFooter />}
    </div>
  );
}
