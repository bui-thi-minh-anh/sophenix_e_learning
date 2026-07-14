import type { Lesson } from "./types";
import { wordForms } from "./tu-loai";
import { nounPart1 } from "./danh-tu-1";
import { nounPart2 } from "./danh-tu-2";
import { adjIngEd } from "./tinh-tu-ing-ed";
import { comparison } from "./so-sanh";

// Bài giảng gửi dạng JSON (thả file .json vào thư mục này rồi import ở đây).
import daiTu1 from "./dai-tu-1.json";
import daiTu2 from "./dai-tu-2.json";
import maoTu1 from "./mao-tu-1.json";
import presentSimple from "./present-simple.json";
import presentContinuous from "./present-continuous.json";
import presentPerfect from "./present-perfect.json";
import presentPerfectContinuous from "./present-perfect-continuous.json";
import pastSimpleContinuous from "./past-simple-continuous.json";
import pastPerfect from "./past-perfect.json";
import futureSimple from "./future-simple.json";
import futureAdvanced from "./future-advanced.json";
import tenseAgreement from "./tense-agreement.json";
import presentTensesReview from "./present-tenses-review.json";
import pastTensesReview from "./past-tenses-review.json";
import futureTensesReview from "./future-tenses-review.json";
import dongTu1 from "./dong-tu-1.json";
import dongTu2 from "./dong-tu-2.json";
import gerundInfinitive1 from "./gerund-infinitive-1.json";
import gerundInfinitive2 from "./gerund-infinitive-2.json";
import suHoaHopChuVi1 from "./su-hoa-hop-chu-vi-1.json";
import suHoaHopChuVi2 from "./su-hoa-hop-chu-vi-2.json";
import gioiTu1 from "./gioi-tu-1.json";
import gioiTu2 from "./gioi-tu-2.json";
import gioiTu3 from "./gioi-tu-3.json";

const jsonLessons = [
  daiTu1,
  daiTu2,
  maoTu1,
  presentSimple,
  presentContinuous,
  presentPerfect,
  presentPerfectContinuous,
  pastSimpleContinuous,
  pastPerfect,
  futureSimple,
  futureAdvanced,
  tenseAgreement,
  presentTensesReview,
  pastTensesReview,
  futureTensesReview,
  dongTu1,
  dongTu2,
  gerundInfinitive1,
  gerundInfinitive2,
  suHoaHopChuVi1,
  suHoaHopChuVi2,
  gioiTu1,
  gioiTu2,
  gioiTu3,
] as unknown as Lesson[];

// Danh sách bài giảng (thứ tự hiển thị). Thêm bài mới = import rồi thêm vào mảng này.
export const lessons: Lesson[] = [
  wordForms,
  nounPart1,
  nounPart2,
  adjIngEd,
  comparison,
  ...jsonLessons,
];

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export type { Lesson } from "./types";
