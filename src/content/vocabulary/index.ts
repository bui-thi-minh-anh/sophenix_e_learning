import type { IrregularVerb, VocabTopic, WordListData } from "./types";
import type { ExerciseSet } from "@/content/lessons/types";
import irregularVerbs from "./irregular-verbs.json";
import schoolData from "./school.json";
import weatherData from "./weather.json";
import personalityData from "./personality.json";
import sicknessData from "./sickness.json";
import restaurantData from "./restaurant.json";
import crimeData from "./crime.json";
import sportsData from "./sports.json";
import personality2Data from "./personality-2.json";
import workplaceData from "./workplace.json";
import transportationData from "./transportation.json";
import homeFurnitureData from "./home-furniture.json";
import clothesFashionData from "./clothes-fashion.json";
import familyRelationshipsData from "./family-relationships.json";
import jobsOccupationsData from "./jobs-occupations.json";
import shoppingData from "./shopping.json";
import travelData from "./travel.json";
import foodDrinksData from "./food-drinks.json";

const wordListMap: Record<string, WordListData> = {
  school: schoolData as WordListData,
  weather: weatherData as unknown as WordListData,
  personality: personalityData as unknown as WordListData,
  sickness: sicknessData as unknown as WordListData,
  restaurant: restaurantData as unknown as WordListData,
  crime: crimeData as unknown as WordListData,
  sports: sportsData as unknown as WordListData,
  "personality-2": personality2Data as unknown as WordListData,
  workplace: workplaceData as unknown as WordListData,
  transportation: transportationData as unknown as WordListData,
  "home-furniture": homeFurnitureData as unknown as WordListData,
  "clothes-fashion": clothesFashionData as unknown as WordListData,
  "family-relationships": familyRelationshipsData as unknown as WordListData,
  "jobs-occupations": jobsOccupationsData as unknown as WordListData,
  shopping: shoppingData as unknown as WordListData,
  travel: travelData as unknown as WordListData,
  "food-drinks": foodDrinksData as unknown as WordListData,
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
  {
    slug: "personality",
    title: "Personality — Tính cách",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "30 tính từ mô tả tính cách con người, từ cơ bản đến nâng cao.",
    itemCount: personalityData.vocabulary.length,
    exerciseSets: personalityData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "sickness",
    title: "Sickness — Bệnh tật",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "30 từ vựng về bệnh tật, triệu chứng và chăm sóc sức khỏe.",
    itemCount: sicknessData.vocabulary.length,
    exerciseSets: sicknessData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "restaurant",
    title: "Restaurant — Nhà hàng",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "30 từ vựng về nhà hàng, món ăn và cách chế biến, kèm bài tập giao tiếp.",
    itemCount: restaurantData.vocabulary.length,
    exerciseSets: restaurantData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "crime",
    title: "Crime — Tội phạm & Pháp luật",
    level: "A2-B2",
    category: "Chủ đề (Topics)",
    summary: "40 từ vựng về tội phạm, con người và quy trình pháp luật, kèm bài tập phong phú.",
    itemCount: crimeData.vocabulary.length,
    exerciseSets: crimeData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "sports",
    title: "Sports — Thể thao",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "Từ vựng về các môn thể thao, thi đấu và rèn luyện sức khỏe, kèm bài tập phong phú.",
    itemCount: sportsData.vocabulary.length,
    exerciseSets: sportsData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "personality-2",
    title: "Advanced Personality — Tính cách nâng cao",
    level: "B1-C1",
    category: "Chủ đề (Topics)",
    summary: "40 tính từ nâng cao mô tả tính cách: tinh tế, thao túng, kiên cường, lập dị...",
    itemCount: personality2Data.vocabulary.length,
    exerciseSets: personality2Data.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "workplace",
    title: "Workplace — Nơi làm việc",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "40 từ vựng về văn phòng, chức danh, hành động công việc và 20 collocations thường gặp.",
    itemCount: workplaceData.vocabulary.length,
    exerciseSets: workplaceData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "transportation",
    title: "Transportation — Giao thông",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "50 từ vựng về phương tiện, hạ tầng giao thông, an toàn đường bộ và 30 collocations.",
    itemCount: transportationData.vocabulary.length,
    exerciseSets: transportationData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "home-furniture",
    title: "Home & Furniture — Nhà cửa & Nội thất",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "100 từ vựng về các phòng, đồ nội thất, thiết bị gia dụng, đồ trang trí và tính từ mô tả không gian sống, kèm bài tập phong phú.",
    itemCount: homeFurnitureData.vocabulary.length,
    exerciseSets: homeFurnitureData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "clothes-fashion",
    title: "Clothes & Fashion — Quần áo & Thời trang",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "128 từ vựng về quần áo, giày dép, phụ kiện, chất liệu, họa tiết, màu sắc và động/tính từ mô tả trang phục, kèm bài tập phong phú.",
    itemCount: clothesFashionData.vocabulary.length,
    exerciseSets: clothesFashionData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "family-relationships",
    title: "Family & Relationships — Gia đình & Các mối quan hệ",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "107 từ vựng về gia đình, họ hàng, tình trạng quan hệ, sự kiện đời sống và tính từ/động từ mô tả quan hệ, kèm bài tập phong phú.",
    itemCount: familyRelationshipsData.vocabulary.length,
    exerciseSets: familyRelationshipsData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "jobs-occupations",
    title: "Jobs & Occupations — Nghề nghiệp",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "50 nghề nghiệp phổ biến (y tế, kỹ thuật, dịch vụ, văn phòng, IT...) và 17 collocations về công việc, kèm bài tập phong phú.",
    itemCount: jobsOccupationsData.vocabulary.length,
    exerciseSets: jobsOccupationsData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "shopping",
    title: "Shopping — Mua sắm",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "77 từ vựng về nơi mua sắm, sản phẩm, thanh toán, mua sắm trực tuyến và động/tính từ liên quan, kèm bài tập phong phú.",
    itemCount: shoppingData.vocabulary.length,
    exerciseSets: shoppingData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "travel",
    title: "Travel — Du lịch",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "144 từ vựng về địa điểm, phương tiện, sân bay, giấy tờ, hành lý, chỗ ở, hoạt động và động/tính từ du lịch, kèm bài tập phong phú.",
    itemCount: travelData.vocabulary.length,
    exerciseSets: travelData.exerciseSets as unknown as ExerciseSet[],
  },
  {
    slug: "food-drinks",
    title: "Food & Drinks — Đồ ăn & Thức uống",
    level: "A1-B2",
    category: "Chủ đề (Topics)",
    summary: "120 từ vựng về đồ ăn & thức uống (chủ đề nhiều phần): trái cây, rau củ, thịt, hải sản và trứng–sữa, kèm bài tập phong phú.",
    itemCount: foodDrinksData.vocabulary.length,
    exerciseSets: foodDrinksData.exerciseSets as unknown as ExerciseSet[],
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
