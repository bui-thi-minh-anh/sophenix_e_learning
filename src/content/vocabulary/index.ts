import type { IrregularVerb, VocabTopic, WordListData } from "./types";
import type { ExerciseSet } from "@/content/lessons/types";
import irregularVerbs from "./irregular-verbs.json";
import schoolData from "./school.json";
import weatherData from "./weather.json";

const wordListMap: Record<string, WordListData> = {
  school: schoolData as WordListData,
  weather: weatherData as unknown as WordListData,
};

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
  {
    slug: "school",
    title: "School — Trường học",
    level: "A1-A2",
    category: "Chủ đề (Topics)",
    summary: "20 từ vựng cơ bản về trường học, lớp học và dụng cụ học tập.",
    itemCount: schoolData.vocabulary.length,
    exerciseSets: (schoolData as unknown as { exerciseSets: ExerciseSet[] }).exerciseSets,
  },
  {
    slug: "weather",
    title: "Weather — Thời tiết",
    level: "A1-B1",
    category: "Chủ đề (Topics)",
    summary: "20 từ vựng mô tả thời tiết, nhiệt độ và các hiện tượng tự nhiên.",
    itemCount: weatherData.vocabulary.length,
    exerciseSets: weatherData.exerciseSets as unknown as ExerciseSet[],
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

export function getWordListData(slug: string): WordListData | undefined {
  return wordListMap[slug];
}

export type { IrregularVerb, VocabTopic, VocabLevel, VocabWord, WordListData, Collocation } from "./types";
