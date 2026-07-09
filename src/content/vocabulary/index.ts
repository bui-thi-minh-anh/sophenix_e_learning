import type { IrregularVerb, VocabTopic } from "./types";
import irregularVerbs from "./irregular-verbs.json";

const topics: VocabTopic[] = [
  {
    slug: "irregular-verbs",
    title: "360 Động từ bất quy tắc",
    level: "A2",
    category: "Động từ (Verbs)",
    summary: "Bảng tra cứu V1 — V2 — V3 kèm nghĩa tiếng Việt.",
    itemCount: irregularVerbs.length,
    exerciseSets: [],
  },
];

export function getAllVocabTopics(): VocabTopic[] {
  return topics;
}

export function getVocabTopic(slug: string): VocabTopic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getIrregularVerbs(): IrregularVerb[] {
  return irregularVerbs as IrregularVerb[];
}

export type { IrregularVerb, VocabTopic, VocabLevel } from "./types";
