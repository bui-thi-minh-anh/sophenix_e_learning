import type { Lesson } from "./types";

// Nguồn: bộ "Từ loại" (cô Vũ Mai Phương) — Unit 1.
export const wordForms: Lesson = {
  slug: "tu-loai",
  title: "Tìm hiểu chung về các từ loại",
  level: "A0",
  topic: "Từ loại (Parts of Speech)",
  series: "Từ loại — cô Vũ Mai Phương",
  summary: "8 loại từ, các đuôi nhận biết từ loại và vị trí của chúng trong câu.",
  sections: [
    {
      heading: "A. 8 loại từ trong tiếng Anh",
      body: [
        "| Từ loại | Ví dụ |",
        "|---------|-------|",
        "| Danh từ (Noun) | teacher, desk |",
        "| Động từ (Verb) | run, watch |",
        "| Tính từ (Adjective) | nice, awful |",
        "| Trạng từ (Adverb) | quickly, well |",
        "| Đại từ (Pronoun) | them, someone |",
        "| Giới từ (Preposition) | in, for, at |",
        "| Liên từ (Conjunction) | and, so, but |",
        "| Thán từ (Interjection) | Hey, oh dear |",
      ].join("\n"),
    },
    {
      heading: "B. Một số đuôi nhận biết từ loại",
      body: [
        "- **Danh từ:** -ion, -ment, -ness, -ity, -ship, -er/-or, -ee, -ist… (action, movement, happiness, ability).",
        "- **Tính từ:** -ful, -less, -ous, -ive, -al, -able/-ible, -ic, -y (careful, useless, famous, active).",
        "- **Động từ:** -ize, -ify, -ate, -en (realize, simplify, activate, widen).",
        "- **Trạng từ:** -ly (quickly, happily).",
      ].join("\n"),
    },
    {
      heading: "C. Vị trí thường gặp",
      body: [
        "- **Danh từ:** sau mạo từ/tính từ/giới từ; làm chủ ngữ, tân ngữ.",
        "- **Tính từ:** trước danh từ; sau to be và các linking verb (become, seem, look…).",
        "- **Trạng từ:** sau động từ thường; trước tính từ/trạng từ khác; đầu câu.",
      ].join("\n"),
    },
  ],
  exerciseSets: [
    {
      id: "bt1",
      title: "Bài tập 1",
      description: "Chọn dạng từ đúng",
      exercises: [
    { id: "q1", question: "You should turn off the lights before going out to save ______.", options: [{ key: "A", text: "electricity" }, { key: "B", text: "electrify" }, { key: "C", text: "electric" }, { key: "D", text: "electrically" }], answer: "A", explanation: "Sau 'save' cần danh từ." },
    { id: "q2", question: "He is not really friendly and makes no attempt to be ________.", options: [{ key: "A", text: "society" }, { key: "B", text: "socialize" }, { key: "C", text: "social" }, { key: "D", text: "sociable" }], answer: "D", explanation: "Sau 'to be' cần tính từ; sociable = hòa đồng." },
    { id: "q3", question: "Susan has achieved great ______ in her career thanks to her hard work.", options: [{ key: "A", text: "success" }, { key: "B", text: "succeed" }, { key: "C", text: "successful" }, { key: "D", text: "successfully" }], answer: "A", explanation: "Sau tính từ 'great' cần danh từ." },
    { id: "q4", question: "The success of the company in such a _____ market is remarkable.", options: [{ key: "A", text: "compete" }, { key: "B", text: "competitively" }, { key: "C", text: "competitive" }, { key: "D", text: "competition" }], answer: "C", explanation: "Trước danh từ 'market' cần tính từ." },
    { id: "q5", question: "Life here is very _____.", options: [{ key: "A", text: "peacefully" }, { key: "B", text: "peaceful" }, { key: "C", text: "peace" }, { key: "D", text: "peacefulness" }], answer: "B", explanation: "Sau 'very' cần tính từ." },
    { id: "q6", question: "He was so _____ that he had an accident.", options: [{ key: "A", text: "caring" }, { key: "B", text: "careless" }, { key: "C", text: "careful" }, { key: "D", text: "carefully" }], answer: "B", explanation: "Sau 'so' cần tính từ; careless → gây tai nạn." },
    { id: "q7", question: "Farmers can enrich the soil by using ______.", options: [{ key: "A", text: "fertile" }, { key: "B", text: "fertility" }, { key: "C", text: "fertilize" }, { key: "D", text: "fertilizers" }], answer: "D", explanation: "Sau 'using' cần danh từ (số nhiều)." },
    { id: "q8", question: "What's your _______? – I'm Vietnamese.", options: [{ key: "A", text: "nation" }, { key: "B", text: "national" }, { key: "C", text: "nationality" }, { key: "D", text: "international" }], answer: "C", explanation: "Hỏi quốc tịch → danh từ nationality." },
    { id: "q9", question: "In this course, students receive _______ in the basic English grammar.", options: [{ key: "A", text: "instruct" }, { key: "B", text: "instructional" }, { key: "C", text: "instruction" }, { key: "D", text: "instructive" }], answer: "C", explanation: "Sau 'receive' cần danh từ." },
      ],
    },
  ],
};
