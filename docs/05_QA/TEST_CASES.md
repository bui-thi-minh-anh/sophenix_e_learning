# Test case — Sophenix

> Bộ test case thủ công dùng để xác minh website hoạt động đúng. Mỗi test case có ID, tiền điều kiện, các bước, kết quả mong đợi. Dùng cùng [TEST_PLAN.md](TEST_PLAN.md).

## Quy ước ID

- `TC-API-xx` — kiểm thử API
- `TC-LIST-xx` — kiểm thử trang danh sách
- `TC-LSN-xx` — kiểm thử trang chi tiết bài học (chung)
- `TC-LIS-xx` — Listening
- `TC-SPK-xx` — Speaking
- `TC-RDG-xx` — Reading
- `TC-WRI-xx` — Writing
- `TC-DAT-xx` — kiểm thử dữ liệu

---

## A. Dữ liệu — `src/data/lessons.json`

### TC-DAT-01 — File parse được

- **Tiền điều kiện**: file tồn tại.
- **Các bước**:
  1. Chạy `node -e "JSON.parse(require('fs').readFileSync('src/data/lessons.json','utf-8'))"`.
- **Mong đợi**: không lỗi; lệnh thoát mã 0.

### TC-DAT-02 — `id` bài học không trùng

- **Các bước**: duyệt mảng `lessons`, tạo `Set` từ `id`.
- **Mong đợi**: `Set.size === lessons.length`.

### TC-DAT-03 — Mỗi bài đủ 4 mảng kỹ năng và ≥ 1 phần tử

- **Mong đợi**: với mỗi bài, `exercises.listening.length >= 1`, tương tự với `speaking`, `reading`, `writing`.

### TC-DAT-04 — `answer` trắc nghiệm nằm trong `options`

- **Các bước**: với mọi `listening` và `reading`, kiểm `options.includes(answer)` (so khớp tuyệt đối, có dấu cách).
- **Mong đợi**: tất cả pass.

### TC-DAT-05 — Từ vựng đủ trường

- **Mong đợi**: mỗi `vocabulary[i]` có đủ `word`, `phonetic`, `meaning_vi`, `example_en`, `example_vi`; không có trường trống.

---

## B. API

### TC-API-01 — Danh sách trả về mảng

- **Tiền điều kiện**: `npm start` đang chạy.
- **Các bước**: `curl -s http://localhost:3000/api/lessons | head -c 200`.
- **Mong đợi**: HTTP 200, body bắt đầu bằng `[`, chứa ít nhất 1 phần tử có `id`, `title`, `level`.

### TC-API-02 — Danh sách không lộ `lecture`/`exercises`

- **Mong đợi**: chuỗi `"lecture"` và `"exercises"` **không** xuất hiện trong phản hồi của `/api/lessons`.

### TC-API-03 — Chi tiết bài tồn tại

- **Các bước**: `curl -s http://localhost:3000/api/lessons/lesson-001`.
- **Mong đợi**: HTTP 200; có `lecture.vocabulary`, có `exercises.listening`, `exercises.speaking`, `exercises.reading`, `exercises.writing`.

### TC-API-04 — Bài không tồn tại trả 404

- **Các bước**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/lessons/khong-co-bai-nay`.
- **Mong đợi**: in ra `404`.

### TC-API-05 — Hot-reload nội dung

- **Các bước**:
  1. Gọi `GET /api/lessons` và ghi nhớ số lượng N.
  2. Thêm 1 bài giả vào cuối `lessons.json` (sao chép 1 khối, đổi `id`).
  3. Gọi lại `GET /api/lessons` ngay lập tức.
- **Mong đợi**: số lượng = N + 1; **không cần** khởi động lại server.

---

## C. Trang danh sách (`lessons.html`)

### TC-LIST-01 — Hiển thị đầy đủ thẻ bài

- **Các bước**: mở `http://localhost:3000/lessons.html`.
- **Mong đợi**: số thẻ trên trang = số phần tử `/api/lessons` trả về.

### TC-LIST-02 — Mở chi tiết đúng bài

- **Các bước**: click thẻ đầu tiên.
- **Mong đợi**: URL chuyển sang `lesson.html?id=<id của thẻ>`, trang chi tiết tải nội dung đúng.

### TC-LIST-03 — Server tắt thì hiển thị lỗi thân thiện

- **Các bước**: tắt `npm start`, tải lại trang.
- **Mong đợi**: trang không trắng tinh; hiển thị thông báo lỗi và không kẹt loading vô tận (ghi nhận nếu chưa đạt → tạo bug).

---

## D. Trang chi tiết bài (`lesson.html`) — chung

### TC-LSN-01 — Hiển thị `lecture`

- **Mong đợi**: `intro`, `grammar`, và danh sách từ vựng (mỗi từ có `word`, `phonetic`, `meaning_vi`, ví dụ song ngữ) hiển thị rõ.

### TC-LSN-02 — 4 tab kỹ năng đều bấm được

- **Mong đợi**: bấm tab Listening/Speaking/Reading/Writing đều mở đúng nội dung, không xảy ra lỗi console.

### TC-LSN-03 — Sai `id` trong URL

- **Các bước**: mở `lesson.html?id=khong-co-bai-nay`.
- **Mong đợi**: hiển thị thông báo "Không tìm thấy bài giảng" hoặc tương đương; không vỡ layout.

---

## E. Listening

### TC-LIS-01 — Phát audio

- **Các bước**: vào tab Listening, bấm nút phát.
- **Mong đợi**: trình duyệt phát giọng đọc `audioText`. (Lưu ý: cần đã cấp quyền âm thanh / không tắt loa.)

### TC-LIS-02 — Trả lời đúng

- **Các bước**: chọn đúng giá trị `answer` trong `options`.
- **Mong đợi**: phản hồi "Đúng" (hoặc tương đương); tô màu xanh/đánh dấu thành công.

### TC-LIS-03 — Trả lời sai

- **Các bước**: chọn phương án sai.
- **Mong đợi**: phản hồi "Sai" và hiển thị đáp án đúng.

---

## F. Speaking

### TC-SPK-01 — Bật mic

- **Các bước**: bấm nút "Nói" / "Bắt đầu nói".
- **Mong đợi**: trình duyệt xin quyền micro lần đầu; sau khi đồng ý, hiển thị trạng thái đang nghe.

### TC-SPK-02 — Nói đúng câu mẫu

- **Các bước**: đọc to câu trong `modelAnswer_en`.
- **Mong đợi**: hệ thống ghi lại đúng (hoặc gần đúng) và đưa phản hồi tích cực. Sai khác nhỏ về phát âm vẫn được chấp nhận.

### TC-SPK-03 — Trình duyệt không hỗ trợ Speech Recognition

- **Các bước**: mở trên trình duyệt không hỗ trợ (ví dụ Firefox cũ).
- **Mong đợi**: hiển thị thông báo "Trình duyệt không hỗ trợ" thay vì im lặng/lỗi đỏ.

---

## G. Reading

### TC-RDG-01 — Đọc đoạn văn

- **Mong đợi**: `passage` hiển thị rõ, không bị cắt; câu hỏi và `options` đầy đủ.

### TC-RDG-02 — Chọn đáp án có feedback

- **Mong đợi**: chọn đúng → phản hồi tích cực; chọn sai → phản hồi tiêu cực và lộ đáp án.

---

## H. Writing

### TC-WRI-01 — Cảnh báo dưới `minWords`

- **Các bước**: viết ít hơn `minWords` từ rồi nộp.
- **Mong đợi**: hiển thị cảnh báo "Cần ít nhất N từ" (hoặc tương đương); không tính là hoàn thành.

### TC-WRI-02 — Hiển thị câu mẫu

- **Các bước**: nộp bài viết đủ số từ.
- **Mong đợi**: hiển thị `sampleAnswer_en` để người học đối chiếu.

---

## I. Trình duyệt & responsive

### TC-BRW-01 — Chrome desktop

- **Mong đợi**: tất cả test case ở mục E–H pass.

### TC-BRW-02 — Safari macOS

- **Mong đợi**: Listening (TTS) hoạt động; Speaking (recognition) hoạt động sau khi cấp quyền.

### TC-BRW-03 — Mobile 375px

- **Các bước**: DevTools → thiết bị iPhone SE.
- **Mong đợi**: layout không tràn; tab kỹ năng vẫn bấm được; ô viết đủ rộng để gõ.

---

## Liên kết

- Kế hoạch test: [TEST_PLAN.md](TEST_PLAN.md)
- Chiến lược QA: [QA_STRATEGY.md](QA_STRATEGY.md)
- Checklist nội dung: [CONTENT_QA_CHECKLIST.md](CONTENT_QA_CHECKLIST.md)
- Mẫu báo cáo bug: [BUG_REPORT_TEMPLATE.md](BUG_REPORT_TEMPLATE.md)
