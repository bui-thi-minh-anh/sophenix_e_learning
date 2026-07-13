import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const passages = [
  {
    slug: "my-school",
    title: "My School",
    titleVi: "Trường học của tôi",
    level: "A1",
    category: "daily-life",
    passage: `My name is Linh. I am 15 years old. I go to Nguyen Trai High School. My school is big and beautiful. It has three floors. There are 30 classrooms, a library, and a computer room. I study many subjects: math, English, science, and history. My favorite subject is English because I want to travel to other countries. My English teacher is Mrs. Hoa. She is very kind and helpful. I go to school from Monday to Friday. School starts at 7:00 AM and finishes at 4:30 PM. I usually walk to school because it is near my house. I love my school because I have many good friends there.`,
    questions: [
      { question: "How old is Linh?", options: ["13 years old", "14 years old", "15 years old", "16 years old"], answer: "C", explanation: "The passage says 'I am 15 years old.'" },
      { question: "How many floors does the school have?", options: ["Two", "Three", "Four", "Five"], answer: "B", explanation: "'It has three floors.'" },
      { question: "What is Linh's favorite subject?", options: ["Math", "Science", "History", "English"], answer: "D", explanation: "'My favorite subject is English.'" },
      { question: "How does Linh go to school?", options: ["By bus", "By bike", "On foot", "By car"], answer: "C", explanation: "'I usually walk to school.'" },
      { question: "Why does Linh like English?", options: ["Because it is easy", "Because she wants to travel", "Because her teacher is kind", "Because her friends like it"], answer: "B", explanation: "'because I want to travel to other countries.'" },
    ],
  },
  {
    slug: "weekend-plans",
    title: "Weekend Plans",
    titleVi: "Kế hoạch cuối tuần",
    level: "A2",
    category: "daily-life",
    passage: `Last weekend, my family went to Vung Tau beach. We left home at 6 o'clock in the morning. The journey took about two hours by car. When we arrived, the weather was sunny and warm. My brother and I swam in the sea while my parents sat under an umbrella. The water was cool and clean. After swimming, we built a sandcastle together. At lunchtime, we ate seafood at a restaurant near the beach. I tried grilled shrimp for the first time — it was delicious! In the afternoon, we took a walk along the beach and collected seashells. We went home at 5 PM. I was tired but very happy. It was one of the best weekends I have ever had.`,
    questions: [
      { question: "Where did the family go last weekend?", options: ["Da Lat", "Nha Trang", "Vung Tau", "Phu Quoc"], answer: "C", explanation: "'my family went to Vung Tau beach.'" },
      { question: "How long was the journey?", options: ["One hour", "Two hours", "Three hours", "Four hours"], answer: "B", explanation: "'The journey took about two hours.'" },
      { question: "What did the parents do at the beach?", options: ["They swam", "They sat under an umbrella", "They built a sandcastle", "They played volleyball"], answer: "B", explanation: "'my parents sat under an umbrella.'" },
      { question: "What food did the writer try for the first time?", options: ["Grilled fish", "Fried rice", "Grilled shrimp", "Seafood soup"], answer: "C", explanation: "'I tried grilled shrimp for the first time.'" },
      { question: "How did the writer feel at the end?", options: ["Sad and bored", "Tired but happy", "Angry and tired", "Excited but sick"], answer: "B", explanation: "'I was tired but very happy.'" },
    ],
  },
  {
    slug: "coffee-culture-vietnam",
    title: "Coffee Culture in Vietnam",
    titleVi: "Văn hóa cà phê Việt Nam",
    level: "B1",
    category: "culture",
    passage: `Vietnam is the second-largest coffee producer in the world, after Brazil. Coffee was first introduced to Vietnam by French colonists in the 19th century. Today, coffee is not just a drink in Vietnam — it is a way of life. Vietnamese people enjoy coffee at any time of day, but especially in the morning and after lunch. The most popular style is "cà phê sữa đá" (iced coffee with condensed milk). This sweet, strong drink is perfect for the hot climate. In big cities like Ho Chi Minh City and Hanoi, there are thousands of coffee shops — from small street-side stalls to modern cafés. Many young people spend hours at coffee shops to study, work, or meet friends. "Egg coffee" (cà phê trứng), invented in Hanoi in the 1940s, has become famous around the world. It is made by whipping egg yolks with condensed milk and pouring the mixture on top of hot coffee. Whether you prefer traditional drip coffee or a trendy specialty drink, Vietnam's coffee culture offers something for everyone.`,
    questions: [
      { question: "Which country is the largest coffee producer in the world?", options: ["Vietnam", "Brazil", "Colombia", "Indonesia"], answer: "B", explanation: "'Vietnam is the second-largest coffee producer in the world, after Brazil.'" },
      { question: "When was coffee introduced to Vietnam?", options: ["17th century", "18th century", "19th century", "20th century"], answer: "C", explanation: "'Coffee was first introduced to Vietnam by French colonists in the 19th century.'" },
      { question: "What is 'cà phê sữa đá'?", options: ["Hot black coffee", "Egg coffee", "Iced coffee with condensed milk", "Green tea latte"], answer: "C", explanation: "The passage defines it as 'iced coffee with condensed milk.'" },
      { question: "Where was egg coffee invented?", options: ["Ho Chi Minh City", "Da Nang", "Hue", "Hanoi"], answer: "D", explanation: "'invented in Hanoi in the 1940s.'" },
      { question: "What do many young people do at coffee shops?", options: ["Only drink coffee", "Study, work, or meet friends", "Play sports", "Watch movies"], answer: "B", explanation: "'Many young people spend hours at coffee shops to study, work, or meet friends.'" },
    ],
  },
  {
    slug: "plastic-pollution",
    title: "The Problem of Plastic Pollution",
    titleVi: "Vấn đề ô nhiễm nhựa",
    level: "B2",
    category: "environment",
    passage: `Plastic pollution has become one of the most pressing environmental issues of our time. Every year, approximately 8 million tons of plastic waste enters the world's oceans. This is equivalent to dumping a garbage truck of plastic into the ocean every minute. Marine animals such as sea turtles, dolphins, and seabirds often mistake plastic debris for food. According to a recent study, 90% of all seabirds have consumed plastic at some point in their lives. Microplastics — tiny plastic particles less than 5 millimeters in size — have been found in drinking water, sea salt, and even human blood. The problem is compounded by the fact that plastic takes between 400 and 1,000 years to decompose. While recycling is often promoted as a solution, only about 9% of all plastic ever produced has been recycled. The rest ends up in landfills, is incinerated, or pollutes the natural environment. Some countries have taken bold steps to address the issue. For example, Rwanda banned single-use plastic bags in 2008, and the European Union passed a directive in 2019 banning several types of single-use plastics. However, experts argue that individual and governmental action alone is not enough — corporations must take responsibility for reducing plastic packaging and investing in sustainable alternatives.`,
    questions: [
      { question: "How much plastic waste enters the oceans each year?", options: ["5 million tons", "8 million tons", "10 million tons", "12 million tons"], answer: "B", explanation: "'approximately 8 million tons of plastic waste enters the world's oceans.'" },
      { question: "What percentage of seabirds have consumed plastic?", options: ["50%", "70%", "80%", "90%"], answer: "D", explanation: "'90% of all seabirds have consumed plastic.'" },
      { question: "How long does plastic take to decompose?", options: ["50–100 years", "100–200 years", "200–400 years", "400–1,000 years"], answer: "D", explanation: "'plastic takes between 400 and 1,000 years to decompose.'" },
      { question: "What percentage of plastic has been recycled?", options: ["About 5%", "About 9%", "About 15%", "About 25%"], answer: "B", explanation: "'only about 9% of all plastic ever produced has been recycled.'" },
      { question: "According to the passage, who else must take responsibility besides individuals and governments?", options: ["Scientists", "Farmers", "Corporations", "Schools"], answer: "C", explanation: "'corporations must take responsibility for reducing plastic packaging.'" },
    ],
  },
  {
    slug: "ai-ethics",
    title: "The Ethics of Artificial Intelligence",
    titleVi: "Đạo đức trí tuệ nhân tạo",
    level: "C1",
    category: "technology",
    passage: `As artificial intelligence systems become increasingly sophisticated, society faces unprecedented ethical challenges. One of the most contentious issues is algorithmic bias. AI systems trained on historical data can perpetuate and even amplify existing societal prejudices. For instance, facial recognition technology has been shown to have significantly higher error rates for people with darker skin tones, raising serious concerns about its use in law enforcement. Another major concern is the impact of AI on employment. A 2023 report by Goldman Sachs estimated that AI could automate approximately 300 million full-time jobs globally. While proponents argue that AI will create new types of employment, critics point out that the transition may disproportionately affect lower-income workers who lack access to retraining programs. The question of AI decision-making in high-stakes situations — such as autonomous vehicles choosing between two harmful outcomes, or AI systems making medical diagnoses — raises profound philosophical questions about accountability and moral responsibility. If an AI system makes a decision that causes harm, who is liable: the developer, the user, or the AI itself? Furthermore, the development of large language models has sparked debates about intellectual property, as these systems are trained on vast amounts of copyrighted material without explicit consent from the original creators. As we navigate these challenges, it is essential to develop robust regulatory frameworks that balance innovation with the protection of fundamental human rights.`,
    questions: [
      { question: "What is algorithmic bias?", options: ["When AI is too slow", "When AI perpetuates societal prejudices from training data", "When AI is too expensive", "When AI replaces all jobs"], answer: "B", explanation: "'AI systems trained on historical data can perpetuate and even amplify existing societal prejudices.'" },
      { question: "What problem was found with facial recognition technology?", options: ["It is too expensive", "It has higher error rates for darker skin tones", "It cannot recognize faces at all", "It works only in daylight"], answer: "B", explanation: "'significantly higher error rates for people with darker skin tones.'" },
      { question: "How many jobs could AI automate according to Goldman Sachs?", options: ["100 million", "200 million", "300 million", "500 million"], answer: "C", explanation: "'AI could automate approximately 300 million full-time jobs globally.'" },
      { question: "What philosophical issue does AI decision-making raise?", options: ["Speed of processing", "Cost of development", "Accountability and moral responsibility", "Energy consumption"], answer: "C", explanation: "'raises profound philosophical questions about accountability and moral responsibility.'" },
      { question: "What does the author suggest is needed?", options: ["Banning all AI", "More AI investment", "Robust regulatory frameworks", "Replacing human workers"], answer: "C", explanation: "'it is essential to develop robust regulatory frameworks.'" },
    ],
  },
];

async function main() {
  console.log("Seeding reading passages...");

  for (let i = 0; i < passages.length; i++) {
    const p = passages[i];
    const wc = p.passage.trim().split(/\s+/).length;

    const existing = await prisma.readingPassage.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await prisma.readingQuestion.deleteMany({ where: { passageId: existing.id } });
    }

    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: i },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: i },
    });

    for (let q = 0; q < p.questions.length; q++) {
      const qn = p.questions[q];
      await prisma.readingQuestion.create({
        data: {
          passageId: passage.id,
          kind: "mcq",
          question: qn.question,
          options: qn.options,
          answer: qn.answer,
          explanation: qn.explanation ?? null,
          order: q,
        },
      });
    }

    console.log(`  ✓ ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
