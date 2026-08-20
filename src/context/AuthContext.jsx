import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const AuthCtx = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const expiry = localStorage.getItem("auth_expiry");
      if (expiry && Date.now() > Number(expiry)) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_expiry");
        return null;
      }
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(() => {
    const expiry = localStorage.getItem("auth_expiry");
    if (expiry && Date.now() > Number(expiry)) return null;

    const stored = localStorage.getItem("auth_token");
    if (stored) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
    }
    return stored || null;
  });

  // We can remove the old useEffect since state is initialized synchronously

  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem("auth_token", tokenData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_expiry", Date.now() + 24 * 60 * 60 * 1000); // 24h
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_expiry");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
