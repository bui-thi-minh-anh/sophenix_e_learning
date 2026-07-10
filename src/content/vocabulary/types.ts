import type { ExerciseSet } from "@/content/lessons/types";

export interface IrregularVerb {
  stt: number;
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
}

export interface VocabWord {
  id: number;
  word: string;
  ipa_uk: string;
  ipa_us: string;
  part_of_speech: string;
  meaning: string;
  example: string;
}

export interface Collocation {
  phrase: string;
  meaning: string;
}

// Mẫu câu/cấu trúc thường gặp của chủ đề (ví dụ: play + sport, go + V-ing).
export interface CommonPattern {
  pattern: string;
  examples: string[];
}

export interface WordListData {
  vocabulary: VocabWord[];
  collocations: (string | Collocation)[];
  common_patterns?: CommonPattern[];
}

export type VocabLevel =
  | "A1" | "A1-A2" | "A1-B1" | "A1-B2" | "A2" | "A2-B1" | "A2-B2"
  | "B1" | "B1-B2" | "B1-C1" | "B2" | "B2-C1"
  | "C1" | "C2";

export interface VocabTopic {
  slug: string;
  title: string;
  level: VocabLevel;
  category: string;
  summary: string;
  itemCount: number;
  exerciseSets: ExerciseSet[];
}
