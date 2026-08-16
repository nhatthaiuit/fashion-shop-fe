import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
        <div className="logo_footer">
            <img src="/img/icon_logo.png" alt="Logo" className="logo_footerIcon" />
            <p className="title_footer">UIT Shop</p>
        </div>
        <ul className="contact_footer">
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">LIÊN HỆ</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact"><i className="fa-solid fa-location-dot"></i> 110 Trần Phú, Hà Đông, Hà Nội</li>
                        <li className="address_contact"><i className="fa-solid fa-phone"></i> Hotlline: 0968862222</li>
                        <li className="address_contact"><i className="fa-solid fa-envelope"></i> Email: khoaivutien2k3@gmail.com</li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">CHÍNH SÁCH</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact"> <Link to="/cstv">Chính sách thành viên</Link></li>
                        <li className="address_contact"><Link to="/csdt">Chính sách đổi trả</Link></li>
                        <li className="address_contact"><Link to="/csvc">Chính sách vận chuyển</Link></li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">ĐĂNG KÝ NHẬN TIN</p>
                </div>
                <div className="content_contact">
                    <ul>
                        <li className="address_contact">Nhận thông tin sản phẩm mới nhất</li>
                        <li className="address_contact">Thông tin sản phẩm khuyến mại</li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="item_title_contact">
                    <p className="title_contact">KẾT NỐI</p>
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
