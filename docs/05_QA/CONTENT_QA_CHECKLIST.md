# Checklist QA nội dung bài học

> Dùng mỗi khi thêm hoặc sửa một bài học trong `src/data/lessons.json`. Áp dụng cho **một bài**; lặp lại cho từng bài nếu chỉnh nhiều.

## 1. Trường gốc của bài

- [ ] `id` theo định dạng `lesson-NNN`, **không trùng** với bài khác.
- [ ] `title` song ngữ kiểu `English — Tiếng Việt`.
- [ ] `level` thuộc `A1, A2, B1, B2, C1, C2`.
- [ ] `topic` là tiếng Việt, ngắn gọn.
- [ ] `description` ≤ 200 ký tự, mô tả rõ bài học bằng tiếng Việt.

## 2. `lecture`

- [ ] `intro` viết bằng tiếng Việt, nêu mục tiêu bài học.
- [ ] `grammar` giải thích đúng, ngắn gọn; nếu dùng `<b>` thì cân đối, không lạm dụng.
- [ ] `vocabulary` có **ít nhất 4** mục.

Với **mỗi** từ vựng:

- [ ] `word` là cụm tiếng Anh chuẩn (không kèm dấu chấm, không viết hoa lung tung).
- [ ] `phonetic` đặt trong `/ /`, đúng IPA.
- [ ] `meaning_vi` sát nghĩa, là tiếng Việt thông dụng.
- [ ] `example_en` là câu hoàn chỉnh, đúng ngữ pháp, có chứa `word`.
- [ ] `example_vi` là bản dịch tự nhiên, không dịch máy thô.

## 3. `exercises` — 4 kỹ năng đều có

### Listening (≥ 1)

- [ ] `audioText` là câu/đoạn tiếng Anh, độ dài phù hợp level (xem [../02_EDUCATION/QUIZ_STANDARD.md](../02_EDUCATION/QUIZ_STANDARD.md)).
- [ ] `question` viết bằng **tiếng Việt**.
- [ ] `options` đủ số phương án theo level (3 ở A1–A2; 3–4 ở B; 4 ở C).
- [ ] `answer` **trùng tuyệt đối** với một phần tử trong `options`.

### Speaking (≥ 1)

- [ ] `prompt_vi` viết bằng tiếng Việt, nêu rõ câu cần nói.
- [ ] `modelAnswer_en` là một câu ngắn, dễ nhận dạng giọng nói.

### Reading (≥ 1)

- [ ] `passage` là đoạn tiếng Anh, đúng level.
- [ ] `question` tiếng Việt.
- [ ] `answer` ∈ `options` (khớp tuyệt đối).

### Writing (≥ 1)

- [ ] `prompt_vi` tiếng Việt, rõ yêu cầu.
- [ ] `minWords` là số nguyên dương hợp lý theo level.
- [ ] `sampleAnswer_en` có số từ ≥ `minWords`.

## 4. Mã định danh bài tập

- [ ] Mọi `id` bài tập theo gợi ý `l<số bài>-<kỹ năng>-<thứ tự>`, ví dụ `l3-listen-1`.
- [ ] `id` bài tập **duy nhất toàn cục** (không trùng giữa các bài).

## 5. Chất lượng ngôn ngữ

- [ ] Không sai chính tả tiếng Anh (chạy spell-check IDE).
- [ ] Không sai chính tả tiếng Việt (đặc biệt dấu/dấu thanh).
- [ ] Không trộn ngôn ngữ ở chỗ không nên (ví dụ `question` không nên có tiếng Anh).
- [ ] Không xúc phạm, không nhạy cảm, phù hợp người học mọi lứa tuổi.

## 6. Tính nhất quán

- [ ] Cùng `level` với các bài cùng `topic` nếu có (tránh nhảy level đột ngột).
- [ ] Vốn từ trong `exercises` xuất hiện ở `vocabulary` hoặc đã có ở bài trước (không dạy "ngầm" từ chưa giới thiệu).

## 7. Kiểm tra cuối

- [ ] `node -e "JSON.parse(require('fs').readFileSync('src/data/lessons.json','utf-8'))"` chạy không lỗi.
- [ ] Mở `http://localhost:3000/lessons.html` → có bài mới trong danh sách.
- [ ] Mở chi tiết bài → 4 tab kỹ năng làm được trọn một lượt.

## Liên kết

- Chuẩn bài học: [../02_EDUCATION/LESSON_STANDARD.md](../02_EDUCATION/LESSON_STANDARD.md)
- Chuẩn quiz: [../02_EDUCATION/QUIZ_STANDARD.md](../02_EDUCATION/QUIZ_STANDARD.md)
- Hướng dẫn biên soạn: [../02_EDUCATION/CONTENT_GUIDELINE.md](../02_EDUCATION/CONTENT_GUIDELINE.md)
- Test case: [TEST_CASES.md](TEST_CASES.md)
