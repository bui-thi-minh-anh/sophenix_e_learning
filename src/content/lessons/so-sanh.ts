import type { Lesson } from "./types";

// Nguồn: "Ngữ pháp tiếng Anh trọn đời" (cô Vũ Mai Phương) — Cấp so sánh.
// Lý thuyết rút gọn; bài tập lấy từ đề "THI ONLINE CẤP SO SÁNH (1)".
export const comparison: Lesson = {
  slug: "cap-so-sanh",
  title: "Cấp so sánh",
  level: "B1",
  topic: "So sánh (Comparison)",
  series: "Ngữ pháp tiếng Anh trọn đời — cô Vũ Mai Phương",
  summary: "So sánh bằng, so sánh hơn, so sánh hơn nhất và so sánh kép.",
  sections: [
    {
      heading: "1. So sánh bằng",
      body: [
        "**Công thức:** `As + adj/adv + as`",
        "",
        "- He is **as tall as** me.",
        "- He works **as hard as** me.",
        "- as + adj + noun + as → I earn **as much money as** him.",
        "",
        "Trong so sánh *không bằng* có thể dùng **so… as**: I am **not so/as tall as** you.",
      ].join("\n"),
    },
    {
      heading: "2. So sánh hơn",
      body: [
        "- Tính từ/trạng từ **ngắn**: `Adj/Adv + er + than` → I am **taller than** him.",
        "- Tính từ/trạng từ **dài** (≥ 2 âm tiết): `More + Adj/Adv + than` → She dances **more beautifully than** me.",
        "",
        "**Trường hợp đặc biệt:**",
        "",
        "| Gốc | So sánh hơn |",
        "|-----|-------------|",
        "| good/well | better |",
        "| bad/badly | worse |",
        "| little | less |",
        "| many/much | more |",
        "| far | farther / further |",
        "| old | older / elder |",
        "",
        "Nhấn mạnh: **much/far/a lot** + so sánh hơn (I am **far taller** than you).",
      ].join("\n"),
    },
    {
      heading: "3. So sánh hơn nhất",
      body: [
        "- Ngắn: `The + Adj/Adv + est` → I am **the tallest** student in the class.",
        "- Dài: `The most + Adj/Adv` → She is **the most beautiful** girl in my class.",
        "",
        "Lưu ý: so sánh nhất dùng khi có **từ 3 đối tượng trở lên**, luôn có **the**; hay đi với `S + have + ever + PII` (the best film I've **ever** seen).",
      ].join("\n"),
    },
    {
      heading: "4. So sánh kép",
      body: [
        "- Một chủ ngữ: `adj-er and adj-er` / `more and more + adj` → It is **hotter and hotter**.",
        "- Hai chủ ngữ: `The + so sánh hơn + S + V, the + so sánh hơn + S + V` → **The more** you study, **the higher** your results are.",
      ].join("\n"),
    },
  ],
  exerciseSets: [
    {
      id: "bt1",
      title: "Bài tập 1",
      description: "So sánh hơn & hơn nhất cơ bản",
      exercises: [
    { id: "q1", question: "She is _____ singer I've ever met.", options: [{ key: "A", text: "worse" }, { key: "B", text: "bad" }, { key: "C", text: "the worst" }, { key: "D", text: "badly" }], answer: "C", explanation: "So sánh nhất + 'I've ever met' → the worst." },
    { id: "q2", question: "Mary is _______ responsible as Peter.", options: [{ key: "A", text: "more" }, { key: "B", text: "the most" }, { key: "C", text: "much" }, { key: "D", text: "as" }], answer: "D", explanation: "as + adj + as (so sánh bằng)." },
    { id: "q3", question: "It is _______ in the city than it is in the country.", options: [{ key: "A", text: "noisily" }, { key: "B", text: "more noisier" }, { key: "C", text: "noisier" }, { key: "D", text: "noisy" }], answer: "C", explanation: "'than' → so sánh hơn; noisy là tính từ ngắn → noisier." },
    { id: "q4", question: "She sings _______ among the singers I have known.", options: [{ key: "A", text: "the most beautiful" }, { key: "B", text: "the more beautiful" }, { key: "C", text: "the most beautifully" }, { key: "D", text: "the more beautifully" }], answer: "C", explanation: "Bổ nghĩa động từ 'sings' → trạng từ; so sánh nhất → the most beautifully." },
    { id: "q5", question: "She is ________ student in my class.", options: [{ key: "A", text: "most hard-working" }, { key: "B", text: "more hard-working" }, { key: "C", text: "the most hard-working" }, { key: "D", text: "as hard-working" }], answer: "C", explanation: "So sánh nhất tính từ dài → the most + adj." },
    { id: "q6", question: "The English test was ______ than I thought it would be.", options: [{ key: "A", text: "the easier" }, { key: "B", text: "more easy" }, { key: "C", text: "easiest" }, { key: "D", text: "easier" }], answer: "D", explanation: "'than' + tính từ ngắn 'easy' → easier." },
    { id: "q7", question: "English is thought to be ________ than Math.", options: [{ key: "A", text: "harder" }, { key: "B", text: "the more hard" }, { key: "C", text: "hardest" }, { key: "D", text: "the hardest" }], answer: "A", explanation: "'than' + tính từ ngắn 'hard' → harder." },
    { id: "q8", question: "Jupiter is ________ planet in the solar system.", options: [{ key: "A", text: "the biggest" }, { key: "B", text: "the bigger" }, { key: "C", text: "bigger" }, { key: "D", text: "biggest" }], answer: "A", explanation: "So sánh nhất, luôn có 'the' → the biggest." },
      ],
    },
    {
      id: "bt2",
      title: "Bài tập 2",
      description: "Bất quy tắc & tính từ dài",
      exercises: [
    { id: "q9", question: "She runs _______ in my class.", options: [{ key: "A", text: "the slowest" }, { key: "B", text: "the most slow" }, { key: "C", text: "the slowly" }, { key: "D", text: "the most slowly" }], answer: "A", explanation: "slow/slowly có dạng so sánh nhất 'the slowest'." },
    { id: "q10", question: "My house is _______ hers.", options: [{ key: "A", text: "cheap than" }, { key: "B", text: "cheaper" }, { key: "C", text: "more cheap than" }, { key: "D", text: "cheaper than" }], answer: "D", explanation: "Tính từ ngắn + than → cheaper than." },
    { id: "q11", question: "Her office is _______ away than mine.", options: [{ key: "A", text: "father" }, { key: "B", text: "more far" }, { key: "C", text: "farther" }, { key: "D", text: "farer" }], answer: "C", explanation: "far → farther/further (bất quy tắc)." },
    { id: "q12", question: "Tom is _______ than David.", options: [{ key: "A", text: "handsome" }, { key: "B", text: "the more handsome" }, { key: "C", text: "more handsome" }, { key: "D", text: "the most handsome" }], answer: "C", explanation: "Tính từ dài + than → more handsome than." },
    { id: "q13", question: "He did the test ________ I did.", options: [{ key: "A", text: "as bad as" }, { key: "B", text: "badder than" }, { key: "C", text: "more badly than" }, { key: "D", text: "worse than" }], answer: "D", explanation: "badly → worse (bất quy tắc) + than." },
    { id: "q14", question: "A boat is ______ than a plane.", options: [{ key: "A", text: "slower" }, { key: "B", text: "slowest" }, { key: "C", text: "more slow" }, { key: "D", text: "more slower" }], answer: "A", explanation: "Tính từ ngắn 'slow' → slower." },
    { id: "q15", question: "My new sofa is ______ than the old one.", options: [{ key: "A", text: "more comfortable" }, { key: "B", text: "comfortably" }, { key: "C", text: "more comfortabler" }, { key: "D", text: "comfortable" }], answer: "A", explanation: "Tính từ dài → more comfortable than." },
      ],
    },
  ],
};
