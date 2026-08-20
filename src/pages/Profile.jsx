import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default function Profile() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "", phone_number: "", address: "", password: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchOrders();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/profile`);
      setProfile(res.data);
      setFormData({
        full_name: res.data.full_name || "",
        phone_number: res.data.phone_number || "",
        address: res.data.address || "",
        password: ""
      });
      } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders/mine`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/auth/profile`, formData);
      setMsg("Profile updated successfully!");
      fetchProfile();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error updating profile");
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="profile-avatar">
          <i className="fa-solid fa-user"></i>
          <h3>{profile.user_name || user.user_name}</h3>
        </div>
        <nav className="profile-nav">
          <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>My Information</button>
          <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>Order History</button>
          </nav>
      </aside>

      <main className="profile-content">
        {activeTab === "info" && (
          <div>
            <h2>My Information</h2>
            {msg && (
              <div style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                backgroundColor: msg.includes('Error') ? '#f8d7da' : '#d4edda',
                color: msg.includes('Error') ? '#721c24' : '#155724',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 9999,
                fontWeight: 'bold',
                animation: 'slideIn 0.3s ease-out forwards'
              }}>
                <style>{`
                  @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                  }
                `}</style>
                {msg}
              </div>
            )}
            <form className="profile-form" onSubmit={handleUpdate}>
              <div className="profile-form-group">
                <label>Email (Cannot be changed)</label>
                <input type="text" value={profile.email || ""} disabled style={{background: '#f5f5f5'}} />
              </div>
              <div className="profile-form-group">
                <label>Full Name</label>
                <input type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
              </div>
              <div className="profile-form-group">
                <label>Phone Number</label>
                <input type="text" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
              </div>
              <div className="profile-form-group">
                <label>New Password (Optional)</label>
                <input type="password" placeholder="Leave blank to keep current" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              <div className="profile-form-group full-width">
                <label>Shipping Address</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <button type="submit" className="btn-save-profile">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2>Order History</h2>
            {orders.length === 0 ? <p>You haven't placed any orders yet.</p> : (
              <div className="order-list">
                {orders.map(o => (
                  <div key={o._id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{o._id.substring(o._id.length - 8).toUpperCase()}</span>
                      <span className={`order-status status-${o.status}`}>{o.status}</span>
                    </div>
                    <div className="order-items">
                      {o.items.map((it, idx) => (
                        <div key={idx} className="order-item-row">
                          <img src={it.product_id?.image || "/img/products/default.jpg"} alt="product" />
                          <div>
                            <div><strong>{it.product_id?.product_name || it.product_id?.name || 'Unknown Product'}</strong></div>
                            <div style={{fontSize: '12px', color: '#666'}}>Qty: {it.quantity} x {Number(it.unit_price).toLocaleString()}đ</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop: '15px', textAlign: 'right', fontWeight: 'bold'}}>
                      Total: {Number(o.total_amount).toLocaleString()}đ
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        </main>
    </div>
  );
}
