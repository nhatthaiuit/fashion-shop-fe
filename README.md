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

## Quy trình phát triển dự án như sau:

1. Trên máy local

Sau khi đã thêm/sửa code xong → kiểm tra chạy local:

    npm run dev   # FE
    npm run dev   # BE

Nếu ok → commit vào branch "dev" -> Sau khi đã chắc chắn không có lỗi -> merge vào branch "main"

2. Trên GitHub

Vì đã kết nối FE repo với Vercel và BE repo với Render,
mỗi lần push lên branch đang deploy (thường là main),
Vercel/Render sẽ tự động build và deploy lại.

Sau 1–2 phút, refresh link Vercel/Render → sẽ thấy thay đổi ngay.

3. Một số lưu ý

FE (Vercel):

    Chạy npm run build thành công thì mới deploy được.

    Nếu đổi branch deploy, nhớ chọn lại trong Settings của Vercel.

BE (Render):

    Khi push code mới, Render sẽ tự động restart service.

    Nếu BE có thay đổi .env, phải vào Dashboard Render → Environment → Update → Deploy lại.

Cache:

    Đôi khi trình duyệt vẫn giữ CSS/JS cũ → bấm Ctrl + Shift + R (hard refresh).

    Nếu vẫn chưa thấy, vào dashboard Vercel/Render xem log build có lỗi không.

👉 Nói ngắn gọn: commit + push → chờ build → refresh link → thấy ngay thay đổi.