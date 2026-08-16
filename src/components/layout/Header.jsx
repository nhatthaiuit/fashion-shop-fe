import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

export default function Header() {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, it) => sum + it.qty, 0);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { to: "/products", label: "PRODUCTS" },
    { to: "/top", label: "TOP" },
    { to: "/bottom", label: "BOTTOM" },
    { to: "/accessories", label: "ACCESSORIES" },
    { to: "/sale", label: "SALE" },
  ];

  return (
    <>
      <div className="header">
        <div className={`header__inner ${isAdminPage ? 'header__inner--admin' : ''}`}>
          {/* Logo */}
          <Link to="/" className="header__brand">ACCESS WORKSHOP</Link>

          {/* Desktop Nav */}
          {!isAdminPage && (
            <nav aria-label="main" className="header__navwrap">
              <ul className="header__nav">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} className="header__navlink">{link.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Icons + Hamburger */}
          {!isAdminPage && (
            <div className="header__actions">
              {/* User icon */}
              <span aria-label="Account" className="header__icon" style={{ cursor: 'default' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>

              {/* Cart */}
              <Link to="/cart" aria-label="Cart" className="header__icon">
                {totalQty > 0 && <span className="header__cartcount">{totalQty}</span>}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 7h12l1 12H5L6 7Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 7a3 3 0 0 1 6 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>

              {/* Hamburger (mobile only) */}
              <button
                className="header__hamburger"
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {!isAdminPage && (
        <div className={`header__mobile-nav ${mobileOpen ? 'open' : ''}`}>
          <button className="header__mobile-close" onClick={closeMobile} aria-label="Close menu">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={closeMobile}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/cart" onClick={closeMobile}>
            CART {totalQty > 0 && `(${totalQty})`}
          </Link>
        </div>
      )}
    </>
  );
}
