import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="header__inner">
        {/* Logo trái */}
        <Link to="/" className="header__brand">NORTHSIDE CREW</Link>

        {/* Menu giữa (khoảng cách giống template) */}
        <nav aria-label="main" className="header__navwrap">
          <ul className="header__nav">
            <li><NavLink to="/" className="header__navlink">HOME</NavLink></li>
            <li><NavLink to="/top" className="header__navlink">TOP</NavLink></li>
            <li><NavLink to="/bottom" className="header__navlink">BOTTOM</NavLink></li>
            <li><NavLink to="/accessories" className="header__navlink">ACCESSORIES</NavLink></li>
            <li><NavLink to="/sale" className="header__navlink">SALE</NavLink></li>
          </ul>
        </nav>

        {/* Icon phải (SVG giống kiểu template, không cần lib) */}
        <div className="header__actions">
          {/* user */}
          <Link to="/register" aria-label="Account" className="header__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>

          {/* bag/briefcase */}
          <Link to="/cart" aria-label="Cart" className="header__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 7h12l1 12H5L6 7Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 7a3 3 0 0 1 6 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>

          {/* search */}
          <button aria-label="Search" className="header__icon header__icon--btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" stroke="white" strokeWidth="2"/>
              <path d="M16 16l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
