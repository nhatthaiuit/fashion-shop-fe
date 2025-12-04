// src/components/layout/Footer.jsx
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand / tagline */}
        <div className="footer__col">
          <h3 className="footer__brand">
            <Link to="/">ACCESS WORKSHOP</Link>
          </h3>
          <p className="footer__tagline">
            Minimal • Everyday • Streetwear
          </p>
        </div>

        {/* Navigation */}
        <nav className="footer__col">
          <h4 className="footer__title">Shop</h4>
          <ul className="footer__list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/top">Top</NavLink></li>
            <li><NavLink to="/bottom">Bottom</NavLink></li>
            <li><NavLink to="/accessories">Accessories</NavLink></li>
            <li><NavLink to="/sale">Sale</NavLink></li>
          </ul>
        </nav>

        {/* Support */}
        <div className="footer__col">
          <h4 className="footer__title">Support</h4>
          <ul className="footer__list">
            <li><Link to="/policies/shipping">Shipping</Link></li>
            <li><Link to="/policies/returns">Returns & Exchanges</Link></li>
            <li><Link to="/policies/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__col">
          <h4 className="footer__title">Newsletter</h4>
          <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email"
            />
            <button type="submit">Subscribe</button>
          </form>

          {/* Social icons SVG inline – không cần thư viện */}
          <div className="footer__social">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.9h-2.32v7.03C18.34 21.2 22 17.05 22 12.06z" />
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.8 7.2a1 1 0 11-1.4-1.43 1 1 0 011.4 1.43z" />
              </svg>
            </a>
            <a href="mailto:hi@access-workshop.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.35l-10 6.25L2 6.35V6zm0 3.23l9.37 5.86a1 1 0 001.06 0L22 9.23V18a2 2 0 01-2 2H4a2 2 0 01-2-2V9.23z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} ACCESS WORKSHOP. All rights reserved.</span>
        <div className="footer__bottom-links">
          <Link to="/policies/privacy">Privacy</Link>
          <Link to="/policies/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
