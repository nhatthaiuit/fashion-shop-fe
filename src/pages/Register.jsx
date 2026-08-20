import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-backend.onrender.com" : "http://localhost:4000")).replace(/\/$/, "");

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
    address: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/api/auth/register`, formData);
      const { token, user } = res.data;
      
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join UIT Store for an exclusive experience</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Username</label>
            <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
          </div>
          <div className="auth-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="auth-group">
            <label>Full Name (Optional)</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          </div>
          <div className="auth-group">
            <label>Phone Number (Optional)</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </div>
          
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </main>
  );
}
