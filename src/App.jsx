import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <nav style={{padding:12}}>
        <Link to="/" style={{marginRight:12}}>Trang chủ</Link>
        <Link to="/products">Sản phẩm</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </BrowserRouter>
  );
}
