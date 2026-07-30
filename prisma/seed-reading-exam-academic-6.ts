import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-academic-test-6";

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: Urban Farming (~750 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac6-urban-farming",
    title: "Urban Farming: Growing Food in Cities",
    titleVi: "Nông nghiệp đô thị: Trồng thực phẩm trong thành phố",
    level: "B1",
    category: "mock-academic",
    passage: `Urban Farming: Growing Food in Cities

As the world's population becomes increasingly urbanised — with over 56% of people now living in cities, a figure projected to reach 68% by 2050 — the question of how to feed urban populations sustainably has become a pressing concern. Urban farming, the practice of growing food within city boundaries, has emerged as a partial solution that addresses not only food security but also environmental, social, and public health challenges.

Urban farming takes many forms. Community gardens, where residents share plots of land to grow vegetables and fruit, are perhaps the most familiar. New York City alone has over 550 community gardens, many established in the 1970s on vacant lots in low-income neighbourhoods. Rooftop farms utilise otherwise unused building surfaces — Brooklyn Grange, founded in 2010, operates the world's largest rooftop soil farm across two locations totalling approximately 2.5 acres, producing over 50,000 pounds of organically grown produce annually.

Vertical farming represents the most technologically advanced form of urban agriculture. These indoor facilities grow crops in vertically stacked layers using controlled-environment agriculture (CEA) technology. LED lights provide precisely tuned wavelengths for photosynthesis, hydroponic or aeroponic systems deliver nutrients directly to plant roots without soil, and climate control systems maintain optimal temperature and humidity. Vertical farms can produce crop yields 350 to 400 times greater than conventional farming per square metre, while using approximately 95% less water. AeroFarms, based in Newark, New Jersey, operates one of the world's largest vertical farms in a converted steel mill, producing 2 million pounds of greens annually.

The environmental benefits of urban farming are considerable. By growing food where it is consumed, transportation distances — and associated carbon emissions — are dramatically reduced. The average food item in the United States travels approximately 1,500 miles from farm to plate, a journey that contributes significantly to the food system's carbon footprint, which accounts for an estimated 26% of global greenhouse gas emissions. Urban farms also reduce the urban heat island effect, improve air quality, manage stormwater runoff, and support urban biodiversity by providing habitat for pollinators.

Social benefits are equally significant. Community gardens have been shown to strengthen neighbourhood cohesion, reduce crime rates in surrounding areas, and improve mental health outcomes for participants. A study by the University of Pennsylvania found that greening vacant lots in Philadelphia reduced gun violence by 29% in surrounding areas. Urban farming also provides valuable educational opportunities, teaching children and adults about nutrition, ecology, and food systems. In Detroit, which lost over 60% of its population between 1950 and 2020, urban farms have transformed thousands of vacant lots into productive land, creating jobs and revitalising neighbourhoods.

However, urban farming faces significant limitations. High startup and operating costs — particularly for vertical farms, which can require investments of $10–30 million — make profitability challenging. Energy consumption for lighting in vertical farms remains a concern, though costs are decreasing as LED technology improves. The range of crops suitable for indoor growing is currently limited mainly to leafy greens, herbs, and strawberries; calorie-dense staples like wheat, rice, and corn remain impractical for urban cultivation.

Land availability is another constraint. In cities where property values are high, dedicating land to farming rather than housing or commercial development requires strong policy support. Singapore, which imports over 90% of its food, has set a national target of producing 30% of its nutritional needs locally by 2030 — the "30 by 30" goal — through investment in vertical farming, rooftop gardens, and aquaculture.

Despite these challenges, urban farming is growing rapidly. The global vertical farming market was valued at $5.5 billion in 2023 and is projected to reach $24.1 billion by 2030. As technology improves and the pressures of climate change, population growth, and supply chain vulnerability intensify, growing food in cities will likely become not just an option but a necessity.`,
    questions: [
      { question: "What percentage of people currently live in cities?", options: ["About 46%", "About 51%", "About 56%", "About 62%"], answer: "C", explanation: "'over 56% of people now living in cities.'" },
      { question: "How many community gardens does New York City have?", options: ["Over 350", "Over 450", "Over 550", "Over 650"], answer: "C", explanation: "'New York City alone has over 550 community gardens.'" },
      { question: "How much produce does Brooklyn Grange produce annually?", options: ["Over 30,000 pounds", "Over 40,000 pounds", "Over 50,000 pounds", "Over 60,000 pounds"], answer: "C", explanation: "'producing over 50,000 pounds of organically grown produce annually.'" },
      { question: "How much more can vertical farms produce per square metre?", options: ["100–200 times", "200–300 times", "350–400 times", "500–600 times"], answer: "C", explanation: "'350 to 400 times greater than conventional farming per square metre.'" },
      { question: "How much less water do vertical farms use?", options: ["About 75%", "About 85%", "About 90%", "About 95%"], answer: "D", explanation: "'using approximately 95% less water.'" },
      { question: "How far does the average US food item travel?", options: ["About 800 miles", "About 1,200 miles", "About 1,500 miles", "About 2,000 miles"], answer: "C", explanation: "'approximately 1,500 miles from farm to plate.'" },
      { question: "[True / False / Not Given] Greening vacant lots in Philadelphia reduced gun violence by 29%.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'greening vacant lots in Philadelphia reduced gun violence by 29%.'" },
      { question: "[True / False / Not Given] Detroit's population increased by 60% between 1950 and 2020.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Detroit, which lost over 60% of its population.' Lost, not increased. False." },
      { question: "[True / False / Not Given] Vertical farms can grow all types of crops efficiently.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'calorie-dense staples like wheat, rice, and corn remain impractical.' False." },
      { question: "What percentage of food does Singapore import?", options: ["Over 70%", "Over 80%", "Over 90%", "Over 95%"], answer: "C", explanation: "'Singapore, which imports over 90% of its food.'" },
      { question: "What is Singapore's '30 by 30' goal?", options: ["30% renewable energy by 2030", "30% local food production by 2030", "30% green space by 2030", "30% waste reduction by 2030"], answer: "B", explanation: "'producing 30% of its nutritional needs locally by 2030.'" },
      { question: "What was the global vertical farming market worth in 2023?", options: ["$3.5 billion", "$ 4.5 billion", "$5.5 billion", "$7.5 billion"], answer: "C", explanation: "'valued at $5.5 billion in 2023.'" },
      { question: "How much can a vertical farm cost to set up?", options: ["$1–5 million", "$5–15 million", "$10–30 million", "$50–100 million"], answer: "C", explanation: "'investments of $10–30 million.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Ocean Exploration (~850 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac6-ocean-exploration",
    title: "The New Age of Ocean Exploration",
    titleVi: "Kỷ nguyên mới của khám phá đại dương",
    level: "B2",
    category: "mock-academic",
    passage: `The New Age of Ocean Exploration

A. The ocean covers approximately 71% of Earth's surface, contains 97% of the planet's water, and produces more than 50% of the world's oxygen through the photosynthetic activity of marine phytoplankton. Yet despite its overwhelming significance to life on Earth, the ocean remains the least explored frontier on the planet. As of 2024, only about 26.1% of the global ocean floor has been mapped to modern resolution standards — meaning that we have better maps of the surfaces of Mars, the Moon, and Venus than we do of our own planet's seafloor.

B. The history of ocean exploration is one of incremental technological breakthroughs. In 1960, Jacques Piccard and Don Walsh descended to the bottom of the Mariana Trench — the deepest point in the ocean at 10,916 metres — in the bathyscaphe Trieste. The dive lasted 4 hours and 48 minutes, with only 20 minutes spent at the bottom. It would be 52 years before anyone returned: in 2012, filmmaker James Cameron made the journey solo in the Deepsea Challenger, spending approximately 3 hours on the ocean floor. In 2019, Victor Vescovo completed a series of dives to the deepest points of all five oceans in his submersible Limiting Factor, setting a new depth record of 10,928 metres.

C. Modern ocean exploration relies on an array of sophisticated technologies. Multibeam sonar systems mounted on research vessels can map the ocean floor in broad swaths, creating detailed three-dimensional models of underwater terrain. Autonomous underwater vehicles (AUVs) operate without human control, following pre-programmed routes to survey vast areas of the seabed, collecting bathymetric, photographic, and chemical data. Remotely operated vehicles (ROVs), connected to surface ships by cables, allow scientists to manipulate objects, collect samples, and observe deep-sea environments in real time through high-definition cameras. The most advanced ROVs can operate at depths exceeding 6,000 metres.

D. Recent discoveries have highlighted how much remains unknown about the ocean. In 2023, researchers discovered the world's deepest known shipwreck — a World War II destroyer, the USS Samuel B. Roberts, resting at 6,895 metres in the Philippine Sea. Marine biologists continue to identify new species at a remarkable rate: an estimated 2,000 new marine species are described each year, and scientists believe that up to two-thirds of marine species remain unknown to science. The deep ocean hosts ecosystems of extraordinary diversity, from hydrothermal vent communities that derive energy from chemical processes rather than sunlight (chemosynthesis) to vast coral gardens found at depths exceeding 2,000 metres.

E. The Nippon Foundation-GEBCO Seabed 2030 Project, launched in 2017, aims to produce a definitive map of the entire ocean floor by 2030. When the project began, only approximately 6% of the ocean had been mapped using modern multibeam sonar. By 2024, this figure had increased to 26.1%, a remarkable achievement but still leaving almost three-quarters of the ocean floor uncharted. The project relies on crowdsourcing data from commercial ships, research vessels, and autonomous vehicles. New satellite-derived bathymetry techniques, which infer seafloor topography from variations in sea surface height caused by the gravitational pull of underwater features, complement ship-based measurements.

F. The economic stakes of ocean exploration are enormous. An estimated $30 trillion worth of mineral resources lies on the ocean floor, including polymetallic nodules rich in manganese, nickel, cobalt, and copper — metals essential for battery production and renewable energy technologies. The International Seabed Authority (ISA) has issued 31 exploration contracts covering over 1.5 million square kilometres of the deep seabed. However, deep-sea mining faces intense opposition from environmental groups, who warn that disturbing the seabed could destroy fragile ecosystems that take centuries or millennia to recover. In 2023, over 700 scientists signed a statement calling for a moratorium on deep-sea mining until its environmental impacts are better understood.

G. Marine biotechnology represents another frontier. Deep-sea organisms, adapted to extreme conditions of pressure, temperature, and chemistry, produce unique biochemical compounds with potential pharmaceutical applications. A compound from a Caribbean sea sponge led to the development of vidarabine, an antiviral drug, and cytarabine, a chemotherapy agent. Currently, over 30,000 marine natural products have been identified, but fewer than 1% have been evaluated for pharmaceutical potential. The ocean may contain the raw material for future breakthroughs in medicine, industrial chemistry, and materials science — but only if its biodiversity is preserved.`,
    questions: [
      { question: "[Matching] Which paragraph discusses the economic value of ocean resources?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F covers $30 trillion in minerals and ISA contracts." },
      { question: "[Matching] Which paragraph covers technologies used in ocean exploration?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "B", explanation: "Paragraph C discusses multibeam sonar, AUVs, and ROVs." },
      { question: "[Matching] Which paragraph discusses marine biotechnology?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G covers pharmaceutical applications from marine organisms." },
      { question: "[Matching] Which paragraph describes the Seabed 2030 project?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E details the GEBCO Seabed 2030 Project goals and progress." },
      { question: "What percentage of the ocean floor has been mapped to modern standards?", options: ["About 15%", "About 20%", "About 26%", "About 35%"], answer: "C", explanation: "'only about 26.1% of the global ocean floor has been mapped.'" },
      { question: "How deep is the Mariana Trench?", options: ["8,916 metres", "9,916 metres", "10,916 metres", "11,916 metres"], answer: "C", explanation: "'the deepest point in the ocean at 10,916 metres.'" },
      { question: "How many new marine species are described each year?", options: ["About 500", "About 1,000", "About 2,000", "About 5,000"], answer: "C", explanation: "'an estimated 2,000 new marine species are described each year.'" },
      { question: "[True / False / Not Given] Victor Vescovo set a depth record of 10,928 metres.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'setting a new depth record of 10,928 metres.' True." },
      { question: "[True / False / Not Given] The Seabed 2030 project began in 2015.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'launched in 2017.' False — 2017, not 2015." },
      { question: "[True / False / Not Given] Deep-sea mining has already begun on a commercial scale.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage discusses exploration contracts and opposition but doesn't say mining has begun commercially. Not Given." },
      { question: "How many marine natural products have been identified?", options: ["Over 10,000", "Over 20,000", "Over 30,000", "Over 50,000"], answer: "C", explanation: "'over 30,000 marine natural products have been identified.'" },
      { question: "How many scientists called for a mining moratorium in 2023?", options: ["Over 300", "Over 500", "Over 700", "Over 1,000"], answer: "C", explanation: "'over 700 scientists signed a statement.'" },
      { question: "How much of the ocean was mapped when Seabed 2030 began?", options: ["About 3%", "About 6%", "About 10%", "About 15%"], answer: "B", explanation: "'only approximately 6% of the ocean had been mapped.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: Cognitive Biases (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac6-cognitive-biases",
    title: "Cognitive Biases and Decision Making",
    titleVi: "Thiên kiến nhận thức và ra quyết định",
    level: "C1",
    category: "mock-academic",
    passage: `Cognitive Biases and Decision Making

The classical economic model of human behaviour, homo economicus, assumes that people make rational decisions by systematically evaluating available information, weighing costs and benefits, and choosing the option that maximises their utility. This elegant theoretical framework dominated economic thinking for over a century. However, beginning in the 1970s, psychologists Daniel Kahneman and Amos Tversky conducted a series of groundbreaking experiments that revealed systematic and predictable deviations from rationality — cognitive biases that affect everyone, regardless of intelligence or expertise. Their work, which earned Kahneman the Nobel Prize in Economics in 2002 (Tversky having died in 1996), launched the field of behavioural economics and fundamentally changed our understanding of human decision-making.

Kahneman's influential framework, elaborated in his bestselling book "Thinking, Fast and Slow" (2011), distinguishes between two modes of cognitive processing. System 1 operates automatically, quickly, with little effort and no sense of voluntary control — it is the intuitive, pattern-recognising system that enables you to detect hostility in a voice, read large text on a billboard, or duck when a ball flies toward your head. System 2, by contrast, allocates attention to effortful mental activities — complex computations, logical reasoning, and deliberate choices. System 2 is what we typically consider "thinking," but it is slow, lazy, and easily depleted. Most of our daily decisions are made by System 1, which is efficient but prone to systematic errors.

The anchoring effect is one of the most robust and well-replicated cognitive biases. People's judgments are heavily influenced by an initial piece of information — the "anchor" — even when that anchor is arbitrary or irrelevant. In a famous experiment, Kahneman and Tversky spun a rigged wheel of fortune that could only land on 10 or 65, then asked participants to estimate the percentage of African countries in the United Nations. Those who saw 10 estimated an average of 25%, while those who saw 65 estimated 45%. Real estate agents shown identical properties with different listing prices consistently rated higher-priced homes as more valuable, even when the listing price was deliberately set above or below market value. Retail pricing exploits anchoring through "original price" tags that make discounted prices seem more attractive, and restaurants often place expensive dishes at the top of menus to make everything else seem reasonably priced.

The availability heuristic leads people to judge the frequency or probability of events based on how easily examples come to mind. Because dramatic events like plane crashes, terrorist attacks, and shark attacks receive extensive media coverage, people systematically overestimate their likelihood. In reality, the annual probability of dying in a plane crash is approximately 1 in 11 million, while the probability of dying in a car accident is 1 in 5,000 — yet surveys consistently show that more people fear flying than driving. Physicians are not immune: doctors who have recently treated a patient with a rare disease are more likely to diagnose subsequent patients with the same condition, even when symptoms point elsewhere.

Loss aversion, perhaps the most consequential bias for economic behaviour, describes the finding that losses loom approximately twice as large as equivalent gains in psychological impact. A person offered a coin flip that pays $110 for heads and costs $100 for tails will typically decline, even though the expected value is positive ($5). Loss aversion explains why investors hold losing stocks too long (hoping to avoid realising a loss) and sell winning stocks too quickly (locking in gains), a pattern known as the disposition effect. It also explains why companies offer "free trials" — once customers possess a product, the pain of losing it (through cancellation) outweighs the original cost of acquiring it, even if the product provides modest value.

Confirmation bias — the tendency to seek, interpret, and remember information that confirms pre-existing beliefs while disregarding contradictory evidence — is arguably the most socially consequential cognitive bias in the age of social media. People actively construct information environments that reinforce their existing views: a 2020 study found that Twitter users are 58% more likely to share political news stories that align with their ideological position. Search engines and social media algorithms amplify this tendency by personalising content feeds, creating what Eli Pariser termed "filter bubbles." The implications for democratic discourse are profound — when citizens inhabit fundamentally different information ecosystems, finding common ground becomes extraordinarily difficult.

The sunk cost fallacy describes the tendency to continue investing in a losing proposition because of resources already committed rather than evaluating the decision based on future prospects alone. Governments spend billions completing infrastructure projects that have exceeded their budgets and timelines, corporations continue developing products that market research suggests will fail, and individuals remain in unsatisfying careers or relationships because of "time already invested." The Concorde supersonic jet, which was kept in operation for 27 years despite never turning a profit, became so emblematic of this bias that economists coined the term "Concorde fallacy" as a synonym.

Understanding cognitive biases does not eliminate them — even Kahneman himself has acknowledged that awareness of biases provides limited protection against falling prey to them. However, institutional safeguards can mitigate their effects: checklists and decision protocols force System 2 engagement, diverse teams counteract individual biases, pre-mortem analyses (imagining that a project has failed and working backward to identify reasons) expose overconfident assumptions, and "nudge" architecture — structuring choices so that the default option is the optimal one — has been successfully applied in contexts ranging from retirement savings to organ donation.`,
    questions: [
      { question: "When did Kahneman receive the Nobel Prize in Economics?", options: ["1998", "2000", "2002", "2004"], answer: "C", explanation: "'earned Kahneman the Nobel Prize in Economics in 2002.'" },
      { question: "How does System 1 thinking operate?", options: ["Slowly and deliberately", "Automatically and quickly", "Only when engaged consciously", "Through logical reasoning"], answer: "B", explanation: "'System 1 operates automatically, quickly, with little effort.'" },
      { question: "In the anchoring experiment, those who saw 65 estimated what percentage?", options: ["25%", "35%", "45%", "55%"], answer: "C", explanation: "'those who saw 65 estimated 45%.'" },
      { question: "What is the annual probability of dying in a plane crash?", options: ["1 in 5,000", "1 in 500,000", "1 in 5 million", "1 in 11 million"], answer: "D", explanation: "'approximately 1 in 11 million.'" },
      { question: "How much larger do losses loom compared to equivalent gains?", options: ["About 1.5 times", "About 2 times", "About 3 times", "About 4 times"], answer: "B", explanation: "'losses loom approximately twice as large as equivalent gains.'" },
      { question: "What is the 'disposition effect'?", options: ["Buying stocks on impulse", "Holding losing stocks and selling winners too quickly", "Only investing in familiar companies", "Following the crowd in investment decisions"], answer: "B", explanation: "'investors hold losing stocks too long... and sell winning stocks too quickly, a pattern known as the disposition effect.'" },
      { question: "How much more likely were Twitter users to share ideologically aligned news?", options: ["38% more likely", "48% more likely", "58% more likely", "68% more likely"], answer: "C", explanation: "'58% more likely to share political news stories that align with their ideological position.'" },
      { question: "Who coined the term 'filter bubbles'?", options: ["Daniel Kahneman", "Amos Tversky", "Eli Pariser", "Richard Thaler"], answer: "C", explanation: "'what Eli Pariser termed \"filter bubbles.\"'" },
      { question: "[True / False / Not Given] The Concorde operated for 27 years.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'kept in operation for 27 years despite never turning a profit.' True." },
      { question: "[True / False / Not Given] Amos Tversky shared the Nobel Prize with Kahneman.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Tversky having died in 1996' — before the 2002 prize. He did not share it. False." },
      { question: "[True / False / Not Given] Kahneman says awareness of biases fully protects against them.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'awareness of biases provides limited protection.' False — limited, not full." },
      { question: "What is a 'pre-mortem analysis'?", options: ["Analysing why a project succeeded", "Imagining a project has failed and identifying reasons", "Reviewing finances after completion", "Testing a product before launch"], answer: "B", explanation: "'imagining that a project has failed and working backward to identify reasons.'" },
      { question: "When was Kahneman's book 'Thinking, Fast and Slow' published?", options: ["2005", "2008", "2011", "2014"], answer: "C", explanation: "'elaborated in his bestselling book \"Thinking, Fast and Slow\" (2011).'" },
      { question: "What role does System 2 play in decision-making?", options: ["Automatic pattern recognition", "Effortful mental activities and deliberate choices", "Emotional processing", "Memory storage"], answer: "B", explanation: "'System 2 allocates attention to effortful mental activities — complex computations, logical reasoning, and deliberate choices.'" },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 920 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 920 + passages.indexOf(p) },
    });
    await prisma.readingQuestion.deleteMany({ where: { passageId: passage.id } });
    for (let q = 0; q < p.questions.length; q++) {
      const qn = p.questions[q];
      await prisma.readingQuestion.create({ data: { passageId: passage.id, kind: "mcq", question: qn.question, options: qn.options, answer: qn.answer, explanation: qn.explanation, order: q } });
    }
    passageIds.push(passage.id);
    console.log(`  ✓ [${p.level}] ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: "IELTS Academic Reading — Test 6", titleVi: "IELTS Academic Reading — Đề 6", type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 6", titleVi: "IELTS Academic Reading — Đề 6", type: "academic", timeMinutes: 60, order: 5 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
