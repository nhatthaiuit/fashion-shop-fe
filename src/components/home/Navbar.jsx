import { Link, NavLink } from "react-router-dom";

/**
 * Navbar giống template: nền đen, tên shop bên trái, các tab ở giữa,
 * icon tài khoản / giỏ hàng / tìm kiếm bên phải.
 * Không dùng thư viện ngoài, CSS đã có trong src/styles/base.template.css.
 */
export default function Navbar() {
  return (
    <header>
      {/* Logo / tên shop */}
      <Link
        to="/"
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: "20px",
          textDecoration: "none",
          letterSpacing: "1px"
        }}
      >
        ACCESS WORKSHOP
      </Link>

      {/* Tabs điều hướng */}
      <ul className="navigate_header">
        <li>
          <NavLink to="/" className="title_header">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/top" className="title_header">TOP</NavLink>
        </li>
        <li>
          <NavLink to="/bottom" className="title_header">BOTTOM</NavLink>
        </li>
        <li>
          <NavLink to="/accessories" className="title_header">ACCESSORIES</NavLink>
        </li>
        <li>
          <NavLink to="/sale" className="title_header">SALE</NavLink>
        </li>
      </ul>

      {/* Nhóm icon công cụ bên phải */}
      <ul className="tools_header">
        <li>
          <span aria-label="Account" className="icon_while" style={{ cursor: 'default' }}>
            {/* User icon - disabled */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
            </svg>
          </span>
        </li>
        <li>
          <Link to="/cart" aria-label="Cart" className="icon_while">
            {/* Bag icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 2h12l2 7H4l2-7zm-2 9h16l-1.5 11h-13L4 11zm6-5v2h4V6a2 2 0 10-4 0z" />
            </svg>
          </Link>
        </li>
        <li className="dropdown_header">
          <button aria-label="Search" className="icon_while" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            {/* Search icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
            </svg>
          </button>
          {/* Ô search hiện khi hover (CSS đã có sẵn) */}
          <ul className="dropdown-content" style={{ background: '#fff' }}>
            <li>
              <form onSubmit={(e) => e.preventDefault()} style={{ padding: '0 16px 12px 16px' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  style={{ width: '220px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </form>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
