// src/components/layout/SimpleFooter.jsx
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

export default function SimpleFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer footer--simple">
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
