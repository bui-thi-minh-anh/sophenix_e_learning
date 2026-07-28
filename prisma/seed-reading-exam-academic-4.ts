import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The Honey Bee (~750 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac4-honey-bee",
    title: "The Remarkable Honey Bee",
    titleVi: "Loài ong mật đáng kinh ngạc",
    level: "B1",
    category: "mock-academic",
    passage: `The Remarkable Honey Bee

The honey bee (Apis mellifera) is one of the most important insects on Earth — not for the honey it produces, but for its role as a pollinator. An estimated one-third of the food humans consume depends on pollination by bees and other insects. In the United States alone, honey bees pollinate more than $15 billion worth of crops each year, including almonds, apples, blueberries, cherries, avocados, and cucumbers. Without bees, the variety and availability of fresh produce would be dramatically reduced.

A single honey bee colony can contain 20,000 to 80,000 bees, organized into one of the most sophisticated social structures in the animal kingdom. The colony is headed by a queen, whose sole function is to lay eggs — up to 2,000 per day at peak production. The queen can live for two to five years, far longer than worker bees, which typically survive for only five to six weeks during the active summer season. A small number of male bees, called drones, exist solely to mate with a new queen; after mating, drones die.

Worker bees — all female — perform an extraordinary range of tasks that change as they age. During their first three days, they clean cells in the honeycomb. From days 3 to 12, they feed larvae. From days 12 to 18, they produce wax and build honeycomb. From days 18 to 21, they guard the hive entrance. Finally, from day 21 until death, they become foragers, flying up to 8 kilometres from the hive to collect nectar, pollen, water, and plant resins.

Communication among honey bees is remarkably sophisticated. The most famous example is the "waggle dance," first decoded by Austrian zoologist Karl von Frisch, who received the Nobel Prize in Physiology or Medicine in 1973 for this discovery. When a forager bee finds a profitable food source, she returns to the hive and performs a figure-eight dance on the honeycomb surface. The direction of the straight run relative to the vertical indicates the direction of the food source relative to the sun, while the duration of the waggle indicates the distance — approximately one second of waggling corresponds to one kilometre.

Honey production is a complex and labour-intensive process. Forager bees collect nectar from flowers using their long tongues and store it in a special "honey stomach." Upon returning to the hive, they pass the nectar to house bees through mouth-to-mouth transfer. The house bees process the nectar by adding enzymes and repeatedly regurgitating and re-ingesting it to break down complex sugars into simpler ones. They then deposit the processed nectar into honeycomb cells and fan it with their wings to evaporate excess water, reducing the moisture content from approximately 70% to below 18%. Finally, they seal the cell with a wax cap. To produce just one kilogram of honey, bees must visit approximately 4 million flowers and fly a cumulative distance equivalent to four times around the Earth.

Honey bees face numerous threats. Colony Collapse Disorder (CCD), first identified in 2006, involves the sudden disappearance of most worker bees from a colony. While the exact cause remains debated, researchers believe CCD results from a combination of factors including pesticide exposure (particularly neonicotinoids), parasites (especially the Varroa destructor mite), diseases, habitat loss, and poor nutrition due to monoculture farming. Between 2006 and 2023, US beekeepers reported losing an average of 30–40% of their colonies each year.

Conservation efforts include restrictions on harmful pesticides (the European Union banned three neonicotinoids in 2018), programs to plant wildflower corridors along farmland, and urban beekeeping initiatives in cities such as London, Paris, and New York. Public awareness of the importance of pollinators has grown significantly, reflected in the UN's designation of May 20 as World Bee Day since 2018.`,
    questions: [
      { question: "How much are US crops pollinated by honey bees worth annually?", options: ["$5 billion", "$10 billion", "$15 billion", "$20 billion"], answer: "C", explanation: "'more than $15 billion worth of crops each year.'" },
      { question: "How many eggs can a queen lay per day?", options: ["Up to 500", "Up to 1,000", "Up to 1,500", "Up to 2,000"], answer: "D", explanation: "'up to 2,000 per day at peak production.'" },
      { question: "How long do worker bees live in summer?", options: ["2–3 weeks", "5–6 weeks", "8–10 weeks", "3–4 months"], answer: "B", explanation: "'only five to six weeks during the active summer season.'" },
      { question: "Who decoded the waggle dance?", options: ["Charles Darwin", "Karl von Frisch", "E.O. Wilson", "Jane Goodall"], answer: "B", explanation: "'first decoded by Austrian zoologist Karl von Frisch.'" },
      { question: "How far can forager bees fly from the hive?", options: ["Up to 3 km", "Up to 5 km", "Up to 8 km", "Up to 12 km"], answer: "C", explanation: "'flying up to 8 kilometres from the hive.'" },
      { question: "[True / False / Not Given] Honey is approximately 18% water when sealed.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'reducing the moisture content to below 18%.' Below 18%, so it has less than 18%. Technically the statement says 'approximately 18%' which is close but the passage says 'below.' False." },
      { question: "[True / False / Not Given] Colony Collapse Disorder was first identified in 2006.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'first identified in 2006.' True." },
      { question: "[True / False / Not Given] The Varroa mite originally comes from Asia.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions the mite but not its origin. Not Given." },
      { question: "[True / False / Not Given] The EU banned three neonicotinoids in 2018.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'the European Union banned three neonicotinoids in 2018.' True." },
      { question: "[True / False / Not Given] World Bee Day is celebrated on June 20.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'May 20 as World Bee Day.' False — May, not June." },
      { question: "[True / False / Not Given] US beekeepers lose 50% of colonies annually.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'losing an average of 30–40%.' False — 30–40%, not 50%." },
      { question: "How many flowers must bees visit to produce 1 kg of honey?", options: ["1 million", "2 million", "4 million", "8 million"], answer: "C", explanation: "'approximately 4 million flowers.'" },
      { question: "What fraction of human food depends on bee pollination?", options: ["One quarter", "One third", "One half", "Two thirds"], answer: "B", explanation: "'one-third of the food humans consume.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Artificial Intelligence in Healthcare (~850 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac4-ai-healthcare",
    title: "Artificial Intelligence in Healthcare",
    titleVi: "Trí tuệ nhân tạo trong y tế",
    level: "B2",
    category: "mock-academic",
    passage: `Artificial Intelligence in Healthcare

A. Artificial intelligence (AI) is rapidly transforming healthcare, with applications spanning diagnosis, drug discovery, treatment planning, and administrative efficiency. The global AI in healthcare market was valued at $20.9 billion in 2024 and is projected to reach $148.4 billion by 2029, according to MarketsandMarkets. While AI promises to improve patient outcomes and reduce costs, it also raises profound questions about privacy, accountability, and the future role of human physicians.

B. Medical imaging is the area where AI has made the most dramatic impact. Deep learning algorithms can now analyse X-rays, CT scans, MRI images, and pathology slides with accuracy that matches or exceeds that of experienced radiologists. A landmark study published in Nature in 2020 found that Google Health's AI system detected breast cancer in mammograms with 11.5% fewer false negatives and 5.7% fewer false positives than human radiologists. In dermatology, AI systems trained on hundreds of thousands of images can classify skin lesions — distinguishing between benign moles and melanoma — with accuracy comparable to board-certified dermatologists. In ophthalmology, Google's DeepMind developed an AI system that can detect over 50 eye diseases from retinal scans and recommend referral decisions as accurately as world-leading ophthalmologists.

C. Drug discovery, traditionally a process requiring 10–15 years and costing $2–3 billion per approved drug, is being accelerated by AI. Machine learning algorithms can screen millions of molecular compounds in days rather than years, predicting which candidates are most likely to bind to disease targets, have favourable pharmacokinetic properties, and avoid toxic side effects. In 2023, Insilico Medicine became the first company to bring an AI-discovered drug (for idiopathic pulmonary fibrosis) into Phase II clinical trials — achieving in 30 months what typically takes 4–6 years. Recursion Pharmaceuticals uses AI to analyse millions of cellular images to identify drug candidates, claiming to evaluate in one week what would take a traditional lab one year.

D. AI-powered clinical decision support systems are helping physicians make faster, more accurate treatment decisions. IBM Watson for Oncology, though controversial, demonstrated that AI could analyse a patient's medical records, genetic data, and published research to recommend personalised cancer treatment plans that matched expert oncologists' recommendations in 90% of cases. More recently, sepsis prediction algorithms deployed in hospitals have been shown to identify sepsis — a life-threatening condition that kills approximately 270,000 Americans annually — up to 12 hours before clinical symptoms become apparent, enabling earlier intervention and reducing mortality by up to 18%.

E. Administrative AI applications, while less glamorous, may deliver the most immediate cost savings. Natural language processing (NLP) tools can transcribe doctor-patient conversations in real time, automatically generating clinical notes and reducing the estimated 15.5 hours per week that physicians spend on paperwork. AI chatbots triage patient inquiries, directing minor concerns to self-care resources and escalating urgent cases to human providers. Scheduling algorithms optimise appointment booking, reducing patient wait times and no-show rates. McKinsey estimates that administrative AI applications alone could save the US healthcare system $150 billion annually by 2026.

F. Despite its promise, AI in healthcare faces significant challenges. Bias in training data is a critical concern: if AI systems are trained predominantly on data from certain populations, they may perform poorly for underrepresented groups. A widely cited study in Science (2019) found that a healthcare algorithm used by major US hospitals to allocate care was systematically biased against Black patients because it used healthcare spending as a proxy for health need — and Black patients historically spent less on healthcare due to systemic barriers to access, not because they were healthier. Regulatory frameworks struggle to keep pace with rapidly evolving technology: how should an AI diagnosis be regulated? Who is liable when an AI makes a wrong recommendation — the developer, the hospital, or the physician who followed it?

G. The consensus among healthcare experts is that AI will augment, not replace, human physicians. AI excels at pattern recognition in large datasets, but it cannot replicate the empathy, ethical judgement, and complex interpersonal communication that are central to the doctor-patient relationship. The most effective model is likely "centaur medicine" — a hybrid approach in which AI handles data analysis and pattern detection while human physicians provide contextual judgement, emotional support, and final decision-making authority. As Dr. Eric Topol writes in "Deep Medicine" (2019): "The greatest opportunity offered by AI is not replacing human qualities but freeing up time so that doctors can be more human."`,
    questions: [
      { question: "[Matching] Which paragraph discusses AI bias in healthcare?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F discusses bias in training data and the Science study about racial bias." },
      { question: "[Matching] Which paragraph covers drug discovery?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C discusses AI accelerating drug discovery, Insilico Medicine, and Recursion." },
      { question: "[Matching] Which paragraph discusses medical imaging?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B covers mammograms, skin lesions, and eye diseases." },
      { question: "[Matching] Which paragraph argues AI will augment doctors, not replace them?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G discusses 'centaur medicine' and Eric Topol's view." },
      { question: "What is the projected AI healthcare market value by 2029?", options: ["$48.4 billion", "$98.4 billion", "$148.4 billion", "$198.4 billion"], answer: "C", explanation: "'projected to reach $148.4 billion by 2029.'" },
      { question: "[Sentence Completion] Google Health's AI reduced false negatives by _____%.", options: ["5.7", "8.3", "11.5", "15.2"], answer: "C", explanation: "'11.5% fewer false negatives.'" },
      { question: "[Sentence Completion] Traditional drug discovery takes _____–_____ years.", options: ["5–8", "8–12", "10–15", "15–20"], answer: "C", explanation: "'10–15 years.'" },
      { question: "[Sentence Completion] Physicians spend an estimated _____ hours/week on paperwork.", options: ["8.5", "12.5", "15.5", "18.5"], answer: "C", explanation: "'15.5 hours per week.'" },
      { question: "How much could administrative AI save the US healthcare system?", options: ["$50 billion", "$100 billion", "$150 billion", "$200 billion"], answer: "C", explanation: "'$150 billion annually by 2026.'" },
      { question: "How far in advance can sepsis prediction algorithms identify sepsis?", options: ["4 hours", "8 hours", "12 hours", "24 hours"], answer: "C", explanation: "'up to 12 hours before clinical symptoms.'" },
      { question: "How many Americans does sepsis kill annually?", options: ["170,000", "220,000", "270,000", "320,000"], answer: "C", explanation: "'kills approximately 270,000 Americans annually.'" },
      { question: "What term describes the hybrid AI-human approach?", options: ["Deep medicine", "Centaur medicine", "Digital health", "Smart care"], answer: "B", explanation: "'centaur medicine — a hybrid approach.'" },
      { question: "How long did Insilico Medicine take to reach Phase II trials?", options: ["18 months", "24 months", "30 months", "36 months"], answer: "C", explanation: "'achieving in 30 months.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: Language Extinction (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac4-language-extinction",
    title: "Language Extinction: The Disappearing Voices of Humanity",
    titleVi: "Sự tuyệt chủng ngôn ngữ: Những giọng nói đang biến mất",
    level: "C1",
    category: "mock-academic",
    passage: `Language Extinction: The Disappearing Voices of Humanity

A. There are approximately 7,000 languages spoken in the world today, but this number is declining at an alarming rate. UNESCO estimates that a language dies approximately every two weeks, and linguists predict that 50–90% of the world's languages will become extinct by the end of the 21st century. The Catalogue of Endangered Languages (ELCat), maintained by the University of Hawaii, currently lists 3,408 languages as endangered. Of these, 924 are critically endangered — spoken by fewer than 100 people, most of them elderly. When these speakers die, their languages will vanish with them, taking with them unique ways of understanding and describing the world.

B. Language death occurs through a process linguists call "language shift" — the gradual abandonment of a minority language in favour of a dominant one. This shift typically spans three generations. The first generation is fluent in the minority language and uses it at home but also learns the dominant language for economic participation. The second generation understands the minority language but speaks it less frequently, preferring the dominant language for daily life. The third generation grows up speaking only the dominant language, perhaps understanding a few words of the ancestral tongue. The shift is driven by powerful socioeconomic forces: education systems that operate exclusively in the dominant language, media and entertainment in the dominant language, and the perception — often accurate — that economic advancement requires fluency in the dominant language.

C. The loss of a language represents far more than the disappearance of a communication system. Languages encode unique knowledge systems developed over millennia. The Inuit languages of the Arctic contain dozens of terms for different types of snow and ice conditions — distinctions that are not merely linguistic curiosities but practical knowledge essential for survival in polar environments. The Pirahã language of the Brazilian Amazon lacks number words beyond "one" and "two," uses no recursion (the embedding of phrases within phrases), and has no creation myth — challenging fundamental assumptions about linguistic universals proposed by Noam Chomsky. Australian Aboriginal languages contain spatial orientation systems based on cardinal directions rather than relative positions: speakers say "the cup is north of the plate" rather than "the cup is to the left of the plate," resulting in speakers who maintain an extraordinary internal compass.

D. Indigenous botanical and medicinal knowledge, encoded in endangered languages, represents an irreplaceable scientific resource. The Kallawaya people of Bolivia, whose language is spoken by fewer than 100 people, possess pharmacological knowledge of over 600 medicinal plants — many unknown to Western science. Ethnobotanist Mark Plotkin estimates that traditional healers have contributed to the development of 25% of all pharmaceutical drugs currently on the market. When a language dies, this accumulated knowledge — tested and refined over thousands of years — often dies with it, as the knowledge is encoded in oral traditions that have no written form.

E. Language revitalisation efforts have achieved notable successes. Hebrew was effectively a dead language for nearly 2,000 years, used only for religious and scholarly purposes, before being revived as the everyday spoken language of Israel in the late 19th and early 20th centuries — the only fully successful case of a dead language being brought back to daily use. Māori in New Zealand, once declining steeply, has been strengthened through immersive "language nest" (kōhanga reo) preschools established in 1982, bilingual education programs, and the establishment of a dedicated Māori Television channel in 2004. Welsh, which had declined to 19% of the population in 1991, has seen its speaker numbers stabilise and slightly increase to 29.7% by 2022, following concerted government support including the Welsh Language Act of 1993.

F. Technology is increasingly deployed in language preservation and revitalisation. The Endangered Languages Project, a collaboration between Google and the First Peoples' Cultural Council, provides an online platform where communities can upload audio and video recordings of their languages. Machine learning tools are being used to create speech recognition systems and predictive text keyboards for minority languages, lowering the barrier to digital communication. Duolingo has developed courses in Hawaiian, Navajo, Scottish Gaelic, and Yiddish, bringing endangered languages to millions of learners worldwide. However, critics caution that digital tools alone cannot save a language — a language survives only when a community of speakers uses it in daily life, particularly in the home.

G. The debate over language preservation involves complex trade-offs. Pragmatists argue that the global dominance of English, Mandarin, and Spanish facilitates international communication, scientific collaboration, and economic mobility. Preserving thousands of minority languages, they contend, is impractical and may even hinder speakers' economic prospects. Linguists and anthropologists counter that linguistic diversity is a form of intellectual heritage comparable to biodiversity — each language represents a unique experiment in human cognition, and the loss of languages narrows humanity's collective capacity to understand and engage with reality. As linguist K. David Harrison writes: "When we lose a language, we lose centuries of human thinking about time, seasons, sea creatures, reindeer, edible flowers, mathematics, landscapes, myths, music, the unknown, and the everyday."`,
    questions: [
      { question: "[Yes / No / Not Given] More than half of the world's languages may disappear this century.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'50–90% of the world's languages will become extinct by the end of the 21st century.' Yes." },
      { question: "[Yes / No / Not Given] English is the most common language to replace dying languages.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage doesn't specify which dominant language most often replaces others. Not Given." },
      { question: "[Yes / No / Not Given] The Pirahã language has complex number systems.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'lacks number words beyond one and two.' No." },
      { question: "[Yes / No / Not Given] Hebrew was successfully revived as a spoken language.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'the only fully successful case of a dead language being brought back to daily use.' Yes." },
      { question: "[Yes / No / Not Given] Duolingo courses alone can save endangered languages.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'digital tools alone cannot save a language.' No." },
      { question: "How often does a language die according to UNESCO?", options: ["Every week", "Every two weeks", "Every month", "Every two months"], answer: "B", explanation: "'a language dies approximately every two weeks.'" },
      { question: "How many languages are listed as endangered by ELCat?", options: ["2,408", "3,408", "4,408", "5,408"], answer: "B", explanation: "'currently lists 3,408 languages as endangered.'" },
      { question: "[Matching] Which paragraph discusses the process of language shift?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes the three-generation process of language shift." },
      { question: "[Matching] Which paragraph covers medicinal knowledge encoded in languages?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses Kallawaya people and ethnobotanical knowledge." },
      { question: "[Matching] Which paragraph describes technology's role in language preservation?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F covers Google's project, ML tools, and Duolingo." },
      { question: "What percentage of Welsh population spoke Welsh in 2022?", options: ["19%", "24.5%", "29.7%", "35.2%"], answer: "C", explanation: "'slightly increase to 29.7% by 2022.'" },
      { question: "[Summary] The Kallawaya people know about over _____ medicinal plants.", options: ["200", "400", "600", "800"], answer: "C", explanation: "'pharmacological knowledge of over 600 medicinal plants.'" },
      { question: "[Summary] Language shift typically spans _____ generations.", options: ["two", "three", "four", "five"], answer: "B", explanation: "'This shift typically spans three generations.'" },
      { question: "What percentage of pharmaceutical drugs have traditional healer contributions?", options: ["10%", "15%", "20%", "25%"], answer: "D", explanation: "'25% of all pharmaceutical drugs currently on the market.'" },
    ],
  },
];

const examSlug = "ielts-academic-test-4";

async function main() {
  console.log("Seeding IELTS Academic Reading Mock Test 4...\n");
  const passageIds: string[] = [];
  const existingCount = await prisma.readingPassage.count();
  let order = existingCount;

  for (const p of passages) {
    const wc = p.passage.trim().split(/\s+/).length;
    const existing = await prisma.readingPassage.findUnique({ where: { slug: p.slug } });
    if (existing) await prisma.readingQuestion.deleteMany({ where: { passageId: existing.id } });
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: order++ },
    });
    for (let q = 0; q < p.questions.length; q++) {
      const qn = p.questions[q];
      await prisma.readingQuestion.create({ data: { passageId: passage.id, kind: "mcq", question: qn.question, options: qn.options, answer: qn.answer, explanation: qn.explanation, order: q } });
    }
    passageIds.push(passage.id);
    console.log(`  ✓ [${p.level}] ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: "IELTS Academic Reading — Test 4", titleVi: "IELTS Academic Reading — Đề 4", type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 4", titleVi: "IELTS Academic Reading — Đề 4", type: "academic", timeMinutes: 60, order: 3 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
