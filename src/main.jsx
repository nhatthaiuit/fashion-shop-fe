import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";  // ⬅️ PHẢI import

/* CSS */
import "/src/styles/base.template.css";
import "/src/styles/home.template.css";
import "/src/styles/detail.template.css";
import "/src/styles/accesPay.css";
import "/src/styles/cart.template.css";
import "/src/styles/CSTV.css";
import "/src/styles/PayCart.css";
import "/src/styles/Register.css";
import "/src/styles/Sale.css";
import "/src/styles/Top.css";
import "/src/styles/slider.fix.css";
import "/src/styles/home.patch.css";
import "./styles/footer.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/* Scoping để hạn chế “đụng” style */}
        <div className="theme-template">
          <App />
        </div>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
