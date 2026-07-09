import type { ExerciseSet } from "@/content/lessons/types";

export interface IrregularVerb {
  stt: number;
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
}

export type VocabLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface VocabTopic {
  slug: string;
  title: string;
  level: VocabLevel;
  category: string;
  summary: string;
  itemCount: number;
  exerciseSets: ExerciseSet[];
}
