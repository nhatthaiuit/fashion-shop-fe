import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";  // ⬅️ PHẢI import

/* CSS */
import "/src/styles/Base.css";
import "/src/styles/Home.css";
import "/src/styles/ProductDetail.css";
import "/src/styles/CSTV.css";
import "/src/styles/Register.css";
import "/src/styles/Sale.css";
import "/src/styles/Top.css";
import "/src/styles/HomePatch.css";
import "./styles/Footer.css";

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
