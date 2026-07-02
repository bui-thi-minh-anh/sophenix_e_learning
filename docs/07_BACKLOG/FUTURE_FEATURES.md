# Tính năng tương lai (Future Features) — Sophenix

> Tài liệu này tập hợp các ý tưởng mở rộng cho Sophenix. **Tất cả hạng mục ở đây đều là "định hướng tương lai"** — chưa cam kết và có thể thay đổi. Stack hiện tại vẫn là Express + JS thuần + JSON.

## Nhắc lại bối cảnh hiện tại

- Backend: Node.js + Express; Frontend: HTML/CSS/JS thuần; Dữ liệu: file JSON `src/data/lessons.json`.
- Nghe/Nói: Web Speech API. Chưa có DB, đăng nhập hay framework.

## Bảng ý tưởng tương lai

| Nhóm | Ý tưởng | Mô tả ngắn | Gắn GĐ | Ghi chú |
| --- | --- | --- | --- | --- |
| Người dùng | Đăng nhập & hồ sơ | Tài khoản cá nhân, lưu dữ liệu | 3 | **Định hướng tương lai** |
| Người dùng | Theo dõi tiến độ | Bài đã học, lịch sử điểm quiz | 3 | **Định hướng tương lai** |
| Người dùng | Từ vựng yêu thích | Lưu/ôn từ theo người dùng | 3 | **Định hướng tương lai** |
| Dữ liệu | Cơ sở dữ liệu | Chuyển từ JSON sang DB khi nội dung lớn | 3 | **Định hướng tương lai** |
| Học tập | Gợi ý bằng AI | Gợi ý bài/từ phù hợp trình độ | 4 | **Định hướng tương lai** |
| Động lực | Gamification | Điểm, huy hiệu, streak, bảng xếp hạng | 4 | **Định hướng tương lai** |
| Học tập | Flashcard & spaced repetition | Ôn từ vựng theo lịch lặp lại | 4 | **Định hướng tương lai** |
| Nghe/Nói | Chấm phát âm nâng cao | Đánh giá độ chính xác khi nói | 4 | **Định hướng tương lai** |
| Nền tảng | Framework frontend (React...) | Khi UI phức tạp hơn | 4 | **Định hướng tương lai** |
| Nền tảng | Ứng dụng mobile | App native/PWA | 4 | **Định hướng tương lai** |
| Cộng đồng | Diễn đàn / nhóm học | Trao đổi giữa người học | — | **Định hướng tương lai** |
| Nội dung | Bài học theo chủ đề chuyên sâu | Tiếng Anh công việc, du lịch... | — | **Định hướng tương lai** |

## Chi tiết một số ý tưởng nổi bật

### Gamification *(Định hướng tương lai)*
Thêm điểm thưởng khi hoàn thành bài/quiz, chuỗi ngày học liên tiếp (streak), huy hiệu theo cột mốc — nhằm tăng động lực duy trì học.

### Gợi ý bằng AI *(Định hướng tương lai)*
Dựa trên lịch sử học và điểm quiz để gợi ý bài kế tiếp hoặc từ vựng cần ôn. Cần có dữ liệu người dùng (phụ thuộc GĐ3).

### App mobile *(Định hướng tương lai)*
Cân nhắc PWA trước (tận dụng web hiện có) rồi mới tính app native, để tối ưu chi phí.

## Tiêu chí cân nhắc đưa vào roadmap

- Có nhu cầu thực tế từ người học (xem [Success Metrics](../00_PROJECT_CHARTER/SUCCESS_METRICS.md)).
- Không phá vỡ nguyên tắc "đơn giản trước tiên" của giai đoạn đầu.
- Phù hợp năng lực bảo trì và mở rộng.

## Liên kết liên quan

- [Roadmap](../01_PRODUCT/ROADMAP.md)
- [Backlog](BACKLOG.md)
- [MVP](MVP.md)
- [Phạm vi dự án](../00_PROJECT_CHARTER/PROJECT_SCOPE.md)
