import type { Lesson } from "./types";

// Nguồn: bộ "Ngữ pháp trọn đời" — Tính từ, phần phân từ -ing/-ed (Luyện tập ID: ET1016).
export const adjIngEd: Lesson = {
  slug: "tinh-tu-ing-ed",
  title: "Tính từ đuôi -ing / -ed",
  level: "A2",
  topic: "Tính từ (Adjective)",
  series: "Ngữ pháp tiếng Anh trọn đời — cô Vũ Mai Phương",
  summary: "Phân biệt tính từ -ing (chủ động) và -ed (bị động) chỉ cảm xúc.",
  sections: [
    {
      heading: "Quy tắc",
      body: [
        "- **-ing**: sự vật/sự việc **gây** cảm xúc (chủ động) → The film is **interesting**.",
        "- **-ed**: người **bị/cảm thấy** (bị động) → I am **interested** in the film.",
        "",
        "> Nghĩ rằng '-ing dùng cho người, -ed dùng cho vật' là **sai**. Ví dụ: Jane is **bored** because her job is **boring**.",
      ].join("\n"),
    },
  ],
  exerciseSets: [
    {
      id: "bt1",
      title: "Bài tập 1",
      description: "Chọn -ing hoặc -ed",
      exercises: [
    { id: "q1", question: "She recovers very fast. She has made ________ progress.", options: [{ key: "A", text: "astonishing" }, { key: "B", text: "astonished" }], answer: "A", explanation: "'progress' gây kinh ngạc → -ing." },
    { id: "q2", question: "I didn't find the situation funny. I was not ________.", options: [{ key: "A", text: "amused" }, { key: "B", text: "amusing" }], answer: "A", explanation: "Người cảm thấy → -ed (amused)." },
    { id: "q3", question: "When my team didn't win, I was ________.", options: [{ key: "A", text: "disappointing" }, { key: "B", text: "disappointed" }], answer: "B", explanation: "Người thất vọng → -ed." },
    { id: "q4", question: "It was very ________ not to get the job.", options: [{ key: "A", text: "depressing" }, { key: "B", text: "depressed" }], answer: "A", explanation: "Sự việc gây chán nản → -ing." },
    { id: "q5", question: "Philip was exceptionally ________ at Joanne's behaviour.", options: [{ key: "A", text: "annoying" }, { key: "B", text: "annoyed" }], answer: "B", explanation: "Người bực mình → -ed." },
    { id: "q6", question: "We were ________ to hear your good news.", options: [{ key: "A", text: "thrilling" }, { key: "B", text: "thrilled" }], answer: "B", explanation: "Người phấn khích → -ed." },
    { id: "q7", question: "The teacher's explanation was ______. Most students didn't understand it.", options: [{ key: "A", text: "confusing" }, { key: "B", text: "confused" }], answer: "A", explanation: "Lời giải thích gây rối → -ing." },
    { id: "q8", question: "I seldom visit art galleries. I'm not particularly ______ in art.", options: [{ key: "A", text: "interesting" }, { key: "B", text: "interested" }], answer: "B", explanation: "Người quan tâm → -ed." },
      ],
    },
    {
      id: "bt2",
      title: "Bài tập 2",
      description: "Nâng cao & dạng từ",
      exercises: [
    { id: "q9", question: "The lecture was ______. I fell asleep.", options: [{ key: "A", text: "boring" }, { key: "B", text: "bored" }], answer: "A", explanation: "Bài giảng gây chán → -ing." },
    { id: "q10", question: "I've been working very hard all day and now I'm ______.", options: [{ key: "A", text: "exhausting" }, { key: "B", text: "exhausted" }], answer: "B", explanation: "Người kiệt sức → -ed." },
    { id: "q11", question: "I'm starting a new job next week. I'm quite ______ about it.", options: [{ key: "A", text: "exciting" }, { key: "B", text: "excited" }], answer: "B", explanation: "Người háo hức → -ed." },
    { id: "q12", question: "Tom is very good at telling funny stories. He can be very ______.", options: [{ key: "A", text: "amusing" }, { key: "B", text: "amused" }], answer: "A", explanation: "Anh ấy gây vui → -ing." },
    { id: "q13", question: "I've got nothing to do. I'm ______.", options: [{ key: "A", text: "boring" }, { key: "B", text: "bored" }], answer: "B", explanation: "Người thấy chán → -ed." },
    { id: "q14", question: "The internet is dangerous. It can be ______.", options: [{ key: "A", text: "addictive" }, { key: "B", text: "addicted" }, { key: "C", text: "addicting" }], answer: "A", explanation: "addictive = gây nghiện (tính chất)." },
    { id: "q15", question: "Turn off electronic devices when you go out. Be a bit more ______!", options: [{ key: "A", text: "economy" }, { key: "B", text: "economic" }, { key: "C", text: "economical" }], answer: "C", explanation: "economical = tiết kiệm (economic = thuộc kinh tế)." },
      ],
    },
  ],
};
