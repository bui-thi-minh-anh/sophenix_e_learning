import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const prompts = [
  // ── A1–A2: Beginner ──────────────────────
  {
    slug: "introduce-yourself",
    title: "Introduce Yourself",
    titleVi: "Giới thiệu bản thân",
    level: "A1",
    category: "describe",
    instruction: "Introduce yourself. Say your name, age, where you are from, and what you do (job or study).",
    hints: ["My name is...", "I am ... years old.", "I come from...", "I am a student / I work as..."],
    durationSec: 60,
  },
  {
    slug: "describe-your-family",
    title: "Describe Your Family",
    titleVi: "Mô tả gia đình",
    level: "A1",
    category: "describe",
    instruction: "Talk about your family. How many people are there? Who are they? What do they do?",
    hints: ["There are ... people in my family.", "My father/mother is...", "My brother/sister..."],
    durationSec: 60,
  },
  {
    slug: "daily-routine",
    title: "My Daily Routine",
    titleVi: "Thói quen hàng ngày",
    level: "A1",
    category: "describe",
    instruction: "Describe your typical day. What time do you wake up? What do you do in the morning, afternoon, and evening?",
    hints: ["I wake up at...", "In the morning, I...", "After lunch, I...", "In the evening, I..."],
    durationSec: 90,
  },
  {
    slug: "favorite-food",
    title: "My Favorite Food",
    titleVi: "Món ăn yêu thích",
    level: "A2",
    category: "describe",
    instruction: "Talk about your favorite food. What is it? Why do you like it? How often do you eat it?",
    hints: ["My favorite food is...", "I like it because...", "It tastes...", "I usually eat it..."],
    durationSec: 60,
  },
  {
    slug: "order-at-restaurant",
    title: "Order at a Restaurant",
    titleVi: "Gọi món tại nhà hàng",
    level: "A2",
    category: "roleplay",
    instruction: "You are at a restaurant. Order a drink and a main dish. Ask about the price. Say thank you.",
    hints: ["Can I have...?", "I'd like to order...", "How much is...?", "Thank you very much."],
    durationSec: 60,
  },
  {
    slug: "ask-for-directions",
    title: "Ask for Directions",
    titleVi: "Hỏi đường",
    level: "A2",
    category: "roleplay",
    instruction: "You are lost. Ask someone how to get to the nearest train station. Thank them for their help.",
    hints: ["Excuse me, could you tell me...?", "How do I get to...?", "Is it far from here?", "Thank you for your help."],
    durationSec: 60,
  },

  // ── B1: Intermediate ─────────────────────
  {
    slug: "describe-your-hometown",
    title: "Describe Your Hometown",
    titleVi: "Mô tả quê hương",
    level: "B1",
    category: "describe",
    instruction: "Describe your hometown or city. Talk about the location, climate, famous places, and what you like or dislike about it.",
    hints: ["It is located in...", "The weather is usually...", "One famous place is...", "What I like most is..."],
    durationSec: 120,
  },
  {
    slug: "talk-about-hobby",
    title: "Talk About a Hobby",
    titleVi: "Nói về sở thích",
    level: "B1",
    category: "describe",
    instruction: "Talk about a hobby you enjoy. When did you start? Why do you enjoy it? How often do you do it?",
    hints: ["I started ... when I was...", "I enjoy it because...", "It helps me to...", "I usually do it..."],
    durationSec: 90,
  },
  {
    slug: "travel-experience",
    title: "A Travel Experience",
    titleVi: "Trải nghiệm du lịch",
    level: "B1",
    category: "retell",
    instruction: "Talk about a memorable trip you have taken. Where did you go? What did you do? What made it special?",
    hints: ["Last year / Two years ago, I went to...", "I traveled with...", "The most memorable thing was...", "I would recommend it because..."],
    durationSec: 120,
  },
  {
    slug: "job-interview",
    title: "Job Interview",
    titleVi: "Phỏng vấn xin việc",
    level: "B1",
    category: "roleplay",
    instruction: "You are in a job interview. Introduce yourself, talk about your experience, and explain why you want this job.",
    hints: ["I have experience in...", "In my previous job, I...", "I am interested in this position because...", "My strengths are..."],
    durationSec: 120,
  },

  // ── B2: Upper-intermediate ────────────────
  {
    slug: "opinion-technology-education",
    title: "Technology in Education",
    titleVi: "Công nghệ trong giáo dục",
    level: "B2",
    category: "opinion",
    instruction: "Do you think technology has a positive or negative effect on education? Give reasons and examples to support your opinion.",
    hints: ["In my opinion...", "One advantage/disadvantage is...", "For example...", "On the other hand..."],
    durationSec: 120,
  },
  {
    slug: "describe-a-person-you-admire",
    title: "A Person You Admire",
    titleVi: "Người bạn ngưỡng mộ",
    level: "B2",
    category: "describe",
    instruction: "Describe a person you admire. Who are they? What qualities do they have? How have they influenced you?",
    hints: ["The person I admire most is...", "What I admire about them is...", "They have influenced me by...", "They taught me that..."],
    durationSec: 120,
  },
  {
    slug: "opinion-remote-work",
    title: "Remote Work vs Office",
    titleVi: "Làm việc từ xa hay văn phòng",
    level: "B2",
    category: "opinion",
    instruction: "Compare working from home and working in an office. Which do you prefer and why? Discuss advantages and disadvantages of each.",
    hints: ["Working from home allows...", "However, office work provides...", "In terms of productivity...", "Personally, I prefer..."],
    durationSec: 120,
  },
  {
    slug: "retell-a-news-story",
    title: "Retell a News Story",
    titleVi: "Kể lại tin tức",
    level: "B2",
    category: "retell",
    instruction: "Think of a recent news story you heard or read. Summarize it and give your opinion about it.",
    hints: ["Recently, I read/heard about...", "According to the report...", "This is significant because...", "In my view..."],
    durationSec: 120,
  },

  // ── C1: Advanced ──────────────────────────
  {
    slug: "discuss-climate-change",
    title: "Climate Change Solutions",
    titleVi: "Giải pháp biến đổi khí hậu",
    level: "C1",
    category: "opinion",
    instruction: "Discuss what individuals and governments can do to address climate change. What do you think is the most effective approach?",
    hints: ["One of the most pressing issues...", "Governments should...", "At an individual level...", "The most effective approach would be..."],
    durationSec: 180,
  },
  {
    slug: "cultural-differences",
    title: "Cultural Differences",
    titleVi: "Khác biệt văn hóa",
    level: "C1",
    category: "opinion",
    instruction: "Discuss how cultural differences can lead to misunderstandings. Share a personal experience or example, and suggest how people can overcome these barriers.",
    hints: ["Cultural differences can...", "For instance, in my experience...", "This often leads to...", "To bridge this gap..."],
    durationSec: 180,
  },
];

async function main() {
  console.log("Seeding speaking prompts...");

  for (let i = 0; i < prompts.length; i++) {
    const p = prompts[i];
    await prisma.speakingPrompt.upsert({
      where: { slug: p.slug },
      update: { ...p, order: i },
      create: { ...p, order: i },
    });
  }

  console.log(`  ✓ ${prompts.length} speaking prompts seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
