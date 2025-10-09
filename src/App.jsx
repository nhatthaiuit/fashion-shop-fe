// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
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
import Footer from "./components/layout/Footer";
export default function App() {
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
      </Routes>
      <Footer />
    </div>
  );
}
