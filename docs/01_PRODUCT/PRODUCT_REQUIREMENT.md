# Yêu cầu sản phẩm (PRD) — Sophenix

> Tài liệu này mô tả các tính năng chính cùng yêu cầu chức năng và phi chức năng của Sophenix — website giúp người Việt học tiếng Anh, nội dung song ngữ Anh–Việt.

## 1. Tổng quan sản phẩm

Sophenix là website học tiếng Anh gồm: bài giảng song ngữ, từ vựng, bài tập 4 kỹ năng
(Nghe, Nói, Đọc, Viết) và theo dõi tiến độ (định hướng). Backend Node.js + Express phục vụ
API và file tĩnh; frontend HTML/CSS/JS thuần; dữ liệu lưu trong `src/data/lessons.json`.

## 2. Tính năng chính

### 2.1 Danh sách bài giảng
- Hiển thị tóm tắt các bài: `title`, `level` (CEFR), `topic`, `description`.
- Dữ liệu lấy từ `GET /api/lessons`.

### 2.2 Chi tiết bài giảng
- Hiển thị `lecture`: `intro`, `grammar`, và danh sách `vocabulary[]`.
- Mỗi từ vựng: `word`, `phonetic`, `meaning_vi`, `example_en`, `example_vi`.
- Dữ liệu lấy từ `GET /api/lessons/:id`.

### 2.3 Từ vựng
- Hiển thị bảng từ vựng song ngữ với phiên âm và ví dụ.
- Nghe phát âm bằng **Web Speech API** (text-to-speech).
- Lưu từ vựng yêu thích: **định hướng tương lai** (Giai đoạn 3).

### 2.4 Bài tập 4 kỹ năng (quiz)
- **Listening**: `audioText` (phát bằng TTS), `question`, `options[]`, `answer`.
- **Speaking**: `prompt_vi`, `modelAnswer_en`; người học nói, dùng speech recognition.
- **Reading**: `passage`, `question`, `options[]`, `answer`.
- **Writing**: `prompt_vi`, `minWords`, `sampleAnswer_en`.
- Chấm điểm quiz: **định hướng tương lai** (Giai đoạn 2 hoàn thiện chấm điểm).

### 2.5 Theo dõi tiến độ
- **Định hướng tương lai** (Giai đoạn 3): lưu tiến độ theo người dùng sau khi có đăng nhập.

## 3. Mô hình dữ liệu (Lesson)

Một bài học trong `src/data/lessons.json` có cấu trúc:

```json
{
  "id": "a1-greetings",
  "title": "Greetings",
  "level": "A1",
  "topic": "Giao tiếp cơ bản",
  "description": "Chào hỏi và giới thiệu bản thân",
  "lecture": {
    "intro": "...",
    "grammar": "...",
    "vocabulary": [
      {
        "word": "hello",
        "phonetic": "/həˈloʊ/",
        "meaning_vi": "xin chào",
        "example_en": "Hello, my name is An.",
        "example_vi": "Xin chào, tôi tên là An."
      }
    ]
  },
  "exercises": {
    "listening": [
      { "id": "l1", "audioText": "Hello!", "question": "Người nói câu gì?", "options": ["Hello", "Bye"], "answer": "Hello" }
    ],
    "speaking": [
      { "id": "s1", "prompt_vi": "Hãy chào và giới thiệu tên bạn.", "modelAnswer_en": "Hello, my name is..." }
    ],
    "reading": [
      { "id": "r1", "passage": "...", "question": "...", "options": ["A", "B"], "answer": "A" }
    ],
    "writing": [
      { "id": "w1", "prompt_vi": "Viết một câu chào hỏi.", "minWords": 5, "sampleAnswer_en": "Hello, nice to meet you." }
    ]
  }
}
```

Hiện có **2 bài mẫu**: A1 *Greetings* và A2 *Daily Routines*.

## 4. Yêu cầu chức năng (Functional Requirements)

| Mã | Yêu cầu | Trạng thái |
| --- | --- | --- |
| FR-01 | API `GET /api/lessons` trả danh sách tóm tắt | Có |
| FR-02 | API `GET /api/lessons/:id` trả chi tiết bài | Có |
| FR-03 | Phục vụ tĩnh thư mục `public/` | Có |
| FR-04 | Trang danh sách bài học hiển thị từ API | Có |
| FR-05 | Trang chi tiết hiển thị lecture + vocabulary | Có |
| FR-06 | Hiển thị bài tập 4 kỹ năng | Có |
| FR-07 | Nghe phát âm bằng TTS (Web Speech API) | Có / hoàn thiện |
| FR-08 | Luyện nói bằng speech recognition | Có / hoàn thiện |
| FR-09 | Chấm điểm quiz và hiển thị kết quả | Giai đoạn 2 |
| FR-10 | Đăng nhập người dùng | **Định hướng tương lai** (GĐ3) |
| FR-11 | Lưu tiến độ học tập | **Định hướng tương lai** (GĐ3) |
| FR-12 | Từ vựng yêu thích | **Định hướng tương lai** (GĐ3) |

## 5. Yêu cầu phi chức năng (Non-functional Requirements)

| Mã | Yêu cầu |
| --- | --- |
| NFR-01 | Giao diện tiếng Việt, nội dung song ngữ Anh–Việt |
| NFR-02 | Hoạt động tốt trên trình duyệt hiện đại, **ưu tiên Chrome** (Web Speech API) |
| NFR-03 | Thời gian phản hồi API < 300ms với dữ liệu JSON hiện tại |
| NFR-04 | Mã nguồn đơn giản, dễ thêm bài (chỉ sửa `lessons.json`) |
| NFR-05 | Giao diện responsive cơ bản, dễ đọc |
| NFR-06 | Không yêu cầu cài đặt phía người học (mở trình duyệt là dùng) |

## 6. Ngoài phạm vi

Xem [PROJECT_SCOPE](../00_PROJECT_CHARTER/PROJECT_SCOPE.md) — DB, đăng nhập, gamification, framework, app mobile đều là **định hướng tương lai**.

## Liên kết liên quan

- [User Stories](USER_STORY.md)
- [Roadmap](ROADMAP.md)
- [Release Plan](RELEASE_PLAN.md)
- [MVP](../07_BACKLOG/MVP.md)
