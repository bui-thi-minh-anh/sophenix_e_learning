# Định nghĩa MVP — Sophenix

> Tài liệu này xác định phạm vi tối thiểu (Minimum Viable Product) của Sophenix — đúng những gì repo đang có và đang hướng tới, đủ để người Việt bắt đầu học tiếng Anh.

## Mục tiêu MVP

Một website chạy được, cho phép người học **duyệt bài, xem nội dung song ngữ, học từ vựng và làm bài tập 4 kỹ năng** — bằng stack đơn giản (Express + JS thuần + JSON), không cần DB hay đăng nhập.

## Phạm vi MVP (bắt buộc có)

- [x] Server Node.js + Express (`src/server.js`) chạy ở cổng 3000
- [x] Phục vụ tĩnh thư mục `public/`
- [x] API `GET /api/lessons` — danh sách tóm tắt
- [x] API `GET /api/lessons/:id` — chi tiết bài
- [x] Dữ liệu trong `src/data/lessons.json`
- [x] Tối thiểu 2 bài học (A1 *Greetings*, A2 *Daily Routines*)
- [x] Trang chủ + trang danh sách bài + trang chi tiết bài
- [ ] Hiển thị lecture (`intro`, `grammar`) và bảng `vocabulary[]` song ngữ
- [ ] Hiển thị bài tập 4 kỹ năng: listening, speaking, reading, writing
- [ ] Nghe phát âm bằng Web Speech API (TTS)
- [ ] Luyện nói bằng speech recognition (ưu tiên Chrome)

## Ngoài MVP (chưa làm ở mức tối thiểu)

- Chấm điểm quiz tự động và lưu kết quả → hoàn thiện ở **v0.3 / GĐ2**.
- Đăng nhập, tiến độ, từ vựng yêu thích → **định hướng tương lai (GĐ3)**.
- Cơ sở dữ liệu, framework frontend, app mobile, gamification → **định hướng tương lai**.

## Tiêu chí "Done" cho MVP

| Tiêu chí | Cách kiểm tra |
| --- | --- |
| Website khởi động được | `npm start` → mở `http://localhost:3000` |
| Xem được danh sách bài | Trang danh sách hiển thị 2 bài mẫu |
| Mở được chi tiết bài | Click vào bài → thấy lecture + vocabulary |
| Làm được bài tập 4 kỹ năng | Mỗi kỹ năng hiển thị và tương tác được |
| Nghe/Nói hoạt động | Nghe phát âm và nói thử trên Chrome |
| Thêm bài không cần sửa code | Thêm lesson mới trong JSON → hiện ở danh sách |

## Liên kết liên quan

- [Backlog](BACKLOG.md)
- [Future Features](FUTURE_FEATURES.md)
- [Roadmap](../01_PRODUCT/ROADMAP.md)
- [Yêu cầu sản phẩm (PRD)](../01_PRODUCT/PRODUCT_REQUIREMENT.md)
