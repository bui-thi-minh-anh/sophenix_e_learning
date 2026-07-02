# Chỉ số thành công (KPI) — Sophenix

> Tài liệu này liệt kê các chỉ số đo lường mức độ thành công của Sophenix và cách thu thập từng chỉ số.

## Nguyên tắc đo lường

- Giai đoạn đầu **chưa có database và đăng nhập**, nên nhiều chỉ số ban đầu chỉ đo được ở mức cơ bản
  (ví dụ qua log truy cập, công cụ phân tích web, hoặc `localStorage` phía trình duyệt).
- Các chỉ số gắn với tài khoản người dùng (retention theo người, tiến độ cá nhân) là **định hướng tương lai**
  khi có hệ thống đăng nhập (Giai đoạn 3).

## Bảng KPI

| Nhóm | Chỉ số (KPI) | Mục tiêu tham khảo | Cách đo |
| --- | --- | --- | --- |
| Tăng trưởng | Số người dùng truy cập / tháng | Tăng dần theo tháng | Công cụ phân tích web hoặc log truy cập server |
| Tương tác | Số bài học được mở (`GET /api/lessons/:id`) | — | Đếm lượt gọi API chi tiết bài |
| Tương tác | Số quiz người học bắt đầu | — | Sự kiện phía client (TTL: `localStorage`/analytics) |
| Hoàn thành | Tỉ lệ hoàn thành bài học | ≥ 50% | (Số bài hoàn thành) / (số bài bắt đầu) |
| Hoàn thành | Tỉ lệ hoàn thành quiz 4 kỹ năng | ≥ 40% | (Số quiz nộp) / (số quiz bắt đầu) |
| Chất lượng học | Điểm trung bình quiz | ≥ 70% | Tổng điểm / số lượt làm quiz |
| Giữ chân (Retention) | Tỉ lệ quay lại trong 7 ngày | ≥ 20% | Cần đăng nhập — **định hướng tương lai** |
| Nội dung | Số bài học khả dụng | Tăng đều mỗi kỳ | Đếm số lesson trong `src/data/lessons.json` |
| Nội dung | Độ phủ trình độ CEFR (A1..C2) | Đủ A1–B1 trước | Kiểm kê `level` của các bài |
| Kỹ thuật | Uptime của website | ≥ 99% | Giám sát server (định hướng tương lai) |
| Kỹ thuật | Thời gian phản hồi API | < 300ms | Đo phía server |

## Chỉ số theo giai đoạn

- **Giai đoạn 1–2 (hiện tại)**: tập trung số bài học, lượt mở bài, tỉ lệ hoàn thành quiz, điểm trung bình.
- **Giai đoạn 3 (có người dùng)**: bổ sung retention theo người, tiến độ cá nhân, số từ vựng yêu thích đã lưu.
- **Giai đoạn 4 (nâng cao)**: chỉ số gamification (streak, huy hiệu), tỉ lệ tương tác với gợi ý.

## Cách thu thập dữ liệu (thực dụng giai đoạn đầu)

1. **Log server**: ghi lại lượt gọi `GET /api/lessons` và `GET /api/lessons/:id`.
2. **Phía client**: ghi sự kiện bắt đầu/nộp quiz, điểm số vào `localStorage` hoặc gửi tới công cụ analytics.
3. **Kiểm kê nội dung**: đếm thủ công/script số lesson và phân bố `level` trong file JSON.

## Liên kết liên quan

- [Tầm nhìn dự án](PROJECT_VISION.md)
- [Roadmap](../01_PRODUCT/ROADMAP.md)
- [Yêu cầu sản phẩm (PRD)](../01_PRODUCT/PRODUCT_REQUIREMENT.md)
