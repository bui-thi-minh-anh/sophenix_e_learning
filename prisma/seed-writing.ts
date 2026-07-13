import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const prompts = [
  // ── A1–A2 ────────────────────────────────
  {
    slug: "write-about-yourself",
    title: "About Yourself",
    titleVi: "Viết về bản thân",
    level: "A1",
    category: "personal",
    instruction: "Write about yourself. Include your name, age, where you live, your family, and what you like to do.",
    hints: ["My name is...", "I live in...", "I like..."],
    minWords: 30,
    maxWords: 100,
  },
  {
    slug: "my-best-friend",
    title: "My Best Friend",
    titleVi: "Người bạn thân nhất",
    level: "A2",
    category: "personal",
    instruction: "Write about your best friend. Describe what they look like, their personality, and what you do together.",
    hints: ["He/She is...", "We often...", "I like him/her because..."],
    minWords: 50,
    maxWords: 150,
  },
  {
    slug: "favorite-place",
    title: "My Favorite Place",
    titleVi: "Nơi yêu thích",
    level: "A2",
    category: "descriptive",
    instruction: "Describe your favorite place. Where is it? What does it look like? Why do you like it? How often do you go there?",
    hints: ["My favorite place is...", "It is located...", "I go there because..."],
    minWords: 50,
    maxWords: 150,
  },

  // ── B1 ───────────────────────────────────
  {
    slug: "memorable-holiday",
    title: "A Memorable Holiday",
    titleVi: "Kỳ nghỉ đáng nhớ",
    level: "B1",
    category: "narrative",
    instruction: "Write about a holiday or trip that you remember well. Where did you go? What happened? Why was it memorable?",
    hints: ["Last summer / Two years ago...", "The most interesting part was...", "I will never forget..."],
    minWords: 80,
    maxWords: 200,
  },
  {
    slug: "letter-to-friend",
    title: "Letter to a Friend",
    titleVi: "Thư gửi bạn",
    level: "B1",
    category: "letter",
    instruction: "Write a letter to a friend who is visiting your city for the first time. Suggest places to visit, food to try, and things to do.",
    hints: ["Dear...", "I recommend...", "You should try...", "Looking forward to seeing you."],
    minWords: 80,
    maxWords: 200,
  },
  {
    slug: "advantages-disadvantages-social-media",
    title: "Social Media: Pros and Cons",
    titleVi: "Mạng xã hội: Lợi và hại",
    level: "B1",
    category: "opinion",
    instruction: "Write about the advantages and disadvantages of social media. Give examples and your personal opinion.",
    hints: ["One advantage is...", "On the other hand...", "In my opinion..."],
    minWords: 100,
    maxWords: 250,
  },

  // ── B2 ───────────────────────────────────
  {
    slug: "opinion-online-learning",
    title: "Online vs Traditional Learning",
    titleVi: "Học trực tuyến vs truyền thống",
    level: "B2",
    category: "opinion",
    instruction: "Some people believe online learning is more effective than traditional classroom learning. Do you agree or disagree? Give reasons and examples to support your opinion.",
    hints: ["In recent years...", "While some argue that...", "From my perspective..."],
    minWords: 150,
    maxWords: 300,
  },
  {
    slug: "problem-solution-pollution",
    title: "Solving Air Pollution",
    titleVi: "Giải quyết ô nhiễm không khí",
    level: "B2",
    category: "problem-solution",
    instruction: "Air pollution is a serious problem in many cities. Describe the main causes and suggest possible solutions.",
    hints: ["One of the main causes...", "This leads to...", "A possible solution would be..."],
    minWords: 150,
    maxWords: 300,
  },
  {
    slug: "report-survey-results",
    title: "Survey Report: Reading Habits",
    titleVi: "Báo cáo khảo sát: Thói quen đọc sách",
    level: "B2",
    category: "report",
    instruction: "A recent survey asked 100 students about their reading habits. Write a report summarizing the imagined results: how often they read, what they read, and whether they prefer print or digital books.",
    hints: ["According to the survey...", "The majority of...", "In conclusion..."],
    minWords: 150,
    maxWords: 300,
  },

  // ── C1 ───────────────────────────────────
  {
    slug: "essay-ai-in-education",
    title: "AI in Education",
    titleVi: "AI trong giáo dục",
    level: "C1",
    category: "opinion",
    instruction: "Artificial intelligence is increasingly being used in education. Discuss the potential benefits and risks. Should AI replace human teachers? Support your argument with examples.",
    hints: ["The integration of AI...", "Critics argue that...", "Nevertheless...", "In the final analysis..."],
    minWords: 200,
    maxWords: 400,
  },
  {
    slug: "essay-cultural-globalization",
    title: "Cultural Globalization",
    titleVi: "Toàn cầu hóa văn hóa",
    level: "C1",
    category: "discussion",
    instruction: "Some people believe globalization is destroying local cultures, while others see it as an opportunity for cultural exchange. Discuss both views and give your own opinion.",
    hints: ["Globalization has led to...", "Proponents of this view...", "Conversely...", "Weighing both perspectives..."],
    minWords: 200,
    maxWords: 400,
  },
];

async function main() {
  console.log("Seeding writing prompts...");
  for (let i = 0; i < prompts.length; i++) {
    const p = prompts[i];
    await prisma.writingPrompt.upsert({
      where: { slug: p.slug },
      update: { ...p, order: i },
      create: { ...p, order: i },
    });
  }
  console.log(`  ✓ ${prompts.length} writing prompts seeded`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
