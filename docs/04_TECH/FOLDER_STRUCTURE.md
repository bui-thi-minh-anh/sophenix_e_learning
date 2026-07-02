# Cấu trúc thư mục — Sophenix

> Cây thư mục thật của dự án (Next.js) kèm giải thích vai trò từng phần. Phản ánh **phần nền** hiện có.

## Cây thư mục

```
.
├── package.json                  # Scripts (dev/build/start/lint) + dependencies
├── next.config.mjs               # Cấu hình Next.js
├── tsconfig.json                 # Cấu hình TypeScript + alias @/* → src/*
├── tailwind.config.ts            # Cấu hình Tailwind (ánh xạ token, dark mode)
├── postcss.config.mjs            # PostCSS (tailwindcss + autoprefixer)
├── components.json               # Cấu hình shadcn/ui
├── .eslintrc.json                # ESLint (next/core-web-vitals)
├── CLAUDE.md                     # Hướng dẫn cho Claude Code
│
├── src/
│   ├── app/                      # App Router: route = thư mục, page.tsx = trang
│   │   ├── layout.tsx            # Layout gốc: font, ThemeProvider, MainLayout
│   │   ├── globals.css           # Token thiết kế (biến CSS) + Tailwind directives
│   │   ├── page.tsx              # Trang chủ (placeholder)
│   │   ├── lessons/page.tsx      # Bài giảng (placeholder)
│   │   ├── vocabulary/page.tsx   # Từ vựng (placeholder)
│   │   ├── listening/page.tsx    # Nghe (placeholder)
│   │   ├── speaking/page.tsx     # Nói (placeholder)
│   │   ├── reading/page.tsx      # Đọc (placeholder)
│   │   └── writing/page.tsx      # Viết (placeholder)
│   │
│   ├── components/               # Component React dùng lại
│   │   ├── ui/                   # Component shadcn/ui (button, ...)
│   │   ├── layout/               # Header, Sidebar, MainLayout
│   │   ├── theme-provider.tsx    # Bọc next-themes
│   │   ├── theme-toggle.tsx      # Nút chuyển sáng/tối
│   │   └── page-placeholder.tsx  # Khung trang placeholder dùng chung
│   │
│   ├── config/
│   │   └── nav.ts                # Danh sách mục điều hướng (Header + Sidebar)
│   │
│   ├── lib/
│   │   └── utils.ts              # Hàm cn() gộp class Tailwind
│   │
│   └── data/
│       └── lessons.json          # Nội dung bài giảng (CHƯA nối vào UI — việc làm tiếp)
│
├── public/                       # File tĩnh (ảnh, favicon...) — Next.js phục vụ tại /
│
├── .claude/                      # Cấu hình & mở rộng cho Claude Code
│   ├── settings.json
│   ├── skills/
│   ├── commands/
│   └── docs/
│
└── docs/                         # Tài liệu dự án (00_… đến 08_…)
```

## Vai trò từng thành phần

### Cấu hình gốc

| File | Vai trò |
| --- | --- |
| `package.json` | Khai báo scripts và dependencies (Next, React, Tailwind, shadcn deps). |
| `tsconfig.json` | Bật `strict`, đặt alias `@/*` trỏ vào `src/*`. |
| `tailwind.config.ts` | `darkMode: class`, ánh xạ màu/bo góc/font sang biến CSS. |
| `components.json` | Cấu hình để thêm component shadcn/ui (alias, css, baseColor). |

### `src/app/` — định tuyến & layout

| File | Vai trò |
| --- | --- |
| `layout.tsx` | Khung gốc cho mọi trang: nạp font Be Vietnam Pro, bọc `ThemeProvider`, dựng `MainLayout`. |
| `globals.css` | Khai báo token (`:root` sáng, `.dark` tối) và `@tailwind` directives. |
| `*/page.tsx` | Nội dung từng trang (hiện là placeholder). |

### `src/components/` — giao diện dùng lại

| File | Vai trò |
| --- | --- |
| `ui/button.tsx` | Nút chuẩn shadcn/ui (dùng `cva` + `cn`). |
| `layout/header.tsx` | Thanh đầu trang: nút menu (mobile), logo, toggle theme. |
| `layout/sidebar.tsx` | Điều hướng dọc; drawer trên mobile, cố định trên desktop. |
| `layout/main-layout.tsx` | Ghép Header + Sidebar + `<main>`; giữ trạng thái mở sidebar. |
| `theme-toggle.tsx` | Đổi giữa chế độ sáng/tối. |
| `page-placeholder.tsx` | Khung tiêu đề + ghi chú cho trang chưa có nội dung. |

## Quy tắc đặt vị trí khi mở rộng

- **Thêm trang** → tạo thư mục mới trong `src/app/` kèm `page.tsx`; thêm mục vào `src/config/nav.ts` nếu cần lên menu.
- **Thêm component shadcn/ui** → vào `src/components/ui/`.
- **Thêm component dùng lại khác** → `src/components/`.
- **Đổi màu/typography** → sửa token trong `src/app/globals.css` (không sửa từng component).
- **Thêm/sửa nội dung bài** → `src/data/lessons.json` (khi đã nối lớp dữ liệu).
- **Thêm tài liệu kỹ thuật** → `docs/04_TECH/`.

## Liên kết liên quan

- Kiến trúc tổng thể: [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md)
- Schema dữ liệu: [DATA_STRUCTURE.md](DATA_STRUCTURE.md)
