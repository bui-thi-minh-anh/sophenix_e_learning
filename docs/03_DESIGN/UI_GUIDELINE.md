# Nguyên tắc giao diện (UI Guideline)

Tài liệu này mô tả nguyên tắc giao diện tổng quát cho website **Sophenix**: bố cục trang, khoảng cách, responsive và accessibility cơ bản. Mục tiêu là một giao diện đơn giản, thân thiện, dễ đọc cho người Việt mọi lứa tuổi.

> Liên quan: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [COLOR_SYSTEM.md](COLOR_SYSTEM.md) · [TYPOGRAPHY.md](TYPOGRAPHY.md) · [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)

## 1. Triết lý thiết kế

| Nguyên tắc | Ý nghĩa |
|------------|---------|
| Đơn giản trước | Ít yếu tố trên màn hình, mỗi trang một mục tiêu rõ ràng. |
| Dễ đọc | Chữ to, độ tương phản cao, khoảng cách thoáng. |
| Thân thiện | Màu ấm, bo góc mềm, ngôn ngữ tiếng Việt gần gũi. |
| Nhất quán | Cùng một thành phần trông giống nhau ở mọi trang. |
| Ưu tiên mobile | Thiết kế chạy tốt trên điện thoại trước, rồi mở rộng cho màn hình lớn. |

## 2. Bố cục trang (Layout)

Tất cả các trang dùng chung một khung: **Header → Nội dung chính → Footer**.

```
┌─────────────────────────────────────┐
│ Header (logo + điều hướng)           │
├─────────────────────────────────────┤
│                                     │
│   Nội dung chính (container giữa)    │
│                                     │
├─────────────────────────────────────┤
│ Footer (bản quyền, liên kết)         │
└─────────────────────────────────────┘
```

### Container giữa trang

Dùng một lớp `.container` để giới hạn chiều rộng và canh giữa nội dung, tránh dòng chữ quá dài khó đọc.

```css
.container {
  width: 100%;
  max-width: 960px;       /* dòng chữ không quá dài */
  margin-inline: auto;     /* canh giữa */
  padding-inline: var(--space-4); /* lề trái/phải an toàn trên mobile */
}
```

### Bố cục từng trang

| Trang | Bố cục chính |
|-------|--------------|
| `index.html` | Banner giới thiệu (hero) + lưới các mục nổi bật. |
| `lessons.html` | Lưới thẻ bài học (card grid), tự xuống dòng theo màn hình. |
| `lesson.html` | Phần nội dung bài giảng + 4 khối bài tập kỹ năng (Nghe/Nói/Đọc/Viết). |

### Lưới responsive cho danh sách bài học

```css
.lesson-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
```

Cách này tự động xếp nhiều cột trên màn hình lớn và 1 cột trên điện thoại mà không cần media query.

## 3. Khoảng cách (Spacing)

Luôn dùng thang khoảng cách bằng biến CSS (xem [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)), không gõ số px tùy hứng.

| Vị trí | Khoảng cách khuyến nghị |
|--------|-------------------------|
| Lề trong nút | `var(--space-2) var(--space-4)` |
| Giữa các thẻ trong lưới | `var(--space-4)` |
| Giữa các khối lớn (section) | `var(--space-8)` |
| Lề trang trên mobile | `var(--space-4)` |

```css
section + section { margin-top: var(--space-8); }
.card { padding: var(--space-4); }
```

## 4. Responsive (đa thiết bị)

Áp dụng tư duy **mobile-first**: viết CSS cho điện thoại trước, rồi dùng `min-width` để bổ sung cho màn hình lớn.

### Điểm ngắt (breakpoints) khuyến nghị

| Tên | min-width | Thiết bị |
|-----|-----------|----------|
| sm | 480px | điện thoại lớn |
| md | 768px | máy tính bảng |
| lg | 1024px | máy tính để bàn |

```css
/* Mặc định: mobile */
.hero-title { font-size: var(--fs-2xl); }

/* Từ tablet trở lên */
@media (min-width: 768px) {
  .hero-title { font-size: var(--fs-3xl); }
}
```

### Checklist responsive

- [ ] Trang đọc được tốt ở chiều rộng 360px (điện thoại nhỏ).
- [ ] Không có thanh cuộn ngang ngoài ý muốn.
- [ ] Ảnh dùng `max-width: 100%; height: auto;`.
- [ ] Vùng bấm (nút, link) tối thiểu **44×44px** trên mobile.
- [ ] Có thẻ `<meta name="viewport" content="width=device-width, initial-scale=1">` trong `<head>`.

## 5. Accessibility cơ bản (Khả năng tiếp cận)

Giao diện phải dùng được cho người lớn tuổi, người thị lực kém và người dùng bàn phím.

### Checklist

- [ ] Độ tương phản chữ/nền đạt tối thiểu **4.5:1** (xem [COLOR_SYSTEM.md](COLOR_SYSTEM.md)).
- [ ] Mọi ảnh có thuộc tính `alt` mô tả; ảnh trang trí dùng `alt=""`.
- [ ] Dùng đúng thẻ ngữ nghĩa: `<header>`, `<nav>`, `<main>`, `<button>`, `<a>`.
- [ ] Nút thật sự là `<button>`, liên kết là `<a>` (không dùng `<div>` bấm được).
- [ ] Có trạng thái focus thấy rõ khi dùng bàn phím (không xóa `outline` mà không thay thế).
- [ ] Thẻ `<html lang="vi">` để trình đọc màn hình đọc đúng tiếng Việt.

```css
/* Giữ focus thấy rõ cho người dùng bàn phím */
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

## 6. Việc nên / không nên

| Nên | Không nên |
|-----|-----------|
| Dùng biến CSS cho màu, khoảng cách | Gõ mã hex hay px lặp lại khắp file |
| Một hành động chính (primary) mỗi màn hình | Nhiều nút nổi bật cạnh tranh nhau |
| Chữ tối thiểu 16px cho nội dung | Chữ nhỏ hơn 14px cho đoạn văn |
| Khoảng trắng thoáng | Nhồi nhét nội dung sát nhau |
