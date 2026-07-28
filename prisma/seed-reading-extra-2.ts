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
  // ─── A1 ────────────────────────────────────────────────
  {
    slug: "at-the-supermarket",
    title: "At the Supermarket",
    titleVi: "Ở siêu thị",
    level: "A1",
    category: "daily-life",
    passage: `Every Saturday morning, my mother and I go to the supermarket. The supermarket is near our house. We walk there in about ten minutes. First, we get a shopping cart. Then we go to the fruit and vegetable section. My mother buys tomatoes, carrots, and onions for cooking. I like bananas and apples, so she always buys some for me. Next, we go to the meat section. We usually buy chicken and pork. Sometimes we buy fish too. After that, we go to the dairy section for milk, eggs, and yogurt. I love yogurt very much. Before we pay, my mother checks the shopping list to make sure we have everything. We pay at the cashier and put the food in bags. Then we walk home. I like going to the supermarket with my mother because I can choose my favorite snacks.`,
    questions: [
      { question: "When do they go to the supermarket?", options: ["Sunday morning", "Saturday morning", "Friday evening", "Saturday evening"], answer: "B", explanation: "'Every Saturday morning.'" },
      { question: "How do they get to the supermarket?", options: ["By car", "By bus", "They walk", "By bike"], answer: "C", explanation: "'We walk there in about ten minutes.'" },
      { question: "What fruits does the writer like?", options: ["Oranges and grapes", "Bananas and apples", "Mangoes and pears", "Strawberries and watermelon"], answer: "B", explanation: "'I like bananas and apples.'" },
      { question: "What does the mother check before paying?", options: ["Her phone", "The prices", "The shopping list", "The time"], answer: "C", explanation: "'my mother checks the shopping list.'" },
      { question: "Why does the writer like going to the supermarket?", options: ["Because it is big", "Because it is fun to walk", "Because they can choose favorite snacks", "Because the food is cheap"], answer: "C", explanation: "'I can choose my favorite snacks.'" },
    ],
  },
  {
    slug: "my-best-friend",
    title: "My Best Friend",
    titleVi: "Bạn thân của tôi",
    level: "A1",
    category: "daily-life",
    passage: `My best friend is Minh. He is 13 years old, the same age as me. We are in the same class at school. Minh is tall and thin. He has short black hair and brown eyes. He always wears glasses because he cannot see very well. Minh is very smart. He is the best student in our class, especially in math and science. But he is also very kind and helpful. He often helps me with my homework when I do not understand. After school, we sometimes play badminton together in the park near our houses. On weekends, we like to play video games at his house. His mother makes very good spring rolls and she always gives me some. Minh wants to be a doctor when he grows up. I think he will be a great doctor because he likes helping people. I am very lucky to have a friend like Minh.`,
    questions: [
      { question: "How old is Minh?", options: ["11 years old", "12 years old", "13 years old", "14 years old"], answer: "C", explanation: "'He is 13 years old.'" },
      { question: "Why does Minh wear glasses?", options: ["Because they look cool", "Because he cannot see well", "Because his parents want him to", "Because all students wear them"], answer: "B", explanation: "'He always wears glasses because he cannot see very well.'" },
      { question: "What subjects is Minh best at?", options: ["English and history", "Math and science", "Art and music", "Vietnamese and geography"], answer: "B", explanation: "'especially in math and science.'" },
      { question: "What do they do on weekends?", options: ["Go swimming", "Play video games", "Study together", "Go to the cinema"], answer: "B", explanation: "'we like to play video games at his house.'" },
      { question: "What does Minh want to be?", options: ["A teacher", "An engineer", "A scientist", "A doctor"], answer: "D", explanation: "'Minh wants to be a doctor when he grows up.'" },
    ],
  },

  // ─── A2 ────────────────────────────────────────────────
  {
    slug: "vietnamese-street-food",
    title: "Vietnamese Street Food",
    titleVi: "Ẩm thực đường phố Việt Nam",
    level: "A2",
    category: "culture",
    passage: `Vietnam is famous for its delicious street food. In every city, you can find food stalls and small restaurants on the sidewalks. One of the most popular dishes is "phở" — a bowl of rice noodle soup with beef or chicken. Vietnamese people often eat phở for breakfast. Another favorite is "bánh mì" — a crispy baguette filled with meat, vegetables, and sauce. It is cheap, fast, and very tasty. Many tourists say that Vietnamese bánh mì is the best sandwich in the world. "Bún chả" is a specialty of Hanoi. It consists of grilled pork served with rice noodles and a sweet dipping sauce. In 2016, former US President Barack Obama ate bún chả at a small restaurant in Hanoi and made it world-famous. For dessert, you can try "chè" — a sweet soup made with beans, fruits, and coconut milk. It comes in many different flavors. Street food in Vietnam is not only delicious but also very affordable. A full meal can cost as little as 30,000 to 50,000 VND (about 1 to 2 US dollars). That is why both locals and tourists love eating on the streets of Vietnam.`,
    questions: [
      { question: "When do Vietnamese people often eat phở?", options: ["For lunch", "For dinner", "For breakfast", "For a snack"], answer: "C", explanation: "'Vietnamese people often eat phở for breakfast.'" },
      { question: "What is 'bánh mì'?", options: ["A rice dish", "A noodle soup", "A crispy baguette sandwich", "A sweet dessert"], answer: "C", explanation: "'a crispy baguette filled with meat, vegetables, and sauce.'" },
      { question: "Who made bún chả world-famous?", options: ["A famous chef", "Barack Obama", "A food blogger", "A Vietnamese celebrity"], answer: "B", explanation: "'former US President Barack Obama ate bún chả... and made it world-famous.'" },
      { question: "What is 'chè'?", options: ["A type of tea", "A grilled meat dish", "A sweet soup dessert", "A type of bread"], answer: "C", explanation: "'chè — a sweet soup made with beans, fruits, and coconut milk.'" },
      { question: "How much does a street food meal cost?", options: ["10,000–20,000 VND", "30,000–50,000 VND", "100,000–200,000 VND", "500,000 VND"], answer: "B", explanation: "'A full meal can cost as little as 30,000 to 50,000 VND.'" },
    ],
  },
  {
    slug: "learning-a-musical-instrument",
    title: "Learning a Musical Instrument",
    titleVi: "Học chơi nhạc cụ",
    level: "A2",
    category: "daily-life",
    passage: `Two years ago, I decided to learn how to play the guitar. At first, it was very difficult. My fingers hurt a lot when I pressed the strings. I could only play a few simple chords, and they did not sound very good. I wanted to give up many times, but my father encouraged me to keep trying. He said, "Practice makes perfect." So I practiced every day for at least 30 minutes. After three months, I could play some easy songs. After six months, I could play and sing at the same time. Now, after two years of practice, I can play many songs — both Vietnamese and English. Last month, I performed at my school's talent show. I played the song "Hotel California" by the Eagles. I was very nervous before going on stage, but when I started playing, I forgot about my fear. The audience clapped loudly after my performance. Some of my classmates asked me to teach them how to play. Learning guitar has taught me an important lesson: if you work hard and never give up, you can achieve anything.`,
    questions: [
      { question: "What instrument did the writer learn?", options: ["Piano", "Violin", "Guitar", "Drums"], answer: "C", explanation: "'I decided to learn how to play the guitar.'" },
      { question: "What problem did the writer have at first?", options: ["The guitar was too heavy", "The fingers hurt from pressing strings", "The guitar was broken", "The music was too loud"], answer: "B", explanation: "'My fingers hurt a lot when I pressed the strings.'" },
      { question: "How long did the writer practice each day?", options: ["15 minutes", "30 minutes", "45 minutes", "1 hour"], answer: "B", explanation: "'I practiced every day for at least 30 minutes.'" },
      { question: "What song did the writer perform?", options: ["Yesterday", "Hotel California", "Let It Be", "Imagine"], answer: "B", explanation: "'I played the song Hotel California by the Eagles.'" },
      { question: "What lesson did the writer learn?", options: ["Music is easy", "You need talent to succeed", "Hard work and persistence lead to achievement", "Performing is scary"], answer: "C", explanation: "'if you work hard and never give up, you can achieve anything.'" },
    ],
  },

  // ─── B1 ────────────────────────────────────────────────
  {
    slug: "global-warming-effects",
    title: "The Effects of Global Warming",
    titleVi: "Tác động của sự nóng lên toàn cầu",
    level: "B1",
    category: "environment",
    passage: `Global warming is one of the biggest challenges facing our planet today. The Earth's average temperature has risen by about 1.1°C since the pre-industrial era, primarily due to the burning of fossil fuels, deforestation, and industrial activities. While 1.1°C may sound small, it has already caused significant changes to our environment. One of the most visible effects is the melting of polar ice caps and glaciers. The Arctic has lost about 40% of its ice cover since 1979. As the ice melts, sea levels rise, threatening low-lying coastal areas and island nations. Scientists predict that sea levels could rise by 30 to 60 centimeters by 2100 if current trends continue. Global warming also affects weather patterns. Many regions are experiencing more frequent and severe natural disasters, including hurricanes, droughts, floods, and heat waves. In 2023, global temperatures broke records, and wildfires devastated large areas of Canada, Greece, and Hawaii. Agriculture is also being impacted. Changes in temperature and rainfall patterns are making it harder for farmers to grow crops in many regions. This could lead to food shortages and higher food prices in the coming decades. To slow down global warming, countries around the world have agreed to reduce greenhouse gas emissions. The Paris Agreement, signed in 2015, aims to limit global temperature rise to 1.5°C above pre-industrial levels. However, achieving this goal requires urgent and coordinated action from governments, businesses, and individuals.`,
    questions: [
      { question: "How much has the Earth's temperature risen since the pre-industrial era?", options: ["About 0.5°C", "About 1.1°C", "About 2.0°C", "About 3.0°C"], answer: "B", explanation: "'risen by about 1.1°C since the pre-industrial era.'" },
      { question: "How much ice has the Arctic lost since 1979?", options: ["About 20%", "About 30%", "About 40%", "About 50%"], answer: "C", explanation: "'The Arctic has lost about 40% of its ice cover since 1979.'" },
      { question: "How much could sea levels rise by 2100?", options: ["10 to 20 cm", "30 to 60 cm", "1 to 2 meters", "3 to 5 meters"], answer: "B", explanation: "'sea levels could rise by 30 to 60 centimeters by 2100.'" },
      { question: "What happened in 2023 regarding temperatures?", options: ["Temperatures dropped", "Global temperatures broke records", "The ice caps grew", "No significant change"], answer: "B", explanation: "'In 2023, global temperatures broke records.'" },
      { question: "What does the Paris Agreement aim to do?", options: ["Ban all fossil fuels", "Limit temperature rise to 1.5°C", "Plant 1 billion trees", "Stop all industrial activity"], answer: "B", explanation: "'aims to limit global temperature rise to 1.5°C above pre-industrial levels.'" },
    ],
  },
  {
    slug: "sleep-importance",
    title: "Why Sleep Is So Important",
    titleVi: "Tại sao giấc ngủ quan trọng",
    level: "B1",
    category: "health",
    passage: `Sleep is essential for our physical and mental health, yet many people do not get enough of it. According to the National Sleep Foundation, adults need between 7 and 9 hours of sleep per night, while teenagers need 8 to 10 hours. However, studies show that about one-third of adults and more than two-thirds of teenagers are sleep-deprived. During sleep, our bodies perform important functions. The brain consolidates memories, moving information from short-term to long-term storage. This is why students who get enough sleep tend to perform better on exams than those who stay up late studying. Sleep also allows the body to repair damaged cells, strengthen the immune system, and regulate hormones. Lack of sleep has serious consequences. In the short term, it causes difficulty concentrating, irritability, and slower reaction times. Studies have shown that driving while sleep-deprived can be as dangerous as driving under the influence of alcohol. In the long term, chronic sleep deprivation increases the risk of obesity, diabetes, heart disease, and depression. To improve sleep quality, experts recommend maintaining a consistent sleep schedule, avoiding screens for at least one hour before bed, keeping the bedroom cool and dark, and limiting caffeine intake after 2 PM. Regular exercise also promotes better sleep, but it should be done at least three hours before bedtime.`,
    questions: [
      { question: "How much sleep do adults need per night?", options: ["5 to 6 hours", "6 to 7 hours", "7 to 9 hours", "10 to 12 hours"], answer: "C", explanation: "'adults need between 7 and 9 hours of sleep per night.'" },
      { question: "What does the brain do during sleep?", options: ["Stops working completely", "Consolidates memories", "Produces new blood cells", "Burns calories"], answer: "B", explanation: "'The brain consolidates memories, moving information from short-term to long-term storage.'" },
      { question: "What is driving while sleep-deprived compared to?", options: ["Driving in rain", "Driving at night", "Driving under the influence of alcohol", "Driving too fast"], answer: "C", explanation: "'driving while sleep-deprived can be as dangerous as driving under the influence of alcohol.'" },
      { question: "What long-term health risks does sleep deprivation cause?", options: ["Better memory", "Obesity, diabetes, heart disease, depression", "Improved immunity", "Stronger muscles"], answer: "B", explanation: "'chronic sleep deprivation increases the risk of obesity, diabetes, heart disease, and depression.'" },
      { question: "When should you stop consuming caffeine?", options: ["After 12 PM", "After 2 PM", "After 6 PM", "After 8 PM"], answer: "B", explanation: "'limiting caffeine intake after 2 PM.'" },
    ],
  },

  // ─── B2 ────────────────────────────────────────────────
  {
    slug: "fast-fashion-problem",
    title: "The Problem with Fast Fashion",
    titleVi: "Vấn đề của thời trang nhanh",
    level: "B2",
    category: "environment",
    passage: `The fashion industry has undergone a dramatic transformation over the past two decades. Where fashion brands once released two to four collections per year, fast fashion companies like Zara, H&M, and Shein now introduce new designs weekly — or even daily in the case of Shein, which adds an estimated 6,000 new items to its website each day. This relentless pace of production comes at an enormous environmental and social cost. The fashion industry is responsible for approximately 10% of global carbon emissions — more than international flights and maritime shipping combined. The production of a single cotton T-shirt requires about 2,700 liters of water, enough for one person to drink for two and a half years. Furthermore, textile dyeing is the second-largest source of water pollution worldwide. The social impact is equally troubling. Many fast fashion garments are produced in developing countries where workers earn extremely low wages and endure unsafe working conditions. The 2013 Rana Plaza factory collapse in Bangladesh, which killed 1,134 garment workers, brought international attention to the human cost of cheap clothing. Despite growing awareness, the problem is getting worse. Global clothing production doubled between 2000 and 2015, and the average consumer now buys 60% more clothing but keeps each item for half as long. An estimated 92 million tons of textile waste is generated annually, with most ending up in landfills or being incinerated. The slow fashion movement advocates for buying fewer, higher-quality items, choosing sustainable materials, and supporting ethical brands. Some consumers are also turning to second-hand shopping, clothing rental services, and clothing swaps as alternatives to fast fashion.`,
    questions: [
      { question: "How many new items does Shein add daily?", options: ["About 1,000", "About 3,000", "About 6,000", "About 10,000"], answer: "C", explanation: "'Shein, which adds an estimated 6,000 new items to its website each day.'" },
      { question: "What percentage of global carbon emissions does the fashion industry produce?", options: ["About 5%", "About 10%", "About 15%", "About 20%"], answer: "B", explanation: "'approximately 10% of global carbon emissions.'" },
      { question: "How much water does producing one cotton T-shirt require?", options: ["500 liters", "1,000 liters", "2,700 liters", "5,000 liters"], answer: "C", explanation: "'about 2,700 liters of water.'" },
      { question: "What happened at Rana Plaza in 2013?", options: ["A fire broke out", "A factory collapsed killing 1,134 workers", "Workers went on strike", "A new factory opened"], answer: "B", explanation: "'Rana Plaza factory collapse... killed 1,134 garment workers.'" },
      { question: "How much textile waste is generated annually?", options: ["About 50 million tons", "About 70 million tons", "About 92 million tons", "About 120 million tons"], answer: "C", explanation: "'An estimated 92 million tons of textile waste is generated annually.'" },
    ],
  },
  {
    slug: "cryptocurrency-explained",
    title: "Cryptocurrency: A Digital Revolution",
    titleVi: "Tiền mã hóa: Cuộc cách mạng số",
    level: "B2",
    category: "technology",
    passage: `Cryptocurrency has emerged as one of the most disruptive financial innovations of the 21st century. Bitcoin, the first and most well-known cryptocurrency, was created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. Unlike traditional currencies issued by central banks, cryptocurrencies operate on decentralized networks using blockchain technology — a distributed digital ledger that records all transactions transparently and securely. As of 2024, there are over 20,000 different cryptocurrencies, with a combined market capitalization exceeding 2 trillion US dollars. Bitcoin alone accounts for roughly 50% of this total value. Other major cryptocurrencies include Ethereum, which introduced "smart contracts" — self-executing agreements coded directly onto the blockchain — and stablecoins like USDT, which are pegged to the value of traditional currencies. Proponents argue that cryptocurrency offers several advantages: faster and cheaper international transfers, financial inclusion for the 1.4 billion unbanked adults worldwide, protection against government censorship, and resistance to inflation. However, critics raise valid concerns. The extreme price volatility of cryptocurrencies makes them unreliable as a store of value — Bitcoin's price has historically swung by more than 50% within a single year. The energy consumption of Bitcoin mining is also controversial, estimated to be comparable to the annual electricity usage of a country like Argentina. Additionally, the anonymity of cryptocurrency transactions has made them attractive for illegal activities, including money laundering and ransomware attacks. Governments worldwide are grappling with how to regulate this new asset class, balancing innovation with consumer protection and financial stability.`,
    questions: [
      { question: "Who created Bitcoin?", options: ["Elon Musk", "Satoshi Nakamoto", "Mark Zuckerberg", "Tim Berners-Lee"], answer: "B", explanation: "'created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto.'" },
      { question: "How many cryptocurrencies exist as of 2024?", options: ["About 5,000", "About 10,000", "About 20,000", "About 50,000"], answer: "C", explanation: "'there are over 20,000 different cryptocurrencies.'" },
      { question: "What are 'smart contracts'?", options: ["Legal documents", "Self-executing agreements on the blockchain", "Government regulations", "Banking apps"], answer: "B", explanation: "'smart contracts — self-executing agreements coded directly onto the blockchain.'" },
      { question: "How many unbanked adults exist worldwide?", options: ["500 million", "1 billion", "1.4 billion", "2 billion"], answer: "C", explanation: "'financial inclusion for the 1.4 billion unbanked adults worldwide.'" },
      { question: "What is Bitcoin's energy consumption compared to?", options: ["A small city", "A large factory", "A country like Argentina", "The entire EU"], answer: "C", explanation: "'comparable to the annual electricity usage of a country like Argentina.'" },
    ],
  },

  // ─── C1 ────────────────────────────────────────────────
  {
    slug: "misinformation-age",
    title: "Navigating the Age of Misinformation",
    titleVi: "Đối mặt với thời đại tin giả",
    level: "C1",
    category: "technology",
    passage: `The proliferation of social media and digital communication has ushered in an unprecedented crisis of misinformation. A landmark study published in Science by researchers at MIT found that false news stories are 70% more likely to be retweeted than true ones, and they spread six times faster. The researchers attributed this to the novelty and emotional intensity of false information — it tends to evoke stronger reactions of surprise, fear, and disgust than accurate reporting. The consequences of misinformation extend far beyond trivial factual errors. During the COVID-19 pandemic, the World Health Organization declared an "infodemic" — a dangerous flood of misleading health information that contributed to vaccine hesitancy, the promotion of unproven treatments, and ultimately preventable deaths. A study in Nature estimated that misinformation about COVID-19 vaccines led to approximately 2.3 million additional deaths globally between 2020 and 2022. Political misinformation poses equally grave threats to democratic institutions. Deepfake technology, powered by artificial intelligence, can now generate hyper-realistic fake videos of public figures saying or doing things they never did. In the lead-up to elections worldwide, these fabricated materials have been deployed to manipulate public opinion and undermine trust in legitimate media. The challenge of combating misinformation is compounded by the business model of social media platforms, which are algorithmically optimized to maximize engagement rather than accuracy. Sensational and emotionally charged content — whether true or false — generates more clicks, shares, and advertising revenue. Some platforms have implemented fact-checking partnerships and content moderation policies, but these measures have proven insufficient given the sheer volume and speed of information flow. Media literacy education is increasingly recognized as a crucial long-term solution, equipping individuals with the critical thinking skills to evaluate sources, identify manipulation techniques, and distinguish credible information from propaganda.`,
    questions: [
      { question: "How much more likely are false news stories to be retweeted?", options: ["30% more likely", "50% more likely", "70% more likely", "90% more likely"], answer: "C", explanation: "'false news stories are 70% more likely to be retweeted than true ones.'" },
      { question: "What term did the WHO use during the pandemic?", options: ["Pandemic overload", "Info crisis", "Infodemic", "Media emergency"], answer: "C", explanation: "'the World Health Organization declared an infodemic.'" },
      { question: "How many additional deaths were linked to vaccine misinformation?", options: ["About 500,000", "About 1.2 million", "About 2.3 million", "About 5 million"], answer: "C", explanation: "'approximately 2.3 million additional deaths globally.'" },
      { question: "What makes social media platforms amplify misinformation?", options: ["Government policies", "Algorithms optimized for engagement over accuracy", "Lack of internet access", "Too many journalists"], answer: "B", explanation: "'algorithmically optimized to maximize engagement rather than accuracy.'" },
      { question: "What is recommended as a long-term solution?", options: ["Banning social media", "Government censorship", "Media literacy education", "Shutting down fake accounts"], answer: "C", explanation: "'Media literacy education is increasingly recognized as a crucial long-term solution.'" },
    ],
  },
  {
    slug: "neuroplasticity",
    title: "Neuroplasticity: How the Brain Rewires Itself",
    titleVi: "Tính dẻo thần kinh: Não bộ tự tái cấu trúc",
    level: "C1",
    category: "science",
    passage: `For much of the 20th century, neuroscientists believed that the adult brain was essentially fixed — that its structure and function were established during childhood and remained largely unchanged thereafter. This dogma was overturned by the discovery of neuroplasticity: the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. Neuroplasticity operates through several mechanisms. Synaptic plasticity involves the strengthening or weakening of existing connections between neurons based on activity. When you repeatedly practice a skill — whether playing piano or speaking a new language — the synaptic connections involved in that activity become stronger and more efficient, a process encapsulated by the neuroscience maxim "neurons that fire together, wire together." Structural plasticity goes further, involving the actual growth of new synapses and even new neurons, a process called neurogenesis, which has been documented in the hippocampus, a brain region critical for learning and memory. The implications for rehabilitation medicine are profound. Stroke patients who have lost motor function can, through intensive physical therapy, recruit undamaged brain areas to compensate for destroyed tissue. Constraint-induced movement therapy (CIMT), which forces patients to use their impaired limb by restraining the healthy one, has demonstrated remarkable results, with some patients recovering function even years after their stroke. Similarly, studies on London taxi drivers have shown that the process of memorizing the city's labyrinthine street network physically enlarges the posterior hippocampus. However, neuroplasticity is not always beneficial. Chronic pain, addiction, and obsessive-compulsive disorder all involve maladaptive plasticity — neural pathways that have been strengthened in harmful ways. Understanding both the positive and negative dimensions of neuroplasticity is opening new frontiers in treating neurological and psychiatric conditions, from traumatic brain injury to post-traumatic stress disorder.`,
    questions: [
      { question: "What was the old belief about the adult brain?", options: ["It could grow indefinitely", "It was fixed and unchangeable after childhood", "It shrank over time", "It only changed during sleep"], answer: "B", explanation: "'neuroscientists believed that the adult brain was essentially fixed.'" },
      { question: "What does the maxim 'neurons that fire together, wire together' describe?", options: ["Neurogenesis", "Synaptic plasticity through repeated activity", "Brain damage", "Memory loss"], answer: "B", explanation: "'the synaptic connections involved in that activity become stronger and more efficient.'" },
      { question: "Where has neurogenesis been documented?", options: ["The frontal cortex", "The cerebellum", "The hippocampus", "The brainstem"], answer: "C", explanation: "'neurogenesis, which has been documented in the hippocampus.'" },
      { question: "What did studies on London taxi drivers reveal?", options: ["They have better eyesight", "Memorizing streets enlarges the posterior hippocampus", "They are more intelligent", "They have faster reflexes"], answer: "B", explanation: "'memorizing the city's labyrinthine street network physically enlarges the posterior hippocampus.'" },
      { question: "What is 'maladaptive plasticity'?", options: ["Normal brain development", "Brain growth in children", "Neural pathways strengthened in harmful ways", "A type of brain surgery"], answer: "C", explanation: "'neural pathways that have been strengthened in harmful ways.'" },
    ],
  },
];

async function main() {
  console.log("Seeding extra reading passages (batch 2)...\n");

  const existingCount = await prisma.readingPassage.count();
  let order = existingCount;

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

    console.log(`  ✓ [${p.level}] ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }

  console.log(`\nDone! Seeded ${passages.length} passages.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
