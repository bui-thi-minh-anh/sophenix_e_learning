# Hệ thống màu sắc (Color System)

Bảng màu của **Sophenix** cùng mã hex, biến CSS và lưu ý về độ tương phản (contrast) để đảm bảo dễ đọc cho mọi người dùng.

> Liên quan: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [UI_GUIDELINE.md](UI_GUIDELINE.md)

## 1. Nguyên tắc chọn màu

- Một màu **chính (primary)** cho hành động quan trọng và thương hiệu.
- Một màu **phụ (secondary)** ấm để làm điểm nhấn.
- Dải **trung tính (neutral)** cho nền, chữ, viền.
- Bộ màu **ngữ nghĩa (semantic)** cho đúng/sai/cảnh báo/thông tin (rất quan trọng với bài tập quiz).

## 2. Màu chính (Primary)

| Vai trò | Hex | Biến CSS |
|---------|-----|----------|
| Primary | `#2563eb` | `--color-primary` |
| Primary đậm (hover) | `#1d4ed8` | `--color-primary-dark` |
| Primary nhạt (nền) | `#dbeafe` | `--color-primary-soft` |

## 3. Màu phụ (Secondary)

| Vai trò | Hex | Biến CSS |
|---------|-----|----------|
| Secondary | `#f59e0b` | `--color-secondary` |
| Secondary đậm | `#b45309` | `--color-secondary-dark` |

## 4. Màu trung tính (Neutral)

| Vai trò | Hex | Biến CSS |
|---------|-----|----------|
| Nền trang | `#ffffff` | `--color-bg` |
| Nền bề mặt (card) | `#f8fafc` | `--color-surface` |
| Chữ chính | `#1f2937` | `--color-text` |
| Chữ phụ / mờ | `#6b7280` | `--color-text-muted` |
| Viền | `#e5e7eb` | `--color-border` |

## 5. Màu ngữ nghĩa (Semantic)

| Vai trò | Hex | Biến CSS | Dùng khi |
|---------|-----|----------|----------|
| Thành công (đúng) | `#16a34a` | `--color-success` | trả lời quiz đúng |
| Cảnh báo | `#d97706` | `--color-warning` | nhắc nhở, sắp hết giờ |
| Lỗi (sai) | `#dc2626` | `--color-error` | trả lời sai, lỗi tải |
| Thông tin | `#0891b2` | `--color-info` | gợi ý, mẹo học |

## 6. Khai báo biến CSS

```css
:root {
  --color-primary:       #2563eb;
  --color-primary-dark:  #1d4ed8;
  --color-primary-soft:  #dbeafe;
  --color-secondary:     #f59e0b;
  --color-secondary-dark:#b45309;

  --color-bg:        #ffffff;
  --color-surface:   #f8fafc;
  --color-text:      #1f2937;
  --color-text-muted:#6b7280;
  --color-border:    #e5e7eb;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error:   #dc2626;
  --color-info:    #0891b2;
}
```

## 7. Ví dụ áp dụng

```css
/* Phản hồi quiz */
.quiz-option.correct {
  border-color: var(--color-success);
  background: #f0fdf4;
}
.quiz-option.wrong {
  border-color: var(--color-error);
  background: #fef2f2;
}

/* Mẹo học */
.tip {
  border-left: 4px solid var(--color-info);
  background: #ecfeff;
  padding: var(--space-3) var(--space-4);
}
```

## 8. Độ tương phản (Contrast)

Theo chuẩn WCAG AA: chữ thường cần tỉ lệ tương phản tối thiểu **4.5:1**, chữ lớn (≥ 24px hoặc ≥ 19px in đậm) tối thiểu **3:1**.

| Tổ hợp | Tỉ lệ (xấp xỉ) | Đạt AA? |
|--------|-----------------|---------|
| `--color-text` (#1f2937) trên `--color-bg` (#fff) | ~14.9:1 | Đạt |
| `--color-text-muted` (#6b7280) trên `#fff` | ~4.8:1 | Đạt (chữ thường) |
| `#ffffff` trên `--color-primary` (#2563eb) | ~5.2:1 | Đạt |
| `#ffffff` trên `--color-secondary` (#f59e0b) | ~2.0:1 | **Không** — dùng chữ tối trên nền cam |
| `--color-text` (#1f2937) trên `--color-secondary` | ~7.4:1 | Đạt |

### Checklist contrast

- [ ] Chữ trên nút primary/secondary đã kiểm tra đạt ≥ 4.5:1.
- [ ] Với nền cam `--color-secondary`, dùng **chữ tối** (`--color-text`), không dùng chữ trắng.
- [ ] Không truyền tải thông tin chỉ bằng màu — kèm icon hoặc chữ (ví dụ ✓ / ✗) cho người mù màu.
- [ ] Kiểm tra bằng công cụ như WebAIM Contrast Checker (định hướng tương lai: tự động hóa trong CI).
