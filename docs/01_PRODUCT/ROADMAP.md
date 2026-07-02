# Roadmap — Sophenix

> Tài liệu này trình bày lộ trình phát triển Sophenix theo 4 giai đoạn, dạng bảng tổng quan kèm checklist chi tiết.

## Tổng quan 4 giai đoạn

| Giai đoạn | Tên | Mục tiêu chính | Trạng thái |
| --- | --- | --- | --- |
| GĐ1 | Nền tảng | Server Express, phục vụ tĩnh, dữ liệu JSON, 2 API bài học | Đang/Hoàn thiện |
| GĐ2 | Nội dung | Danh sách, chi tiết, quiz 4 kỹ năng có chấm điểm | Đang triển khai |
| GĐ3 | Người dùng | Đăng nhập, tiến độ, từ vựng yêu thích | Định hướng tương lai |
| GĐ4 | Nâng cao | TTS hoàn thiện, gợi ý, gamification | Định hướng tương lai |

---

## Giai đoạn 1 — Nền tảng

Mục tiêu: dựng khung kỹ thuật tối giản, chạy được website.

- [x] Backend Node.js + Express (`src/server.js`), cổng mặc định 3000
- [x] Phục vụ tĩnh thư mục `public/`
- [x] API `GET /api/lessons` (danh sách tóm tắt)
- [x] API `GET /api/lessons/:id` (chi tiết)
- [x] Lưu nội dung trong `src/data/lessons.json`
- [x] 2 bài mẫu: A1 *Greetings*, A2 *Daily Routines*
- [x] Trang chủ, trang danh sách, trang chi tiết (HTML/CSS/JS thuần)

## Giai đoạn 2 — Nội dung

Mục tiêu: hoàn thiện trải nghiệm học và bài tập.

- [ ] Hiển thị đầy đủ lecture + bảng từ vựng song ngữ
- [ ] Bài tập 4 kỹ năng: listening, speaking, reading, writing
- [ ] **Chấm điểm quiz** và hiển thị kết quả (đúng/sai, điểm tổng)
- [ ] Nghe phát âm bằng Web Speech API (TTS) ổn định
- [ ] Luyện nói bằng speech recognition (ưu tiên Chrome)
- [ ] Bổ sung thêm bài học, mở rộng độ phủ trình độ (A1–B1)

## Giai đoạn 3 — Người dùng *(Định hướng tương lai)*

Mục tiêu: cá nhân hóa trải nghiệm.

- [ ] Đăng ký / đăng nhập người dùng
- [ ] Lưu **tiến độ học tập** theo người dùng
- [ ] **Từ vựng yêu thích** cá nhân hóa
- [ ] Cân nhắc chuyển dữ liệu từ JSON sang **cơ sở dữ liệu** *(định hướng tương lai)*

## Giai đoạn 4 — Nâng cao *(Định hướng tương lai)*

Mục tiêu: tăng động lực và chất lượng học.

- [ ] Hoàn thiện/ mở rộng **TTS** và trải nghiệm nghe
- [ ] **Gợi ý** bài học/từ vựng (có thể dùng AI) *(định hướng tương lai)*
- [ ] **Gamification**: điểm, huy hiệu, streak
- [ ] Cân nhắc framework frontend (ví dụ React) *(định hướng tương lai)*
- [ ] Cân nhắc ứng dụng mobile *(định hướng tương lai)*

## Liên kết liên quan

- [Release Plan](RELEASE_PLAN.md)
- [MVP](../07_BACKLOG/MVP.md)
- [Backlog](../07_BACKLOG/BACKLOG.md)
- [Future Features](../07_BACKLOG/FUTURE_FEATURES.md)
