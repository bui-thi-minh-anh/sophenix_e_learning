# Quy ước biểu tượng (Iconography)

Quy ước dùng icon trong **Sophenix**: phong cách, kích thước, dùng emoji/SVG cho 4 kỹ năng và nguồn icon.

> Liên quan: [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

## 1. Phong cách

- Đơn giản, nét tròn mềm, hợp với giao diện thân thiện.
- Một bộ icon nhất quán trên toàn site (không trộn nhiều phong cách).
- Icon hỗ trợ ý nghĩa, **không thay thế** chữ — luôn kèm nhãn cho rõ ràng và accessibility.

## 2. Emoji cho 4 kỹ năng

Dùng emoji cho 4 kỹ năng vì hiển thị tốt mọi nơi, không cần tải thêm file, màu sắc sinh động và thân thiện.

| Kỹ năng | Emoji | Nhãn tiếng Việt |
|---------|-------|-----------------|
| Nghe | 🎧 | Nghe |
| Nói | 🗣️ | Nói |
| Đọc | 📖 | Đọc |
| Viết | ✍️ | Viết |

### Ví dụ HTML

```html
<h3 class="skill-title">
  <span class="skill-icon" aria-hidden="true">🎧</span>
  Nghe
</h3>
```

> `aria-hidden="true"` để trình đọc màn hình bỏ qua emoji trang trí; chữ "Nghe" mới là phần được đọc.

## 3. Kích thước icon

Liên kết kích thước icon với thang chữ để cân đối.

| Bối cảnh | Kích thước | Gợi ý |
|----------|-----------|-------|
| Trong dòng chữ | `1em` | theo cỡ chữ xung quanh |
| Tiêu đề kỹ năng | `1.5rem` | `--fs-2xl` |
| Nút icon (audio) | `1.25rem` | `--fs-xl` |
| Icon nổi bật (hero) | `2rem`+ | `--fs-3xl` |

```css
.skill-icon { font-size: var(--fs-2xl); line-height: 1; }
.btn-audio .icon { font-size: var(--fs-xl); }
```

## 4. Icon SVG (khi cần đường nét tinh tế)

Với icon giao diện (mũi tên, đóng, tìm kiếm), nên dùng SVG inline để đổi màu theo `currentColor`.

```html
<button class="btn-audio" aria-label="Phát âm thanh">
  <svg class="icon" width="20" height="20" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
</button>
```

```css
.icon {
  width: 1.25em;
  height: 1.25em;
  color: var(--color-primary); /* SVG theo currentColor sẽ đổi màu theo đây */
}
```

> Lợi ích của `stroke="currentColor"`: icon tự đổi màu theo màu chữ, dễ tái sử dụng.

## 5. Nguồn icon

| Nguồn | Loại | Ghi chú |
|-------|------|---------|
| Emoji hệ thống | emoji | Sẵn có, dùng cho 4 kỹ năng và trang trí. |
| [Lucide](https://lucide.dev) | SVG | Nét đẹp, miễn phí, dễ copy SVG. |
| [Feather Icons](https://feathericons.com) | SVG | Tối giản, hợp giao diện đơn giản. |

> Định hướng tương lai: nếu dùng nhiều SVG, gom thành một SVG sprite để quản lý tập trung.

## 6. Checklist icon

- [ ] Icon trang trí có `aria-hidden="true"`.
- [ ] Nút chỉ có icon (không chữ) phải có `aria-label` mô tả.
- [ ] Icon luôn đi kèm nhãn chữ ở những chỗ quan trọng (4 kỹ năng, điều hướng).
- [ ] Kích thước icon dùng đơn vị tương đối (`em`/`rem`), không cố định lệch cỡ chữ.
- [ ] SVG dùng `currentColor` để đồng bộ màu với token.
