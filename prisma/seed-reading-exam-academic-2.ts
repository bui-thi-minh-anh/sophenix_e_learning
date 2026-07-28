import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The Printing Press (~750 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac2-printing-press",
    title: "The Development of the Printing Press",
    titleVi: "Sự phát triển của máy in",
    level: "B1",
    category: "mock-academic",
    passage: `The Development of the Printing Press

Before the invention of the printing press, books in Europe were copied by hand, primarily by monks in monasteries. A single book could take months or even years to produce, making books extremely expensive and accessible only to the wealthy and the clergy. It is estimated that in the early 15th century, there were only about 30,000 books in all of Europe. The vast majority of the population was illiterate, and knowledge was controlled by a small elite.

Johannes Gutenberg, a German goldsmith and inventor from Mainz, is widely credited with developing the first mechanical movable-type printing press around 1440. While movable type had been invented earlier in China by Bi Sheng around 1040, and metal movable type was developed in Korea in the 13th century, Gutenberg's innovation was unique in several ways. He developed an oil-based ink that adhered well to metal type, created a hand mould that allowed for the rapid and precise production of individual letter blocks, and adapted a wooden screw press — similar to those used in winemaking — to apply even pressure to the inked type.

Gutenberg's most famous work was the Gutenberg Bible, printed around 1455. Approximately 180 copies were produced, of which 49 are known to survive today. Each copy contained 1,282 pages and was printed on high-quality paper or vellum. The Gutenberg Bible is considered one of the most beautiful examples of the printer's art, with its clean, even lettering and wide margins that allowed owners to add hand-painted decorations.

The impact of the printing press on European society was revolutionary and far-reaching. By 1500 — just 60 years after Gutenberg's invention — an estimated 20 million volumes had been printed across Europe. By 1600, that number had grown to between 150 and 200 million. The cost of books dropped dramatically: a book that once required months of a scribe's labour could now be produced in a fraction of the time at a fraction of the cost.

The printing press played a crucial role in several major historical movements. Martin Luther's 95 Theses, which he reportedly nailed to a church door in Wittenberg in 1517, were quickly printed and distributed across Germany within weeks, sparking the Protestant Reformation. Without the printing press, Luther's ideas might have remained a local theological dispute. Similarly, the printing press enabled the wider distribution of scientific works, contributing to the Scientific Revolution of the 16th and 17th centuries. Nicolaus Copernicus's "On the Revolutions of the Celestial Spheres" (1543) and Isaac Newton's "Principia Mathematica" (1687) reached audiences that would have been impossible in the age of hand-copied manuscripts.

The printing press also transformed education and literacy. As books became cheaper and more widely available, literacy rates rose steadily across Europe. Vernacular languages — French, English, German, Italian — gradually replaced Latin as the language of published works, making knowledge accessible to ordinary people rather than just scholars. The first newspapers appeared in the early 17th century, creating a new form of public information sharing that had never existed before.

Some historians consider the printing press to be the most important invention of the second millennium. Elizabeth Eisenstein, in her landmark study "The Printing Press as an Agent of Change" (1979), argued that printing did not merely spread existing knowledge — it fundamentally changed how knowledge was produced, verified, and accumulated. The ability to produce identical copies of a text meant that scholars in different cities could refer to the same page and line, enabling a new kind of collaborative scholarship. Errors could be identified and corrected in subsequent editions, creating a cumulative process of knowledge improvement that had been impossible with hand-copied manuscripts, where each copy introduced new errors.

Today, Gutenberg's invention is often compared to the internet in terms of its transformative impact on human communication. Both technologies dramatically reduced the cost of distributing information and empowered individuals to access and share knowledge on an unprecedented scale.`,
    questions: [
      { question: "How many books were estimated to exist in Europe in the early 15th century?", options: ["About 10,000", "About 30,000", "About 50,000", "About 100,000"], answer: "B", explanation: "'there were only about 30,000 books in all of Europe.'" },
      { question: "When did Gutenberg develop his printing press?", options: ["Around 1400", "Around 1420", "Around 1440", "Around 1460"], answer: "C", explanation: "'around 1440.'" },
      { question: "How many copies of the Gutenberg Bible survive today?", options: ["39", "49", "59", "69"], answer: "B", explanation: "'of which 49 are known to survive today.'" },
      { question: "How many volumes had been printed by 1500?", options: ["5 million", "10 million", "20 million", "50 million"], answer: "C", explanation: "'an estimated 20 million volumes had been printed.'" },
      { question: "What event did Luther's 95 Theses help spark?", options: ["The French Revolution", "The Protestant Reformation", "The Scientific Revolution", "The Renaissance"], answer: "B", explanation: "'sparking the Protestant Reformation.'" },
      { question: "[True / False / Not Given] Movable type was first invented in Europe.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'movable type had been invented earlier in China by Bi Sheng around 1040.' False." },
      { question: "[True / False / Not Given] Gutenberg was originally trained as a goldsmith.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'a German goldsmith and inventor from Mainz.' True." },
      { question: "[True / False / Not Given] The Gutenberg Bible was printed in Latin.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage does not mention the language of the Gutenberg Bible. Not Given." },
      { question: "[True / False / Not Given] Newspapers first appeared in the 16th century.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'The first newspapers appeared in the early 17th century.' False — 17th, not 16th." },
      { question: "[True / False / Not Given] Gutenberg used a press similar to those used in winemaking.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'adapted a wooden screw press — similar to those used in winemaking.' True." },
      { question: "[True / False / Not Given] Elizabeth Eisenstein published her study in 1989.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'(1979)' — published in 1979, not 1989. False." },
      { question: "[True / False / Not Given] Gutenberg's press could print 500 pages per hour.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage does not mention the speed of printing. Not Given." },
      { question: "What did the printing press fundamentally change according to Eisenstein?", options: ["The art of calligraphy", "How knowledge was produced, verified, and accumulated", "The role of monasteries", "The price of paper"], answer: "B", explanation: "'it fundamentally changed how knowledge was produced, verified, and accumulated.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Coral Reefs (~850 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac2-coral-reefs",
    title: "Coral Reefs: Ecosystems Under Threat",
    titleVi: "Rạn san hô: Hệ sinh thái bị đe dọa",
    level: "B2",
    category: "mock-academic",
    passage: `Coral Reefs: Ecosystems Under Threat

A. Coral reefs are among the most biologically diverse and economically valuable ecosystems on Earth. Often called the "rainforests of the sea," they cover less than 0.1% of the ocean floor yet support approximately 25% of all marine species. An estimated 500 million people worldwide depend directly on coral reefs for food, coastal protection, and livelihoods, with the total global economic value of reef services estimated at $375 billion per year. Despite their importance, coral reefs are disappearing at an alarming rate — scientists estimate that the world has already lost approximately 50% of its coral reef cover since the 1950s.

B. Coral reefs are formed by tiny animals called coral polyps, which secrete calcium carbonate to build hard external skeletons. Over centuries and millennia, these skeletons accumulate to form the massive limestone structures we recognize as reefs. Most reef-building corals have a symbiotic relationship with microscopic algae called zooxanthellae, which live within the coral tissue. The algae provide the coral with up to 90% of its energy through photosynthesis, while the coral provides the algae with shelter and the compounds needed for photosynthesis. This symbiotic relationship is also responsible for the vibrant colours associated with healthy reefs — it is the zooxanthellae, not the coral itself, that produce the pigments.

C. The greatest threat to coral reefs today is climate change. As ocean temperatures rise, corals experience thermal stress that causes them to expel their zooxanthellae — a phenomenon known as coral bleaching. Without their algal partners, the corals turn white and, if temperatures remain elevated for more than a few weeks, the corals starve and die. The Great Barrier Reef, the world's largest coral reef system stretching over 2,300 kilometres along Australia's northeast coast, has experienced five mass bleaching events since 1998, with the most severe occurring in 2016, 2017, 2020, 2022, and 2024. During the 2016 event alone, approximately 29% of the shallow-water corals on the Great Barrier Reef died.

D. Ocean acidification — the decrease in ocean pH caused by the absorption of excess atmospheric carbon dioxide — poses a second major threat. Since the Industrial Revolution, the ocean has absorbed roughly 30% of the CO₂ produced by human activities, causing a 26% increase in ocean acidity. More acidic water makes it harder for corals to build their calcium carbonate skeletons and can dissolve existing reef structures. Scientists project that if current CO₂ emission trends continue, ocean acidity could increase by 150% by the end of the century, reaching levels not seen for at least 20 million years.

E. Local human activities compound these global threats. Overfishing removes herbivorous fish that keep algae growth in check, leading to algal overgrowth that smothers corals. Destructive fishing practices, including the use of dynamite and cyanide, directly destroy reef structures. Coastal development and agricultural runoff introduce sediment, nutrients, and pollutants into reef environments. In Southeast Asia, which contains more than 30% of the world's coral reefs, the combination of these pressures has placed more than 80% of reefs at risk.

F. Conservation efforts are being pursued at multiple scales. Marine Protected Areas (MPAs) restrict human activities in designated reef zones, and research has shown that well-managed MPAs can increase fish biomass by an average of 446% compared to unprotected areas. Coral gardening — growing coral fragments in underwater nurseries and transplanting them onto degraded reefs — has shown promising results in the Caribbean, where organizations like the Coral Restoration Foundation have outplanted over 200,000 corals since 2007. Scientists are also exploring genetic approaches: breeding heat-resistant coral strains and using assisted gene flow to introduce thermal tolerance genes from warm-water populations into cooler-water reefs.

G. Perhaps the most ambitious conservation approach is the development of artificial reefs and 3D-printed reef structures. In 2018, researchers at the University of Hong Kong deployed 128 terracotta tiles designed to mimic the complex structure of natural reef surfaces. After three years, these artificial structures supported 95% of the coral cover found on neighbouring natural reefs. Similarly, a project in the Maldives has used 3D-printed concrete modules to create reef frameworks that attract coral larvae and accelerate reef recovery. While these interventions offer hope, scientists emphasize that no amount of restoration can substitute for addressing the root cause: reducing greenhouse gas emissions to limit global warming to 1.5°C above pre-industrial levels.`,
    questions: [
      { question: "[Matching] Which paragraph explains what causes coral bleaching?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C describes thermal stress causing corals to expel zooxanthellae." },
      { question: "[Matching] Which paragraph discusses ocean acidification?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses decrease in ocean pH from CO₂ absorption." },
      { question: "[Matching] Which paragraph describes human activities threatening reefs locally?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E describes overfishing, destructive practices, and runoff." },
      { question: "[Matching] Which paragraph covers artificial reef technology?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G discusses 3D-printed reefs and terracotta tiles." },
      { question: "What percentage of marine species do coral reefs support?", options: ["About 10%", "About 15%", "About 25%", "About 40%"], answer: "C", explanation: "'support approximately 25% of all marine species.'" },
      { question: "How much energy do zooxanthellae provide to coral?", options: ["Up to 50%", "Up to 70%", "Up to 90%", "Up to 100%"], answer: "C", explanation: "'provide the coral with up to 90% of its energy.'" },
      { question: "[Sentence Completion] The Great Barrier Reef stretches over _____ kilometres.", options: ["1,500", "1,800", "2,300", "3,000"], answer: "C", explanation: "'stretching over 2,300 kilometres.'" },
      { question: "[Sentence Completion] Ocean acidity has increased by _____% since the Industrial Revolution.", options: ["15", "20", "26", "35"], answer: "C", explanation: "'a 26% increase in ocean acidity.'" },
      { question: "[Sentence Completion] Well-managed MPAs can increase fish biomass by an average of _____%.", options: ["200", "300", "446", "500"], answer: "C", explanation: "'increase fish biomass by an average of 446%.'" },
      { question: "How many corals has the Coral Restoration Foundation outplanted?", options: ["Over 50,000", "Over 100,000", "Over 200,000", "Over 500,000"], answer: "C", explanation: "'outplanted over 200,000 corals since 2007.'" },
      { question: "What percentage of corals died during the 2016 bleaching event on the GBR?", options: ["About 15%", "About 22%", "About 29%", "About 35%"], answer: "C", explanation: "'approximately 29% of the shallow-water corals died.'" },
      { question: "How much of the ocean floor do coral reefs cover?", options: ["Less than 0.01%", "Less than 0.1%", "About 1%", "About 5%"], answer: "B", explanation: "'cover less than 0.1% of the ocean floor.'" },
      { question: "What is the estimated annual economic value of coral reef services?", options: ["$175 billion", "$275 billion", "$375 billion", "$475 billion"], answer: "C", explanation: "'estimated at $375 billion per year.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: Psychology of Procrastination (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac2-procrastination",
    title: "The Psychology of Procrastination",
    titleVi: "Tâm lý học của sự trì hoãn",
    level: "C1",
    category: "mock-academic",
    passage: `The Psychology of Procrastination

A. Procrastination — the voluntary delay of an intended action despite expecting to be worse off for the delay — is one of the most widespread yet least understood aspects of human behaviour. Studies consistently show that approximately 20% of adults identify themselves as chronic procrastinators, and the figure rises to as high as 80–95% among university students. Far from being a trivial habit, chronic procrastination is associated with higher levels of stress, anxiety, depression, lower academic performance, reduced income, and even poorer physical health. A meta-analysis by Piers Steel (2007), encompassing 691 studies, established procrastination as one of the strongest negative predictors of academic performance, surpassing even personality traits such as conscientiousness.

B. The traditional view of procrastination as simple laziness or poor time management has been largely discredited by modern psychology. Researchers now understand procrastination primarily as a failure of emotional regulation rather than a failure of willpower or planning. Dr. Timothy Pychyl of Carleton University has argued that procrastination occurs when the negative emotions associated with a task — boredom, frustration, anxiety, self-doubt — overwhelm our capacity to regulate those emotions. Rather than confronting the discomfort, we seek immediate mood repair by switching to a more pleasurable activity: checking social media, watching videos, or cleaning the house instead of writing a report. The irony is that while procrastination provides temporary emotional relief, it invariably creates greater distress in the long run — a phenomenon Pychyl calls "giving in to feel good."

C. Neuroscience research has revealed the brain mechanisms underlying procrastination. Studies using functional magnetic resonance imaging (fMRI) have shown that procrastination involves a conflict between two brain systems: the limbic system, which processes immediate emotions and drives the desire for instant gratification, and the prefrontal cortex, which is responsible for planning, decision-making, and long-term goal pursuit. In chronic procrastinators, the amygdala — the brain's threat-detection centre within the limbic system — tends to be larger and more reactive, generating stronger negative emotional responses to challenging tasks. Simultaneously, the connection between the amygdala and the dorsal anterior cingulate cortex, which helps regulate emotions and filter distractions, is weaker. This neurological profile means that procrastinators experience tasks as more threatening and have fewer neural resources to manage that threat response.

D. Several theoretical frameworks attempt to explain why humans procrastinate. Temporal Motivation Theory (TMT), developed by Piers Steel, provides perhaps the most comprehensive model. TMT proposes that motivation is determined by four factors: expectancy (confidence in completing the task), value (how rewarding the task is), impulsiveness (sensitivity to delay), and delay (time until the deadline). The theory predicts that motivation decreases when a task has low expectancy or value, and increases as the deadline approaches — explaining the common experience of suddenly finding motivation the night before a deadline. TMT also explains why impulsive individuals are more prone to procrastination: their heightened sensitivity to immediate rewards makes distant deadlines feel less urgent.

E. Another influential framework is Self-Determination Theory (SDT), developed by Edward Deci and Richard Ryan. SDT argues that people are most motivated when three basic psychological needs are met: autonomy (feeling that one has choice and control), competence (feeling capable of performing the task), and relatedness (feeling connected to others). Tasks that undermine these needs — assignments imposed without explanation, tasks perceived as too difficult, or solitary work that feels isolating — are more likely to trigger procrastination. Research has supported this connection: a 2019 study by Svartdal and colleagues found that students who perceived their coursework as controlling rather than autonomy-supportive were 2.7 times more likely to procrastinate.

F. The consequences of procrastination extend far beyond missed deadlines. Research by Fuschia Sirois at the University of Sheffield has demonstrated that chronic procrastination is associated with cardiovascular disease, hypertension, and a weakened immune system. The mechanism appears to involve chronic stress: procrastinators experience prolonged periods of guilt, anxiety, and self-recrimination that keep the body's stress response system chronically activated. Sirois found that procrastinators were less likely to engage in preventive health behaviours such as eating healthily, exercising, and attending medical check-ups — not because they lacked health knowledge, but because the emotional discomfort of confronting health-related decisions triggered the same avoidance patterns.

G. Interventions for procrastination have moved beyond simple time-management techniques. Cognitive Behavioural Therapy (CBT) approaches target the distorted thinking patterns that fuel procrastination — catastrophising about a task's difficulty, perfectionistic standards that make any imperfect attempt feel worthless, or the belief that one must feel motivated before starting. Implementation intentions — specific if-then plans such as "If it is 9 AM on Monday, then I will open my laptop and write the first paragraph of my report" — have been shown to reduce procrastination by creating automatic behavioural triggers that bypass the need for deliberate motivation. A randomised controlled trial by Gollwitzer and Sheeran (2006) found that implementation intentions doubled the rate of goal completion. Mindfulness-based interventions, which train individuals to observe and accept uncomfortable emotions without acting on them, have also shown promise in reducing procrastination by directly addressing the emotional regulation deficit at its core.`,
    questions: [
      { question: "[Yes / No / Not Given] The author considers procrastination to be a form of laziness.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'The traditional view of procrastination as simple laziness... has been largely discredited.' The author rejects this view. No." },
      { question: "[Yes / No / Not Given] University students procrastinate more than working adults.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'20% of adults identify themselves as chronic procrastinators' vs '80–95% among university students.' Yes." },
      { question: "[Yes / No / Not Given] Procrastination always leads to poorer work quality.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage discusses negative outcomes but doesn't claim procrastination always results in poorer quality. Not Given." },
      { question: "[Yes / No / Not Given] Timothy Pychyl works at Harvard University.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'Dr. Timothy Pychyl of Carleton University.' No." },
      { question: "[Yes / No / Not Given] Mindfulness interventions can help reduce procrastination.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'Mindfulness-based interventions... have also shown promise in reducing procrastination.' Yes." },
      { question: "According to TMT, which factor does NOT determine motivation?", options: ["Expectancy", "Value", "Personality", "Impulsiveness"], answer: "C", explanation: "TMT lists expectancy, value, impulsiveness, and delay — not personality." },
      { question: "What did Piers Steel's meta-analysis encompass?", options: ["291 studies", "491 studies", "691 studies", "891 studies"], answer: "C", explanation: "'encompassing 691 studies.'" },
      { question: "[Matching] Who developed Temporal Motivation Theory?", options: ["Timothy Pychyl", "Piers Steel", "Edward Deci", "Fuschia Sirois"], answer: "B", explanation: "'Temporal Motivation Theory (TMT), developed by Piers Steel.'" },
      { question: "[Matching] Who researched procrastination's health consequences?", options: ["Piers Steel", "Timothy Pychyl", "Fuschia Sirois", "Richard Ryan"], answer: "C", explanation: "'Research by Fuschia Sirois at the University of Sheffield.'" },
      { question: "[Matching] Who described procrastination as 'giving in to feel good'?", options: ["Piers Steel", "Timothy Pychyl", "Edward Deci", "Gollwitzer"], answer: "B", explanation: "'a phenomenon Pychyl calls \"giving in to feel good.\"'" },
      { question: "How much more likely were students to procrastinate on controlling coursework?", options: ["1.5 times", "2.0 times", "2.7 times", "3.5 times"], answer: "C", explanation: "'2.7 times more likely to procrastinate.'" },
      { question: "[Summary] In chronic procrastinators, the _____ tends to be larger and more reactive.", options: ["prefrontal cortex", "amygdala", "hippocampus", "cerebellum"], answer: "B", explanation: "'the amygdala tends to be larger and more reactive.'" },
      { question: "[Summary] Implementation intentions doubled the rate of _____.", options: ["emotional regulation", "stress reduction", "goal completion", "mindfulness practice"], answer: "C", explanation: "'implementation intentions doubled the rate of goal completion.'" },
      { question: "What three needs does Self-Determination Theory identify?", options: ["Safety, belonging, esteem", "Autonomy, competence, relatedness", "Achievement, power, affiliation", "Survival, comfort, growth"], answer: "B", explanation: "'autonomy, competence, and relatedness.'" },
    ],
  },
];

const examSlug = "ielts-academic-test-2";
const examTitle = "IELTS Academic Reading — Test 2";
const examTitleVi = "IELTS Academic Reading — Đề 2";

async function main() {
  console.log("Seeding IELTS Academic Reading Mock Test 2...\n");
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
    update: { title: examTitle, titleVi: examTitleVi, type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: examTitle, titleVi: examTitleVi, type: "academic", timeMinutes: 60, order: 1 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
