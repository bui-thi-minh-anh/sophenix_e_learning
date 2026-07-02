# Prompt soạn nội dung học song ngữ (dùng cho ChatGPT / Claude)

> File này cung cấp prompt dùng cho **bất kỳ trợ lý AI nào** (ChatGPT, Claude…) để soạn nội dung học tiếng Anh song ngữ Anh–Việt đúng văn phong của dự án Sophenix. Phần giải thích bằng tiếng Việt; nội dung prompt có thể song ngữ khi hợp lý.

## Mục đích

Đảm bảo mọi nội dung do AI tạo ra đều: đúng cặp ngôn ngữ Anh–Việt, đúng cấp độ CEFR, có phiên âm IPA cho từ vựng, ví dụ song ngữ tự nhiên, và phù hợp với người Việt học tiếng Anh.

## Văn phong & yêu cầu chất lượng

- **Đối tượng**: người Việt, giải thích bằng tiếng Việt rõ ràng, gần gũi, không dịch máy cứng nhắc.
- **Song ngữ**: mọi câu tiếng Anh phải đi kèm bản dịch tiếng Việt tự nhiên.
- **Từ vựng**: luôn có phiên âm IPA (ví dụ `/ˈwɔːtər/`), nghĩa tiếng Việt, và ví dụ Anh–Việt.
- **Cấp độ**: bám theo CEFR (A1–C2) — xem [docs/02_EDUCATION/CEFR_FRAMEWORK.md](../02_EDUCATION/CEFR_FRAMEWORK.md). Câu và từ vựng phải vừa với cấp độ yêu cầu.
- **Triết lý dạy**: tham khảo [docs/02_EDUCATION/LEARNING_PHILOSOPHY.md](../02_EDUCATION/LEARNING_PHILOSOPHY.md) — học qua tình huống thực tế, ví dụ đời sống.
- **Ngữ pháp**: giải thích ngắn gọn, có thể dùng thẻ `<b>` để in đậm cấu trúc.

## Prompt mẫu (copy được)

```text
Bạn là giáo viên tiếng Anh giàu kinh nghiệm, soạn nội dung song ngữ Anh–Việt cho
người Việt học tiếng Anh trên website Sophenix.

Yêu cầu chung cho mọi nội dung bạn tạo:
- Giải thích bằng tiếng Việt, gần gũi, dễ hiểu, không dịch máy cứng.
- Mọi câu tiếng Anh PHẢI kèm bản dịch tiếng Việt tự nhiên.
- Mỗi từ vựng gồm: từ, phiên âm IPA, nghĩa tiếng Việt, 1 câu ví dụ tiếng Anh + dịch.
- Bám đúng cấp độ CEFR được chỉ định (A1..C2): chọn từ vựng và độ phức tạp câu phù hợp.
- Nội dung lấy bối cảnh đời sống thực tế, hữu ích cho người Việt.

Chủ đề: <topic>
Cấp độ CEFR: <level, ví dụ A2>
Loại nội dung cần soạn: <ví dụ: 8 từ vựng + 1 đoạn hội thoại ngắn>

Trình bày rõ ràng, có tiêu đề cho từng phần.
```

## Ví dụ input → output

**Input**

```text
Chủ đề: At the restaurant (Ở nhà hàng)
Cấp độ CEFR: A2
Loại nội dung cần soạn: 3 từ vựng + 1 câu hội thoại mẫu
```

**Output mong đợi (rút gọn)**

```text
Từ vựng:
1. menu — /ˈmenjuː/ — thực đơn
   VD: Can I see the menu, please? — Cho tôi xem thực đơn được không?
2. order — /ˈɔːrdər/ — gọi món
   VD: I'd like to order now. — Tôi muốn gọi món bây giờ.
3. bill — /bɪl/ — hóa đơn
   VD: Could we have the bill? — Cho chúng tôi xin hóa đơn nhé?

Hội thoại mẫu:
- Waiter: Are you ready to order? — Quý khách gọi món chưa ạ?
- Customer: Yes, I'd like a beef noodle soup. — Vâng, cho tôi một tô phở bò.
```

## Liên kết liên quan

- Sinh nguyên một bài giảng đúng schema JSON: [LESSON_GENERATOR.md](LESSON_GENERATOR.md)
- Sinh bài tập 4 kỹ năng: [QUIZ_GENERATOR.md](QUIZ_GENERATOR.md)
- Định hướng cho Claude Code: [CLAUDE_SYSTEM_PROMPT.md](CLAUDE_SYSTEM_PROMPT.md)
- Tham chiếu kỹ thuật frontend (cách hiển thị nội dung): [docs/architecture.md](../architecture.md)
