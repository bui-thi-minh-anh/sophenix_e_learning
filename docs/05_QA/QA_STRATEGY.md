# Chiến lược kiểm thử — Sophenix

> Tài liệu mô tả cách tiếp cận kiểm thử chất lượng cho website học tiếng Anh 4 kỹ năng. Áp dụng cho cả phần kỹ thuật (API/UI) và phần nội dung học (lessons, quiz).

## 1. Mục tiêu kiểm thử

- **An toàn cho người học**: nội dung tiếng Anh đúng chính tả, ngữ pháp; bản dịch tiếng Việt sát nghĩa; không có nội dung gây hiểu sai.
- **Đúng schema**: dữ liệu trong `src/data/lessons.json` luôn hợp lệ theo chuẩn ở [../02_EDUCATION/LESSON_STANDARD.md](../02_EDUCATION/LESSON_STANDARD.md) và [../02_EDUCATION/QUIZ_STANDARD.md](../02_EDUCATION/QUIZ_STANDARD.md).
- **Trải nghiệm ổn định**: 4 kỹ năng (nghe / nói / đọc / viết) hoạt động đúng ở các trình duyệt chính (Chrome, Edge, Safari).
- **Không vỡ giao diện** trên cả desktop và mobile.

## 2. Phạm vi

| Đối tượng | Trong phạm vi | Ngoài phạm vi (giai đoạn này) |
| --- | --- | --- |
| API `/api/lessons`, `/api/lessons/:id` | ✅ | — |
| Trang `index.html`, `lessons.html`, `lesson.html` | ✅ | — |
| 4 tab kỹ năng (Listening / Speaking / Reading / Writing) | ✅ | — |
| Nội dung từng bài học (lecture + exercises) | ✅ | — |
| Web Speech API (TTS đọc tiếng Anh) | ✅ — kiểm bằng tay | Tự động hoá |
| Web Speech API (Speech Recognition — nói thử) | ✅ — kiểm bằng tay | Tự động hoá |
| Lưu tiến độ người học (chưa triển khai) | ❌ | Khi có `localStorage` / đăng nhập |
| Hiệu năng tải khi số bài rất lớn | ❌ | Khi vượt ~50 bài |

## 3. Các loại kiểm thử

| Loại | Mức ưu tiên | Cách thực hiện | Khi nào chạy |
| --- | --- | --- | --- |
| **Validate dữ liệu** (`lessons.json`) | 🔴 Cao | Đọc/parse file, kiểm tra theo schema | Trước mỗi commit nội dung |
| **API smoke test** | 🔴 Cao | `curl` 2 endpoint, so sánh shape | Sau mỗi thay đổi `src/server.js` |
| **Kiểm thử nội dung** (chính tả, ngữ pháp, bản dịch) | 🔴 Cao | Đọc trực tiếp + người Việt thông thạo rà soát | Khi thêm/sửa bài |
| **Kiểm thử chức năng UI** (4 kỹ năng) | 🟠 Vừa | Mở `http://localhost:3000`, làm theo kịch bản | Trước phát hành |
| **Kiểm thử trình duyệt** (Chrome / Edge / Safari) | 🟠 Vừa | Mở thủ công | Trước phát hành lớn |
| **Kiểm thử mobile** (responsive) | 🟡 Thấp | DevTools, thiết bị thật nếu có | Khi sửa CSS lớn |
| **Khả năng tiếp cận** (accessibility) | 🟡 Thấp | DevTools Lighthouse, kiểm tra phím Tab | Định kỳ |

## 4. Tiêu chí Done

Một thay đổi được xem là "xong" khi:

- ✅ Tất cả test case liên quan trong [TEST_CASES.md](TEST_CASES.md) đều pass.
- ✅ Mở `npm start`, mở trang ảnh hưởng và làm thủ công không gặp lỗi rõ rệt.
- ✅ JSON parse được, không có `id` trùng, mọi `answer` trắc nghiệm khớp `options`.
- ✅ Nếu thêm bài: đã đi qua [CONTENT_QA_CHECKLIST.md](CONTENT_QA_CHECKLIST.md).
- ✅ Không phá vỡ bài khác (mở ngẫu nhiên 2–3 bài cũ để xác nhận).

## 5. Phân vai trách nhiệm

| Vai trò | Trách nhiệm |
| --- | --- |
| Người soạn bài | Tự kiểm theo [CONTENT_QA_CHECKLIST.md](CONTENT_QA_CHECKLIST.md) trước khi merge. |
| Lập trình viên | Chạy smoke test API + mở từng trang sau khi sửa code. |
| Reviewer | Kiểm chéo cả nội dung lẫn JSON theo schema. |
| Claude Code (AI) | Có thể tự rà soát schema, gợi ý fix; **không** tự ý đổi nội dung học mà không hỏi. |

## 6. Định hướng tự động hoá (tương lai)

> Hiện tại script `npm test` chỉ in thông báo, **chưa có test tự động**. Định hướng:

1. **Script validate JSON** — đọc `src/data/lessons.json`, kiểm theo schema, thoát mã ≠ 0 nếu lỗi.
2. **Test API** với Jest/Supertest — gọi 2 endpoint, kiểm shape và mã lỗi 404.
3. **E2E** với Playwright — kịch bản: vào trang chủ → vào bài → trả lời 1 câu mỗi kỹ năng.
4. **CI** — chạy 3 bước trên trên mỗi PR.

## Liên kết

- Kế hoạch test chi tiết: [TEST_PLAN.md](TEST_PLAN.md)
- Bộ test case: [TEST_CASES.md](TEST_CASES.md)
- Checklist QA nội dung: [CONTENT_QA_CHECKLIST.md](CONTENT_QA_CHECKLIST.md)
- Mẫu báo cáo bug: [BUG_REPORT_TEMPLATE.md](BUG_REPORT_TEMPLATE.md)
- Schema dữ liệu: [../04_TECH/DATA_STRUCTURE.md](../04_TECH/DATA_STRUCTURE.md)
- Chuẩn bài học: [../02_EDUCATION/LESSON_STANDARD.md](../02_EDUCATION/LESSON_STANDARD.md)
