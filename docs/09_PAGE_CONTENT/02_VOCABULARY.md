# Vocabulary Page

## Reference Design

> Place the UI reference image here.

![Vocab page.png](../../../../Downloads/UI-English%20web/Vocab%20page.png)

---

# Vocabulary Data Source

> **Important**

Trang `/vocabulary` **không chứa dữ liệu từ vựng**.

Nhiệm vụ của trang này chỉ là **đọc dữ liệu từ thư mục `vocabulary/` và hiển thị thành các chủ đề từ vựng**.

## Rules

- Mỗi thư mục trong `vocabulary/` tương ứng với **một chủ đề từ vựng**.
- Mỗi chủ đề có thể chứa một hoặc nhiều file Markdown (`.md`).
- Tất cả dữ liệu hiển thị trên trang đều phải được lấy từ thư mục `vocabulary/`.
- **Không được hardcode danh sách chủ đề trong source code.**
- Khi thêm hoặc xóa một chủ đề trong thư mục `vocabulary/`, giao diện phải tự động cập nhật.

---

## Folder Structure

Example

```
vocabulary/

├── README.md
├── school/
│   ├── README.md
│   ├── lesson-01.md
│   ├── lesson-02.md
│
├── hospital/
│   ├── README.md
│   ├── lesson-01.md
│
├── weather/
├── work/
├── restaurant/
├── criminal/
├── vehicle/
└── ...
```

---

## Data Retrieved From Each Topic

Mỗi chủ đề sẽ cung cấp:

- Topic Name
- Topic Icon
- Topic Description
- Total Vocabulary
- Completion Progress
- Number of Lessons
- Daily Vocabulary
- Difficulty Level (optional)

Các thông tin trên sẽ được hiển thị thành Topic Card theo đúng UI thiết kế.

---

## Navigation

Khi người dùng click vào một Topic Card:

1. Xác định thư mục chủ đề tương ứng trong `vocabulary/`.
2. Đọc toàn bộ dữ liệu trong thư mục đó.
3. Mở trang Topic Detail.
4. Hiển thị đầy đủ danh sách từ vựng, bài học và bài luyện tập của chủ đề.

Toàn bộ dữ liệu phải được render từ file Markdown, **không được hardcode trong source code**.

---

# Overview

This page is the Vocabulary page of the Sophenix platform.

The design language must remain consistent with the Home page and Lesson page.

Theme

- Dark mode only
- Modern UI
- Blue gradient accent
- Rounded cards
- Cute 3D illustrations
- Smooth hover animation
- Premium learning platform feeling

The page helps users learn English vocabulary by topic and continue unfinished vocabulary courses.

---

# Page Layout

The page contains:

1. Page Header
2. Search & Filter
3. Popular Vocabulary Topics
4. Continue Learning
5. Daily Vocabulary
6. Phoenix Assistant Character

Everything should use the same spacing system as other pages.

---

# 1. Page Header

Large title

```
Vocabulary
```

Subtitle

```
Learn vocabulary by topic and expand your English every day.
```

Left aligned.

---

# 2. Search Area

Located on the top-right.

Contains

### Search Box

Placeholder

```
Search topic or vocabulary...
```

Người dùng có thể tìm kiếm:

- Topic Name
- Vocabulary Word

Nếu nhập một từ vựng, hệ thống sẽ tìm chủ đề chứa từ đó.

---

### Sort Dropdown

Default

```
Newest
```

Options

- Newest
- Progress
- A-Z
- Most Learned

---

# 3. Popular Vocabulary Topics

Hiển thị toàn bộ chủ đề lấy từ thư mục `vocabulary/`.

Không giới hạn số lượng chủ đề.

Desktop

- 5 cards mỗi hàng

Tablet

- 3 cards

Mobile

- 1 card

---

## Each Topic Card

Bao gồm:

- 3D Illustration
- Topic Name
- Total Vocabulary
- Learning Progress
- Arrow Button

Ví dụ

School

128 Words

70%

Click card để mở Topic Detail.

---

Card cuối cùng

```
View More
```

Chỉ hiển thị khi số lượng chủ đề vượt quá giới hạn của trang đầu.

---

# 4. Continue Learning

Hiển thị các chủ đề người dùng đang học.

Dữ liệu lấy từ Learning Progress.

Hiển thị tối đa 4 chủ đề gần nhất.

Click card để tiếp tục học.

---

# 5. Daily Vocabulary

Hiển thị 5 từ mới mỗi ngày.

Nguồn dữ liệu lấy từ các file Markdown trong thư mục `vocabulary/`.

Mỗi card gồm:

- Word
- Pronunciation
- Speaker Button
- Meaning

Click Speaker để phát âm.

---

# 6. Phoenix Assistant

Giống Home Page.

Hiển thị ở góc dưới bên phải.

Có animation nhẹ.

Hiển thị câu động viên người học.

---

# States

Loading

Hiển thị skeleton cards.

Empty

```
No vocabulary topics available.
```

Error

```
Unable to load vocabulary topics.

Try Again
```

---

# Notes for AI

- Không được hardcode dữ liệu.
- Luôn lấy dữ liệu từ thư mục `vocabulary/`.
- Khi thêm một chủ đề mới vào thư mục `vocabulary/`, giao diện phải tự động hiển thị.
- Khi click Topic Card phải mở Topic Detail và render dữ liệu từ Markdown.
- Giữ nguyên bố cục theo ảnh thiết kế.
- Không tự ý thay đổi màu sắc, spacing hoặc component.