// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = (product, qty = 1) => {
    setCart(cur => {
      const next = [...cur];
      const i = next.findIndex(x => x._id === product._id);
      if (i >= 0) next[i].qty += qty;
      else next.push({ ...product, qty });
      return next;
    });
  };

  const remove = (id) => setCart(c => c.filter(x => x._id !== id));
  const setQty  = (id, qty) => setCart(c => c.map(x => x._id === id ? { ...x, qty: Math.max(1, Number(qty) || 1) } : x));
  const clear   = () => setCart([]);

  const value = useMemo(() => ({ cart, add, remove, setQty, clear }), [cart]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
