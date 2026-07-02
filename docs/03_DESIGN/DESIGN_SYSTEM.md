# Hệ thống thiết kế (Design System)

Tài liệu tổng quan về design system của **Sophenix**: các *token* nền tảng (màu, font, khoảng cách, bo góc, đổ bóng) được định nghĩa bằng **CSS variables** và cách dùng trong CSS thuần.

> Chi tiết theo chủ đề: [COLOR_SYSTEM.md](COLOR_SYSTEM.md) · [TYPOGRAPHY.md](TYPOGRAPHY.md) · [ICONOGRAPHY.md](ICONOGRAPHY.md) · [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)

## 1. Token là gì?

Token là các giá trị thiết kế đặt tên sẵn (ví dụ "màu chính", "khoảng cách 4"). Thay vì viết `#2563eb` rải rác, ta viết `var(--color-primary)`. Khi cần đổi màu thương hiệu, chỉ sửa một chỗ.

Tất cả token khai báo trong `:root` của `public/css/style.css`.

## 2. Khai báo token gốc

Dán khối này vào đầu file `public/css/style.css`:

```css
:root {
  /* ===== MÀU SẮC (xem COLOR_SYSTEM.md) ===== */
  --color-primary:        #2563eb;
  --color-primary-dark:   #1d4ed8;
  --color-secondary:      #f59e0b;
  --color-bg:             #ffffff;
  --color-surface:        #f8fafc;
  --color-text:           #1f2937;
  --color-text-muted:     #6b7280;
  --color-border:         #e5e7eb;
  --color-success:        #16a34a;
  --color-warning:        #d97706;
  --color-error:          #dc2626;
  --color-info:           #0891b2;

  /* ===== TYPOGRAPHY (xem TYPOGRAPHY.md) ===== */
  --font-base: "Be Vietnam Pro", "Segoe UI", system-ui, Arial, sans-serif;
  --fs-sm:   0.875rem;  /* 14px */
  --fs-base: 1rem;      /* 16px */
  --fs-lg:   1.125rem;  /* 18px */
  --fs-xl:   1.25rem;   /* 20px */
  --fs-2xl:  1.5rem;    /* 24px */
  --fs-3xl:  2rem;      /* 32px */
  --lh-tight: 1.25;
  --lh-base:  1.6;

  /* ===== KHOẢNG CÁCH (thang 4px) ===== */
  --space-1: 0.25rem;  /* 4px  */
  --space-2: 0.5rem;   /* 8px  */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */

  /* ===== BO GÓC ===== */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 999px;  /* pill / badge tròn */

  /* ===== ĐỔ BÓNG ===== */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,.08);
  --shadow-lg: 0 10px 24px rgba(0,0,0,.12);
}
```

## 3. Bảng token tóm tắt

### Khoảng cách (spacing)

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--space-1` | 4px | khe rất nhỏ giữa icon và chữ |
| `--space-2` | 8px | lề trong nhỏ |
| `--space-3` | 12px | lề trong vừa |
| `--space-4` | 16px | lề trong card, gap lưới |
| `--space-6` | 24px | giữa các nhóm |
| `--space-8` | 32px | giữa các section |
| `--space-12` | 48px | khối lớn / hero |

### Bo góc (radius)

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--radius-sm` | 4px | input, ô nhỏ |
| `--radius-md` | 8px | nút, card |
| `--radius-lg` | 16px | card lớn, hero box |
| `--radius-full` | 999px | badge, nút tròn |

### Đổ bóng (shadow)

| Token | Dùng cho |
|-------|----------|
| `--shadow-sm` | viền nhẹ cho card tĩnh |
| `--shadow-md` | card khi hover |
| `--shadow-lg` | modal, dropdown nổi |

## 4. Cách dùng token

```css
.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--fs-base);
}
```

## 5. Chế độ tối (định hướng tương lai)

Vì đã dùng biến CSS, sau này có thể thêm dark mode chỉ bằng cách ghi đè token, không sửa từng component:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:      #0f172a;
    --color-surface: #1e293b;
    --color-text:    #f1f5f9;
    --color-border:  #334155;
  }
}
```

## 6. Checklist khi thêm style mới

- [ ] Dùng `var(--...)` thay vì gõ trực tiếp mã màu/px.
- [ ] Nếu thiếu token, thêm vào `:root` rồi mới dùng.
- [ ] Đặt tên token theo mục đích (`--color-error`), không theo hình thức (`--red`).
- [ ] Kiểm tra component vẫn hợp lệ khi đổi giá trị token.
