# Triết lý dạy và học

Tài liệu này nêu các nguyên tắc giáo dục cốt lõi của Sophenix, làm kim chỉ nam khi biên soạn mọi bài học. Mục tiêu: giúp người Việt học tiếng Anh hiệu quả, bền vững thông qua nội dung song ngữ Anh–Việt.

## 1. Học toàn diện qua 4 kỹ năng

Mỗi bài học bắt buộc rèn luyện đủ 4 kỹ năng để người học không "lệch" một mặt nào:

| Kỹ năng | Trong dự án | Công nghệ hỗ trợ |
|---------|-------------|------------------|
| Nghe (Listening) | Câu hỏi trắc nghiệm dựa trên `audioText` | Web Speech API — Text-to-Speech (TTS) |
| Nói (Speaking) | Đọc theo `prompt_vi`, đối chiếu `modelAnswer_en` | Web Speech API — Speech Recognition |
| Đọc (Reading) | Đọc `passage` rồi trả lời trắc nghiệm | Hiển thị trực tiếp trên trang |
| Viết (Writing) | Viết theo `prompt_vi`, tham khảo `sampleAnswer_en` | Đếm số từ tối thiểu (`minWords`) |

> Nguyên tắc: không xuất bản bài học nào thiếu một trong 4 kỹ năng. Xem chuẩn chi tiết tại [LESSON_STANDARD.md](LESSON_STANDARD.md).

## 2. Song ngữ Anh–Việt

- Mọi giải thích, đề bài, mô tả dùng **tiếng Việt** để người mới không bị quá tải.
- Mọi từ vựng và ví dụ đều có **bản tiếng Anh kèm bản dịch tiếng Việt** (`example_en` / `example_vi`).
- Tiếng Việt là cầu nối; mục tiêu cuối cùng vẫn là người học suy nghĩ và phản xạ bằng tiếng Anh.

## 3. Từ dễ đến khó theo CEFR

- Nội dung được phân cấp theo khung CEFR từ A1 đến C2 (trường `level`).
- Người học bắt đầu từ A1, chỉ lên cấp khi đã vững nền tảng.
- Chi tiết khung: [CEFR_FRAMEWORK.md](CEFR_FRAMEWORK.md); lộ trình chủ đề: [CURRICULUM.md](CURRICULUM.md).

## 4. Lặp lại ngắt quãng (Spaced Repetition)

Học một lần là không đủ. Triết lý của chúng tôi:

- Từ vựng và cấu trúc cần được gặp lại nhiều lần, giãn dần khoảng cách.
- Bài tập quiz đóng vai trò "kiểm tra chủ động" (active recall) — nhớ tốt hơn đọc lại thụ động.
- Định hướng phát triển hệ thống ôn tập tự động: [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md).

## 5. Học qua ngữ cảnh thật

- Từ vựng luôn đi kèm ít nhất một ví dụ trong câu hoàn chỉnh, không học từ rời rạc.
- Ví dụ chọn tình huống đời thường, gần gũi với người Việt.
- Ngữ pháp giải thích ngắn gọn, có ví dụ minh họa, dùng thẻ `<b>` để làm nổi bật điểm chính.

## 6. Tôn trọng động lực người học

- Đề bài rõ ràng, không đánh đố.
- Phản hồi tích cực: tập trung vào "đúng/gần đúng" thay vì chỉ phạt lỗi sai.
- Mỗi bài học vừa sức trong 10–15 phút để duy trì thói quen học mỗi ngày.

## Tóm tắt nguyên tắc

- [ ] Đủ 4 kỹ năng trong mỗi bài.
- [ ] Song ngữ Anh–Việt, có phiên âm và ví dụ.
- [ ] Phân cấp CEFR, đi từ dễ đến khó.
- [ ] Thiết kế hỗ trợ lặp lại ngắt quãng.
- [ ] Ngữ cảnh thật, vừa sức, tạo động lực.
