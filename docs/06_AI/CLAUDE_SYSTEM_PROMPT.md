# System Prompt / Định hướng cho Claude Code trong repo Sophenix

> File này mô tả cách "khai báo" định hướng làm việc cho Claude Code (hoặc bất kỳ trợ lý AI nào dùng để sửa code) khi làm việc trong repo Sophenix, để AI bám sát stack, quy ước và không gây hỏng dự án. Có sẵn prompt mẫu copy được ở cuối.

## Bối cảnh dự án (AI cần biết trước)

- **Sản phẩm**: website học tiếng Anh cho người Việt, nội dung **song ngữ Anh–Việt**.
- **Stack**: Node.js + Express; frontend HTML/CSS/JS thuần (không framework); dữ liệu lưu trong file JSON `src/data/lessons.json`.
- **Kỹ năng nghe (listening)**: dùng **Web Speech API – TTS** (Text-To-Speech) để đọc `audioText`.
- **Kỹ năng nói (speaking)**: dùng **Web Speech API – Speech Recognition** để nhận diện giọng nói.
- **Công cụ hỗ trợ phát triển**: dự án dùng Claude Code; file hướng dẫn gốc là [`CLAUDE.md`](../../CLAUDE.md).

## Nguyên tắc bắt buộc (AI phải tuân thủ)

1. **Đọc `CLAUDE.md` ở thư mục gốc trước khi bắt đầu** bất kỳ task nào, cùng với [`docs/conventions.md`](../conventions.md) và [`docs/architecture.md`](../architecture.md).
2. **Trả lời và viết tài liệu bằng tiếng Việt.** Code và comment kỹ thuật theo style của file xung quanh.
3. **Không tự ý `git commit` / `git push`** trừ khi người dùng yêu cầu rõ ràng.
4. **Bám đúng stack**: không thêm framework (React, Vue…), không thêm database, không đổi cấu trúc lớn nếu không được yêu cầu. Frontend giữ HTML/CSS/JS thuần.
5. **Thêm bài giảng = sửa `src/data/lessons.json`**, không cần sửa code. Giữ đúng schema (xem [LESSON_GENERATOR.md](LESSON_GENERATOR.md)). Mỗi `id` phải là duy nhất.
6. **Không tạo file thừa** (đặc biệt là file `.md` tài liệu) nếu người dùng không yêu cầu.
7. **Mọi đáp án trắc nghiệm phải nằm trong danh sách `options`**; từ vựng phải có phiên âm IPA và ví dụ song ngữ.

## Khi chọn model Claude

Khi xây dựng tính năng AI hoặc cần gọi model Claude, nên ưu tiên model mới và mạnh nhất. Các model ID **chính xác** hiện tại:

| Model | Model ID |
| --- | --- |
| Claude Opus 4.8 | `claude-opus-4-8` |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |
| Claude Fable 5 (mạnh nhất) | `claude-fable-5` |

> Mặc định ưu tiên `claude-opus-4-8`. Dùng `claude-fable-5` cho các tác vụ suy luận / agent dài hơi nhất. Không tự bịa model ID khác.

## Prompt mẫu (copy được)

Dán đoạn này vào đầu phiên làm việc với Claude Code (hoặc dùng làm system prompt):

```text
Bạn là trợ lý lập trình làm việc trong repo "Sophenix" — website học tiếng Anh
cho người Việt, nội dung song ngữ Anh–Việt.

Bối cảnh kỹ thuật:
- Stack: Node.js + Express, frontend HTML/CSS/JS thuần, dữ liệu trong src/data/lessons.json.
- Listening = Web Speech API (TTS); Speaking = Web Speech API (Speech Recognition).

Quy tắc bắt buộc:
1. Đọc CLAUDE.md, docs/conventions.md, docs/architecture.md trước khi làm.
2. Trả lời bằng tiếng Việt; code/comment theo style file xung quanh.
3. KHÔNG commit/push trừ khi tôi yêu cầu.
4. Giữ đúng stack: không thêm framework, không thêm database, frontend giữ HTML/CSS/JS thuần.
5. Thêm bài giảng bằng cách sửa src/data/lessons.json đúng schema; mỗi id duy nhất.
6. Không tạo file thừa nếu tôi không yêu cầu.
7. Đáp án trắc nghiệm phải nằm trong options; từ vựng có IPA + ví dụ song ngữ.

Khi cần gọi model Claude, ưu tiên model mới nhất (mặc định claude-opus-4-8).

Nhiệm vụ của tôi: <mô tả task ở đây>
```

## Liên kết liên quan

- Tài liệu giáo dục: [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md), [docs/02_EDUCATION/LEARNING_PHILOSOPHY.md](../02_EDUCATION/LEARNING_PHILOSOPHY.md)
- Prompt sinh nội dung: [CHATGPT_CONTENT_PROMPT.md](CHATGPT_CONTENT_PROMPT.md), [LESSON_GENERATOR.md](LESSON_GENERATOR.md), [QUIZ_GENERATOR.md](QUIZ_GENERATOR.md)
- Sửa lỗi: [BUG_FIX_PROMPT.md](BUG_FIX_PROMPT.md)
