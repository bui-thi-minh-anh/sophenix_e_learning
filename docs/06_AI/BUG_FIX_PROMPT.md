# Prompt nhờ AI tìm & sửa lỗi trong repo Sophenix

> File này cung cấp khung prompt để nhờ trợ lý AI (Claude Code / ChatGPT) **tìm và sửa lỗi** trong dự án một cách an toàn: mô tả lỗi rõ ràng, chỉ ra file liên quan, ràng buộc không commit/push, và yêu cầu kiểm thử lại.

## Trước khi viết prompt: chuẩn bị thông tin

Một prompt sửa lỗi tốt cần trả lời được:

1. **Triệu chứng**: lỗi xảy ra ở đâu, biểu hiện thế nào (thông báo lỗi, màn hình trắng, nút không bấm được…).
2. **Cách tái hiện**: các bước để gây ra lỗi (mở trang nào, bấm gì, dữ liệu nào).
3. **Kỳ vọng vs thực tế**: lẽ ra phải xảy ra gì, nhưng thực tế xảy ra gì.
4. **File/khu vực nghi ngờ**: ví dụ `src/server.js`, `public/js/lesson.js`, `src/data/lessons.json`.
5. **Môi trường**: chạy bằng `npm start` hay `npm run dev`, trình duyệt nào (Web Speech API phụ thuộc trình duyệt).

## Ràng buộc bắt buộc cho AI

- **KHÔNG `git commit` / `git push`** trừ khi được yêu cầu rõ.
- **Bám đúng stack**: Node.js + Express, HTML/CSS/JS thuần, dữ liệu JSON. Không thêm framework/thư viện nếu không cần thiết.
- Sửa tối thiểu, đúng trọng tâm; không refactor lan man, không thêm tính năng ngoài yêu cầu.
- Giải thích bằng tiếng Việt nguyên nhân lỗi và cách sửa.
- **Kiểm thử lại** sau khi sửa (chạy app, tái hiện lại bước gây lỗi) và báo cáo kết quả.

## Prompt mẫu (copy được)

```text
Bạn là trợ lý lập trình trong repo "Sophenix" (Node.js + Express; frontend
HTML/CSS/JS thuần; dữ liệu trong src/data/lessons.json; Listening = Web Speech API TTS;
Speaking = Web Speech API Speech Recognition).

Hãy tìm và sửa lỗi sau.

# Triệu chứng
<mô tả lỗi: biểu hiện, thông báo lỗi nếu có>

# Cách tái hiện
1. <bước 1>
2. <bước 2>
3. <bước gây lỗi>

# Kỳ vọng vs thực tế
- Kỳ vọng: <điều lẽ ra xảy ra>
- Thực tế: <điều đang xảy ra>

# File/khu vực nghi ngờ
<ví dụ: public/js/lesson.js, src/server.js>

# Môi trường
- Lệnh chạy: <npm start | npm run dev>
- Trình duyệt: <Chrome/Safari/...>

# Ràng buộc
- KHÔNG commit/push.
- Giữ đúng stack, không thêm framework. Sửa tối thiểu, đúng trọng tâm.
- Giải thích nguyên nhân và cách sửa bằng tiếng Việt.
- Sau khi sửa: chạy lại app, tái hiện các bước trên để xác nhận lỗi đã hết,
  và báo cáo kết quả kiểm thử.
```

## Ví dụ áp dụng

**Input**

```text
# Triệu chứng
Bấm nút "Nghe" ở bài tập listening không phát ra âm thanh.

# Cách tái hiện
1. Chạy npm start, mở http://localhost:3000
2. Vào một bài giảng bất kỳ, kéo tới phần Listening
3. Bấm nút "Nghe" → không có tiếng

# Kỳ vọng vs thực tế
- Kỳ vọng: trình duyệt đọc to câu audioText.
- Thực tế: im lặng, console báo "speechSynthesis is not defined" hoặc không có gì.

# File/khu vực nghi ngờ
public/js/lesson.js

# Môi trường
- Lệnh chạy: npm start
- Trình duyệt: Safari

# Ràng buộc
- KHÔNG commit/push. Giữ đúng stack. Giải thích bằng tiếng Việt và kiểm thử lại.
```

**Output mong đợi từ AI (tóm tắt)**

- Chỉ ra nguyên nhân (ví dụ: chưa kiểm tra `'speechSynthesis' in window`, hoặc chưa chọn `voice` tiếng Anh, hoặc Safari chặn phát âm khi chưa có tương tác người dùng).
- Đưa ra sửa đổi tối thiểu trong `public/js/lesson.js`.
- Báo cáo: đã chạy lại `npm start`, bấm "Nghe" và xác nhận có âm thanh.

## Mẹo để AI sửa hiệu quả hơn

- Dán nguyên văn thông báo lỗi trong console (DevTools) nếu có.
- Nếu lỗi liên quan dữ liệu, nói rõ `id` lesson đang gặp lỗi để AI mở đúng mục trong `src/data/lessons.json`.
- Với lỗi nghe/nói, nhắc rõ trình duyệt vì Web Speech API khác nhau giữa Chrome và Safari.

## Liên kết liên quan

- Định hướng chung cho Claude Code: [CLAUDE_SYSTEM_PROMPT.md](CLAUDE_SYSTEM_PROMPT.md)
- Kiến trúc dự án (để khoanh vùng file): [docs/architecture.md](../architecture.md)
- Quy ước làm việc: [docs/conventions.md](../conventions.md)
