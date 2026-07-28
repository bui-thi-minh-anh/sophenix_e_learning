import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The Silk Road (~750 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac3-silk-road",
    title: "The Silk Road: Ancient Highway of Trade",
    titleVi: "Con đường tơ lụa: Tuyến thương mại cổ đại",
    level: "B1",
    category: "mock-academic",
    passage: `The Silk Road: Ancient Highway of Trade

The Silk Road was not a single road but a vast network of trade routes connecting East Asia to the Mediterranean, spanning approximately 6,400 kilometres. For nearly 1,500 years — from the 2nd century BCE to the 15th century CE — merchants, monks, soldiers, and diplomats travelled these routes, carrying goods, ideas, religions, and diseases across the ancient world.

The name "Silk Road" was coined in 1877 by German geographer Ferdinand von Richthofen, though silk was only one of many commodities traded along the routes. From China, merchants exported silk, tea, porcelain, paper, and gunpowder. From the West came gold, silver, glassware, wool, horses, and grapevines. From India and Southeast Asia, traders brought spices such as pepper, cinnamon, and cloves, which were worth their weight in gold in European markets. The trade was rarely conducted end-to-end by a single merchant; instead, goods typically changed hands multiple times, passing through a chain of intermediary traders at major oasis towns and caravan stops.

The Silk Road was instrumental in spreading religions across Asia. Buddhism, which originated in India in the 6th century BCE, spread to Central Asia, China, Korea, and Japan largely through Silk Road travellers. Nestorian Christianity reached China by the 7th century, and Islam spread along the western portions of the route from the 8th century onwards. The exchange of religious ideas was accompanied by artistic and architectural influences, resulting in unique cultural fusions visible in sites such as the Mogao Caves near Dunhuang, China, where Buddhist art displays Greek, Persian, and Indian stylistic elements.

The cities along the Silk Road became wealthy and cosmopolitan centres. Samarkand, in modern-day Uzbekistan, was one of the most important trading hubs, known for its paper production — a technology it acquired from Chinese prisoners of war after the Battle of Talas in 751 CE. Baghdad, under the Abbasid Caliphate, became the largest city in the world by the 10th century, with a population exceeding one million. The city's famous House of Wisdom translated Greek, Persian, and Indian scientific works into Arabic, preserving and advancing knowledge that would later fuel the European Renaissance.

The Silk Road also had devastating consequences. The Black Death, which killed an estimated 75 to 200 million people in Eurasia between 1346 and 1353, is believed to have spread along Silk Road trade routes from Central Asia to Europe. Mongol armies, which conquered much of the Silk Road network in the 13th century under Genghis Khan, facilitated trade by establishing relative peace and safety across their vast empire — a period known as the Pax Mongolica — but also enabled the rapid transmission of the plague.

The decline of the Silk Road began in the 15th century as European maritime powers — Portugal, Spain, the Netherlands, and England — developed sea routes to Asia that were faster, cheaper, and could carry larger volumes of cargo. The fall of Constantinople to the Ottoman Turks in 1453 further disrupted overland trade. By the 17th century, the great overland trade routes had largely fallen into disuse.

Today, China's Belt and Road Initiative (BRI), launched in 2013, explicitly invokes the legacy of the Silk Road. The multi-trillion dollar infrastructure project aims to build roads, railways, ports, and pipelines connecting China to Europe, Africa, and Southeast Asia. Whether the modern initiative will achieve the cultural exchange and mutual prosperity of the ancient Silk Road — or whether it will primarily serve China's geopolitical interests — remains a subject of intense debate among economists and political analysts.`,
    questions: [
      { question: "How long was the Silk Road network approximately?", options: ["3,200 km", "4,800 km", "6,400 km", "8,000 km"], answer: "C", explanation: "'spanning approximately 6,400 kilometres.'" },
      { question: "Who coined the name 'Silk Road'?", options: ["Marco Polo", "Ferdinand von Richthofen", "Genghis Khan", "Alexander the Great"], answer: "B", explanation: "'coined in 1877 by German geographer Ferdinand von Richthofen.'" },
      { question: "What did Samarkand become famous for producing?", options: ["Silk", "Porcelain", "Paper", "Glassware"], answer: "C", explanation: "'known for its paper production.'" },
      { question: "When did the Battle of Talas take place?", options: ["651 CE", "751 CE", "851 CE", "951 CE"], answer: "B", explanation: "'the Battle of Talas in 751 CE.'" },
      { question: "What was Baghdad's population by the 10th century?", options: ["Over 500,000", "Over 750,000", "Over one million", "Over two million"], answer: "C", explanation: "'a population exceeding one million.'" },
      { question: "[True / False / Not Given] The Silk Road was a single continuous road.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'was not a single road but a vast network.' False." },
      { question: "[True / False / Not Given] The Black Death killed between 75 and 200 million people.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'killed an estimated 75 to 200 million people.' True." },
      { question: "[True / False / Not Given] Marco Polo was the most famous Silk Road traveller.", options: ["True", "False", "Not Given"], answer: "C", explanation: "Marco Polo is not mentioned in the passage. Not Given." },
      { question: "[True / False / Not Given] Constantinople fell to the Ottoman Turks in 1453.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'The fall of Constantinople to the Ottoman Turks in 1453.' True." },
      { question: "[True / False / Not Given] China's Belt and Road Initiative was launched in 2015.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'launched in 2013.' False — 2013, not 2015." },
      { question: "[True / False / Not Given] The Silk Road helped spread Buddhism to Japan.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'Buddhism spread to Central Asia, China, Korea, and Japan largely through Silk Road travellers.' True." },
      { question: "[True / False / Not Given] The Pax Mongolica lasted for over 200 years.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions the Pax Mongolica but doesn't state its duration. Not Given." },
      { question: "Why did European maritime routes replace the Silk Road?", options: ["They were safer from bandits", "They were faster, cheaper, and could carry more cargo", "They were shorter distances", "They avoided the Mongol Empire"], answer: "B", explanation: "'sea routes to Asia that were faster, cheaper, and could carry larger volumes of cargo.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Renewable Energy Storage (~850 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac3-energy-storage",
    title: "The Challenge of Renewable Energy Storage",
    titleVi: "Thách thức lưu trữ năng lượng tái tạo",
    level: "B2",
    category: "mock-academic",
    passage: `The Challenge of Renewable Energy Storage

A. The transition from fossil fuels to renewable energy sources is well underway. In 2023, renewable energy accounted for 30% of global electricity generation, with solar and wind power alone providing over 12%. However, a fundamental challenge remains: the sun does not always shine, and the wind does not always blow. This intermittency problem means that renewable energy must be paired with effective storage solutions to ensure a reliable electricity supply. Without storage, excess energy generated during peak production periods is wasted, while shortfalls during low-production periods must be filled by fossil fuel backup — undermining the environmental benefits of renewables.

B. Lithium-ion batteries, the same technology that powers smartphones and electric vehicles, are currently the dominant form of grid-scale energy storage. Their costs have fallen dramatically — by approximately 97% since 1991 and by 89% in the decade from 2010 to 2020 alone. The world's largest lithium-ion battery installation, the Moss Landing Energy Storage Facility in California, can store 3,000 megawatt-hours (MWh) of electricity — enough to power approximately 225,000 homes for four hours. However, lithium-ion batteries have significant limitations: they degrade over time (typically losing 20% of capacity after 10 years), their production requires mining lithium, cobalt, and nickel — raising environmental and ethical concerns — and they are prone to thermal runaway, a potentially dangerous overheating condition.

C. Pumped hydro storage remains the most widely used form of grid-scale energy storage, accounting for approximately 90% of global installed storage capacity. The principle is simple: during periods of excess electricity, water is pumped from a lower reservoir to an upper reservoir. When electricity is needed, the water flows back down through turbines, generating power. Pumped hydro facilities can store enormous amounts of energy for extended periods and have operational lifespans of 50 to 100 years. The main drawback is geographical: facilities require specific terrain with significant elevation differences and access to large quantities of water, limiting where they can be built.

D. Compressed air energy storage (CAES) works on a similar principle. Excess electricity is used to compress air and store it in underground caverns — typically salt caverns or depleted natural gas reservoirs. When electricity is needed, the compressed air is released, heated, and expanded through turbines. Two commercial CAES plants currently operate: one in Huntorf, Germany (built in 1978, 321 MW), and one in McIntosh, Alabama (built in 1991, 110 MW). A newer approach, Advanced Adiabatic CAES, stores the heat generated during compression rather than venting it, achieving round-trip efficiencies of up to 70% compared to the 42–54% efficiency of conventional CAES systems.

E. Hydrogen energy storage represents a potentially transformative technology for long-duration storage. Excess renewable electricity can power electrolysers that split water into hydrogen and oxygen. The hydrogen can be stored in tanks, pipelines, or underground caverns for days, weeks, or even months, then converted back to electricity through fuel cells or burned in modified gas turbines. Green hydrogen — produced entirely from renewable energy — is currently expensive, costing $4–8 per kilogram compared to $1–2 for hydrogen produced from natural gas. However, the International Renewable Energy Agency (IRENA) projects that green hydrogen costs could fall below $2 per kilogram by 2030 as electrolyser costs decline and renewable electricity becomes even cheaper.

F. Emerging technologies offer intriguing alternatives. Gravity-based storage systems, such as the one developed by Energy Vault, use excess electricity to lift heavy concrete blocks to height, then generate power by lowering them. Iron-air batteries, being developed by Form Energy, use the reversible rusting of iron to store electricity at an estimated cost 90% lower than lithium-ion batteries, with the ability to discharge for 100 hours — far longer than the 4-hour typical duration of lithium-ion systems. Thermal energy storage, using materials like molten salt, sand, or crushed rock, can store heat at temperatures exceeding 1,000°C for later conversion to electricity.

G. The International Energy Agency (IEA) estimates that global energy storage capacity must increase six-fold by 2030 and twenty-fold by 2050 to meet net-zero emissions targets. This will require not a single winning technology but a portfolio of complementary solutions: lithium-ion batteries for short-duration storage (minutes to hours), pumped hydro and CAES for medium duration (hours to days), and hydrogen and novel technologies for seasonal storage (weeks to months). The storage revolution is not merely a technical challenge — it is the linchpin of the entire energy transition.`,
    questions: [
      { question: "[Matching] Which paragraph discusses pumped hydro storage?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C explains pumped hydro — pumping water between reservoirs." },
      { question: "[Matching] Which paragraph covers hydrogen energy storage?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E describes electrolysers, green hydrogen, and IRENA projections." },
      { question: "[Matching] Which paragraph discusses novel/emerging storage technologies?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F covers gravity-based, iron-air batteries, and thermal storage." },
      { question: "What percentage of global electricity did renewables generate in 2023?", options: ["20%", "25%", "30%", "35%"], answer: "C", explanation: "'renewable energy accounted for 30% of global electricity generation.'" },
      { question: "By how much have lithium-ion battery costs fallen since 1991?", options: ["About 85%", "About 90%", "About 95%", "About 97%"], answer: "D", explanation: "'by approximately 97% since 1991.'" },
      { question: "[Sentence Completion] The Moss Landing facility can store _____ MWh.", options: ["1,000", "2,000", "3,000", "5,000"], answer: "C", explanation: "'can store 3,000 megawatt-hours (MWh).'" },
      { question: "[Sentence Completion] Pumped hydro accounts for _____% of global storage capacity.", options: ["70", "80", "90", "95"], answer: "C", explanation: "'approximately 90% of global installed storage capacity.'" },
      { question: "[Sentence Completion] Green hydrogen currently costs $_____–_____ per kilogram.", options: ["$2–4", "$3–6", "$4–8", "$6–10"], answer: "C", explanation: "'costing $4–8 per kilogram.'" },
      { question: "How long can iron-air batteries discharge?", options: ["10 hours", "24 hours", "50 hours", "100 hours"], answer: "D", explanation: "'with the ability to discharge for 100 hours.'" },
      { question: "How much must global storage capacity increase by 2050?", options: ["Six-fold", "Ten-fold", "Fifteen-fold", "Twenty-fold"], answer: "D", explanation: "'twenty-fold by 2050.'" },
      { question: "What is the efficiency of conventional CAES systems?", options: ["30–40%", "42–54%", "60–70%", "75–85%"], answer: "B", explanation: "'42–54% efficiency of conventional CAES systems.'" },
      { question: "When was the Huntorf CAES plant built?", options: ["1968", "1973", "1978", "1985"], answer: "C", explanation: "'Huntorf, Germany (built in 1978).'" },
      { question: "How much lower is the estimated cost of iron-air batteries compared to lithium-ion?", options: ["50%", "70%", "80%", "90%"], answer: "D", explanation: "'an estimated cost 90% lower than lithium-ion batteries.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Microbiome (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac3-human-microbiome",
    title: "The Human Microbiome: Our Inner Ecosystem",
    titleVi: "Hệ vi sinh vật người: Hệ sinh thái bên trong",
    level: "C1",
    category: "mock-academic",
    passage: `The Human Microbiome: Our Inner Ecosystem

A. The human body is host to trillions of microorganisms — bacteria, viruses, fungi, and archaea — that collectively comprise the human microbiome. Recent estimates suggest that the number of microbial cells in and on the human body roughly equals the number of human cells, approximately 38 trillion, overturning the long-held belief that microbes outnumber human cells by 10 to 1. The vast majority of these microorganisms reside in the gut, particularly the large intestine, which harbours an estimated 100 trillion bacteria representing over 1,000 different species. The collective genome of the human microbiome — the microbiome's total DNA — contains approximately 3.3 million unique genes, outnumbering the roughly 20,000 genes in the human genome by a factor of 150 to 1.

B. The relationship between humans and their microbiome is predominantly mutualistic. Gut bacteria perform essential functions that human cells cannot: they ferment dietary fibre into short-chain fatty acids (SCFAs) such as butyrate, propionate, and acetate, which provide approximately 10% of the host's daily caloric intake. They synthesise essential vitamins including vitamin K, biotin, and several B vitamins. They help maintain the integrity of the intestinal barrier, preventing harmful substances from entering the bloodstream. And they play a critical role in training and modulating the immune system — an estimated 70% of the body's immune cells are located in the gut-associated lymphoid tissue, in constant dialogue with the resident microbiota.

C. Perhaps the most striking discovery in microbiome research has been the gut-brain axis — the bidirectional communication pathway between the gut microbiome and the central nervous system. Gut bacteria produce neurotransmitters including serotonin (approximately 95% of the body's serotonin is produced in the gut), dopamine, and gamma-aminobutyric acid (GABA), which can influence mood, cognition, and behaviour through the vagus nerve and the circulatory system. Animal studies have demonstrated that germ-free mice — raised without any microorganisms — exhibit altered anxiety-related behaviours, impaired memory, and abnormal social interactions, which can be partially reversed by colonising them with normal gut bacteria.

D. The composition of the gut microbiome is shaped by numerous factors throughout life. Infants born via vaginal delivery acquire their initial microbiome from the mother's birth canal, while those delivered by caesarean section are initially colonised by skin and hospital-environment bacteria — a difference that has been associated with higher rates of asthma, allergies, and obesity in caesarean-born children, though the causal mechanisms remain debated. Breastfeeding further shapes the infant microbiome: human breast milk contains over 200 types of human milk oligosaccharides (HMOs) that serve not as nutrition for the infant but as selective food for beneficial Bifidobacterium species. Diet, antibiotic use, stress, exercise, and environmental exposures continue to modify microbiome composition throughout life.

E. Dysbiosis — a disruption in the normal composition and function of the microbiome — has been implicated in a growing list of diseases. Inflammatory bowel diseases (IBD), including Crohn's disease and ulcerative colitis, are characterised by reduced microbial diversity and an overabundance of pro-inflammatory bacterial species. Type 2 diabetes patients consistently show altered ratios of Firmicutes to Bacteroidetes, the two dominant bacterial phyla in the human gut. Emerging research has linked microbiome disturbances to conditions as diverse as obesity, colorectal cancer, Parkinson's disease, depression, and autism spectrum disorder, though establishing causation rather than mere correlation remains a significant scientific challenge.

F. Faecal microbiota transplantation (FMT) — the transfer of stool from a healthy donor to a patient — has emerged as the most dramatic example of microbiome-based therapy. FMT has a cure rate exceeding 90% for recurrent Clostridioides difficile infection, a potentially life-threatening condition that kills approximately 29,000 Americans annually. The success of FMT for C. difficile has inspired clinical trials investigating its potential for other conditions, including IBD, metabolic syndrome, and even neurological disorders. However, the procedure carries risks: in 2019, the FDA issued a safety alert after two patients developed drug-resistant infections from contaminated donor stool, one of whom died.

G. The future of microbiome medicine lies in precision approaches. Rather than transplanting entire microbial communities, researchers are developing defined consortia — carefully selected combinations of specific bacterial strains designed to restore particular functions. Companies such as Seres Therapeutics and Vedanta Biosciences are conducting clinical trials of these "designer microbiomes." Personalised nutrition based on individual microbiome profiles is another frontier: a landmark study by the Weizmann Institute of Science found that individuals' blood sugar responses to identical foods varied dramatically and could be predicted by their gut microbiome composition. This finding challenges the very concept of universal dietary guidelines and suggests that optimal nutrition may be a deeply individual matter.`,
    questions: [
      { question: "[Yes / No / Not Given] Microbes outnumber human cells by 10 to 1.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'overturning the long-held belief that microbes outnumber human cells by 10 to 1.' The ratio is roughly equal. No." },
      { question: "[Yes / No / Not Given] The gut microbiome plays a role in mental health.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "Paragraph C discusses gut-brain axis, neurotransmitters, mood, and behaviour. Yes." },
      { question: "[Yes / No / Not Given] All doctors now routinely test patients' microbiome.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage does not discuss routine clinical testing. Not Given." },
      { question: "[Yes / No / Not Given] FMT has been approved for treating depression.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage says FMT is being investigated in trials for other conditions but doesn't say it's been approved. Not Given." },
      { question: "[Yes / No / Not Given] Breast milk contains substances that selectively feed beneficial bacteria.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'HMOs that serve as selective food for beneficial Bifidobacterium species.' Yes." },
      { question: "How many microbial cells are in the human body?", options: ["About 10 trillion", "About 25 trillion", "About 38 trillion", "About 100 trillion"], answer: "C", explanation: "'approximately 38 trillion.'" },
      { question: "How many unique genes does the microbiome's genome contain?", options: ["About 500,000", "About 1 million", "About 3.3 million", "About 10 million"], answer: "C", explanation: "'approximately 3.3 million unique genes.'" },
      { question: "What percentage of the body's serotonin is produced in the gut?", options: ["About 50%", "About 70%", "About 85%", "About 95%"], answer: "D", explanation: "'approximately 95% of the body's serotonin is produced in the gut.'" },
      { question: "[Matching] Which paragraph discusses dysbiosis and associated diseases?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses IBD, diabetes, and other conditions linked to dysbiosis." },
      { question: "[Matching] Which paragraph describes faecal microbiota transplantation?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F describes FMT, its success with C. difficile, and risks." },
      { question: "What is the FMT cure rate for C. difficile infection?", options: ["Over 70%", "Over 80%", "Over 90%", "Over 95%"], answer: "C", explanation: "'a cure rate exceeding 90%.'" },
      { question: "How many Americans does C. difficile kill annually?", options: ["About 10,000", "About 19,000", "About 29,000", "About 45,000"], answer: "C", explanation: "'kills approximately 29,000 Americans annually.'" },
      { question: "[Summary] SCFAs provide approximately _____% of the host's daily caloric intake.", options: ["5", "10", "15", "20"], answer: "B", explanation: "'provide approximately 10% of the host's daily caloric intake.'" },
      { question: "[Summary] An estimated _____% of immune cells are located in gut-associated tissue.", options: ["50", "60", "70", "80"], answer: "C", explanation: "'an estimated 70% of the body's immune cells.'" },
    ],
  },
];

const examSlug = "ielts-academic-test-3";

async function main() {
  console.log("Seeding IELTS Academic Reading Mock Test 3...\n");
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
    update: { title: "IELTS Academic Reading — Test 3", titleVi: "IELTS Academic Reading — Đề 3", type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 3", titleVi: "IELTS Academic Reading — Đề 3", type: "academic", timeMinutes: 60, order: 2 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
