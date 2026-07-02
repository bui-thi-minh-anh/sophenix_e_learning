# User Stories — Sophenix

> Tài liệu này tập hợp các user story dạng "Là một <người dùng>, tôi muốn... để..." kèm tiêu chí chấp nhận (Acceptance Criteria), bám sát tính năng thực tế của dự án.

## Ký hiệu

- **AC** = Acceptance Criteria (tiêu chí chấp nhận).
- Các story gắn nhãn **(Định hướng tương lai)** chưa nằm trong phạm vi hiện tại.

---

## Nhóm A — Duyệt và xem bài học

### US-01 — Xem danh sách bài học
**Là một** người học, **tôi muốn** xem danh sách các bài học **để** chọn bài phù hợp trình độ.

- AC1: Trang danh sách gọi `GET /api/lessons` và hiển thị `title`, `level`, `topic`, `description`.
- AC2: Mỗi bài có liên kết mở trang chi tiết.
- AC3: Khi không có bài, hiển thị thông báo phù hợp.

### US-02 — Xem chi tiết bài giảng
**Là một** người học, **tôi muốn** xem nội dung đầy đủ một bài **để** học lý thuyết và từ vựng.

- AC1: Trang chi tiết gọi `GET /api/lessons/:id`.
- AC2: Hiển thị `lecture.intro`, `lecture.grammar`.
- AC3: Hiển thị bảng `vocabulary[]` gồm `word`, `phonetic`, `meaning_vi`, `example_en`, `example_vi`.

---

## Nhóm B — Từ vựng

### US-03 — Nghe phát âm từ vựng
**Là một** người học, **tôi muốn** nghe cách phát âm từ **để** học nói đúng.

- AC1: Mỗi từ có nút phát âm dùng **Web Speech API** (TTS).
- AC2: Hoạt động tốt nhất trên Chrome; nếu trình duyệt không hỗ trợ, hiển thị thông báo nhẹ nhàng.

### US-04 — Lưu từ vựng yêu thích *(Định hướng tương lai — GĐ3)*
**Là một** người học đã đăng nhập, **tôi muốn** lưu từ vựng yêu thích **để** ôn lại sau.

- AC1: Có nút lưu/bỏ lưu trên mỗi từ.
- AC2: Danh sách yêu thích gắn với tài khoản.

---

## Nhóm C — Bài tập 4 kỹ năng

### US-05 — Làm bài Nghe (Listening)
**Là một** người học, **tôi muốn** nghe đoạn audio và chọn đáp án **để** luyện nghe.

- AC1: `audioText` được phát bằng TTS.
- AC2: Hiển thị `question` và `options[]`; chọn được một đáp án.
- AC3: So sánh với `answer` để biết đúng/sai (chấm điểm hoàn thiện ở GĐ2).

### US-06 — Làm bài Nói (Speaking)
**Là một** người học, **tôi muốn** nói theo yêu cầu **để** luyện phát âm.

- AC1: Hiển thị `prompt_vi` và `modelAnswer_en`.
- AC2: Dùng speech recognition (Web Speech API) để ghi nhận giọng nói (tốt nhất trên Chrome).

### US-07 — Làm bài Đọc (Reading)
**Là một** người học, **tôi muốn** đọc đoạn văn và trả lời câu hỏi **để** luyện đọc hiểu.

- AC1: Hiển thị `passage`, `question`, `options[]`.
- AC2: So sánh với `answer` để biết đúng/sai.

### US-08 — Làm bài Viết (Writing)
**Là một** người học, **tôi muốn** viết theo đề bài **để** luyện viết.

- AC1: Hiển thị `prompt_vi` và yêu cầu tối thiểu `minWords`.
- AC2: Hiển thị `sampleAnswer_en` để người học tự đối chiếu.

### US-09 — Xem kết quả quiz *(GĐ2)*
**Là một** người học, **tôi muốn** xem điểm sau khi làm quiz **để** biết kết quả.

- AC1: Tổng hợp số câu đúng/sai theo từng kỹ năng.
- AC2: Hiển thị điểm tổng và gợi ý cải thiện.

---

## Nhóm D — Người dùng & tiến độ *(Định hướng tương lai — GĐ3)*

### US-10 — Đăng nhập
**Là một** người học, **tôi muốn** đăng nhập **để** lưu dữ liệu cá nhân.

- AC1: Đăng ký/đăng nhập an toàn.

### US-11 — Theo dõi tiến độ
**Là một** người học đã đăng nhập, **tôi muốn** xem tiến độ **để** biết mình đã học tới đâu.

- AC1: Hiển thị bài đã hoàn thành và điểm quiz theo thời gian.

---

## Nhóm E — Quản trị nội dung

### US-12 — Thêm bài học mới
**Là một** người biên soạn, **tôi muốn** thêm bài học **để** mở rộng nội dung.

- AC1: Thêm một khối lesson mới trong `src/data/lessons.json` với `id` duy nhất.
- AC2: Không cần sửa code; bài mới xuất hiện ở danh sách sau khi khởi động lại.

## Liên kết liên quan

- [Yêu cầu sản phẩm (PRD)](PRODUCT_REQUIREMENT.md)
- [Roadmap](ROADMAP.md)
- [Backlog](../07_BACKLOG/BACKLOG.md)
