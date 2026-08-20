import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
        <div className="logo_footer">
            <img src="/img/icon_logo.png" alt="Logo" className="logo_footerIcon" />
            <p className="title_footer">UIT Store</p>
        </div>
        <ul className="contact_footer">
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">CONTACT US</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact"><i className="fa-solid fa-location-dot"></i> Quarter 6, Linh Trung Ward, Thu Duc City, HCMC</li>
                        <li className="address_contact"><i className="fa-solid fa-phone"></i> Hotline: 0388874855</li>
                        <li className="address_contact"><i className="fa-solid fa-envelope"></i> Email: nhatthaidx@gmail.com</li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">POLICIES</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact"> <Link to="/cstv">Membership Policy</Link></li>
                        <li className="address_contact"><Link to="/csdt">Return Policy</Link></li>
                        <li className="address_contact"><Link to="/csvc">Shipping Policy</Link></li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">NEWSLETTER</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact">Get the latest product updates</li>
                        <li className="address_contact">Special offers & promotions</li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">FOLLOW US</p>
                </div>
                <div className="content_contact">
                    <ul style={{display: 'flex', gap: '20px'}}>
                        <li className="address_contact"><i className="fa-brands fa-facebook"></i> </li>
                        <li className="address_contact"><i className="fa-brands fa-instagram"></i> </li>
                    </ul>
                </div>
            </li>
        </ul>
    </footer>
  );
}
