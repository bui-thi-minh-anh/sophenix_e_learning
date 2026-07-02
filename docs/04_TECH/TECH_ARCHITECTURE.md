# Kiến trúc kỹ thuật — Sophenix

> Mô tả kiến trúc của website học tiếng Anh sau khi xây dựng lại trên **Next.js**. Tài liệu này phản ánh **phần nền (foundation)** hiện có: cấu hình dự án, giao diện, layout dùng lại. Phần dữ liệu/bài học và nghiệp vụ là **việc làm tiếp** (xem mục 5).

## 1. Tổng quan stack

| Lớp | Công nghệ | File / Vị trí | Ghi chú |
| --- | --- | --- | --- |
| Framework | **Next.js 14 (App Router)** | `src/app/` | Render server + client component |
| Ngôn ngữ | **TypeScript** | toàn dự án | `tsconfig.json`, alias `@/*` → `src/*` |
| Giao diện | **React 18** | `src/components/`, `src/app/` | Component hóa, dùng lại |
| CSS | **Tailwind CSS 3** | `tailwind.config.ts`, `src/app/globals.css` | Token thiết kế qua biến CSS |
| Thư viện UI | **shadcn/ui** | `src/components/ui/` | `components.json` cấu hình; base color slate |
| Icon | **lucide-react** | dùng trong component | |
| Chế độ tối | **next-themes** | `src/components/theme-provider.tsx` | Chuyển theme bằng class trên `<html>` |
| Font | **Be Vietnam Pro** (`next/font`) | `src/app/layout.tsx` | Hỗ trợ dấu tiếng Việt tốt |

Lệnh chạy (từ `package.json`):

```bash
npm install      # cài dependencies (lần đầu)
npm run dev      # chạy môi trường phát triển → http://localhost:3000
npm run build    # build production
npm start        # chạy bản đã build
npm run lint     # kiểm tra ESLint
```

## 2. Sơ đồ tổ chức (foundation hiện tại)

```
   ┌───────────────────────────────────────────────────────────┐
   │                    src/app/layout.tsx                       │
   │   <html lang="vi"> + font + ThemeProvider (next-themes)     │
   │   └── MainLayout (Header + Sidebar + <main>)                │
   │          └── {children}  ←  từng trang trong src/app/*       │
   └───────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                        ▼
   src/app/page.tsx      src/app/lessons/...      src/app/listening/...
   (Trang chủ)           (Bài giảng)              (Nghe) ...

   Token thiết kế:  src/app/globals.css (biến CSS :root / .dark)
                    ↕ ánh xạ trong tailwind.config.ts
```

- Bố cục dùng chung đặt trong `MainLayout` để mọi trang có cùng Header/Sidebar.
- `Header` và `Sidebar` chia sẻ cấu hình điều hướng tại `src/config/nav.ts`.
- Màu sắc/typography lấy từ token trong `globals.css`, ánh xạ sang Tailwind ở `tailwind.config.ts` → đổi theme chỉ sửa một nơi.

## 3. Định tuyến (routing)

Dùng **App Router** của Next.js: mỗi thư mục trong `src/app/` là một route, file `page.tsx` là nội dung trang.

| Đường dẫn | File | Trạng thái |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Placeholder |
| `/lessons` | `src/app/lessons/page.tsx` | Placeholder |
| `/vocabulary` | `src/app/vocabulary/page.tsx` | Placeholder |
| `/listening` | `src/app/listening/page.tsx` | Placeholder |
| `/speaking` | `src/app/speaking/page.tsx` | Placeholder |
| `/reading` | `src/app/reading/page.tsx` | Placeholder |
| `/writing` | `src/app/writing/page.tsx` | Placeholder |

> Các trang hiện chỉ là **placeholder** (tiêu đề + ghi chú "Đang xây dựng"), chưa có nội dung hay logic.

## 4. Đặc điểm kiến trúc hiện tại

- **Component hóa, dùng lại**: layout, nút, toggle theme tách thành component riêng trong `src/components/`.
- **Một nguồn token thiết kế**: biến CSS trong `globals.css` (sáng/tối) → Tailwind đọc lại → component dùng class tiện ích.
- **Responsive, mobile-first**: Sidebar dạng drawer trên mobile, cố định trên màn lớn (`lg`).
- **Chưa có lớp dữ liệu/nghiệp vụ**: chưa đọc `lessons.json`, chưa có API, chưa chấm điểm.

## 5. Cần làm tiếp (TƯƠNG LAI)

> Phần nền đã xong. Các mục dưới đây **chưa triển khai**.

| Hạng mục | Hiện tại | Định hướng |
| --- | --- | --- |
| Lớp dữ liệu bài học | `src/data/lessons.json` còn nguyên, chưa nối vào UI | Đọc qua Server Component hoặc Route Handler (`src/app/api/...`) |
| Trang danh sách / chi tiết bài | Placeholder | Render từ dữ liệu lessons |
| Bài tập 4 kỹ năng | Chưa có | Listening/Speaking/Reading/Writing + Web Speech API |
| Chấm điểm quiz | Chưa có | Xử lý phía client |
| Lưu tiến độ | Chưa có | `localStorage` trước, sau đó backend + DB khi có đăng nhập |
| Kiểm thử tự động | Chưa có | Unit test component + e2e (xem [../05_QA/QA_STRATEGY.md](../05_QA/QA_STRATEGY.md)) |

## Liên kết liên quan

- Cấu trúc thư mục: [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)
- Schema dữ liệu: [DATA_STRUCTURE.md](DATA_STRUCTURE.md)
- Quản lý state frontend: [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md)
