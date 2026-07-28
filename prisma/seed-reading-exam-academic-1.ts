import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface PassageData {
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  passage: string;
  questions: QuestionData[];
}

const passages: PassageData[] = [

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The History of Chocolate (B1–B2, ~700 words, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac1-history-of-chocolate",
    title: "The History of Chocolate",
    titleVi: "Lịch sử của sô-cô-la",
    level: "B2",
    category: "mock-academic",
    passage: `The History of Chocolate

Chocolate is one of the most popular foods in the world, consumed in vast quantities across every continent. Yet few people are aware of the long and complex history behind this beloved treat, which stretches back thousands of years to the ancient civilizations of Central America.

The story of chocolate begins with the cacao tree, Theobroma cacao, which is native to the tropical rainforests of Central and South America. The tree produces large, colorful pods that contain cacao beans surrounded by a sweet, white pulp. Archaeological evidence suggests that humans first began consuming cacao at least 3,900 years ago. The Olmec civilization, which flourished in what is now southern Mexico between approximately 1500 and 400 BCE, is believed to have been the first culture to cultivate cacao trees and process the beans into a form of chocolate. Residues of a cacao-based beverage have been found in Olmec pottery dating to around 1500 BCE.

The Maya civilization, which succeeded the Olmec in the region, elevated cacao to a central role in their culture. The Maya prepared a frothy, bitter drink made from roasted and ground cacao beans mixed with water, chili peppers, cornmeal, and various spices. This beverage, called xocolatl, was consumed during religious ceremonies, marriage celebrations, and other important rituals. Cacao beans were so highly valued that they were used as a form of currency: a turkey could be purchased for 100 cacao beans, and a fresh avocado cost approximately three beans. The Maya also believed that cacao was a gift from the gods, a belief reflected in the scientific name Theobroma, which means "food of the gods" in Greek.

The Aztec Empire, which dominated central Mexico from the 14th to the 16th century, inherited the Maya's reverence for cacao. The Aztec emperor Montezuma II was reportedly an enthusiastic consumer of the chocolate drink, said to consume as many as fifty cups per day from golden goblets. Because cacao trees could not grow in the dry highlands where the Aztec capital Tenochtitlan was located, cacao beans had to be imported from lowland regions and were considered even more precious than gold. The Aztecs believed that the god Quetzalcoatl had brought cacao to humanity and that consuming the drink conferred wisdom and power.

The arrival of Spanish conquistadors in the early 16th century marked a turning point in the history of chocolate. When Hernan Cortes encountered the Aztec court in 1519, he observed the importance of the cacao drink and recognized its commercial potential. The Spanish brought cacao beans back to Europe, where the bitter Mesoamerican recipe was gradually modified to suit European tastes. The addition of sugar and vanilla transformed the drink into a sweetened luxury beverage that became immensely popular among the Spanish aristocracy. For nearly a century, Spain managed to keep chocolate a closely guarded secret from the rest of Europe, but by the early 17th century, the drink had spread to France, Italy, and eventually all of Western Europe.

The transformation of chocolate from a luxury drink into an affordable, mass-produced food occurred during the Industrial Revolution of the 18th and 19th centuries. In 1828, Dutch chemist Coenraad van Houten invented the cocoa press, a hydraulic device that could squeeze the fat (cocoa butter) out of roasted cacao beans, leaving behind a dry cake that could be ground into a fine powder. This powder dissolved much more easily in water or milk, making cocoa drinks cheaper and more accessible. In 1847, the British company J.S. Fry & Sons discovered that mixing cocoa powder with sugar and melted cocoa butter produced a moldable paste — the first modern chocolate bar. Shortly afterward, in 1875, Swiss chocolatier Daniel Peter, working with his neighbor Henri Nestle, developed milk chocolate by adding condensed milk to the chocolate mixture. In 1879, another Swiss innovator, Rodolphe Lindt, invented the conching process, which involved heating and mixing chocolate for extended periods to produce the smooth, glossy texture that characterizes modern chocolate.

Today, the global chocolate industry is worth over 130 billion dollars annually. The largest cacao-producing countries are Cote d'Ivoire, Ghana, Indonesia, and Ecuador, which together account for approximately 75% of the world's cacao supply. Despite its popularity, the chocolate industry faces significant challenges, including concerns about deforestation, child labor on cacao farms in West Africa, and the vulnerability of cacao crops to climate change and disease. Organizations and companies are increasingly investing in sustainable and ethical sourcing practices to ensure that the ancient food of the gods can continue to be enjoyed by future generations.`,
    questions: [
      // MCQ (Questions 1–6)
      { question: "Which civilization is believed to have first cultivated cacao?", options: ["The Maya", "The Olmec", "The Aztec", "The Inca"], answer: "B", explanation: "The passage states the Olmec civilization 'is believed to have been the first culture to cultivate cacao trees.'" },
      { question: "What was the Aztec drink xocolatl made from?", options: ["Cacao beans, sugar, and cream", "Roasted cacao beans, water, chili peppers, and spices", "Cacao powder and condensed milk", "Cacao butter and vanilla"], answer: "B", explanation: "The passage describes 'a frothy, bitter drink made from roasted and ground cacao beans mixed with water, chili peppers, cornmeal, and various spices.' (Note: xocolatl is attributed to the Maya but adopted by the Aztecs.)" },
      { question: "Why were cacao beans particularly valuable to the Aztecs?", options: ["They were used to make medicine", "Cacao trees could not grow in their highland capital", "The Spanish demanded them as tribute", "They were needed for their religious calendar"], answer: "B", explanation: "'cacao trees could not grow in the dry highlands where the Aztec capital Tenochtitlan was located, cacao beans had to be imported.'" },
      { question: "What did Coenraad van Houten invent in 1828?", options: ["The first chocolate bar", "The conching process", "The cocoa press", "Milk chocolate"], answer: "C", explanation: "'Dutch chemist Coenraad van Houten invented the cocoa press.'" },
      { question: "Who developed milk chocolate?", options: ["Rodolphe Lindt", "J.S. Fry & Sons", "Coenraad van Houten", "Daniel Peter and Henri Nestle"], answer: "D", explanation: "'Swiss chocolatier Daniel Peter, working with his neighbor Henri Nestle, developed milk chocolate.'" },
      { question: "What percentage of the world's cacao supply comes from the four largest producing countries?", options: ["About 50%", "About 65%", "About 75%", "About 90%"], answer: "C", explanation: "'together account for approximately 75% of the world's cacao supply.'" },

      // True / False / Not Given (Questions 7–13)
      { question: "[True / False / Not Given] The scientific name Theobroma means 'food of the gods' in Latin.", options: ["True", "False", "Not Given"], answer: "B", explanation: "The passage states the name means 'food of the gods' in Greek, not Latin. False." },
      { question: "[True / False / Not Given] Montezuma II reportedly drank up to fifty cups of chocolate per day.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'said to consume as many as fifty cups per day from golden goblets.' True." },
      { question: "[True / False / Not Given] The Spanish immediately shared chocolate with other European countries.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Spain managed to keep chocolate a closely guarded secret from the rest of Europe' for nearly a century. False." },
      { question: "[True / False / Not Given] Cacao beans were more expensive than coffee beans in 16th-century Europe.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage does not compare the price of cacao beans with coffee beans. Not Given." },
      { question: "[True / False / Not Given] The cocoa press made chocolate drinks cheaper.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'making cocoa drinks cheaper and more accessible.' True." },
      { question: "[True / False / Not Given] Rodolphe Lindt's conching process was invented before the first chocolate bar.", options: ["True", "False", "Not Given"], answer: "B", explanation: "The first chocolate bar was created in 1847; the conching process was invented in 1879. False." },
      { question: "[True / False / Not Given] The global chocolate industry is worth over 150 billion dollars annually.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'worth over 130 billion dollars annually' — not over 150 billion. False." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Urban Vertical Farming (B2, ~800 words, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac1-urban-vertical-farming",
    title: "Urban Vertical Farming",
    titleVi: "Nông nghiệp thẳng đứng đô thị",
    level: "B2",
    category: "mock-academic",
    passage: `Urban Vertical Farming: Growing Food in the Sky

A. As the world's population continues to grow — projected to reach 9.7 billion by 2050 — the challenge of feeding humanity is becoming increasingly urgent. Traditional agriculture already occupies roughly 40% of the Earth's ice-free land surface, and expanding farmland further would require clearing forests and natural habitats, accelerating biodiversity loss and climate change. In this context, vertical farming — the practice of growing crops in vertically stacked layers inside controlled-environment buildings — has emerged as a promising, if controversial, alternative. Proponents argue that vertical farms could revolutionize food production by bringing agriculture into the heart of cities, reducing transportation costs, and producing crops year-round regardless of weather or season.

B. The concept of vertical farming is not entirely new. The term was popularized in 1999 by Dickson Despommier, a professor of microbiology and public health at Columbia University, who challenged his students to design a system that could feed 50,000 people using rooftop gardens. When the students calculated that rooftop space was far too limited, Despommier proposed moving the farms indoors and stacking them vertically. His 2010 book, The Vertical Farm: Feeding the World in the 21st Century, outlined a comprehensive vision of multi-story urban farms that would use hydroponic, aeroponic, and aquaponic systems to grow produce without soil. Hydroponic systems grow plants with their roots submerged in nutrient-rich water solutions. Aeroponic systems suspend plant roots in the air and deliver nutrients through a fine mist. Aquaponic systems combine fish farming with plant cultivation, using fish waste as a natural fertilizer.

C. Modern vertical farms rely heavily on advanced technology. LED lighting systems, carefully tuned to emit specific wavelengths of red and blue light that plants absorb most efficiently for photosynthesis, replace natural sunlight. Climate control systems maintain precise temperature, humidity, and carbon dioxide levels optimized for each crop variety. Automated sensors continuously monitor plant health, nutrient levels, water pH, and air quality, feeding data to artificial intelligence systems that can detect problems — such as early signs of disease or nutrient deficiencies — before they become visible to the human eye. Some facilities have achieved near-complete automation, with robotic systems handling seeding, transplanting, harvesting, and packaging with minimal human intervention.

D. The environmental advantages of vertical farming are substantial, at least in theory. Because crops grow in sealed, climate-controlled environments, vertical farms use no pesticides or herbicides, eliminating chemical runoff into waterways. Water usage is dramatically lower than in conventional agriculture: vertical farms typically recirculate water through closed-loop systems, using 90% to 95% less water than traditional field farming for the same crop yield. The proximity of vertical farms to urban consumers drastically reduces the distance that food must travel from farm to table. Conventional produce in the United States travels an average of 1,500 miles from farm to consumer, generating significant carbon emissions from refrigerated transportation. A vertical farm located within a city could reduce this distance to just a few miles.

E. However, vertical farming faces significant economic and practical challenges that have tempered early enthusiasm. The most critical issue is energy consumption. Because vertical farms operate entirely on artificial light rather than free sunlight, their electricity costs are enormous. A study published in the journal Nature Food in 2020 estimated that growing wheat in a vertical farm would require approximately 1,527 kilowatt-hours of electricity per kilogram of grain produced — roughly 100 times the energy embedded in the wheat itself. At current electricity prices, this makes vertical-farmed staple crops economically unviable. Even for high-value leafy greens and herbs, which are the primary products of most existing vertical farms, energy costs typically represent 25% to 30% of total operating expenses.

F. The economic pressures on vertical farming companies have been severe. Several high-profile ventures have struggled financially despite substantial investment. AeroFarms, once considered a pioneer in the industry, filed for bankruptcy in June 2023 after raising more than 238 million dollars in funding. AppHarvest, which built a 60-acre greenhouse facility in Kentucky, saw its stock price decline by over 95% from its peak before filing for bankruptcy in July 2023. Fifth Season, a robotics-focused vertical farm backed by over 185 million dollars in investment, shut down abruptly in April 2023. These failures highlight the fundamental tension between the high capital and operating costs of vertical farming and the relatively low market price of the produce it generates.

G. Despite these setbacks, the industry continues to evolve. Advances in LED efficiency have reduced lighting energy costs by approximately 50% over the past decade, and further improvements are expected. Some companies are experimenting with integrating renewable energy sources — particularly solar panels and wind turbines — to offset electricity costs. Research into genetically optimized crop varieties specifically bred for vertical farm conditions, with traits such as compact growth patterns and enhanced response to artificial light, could significantly improve yields and economic viability. Countries with limited arable land and high food import costs, such as Singapore, the United Arab Emirates, and Japan, have been particularly enthusiastic adopters, viewing vertical farming as a component of national food security strategy rather than purely a commercial venture. Whether vertical farming will become a major pillar of global food production or remain a niche supplement to conventional agriculture depends largely on continued technological progress and declining energy costs.`,
    questions: [
      // MCQ (Questions 1–4)
      { question: "What percentage of the Earth's ice-free land surface does traditional agriculture occupy?", options: ["About 20%", "About 30%", "About 40%", "About 50%"], answer: "C", explanation: "'Traditional agriculture already occupies roughly 40% of the Earth's ice-free land surface.'" },
      { question: "In an aeroponic system, how are nutrients delivered to plants?", options: ["Through soil", "Through nutrient-rich water", "Through a fine mist", "Through fish waste"], answer: "C", explanation: "'Aeroponic systems suspend plant roots in the air and deliver nutrients through a fine mist.'" },
      { question: "How much less water do vertical farms typically use compared to traditional farming?", options: ["50% to 60% less", "70% to 80% less", "90% to 95% less", "97% to 99% less"], answer: "C", explanation: "'using 90% to 95% less water than traditional field farming for the same crop yield.'" },
      { question: "What happened to AeroFarms in 2023?", options: ["It expanded to Europe", "It was acquired by a larger company", "It filed for bankruptcy", "It became profitable for the first time"], answer: "C", explanation: "'AeroFarms, once considered a pioneer in the industry, filed for bankruptcy in June 2023.'" },

      // Matching Headings (Questions 5–8)
      { question: "[Matching] Which paragraph explains the different soilless growing techniques used in vertical farms?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes hydroponic, aeroponic, and aquaponic systems." },
      { question: "[Matching] Which paragraph discusses the technology used in modern vertical farms?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "B", explanation: "Paragraph C describes LED lighting, climate control, sensors, AI, and robotics." },
      { question: "[Matching] Which paragraph addresses the high energy costs of vertical farming?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "B", explanation: "Paragraph E focuses on energy consumption as the most critical economic challenge." },
      { question: "[Matching] Which paragraph provides examples of vertical farming companies that failed financially?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F discusses AeroFarms, AppHarvest, and Fifth Season bankruptcies." },

      // Sentence Completion (Questions 9–13)
      { question: "[Sentence Completion] Dickson Despommier originally asked his students to design a system to feed 50,000 people using _____.", options: ["vertical farms", "rooftop gardens", "underground facilities", "floating platforms"], answer: "B", explanation: "'challenged his students to design a system that could feed 50,000 people using rooftop gardens.'" },
      { question: "[Sentence Completion] LED lights in vertical farms are tuned to emit _____ wavelengths for optimal photosynthesis.", options: ["green and yellow", "red and blue", "white and ultraviolet", "orange and violet"], answer: "B", explanation: "'emit specific wavelengths of red and blue light that plants absorb most efficiently for photosynthesis.'" },
      { question: "[Sentence Completion] Conventional produce in the US travels an average of _____ miles from farm to consumer.", options: ["500", "1,000", "1,500", "2,500"], answer: "C", explanation: "'Conventional produce in the United States travels an average of 1,500 miles from farm to consumer.'" },
      { question: "[Sentence Completion] Energy costs typically represent _____ of total operating expenses for leafy greens in vertical farms.", options: ["10% to 15%", "15% to 20%", "25% to 30%", "35% to 40%"], answer: "C", explanation: "'energy costs typically represent 25% to 30% of total operating expenses.'" },
      { question: "[Sentence Completion] LED efficiency improvements have reduced lighting energy costs by approximately _____ over the past decade.", options: ["25%", "40%", "50%", "70%"], answer: "C", explanation: "'Advances in LED efficiency have reduced lighting energy costs by approximately 50% over the past decade.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Neuroscience of Decision-Making (C1, ~900 words, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-ac1-neuroscience-decision-making",
    title: "The Neuroscience of Decision-Making",
    titleVi: "Khoa học thần kinh về ra quyết định",
    level: "C1",
    category: "mock-academic",
    passage: `The Neuroscience of Decision-Making

A. For much of the history of Western thought, decision-making was understood as a fundamentally rational process. Philosophers from Plato to Descartes emphasized the supremacy of reason over emotion, portraying the ideal decision-maker as one who carefully weighs evidence, calculates probabilities, and selects the optimal course of action through logical deliberation. This view was formalized in the 20th century by expected utility theory, which posits that rational agents make decisions by multiplying the probability of each possible outcome by its utility (or subjective value) and choosing the option that maximizes expected utility. For decades, this framework dominated economics, political science, and public policy. However, advances in neuroscience over the past thirty years have fundamentally challenged this picture, revealing that emotion, intuition, and unconscious neural processes play a far more central role in decision-making than rationalists ever imagined.

B. The pivotal insight came from the work of neuroscientist Antonio Damasio, who studied patients with damage to the ventromedial prefrontal cortex (vmPFC), a brain region located just above the eye sockets. These patients retained normal intelligence, memory, and logical reasoning ability, yet they were profoundly impaired in their capacity to make advantageous decisions in everyday life. They made disastrous financial choices, entered into destructive relationships, and were unable to learn from negative consequences. Damasio proposed the "somatic marker hypothesis" to explain this paradox: he argued that the vmPFC integrates bodily signals — gut feelings, changes in heart rate, muscle tension, and other physiological responses — into the decision-making process. These somatic markers act as emotional shortcuts, flagging certain options as dangerous or rewarding based on past experience, without requiring conscious analysis. Without these emotional signals, patients could reason about choices abstractly but could not assign them appropriate emotional weight, leading to chronically poor decisions.

C. Damasio's insights were dramatically confirmed by the Iowa Gambling Task, an experiment he developed with his colleagues Antoine Bechara and Hanna Damasio. In this task, participants draw cards from four decks. Two decks offer high rewards but even higher penalties, leading to net losses over time, while two decks offer smaller rewards but minimal penalties, leading to net gains. Normal participants gradually develop a preference for the advantageous decks, often before they can consciously articulate why. Critically, they begin showing anticipatory stress responses — measurable increases in skin conductance — when reaching for the disadvantageous decks, even before they are consciously aware that those decks are risky. Patients with vmPFC damage fail to develop these anticipatory responses and continue choosing from the losing decks throughout the experiment, despite being told their results and despite having normal intellectual ability.

D. The role of emotion in decision-making extends beyond the vmPFC. The amygdala, an almond-shaped structure deep within the temporal lobe, plays a crucial role in processing fear and threat-related information. Research has shown that the amygdala is activated when individuals face decisions involving potential losses, and that this activation is disproportionately strong compared to the neural response to equivalent potential gains — a phenomenon that contributes to loss aversion, the well-documented tendency for people to feel the pain of losing something approximately twice as intensely as the pleasure of gaining something of equal value. The neurotransmitter dopamine, primarily associated with the brain's reward circuitry, also profoundly influences decision-making. Dopamine neurons in the ventral tegmental area and substantia nigra fire not simply in response to rewards themselves but in response to the prediction of rewards — and, crucially, to prediction errors, the difference between expected and received rewards. This dopamine-driven prediction error signal is believed to be the neural mechanism underlying learning from experience and adjusting future decisions accordingly.

E. More recent research has revealed the importance of the anterior cingulate cortex (ACC) in decision-making under conditions of conflict and uncertainty. The ACC appears to function as a neural conflict monitor, becoming activated when an individual must choose between competing options that are similarly attractive or when the outcome of a choice is uncertain. Neuroimaging studies have shown that ACC activity increases systematically with the difficulty of a decision — measured by how close the options are in subjective value — and that individuals with greater ACC activation tend to deliberate longer and make more cautious choices. The ACC also plays a role in detecting errors and adjusting behavior after mistakes, working in concert with the lateral prefrontal cortex to implement cognitive control and override impulsive responses.

F. The interplay between these neural systems has led researchers to propose "dual-process" models of decision-making, which distinguish between a fast, automatic, emotionally driven system (often called System 1) and a slow, deliberate, analytically driven system (System 2). Psychologist Daniel Kahneman, who won the Nobel Prize in Economics in 2002, popularized this framework in his influential book Thinking, Fast and Slow. According to this model, most everyday decisions are made by System 1, which relies on heuristics — mental shortcuts that are usually effective but can produce systematic biases. System 2 is engaged for complex, novel, or high-stakes decisions that require careful analysis. The two systems interact continuously, with System 2 sometimes monitoring and correcting the outputs of System 1, though this corrective function is itself limited by cognitive resources and can fail under conditions of fatigue, stress, or information overload.

G. The neuroscience of decision-making has profound practical implications. In medicine, understanding that patients process risk information emotionally as well as rationally has led to improved methods of communicating treatment options. In law, the recognition that judges and jurors are subject to cognitive biases has prompted reforms in jury instructions and sentencing guidelines. In economics, behavioral insights derived from neuroscience have informed the design of public policies — such as automatic enrollment in retirement savings plans and opt-out organ donation systems — that work with, rather than against, the grain of human psychology. Perhaps most fundamentally, the neuroscience of decision-making has dismantled the ancient dichotomy between reason and emotion, demonstrating that effective decision-making requires not the suppression of emotion but rather the seamless integration of cognitive and affective processes within the brain's remarkably complex neural architecture.`,
    questions: [
      // MCQ (Questions 1–4)
      { question: "What does expected utility theory assume about rational decision-makers?", options: ["They rely primarily on intuition", "They choose options that maximize expected utility", "They always avoid risk", "They consult others before deciding"], answer: "B", explanation: "'rational agents make decisions by multiplying the probability of each possible outcome by its utility and choosing the option that maximizes expected utility.'" },
      { question: "What was unusual about Damasio's vmPFC patients?", options: ["They had below-average intelligence", "They could not remember past events", "They had normal reasoning ability but made poor life decisions", "They were unable to feel physical pain"], answer: "C", explanation: "'These patients retained normal intelligence, memory, and logical reasoning ability, yet they were profoundly impaired in their capacity to make advantageous decisions.'" },
      { question: "In the Iowa Gambling Task, what did normal participants develop before conscious awareness?", options: ["A verbal strategy for choosing decks", "Anticipatory stress responses when reaching for bad decks", "A mathematical model of card probabilities", "A preference for the decks with the highest single rewards"], answer: "B", explanation: "'they begin showing anticipatory stress responses — measurable increases in skin conductance — when reaching for the disadvantageous decks, even before they are consciously aware.'" },
      { question: "What does Daniel Kahneman's System 1 rely on?", options: ["Careful logical analysis", "Mathematical probability calculations", "Heuristics — mental shortcuts", "Advice from experts"], answer: "C", explanation: "'System 1, which relies on heuristics — mental shortcuts that are usually effective but can produce systematic biases.'" },

      // Yes / No / Not Given (Questions 5–9)
      { question: "[Yes / No / Not Given] The author agrees that expected utility theory is a completely accurate model of decision-making.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "The author states that neuroscience has 'fundamentally challenged this picture,' indicating disagreement with expected utility theory as a complete model. No." },
      { question: "[Yes / No / Not Given] Patients with vmPFC damage were able to learn from negative consequences in the Iowa Gambling Task.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'Patients with vmPFC damage fail to develop these anticipatory responses and continue choosing from the losing decks throughout the experiment.' No." },
      { question: "[Yes / No / Not Given] Loss aversion means people feel losses approximately twice as strongly as equivalent gains.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'the well-documented tendency for people to feel the pain of losing something approximately twice as intensely as the pleasure of gaining something of equal value.' Yes." },
      { question: "[Yes / No / Not Given] The anterior cingulate cortex is larger in people who make better decisions.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage discusses ACC activation levels but does not mention its physical size. Not Given." },
      { question: "[Yes / No / Not Given] Daniel Kahneman's dual-process model has been rejected by most neuroscientists.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage presents the model but does not state whether it has been accepted or rejected by most neuroscientists. Not Given." },

      // Matching Features (Questions 10–12)
      { question: "[Matching] Which brain region integrates bodily signals such as gut feelings into decision-making?", options: ["The amygdala", "The ventromedial prefrontal cortex", "The anterior cingulate cortex", "The ventral tegmental area"], answer: "B", explanation: "'the vmPFC integrates bodily signals — gut feelings, changes in heart rate, muscle tension — into the decision-making process.'" },
      { question: "[Matching] Which brain structure is primarily involved in processing fear and threat-related information?", options: ["The ventromedial prefrontal cortex", "The anterior cingulate cortex", "The amygdala", "The substantia nigra"], answer: "C", explanation: "'The amygdala, an almond-shaped structure deep within the temporal lobe, plays a crucial role in processing fear and threat-related information.'" },
      { question: "[Matching] Which brain region functions as a neural conflict monitor during difficult decisions?", options: ["The vmPFC", "The amygdala", "The ventral tegmental area", "The anterior cingulate cortex"], answer: "D", explanation: "'The ACC appears to function as a neural conflict monitor, becoming activated when an individual must choose between competing options.'" },

      // Summary Completion (Questions 13–14)
      { question: "[Summary] Dopamine neurons respond not to rewards themselves but to the _____ of rewards and to prediction errors.", options: ["memory", "prediction", "visual appearance", "social context"], answer: "B", explanation: "'Dopamine neurons fire not simply in response to rewards themselves but in response to the prediction of rewards — and, crucially, to prediction errors.'" },
      { question: "[Summary] The neuroscience of decision-making has shown that effective decisions require the integration of cognitive and _____ processes.", options: ["sensory", "motor", "affective", "linguistic"], answer: "C", explanation: "'effective decision-making requires not the suppression of emotion but rather the seamless integration of cognitive and affective processes.'" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log("Seeding IELTS Academic Reading Mock Test 1...\n");

  const passageIds: string[] = [];
  const existingCount = await prisma.readingPassage.count();
  let order = existingCount;

  // ── Upsert passages + questions ──────────────────────────
  for (const p of passages) {
    const wc = p.passage.trim().split(/\s+/).length;

    const existing = await prisma.readingPassage.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await prisma.readingQuestion.deleteMany({ where: { passageId: existing.id } });
    }

    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount: wc,
      },
      create: {
        slug: p.slug,
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount: wc,
        order: order++,
      },
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
          explanation: qn.explanation,
          order: q,
        },
      });
    }

    passageIds.push(passage.id);
    console.log(`  ✓ [${p.level}] ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }

  // ── Upsert exam ──────────────────────────────────────────
  const examSlug = "ielts-academic-test-1";
  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: {
      title: "IELTS Academic Reading — Test 1",
      titleVi: "IELTS Academic Reading — Đề 1",
      type: "academic",
      timeMinutes: 60,
    },
    create: {
      slug: examSlug,
      title: "IELTS Academic Reading — Test 1",
      titleVi: "IELTS Academic Reading — Đề 1",
      type: "academic",
      timeMinutes: 60,
      order: 0,
    },
  });

  console.log(`\n  ✓ Exam: ${exam.slug} (id: ${exam.id})`);

  // ── Delete old sections, create new ones ─────────────────
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });

  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({
      data: {
        examId: exam.id,
        passageId: passageIds[i],
        order: i,
      },
    });
    console.log(`  ✓ Section ${i + 1}: passage ${passageIds[i]}`);
  }

  const totalQuestions = passages.reduce((sum, p) => sum + p.questions.length, 0);
  console.log(`\nDone! Seeded 3 passages (${totalQuestions} questions) + 1 exam + 3 sections.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
