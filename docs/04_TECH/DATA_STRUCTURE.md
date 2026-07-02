# Cấu trúc dữ liệu — Lesson

> Mô tả đầy đủ schema của một bài giảng (Lesson) trong `src/data/lessons.json`, kèm ví dụ JSON thật, giải thích từng trường và quy tắc hợp lệ. Đọc trước khi thêm hoặc sửa bài.

## 1. Cấu trúc gốc của file

File `src/data/lessons.json` có một object gốc với khóa `lessons` là mảng các bài:

```json
{
  "lessons": [
    { "id": "lesson-001", "...": "..." },
    { "id": "lesson-002", "...": "..." }
  ]
}
```

Server đọc qua `JSON.parse(raw).lessons` (xem `src/server.js`). Nếu cấu trúc sai (thiếu khóa `lessons` hoặc JSON lỗi), API sẽ lỗi.

## 2. Schema một Lesson

```
Lesson
├── id          (string)  — định danh DUY NHẤT, dùng trong URL ?id=
├── title       (string)  — tiêu đề song ngữ "English — Tiếng Việt"
├── level       (string)  — CEFR: A1 | A2 | B1 | B2 | C1 | C2
├── topic       (string)  — chủ đề (tiếng Việt)
├── description (string)  — mô tả ngắn (tiếng Việt)
├── lecture
│   ├── intro       (string)        — dẫn nhập
│   ├── grammar     (string)        — ngữ pháp (cho phép thẻ HTML như <b>)
│   └── vocabulary  (VocabItem[])   — danh sách từ vựng
└── exercises
    ├── listening (ListeningItem[])
    ├── speaking  (SpeakingItem[])
    ├── reading   (ReadingItem[])
    └── writing   (WritingItem[])
```

### VocabItem (mục từ vựng)

| Trường | Kiểu | Mô tả |
| --- | --- | --- |
| `word` | string | Từ/cụm tiếng Anh |
| `phonetic` | string | Phiên âm IPA, vd `/həˈloʊ/` |
| `meaning_vi` | string | Nghĩa tiếng Việt |
| `example_en` | string | Câu ví dụ tiếng Anh |
| `example_vi` | string | Dịch câu ví dụ sang tiếng Việt |

### ListeningItem (bài tập Nghe — trắc nghiệm)

| Trường | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | Định danh duy nhất trong bài, vd `l1-listen-1` |
| `audioText` | string | Đoạn tiếng Anh để trình duyệt đọc (Web Speech) |
| `question` | string | Câu hỏi (tiếng Việt) |
| `options` | string[] | Các lựa chọn |
| `answer` | string | Đáp án đúng — **phải trùng đúng một phần tử trong `options`** |

### SpeakingItem (bài tập Nói)

| Trường | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | Định danh duy nhất |
| `prompt_vi` | string | Yêu cầu cho học viên (tiếng Việt) |
| `modelAnswer_en` | string | Câu mẫu tiếng Anh; dùng để đọc mẫu và so khớp khi nói thử |

### ReadingItem (bài tập Đọc — trắc nghiệm)

| Trường | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | Định danh duy nhất |
| `passage` | string | Đoạn văn tiếng Anh |
| `question` | string | Câu hỏi (tiếng Việt) |
| `options` | string[] | Các lựa chọn |
| `answer` | string | Đáp án đúng — **phải trùng đúng một phần tử trong `options`** |

### WritingItem (bài tập Viết)

| Trường | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | Định danh duy nhất |
| `prompt_vi` | string | Yêu cầu cho học viên (tiếng Việt) |
| `minWords` | number | Số từ tối thiểu để được chấp nhận |
| `sampleAnswer_en` | string | Bài mẫu tiếng Anh (hiện sau khi nộp) |

## 3. Ví dụ JSON THẬT (lesson-001)

```json
{
  "id": "lesson-001",
  "title": "Greetings — Chào hỏi",
  "level": "A1",
  "topic": "Cuộc sống hằng ngày",
  "description": "Học cách chào hỏi, giới thiệu bản thân và hỏi thăm người khác bằng tiếng Anh.",
  "lecture": {
    "intro": "Trong bài này bạn sẽ học những câu chào hỏi cơ bản nhất...",
    "grammar": "Cấu trúc giới thiệu bản thân: <b>I'm + [tên]</b> ...",
    "vocabulary": [
      { "word": "hello", "phonetic": "/həˈloʊ/", "meaning_vi": "xin chào", "example_en": "Hello, how are you?", "example_vi": "Xin chào, bạn khỏe không?" }
    ]
  },
  "exercises": {
    "listening": [
      {
        "id": "l1-listen-1",
        "audioText": "Hello, my name is Anna. Nice to meet you.",
        "question": "Tên của người nói là gì?",
        "options": ["Anna", "Emma", "Anny"],
        "answer": "Anna"
      }
    ],
    "speaking": [
      {
        "id": "l1-speak-1",
        "prompt_vi": "Hãy nói câu: 'Xin chào, tôi tên là ...' bằng tiếng Anh.",
        "modelAnswer_en": "Hello, my name is ..."
      }
    ],
    "reading": [
      {
        "id": "l1-read-1",
        "passage": "Hi! My name is Tom. I am from England. I am a student. Nice to meet you!",
        "question": "Tom đến từ đâu?",
        "options": ["America", "England", "Vietnam"],
        "answer": "England"
      }
    ],
    "writing": [
      {
        "id": "l1-write-1",
        "prompt_vi": "Viết 1-2 câu tự giới thiệu bản thân bằng tiếng Anh (tên và quê quán).",
        "minWords": 5,
        "sampleAnswer_en": "Hello, my name is Minh. I am from Vietnam."
      }
    ]
  }
}
```

## 4. Quy tắc hợp lệ (BẮT BUỘC kiểm tra)

1. **JSON hợp lệ**: file phải parse được; mọi chuỗi đặt trong dấu nháy kép `"`. Không có dấu phẩy thừa ở cuối mảng/object.
2. **`id` lesson duy nhất**: không trùng với bài khác (dùng cho URL `?id=`).
3. **`id` bài tập duy nhất** trong cùng một bài.
4. **`level` thuộc CEFR**: A1, A2, B1, B2, C1, C2.
5. **Đáp án nằm trong options**: với Nghe và Đọc, `answer` phải khớp **chính xác** (kể cả dấu, hoa thường) một phần tử trong `options` — nếu không, học viên không thể chọn đúng.
6. **Từ vựng đủ trường**: mỗi `VocabItem` nên có đủ `word`, `phonetic`, `meaning_vi`, `example_en`, `example_vi`.
7. **Bốn kỹ năng đều có mảng**: `listening`, `speaking`, `reading`, `writing` đều tồn tại (có thể có ≥1 phần tử).
8. **`minWords` là số dương** hợp lý so với `prompt_vi`.
9. **Lưu ý HTML trong `grammar`/nội dung**: được render trực tiếp (innerHTML). Chỉ dùng thẻ định dạng đơn giản (`<b>`), không chèn nội dung không tin cậy.

## 5. Cách thêm bài mới (tóm tắt)

1. Mở `src/data/lessons.json`.
2. Sao chép một khối lesson có sẵn, dán vào cuối mảng `lessons`.
3. Đổi `id` thành giá trị mới, sửa toàn bộ nội dung.
4. Kiểm tra theo mục 4 ở trên.
5. Tải lại trang (không cần khởi động lại server vì đọc file mỗi request).

> Có thể dùng skill tạo bài học trong `.claude/skills/`.

## Liên kết liên quan

- Kiến trúc: [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md)
- Kế hoạch test dữ liệu: [../05_QA/TEST_PLAN.md](../05_QA/TEST_PLAN.md)
