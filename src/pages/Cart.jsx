// src/pages/Cart.jsx
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, setQty, remove, clear } = useCart();
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  // Handle quantity increment
  const incrementQty = (id, currentQty) => {
    setQty(id, currentQty + 1);
  };

  // Handle quantity decrement
  const decrementQty = (id, currentQty) => {
    if (currentQty > 1) {
      setQty(id, currentQty - 1);
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <main className="cart-container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link to="/products" className="cart-empty-btn">
            Start Shopping
          </Link>
        </div>
      </main>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <main className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="cart-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
      </div>

      {/* Cart Content Grid */}
      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => {
            const subtotal = item.price * item.qty;
            return (
              <div key={item.cartItemId || item._id} className="cart-item">
                {/* Product Image */}
                <Link to={`/products/${item._id}`} style={{ display: 'block' }}>
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                </Link>

                {/* Product Details */}
                <div className="cart-item-details">
                  <Link to={`/products/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="cart-item-name">{item.product_name}</h3>
                  </Link>
                  {item.selectedSize && <p className="cart-item-size" style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>Size: <strong>{item.selectedSize}</strong></p>}
                  <p className="cart-item-price">{item.price.toLocaleString()}đ</p>
                  <p className="cart-item-subtotal">
                    Subtotal: {subtotal.toLocaleString()}đ
                  </p>

                  {/* Quantity Controls */}
                  <div className="cart-item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => decrementQty(item.cartItemId || item._id, item.qty)}
                      disabled={item.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQty(item.cartItemId || item._id, Math.max(1, value));
                      }}
                      className="qty-input"
                      aria-label="Quantity"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => incrementQty(item.cartItemId || item._id, item.qty)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="cart-item-actions">
                  <button
                    className="remove-btn"
                    onClick={() => remove(item.cartItemId || item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
            <span className="amount">{total.toLocaleString()}đ</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="amount">Free</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="amount">{total.toLocaleString()}đ</span>
          </div>

          {/* Action Buttons */}
          <div className="cart-actions">
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <button className="clear-btn" onClick={clear}>
              Clear Cart
            </button>
          </div>

          <div className="continue-shopping">
            <Link to="/products">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
