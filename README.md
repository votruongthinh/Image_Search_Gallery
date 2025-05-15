# 🌄 Image Search App

Ứng dụng tìm kiếm hình ảnh sử dụng [Unsplash API](https://unsplash.com/developers), xây dựng với:

- ⚛️ ReactJS
- 📦 Redux Toolkit
- 🎨 Tailwind CSS (responsive)
- 🔐 .env (ẩn API key)
- dùng `fetch` mặc định
- dùng

---

## 🚀 Cách chạy dự án

### 1. Clone source về máy:

```bash
git clone https://github.com/votruongthinh/Image_Search_Gallery.git
cd Image_Search_Gallery
```

### 2: Cài đặt thư viện node_modules

- npm install

### 3 : Cài đặt file .env trong thư mục gốc.

- VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key

Lấy API key tại: https://unsplash.com/developers

### cài đặt icon

npm install react-icons

### 5: Chạy dự án với lệnh

- npm run dev

Ứng dụng sẽ chạy tại: http://localhost:5173

### 6 Cài đặt và chạy test với Vitest

1. Cài các package cần thiết:

npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

2. Tạo file vitest.config.js:

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
test: {
environment: 'jsdom',
globals: true,
setupFiles: './setupTests.js'
},
});

3. Tạo file setupTests.js ở thư mục gốc

import '@testing-library/jest-dom';

4. sử dụng câu lệnh để chạy test

npm run test
