# 09 — Nội dung từng trang (Page Content)

> Thư mục này để **bạn viết nội dung mong muốn cho từng trang**. Mỗi file ứng với một trang thật trong `src/app/`.
> Claude sẽ đọc các file ở đây để dựng/điền nội dung trang cho đúng ý bạn — bạn **không cần biết code**, chỉ cần viết mô tả bằng tiếng Việt.

## Cách dùng

1. Mở file của trang muốn sửa (xem bảng dưới).
2. Điền vào các mục có sẵn. Chỗ nào để trống thì Claude sẽ tự đề xuất.
3. Cứ viết tự nhiên bằng tiếng Việt: bạn muốn trang hiển thị gì, theo thứ tự nào, có nút gì, bấm vào ra sao.
4. Khi xong, bảo Claude: *"Dựng trang Trang chủ theo file 09"* (hoặc trang bất kỳ).

> Mẹo: không cần điền hết mọi mục. Mục nào không chắc cứ bỏ qua hoặc ghi "tuỳ Claude đề xuất".

## Danh sách trang

| File | Trang | Đường dẫn | File code |
|------|-------|-----------|-----------|
| [00_HOME.md](00_HOME.md) | Trang chủ | `/` | `src/app/page.tsx` |
| [01_LESSONS.md](01_LESSONS.md) | Bài giảng | `/lessons` | `src/app/lessons/page.tsx` |
| [02_VOCABULARY.md](02_VOCABULARY.md) | Từ vựng | `/vocabulary` | `src/app/vocabulary/page.tsx` |
| [03_LISTENING.md](03_LISTENING.md) | Nghe | `/listening` | `src/app/listening/page.tsx` |
| [04_SPEAKING.md](04_SPEAKING.md) | Nói | `/speaking` | `src/app/speaking/page.tsx` |
| [05_READING.md](05_READING.md) | Đọc | `/reading` | `src/app/reading/page.tsx` |
| [06_WRITING.md](06_WRITING.md) | Viết | `/writing` | `src/app/writing/page.tsx` |

> Muốn thêm trang mới? Tạo thêm file ở đây theo mẫu rồi báo Claude, hoặc nói thẳng tên trang bạn muốn.

## Liên kết liên quan

- Lộ trình nội dung học: [../08_LEARNING_ROADMAP/CURRICULUM.md](../08_LEARNING_ROADMAP/CURRICULUM.md)
- Thư viện component dùng để dựng trang: [../03_DESIGN/COMPONENT_LIBRARY.md](../03_DESIGN/COMPONENT_LIBRARY.md)
- Nguyên tắc giao diện/trải nghiệm: [../03_DESIGN/UI_GUIDELINE.md](../03_DESIGN/UI_GUIDELINE.md) · [../03_DESIGN/UX_PRINCIPLE.md](../03_DESIGN/UX_PRINCIPLE.md)
