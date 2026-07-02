# Phạm vi dự án — Sophenix

> Tài liệu này xác định rõ những gì **nằm trong** và **nằm ngoài** phạm vi của Sophenix ở giai đoạn hiện tại, cùng các giả định và ràng buộc.

## Trong phạm vi (In-scope)

| Hạng mục | Mô tả |
| --- | --- |
| Danh sách bài học | API `GET /api/lessons` trả về danh sách tóm tắt các bài |
| Chi tiết bài học | API `GET /api/lessons/:id` trả về nội dung đầy đủ một bài |
| Giao diện web | Trang chủ, danh sách bài (`lessons.html`), chi tiết bài (`lesson.html`) |
| Nội dung bài giảng | `lecture` gồm `intro`, `grammar`, `vocabulary[]` song ngữ Anh–Việt |
| Bài tập 4 kỹ năng | `listening`, `speaking`, `reading`, `writing` cho mỗi bài |
| Nghe (TTS) | Phát âm bằng **Web Speech API** text-to-speech |
| Nói (ASR) | Nhận diện giọng nói bằng **Web Speech API** speech recognition |
| Lưu trữ nội dung | File `src/data/lessons.json` (không dùng DB) |
| Phục vụ tĩnh | Express phục vụ thư mục `public/` |

## Ngoài phạm vi (Out-of-scope) — giai đoạn hiện tại

| Hạng mục | Ghi chú |
| --- | --- |
| Cơ sở dữ liệu (SQL/NoSQL) | **Định hướng tương lai** — hiện dùng file JSON |
| Đăng nhập / tài khoản người dùng | **Định hướng tương lai** (Giai đoạn 3) |
| Lưu tiến độ học tập theo người dùng | **Định hướng tương lai** (Giai đoạn 3) |
| Từ vựng yêu thích cá nhân hóa | **Định hướng tương lai** (Giai đoạn 3) |
| Gamification (huy hiệu, điểm, streak) | **Định hướng tương lai** (Giai đoạn 4) |
| Gợi ý bài học bằng AI | **Định hướng tương lai** (Giai đoạn 4) |
| Chuyển sang framework (React...) | **Định hướng tương lai** — hiện dùng JS thuần |
| Ứng dụng mobile native | **Định hướng tương lai** |
| Thanh toán / gói trả phí | Không nằm trong kế hoạch hiện tại |

## Giả định (Assumptions)

- Người học sử dụng trình duyệt hiện đại, **ưu tiên Chrome** (do phụ thuộc Web Speech API).
- Máy người học có micro và loa để luyện Nghe/Nói.
- Nội dung bài học được biên soạn thủ công và lưu trong `src/data/lessons.json`.
- Lượng truy cập giai đoạn đầu nhỏ, file JSON đủ đáp ứng (chưa cần DB).
- Người dùng đọc hiểu tiếng Việt (giao diện và giải thích bằng tiếng Việt).

## Ràng buộc (Constraints)

- **Công nghệ**: Node.js + Express, HTML/CSS/JS thuần, dữ liệu JSON — ưu tiên đơn giản.
- **Cổng mặc định**: 3000.
- **Phụ thuộc trình duyệt**: tính năng Nghe/Nói hoạt động tốt nhất trên Chrome; một số trình duyệt có thể không hỗ trợ đầy đủ Web Speech API.
- **Không có backend chấm điểm phức tạp** ở giai đoạn đầu — quiz chấm điểm phía client là chính.
- **Không commit/push** thay đổi trừ khi người dùng yêu cầu (quy ước dự án).

## Liên kết liên quan

- [Tầm nhìn dự án](PROJECT_VISION.md)
- [Roadmap](../01_PRODUCT/ROADMAP.md)
- [Định nghĩa MVP](../07_BACKLOG/MVP.md)
