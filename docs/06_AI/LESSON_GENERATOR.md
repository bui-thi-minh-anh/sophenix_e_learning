# Prompt sinh MỘT bài giảng (lesson) hoàn chỉnh đúng schema JSON

> File này cung cấp prompt để AI sinh ra **một lesson hoàn chỉnh** đúng đúng cấu trúc JSON của `src/data/lessons.json`, dán thẳng vào file là dùng được. Có placeholder cho `level` / `topic` và ví dụ output JSON hợp lệ.

## Schema một Lesson (phải tuân thủ tuyệt đối)

```text
lesson {
  id            // chuỗi duy nhất, ví dụ "lesson-010"
  title         // tiêu đề song ngữ, ví dụ "Shopping — Mua sắm"
  level         // CEFR: A1 | A2 | B1 | B2 | C1 | C2
  topic         // chủ đề, ví dụ "Cuộc sống hằng ngày"
  description   // mô tả ngắn bằng tiếng Việt
  lecture {
    intro       // giới thiệu bài học (tiếng Việt)
    grammar     // giải thích ngữ pháp (tiếng Việt; cho phép thẻ <b>)
    vocabulary[] // danh sách từ vựng (xem dưới)
  }
  exercises {
    listening[] { id, audioText, question, options[], answer }
    speaking[]  { id, prompt_vi, modelAnswer_en }
    reading[]   { id, passage, question, options[], answer }
    writing[]   { id, prompt_vi, minWords, sampleAnswer_en }
  }
}

vocabulary item {
  word          // từ tiếng Anh
  phonetic      // phiên âm IPA, ví dụ "/ˈʃɒpɪŋ/"
  meaning_vi    // nghĩa tiếng Việt
  example_en    // câu ví dụ tiếng Anh
  example_vi    // bản dịch tiếng Việt của câu ví dụ
}
```

**Quy tắc bắt buộc**

- Mọi `answer` trong `listening` và `reading` **phải khớp đúng một phần tử trong `options`**.
- Từ vựng phải có **phiên âm IPA** và **ví dụ song ngữ** (`example_en` + `example_vi`).
- `level` quyết định độ khó: chọn từ vựng và câu phù hợp CEFR (xem [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md)).
- `id` của lesson và của từng exercise phải duy nhất.
- Văn phong giải thích bằng tiếng Việt (xem [CHATGPT_CONTENT_PROMPT.md](CHATGPT_CONTENT_PROMPT.md)).

## Prompt mẫu (copy được)

```text
Bạn là giáo viên tiếng Anh soạn nội dung song ngữ Anh–Việt cho website Sophenix.
Hãy sinh ra MỘT bài giảng (lesson) hoàn chỉnh dưới dạng JSON đúng schema bên dưới,
KHÔNG kèm giải thích, CHỈ trả về JSON hợp lệ (không có dấu phẩy thừa).

Thông số:
- id: <ví dụ "lesson-010">
- level (CEFR A1..C2): <LEVEL>
- topic: <TOPIC>

Schema:
{
  "id": "...",
  "title": "Tiếng Anh — Tiếng Việt",
  "level": "<LEVEL>",
  "topic": "<TOPIC>",
  "description": "mô tả ngắn bằng tiếng Việt",
  "lecture": {
    "intro": "giới thiệu bài học bằng tiếng Việt",
    "grammar": "giải thích ngữ pháp bằng tiếng Việt, có thể dùng <b>...</b>",
    "vocabulary": [
      { "word": "...", "phonetic": "/.../", "meaning_vi": "...",
        "example_en": "...", "example_vi": "..." }
    ]
  },
  "exercises": {
    "listening": [
      { "id": "...", "audioText": "...", "question": "...",
        "options": ["...","...","...","..."], "answer": "phải nằm trong options" }
    ],
    "speaking": [
      { "id": "...", "prompt_vi": "...", "modelAnswer_en": "..." }
    ],
    "reading": [
      { "id": "...", "passage": "...", "question": "...",
        "options": ["...","...","...","..."], "answer": "phải nằm trong options" }
    ],
    "writing": [
      { "id": "...", "prompt_vi": "...", "minWords": 30, "sampleAnswer_en": "..." }
    ]
  }
}

Yêu cầu:
- Từ vựng: 4–8 mục, mỗi mục có IPA + ví dụ song ngữ.
- Mỗi kỹ năng có ít nhất 1 bài tập.
- Mọi "answer" phải khớp đúng một phần tử trong "options".
- Độ khó phù hợp với level <LEVEL>.
```

## Ví dụ output JSON hợp lệ

```json
{
  "id": "lesson-010",
  "title": "Shopping — Mua sắm",
  "level": "A2",
  "topic": "Cuộc sống hằng ngày",
  "description": "Học từ vựng và mẫu câu thường dùng khi đi mua sắm bằng tiếng Anh.",
  "lecture": {
    "intro": "Trong bài này bạn sẽ học cách hỏi giá, chọn món và thanh toán khi mua sắm.",
    "grammar": "Hỏi giá: <b>How much is this?</b> (Cái này bao nhiêu tiền?). Muốn mua: <b>I'll take it.</b> (Tôi sẽ lấy nó).",
    "vocabulary": [
      { "word": "price", "phonetic": "/praɪs/", "meaning_vi": "giá", "example_en": "What's the price of this shirt?", "example_vi": "Cái áo này giá bao nhiêu?" },
      { "word": "cheap", "phonetic": "/tʃiːp/", "meaning_vi": "rẻ", "example_en": "This bag is very cheap.", "example_vi": "Cái túi này rất rẻ." },
      { "word": "expensive", "phonetic": "/ɪkˈspensɪv/", "meaning_vi": "đắt", "example_en": "The watch is too expensive.", "example_vi": "Cái đồng hồ này quá đắt." },
      { "word": "pay", "phonetic": "/peɪ/", "meaning_vi": "trả tiền", "example_en": "Can I pay by card?", "example_vi": "Tôi trả bằng thẻ được không?" }
    ]
  },
  "exercises": {
    "listening": [
      {
        "id": "l10-listen-1",
        "audioText": "How much is this shirt? It is twenty dollars.",
        "question": "Cái áo giá bao nhiêu?",
        "options": ["10 đô", "20 đô", "30 đô", "40 đô"],
        "answer": "20 đô"
      }
    ],
    "speaking": [
      {
        "id": "l10-speak-1",
        "prompt_vi": "Hãy hỏi giá của một chiếc áo bằng tiếng Anh.",
        "modelAnswer_en": "How much is this shirt?"
      }
    ],
    "reading": [
      {
        "id": "l10-read-1",
        "passage": "Lan is at the market. She wants to buy a bag. The bag is cheap, only ten dollars. She pays by card.",
        "question": "How does Lan pay?",
        "options": ["By cash", "By card", "By check", "By phone"],
        "answer": "By card"
      }
    ],
    "writing": [
      {
        "id": "l10-write-1",
        "prompt_vi": "Viết một đoạn ngắn (ít nhất 30 từ) kể về một lần bạn đi mua sắm.",
        "minWords": 30,
        "sampleAnswer_en": "Last weekend I went shopping with my friend. We visited a big mall and looked at many shops. I bought a cheap blue shirt for twenty dollars. It was a fun day and I paid by card."
      }
    ]
  }
}
```

## Cách dùng kết quả

1. Yêu cầu AI sinh JSON đúng schema ở trên.
2. Mở `src/data/lessons.json`, thêm object lesson mới vào mảng `lessons` (nhớ dấu phẩy ngăn cách).
3. Kiểm tra `id` không trùng và mọi `answer` nằm trong `options`.
4. Chạy `npm start` và kiểm tra bài giảng hiển thị tại trang chi tiết.

## Liên kết liên quan

- Chỉ sinh phần bài tập: [QUIZ_GENERATOR.md](QUIZ_GENERATOR.md)
- Văn phong nội dung: [CHATGPT_CONTENT_PROMPT.md](CHATGPT_CONTENT_PROMPT.md)
- Cấp độ CEFR: [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md)
- Kiến trúc dữ liệu: [docs/architecture.md](../architecture.md)
