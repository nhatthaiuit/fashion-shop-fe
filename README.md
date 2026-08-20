# 🛍️ Fashion Shop E-Commerce - Frontend Single Page Application (SPA)

![React](https://img.shields.io/badge/React-19.x-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite-6.x-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Admin](https://img.shields.io/badge/React%20Admin-v5.x-black?style=for-the-badge&logo=react&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-v7.x-%23007FFF.svg?style=for-the-badge&logo=mui&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Checkout%20SDK-%2300457C.svg?style=for-the-badge&logo=paypal&logoColor=white)

A high-performance, responsive Single Page Application (SPA) engineered with React 19, Vite, and React-Admin. Featuring a sleek modern storefront for customers and a specialized enterprise-grade Admin Dashboard for store operators.

---

## 🌐 Live Application & API Docs

- **Frontend Web Application**: [https://fashion-shop-frontend-uit.vercel.app](https://fashion-shop-frontend-uit.vercel.app)
- **Backend API Docs (Swagger UI)**: [https://fashion-shop-backend.onrender.com/docs](https://fashion-shop-backend.onrender.com/docs)

### 🔐 Demo Credentials (For Testing & Recruitment)

| Role | Username / Email | Password |
| :--- | :--- | :--- |
| **Admin Portal** | `newadmin` *(or `admin@fashionshop.com`)* | `NewAdmin@2024` *(or `123456`)* |
| **Customer** | Register an account or use any customer login | Custom |

---

## 🚀 Key Features & Architectural Highlights

### 🛒 Customer Storefront
- **Dynamic Catalog & Filtering**: Browse clothing collections by category (`Top`, `Bottom`, `Accessories`, `Sale`), search by keyword, and filter with responsive UI.
- **Interactive Product Detail**: Variant selection (Sizes `S`, `M`, `L`, `XL`), live inventory checks, and dynamic price calculations.
- **Real-Time Cart & Checkout**: Global state management powered by React Context (`CartContext`), preserving cart contents across page reloads.
- **Integrated Payment Gateway**: Seamless payment handling with **PayPal REST SDK** (Sandbox) alongside Cash on Delivery (COD).
- **User Authentication & Profile**: Customer registration, login with persistent JWT session, profile management, and order history tracking.

### ⚙️ Dedicated Enterprise Admin Dashboard
- **Built on React-Admin**: Rapid, scalable internal tooling interface mounted on `/admin` with unified authentication.
- **Product Lifecycle Management**: Create, edit, preview, and delete products, featuring size-variant stock matrix management and Cloudinary image uploads.
- **Order Management & Fulfillment**: Filter orders by status (`pending`, `processing`, `shipped`, `completed`, `cancelled`), view detailed order summaries, and update delivery states.
- **Data Exporting**: Instant CSV data export capabilities for business reporting.

---

## 🛠 Tech Stack

- **Framework**: React.js (v19)
- **Build Tool**: Vite (v6)
- **Routing**: React Router DOM (v7)
- **Admin Framework**: `react-admin` (v5)
- **UI Components & Icons**: Material UI (`@mui/material`, `@emotion/react`), Lucide React
- **HTTP Client**: Axios & Custom Native Fetch Providers
- **Payments**: `@paypal/react-paypal-js`
- **Carousels**: `react-slick`, `slick-carousel`

---

## 💻 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nhatthaiuit/fashion-shop-fe.git
   cd fashion-shop-fe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   Set your backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
fashion-shop-fe/
├── src/
│   ├── admin/           # React-Admin dashboard (AppAdmin, DataProvider, AuthProvider, Resources)
│   ├── api/             # Axios API client instances and endpoint helpers
│   ├── components/      # Reusable UI components (Navbar, Footer, ProductCard, Modals)
│   ├── context/         # Global Context Providers (AuthContext, CartContext)
│   ├── pages/           # Customer pages (Home, Products, ProductDetail, Cart, Checkout, Profile)
│   ├── styles/          # Modular CSS stylesheets
│   ├── utils/           # Formatters, currency converters, validators
│   ├── App.jsx          # Root application routing configuration
│   └── main.jsx         # Application bootstrapping & root DOM mounting
├── public/              # Static assets and images
├── .env.example         # Template environment file
└── package.json
```

---

## 📄 License & Author

Developed by **Nhat Thai** for academic and recruitment portfolio showcase.  
Licensed under the [MIT License](LICENSE).
