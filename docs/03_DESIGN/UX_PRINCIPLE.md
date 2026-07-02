# Nguyên tắc trải nghiệm (UX Principle)

Nguyên tắc UX cho **Sophenix**: phản hồi khi làm quiz, trạng thái loading/error, luồng học và tối giản thao tác. Mục tiêu là người học cảm thấy dễ, rõ ràng và được khuyến khích.

> Liên quan: [UI_GUIDELINE.md](UI_GUIDELINE.md) · [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)

## 1. Phản hồi khi trả lời quiz (Feedback)

Người học cần biết ngay đúng hay sai và **vì sao**.

| Tình huống | Hành vi UX |
|------------|------------|
| Trả lời đúng | Tô viền xanh + dấu ✓ + lời khen ngắn ("Chính xác!"). |
| Trả lời sai | Tô viền đỏ + dấu ✗ + hiển thị đáp án đúng. |
| Đang chọn | Làm nổi lựa chọn đang hover/focus. |
| Hoàn thành quiz | Hiện điểm số và nút "Học bài tiếp theo". |

Nguyên tắc:
- Phản hồi **tức thì** (ngay khi chọn, không bắt bấm "Kiểm tra" nếu không cần).
- Sai thì **không chê**, nhẹ nhàng chỉ ra đáp án đúng để học tiếp.
- Dùng cả màu **và** icon/chữ (xem [COLOR_SYSTEM.md](COLOR_SYSTEM.md)).

```html
<p class="feedback feedback--correct">✓ Chính xác! Tốt lắm.</p>
<p class="feedback feedback--wrong">✗ Chưa đúng. Đáp án đúng: <b>Good morning</b>.</p>
```

```css
.feedback { padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); }
.feedback--correct { color: var(--color-success); background: #f0fdf4; }
.feedback--wrong   { color: var(--color-error);   background: #fef2f2; }
```

## 2. Trạng thái Loading

Khi tải danh sách bài hay nội dung từ API (`src/server.js`), luôn có dấu hiệu đang tải để người dùng không tưởng trang bị treo.

```html
<div class="loading" aria-live="polite">Đang tải bài học...</div>
```

```css
.skeleton {
  background: linear-gradient(90deg, var(--color-border) 25%, var(--color-surface) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: var(--radius-md);
  height: 80px;
}
@keyframes shimmer { to { background-position: -200% 0; } }
```

- Hiện chữ "Đang tải..." hoặc khối skeleton trong < 0.3s.
- Vô hiệu hóa nút vừa bấm để tránh bấm lặp.

## 3. Trạng thái lỗi (Error) và rỗng (Empty)

| Trạng thái | Thông điệp gợi ý | Hành động |
|------------|------------------|-----------|
| Lỗi tải | "Không tải được bài học. Vui lòng thử lại." | Nút **Thử lại**. |
| Rỗng (chưa có bài) | "Chưa có bài học nào ở đây." | Gợi ý quay về trang chủ. |
| Sai đường dẫn bài | "Không tìm thấy bài học này." | Liên kết về `lessons.html`. |

```html
<div class="state state--error" role="alert">
  <p>Không tải được bài học. Vui lòng thử lại.</p>
  <button class="btn btn-primary" onclick="location.reload()">Thử lại</button>
</div>
```

Nguyên tắc: thông báo lỗi viết bằng **tiếng Việt thân thiện**, nói rõ làm gì tiếp theo — không hiện mã lỗi kỹ thuật cho người học.

## 4. Luồng học (User Flow)

```
Trang chủ → Danh sách bài → Chi tiết bài → Học từ vựng →
Bài tập 4 kỹ năng (Nghe → Nói → Đọc → Viết) → Kết quả → Bài tiếp theo
```

Nguyên tắc luồng:
- Mỗi màn hình có **một hành động chính rõ ràng** (nút primary).
- Luôn có đường lùi (nút "Quay lại" / breadcrumb).
- Ghi nhớ tiến độ để người học quay lại đúng chỗ (định hướng tương lai: lưu vào `localStorage`).
- Cho hoàn thành từng phần, không bắt làm hết mới được rời đi.

## 5. Tối giản thao tác

| Nguyên tắc | Ví dụ áp dụng |
|------------|----------------|
| Giảm số bước | Vào bài học chỉ 1 cú bấm từ danh sách. |
| Mặc định thông minh | Mở bài là vào kỹ năng đầu tiên sẵn. |
| Tránh nhập liệu thừa | Quiz ưu tiên bấm chọn hơn gõ chữ. |
| Vùng bấm lớn | Cả thẻ bài học bấm được, không chỉ nút nhỏ. |
| Không bất ngờ | Không tự chuyển trang khi người học chưa xong. |

## 6. Khích lệ người học (Động lực)

- Khen ngợi tích cực khi đúng, không trừng phạt khi sai.
- Hiển thị tiến độ trực quan (thanh progress) để tạo cảm giác hoàn thành.
- Cột mốc nhỏ: "Bạn đã hoàn thành 3/4 kỹ năng!".

## 7. Checklist UX

- [ ] Quiz phản hồi đúng/sai tức thì, kèm đáp án đúng khi sai.
- [ ] Mọi thao tác tải dữ liệu có trạng thái loading.
- [ ] Có xử lý trạng thái lỗi và rỗng với hướng dẫn rõ ràng.
- [ ] Mỗi màn hình có một hành động chính và đường lùi.
- [ ] Vùng bấm đủ lớn, hạn chế gõ phím khi không cần.
- [ ] Văn bản thông báo bằng tiếng Việt thân thiện, không lộ lỗi kỹ thuật.
