# Hệ thống chữ (Typography)

Quy ước về font chữ, thang kích thước, line-height và cấp heading cho **Sophenix**, ưu tiên font hỗ trợ tiếng Việt tốt và dễ đọc.

> Liên quan: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [UI_GUIDELINE.md](UI_GUIDELINE.md)

## 1. Font chữ

Ưu tiên font hiển thị dấu tiếng Việt rõ ràng. Đề xuất **Be Vietnam Pro** (thiết kế cho tiếng Việt) với dự phòng là font hệ thống.

```css
:root {
  --font-base: "Be Vietnam Pro", "Segoe UI", system-ui, Arial, sans-serif;
}
body {
  font-family: var(--font-base);
  font-size: var(--fs-base);
  line-height: var(--lh-base);
  color: var(--color-text);
}
```

Nạp font (đặt trong `<head>` của các file HTML):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&display=swap" rel="stylesheet">
```

> Nếu muốn không phụ thuộc internet (định hướng tương lai): tải file font về `public/fonts/` và dùng `@font-face`.

## 2. Thang kích thước (Type scale)

Dùng đơn vị `rem` (gốc 16px) để chữ co giãn theo thiết lập trình duyệt của người dùng.

| Token | rem | px | Dùng cho |
|-------|-----|----|----|
| `--fs-sm` | 0.875 | 14 | chú thích, nhãn nhỏ |
| `--fs-base` | 1 | 16 | nội dung đoạn văn (mặc định) |
| `--fs-lg` | 1.125 | 18 | đoạn nhấn, mô tả card |
| `--fs-xl` | 1.25 | 20 | tiêu đề phụ (h3) |
| `--fs-2xl` | 1.5 | 24 | tiêu đề mục (h2) |
| `--fs-3xl` | 2 | 32 | tiêu đề trang / hero (h1) |

## 3. Line-height (chiều cao dòng)

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--lh-tight` | 1.25 | tiêu đề (heading) |
| `--lh-base` | 1.6 | đoạn văn (đọc thoải mái, quan trọng với song ngữ Anh–Việt) |

## 4. Cấp heading

```css
h1 { font-size: var(--fs-3xl); line-height: var(--lh-tight); font-weight: 700; margin-block: var(--space-6) var(--space-4); }
h2 { font-size: var(--fs-2xl); line-height: var(--lh-tight); font-weight: 700; margin-block: var(--space-6) var(--space-3); }
h3 { font-size: var(--fs-xl);  line-height: var(--lh-tight); font-weight: 500; margin-block: var(--space-4) var(--space-2); }

p  { font-size: var(--fs-base); line-height: var(--lh-base); margin-block: 0 var(--space-4); }
small, .text-muted { font-size: var(--fs-sm); color: var(--color-text-muted); }
```

### Quy tắc heading

- Mỗi trang chỉ **một `<h1>`** (tiêu đề chính của trang).
- Không nhảy cấp (sau `h2` không nhảy thẳng xuống `h4`).
- Heading dùng để mô tả cấu trúc, không chỉ để cho chữ to.

## 5. Lớp tiện ích chữ

```css
.text-lg      { font-size: var(--fs-lg); }
.text-bold    { font-weight: 700; }
.text-muted   { color: var(--color-text-muted); }
.text-center  { text-align: center; }

/* Cặp song ngữ: câu tiếng Anh nổi bật, nghĩa tiếng Việt nhạt hơn */
.bilingual-en { font-weight: 500; color: var(--color-text); }
.bilingual-vi { color: var(--color-text-muted); font-size: var(--fs-sm); }
```

Ví dụ HTML song ngữ:

```html
<p class="bilingual-en">Good morning!</p>
<p class="bilingual-vi">Chào buổi sáng!</p>
```

## 6. Checklist typography

- [ ] Font có dấu tiếng Việt đầy đủ, không bị "vỡ" dấu.
- [ ] Nội dung đoạn văn tối thiểu 16px (`--fs-base`).
- [ ] Dùng `rem` cho cỡ chữ, không `px` cứng cho nội dung.
- [ ] Dòng văn bản không quá ~70 ký tự (giới hạn bằng `max-width` của container).
- [ ] Line-height đoạn văn ≥ 1.5 để dễ đọc.
- [ ] Có `display=swap` khi nạp web font để tránh chữ trắng lúc tải.
