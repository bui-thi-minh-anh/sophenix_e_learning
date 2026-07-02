# Chương trình học (Curriculum)

Tài liệu này phác thảo lộ trình chủ đề từ A1 đến C2 và thứ tự bài học khuyến nghị cho Sophenix. Dùng để lập kế hoạch nội dung và đảm bảo tính liền mạch giữa các bài.

## Nguyên tắc xây dựng lộ trình

- Đi từ A1 → C2, từ chủ đề cụ thể đến trừu tượng.
- Mỗi cấp độ có một nhóm chủ đề lõi; chủ đề lặp lại ở cấp cao hơn với độ khó tăng dần (lặp lại ngắt quãng theo chiều sâu).
- Mỗi bài học có `id` duy nhất dạng `lesson-NNN` và một `topic` mô tả chủ đề.

## Bảng lộ trình chủ đề theo cấp độ

| Level | Nhóm chủ đề lõi | Ví dụ bài học (topic) |
|-------|-----------------|------------------------|
| A1 | Nền tảng sinh tồn | Chào hỏi, Số đếm & thời gian, Gia đình, Màu sắc & đồ vật, Đồ ăn cơ bản |
| A2 | Cuộc sống thường nhật | Thói quen hằng ngày, Mua sắm, Chỉ đường, Thời tiết, Sở thích |
| B1 | Giao tiếp mở rộng | Du lịch, Kế hoạch tương lai, Kể trải nghiệm, Sức khỏe, Công việc cơ bản |
| B2 | Chủ đề xã hội | Môi trường, Công nghệ, Truyền thông, Giáo dục, Tranh luận quan điểm |
| C1 | Tư duy phản biện | Kinh tế, Văn hóa, Khoa học, Nghệ thuật, Phân tích vấn đề |
| C2 | Tinh tế & chuyên sâu | Văn học, Triết học, Chuyên ngành, Sắc thái & thành ngữ |

## Thứ tự bài học khuyến nghị

Người học hoàn thành theo thứ tự `level` rồi tới thứ tự trong cùng cấp:

1. **A1** (`lesson-001` …): khởi đầu — đã có *Greetings — Chào hỏi*.
2. **A2** (`lesson-002` …): xây trên A1 — đã có *Daily Routines — Thói quen hằng ngày*.
3. **B1**: yêu cầu nắm vững các thì cơ bản và 4 kỹ năng ở mức A2.
4. **B2 → C1 → C2**: tăng dần độ phức tạp ngữ pháp và độ trừu tượng từ vựng.

### Trạng thái hiện tại

| id | Level | Topic | Tiêu đề |
|----|-------|-------|---------|
| lesson-001 | A1 | Cuộc sống hằng ngày | Greetings — Chào hỏi |
| lesson-002 | A2 | Cuộc sống hằng ngày | Daily Routines — Thói quen hằng ngày |

> Khi thêm bài mới, tăng số thứ tự `id` và điền vào bảng này để theo dõi tiến độ chương trình.

## Gợi ý mật độ nội dung mỗi cấp

| Level | Số bài khuyến nghị | Từ vựng / bài | Trọng tâm |
|-------|--------------------|----------------|-----------|
| A1 | 8–10 | 4–6 | Phản xạ câu cơ bản |
| A2 | 8–10 | 5–7 | Thói quen, thì hiện tại |
| B1 | 10–12 | 6–8 | Diễn đạt ý kiến, kể chuyện |
| B2 | 10–12 | 7–10 | Lập luận, chủ đề xã hội |
| C1 | 8–10 | 8–12 | Phân tích, học thuật |
| C2 | 6–8 | 10+ | Sắc thái, chuyên sâu |

## Liên kết

- Chi tiết từng cấp độ: [CEFR_FRAMEWORK.md](CEFR_FRAMEWORK.md)
- Chuẩn cấu trúc một bài: [LESSON_STANDARD.md](LESSON_STANDARD.md)
- Hướng dẫn biên soạn: [CONTENT_GUIDELINE.md](CONTENT_GUIDELINE.md)

## Checklist khi thêm bài vào chương trình

- [ ] `id` duy nhất, đúng định dạng `lesson-NNN`.
- [ ] `level` và `topic` khớp lộ trình ở bảng trên.
- [ ] Đã cập nhật bảng "Trạng thái hiện tại".
