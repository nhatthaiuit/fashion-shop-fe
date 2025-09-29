# 🛍️ Fashion Shop - Frontend

Frontend cho dự án Fashion Shop (React + Vite).

---

## 🚀 Yêu cầu hệ thống
- [Git] 2.50.1.windows.1
- [Node.js] v22.19.0
- [npm] 10.9.3

---

## ⚙️ Cách chạy (lần đầu)
1. Clone repo   

   git clone https://github.com/nhatthaiuit/fashion-shop-fe.git
   cd fashion-shop-fe

2. Cài dependency

    npm install

3. Tạo file .env từ mẫu

    cp .env.example .env   # Mac/Linux
    copy .env.example .env # Windows

4. Sửa .env nếu BE không chạy ở http://localhost:5000

5. Chạy server

    npm run dev

6. Mở link Vite hiện ra (thường là http://localhost:5173)

---

## ✅ Kiểm tra frontend

Mở http://localhost:5173/products → FE sẽ gọi BE qua VITE_API_URL

Nếu thấy danh sách sản phẩm → setup thành công

## ## 🌍 Environment Variables
- Local dev: VITE_API_URL=http://localhost:5000
- Deploy (Vercel): VITE_API_URL= https://fashion-shop-backend.onrender.com/

## Live URLs
- Web UI: https://fashion-shop-frontend-peach.vercel.app
- API base: https://fashion-shop-backend.onrender.com/
- API Docs (Swagger): https://fashion-shop-backend.onrender.com/docs
