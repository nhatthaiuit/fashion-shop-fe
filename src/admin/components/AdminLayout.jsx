import { Layout, AppBar, UserMenu, Logout } from 'react-admin';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MyUserMenu = () => (
    <UserMenu>
        <Logout />
    </UserMenu>
);

const MyAppBar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    
    const isProducts = location.pathname.startsWith('/admin/products');
    const isOrders = location.pathname.startsWith('/admin/orders');

    return (
        <header className="main-header" style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
            <div className="logo_header" style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                <span 
                    className="logo_Northside" 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => navigate('/admin/products')}
                >
                    UIT Store ADMIN
                </span>
            </div>
            
            <ul className="navigate_header" style={{ margin: 0, padding: 0, flex: 2, display: 'flex', justifyContent: 'center', gap: '50px' }}>
                <li>
                    <span 
                        className="title_header"
                        onClick={() => navigate('/admin/products')} 
                        style={{ 
                            color: isProducts ? '#EE5022' : '#fff', 
                            cursor: 'pointer'
                        }}
                    >
                        PRODUCTS
                    </span>
                </li>
                <li>
                    <span 
                        className="title_header"
                        onClick={() => navigate('/admin/orders')} 
                        style={{ 
                            color: isOrders ? '#EE5022' : '#fff', 
                            cursor: 'pointer'
                        }}
                    >
                        ORDERS
                    </span>
                </li>
            </ul>

            <ul className="tools_header" style={{ margin: 0, padding: 0, alignItems: 'center', listStyle: 'none', flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <li className="user-dropdown-container">
                    <Link to="#">
                        <i className="fa-solid fa-user icon_while" style={{ color: '#fff', fontSize: '22px' }}></i>
                    </Link>
                    <div className="user-dropdown-menu">
                        {user ? (
                            <>
                                <Link to="#" style={{ padding: '10px 15px', color: '#000', textDecoration: 'none', display: 'block', borderBottom: '1px solid #eee' }}>Hi, {user.user_name || 'Admin'}</Link>
                                <button onClick={() => {
                                    logout();
                                    navigate('/login');
                                }} style={{ width: '100%', padding: '10px 15px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '16px' }}>Logout</button>
                            </>
                        ) : (
                            <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '10px 15px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '16px' }}>Login</button>
                        )}
                    </div>
                </li>
            </ul>
            <div id="react-admin-title" style={{ display: 'none' }}></div>
        </header>
    );
};

export const AdminLayout = (props) => {
    const { children } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <MyAppBar />
            <main style={{ flex: 1, padding: '30px', width: '100%', boxSizing: 'border-box' }}>
                {children}
            </main>
        </div>
    );
};
