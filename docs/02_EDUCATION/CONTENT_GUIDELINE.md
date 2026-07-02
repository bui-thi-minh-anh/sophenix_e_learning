# Hướng dẫn biên soạn nội dung

Tài liệu này hướng dẫn cách viết nội dung học chất lượng cho Sophenix: văn phong, dịch nghĩa, phiên âm IPA, ví dụ song ngữ, tránh nội dung nhạy cảm và quy trình kiểm tra chất lượng.

## 1. Văn phong

- **Tiếng Việt:** rõ ràng, thân thiện, ngắn gọn; xưng "bạn" với người học. Tránh thuật ngữ ngữ pháp rườm rà ở cấp A.
- **Tiếng Anh:** chuẩn, tự nhiên, đúng văn cảnh đời thường. Ưu tiên Anh-Mỹ nhất quán trong toàn bài.
- Câu ví dụ phải là câu hoàn chỉnh, đúng ngữ pháp, dùng được ngay trong giao tiếp.
- Trong `grammar`, dùng thẻ `<b>...</b>` để in đậm cấu trúc/điểm chính (frontend hỗ trợ hiển thị).

## 2. Dịch nghĩa (meaning_vi, example_vi)

- Dịch sát nghĩa nhưng tự nhiên theo tiếng Việt, không dịch máy cứng nhắc.
- `meaning_vi` nêu nghĩa phổ biến nhất trong ngữ cảnh bài; nếu từ đa nghĩa, ghi nghĩa dùng trong ví dụ (vd: `work` → "làm việc / công việc").
- `example_vi` phải khớp đúng nội dung `example_en`.

## 3. Phiên âm IPA (phonetic)

- Bắt buộc cho **mọi** từ vựng; đặt trong dấu gạch chéo: `/ /`.
- Dùng IPA chuẩn. Ví dụ: `hello` → `/həˈloʊ/`, `breakfast` → `/ˈbrekfəst/`.
- Đặt dấu trọng âm `ˈ` trước âm tiết được nhấn.
- Với cụm từ, có thể phiên âm rời từng từ: `wake up` → `/weɪk ʌp/`.

| Từ | Phiên âm đúng | Ghi chú |
|----|---------------|---------|
| name | /neɪm/ | |
| goodbye | /ˌɡʊdˈbaɪ/ | có trọng âm phụ `ˌ` |
| sister | /ˈsɪstər/ | trọng âm âm tiết đầu |

## 4. Ví dụ song ngữ

- Mỗi từ vựng có **ít nhất 1 ví dụ** với cặp `example_en` + `example_vi`.
- Ví dụ nên chứa chính từ đang học, trong tình huống thực tế, gần gũi với người Việt.
- Độ dài ví dụ tăng theo level (xem [CEFR_FRAMEWORK.md](CEFR_FRAMEWORK.md)).

## 5. Tránh nội dung nhạy cảm

Không đưa vào nội dung:

- Chính trị gây tranh cãi, tôn giáo phán xét, phân biệt chủng tộc/giới tính/vùng miền.
- Bạo lực, nội dung người lớn, chất cấm.
- Thông tin cá nhân thật của người khác.
- Định kiến hoặc khuôn mẫu tiêu cực.

> Ưu tiên chủ đề trung lập, tích cực, hữu ích: gia đình, học tập, du lịch, công việc, sở thích, môi trường.

## 6. Quy trình kiểm tra chất lượng (QA)

Trước khi thêm bài vào `src/data/lessons.json`:

1. **Cú pháp JSON:** file vẫn hợp lệ (không lỗi dấu phẩy, ngoặc).
2. **Schema:** đủ các trường theo [LESSON_STANDARD.md](LESSON_STANDARD.md).
3. **Đáp án:** mọi `answer` nằm trong `options` (theo [QUIZ_STANDARD.md](QUIZ_STANDARD.md)).
4. **Phiên âm:** mọi từ có `phonetic` hợp lệ.
5. **Song ngữ:** mọi ví dụ đủ cặp EN/VI và khớp nghĩa.
6. **Level:** độ khó nội dung khớp `level`.
7. **Chạy thử:** mở `npm start`, vào bài học, làm thử 4 kỹ năng.

## Sai sót thường gặp

- Quên dấu `/ /` trong phiên âm.
- `example_vi` không khớp `example_en`.
- Trộn tiếng Anh vào `question`/`prompt_vi` (phải là tiếng Việt).
- Câu ví dụ quá khó so với level.

## Liên kết

- Cấu trúc bài: [LESSON_STANDARD.md](LESSON_STANDARD.md)
- Chuẩn quiz: [QUIZ_STANDARD.md](QUIZ_STANDARD.md)
- Triết lý: [LEARNING_PHILOSOPHY.md](LEARNING_PHILOSOPHY.md)

## Checklist biên soạn

- [ ] Văn phong thân thiện, tiếng Việt rõ ràng.
- [ ] Phiên âm IPA đầy đủ, đúng định dạng.
- [ ] Ví dụ song ngữ khớp nhau, đúng ngữ cảnh.
- [ ] Không có nội dung nhạy cảm.
- [ ] Đã chạy đủ 7 bước QA.
