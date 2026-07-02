---
name: create-lesson
description: Tạo một bài học (lesson) tiếng Anh mới theo cấu trúc chuẩn của dự án — gồm mục tiêu, từ vựng, ví dụ song ngữ và bài tập. Dùng khi người dùng muốn thêm/soạn nội dung bài học.
---

# Skill: Tạo bài học tiếng Anh

Skill này hướng dẫn tạo một bài học mới nhất quán với toàn bộ nội dung trong dự án.

## Khi nào dùng

- Người dùng yêu cầu "tạo bài học", "thêm lesson", "soạn nội dung về chủ đề ...".

## Cấu trúc một bài học

Mỗi bài học nên có các phần sau:

1. **Thông tin chung**: tiêu đề, cấp độ (A1–C2), chủ đề (topic).
2. **Mục tiêu**: người học sẽ làm được gì sau bài.
3. **Từ vựng**: danh sách từ — `word`, `phonetic`, `meaning_vi`, `example_en`, `example_vi`.
4. **Ngữ pháp/Điểm chính** (nếu có): giải thích ngắn gọn bằng tiếng Việt.
5. **Bài tập (quiz)**: tối thiểu 3 câu, có đáp án.

## Định dạng dữ liệu mẫu (JSON)

```json
{
  "id": "lesson-001",
  "title": "Greetings — Chào hỏi",
  "level": "A1",
  "topic": "daily-life",
  "objectives": ["Chào hỏi cơ bản", "Giới thiệu bản thân"],
  "vocabulary": [
    {
      "word": "hello",
      "phonetic": "/həˈloʊ/",
      "meaning_vi": "xin chào",
      "example_en": "Hello, how are you?",
      "example_vi": "Xin chào, bạn khỏe không?"
    }
  ],
  "quiz": [
    {
      "question": "How do you say 'xin chào' in English?",
      "options": ["Bye", "Hello", "Thanks"],
      "answer": "Hello"
    }
  ]
}
```

## Quy trình

1. Hỏi (nếu thiếu): chủ đề và cấp độ.
2. Tạo nội dung song ngữ, ví dụ tự nhiên, đúng ngữ pháp.
3. Lưu file theo cấu trúc dữ liệu của dự án (xem `docs/architecture.md`).
4. Kiểm tra: phiên âm hợp lệ, mỗi từ có ví dụ, quiz có đáp án nằm trong options.
