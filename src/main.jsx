import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

/* Import toàn bộ CSS template (giống nhất có thể) */
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
/* Nếu template có nhiều file khác, import thêm ở đây:
   import "/src/styles/cart.template.css";
   import "/src/styles/register.template.css";
*/

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Scoping để hạn chế “đụng” style với phần khác (xem mục 7) */}
      <div className="theme-template">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
