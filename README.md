# 🛍️ Fashion Shop E-Commerce - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Admin](https://img.shields.io/badge/React%20Admin-black?style=for-the-badge&logo=react&logoColor=white)

A high-performance Single Page Application (SPA) built with React and Vite, featuring a comprehensive Admin Dashboard.

## 📖 Comprehensive Documentation
For detailed system architecture, UI/UX Wireframes, State Machine Diagrams, and full project descriptions, please visit our **[Notion Workspace](#)** *(Link to be updated soon)*.

## 🌐 Live Application
- **Web UI**: **[https://fashion-shop-frontend-uit.vercel.app](https://fashion-shop-frontend-uit.vercel.app)**
- **Backend API Docs**: **[https://fashion-shop-backend.onrender.com/docs](https://fashion-shop-backend.onrender.com/docs)**

### 🔐 Test Accounts (For Recruiters/Testers)
- **Admin Panel Access**: `admin@fashionshop.com` / `123456`

## 🚀 Features

- **Robust Admin Dashboard**: Built with `react-admin` to handle high-volume product CRUD operations and order management.
- **Order Filtering & Search**: Advanced table filtering allowing staff to filter orders by exact status (Pending, Shipped) and perform fuzzy searches.
- **Data Export Capability**: Built-in CSV export functionality for both Products and Orders.
- **Responsive E-Commerce UI**: Seamless customer experience for browsing products and checkout flow.

## 🛠 Tech Stack

- **Framework**: React.js (Vite)
- **Dashboard**: React-Admin
- **Styling**: Vanilla CSS / React-Admin Material UI theme
- **Routing**: React Router DOM
- **State Management**: React Context / Hooks

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nhatthaiuit/fashion-shop-fe.git
   cd fashion-shop-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
.
├── src/
│   ├── admin/       # React-Admin Dashboard (Pages, Providers, Custom Components)
│   ├── components/  # Reusable UI components (Navbar, Footer, ProductCard)
│   ├── pages/       # Customer-facing pages (Home, Shop, Cart, Checkout)
│   ├── context/     # Global state management (AuthContext, CartContext)
│   ├── utils/       # Helper functions and formatters
│   └── App.jsx      # Main application routing and entry point
└── public/          # Static assets
```
