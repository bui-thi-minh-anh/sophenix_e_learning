# Nguồn dữ liệu bài giảng

> **Quan trọng**

Trang `/lessons` **không chứa nội dung bài học mà chỉ mô tả về function và UI**.

Nhiệm vụ của trang này chỉ là **đọc dữ liệu từ thư mục `lessons/` và hiển thị thành danh sách bài giảng**.

# Follow design
![Lesson page.png](../../../../Downloads/UI-English%20web/Lesson%20page.png)

## Quy tắc

- Mỗi file Markdown (`.md`) trong thư mục `lessons/` tương ứng với **một bài giảng**.
- Nội dung hiển thị trên trang `/lessons` phải được lấy trực tiếp từ các file trong thư mục `lessons/`.
- **Không được hardcode dữ liệu bài giảng trong code.**
- **Không được tự tạo thêm bài giảng nếu không tồn tại trong thư mục `lessons/`.**
- Khi thêm hoặc xóa file trong thư mục `lessons/`, danh sách bài giảng trên trang phải tự động cập nhật.

---

## Nội dung lấy từ mỗi file bài giảng

Đối với mỗi file trong thư mục `[lessons](lessons)`, hệ thống sẽ đọc các thông tin sau để hiển thị trên Lesson Page:

- Level (A0 → B2)
- Category (Ví dụ: Noun, Verb, Tenses...)
- Title (Tên bài học)
- Description (Mô tả ngắn)
- Lesson Order (Thứ tự hiển thị)
- Number of Exercises (Số bài tập)
- Estimated Study Time (nếu có)
- Completion Status (nếu có)

Sau đó hiển thị thành một Lesson Card theo đúng giao diện thiết kế.

---

## Ví dụ cấu trúc thư mục

lessons/

├── README.md

├── unit-01-tu-loai.md

├── unit-02-phuong-phap-hoc-tu-loai-1.md

├── unit-03-danh-tu.md

├── unit-04-dong-tu.md

└── ...

---

## Khi người dùng click vào một Lesson Card

Khi người dùng click vào một bài giảng:

1. Xác định file Markdown tương ứng trong thư mục `lessons/`.
2. Đọc toàn bộ nội dung của file đó.
3. Mở trang Lesson Detail.
4. Hiển thị đầy đủ nội dung của bài giảng theo đúng cấu trúc trong file Markdown.

**Toàn bộ nội dung của Lesson Detail phải được render từ file Markdown trong thư mục `lessons/`, không được hardcode trong source code.**