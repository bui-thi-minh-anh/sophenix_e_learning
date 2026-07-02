# Kế hoạch phát hành (Release Plan) — Sophenix

> Tài liệu này mô tả kế hoạch phát hành theo phiên bản, gắn với 4 giai đoạn trong [Roadmap](ROADMAP.md). Mỗi phiên bản nêu rõ nội dung và tiêu chí phát hành.

## Quy ước phiên bản

- Dùng định dạng `vMAJOR.MINOR`.
- `v0.x` = giai đoạn xây dựng MVP và hoàn thiện nội dung.
- `v1.0` = sản phẩm có nội dung và quiz chấm điểm hoàn chỉnh.
- Các phiên bản gắn nhãn **(Định hướng tương lai)** phụ thuộc giai đoạn sau.

## Bảng tổng quan các phiên bản

| Phiên bản | Tên | Gắn với GĐ | Nội dung chính | Trạng thái |
| --- | --- | --- | --- | --- |
| v0.1 | MVP nền tảng | GĐ1 | Server, API, danh sách + chi tiết bài, 2 bài mẫu | Đang/Hoàn thiện |
| v0.2 | Bài tập 4 kỹ năng | GĐ2 | Hiển thị quiz 4 kỹ năng, TTS/ASR cơ bản | Kế tiếp |
| v0.3 | Chấm điểm quiz | GĐ2 | Chấm điểm, hiển thị kết quả, thêm bài học | Kế tiếp |
| v1.0 | Nội dung hoàn chỉnh | GĐ2 | Đủ nội dung A1–B1, trải nghiệm học ổn định | Mục tiêu |
| v1.1 | Người dùng | GĐ3 | Đăng nhập, tiến độ, từ vựng yêu thích | **Định hướng tương lai** |
| v1.2 | Nâng cao | GĐ4 | Gợi ý, gamification | **Định hướng tương lai** |

---

## v0.1 — MVP nền tảng

**Nội dung:**
- Backend Express, cổng 3000, phục vụ `public/`.
- API `GET /api/lessons` và `GET /api/lessons/:id`.
- Dữ liệu `src/data/lessons.json` với 2 bài mẫu (A1 Greetings, A2 Daily Routines).
- Trang chủ, danh sách bài, chi tiết bài (lecture + vocabulary).

**Tiêu chí phát hành:**
- Mở `http://localhost:3000` thấy danh sách và mở được chi tiết bài.

## v0.2 — Bài tập 4 kỹ năng

**Nội dung:**
- Hiển thị bài tập `listening`, `speaking`, `reading`, `writing`.
- Nghe phát âm bằng Web Speech API (TTS); luyện nói bằng speech recognition.

**Tiêu chí phát hành:**
- Làm được từng dạng bài tập; nghe/nói hoạt động trên Chrome.

## v0.3 — Chấm điểm quiz

**Nội dung:**
- Chấm điểm các câu trắc nghiệm (listening, reading) so với `answer`.
- Đối chiếu writing/speaking với `sampleAnswer_en` / `modelAnswer_en`.
- Hiển thị kết quả tổng hợp; bổ sung thêm bài học.

**Tiêu chí phát hành:**
- Người học thấy điểm sau khi nộp quiz.

## v1.0 — Nội dung hoàn chỉnh

**Nội dung:**
- Đủ nội dung cho A1–B1; trải nghiệm học mượt mà, ổn định.

**Tiêu chí phát hành:**
- Đủ số bài tối thiểu mỗi trình độ; quiz chấm điểm ổn định.

## v1.1 — Người dùng *(Định hướng tương lai)*

**Nội dung:** đăng nhập, lưu tiến độ, từ vựng yêu thích. Có thể cần **cơ sở dữ liệu** (định hướng tương lai).

## v1.2 — Nâng cao *(Định hướng tương lai)*

**Nội dung:** gợi ý (có thể dùng AI), gamification (điểm/huy hiệu/streak).

## Liên kết liên quan

- [Roadmap](ROADMAP.md)
- [MVP](../07_BACKLOG/MVP.md)
- [Backlog](../07_BACKLOG/BACKLOG.md)
