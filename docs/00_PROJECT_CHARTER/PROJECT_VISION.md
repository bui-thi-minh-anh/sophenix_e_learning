# Tầm nhìn dự án — Sophenix

> Tài liệu này mô tả tầm nhìn, sứ mệnh và giá trị cốt lõi của Sophenix (english-learning-platform) — website giúp người Việt học tiếng Anh với nội dung song ngữ Anh–Việt.

## Tầm nhìn (Vision)

Trở thành công cụ học tiếng Anh trực tuyến **đơn giản, dễ tiếp cận và miễn phí** cho người Việt,
nơi mỗi người học có thể luyện đủ **4 kỹ năng** (Nghe, Nói, Đọc, Viết) ngay trên trình duyệt mà
không cần cài đặt phức tạp.

## Sứ mệnh (Mission)

Cung cấp các bài học tiếng Anh chất lượng, có lộ trình theo trình độ CEFR (A1 → C2), trình bày
song ngữ Anh–Việt để người học hiểu nhanh và luyện tập hiệu quả.

## Vấn đề cần giải quyết

| Vấn đề của người học | Cách Sophenix giải quyết |
| --- | --- |
| Tài liệu rời rạc, không có lộ trình | Bài học gắn nhãn trình độ CEFR (A1..C2), có chủ đề rõ ràng |
| Khó hiểu vì toàn tiếng Anh | Mọi nội dung trình bày **song ngữ Anh–Việt** |
| Ít cơ hội luyện Nghe/Nói | Dùng **Web Speech API** (text-to-speech để nghe, speech recognition để nói) ngay trên trình duyệt |
| Học một chiều, không có bài tập | Mỗi bài có quiz đủ **4 kỹ năng**: listening, speaking, reading, writing |
| Rào cản kỹ thuật (cài app, đăng ký) | Web thuần (HTML/CSS/JS), backend Node.js + Express nhẹ, mở là dùng |

## Giá trị cốt lõi

- **Đơn giản trước tiên**: giai đoạn đầu ưu tiên giải pháp gọn nhẹ (không dùng database, dữ liệu lưu ở file JSON).
- **Song ngữ Anh–Việt**: hạ thấp rào cản ngôn ngữ cho người mới bắt đầu.
- **Học chủ động**: người học không chỉ đọc mà còn nghe, nói, làm bài tập có chấm điểm (định hướng).
- **Dễ mở rộng nội dung**: thêm bài học chỉ bằng cách sửa file `src/data/lessons.json`, không cần đụng code.
- **Miễn phí và mở**: hướng tới phục vụ cộng đồng người Việt học tiếng Anh.

## Bối cảnh kỹ thuật hiện tại

- Backend: **Node.js + Express** (`src/server.js`), cổng mặc định **3000**.
- Frontend: **HTML + CSS + JavaScript thuần** (`public/`), không dùng framework.
- Dữ liệu: file **JSON** `src/data/lessons.json` (chưa dùng DB ở giai đoạn này).
- Nghe/Nói: **Web Speech API** (tốt nhất trên Chrome).

> Các công nghệ như React, cơ sở dữ liệu, xác thực người dùng... là **định hướng tương lai**,
> sẽ được cân nhắc ở các giai đoạn sau (xem [ROADMAP](../01_PRODUCT/ROADMAP.md)).

## Liên kết liên quan

- [Phạm vi dự án](PROJECT_SCOPE.md)
- [Chỉ số thành công](SUCCESS_METRICS.md)
- [Người dùng mục tiêu](TARGET_USERS.md)
- [Yêu cầu sản phẩm (PRD)](../01_PRODUCT/PRODUCT_REQUIREMENT.md)
