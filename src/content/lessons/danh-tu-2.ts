import type { Lesson } from "./types";

// Nguồn: "Ngữ pháp tiếng Anh trọn đời" (cô Vũ Mai Phương) — Bài 1: Danh từ (2).
export const nounPart2: Lesson = {
  slug: "danh-tu-2",
  title: "Danh từ (2)",
  level: "A0",
  topic: "Danh từ (Noun)",
  series: "Ngữ pháp tiếng Anh trọn đời — cô Vũ Mai Phương",
  summary: "Danh từ đếm được/không đếm được, danh từ ghép và cách chuyển sang số nhiều.",
  sections: [
    {
      heading: "VII. Các loại danh từ",
      body: [
        "- **Đếm được (countable):** đếm trực tiếp được — boy, apple, book, tree.",
        "- **Không đếm được (uncountable):** phải qua đơn vị đo lường — meat, ink, chalk, water.",
        "- **Danh từ đơn:** computer, money, house.",
        "- **Danh từ ghép:** football, software, swimming pool.",
        "",
        "**Một số kiểu danh từ ghép:**",
        "",
        "| Cách | Ví dụ |",
        "|------|-------|",
        "| Danh từ + danh từ | traffic warden, hall door |",
        "| Danh từ + gerund | weight-lifting, bird-watching |",
        "| Gerund + danh từ | waiting-list, swimming-pool |",
        "| Vật liệu | steel door, silk shirt |",
        "| Mục đích | coffee cup, reading lamp |",
      ].join("\n"),
    },
    {
      heading: "VIII. Cách chuyển sang số nhiều",
      body: [
        "**Quy tắc thường:**",
        "1. Hầu hết: **+ s** → boy → boys.",
        "2. Tận cùng s, ss, sh, ch, x, z → **+ es** → box → boxes, church → churches.",
        "3. Phụ âm + y → **y → i + es** → lady → ladies; nguyên âm + y → **+ s** → boy → boys.",
        "4. f/fe → **-ves** → wife → wives (chú ý: roof → roofs).",
        "",
        "**Bất quy tắc:**",
        "- Đổi hình thức: man → men, woman → women, mouse → mice.",
        "- Không đổi: sheep, fish, deer.",
        "- Gốc Latin/Hy Lạp: -us → -i (cactus → cacti), -is → -es (analysis → analyses), -um/-on → -a (phenomenon → phenomena).",
        "",
        "**Đặc biệt:**",
        "- Chỉ có số nhiều: belongings, binoculars, pliers.",
        "- Danh từ ghép đổi từ chính: passer-by → passers-by, mother-in-law → mothers-in-law.",
        "- Số ít nghĩa số nhiều: cattle, people, police. Số nhiều nghĩa số ít: news, billiards, species.",
      ].join("\n"),
    },
  ],
  exerciseSets: [
    {
      id: "bt1",
      title: "Bài tập 1",
      description: "Theo tài liệu",
      exercises: [
        { id: "q1", question: "You should place the _____ and spoons to the left of the plates.", options: [{ key: "A", text: "knifes" }, { key: "B", text: "knives" }, { key: "C", text: "knife" }, { key: "D", text: "knifing" }], answer: "B", explanation: "knife (tận cùng 'fe') → knives." },
        { id: "q2", question: "Are the _____ chasing the other farm animals?", options: [{ key: "A", text: "geese" }, { key: "B", text: "gooses" }, { key: "C", text: "goose" }, { key: "D", text: "goosoes" }], answer: "A", explanation: "goose → geese (bất quy tắc)." },
      ],
    },
    {
      id: "bt2",
      title: "Bài tập 2",
      description: "Luyện thêm số nhiều",
      exercises: [
        { id: "q3", question: "The farmer keeps twenty ______ on his farm.", options: [{ key: "A", text: "sheeps" }, { key: "B", text: "sheep" }, { key: "C", text: "sheepes" }, { key: "D", text: "shept" }], answer: "B", explanation: "sheep giữ nguyên ở số nhiều." },
        { id: "q4", question: "Several ______ ran across the kitchen floor.", options: [{ key: "A", text: "mouses" }, { key: "B", text: "mice" }, { key: "C", text: "mouse" }, { key: "D", text: "mices" }], answer: "B", explanation: "mouse → mice." },
        { id: "q5", question: "The scientists could not explain these natural ______.", options: [{ key: "A", text: "phenomenons" }, { key: "B", text: "phenomena" }, { key: "C", text: "phenomenon" }, { key: "D", text: "phenomenas" }], answer: "B", explanation: "Gốc Hy Lạp -on → -a." },
        { id: "q6", question: "He packed all his ______ before leaving the hotel.", options: [{ key: "A", text: "belonging" }, { key: "B", text: "belongings" }, { key: "C", text: "belongingses" }, { key: "D", text: "belongs" }], answer: "B", explanation: "Danh từ chỉ có dạng số nhiều." },
        { id: "q7", question: "The two ______ get along very well.", options: [{ key: "A", text: "mother-in-laws" }, { key: "B", text: "mothers-in-law" }, { key: "C", text: "mothers-in-laws" }, { key: "D", text: "mother-in-law" }], answer: "B", explanation: "Danh từ ghép đổi ở từ chính 'mother'." },
      ],
    },
  ],
};
