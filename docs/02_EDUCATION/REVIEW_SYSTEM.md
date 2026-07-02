# Hệ thống ôn tập và đánh giá

Tài liệu này mô tả cách chấm điểm quiz hiện tại, cách theo dõi tiến độ, và định hướng tương lai về lặp lại ngắt quãng (spaced repetition) cho Sophenix.

## 1. Cách chấm điểm quiz hiện tại

Việc chấm diễn ra ở frontend (HTML/CSS/JS thuần), dựa trên dữ liệu trong `src/data/lessons.json`.

| Kỹ năng | Cách đánh giá | Tiêu chí đúng |
|---------|---------------|---------------|
| Listening | So `option` người chọn với `answer` | Trùng khớp `answer` |
| Reading | So `option` người chọn với `answer` | Trùng khớp `answer` |
| Speaking | Web Speech API nhận dạng giọng, so với `modelAnswer_en` | Văn bản nhận dạng khớp/gần khớp câu mẫu |
| Writing | Kiểm tra số từ ≥ `minWords`; đối chiếu `sampleAnswer_en` để tự tham khảo | Đạt số từ tối thiểu; người học tự so sánh |

> Vì `answer` luôn nằm trong `options` (xem [QUIZ_STANDARD.md](QUIZ_STANDARD.md)), việc chấm trắc nghiệm là so khớp chuỗi đơn giản và chính xác.

### Quy ước tính điểm gợi ý

- Mỗi câu trắc nghiệm đúng: 1 điểm.
- Speaking: tính đạt nếu mức tương đồng đủ cao (chuẩn hóa chữ thường, bỏ dấu câu trước khi so).
- Writing: tính đạt khi đủ `minWords`; chất lượng do người học tự đánh giá qua `sampleAnswer_en`.
- Điểm bài = tổng câu đạt / tổng câu, hiển thị dạng phần trăm.

## 2. Theo dõi tiến độ

Định hướng theo dõi (đặt mục tiêu kỹ thuật cho roadmap):

- Ghi nhận bài đã hoàn thành và điểm mỗi kỹ năng.
- Đánh dấu bài "đã thuộc" khi đạt ngưỡng (vd ≥ 80%).
- Hiển thị tiến độ theo cấp độ CEFR và theo chủ đề ([CURRICULUM.md](CURRICULUM.md)).

| Chỉ số theo dõi | Mục đích |
|-----------------|----------|
| Số bài hoàn thành / tổng | Tiến độ chương trình |
| Điểm trung bình mỗi kỹ năng | Phát hiện kỹ năng yếu |
| Từ vựng đã gặp / đã thuộc | Đầu vào cho ôn tập |
| Chuỗi ngày học (streak) | Duy trì động lực |

## 3. Lặp lại ngắt quãng (Spaced Repetition) — định hướng tương lai

Hiện tại bài học là tuyến tính. Định hướng nâng cấp để củng cố trí nhớ dài hạn:

### Nguyên lý

Ôn lại một mục ngay trước khi sắp quên giúp ghi nhớ hiệu quả hơn. Khoảng cách ôn giãn dần theo mức độ thành thạo.

### Lịch ôn gợi ý

| Lần ôn | Khoảng cách kể từ lần trước | Khi nào áp dụng |
|--------|------------------------------|------------------|
| 1 | 1 ngày | Sau khi học lần đầu |
| 2 | 3 ngày | Nếu lần 1 đạt |
| 3 | 7 ngày | Nếu lần 2 đạt |
| 4 | 16 ngày | Nếu lần 3 đạt |
| 5 | 35 ngày | Củng cố dài hạn |

> Nếu một mục bị sai, đặt lại khoảng cách về mức ngắn (1 ngày).

### Hướng triển khai (gợi ý, chưa hiện thực)

- Tận dụng các mục `vocabulary` làm đơn vị ôn tập nhỏ nhất.
- Lưu trạng thái mỗi từ: lần ôn gần nhất, khoảng cách kế tiếp, số lần đúng/sai.
- Tạo "phiên ôn tập" hằng ngày gồm các từ đến hạn, kiểm tra bằng quiz active recall (nhớ chủ động).

## Liên kết

- Triết lý lặp lại ngắt quãng: [LEARNING_PHILOSOPHY.md](LEARNING_PHILOSOPHY.md)
- Chuẩn quiz làm cơ sở chấm điểm: [QUIZ_STANDARD.md](QUIZ_STANDARD.md)
- Lộ trình chương trình: [CURRICULUM.md](CURRICULUM.md)

## Checklist khi phát triển tính năng ôn tập

- [ ] Chấm trắc nghiệm dựa trên so khớp `answer` trong `options`.
- [ ] Speaking/Writing có tiêu chí đạt rõ ràng.
- [ ] Lưu tiến độ theo bài, kỹ năng, từ vựng.
- [ ] Khi làm spaced repetition: theo lịch giãn dần, reset khi sai.
