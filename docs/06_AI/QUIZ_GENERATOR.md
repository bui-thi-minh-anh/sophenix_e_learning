# Prompt sinh bài tập 4 kỹ năng (listening / speaking / reading / writing)

> File này cung cấp prompt để AI sinh **phần `exercises`** cho một bài giảng — đủ 4 kỹ năng, đúng schema, và đảm bảo mọi đáp án trắc nghiệm nằm trong `options`. Dùng khi bạn đã có phần `lecture` và chỉ cần bổ sung bài tập.

## Schema phần exercises (phải tuân thủ)

```text
exercises {
  listening[] { id, audioText, question, options[], answer }   // answer ∈ options
  speaking[]  { id, prompt_vi, modelAnswer_en }                 // không có options
  reading[]   { id, passage, question, options[], answer }      // answer ∈ options
  writing[]   { id, prompt_vi, minWords, sampleAnswer_en }      // không có options
}
```

**Đặc điểm từng kỹ năng**

- **listening**: `audioText` là câu/đoạn tiếng Anh để Web Speech API (TTS) đọc lên; `question` (có thể tiếng Việt) hỏi về nội dung nghe; trắc nghiệm có `options` và `answer`.
- **speaking**: `prompt_vi` yêu cầu bằng tiếng Việt (người học nói bằng tiếng Anh, hệ thống nhận diện bằng Speech Recognition); `modelAnswer_en` là câu trả lời mẫu tiếng Anh.
- **reading**: `passage` là đoạn văn tiếng Anh; `question` + `options` + `answer` dạng trắc nghiệm.
- **writing**: `prompt_vi` đề bài tiếng Việt; `minWords` số từ tối thiểu; `sampleAnswer_en` bài mẫu tiếng Anh.

**Quy tắc bắt buộc**

- Trong `listening` và `reading`, `answer` **phải khớp đúng một phần tử trong `options`** (cùng nội dung, cùng cách viết).
- Mỗi `options` nên có 3–4 lựa chọn, chỉ 1 đáp án đúng, các đáp án sai hợp lý (không quá lố).
- Mọi `id` phải duy nhất (gợi ý: `<lessonId>-<skill>-<số>`).
- Độ khó phù hợp với cấp độ CEFR của bài (xem [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md)).

## Prompt mẫu (copy được)

```text
Bạn là giáo viên tiếng Anh, tạo bài tập 4 kỹ năng cho website Sophenix (song ngữ Anh–Việt).
Hãy trả về CHỈ JSON đúng schema "exercises" bên dưới, JSON hợp lệ, không kèm giải thích.

Thông tin bài học:
- id bài học (để đặt tiền tố id bài tập): <LESSON_ID>
- level (CEFR A1..C2): <LEVEL>
- topic: <TOPIC>
- (tuỳ chọn) từ vựng cần luyện: <danh sách từ>

Schema:
{
  "listening": [
    { "id": "<LESSON_ID>-listen-1", "audioText": "câu tiếng Anh để TTS đọc",
      "question": "câu hỏi", "options": ["...","...","...","..."],
      "answer": "phải khớp đúng 1 phần tử trong options" }
  ],
  "speaking": [
    { "id": "<LESSON_ID>-speak-1", "prompt_vi": "yêu cầu bằng tiếng Việt",
      "modelAnswer_en": "câu trả lời mẫu bằng tiếng Anh" }
  ],
  "reading": [
    { "id": "<LESSON_ID>-read-1", "passage": "đoạn văn tiếng Anh",
      "question": "câu hỏi", "options": ["...","...","...","..."],
      "answer": "phải khớp đúng 1 phần tử trong options" }
  ],
  "writing": [
    { "id": "<LESSON_ID>-write-1", "prompt_vi": "đề bài tiếng Việt",
      "minWords": 30, "sampleAnswer_en": "bài mẫu tiếng Anh" }
  ]
}

Yêu cầu:
- Mỗi kỹ năng có ít nhất 1 bài tập.
- Mọi "answer" PHẢI nằm trong "options" tương ứng.
- Độ khó phù hợp với level <LEVEL>; nội dung bám topic <TOPIC>.
```

## Ví dụ input → output

**Input**

```text
id bài học: lesson-011
level: A1
topic: Family (Gia đình)
```

**Output JSON hợp lệ (rút gọn)**

```json
{
  "listening": [
    {
      "id": "lesson-011-listen-1",
      "audioText": "This is my mother. She is a teacher.",
      "question": "Mẹ làm nghề gì?",
      "options": ["Bác sĩ", "Giáo viên", "Kỹ sư", "Đầu bếp"],
      "answer": "Giáo viên"
    }
  ],
  "speaking": [
    {
      "id": "lesson-011-speak-1",
      "prompt_vi": "Hãy giới thiệu về bố của bạn bằng tiếng Anh.",
      "modelAnswer_en": "This is my father. He is a doctor."
    }
  ],
  "reading": [
    {
      "id": "lesson-011-read-1",
      "passage": "I have a small family. There are four people: my father, my mother, my sister and me.",
      "question": "How many people are in the family?",
      "options": ["Two", "Three", "Four", "Five"],
      "answer": "Four"
    }
  ],
  "writing": [
    {
      "id": "lesson-011-write-1",
      "prompt_vi": "Viết 3–4 câu giới thiệu về gia đình của bạn.",
      "minWords": 20,
      "sampleAnswer_en": "I have a happy family. There are four people in my family. My father is a doctor and my mother is a teacher. I love them very much."
    }
  ]
}
```

## Kiểm tra trước khi đưa vào dự án

- [ ] Mọi `answer` của `listening` và `reading` nằm trong `options`.
- [ ] Tất cả `id` duy nhất, không trùng với bài tập có sẵn.
- [ ] Có đủ 4 kỹ năng, mỗi kỹ năng ≥ 1 bài.
- [ ] Độ khó hợp với `level` của bài.

Sau khi đạt, dán phần `exercises` vào đúng lesson trong `src/data/lessons.json`.

## Liên kết liên quan

- Sinh nguyên một bài giảng đầy đủ: [LESSON_GENERATOR.md](LESSON_GENERATOR.md)
- Văn phong nội dung: [CHATGPT_CONTENT_PROMPT.md](CHATGPT_CONTENT_PROMPT.md)
- Cấp độ CEFR: [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md)
- Kiến trúc & cách hiển thị bài tập: [docs/architecture.md](../architecture.md)
