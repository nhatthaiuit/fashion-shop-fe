import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://fashion-shop-be-one.vercel.app" : "http://localhost:4000")).replace(/\/$/, "");

export default function Login() {
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
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
      const res = await axios.post(`${API}/api/auth/login`, formData);
      const { token, user } = res.data;
      
      login(token, user);
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Email or Username</label>
            <input 
              type="text" 
              name="usernameOrEmail" 
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="auth-link">
          New to UIT Store? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </main>
  );
}
