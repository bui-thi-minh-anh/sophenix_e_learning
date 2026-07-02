# Kế hoạch test — Sophenix

> Mô tả những gì sẽ được kiểm thử, kiểm thử ra sao và tiêu chí pass/fail cho mỗi hạng mục. Tham chiếu trực tiếp tới schema dữ liệu và endpoint API thật trong code.

## 1. Phạm vi áp dụng

Kế hoạch áp dụng cho:

- Dữ liệu `src/data/lessons.json` (theo [../04_TECH/DATA_STRUCTURE.md](../04_TECH/DATA_STRUCTURE.md)).
- 2 API trong `src/server.js`: `GET /api/lessons`, `GET /api/lessons/:id`.
- 3 trang HTML trong `public/`: `index.html`, `lessons.html`, `lesson.html`.
- 4 kỹ năng trong trang chi tiết: Listening, Speaking, Reading, Writing.

## 2. Môi trường test

| Mục | Giá trị |
| --- | --- |
| Lệnh chạy | `npm start` hoặc `npm run dev` |
| URL | `http://localhost:3000` |
| Trình duyệt chính | Chrome bản mới nhất |
| Trình duyệt phụ | Edge, Safari (cho Web Speech API) |
| Thiết bị | Desktop 1440px; mobile DevTools 375px (iPhone SE) |

## 3. Hạng mục kiểm thử

### 3.1 Validate dữ liệu `lessons.json`

| # | Hạng mục | Cách kiểm | Tiêu chí pass |
| --- | --- | --- | --- |
| D-01 | JSON hợp lệ | `node -e "JSON.parse(require('fs').readFileSync('src/data/lessons.json'))"` | Không lỗi cú pháp |
| D-02 | Có khoá gốc `lessons` là mảng | Đọc và kiểm | `lessons` là array, length > 0 |
| D-03 | Mỗi bài đủ 7 trường gốc | Duyệt mảng | Có `id`, `title`, `level`, `topic`, `description`, `lecture`, `exercises` |
| D-04 | `id` duy nhất | Tạo `Set` các id | Không trùng |
| D-05 | `level` đúng CEFR | Regex `^(A1|A2|B1|B2|C1|C2)$` | Tất cả khớp |
| D-06 | `lecture.vocabulary` ≥ 4 mục | `.length >= 4` | Đạt |
| D-07 | Mỗi từ có `phonetic` + 1 ví dụ song ngữ | Duyệt từng từ | Đầy đủ |
| D-08 | 4 mảng kỹ năng đều có ≥ 1 phần tử | Đếm | Đạt |
| D-09 | `answer` trắc nghiệm nằm trong `options` | So sánh chuỗi tuyệt đối | Trùng khớp |
| D-10 | `id` bài tập duy nhất toàn cục | Set | Không trùng |
| D-11 | `minWords` (writing) > 0 và ≤ độ dài `sampleAnswer_en` | Đếm từ | Đạt |

### 3.2 API

| # | Endpoint | Bước | Tiêu chí pass |
| --- | --- | --- | --- |
| A-01 | `GET /api/lessons` | `curl http://localhost:3000/api/lessons` | HTTP 200, JSON là mảng |
| A-02 | `GET /api/lessons` | Kiểm shape phần tử đầu | Có đủ `id`, `title`, `level`, `topic`, `description` |
| A-03 | `GET /api/lessons` | Đảm bảo **không** trả `lecture`/`exercises` | Hai trường này không xuất hiện |
| A-04 | `GET /api/lessons/:id` | Gọi với id thật, ví dụ `lesson-001` | HTTP 200, có `lecture` + `exercises` |
| A-05 | `GET /api/lessons/:id` | Gọi với id không tồn tại | HTTP 404, body `{ "error": "Không tìm thấy bài giảng" }` |
| A-06 | Cập nhật `lessons.json` không khởi động lại server | Sửa file, gọi lại API | Phản hồi cập nhật ngay (do đọc file mỗi request) |

### 3.3 Giao diện — Trang chủ (`index.html`)

| # | Hạng mục | Tiêu chí pass |
| --- | --- | --- |
| U-01 | Tải `http://localhost:3000/` không lỗi console | Không có lỗi đỏ |
| U-02 | Có liên kết tới trang danh sách bài giảng | Click chuyển đến `lessons.html` |

### 3.4 Trang danh sách (`lessons.html`)

| # | Hạng mục | Tiêu chí pass |
| --- | --- | --- |
| U-03 | Hiển thị mọi bài có trong JSON | Số card = số phần tử trả về từ `/api/lessons` |
| U-04 | Mỗi card có `title`, `level`, `description` | Hiển thị đầy đủ |
| U-05 | Click card chuyển sang `lesson.html?id=...` | Đúng id |
| U-06 | Khi API lỗi (tắt server) | Trang không trắng tinh; hiển thị thông báo lỗi hợp lý |

### 3.5 Trang chi tiết bài (`lesson.html`) — 4 kỹ năng

Chi tiết kịch bản nằm trong [TEST_CASES.md](TEST_CASES.md). Tóm tắt nhanh:

| # | Kỹ năng | Tiêu chí pass cốt lõi |
| --- | --- | --- |
| L-01 | Listening | Nhấn "Phát" → có giọng đọc; chọn đúng `answer` → phản hồi đúng; chọn sai → phản hồi sai và hiển thị đáp án |
| L-02 | Speaking | Nhấn "Nói" → mic bật; nói câu mẫu → hệ thống nhận và so sánh; nhận diện gần khớp được coi là đạt |
| L-03 | Reading | Đọc đoạn → trả lời đúng/sai có feedback rõ ràng |
| L-04 | Writing | Viết dưới `minWords` → cảnh báo thiếu; viết đủ → so với `sampleAnswer_en` (tham khảo, không bắt buộc khớp) |

### 3.6 Trình duyệt & Thiết bị

| # | Trình duyệt | Lưu ý |
| --- | --- | --- |
| B-01 | Chrome desktop | Mặc định, mọi kỹ năng phải chạy |
| B-02 | Edge desktop | Tương tự Chrome |
| B-03 | Safari macOS | Speech Recognition có thể yêu cầu cấp quyền lần đầu; cần test riêng |
| B-04 | Mobile Chrome (375px) | Layout không tràn; nút bấm vẫn chạm được |

## 4. Lịch chạy

| Khi nào | Hạng mục bắt buộc |
| --- | --- |
| Thêm/sửa 1 bài học | D-01 → D-11 + L-01 → L-04 cho riêng bài đó |
| Sửa `src/server.js` | A-01 → A-06 |
| Sửa CSS/HTML | U-01 → U-05 + B-04 |
| Trước mỗi lần "phát hành" tài liệu | Toàn bộ mục 3 |

## 5. Báo cáo lỗi

Khi phát hiện lỗi, mở một file mới trong issue tracker (hoặc tài liệu riêng) theo [BUG_REPORT_TEMPLATE.md](BUG_REPORT_TEMPLATE.md). Mỗi bug phải kèm: ID, mô tả, các bước tái hiện, mong đợi vs thực tế, mức ưu tiên.

## Liên kết

- Chiến lược: [QA_STRATEGY.md](QA_STRATEGY.md)
- Bộ test case chi tiết: [TEST_CASES.md](TEST_CASES.md)
- Checklist nội dung: [CONTENT_QA_CHECKLIST.md](CONTENT_QA_CHECKLIST.md)
- Schema dữ liệu: [../04_TECH/DATA_STRUCTURE.md](../04_TECH/DATA_STRUCTURE.md)
- Kiến trúc kỹ thuật: [../04_TECH/TECH_ARCHITECTURE.md](../04_TECH/TECH_ARCHITECTURE.md)
