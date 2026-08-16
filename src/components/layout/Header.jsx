import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, it) => sum + it.qty, 0);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return (
      <header>
        <div className="logo_header" style={{ width: '100%', textAlign: 'center' }}>
          <Link to="/" className="logo_Northside">ACCESS WORKSHOP ADMIN</Link>
        </div>
      </header>
    );
  }

  return (
    <header>
        <div className="logo_header">
            <Link to="/" className="logo_Northside">NORTHSIDE CREW</Link>
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
            <li><Link to="/register"><i className="fa-solid fa-user icon_while"></i></Link></li>
            <li>
                <Link to="/cart">
                    <i className="fa-solid fa-briefcase icon_while"></i>
                    {totalQty > 0 && <span style={{color: 'white', marginLeft: '5px', fontSize: '14px', fontWeight: 'bold'}}>{totalQty}</span>}
                </Link>
            </li>
            <li><i className="fa-solid fa-magnifying-glass icon_while"></i></li>
        </ul>
    </header>
  );
}
