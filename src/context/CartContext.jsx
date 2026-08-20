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
      const cartItemId = product._id + (product.selectedSize ? '-' + product.selectedSize : '');
      const i = next.findIndex(x => (x.cartItemId || x._id) === cartItemId);
      if (i >= 0) next[i].qty += qty;
      else next.push({ ...product, qty, cartItemId });
      return next;
    });
  };

  const remove = (cartItemId) => setCart(c => c.filter(x => (x.cartItemId || x._id) !== cartItemId));
  const setQty  = (cartItemId, qty) => setCart(c => c.map(x => (x.cartItemId || x._id) === cartItemId ? { ...x, qty: Math.max(1, Number(qty) || 1) } : x));
  const clear   = () => setCart([]);

  const value = useMemo(() => ({ cart, add, remove, setQty, clear }), [cart]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
