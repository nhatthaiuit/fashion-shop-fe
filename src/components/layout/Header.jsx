import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalQty = cart.length;
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  if (isAdminPage) {
    return (
      <header className="main-header">
        <div className="logo_header" style={{ width: '100%', textAlign: 'center' }}>
          <Link to="/" className="logo_Northside">UIT Store ADMIN</Link>
        </div>
      </header>
    );
  }

  return (
    <header className="main-header">
        <div className="logo_header">
            <Link to="/" className="logo_Northside">UIT Store</Link>
        </div>
        <ul className="navigate_header">
            <li><Link to="/" className="title_header">HOME</Link></li>
            <li className="dropdown_header"> 
                <Link to="/top" className="title_header">TOP</Link> 
            </li>
            <li><Link to="/bottom" className="title_header">BOTTOM</Link></li>
            <li><Link to="/accessories" className="title_header">ACCESSORIES</Link></li>
            <li><Link to="/sale" className="title_header">SALE</Link></li>
        </ul>

        <ul className="tools_header">
            <li className="user-dropdown-container">
                <Link to={user ? "#" : "/login"}>
                    <i className="fa-solid fa-user icon_while"></i>
                </Link>
                <div className="user-dropdown-menu">
                    {user ? (
                        <>
                            <Link to="#">Hi, {user.user_name}</Link>
                            <Link to="/profile">My Profile</Link>
                            {user.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </li>
            
            <li>
                <Link to="/cart">
                    <i className="fa-solid fa-briefcase icon_while"></i>
                    {totalQty > 0 && <span style={{color: 'white', marginLeft: '5px', fontSize: '14px', fontWeight: 'bold'}}>{totalQty}</span>}
                </Link>
            </li>
            <li style={{ position: 'relative' }}>
                <i 
                  className="fa-solid fa-magnifying-glass icon_while" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowSearch(!showSearch)}
                ></i>
                {showSearch && (
                  <form 
                    onSubmit={handleSearch} 
                    style={{
                      position: 'absolute',
                      top: '150%',
                      right: 0,
                      backgroundColor: 'white',
                      padding: '10px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      display: 'flex',
                      gap: '8px',
                      zIndex: 1000
                    }}
                  >
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        outline: 'none',
                        color: '#000',
                        minWidth: '200px'
                      }}
                    />
                    <button 
                      type="submit"
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </form>
                )}
            </li>
        </ul>
    </header>
  );
}
