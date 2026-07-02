// Kiểu dữ liệu cho một bài giảng ngữ pháp và bài tập đi kèm.
// Nội dung lý thuyết viết ở dạng markdown (hỗ trợ bảng); bài tập gom thành nhiều "bộ" (Bài tập 1, 2, 3…),
// mỗi bộ người học mở ra làm & nộp riêng (không phải làm hết một lượt).

export type Level = "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface QuizOption {
  key: string; // "A" | "B" | ...
  text: string;
}

export interface Exercise {
  id: string;
  kind?: "mcq" | "fill"; // mặc định "mcq" (trắc nghiệm); "fill" = điền từ
  question: string;
  options?: QuizOption[]; // dùng cho "mcq"
  answer: string; // mcq: key đáp án đúng; fill: từ cần điền
  acceptable?: string[]; // fill: các đáp án khác cũng chấp nhận
  explanation?: string; // giải thích ngắn, hiện sau khi chấm
}

// Một bộ bài tập (ví dụ "Bài tập 1" gồm nhiều câu), nộp & chấm độc lập.
export interface ExerciseSet {
  id: string;
  title: string;
  description?: string;
  exercises: Exercise[];
}

export interface LessonSection {
  heading: string;
  body: string; // markdown
}

export interface Lesson {
  slug: string;
  title: string;
  level: Level;
  topic: string;
  series?: string;
  summary?: string;
  sections: LessonSection[];
  exerciseSets: ExerciseSet[];
}
