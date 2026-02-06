# Premium Store - Website Bán Hàng Tài Khoản Premium

Website bán hàng tài khoản premium với đầy đủ tính năng: đăng ký, đăng nhập, giỏ hàng, thanh toán và quản lý admin.

## 🌐 Demo

Xem website trực tiếp tại: [https://kynv2kqccciq2.ok.kimi.link](https://kynv2kqccciq2.ok.kimi.link)

## ✨ Tính năng chính

### 👤 Ngườidùng
- **Đăng ký/Đăng nhập**: Hệ thống xác thực ngườidùng đầy đủ
- **Khuyến mãi 30%**: Thành viên mới nhận ngay giảm giá 30% cho đơn hàng đầu tiên
- **Giỏ hàng**: Thêm, xóa, cập nhật số lượng sản phẩm
- **Thanh toán**: Liên kết trực tiếp đến Facebook, TikTok, Zalo

### 👑 Admin
- **Tài khoản admin mặc định**:
  - Email: `banducmanh2010@gmail.com`
  - Mật khẩu: `banducmanh1212010`
- **Quản lý sản phẩm**: Thêm, sửa, xóa sản phẩm
- **Quản lý ngườidùng**: Xem danh sách ngườidùng đăng ký
- **Thống kê**: Tổng quan về sản phẩm, ngườidùng, tồn kho

### 📦 Sản phẩm mẫu
- Netflix Premium 4K
- Spotify Premium
- YouTube Premium
- Disney+ Hotstar
- Canva Pro
- Adobe Creative Cloud
- ChatGPT Plus
- Midjourney

### 💬 Liên hệ thanh toán
- **Facebook**: [@ducmanh1212010](https://facebook.com/ducmanh1212010)
- **TikTok**: [@dk_m.1109](https://tiktok.com/@dk_m.1109)
- **Zalo**: [0342370478](https://zalo.me/0342370478)

## 🛠️ Công nghệ sử dụng

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: LocalStorage (cho static hosting)
- **Icons**: Lucide React

## 🚀 Hướng dẫn cài đặt

### Bước 1: Clone repository

```bash
git clone https://github.com/your-username/premium-store.git
cd premium-store
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại: `http://localhost:5173`

### Bước 4: Build production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`

## 📁 Cấu trúc project

```
premium-store/
├── src/
│   ├── components/ui/     # shadcn/ui components
│   ├── sections/          # Các trang chính
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductList.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   └── Admin.tsx
│   ├── hooks/             # Custom hooks
│   │   └── useStorage.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── lib/               # Utilities
│   │   └── utils.ts
│   ├── App.tsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Cấu hình

### Thay đổi thông tin admin

Mở file `src/types/index.ts`:

```typescript
export const ADMIN_EMAIL = 'your-email@gmail.com';
export const ADMIN_PASSWORD = 'your-password';
```

### Thay đổi liên kết liên hệ

Mở file `src/sections/Checkout.tsx` và sửa các link:

```typescript
const contactMethods = [
  {
    id: 'facebook',
    name: 'Facebook',
    link: 'https://facebook.com/your-username',
    // ...
  },
  // ...
];
```

### Thêm sản phẩm mặc định

Mở file `src/hooks/useStorage.ts` và sửa hàm `initializeProducts()`.

## 📝 Lưu ý

- Website sử dụng LocalStorage để lưu trữ dữ liệu, phù hợp cho static hosting (GitHub Pages, Netlify, Vercel)
- Dữ liệu sẽ bị mất nếu xóa cache trình duyệt
- Để production, nên kết nối với backend API và database thực

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ❤️ by Premium Store Team
