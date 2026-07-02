# Khung tham chiếu CEFR (A1–C2)

Tài liệu này mô tả 6 cấp độ CEFR và cách ánh xạ chúng vào trường `level` của mỗi bài học trong Sophenix. Dùng để chọn đúng cấp độ khi biên soạn nội dung.

## CEFR là gì?

CEFR (Common European Framework of Reference for Languages) là khung tham chiếu năng lực ngoại ngữ phổ biến toàn cầu, chia thành 3 nhóm — 6 cấp:

- **A — Cơ bản (Basic User):** A1, A2
- **B — Độc lập (Independent User):** B1, B2
- **C — Thành thạo (Proficient User):** C1, C2

Trong dữ liệu, trường `level` chỉ nhận đúng một trong các giá trị: `A1`, `A2`, `B1`, `B2`, `C1`, `C2`.

## Bảng mô tả các cấp độ

| Level | Tên gọi | Năng lực kỳ vọng | Ví dụ chủ đề phù hợp |
|-------|---------|------------------|----------------------|
| A1 | Sơ cấp / Beginner | Hiểu và dùng câu cơ bản hằng ngày; giới thiệu bản thân; hỏi đáp đơn giản về thông tin cá nhân | Chào hỏi, số đếm, gia đình, màu sắc |
| A2 | Sơ trung cấp / Elementary | Giao tiếp trong tình huống quen thuộc; mô tả thói quen, môi trường xung quanh | Thói quen hằng ngày, mua sắm, chỉ đường |
| B1 | Trung cấp / Intermediate | Xử lý hầu hết tình huống khi đi du lịch; kể chuyện, nêu ý kiến đơn giản | Du lịch, kế hoạch, sở thích, kể trải nghiệm |
| B2 | Trung cao cấp / Upper-Intermediate | Hiểu ý chính văn bản phức tạp; trao đổi trôi chảy, lập luận có cấu trúc | Công việc, môi trường, công nghệ, tranh luận |
| C1 | Cao cấp / Advanced | Diễn đạt linh hoạt, hiệu quả; hiểu hàm ý; văn bản dài, phức tạp | Học thuật, kinh tế, văn hóa, phân tích |
| C2 | Thành thạo / Proficiency | Gần như bản ngữ; hiểu mọi thứ nghe/đọc; diễn đạt tinh tế, chính xác | Văn học, chuyên ngành sâu, sắc thái ngôn ngữ |

## Cách map cấp độ vào bài học

Khi soạn bài, đặt `level` theo độ khó thực tế của nội dung, không chỉ theo chủ đề:

| Yếu tố | A1–A2 | B1–B2 | C1–C2 |
|--------|-------|-------|-------|
| Độ dài câu ví dụ | Ngắn (5–10 từ) | Trung bình (10–20 từ) | Dài, nhiều mệnh đề |
| Ngữ pháp | Hiện tại đơn, to be, mạo từ | Các thì, câu điều kiện, bị động | Mệnh đề quan hệ rút gọn, đảo ngữ, hàm ý |
| Từ vựng | Tần suất cao, cụ thể | Mở rộng, một số trừu tượng | Học thuật, thành ngữ, sắc thái |
| Số phương án quiz (`options`) | 3 | 3–4 | 4 |
| `minWords` bài viết | 5–15 | 20–40 | 50+ |

### Ví dụ ánh xạ thực tế

```json
{ "id": "lesson-001", "level": "A1", "title": "Greetings — Chào hỏi" }
```
Bài Greetings dùng câu rất ngắn ("Hello, how are you?") → đúng A1.

```json
{ "id": "lesson-002", "level": "A2", "title": "Daily Routines — Thói quen hằng ngày" }
```
Bài Daily Routines dùng thì hiện tại đơn mô tả thói quen → đúng A2.

## Liên kết

- Lộ trình chủ đề theo cấp độ: [CURRICULUM.md](CURRICULUM.md)
- Chuẩn độ khó bài tập theo level: [QUIZ_STANDARD.md](QUIZ_STANDARD.md)

## Checklist chọn level

- [ ] Đã xét độ dài câu, ngữ pháp, từ vựng — không chỉ chủ đề.
- [ ] `level` là một trong A1, A2, B1, B2, C1, C2.
- [ ] Số `options` và `minWords` phù hợp bảng trên.
