# Chuẩn một bài giảng (Lesson Standard)

Tài liệu này quy định cấu trúc bắt buộc của một bài học trong `src/data/lessons.json`, số lượng tối thiểu của từng phần và kèm một ví dụ JSON đầy đủ đúng schema. Tuân thủ để mọi bài học đồng nhất và hoạt động được trên web.

## Cấu trúc tổng thể của một Lesson

Mỗi phần tử trong mảng `lessons` phải có đầy đủ các trường sau:

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `id` | string | ✅ | Định danh duy nhất, dạng `lesson-NNN` |
| `title` | string | ✅ | Tiêu đề song ngữ, dạng `English — Tiếng Việt` |
| `level` | string | ✅ | Cấp CEFR: `A1`..`C2` |
| `topic` | string | ✅ | Chủ đề bài học (tiếng Việt) |
| `description` | string | ✅ | Mô tả ngắn (tiếng Việt) |
| `lecture` | object | ✅ | Nội dung giảng: `intro`, `grammar`, `vocabulary[]` |
| `exercises` | object | ✅ | 4 mảng kỹ năng: `listening`, `speaking`, `reading`, `writing` |

### Phần `lecture`

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `intro` | string | Giới thiệu bài học bằng tiếng Việt |
| `grammar` | string | Giải thích ngữ pháp; cho phép thẻ `<b>` để in đậm điểm chính |
| `vocabulary` | array | Danh sách từ vựng (xem dưới) |

### Một mục `vocabulary`

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| `word` | ✅ | Từ/cụm tiếng Anh |
| `phonetic` | ✅ | Phiên âm IPA, đặt trong dấu `/ /` |
| `meaning_vi` | ✅ | Nghĩa tiếng Việt |
| `example_en` | ✅ | Câu ví dụ tiếng Anh |
| `example_vi` | ✅ | Bản dịch tiếng Việt của câu ví dụ |

> Quy tắc vàng: **mỗi từ vựng phải có phiên âm và ít nhất 1 ví dụ song ngữ**.

## Số lượng tối thiểu

| Thành phần | Tối thiểu | Khuyến nghị |
|------------|-----------|-------------|
| Từ vựng (`vocabulary`) | 4 | 4–8 (tăng theo level) |
| `listening` | 1 | 2 |
| `speaking` | 1 | 2 |
| `reading` | 1 | 1–2 |
| `writing` | 1 | 1 |

> Bài học **không hợp lệ** nếu thiếu bất kỳ một trong 4 mảng kỹ năng, kể cả khi chỉ có 1 phần tử.

## Quy tắc cấu trúc bài tập (tóm tắt)

- `listening[]`: `{ id, audioText, question, options[], answer }`
- `speaking[]`: `{ id, prompt_vi, modelAnswer_en }`
- `reading[]`: `{ id, passage, question, options[], answer }`
- `writing[]`: `{ id, prompt_vi, minWords, sampleAnswer_en }`
- Với bài trắc nghiệm (listening, reading): `answer` **phải** nằm trong `options`.

Chi tiết và độ khó theo level: xem [QUIZ_STANDARD.md](QUIZ_STANDARD.md).

## Quy ước `id` bài tập

Định dạng gợi ý: `l<số bài>-<kỹ năng>-<số thứ tự>`, ví dụ `l1-listen-1`, `l2-read-1`. Mỗi `id` phải duy nhất trong toàn bộ file.

## Ví dụ JSON một Lesson đầy đủ (đúng schema)

```json
{
  "id": "lesson-003",
  "title": "Family — Gia đình",
  "level": "A1",
  "topic": "Gia đình",
  "description": "Học từ vựng về các thành viên trong gia đình và cách giới thiệu họ.",
  "lecture": {
    "intro": "Bài này giúp bạn gọi tên các thành viên trong gia đình và giới thiệu họ bằng tiếng Anh.",
    "grammar": "Dùng sở hữu cách với <b>my</b> (của tôi): <b>This is my mother.</b> (Đây là mẹ của tôi.)",
    "vocabulary": [
      { "word": "mother", "phonetic": "/ˈmʌðər/", "meaning_vi": "mẹ", "example_en": "This is my mother.", "example_vi": "Đây là mẹ của tôi." },
      { "word": "father", "phonetic": "/ˈfɑːðər/", "meaning_vi": "bố", "example_en": "My father is a teacher.", "example_vi": "Bố tôi là giáo viên." },
      { "word": "brother", "phonetic": "/ˈbrʌðər/", "meaning_vi": "anh/em trai", "example_en": "I have one brother.", "example_vi": "Tôi có một người anh trai." },
      { "word": "sister", "phonetic": "/ˈsɪstər/", "meaning_vi": "chị/em gái", "example_en": "My sister is ten.", "example_vi": "Em gái tôi mười tuổi." }
    ]
  },
  "exercises": {
    "listening": [
      {
        "id": "l3-listen-1",
        "audioText": "This is my mother. She is a doctor.",
        "question": "Mẹ của người nói làm nghề gì?",
        "options": ["Giáo viên", "Bác sĩ", "Học sinh"],
        "answer": "Bác sĩ"
      }
    ],
    "speaking": [
      {
        "id": "l3-speak-1",
        "prompt_vi": "Hãy nói câu: 'Đây là bố của tôi' bằng tiếng Anh.",
        "modelAnswer_en": "This is my father."
      }
    ],
    "reading": [
      {
        "id": "l3-read-1",
        "passage": "I have a small family. My father is a teacher and my mother is a nurse. I have one sister.",
        "question": "Người viết có mấy chị/em gái?",
        "options": ["Một", "Hai", "Không có"],
        "answer": "Một"
      }
    ],
    "writing": [
      {
        "id": "l3-write-1",
        "prompt_vi": "Viết 2 câu giới thiệu gia đình của bạn bằng tiếng Anh.",
        "minWords": 8,
        "sampleAnswer_en": "I have a small family. My mother is a teacher."
      }
    ]
  }
}
```

## Liên kết

- Chuẩn quiz từng kỹ năng: [QUIZ_STANDARD.md](QUIZ_STANDARD.md)
- Hướng dẫn biên soạn: [CONTENT_GUIDELINE.md](CONTENT_GUIDELINE.md)
- Chọn level: [CEFR_FRAMEWORK.md](CEFR_FRAMEWORK.md)

## Checklist trước khi xuất bản

- [ ] Đủ 7 trường gốc; `id` duy nhất; `title` song ngữ.
- [ ] `lecture` có `intro`, `grammar`, `vocabulary` (≥ 4 mục).
- [ ] Mỗi từ vựng có `phonetic` và 1 ví dụ song ngữ.
- [ ] Đủ 4 mảng kỹ năng, mỗi mảng ≥ 1 phần tử.
- [ ] Mọi `answer` trắc nghiệm nằm trong `options`.
- [ ] JSON hợp lệ (chạy được, không lỗi cú pháp).
