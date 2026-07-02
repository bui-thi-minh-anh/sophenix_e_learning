# Home Page

## Route

`/`

## File

`src/app/page.tsx`

---

# Re
ference Design

> Place the Home Page UI image here.

![Home-UI.png](../../../../Downloads/UI-English%20web/Home-UI.png)

---

# Overview

Home Page là trang đầu tiên người dùng nhìn thấy sau khi đăng nhập vào **Sophenix**.

Trang này đóng vai trò là Dashboard của toàn bộ hệ thống học tiếng Anh.

Người dùng có thể:

- Tiếp tục bài học đang học.
- Truy cập nhanh đến các kỹ năng.
- Xem tiến độ học tập.
- Theo dõi chuỗi học (Learning Streak).
- Xem thống kê quá trình học.
- Nhận động lực học tập từ linh vật Phoenix.

Toàn bộ giao diện phải giữ phong cách hiện đại, tối (Dark Mode), thân thiện và đồng nhất với tất cả các trang khác.

---

# About Sophenix

**Sophenix** là nền tảng học tiếng Anh được xây dựng theo phương pháp học từng bước (Step-by-Step Learning).

Website tập trung vào việc giúp người học:

- Xây dựng nền tảng ngữ pháp.
- Mở rộng vốn từ vựng.
- Luyện nghe theo chuẩn IELTS.
- Luyện nói.
- Luyện đọc.
- Luyện viết.
- Theo dõi tiến trình học tập hằng ngày.

Sophenix hướng tới trải nghiệm học tập hiện đại, trực quan và tạo động lực để người học duy trì thói quen học tiếng Anh mỗi ngày.

---

# Home Layout

Trang gồm các phần theo thứ tự sau:

1. Sidebar Navigation
2. Top Navigation
3. Hero Banner
4. Practice Categories
5. Continue Learning
6. Learning Progress
7. Motivation Banner

---

# Sidebar

Sử dụng chung cho toàn bộ website.

Bao gồm:

- Home
- Lessons
- Vocabulary
- Listening
- Speaking
- Reading
- Writing
- Settings

Menu **Home** luôn được highlight khi đang ở trang chủ.

---

# Top Navigation

Hiển thị phía trên bên phải.

Bao gồm:

- Search Button
- Notification
- User Avatar

Thiết kế tối giản.

---

# Hero Banner

Đây là phần nổi bật nhất của Home Page.

Bao gồm:

- Linh vật Phoenix của Sophenix.
- Background Illustration.
- Tiêu đề truyền cảm hứng.
- Nút Continue Learning.

Ví dụ

```
Learn a little every day,
rise for real.
```

Subtitle

```
Small steps. Big progress.
```

Button

```
Continue Learning
```

Khi người dùng đã có bài học đang học, nút này sẽ chuyển đến bài học gần nhất.

Nếu chưa có dữ liệu học tập, chuyển đến Lesson đầu tiên.

---

# Practice Categories

Tiêu đề

```
What do you want to practice?
```

Hiển thị 6 thẻ chức năng.

Bao gồm

## Lessons

Study grammar, expressions and more.

## Vocabulary

Build your vocabulary.

## Listening

Train your listening skills.

## Speaking

Practice speaking confidently.

## Reading

Improve reading comprehension.

## Writing

Practice English writing.

Mỗi card gồm:

- Icon 3D
- Tên kỹ năng
- Mô tả ngắn
- Arrow Button

Click card sẽ chuyển sang trang tương ứng.

---

# Continue Learning

Hiển thị bài học gần nhất người dùng đang học.

Bao gồm:

- Lesson Thumbnail
- Lesson Name
- Progress Bar
- Lesson Progress
- Continue Button

Ví dụ

Present Simple Tense

Lesson 4 of 7

60%

Button

```
Continue
```

Nếu chưa có bài học nào:

Hiển thị

```
Start your first lesson.
```

---

# Your Progress

Tiêu đề

```
Your Progress
```

Hiển thị thống kê học tập.

Bao gồm

## Current Streak

Ví dụ

```
7 Days
```

## Lessons Completed

Ví dụ

```
12
```

## New Words

Ví dụ

```
48
```

Các số liệu được lấy từ Learning Progress.

---

# Motivation Banner

Hiển thị cuối trang.

Bao gồm:

- Phoenix Mascot
- Inspirational Quote

Ví dụ

```
The more you learn,
the higher you rise.
```

Hiển thị cùng hình ảnh Phoenix đang nghỉ ngơi.

---

# Phoenix Mascot

Phoenix là linh vật chính của Sophenix.

Phoenix sẽ xuất hiện xuyên suốt website.

Các trạng thái có thể có:

- Happy
- Studying
- Listening
- Sleeping
- Celebrating

Phoenix có animation nhẹ:

- Blink
- Float
- Bounce

Không gây mất tập trung.

---

# Navigation

Từ Home Page người dùng có thể truy cập nhanh đến:

- Lessons
- Vocabulary
- Listening
- Speaking
- Reading
- Writing

---

# Loading State

Hiển thị Skeleton UI cho:

- Hero Banner
- Practice Cards
- Continue Learning
- Progress Cards

---

# Empty State

Nếu chưa có dữ liệu học tập:

Hiển thị

```
Welcome to Sophenix!

Start your English learning journey today.
```

Button

```
Start Learning
```

---

# Error State

Hiển thị

```
Unable to load your learning data.

Try Again
```

---

# Theme

- Dark Mode (default) / Light mode 
- Blue Gradient
- Rounded Cards
- Premium UI
- Modern Typography
- Soft Shadow
- Smooth Animation

---

# Responsive

Desktop

- Sidebar cố định.
- Hero Banner full width.
- Practice Cards hiển thị 3 cột.

Tablet

- Sidebar thu gọn.
- Practice Cards 2 cột.

Mobile

- Sidebar chuyển thành Drawer.
- Hero Banner thu nhỏ.
- Practice Cards hiển thị 1 cột.

---

# Accessibility

- Keyboard Navigation
- Visible Focus State
- Screen Reader Support
- High Contrast Text
- Large Clickable Area

---

# Notes for AI

- Đây là Dashboard chính của Sophenix.
- Không hardcode dữ liệu tiến trình học tập.
- Dữ liệu người dùng phải được lấy từ hệ thống Learning Progress.
- Continue Learning phải luôn hiển thị bài học gần nhất chưa hoàn thành.
- Các Practice Card chỉ đóng vai trò điều hướng tới các module tương ứng.
- Phoenix là linh vật chính của Sophenix và phải xuất hiện nhất quán trên toàn bộ website.
- Giữ nguyên phong cách thiết kế theo ảnh tham chiếu, không tự ý thay đổi bố cục, màu sắc hoặc khoảng cách giữa các thành phần.