# Listening Page

## Route

`/listening`

## File

`src/app/listening/page.tsx`

---

# Reference Design

> Place the Listening Page UI image here.

![Listening page.png](../../../../Downloads/UI-English%20web/Listening%20page.png)
---

# Listening Data Source

> **Important**

Trang `/listening` **không chứa dữ liệu bài nghe**.

Nhiệm vụ của trang này chỉ là **đọc dữ liệu từ thư mục `listening/` và hiển thị thành các chủ đề luyện nghe.**

---

## Rules

- Mỗi thư mục trong `listening/` tương ứng với **một chủ đề Listening**.
- Mỗi chủ đề có thể chứa nhiều bài nghe.
- Toàn bộ dữ liệu phải được đọc từ Markdown hoặc JSON trong thư mục `listening/`.
- Không được hardcode bất kỳ bài nghe nào.
- Khi thêm hoặc xóa một chủ đề trong thư mục `listening/`, giao diện phải tự động cập nhật.

---

## Folder Structure

Example

```
listening/

├── README.md
│
├── education/
│   ├── README.md
│   ├── lesson-01.md
│   ├── lesson-02.md
│
├── accommodation/
├── travel/
├── health/
├── technology/
├── tourism/
└── ...
```

---

# Overview

Listening Page giúp người học luyện IELTS Listening theo từng chủ đề.

Thiết kế phải đồng bộ hoàn toàn với Home Page, Lesson Page và Vocabulary Page.

Theme

- Dark Mode
- Modern UI
- Premium Learning Platform
- 3D Illustration
- Smooth Animation
- Blue Gradient Accent

---

# Page Layout

Trang bao gồm

1. Header
2. Search
3. Filter
4. Statistics
5. Listening Topic Grid
6. Phoenix Banner

---

# Header

Title

```
Listening
```

Subtitle

```
Practice IELTS Listening with real-world topics and interactive exercises.
```

---

# Search

Placeholder

```
Search topic...
```

Cho phép tìm kiếm

- Topic Name
- Lesson Name

---

# Filter

Bao gồm

- All
- Beginner
- Intermediate
- IELTS

Sort

- Newest
- Progress
- A-Z

---

# Statistics

Hiển thị

- Total Topics
- Listening Completed
- Average Accuracy
- Total Listening Time

Các thông tin này lấy từ Learning Progress.

---

# Listening Topics

Hiển thị toàn bộ chủ đề trong thư mục `listening/`.

Desktop

- 6 card mỗi hàng

Tablet

- 3 card

Mobile

- 1 card

---

# Topic Card

Mỗi card gồm

- 3D Illustration
- Topic Name
- IELTS Section
- Difficulty Badge
- Number of Lessons
- Estimated Time
- Progress Bar
- Arrow Button

Click card

↓

Mở Topic Detail.

---

# Topic Detail

Khi người dùng click vào một chủ đề

Ví dụ

Education

Hệ thống sẽ

1. Đọc toàn bộ dữ liệu trong

```
listening/education/
```

2. Hiển thị danh sách bài nghe của chủ đề.

Ví dụ

Lesson 1

Lesson 2

Lesson 3

...

Không được hardcode danh sách bài.

---

# Listening Exercise

Mỗi bài nghe sẽ gồm

- Audio
- Transcript
- Vocabulary
- Explanation
- Exercise

Nguồn dữ liệu lấy từ file Markdown của bài nghe.

---

# Exercise Types

Website sẽ hỗ trợ **3 dạng bài luyện nghe theo định hướng IELTS**.

## Exercise Type 1

### Dictation (Write What You Hear)

Người học nghe một đoạn hội thoại hoặc đoạn văn.

Độ dài

- khoảng 30–40 giây

Yêu cầu

Nghe và **chép lại toàn bộ nội dung**.

Sau khi nộp bài

Hiển thị

- Transcript đúng
- Những từ sai
- Accuracy (%)
- Các lỗi chính tả
- Nút nghe lại

---

## Exercise Type 2

### Fill in the Blanks

Người học nghe audio.

Một đoạn văn sẽ được hiển thị.

Một số từ sẽ bị ẩn.

Ví dụ

```
The meeting will start at ______ tomorrow morning.
```

Người học nhập từ còn thiếu.

Sau khi hoàn thành

Hiển thị

- Đáp án đúng
- Giải thích
- Transcript đầy đủ

---

## Exercise Type 3

### Multiple Choice

Người học nghe audio.

Sau đó trả lời câu hỏi.

Mỗi câu có

- A
- B
- C

Chỉ có một đáp án đúng.

Sau khi hoàn thành

Hiển thị

- Đáp án đúng
- Giải thích
- Transcript

---

# Exercise Flow

Topic

↓

Lesson

↓

Play Audio

↓

Complete Exercise

↓

View Result

↓

Continue Next Lesson

---

# Audio Player

Player gồm

- Play
- Pause
- Replay
- Progress Bar
- Current Time
- Total Duration

Có thể nghe lại nhiều lần.

---

# Result Screen

Sau khi hoàn thành bài

Hiển thị

- Score
- Accuracy
- Listening Time
- Correct Answers
- Incorrect Answers
- Review Answers
- Continue

---

# Progress

Mỗi bài hoàn thành sẽ cập nhật

- Lesson Progress
- Topic Progress
- Listening Statistics

---

# Phoenix Banner

Giống UI thiết kế.

Hiển thị cuối trang.

Có animation nhẹ.

Button

```
Continue Practice
```

---

# Loading State

Skeleton Cards.

---

# Empty State

```
No listening topics available.
```

---

# Error State

```
Unable to load listening topics.

Try Again
```

---

# Notes for AI

- Không được hardcode dữ liệu.
- Luôn đọc dữ liệu từ thư mục `listening/`.
- Khi thêm một chủ đề mới vào thư mục `listening/`, giao diện phải tự động hiển thị.
- Khi thêm một bài nghe mới trong chủ đề, Topic Detail phải tự động cập nhật.
- Toàn bộ Exercise phải render từ Markdown hoặc dữ liệu trong thư mục `listening/`.
- Giữ nguyên bố cục và phong cách theo ảnh thiết kế.
- Không thay đổi layout, màu sắc hoặc spacing.
- Toàn bộ trải nghiệm phải hướng tới luyện thi IELTS Listening với giao diện hiện đại, trực quan và dễ sử dụng.