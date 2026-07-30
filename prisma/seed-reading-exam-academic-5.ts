import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-academic-test-5";

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The Science of Sleep (~750 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac5-science-of-sleep",
    title: "The Science of Sleep",
    titleVi: "Khoa học về giấc ngủ",
    level: "B1",
    category: "mock-academic",
    passage: `The Science of Sleep

Sleep is one of the most fundamental yet poorly understood biological processes. Humans spend roughly one-third of their lives asleep — approximately 26 years for a person who lives to 79. Despite decades of research, scientists are still uncovering why sleep is so essential and what happens in the brain during this seemingly passive state.

The architecture of sleep follows a predictable cycle that repeats four to six times per night, with each cycle lasting approximately 90 minutes. Sleep is broadly divided into two categories: non-rapid eye movement (NREM) sleep, which comprises three stages of progressively deeper sleep, and rapid eye movement (REM) sleep, during which most dreaming occurs.

Stage 1 NREM is the lightest stage, lasting only one to five minutes. The body begins to relax, brain waves slow, and a person can be easily awakened. Stage 2 NREM accounts for approximately 50% of total sleep time in adults. During this stage, body temperature drops, heart rate slows, and the brain produces brief bursts of electrical activity called sleep spindles, which are believed to play a role in memory consolidation. Stage 3 NREM, also known as slow-wave sleep or deep sleep, is the most restorative phase. Growth hormone is released, tissues are repaired, and the immune system is strengthened. Deep sleep is most abundant in the first half of the night and decreases with age.

REM sleep, first identified by researchers Aserinsky and Kleitman in 1953, is characterised by rapid eye movements beneath closed eyelids, vivid dreaming, and temporary muscle paralysis — a mechanism that prevents the sleeper from physically acting out dreams. REM sleep is crucial for emotional regulation and memory processing. The brain is highly active during REM, consuming almost as much energy as when awake. REM periods become longer as the night progresses, with the final REM period sometimes lasting up to an hour.

The consequences of sleep deprivation are severe and far-reaching. After just 24 hours without sleep, cognitive performance deteriorates to a level comparable to having a blood alcohol concentration of 0.10% — above the legal driving limit in most countries. Chronic sleep deprivation — sleeping fewer than seven hours per night — has been linked to a 48% increase in the risk of coronary heart disease, a 36% increase in colorectal cancer risk, and a significantly elevated risk of developing Type 2 diabetes, obesity, and depression.

Sleep is regulated by two main systems. The circadian rhythm — an internal 24-hour clock located in the suprachiasmatic nucleus (SCN) of the hypothalamus — controls the timing of sleep by responding primarily to light signals received through the eyes. The SCN triggers the pineal gland to produce melatonin, a hormone that induces drowsiness, when light levels decrease in the evening. The second system is sleep pressure, driven by the gradual accumulation of a chemical called adenosine in the brain throughout the day. Adenosine builds up during waking hours and is cleared during sleep. Caffeine works by blocking adenosine receptors, temporarily masking the sensation of tiredness without actually reducing sleep pressure.

Modern lifestyles have created an epidemic of poor sleep. The National Sleep Foundation recommends seven to nine hours of sleep for adults aged 18–64, yet surveys consistently show that approximately 35% of American adults sleep fewer than seven hours. Blue light from electronic screens suppresses melatonin production, shift work disrupts circadian rhythms, and the cultural glorification of busyness has led many people to view sleep as a luxury rather than a biological necessity. The economic cost of sleep deprivation is staggering: a study by the RAND Corporation estimated that insufficient sleep costs the US economy $411 billion annually in lost productivity, accidents, and healthcare expenses.`,
    questions: [
      { question: "How many years does the average person spend sleeping?", options: ["About 18 years", "About 22 years", "About 26 years", "About 30 years"], answer: "C", explanation: "'approximately 26 years for a person who lives to 79.'" },
      { question: "How long is one sleep cycle?", options: ["About 60 minutes", "About 75 minutes", "About 90 minutes", "About 120 minutes"], answer: "C", explanation: "'each cycle lasting approximately 90 minutes.'" },
      { question: "What percentage of sleep time does Stage 2 NREM account for?", options: ["About 30%", "About 40%", "About 50%", "About 60%"], answer: "C", explanation: "'Stage 2 NREM accounts for approximately 50% of total sleep time.'" },
      { question: "What are sleep spindles believed to help with?", options: ["Dreaming", "Muscle recovery", "Memory consolidation", "Hormone production"], answer: "C", explanation: "'sleep spindles, which are believed to play a role in memory consolidation.'" },
      { question: "When was REM sleep first identified?", options: ["1943", "1948", "1953", "1958"], answer: "C", explanation: "'first identified by researchers Aserinsky and Kleitman in 1953.'" },
      { question: "Why does temporary muscle paralysis occur during REM?", options: ["To conserve energy", "To prevent acting out dreams", "To repair muscles", "To lower heart rate"], answer: "B", explanation: "'a mechanism that prevents the sleeper from physically acting out dreams.'" },
      { question: "[True / False / Not Given] After 24 hours without sleep, cognitive ability is like having 0.10% blood alcohol.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'comparable to having a blood alcohol concentration of 0.10%.'" },
      { question: "[True / False / Not Given] Chronic sleep deprivation increases coronary heart disease risk by 36%.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'a 48% increase in the risk of coronary heart disease.' 48%, not 36%. False." },
      { question: "[True / False / Not Given] Children need more sleep than adults.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage only mentions adult sleep recommendations, not children. Not Given." },
      { question: "What chemical accumulates during waking hours and drives sleep pressure?", options: ["Melatonin", "Cortisol", "Adenosine", "Serotonin"], answer: "C", explanation: "'the gradual accumulation of a chemical called adenosine.'" },
      { question: "How does caffeine reduce tiredness?", options: ["By producing melatonin", "By clearing adenosine", "By blocking adenosine receptors", "By activating the SCN"], answer: "C", explanation: "'Caffeine works by blocking adenosine receptors.'" },
      { question: "What percentage of American adults sleep fewer than seven hours?", options: ["About 25%", "About 30%", "About 35%", "About 40%"], answer: "C", explanation: "'approximately 35% of American adults sleep fewer than seven hours.'" },
      { question: "How much does insufficient sleep cost the US economy annually?", options: ["$211 billion", "$311 billion", "$411 billion", "$511 billion"], answer: "C", explanation: "'$411 billion annually in lost productivity, accidents, and healthcare expenses.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Microplastics (~850 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac5-microplastics",
    title: "Microplastics: The Invisible Threat",
    titleVi: "Vi nhựa: Mối đe dọa vô hình",
    level: "B2",
    category: "mock-academic",
    passage: `Microplastics: The Invisible Threat

A. Since the mass production of plastics began in the 1950s, humanity has produced approximately 9.2 billion tonnes of plastic. Of this, only about 9% has been recycled, 12% has been incinerated, and the remaining 79% has accumulated in landfills or the natural environment. Much of this plastic eventually breaks down — not through biodegradation, but through photodegradation and mechanical weathering — into fragments smaller than 5 millimetres known as microplastics.

B. Microplastics are now ubiquitous in the global environment. They have been detected in the deepest ocean trenches (the Mariana Trench, 10,994 metres below sea level), on the summit of Mount Everest (8,440 metres above sea level), in Arctic sea ice, Antarctic snow, and even in the air above remote mountain ranges. A 2020 study published in Science estimated that 14 million tonnes of microplastics sit on the ocean floor alone. Atmospheric transport carries microplastic particles thousands of kilometres from their sources — researchers have found that microplastic-laden dust from the Sahara Desert reaches the Amazon rainforest.

C. The sources of microplastics are surprisingly diverse. Primary microplastics are manufactured at microscopic size, including microbeads in cosmetics and personal care products, plastic pellets (nurdles) used as industrial raw material, and microfibers shed from synthetic clothing during washing. A single load of laundry can release over 700,000 synthetic microfibers into wastewater. Secondary microplastics result from the breakdown of larger plastic items such as bottles, bags, fishing nets, and tire rubber. Tire wear particles are the largest single source of microplastics entering the ocean, contributing an estimated 28% of all oceanic microplastics.

D. The impact of microplastics on marine ecosystems is increasingly well documented. Zooplankton, the foundation of the marine food web, readily ingest microplastics, which can block their digestive tracts, reduce feeding efficiency, and impair reproduction. These particles accumulate through the food chain — a process known as biomagnification — concentrating in larger predators such as fish, seabirds, and marine mammals. A study of commercially important fish species in the Mediterranean found microplastics in the digestive tracts of 18% of all fish sampled. The Great Pacific Garbage Patch, located between Hawaii and California, covers an area approximately three times the size of France and contains an estimated 1.8 trillion pieces of plastic, 94% of which are microplastics.

E. The presence of microplastics in the human body has been confirmed by multiple studies. Research published in Environment International in 2022 detected microplastics in human blood for the first time, finding plastic particles in 77% of blood samples tested. Subsequent studies identified microplastics in human lungs, placenta, breast milk, and even brain tissue. The average person is estimated to ingest approximately 5 grams of plastic per week — roughly equivalent to the weight of a credit card. Microplastics enter the body through contaminated food (particularly seafood and salt), drinking water (both tap and bottled), and inhalation of airborne particles.

F. The health effects of microplastic exposure in humans remain under investigation, but early findings are concerning. Laboratory studies have shown that microplastics can cross cell membranes, trigger inflammatory responses, cause oxidative stress, and potentially disrupt the endocrine system. Plastic particles also act as vectors for harmful chemicals: plasticizers such as phthalates and bisphenol A (BPA) leach from the plastic, while persistent organic pollutants (POPs) and heavy metals adsorb onto microplastic surfaces from the surrounding environment. A 2024 study in the New England Journal of Medicine found that patients with microplastics detected in their carotid artery plaques had a 4.5 times higher risk of heart attack, stroke, or death over a 34-month follow-up period.

G. Addressing the microplastics crisis requires action at multiple levels. At the source, over 30 countries have banned microbeads in cosmetics, and the EU's planned restriction on intentionally added microplastics, announced in 2023, is the most comprehensive regulation to date. Washing machine filters that capture microfibers are mandatory in France since 2025, and similar legislation is advancing in California and Ontario. At the cleanup level, technologies such as magnetic nanoparticles that attract microplastics from water are showing promise in laboratory settings. However, given the trillions of microplastic particles already distributed throughout the environment, prevention remains far more practical than remediation.`,
    questions: [
      { question: "[Matching] Which paragraph discusses sources of microplastics?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C details microbeads, nurdles, microfibers, and tire particles." },
      { question: "[Matching] Which paragraph covers health effects on humans?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F discusses inflammatory responses, oxidative stress, and the NEJM study." },
      { question: "[Matching] Which paragraph describes regulatory responses?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G covers bans, filters, and cleanup technologies." },
      { question: "[Matching] Which paragraph explains microplastics in the human body?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses blood, lungs, placenta, and the 5-gram weekly intake." },
      { question: "What percentage of all plastic ever produced has been recycled?", options: ["About 5%", "About 9%", "About 15%", "About 20%"], answer: "B", explanation: "'only about 9% has been recycled.'" },
      { question: "How many synthetic microfibers can one load of laundry release?", options: ["Over 100,000", "Over 300,000", "Over 500,000", "Over 700,000"], answer: "D", explanation: "'A single load of laundry can release over 700,000 synthetic microfibers.'" },
      { question: "What is the largest single source of oceanic microplastics?", options: ["Plastic bottles", "Fishing nets", "Tire wear particles", "Cosmetic microbeads"], answer: "C", explanation: "'Tire wear particles are the largest single source... contributing an estimated 28%.'" },
      { question: "In what percentage of blood samples were microplastics found?", options: ["57%", "67%", "77%", "87%"], answer: "C", explanation: "'finding plastic particles in 77% of blood samples tested.'" },
      { question: "How much plastic does the average person ingest weekly?", options: ["About 2 grams", "About 5 grams", "About 8 grams", "About 12 grams"], answer: "B", explanation: "'approximately 5 grams of plastic per week.'" },
      { question: "How many pieces of plastic are in the Great Pacific Garbage Patch?", options: ["0.8 trillion", "1.2 trillion", "1.8 trillion", "2.4 trillion"], answer: "C", explanation: "'an estimated 1.8 trillion pieces of plastic.'" },
      { question: "[True / False / Not Given] Microplastics have been found on Mount Everest at 8,440 metres.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'on the summit of Mount Everest (8,440 metres above sea level).' True." },
      { question: "[True / False / Not Given] Microplastics biodegrade within 50 years.", options: ["True", "False", "Not Given"], answer: "B", explanation: "The passage says plastic breaks down 'not through biodegradation' but through photodegradation. False." },
      { question: "How much higher was the heart attack risk for patients with microplastics in artery plaques?", options: ["2.5 times", "3.5 times", "4.5 times", "5.5 times"], answer: "C", explanation: "'4.5 times higher risk of heart attack, stroke, or death.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: History of Writing Systems (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac5-writing-systems",
    title: "The Evolution of Writing Systems",
    titleVi: "Sự phát triển của các hệ thống chữ viết",
    level: "C1",
    category: "mock-academic",
    passage: `The Evolution of Writing Systems

The invention of writing is arguably the most transformative development in human history — more consequential, some scholars argue, than the wheel, agriculture, or even the harnessing of fire. Writing enabled the accumulation and transmission of knowledge across generations, the administration of complex societies, and the development of abstract thought. The transition from oral to literate culture fundamentally altered the structure of human cognition itself.

The earliest known writing system emerged in Mesopotamia around 3400 BCE. Sumerian cuneiform began as a system of pictographic tokens impressed into wet clay tablets to record agricultural transactions — quantities of grain, heads of cattle, jars of beer. Over several centuries, these pictographs evolved into increasingly abstract wedge-shaped marks (cuneus being the Latin word for "wedge") that could represent not only objects but also sounds, enabling the writing of proper names and eventually entire narratives. The Epic of Gilgamesh, composed around 2100 BCE, stands as the oldest known work of literature.

Egyptian hieroglyphics developed roughly contemporaneously, around 3200 BCE, though the precise relationship between Mesopotamian and Egyptian writing remains debated. Unlike cuneiform, which evolved from purely administrative origins, hieroglyphics served both bureaucratic and sacred functions — the word "hieroglyphic" itself derives from the Greek for "sacred carving." The system combined logographic and alphabetic elements, using approximately 700 signs. The breakthrough in deciphering hieroglyphics came in 1822 when Jean-François Champollion used the Rosetta Stone — a decree inscribed in hieroglyphics, Demotic script, and Greek — to crack the code.

Chinese writing, which originated around 1200 BCE during the Shang dynasty, is the oldest writing system still in continuous use today. Unlike alphabetic scripts, which represent sounds, Chinese characters are primarily logographic — each character represents a word or morpheme rather than a phoneme. The Chinese system requires knowledge of thousands of characters: approximately 3,500 for basic literacy, and over 50,000 exist in comprehensive dictionaries. Despite the obvious complexity, the logographic system offers a significant advantage in a linguistically diverse country: speakers of mutually unintelligible Chinese dialects can communicate through shared written characters.

The development of the alphabet — a writing system in which each symbol represents a single consonant or vowel sound — represented a revolutionary simplification. The first true alphabet is generally attributed to the Phoenicians, a Semitic-speaking maritime trading civilization based in present-day Lebanon, around 1050 BCE. The Phoenician alphabet contained only 22 consonant letters; vowels were not written, as in modern Arabic and Hebrew. The Greeks adapted the Phoenician script around 800 BCE, crucially adding vowel letters for the first time. The Greek alphabet subsequently gave rise to the Latin alphabet (via the Etruscans and Romans), which is now used by approximately 70% of the world's population, and the Cyrillic alphabet, developed by followers of Saints Cyril and Methodius in the 9th century for Slavic languages.

The relationship between writing systems and cognition has been a productive area of research. Brain imaging studies have shown that reading Chinese characters activates bilateral brain regions, including areas involved in spatial processing, whereas reading alphabetic scripts primarily activates the left hemisphere's phonological processing areas. This suggests that different writing systems literally shape the neural architecture of literacy. Research by Stanislas Dehaene has proposed the "neuronal recycling" hypothesis — that the brain repurposes evolutionarily older visual recognition circuits for the culturally novel task of reading, which explains why all writing systems share certain visual features (such as the predominance of T-junctions and line intersections) regardless of their independent origins.

The digital age has created new pressures on writing systems. Unicode, the universal character encoding standard, now supports over 154,000 characters across 168 scripts, including historical scripts that are no longer actively used. However, approximately 100 writing systems remain unencoded, effectively excluding them from digital communication. The dominance of English-language keyboards and software interfaces has accelerated the decline of smaller scripts. Several indigenous communities have responded by developing digital tools to preserve their writing traditions — the Cherokee Nation, for instance, created a Cherokee syllabary keyboard for smartphones, and the Canadian government has invested in Inuktitut-language digital infrastructure.

The question of whether humanity might eventually converge on a single global writing system remains open. The Latin alphabet's dominance continues to grow, driven by globalisation, digital technology, and English-language hegemony. Yet writing systems are deeply intertwined with cultural identity — attempts to impose Latin script on non-Latin-writing populations have historically provoked significant resistance, as seen in Turkey's script reform of 1928 and the periodic debates over romanisation in Japan and China. The survival of diverse writing systems may ultimately depend not on their functional efficiency but on the cultural will to preserve them.`,
    questions: [
      { question: "When did the earliest known writing system emerge?", options: ["Around 4000 BCE", "Around 3400 BCE", "Around 2800 BCE", "Around 2100 BCE"], answer: "B", explanation: "'emerged in Mesopotamia around 3400 BCE.'" },
      { question: "What does the Latin word 'cuneus' mean?", options: ["Clay", "Symbol", "Wedge", "Tablet"], answer: "C", explanation: "'cuneus being the Latin word for \"wedge\".'" },
      { question: "When was the Epic of Gilgamesh composed?", options: ["Around 2800 BCE", "Around 2500 BCE", "Around 2100 BCE", "Around 1800 BCE"], answer: "C", explanation: "'composed around 2100 BCE.'" },
      { question: "Who deciphered Egyptian hieroglyphics?", options: ["Thomas Young", "Jean-François Champollion", "Howard Carter", "Heinrich Schliemann"], answer: "B", explanation: "'Jean-François Champollion used the Rosetta Stone... to crack the code.'" },
      { question: "How many characters are needed for basic Chinese literacy?", options: ["About 1,500", "About 2,500", "About 3,500", "About 5,000"], answer: "C", explanation: "'approximately 3,500 for basic literacy.'" },
      { question: "How many letters did the Phoenician alphabet have?", options: ["18", "20", "22", "26"], answer: "C", explanation: "'The Phoenician alphabet contained only 22 consonant letters.'" },
      { question: "What percentage of the world uses the Latin alphabet?", options: ["About 50%", "About 60%", "About 70%", "About 80%"], answer: "C", explanation: "'used by approximately 70% of the world's population.'" },
      { question: "[True / False / Not Given] Greek was the first alphabet to include vowel letters.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'The Greeks... crucially adding vowel letters for the first time.' True." },
      { question: "[True / False / Not Given] Reading Chinese activates only the left brain hemisphere.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'reading Chinese characters activates bilateral brain regions.' Both sides, not only left. False." },
      { question: "[True / False / Not Given] The Rosetta Stone was discovered in 1799.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions the Rosetta Stone but not when it was discovered. Not Given." },
      { question: "How many characters does Unicode currently support?", options: ["Over 100,000", "Over 125,000", "Over 154,000", "Over 200,000"], answer: "C", explanation: "'Unicode... now supports over 154,000 characters.'" },
      { question: "What is the 'neuronal recycling' hypothesis?", options: ["Old neurons die and are replaced during reading", "The brain repurposes older visual circuits for reading", "Children learn to read by recycling old knowledge", "Digital screens recycle neural pathways"], answer: "B", explanation: "'the brain repurposes evolutionarily older visual recognition circuits for the culturally novel task of reading.'" },
      { question: "When did Turkey reform its script?", options: ["1918", "1923", "1928", "1935"], answer: "C", explanation: "'Turkey's script reform of 1928.'" },
      { question: "Which is the oldest writing system still in continuous use?", options: ["Arabic", "Greek", "Hebrew", "Chinese"], answer: "D", explanation: "'Chinese writing... is the oldest writing system still in continuous use today.'" },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 900 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 900 + passages.indexOf(p) },
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
    update: { title: "IELTS Academic Reading — Test 5", titleVi: "IELTS Academic Reading — Đề 5", type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 5", titleVi: "IELTS Academic Reading — Đề 5", type: "academic", timeMinutes: 60, order: 4 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
