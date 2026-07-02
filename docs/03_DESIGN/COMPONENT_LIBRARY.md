# Thư viện component (Component Library)

> Bộ component giao diện dùng lại của **Sophenix**, xây trên **React + Tailwind + shadcn/ui**.
> Tất cả nằm trong `src/components/ui/`, dùng token thiết kế từ [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) nên tự hỗ trợ **dark mode** và đồng nhất màu/bo góc.

> Liên quan: [COLOR_SYSTEM.md](COLOR_SYSTEM.md) · [TYPOGRAPHY.md](TYPOGRAPHY.md) · [UI_GUIDELINE.md](UI_GUIDELINE.md) · [ICONOGRAPHY.md](ICONOGRAPHY.md)

## 1. Nguyên tắc chung

- **Dùng lại (reusable)**: mỗi component là một file trong `src/components/ui/`, import qua alias `@/components/ui/...`.
- **Token nhất quán**: chỉ dùng class Tailwind ánh xạ tới biến CSS (`bg-primary`, `text-muted-foreground`...), không gõ mã màu/px cứng.
- **Dark mode**: tự động theo class `.dark` trên `<html>` (quản lý bởi `next-themes`), không cần xử lý riêng từng component.
- **Accessible**: dựa trên Radix UI (focus, bàn phím, ARIA); nút chỉ-icon có `aria-label`/`sr-only`; trạng thái đúng/sai kèm icon, không chỉ màu.
- **Responsive, mobile-first**: vùng bấm chính cao 44px; bố cục co giãn theo màn hình.
- **Ghép lớp class an toàn** bằng hàm `cn()` (`src/lib/utils.ts`).

## 2. Danh mục component

### Nền tảng & bố cục

| Component | File | Ghi chú |
|-----------|------|---------|
| `Container` | `container.tsx` | Giới hạn chiều rộng nội dung (`size`: sm/default/lg/full). |
| `Grid` | `grid.tsx` | Lưới responsive, `cols` 1–4, mobile luôn 1 cột. |
| `Separator` | `separator.tsx` | Đường kẻ phân cách (Divider), ngang/dọc. |
| `Skeleton` | `skeleton.tsx` | Khối giữ chỗ khi đang tải. |
| `Spinner` | `spinner.tsx` | Biểu tượng loading kèm nhãn ẩn cho screen reader. |
| `EmptyState` | `empty-state.tsx` | Trạng thái rỗng: icon + tiêu đề + mô tả + hành động. |

### Chữ (Typography)

| Component | File | Ghi chú |
|-----------|------|---------|
| `PageTitle` | `page-title.tsx` | Tiêu đề trang (h1) + mô tả tuỳ chọn. Mỗi trang một cái. |
| `SectionTitle` | `section-title.tsx` | Tiêu đề mục (h2) + mô tả tuỳ chọn. |
| `Lead`, `Muted`, `Bilingual` | `typography.tsx` | Đoạn nhấn, chữ mờ, và cặp song ngữ Anh–Việt. |

### Form

| Component | File | Cơ sở |
|-----------|------|-------|
| `Button` | `button.tsx` | Biến thể: default/secondary/destructive/outline/ghost/link; size sm/default/lg/icon. |
| `Input` | `input.tsx` | Ô nhập một dòng. |
| `Textarea` | `textarea.tsx` | Ô nhập nhiều dòng. |
| `Label` | `label.tsx` | Nhãn gắn với input (Radix Label). |
| `Select` | `select.tsx` | Hộp chọn (Radix Select). |
| `Checkbox` | `checkbox.tsx` | Ô tích (Radix Checkbox). |
| `RadioGroup`, `RadioGroupItem` | `radio-group.tsx` | Nhóm chọn một (Radix RadioGroup). |
| `Switch` | `switch.tsx` | Công tắc bật/tắt (Radix Switch). |

### Hiển thị & phản hồi

| Component | File | Ghi chú |
|-----------|------|---------|
| `Card` (+ Header/Title/Description/Content/Footer) | `card.tsx` | Thẻ nội dung. |
| `Badge` | `badge.tsx` | Nhãn nhỏ; biến thể default/secondary/destructive/success/warning/info/outline (dùng cho cả cấp độ CEFR). |
| `Alert` (+ Title/Description) | `alert.tsx` | Hộp thông báo trong trang; biến thể info/success/warning/destructive. |
| `Toaster` + `toast()` | `sonner.tsx` | Thông báo nổi (sonner). `Toaster` đặt sẵn trong layout gốc. |
| `Progress` | `progress.tsx` | Thanh tiến độ (Radix Progress). |

### Tương tác / overlay

| Component | File | Cơ sở |
|-----------|------|-------|
| `Tabs` (+ List/Trigger/Content) | `tabs.tsx` | Chuyển tab (dùng cho 4 kỹ năng sau này). |
| `Accordion` (+ Item/Trigger/Content) | `accordion.tsx` | Đóng/mở nội dung. |
| `Dialog` (+ Content/Header/Footer/Title/Description) | `dialog.tsx` | Hộp thoại modal. |
| `Tooltip` (+ Trigger/Content) + `TooltipProvider` | `tooltip.tsx` | Chú thích khi hover/focus. Provider đặt sẵn trong layout. |

## 3. Ví dụ dùng

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LessonCard() {
  return (
    <Card>
      <CardHeader>
        <Badge variant="success">A1</Badge>
        <CardTitle>Chào hỏi cơ bản</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Vào học</Button>
      </CardContent>
    </Card>
  );
}
```

Thông báo nổi (toast) — gọi ở bất kỳ Client Component nào:

```tsx
"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button onClick={() => toast.success("Đã lưu!")}>Lưu</Button>;
}
```

## 4. Token & màu ngữ nghĩa

Màu lấy từ [COLOR_SYSTEM.md](COLOR_SYSTEM.md), khai báo dạng biến CSS trong `src/app/globals.css` (sáng ở `:root`, tối ở `.dark`) và ánh xạ trong `tailwind.config.ts`:

- Thương hiệu: `primary`, `secondary`, `accent`.
- Trung tính: `background`, `foreground`, `card`, `muted`, `border`, `input`, `ring`.
- Ngữ nghĩa: `success`, `warning`, `info`, `destructive` (mỗi màu có cặp `*-foreground`).

> Đổi màu thương hiệu hay theme tối: chỉ sửa biến trong `globals.css`, toàn bộ component cập nhật theo.

## 5. Cách thêm component mới

- Component shadcn/ui chuẩn → đặt trong `src/components/ui/`, theo mẫu các file hiện có (dùng `cn`, `cva` cho biến thể).
- Tránh màu/px cứng; luôn dùng token.
- Đảm bảo: có trạng thái `:focus-visible`, hỗ trợ bàn phím, nhãn cho phần chỉ-icon, hoạt động ở cả chế độ sáng/tối.

## 6. Checklist component

- [ ] Dùng token (`bg-primary`, `text-muted-foreground`...), không màu/px cứng.
- [ ] Vùng bấm chính tối thiểu 44px.
- [ ] Có `:focus-visible`, điều hướng bàn phím, ARIA phù hợp (qua Radix).
- [ ] Trạng thái đúng/sai kèm icon/chữ, không chỉ màu.
- [ ] Kiểm tra hiển thị ở cả chế độ sáng và tối.
