# Chuẩn bài tập / Quiz

Tài liệu này quy định định dạng, số lượng phương án, quy tắc đáp án và độ khó theo cấp độ cho 4 loại bài tập: Nghe, Nói, Đọc, Viết. Kèm ví dụ JSON cho từng loại.

## Quy tắc chung cho mọi quiz

- Mỗi bài tập có `id` duy nhất trong toàn file (gợi ý: `l1-listen-1`).
- Đề bài và câu hỏi viết bằng **tiếng Việt**; nội dung tiếng Anh nằm ở `audioText`, `passage`, `modelAnswer_en`, `sampleAnswer_en`.
- **Quy tắc đáp án vàng:** với bài trắc nghiệm (`listening`, `reading`), giá trị `answer` **bắt buộc** là một chuỗi trùng khớp chính xác một phần tử trong `options`.

## 1. Listening — Nghe

Người học nghe `audioText` đọc bằng Web Speech API (TTS) rồi chọn đáp án.

| Trường | Mô tả |
|--------|-------|
| `id` | Định danh |
| `audioText` | Câu/đoạn tiếng Anh sẽ được đọc thành tiếng |
| `question` | Câu hỏi (tiếng Việt) |
| `options` | Mảng phương án (3 ở A1–A2, 3–4 ở B, 4 ở C) |
| `answer` | Đáp án đúng — phải nằm trong `options` |

```json
{
  "id": "l3-listen-1",
  "audioText": "The train leaves at half past nine.",
  "question": "Tàu khởi hành lúc mấy giờ?",
  "options": ["9 giờ", "9 giờ 30", "10 giờ"],
  "answer": "9 giờ 30"
}
```

## 2. Speaking — Nói

Người học đọc to câu theo `prompt_vi`; Web Speech API (speech recognition) so với `modelAnswer_en`.

| Trường | Mô tả |
|--------|-------|
| `id` | Định danh |
| `prompt_vi` | Yêu cầu nói (tiếng Việt), nêu rõ câu cần nói |
| `modelAnswer_en` | Câu mẫu tiếng Anh để đối chiếu |

```json
{
  "id": "l3-speak-1",
  "prompt_vi": "Hãy nói câu: 'Tôi đi làm bằng xe buýt' bằng tiếng Anh.",
  "modelAnswer_en": "I go to work by bus."
}
```

> Lưu ý: `modelAnswer_en` nên ngắn, rõ ràng, đúng một câu để nhận dạng giọng nói chính xác hơn.

## 3. Reading — Đọc

Người học đọc `passage` rồi trả lời trắc nghiệm.

| Trường | Mô tả |
|--------|-------|
| `id` | Định danh |
| `passage` | Đoạn văn tiếng Anh |
| `question` | Câu hỏi (tiếng Việt) |
| `options` | Mảng phương án |
| `answer` | Đáp án đúng — phải nằm trong `options` |

```json
{
  "id": "l3-read-1",
  "passage": "Lan gets up early. She drinks coffee and reads the news before work.",
  "question": "Lan làm gì trước khi đi làm?",
  "options": ["Xem TV", "Uống cà phê và đọc tin tức", "Đi dạo"],
  "answer": "Uống cà phê và đọc tin tức"
}
```

## 4. Writing — Viết

Người học viết theo `prompt_vi`; hệ thống kiểm tra số từ tối thiểu `minWords`, có `sampleAnswer_en` để tham khảo.

| Trường | Mô tả |
|--------|-------|
| `id` | Định danh |
| `prompt_vi` | Đề bài viết (tiếng Việt) |
| `minWords` | Số từ tối thiểu yêu cầu (số nguyên) |
| `sampleAnswer_en` | Bài viết mẫu tiếng Anh |

```json
{
  "id": "l3-write-1",
  "prompt_vi": "Viết 2-3 câu mô tả buổi sáng của bạn bằng tiếng Anh.",
  "minWords": 12,
  "sampleAnswer_en": "I get up at six. I have breakfast and then I go to work."
}
```

## Độ khó theo cấp độ CEFR

| Yếu tố | A1–A2 | B1–B2 | C1–C2 |
|--------|-------|-------|-------|
| Số `options` | 3 | 3–4 | 4 |
| Độ dài `audioText` / `passage` | 1 câu ngắn | 2–4 câu | đoạn nhiều câu |
| `minWords` (writing) | 5–15 | 20–40 | 50+ |
| Tính chất câu hỏi | Tìm thông tin trực tiếp | Suy luận đơn giản | Suy luận, hàm ý |

## Lỗi thường gặp cần tránh

- ❌ `answer` không khớp bất kỳ phần tử nào trong `options` (kể cả khác hoa/thường, dư dấu cách).
- ❌ `options` chỉ có 1–2 phương án.
- ❌ Trùng `id` giữa các bài tập.
- ❌ Trộn ngôn ngữ: đề bài lẫn tiếng Anh ở `question`/`prompt_vi`.
- ❌ `minWords` lớn hơn độ dài thực tế của `sampleAnswer_en`.

## Liên kết

- Cấu trúc tổng thể bài học: [LESSON_STANDARD.md](LESSON_STANDARD.md)
- Chọn level và độ khó: [CEFR_FRAMEWORK.md](CEFR_FRAMEWORK.md)

## Checklist kiểm tra quiz

- [ ] Mỗi `answer` trắc nghiệm nằm trong `options` (khớp tuyệt đối).
- [ ] Số `options` đúng theo level.
- [ ] `id` duy nhất.
- [ ] Đề bài bằng tiếng Việt; nội dung tiếng Anh đúng chỗ.
- [ ] `minWords` ≤ độ dài `sampleAnswer_en`.
