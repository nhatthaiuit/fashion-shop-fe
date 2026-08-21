# 🛍️ Fashion Shop E-Commerce - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Admin](https://img.shields.io/badge/React%20Admin-black?style=for-the-badge&logo=react&logoColor=white)

A high-performance Single Page Application (SPA) built with React and Vite, featuring a comprehensive Admin Dashboard.

## 📖 Comprehensive Documentation
For detailed system architecture, UI/UX Wireframes, State Machine Diagrams, and full project descriptions, please visit our **[Notion Workspace](#)** *(Link to be updated soon)*.

## 🌐 Live Application
- **Web UI**: **[https://fashion-shop-frontend-uit.vercel.app](https://fashion-shop-frontend-uit.vercel.app)**
- **Backend API Docs**: **[https://fashion-shop-be-one.vercel.app/docs](https://fashion-shop-be-one.vercel.app/docs)**

### 🔐 Test Accounts (For Recruiters/Testers)
- **Admin**: `newadmin` / `NewAdmin@2024`
- **Customer**: Feel free to register a new account via the `/api/auth/register` API.

## 🚀 Features

- **Robust Admin Dashboard**: Built with `react-admin` to handle high-volume product CRUD operations and order management.
- **Order Filtering & Search**: Advanced table filtering allowing staff to filter orders by exact status (Pending, Shipped) and perform fuzzy searches.
- **Data Export Capability**: Built-in CSV export functionality for both Products and Orders.
- **Responsive E-Commerce UI**: Seamless customer experience for browsing products and checkout flow.


## 📸 Screenshots

<img width="800" height="452" alt="Image" src="https://github.com/user-attachments/assets/a0479a28-4156-4d9d-a2c1-8536270b02fb" />
<img width="800" height="452" alt="Image" src="https://github.com/user-attachments/assets/c21d82eb-48fd-45f9-b005-19376b5ca325" />

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
├── public/          # Static assets (images, banners, logo)
├── src/
│   ├── admin/       # React-Admin Dashboard (Resources, Providers, Layout, Exporters)
│   ├── api/         # Axios client and API utilities
│   ├── assets/      # Component-level static assets
│   ├── components/  # Reusable UI components (Layout, Products, Home)
│   ├── context/     # React Context state (AuthContext, CartContext)
│   ├── pages/       # Customer-facing views (Home, Products, Cart, Checkout, Profile, ThankYou)
│   ├── styles/      # Vanilla CSS stylesheets
│   ├── App.jsx      # Main application router
│   └── main.jsx     # React entry point
```
