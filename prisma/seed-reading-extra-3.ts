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
    slug: "my-classroom",
    title: "My Classroom",
    titleVi: "Lớp học của tôi",
    level: "A1",
    category: "daily-life",
    passage: `My classroom is on the second floor. It is big and clean. There are 40 desks and 40 chairs for students. The teacher's desk is at the front of the room. There is a big whiteboard on the wall. Our teacher writes lessons on the whiteboard every day. Next to the whiteboard, there is a map of the world. I like to look at the map and find different countries. On the left side of the room, there are two big windows. We can see the school garden from the windows. There are many colorful flowers in the garden. On the right side, there are some bookshelves with many books. We can borrow books to read during break time. There is also a clock above the door. It helps us know what time it is. At the back of the room, there is a notice board. Students put their best drawings and writings on it. I love my classroom because it is a nice place to learn.`,
    questions: [
      { question: "Where is the classroom?", options: ["First floor", "Second floor", "Third floor", "Fourth floor"], answer: "B", explanation: "'My classroom is on the second floor.'" },
      { question: "How many desks are there?", options: ["20", "30", "40", "50"], answer: "C", explanation: "'There are 40 desks and 40 chairs.'" },
      { question: "What is next to the whiteboard?", options: ["A clock", "A bookshelf", "A map of the world", "A television"], answer: "C", explanation: "'Next to the whiteboard, there is a map of the world.'" },
      { question: "What can they see from the windows?", options: ["The parking lot", "The school garden", "The playground", "The road"], answer: "B", explanation: "'We can see the school garden from the windows.'" },
      { question: "What is at the back of the room?", options: ["A whiteboard", "A clock", "A notice board", "A computer"], answer: "C", explanation: "'At the back of the room, there is a notice board.'" },
    ],
  },
  {
    slug: "the-weather-today",
    title: "The Weather Today",
    titleVi: "Thời tiết hôm nay",
    level: "A1",
    category: "daily-life",
    passage: `Today the weather is very nice. The sky is blue and the sun is shining. It is warm outside — about 28 degrees Celsius. There are some white clouds in the sky, but it is not going to rain. My mother says it is a perfect day to go outside. In the morning, I went to the park with my dog, Lucky. Lucky likes to run and play in the sunshine. We stayed at the park for one hour. After that, I felt thirsty, so I drank some water. In the afternoon, the weather became a little hotter. My father turned on the fan in the living room. I ate some watermelon to cool down. Watermelon is my favorite fruit in summer. In the evening, the weather became cooler. There was a nice breeze. My family sat in the garden and talked. My grandmother said that tomorrow it might rain because she saw dark clouds in the west. I hope it will be sunny again so I can play outside.`,
    questions: [
      { question: "What is the temperature today?", options: ["22 degrees", "25 degrees", "28 degrees", "32 degrees"], answer: "C", explanation: "'about 28 degrees Celsius.'" },
      { question: "What is the dog's name?", options: ["Buddy", "Lucky", "Max", "Spot"], answer: "B", explanation: "'my dog, Lucky.'" },
      { question: "How long did they stay at the park?", options: ["30 minutes", "45 minutes", "One hour", "Two hours"], answer: "C", explanation: "'We stayed at the park for one hour.'" },
      { question: "What did the writer eat to cool down?", options: ["Ice cream", "Watermelon", "Yogurt", "Popsicle"], answer: "B", explanation: "'I ate some watermelon to cool down.'" },
      { question: "Why does grandmother think it will rain tomorrow?", options: ["She heard thunder", "She saw dark clouds in the west", "She watched the news", "She felt cold"], answer: "B", explanation: "'she saw dark clouds in the west.'" },
    ],
  },

  // ─── A2 ────────────────────────────────────────────────
  {
    slug: "ho-chi-minh-city",
    title: "Ho Chi Minh City",
    titleVi: "Thành phố Hồ Chí Minh",
    level: "A2",
    category: "travel",
    passage: `Ho Chi Minh City is the largest city in Vietnam. It was formerly known as Saigon. The city has a population of about 9 million people, but with visitors and workers from other provinces, the actual number is much higher. Ho Chi Minh City is the economic center of Vietnam. It has many tall buildings, shopping malls, and busy streets. The most famous landmark is the Notre-Dame Cathedral Basilica, built by the French in the late 19th century. Another popular place is Ben Thanh Market, where you can buy everything from clothes and souvenirs to delicious street food. The city is also known for its vibrant nightlife and café culture. District 1 is the heart of the city, where most tourists stay and visit. One of the biggest challenges in Ho Chi Minh City is traffic. There are millions of motorbikes on the roads, and crossing the street can be quite an adventure for visitors! The city has been building a metro system to help solve this problem. Despite the heat and traffic, Ho Chi Minh City is an exciting and dynamic place that attracts millions of tourists every year.`,
    questions: [
      { question: "What was Ho Chi Minh City formerly known as?", options: ["Hanoi", "Hue", "Saigon", "Da Nang"], answer: "C", explanation: "'It was formerly known as Saigon.'" },
      { question: "What is the population of the city?", options: ["About 5 million", "About 7 million", "About 9 million", "About 12 million"], answer: "C", explanation: "'a population of about 9 million people.'" },
      { question: "Who built the Notre-Dame Cathedral?", options: ["The Vietnamese", "The Japanese", "The Chinese", "The French"], answer: "D", explanation: "'built by the French in the late 19th century.'" },
      { question: "What is the biggest challenge in the city?", options: ["Pollution", "Crime", "Traffic", "Flooding"], answer: "C", explanation: "'One of the biggest challenges in Ho Chi Minh City is traffic.'" },
      { question: "What is being built to solve the traffic problem?", options: ["More roads", "A metro system", "More parking lots", "A bridge"], answer: "B", explanation: "'The city has been building a metro system.'" },
    ],
  },
  {
    slug: "online-shopping",
    title: "Online Shopping",
    titleVi: "Mua sắm trực tuyến",
    level: "A2",
    category: "technology",
    passage: `Online shopping has become very popular in recent years. In Vietnam, apps like Shopee, Lazada, and Tiki are used by millions of people every day. Online shopping is convenient because you can buy things from your home at any time — you do not need to go to a shop. You just open the app, search for what you want, compare prices, and place an order. The products are delivered to your door, usually within one to three days. Many people like online shopping because they can find lower prices and more choices than in physical stores. There are also special sale events like "11.11" and "12.12" when products are much cheaper. However, online shopping also has some problems. Sometimes the product you receive looks different from the photos. The quality may not be as good as you expected. It can also be hard to return items if they do not fit or are damaged. Another problem is that some people spend too much money because it is so easy to buy things with just one click. Experts advise shoppers to read reviews carefully, compare prices on different apps, and only buy things they really need.`,
    questions: [
      { question: "Which shopping apps are popular in Vietnam?", options: ["Amazon and eBay", "Shopee, Lazada, and Tiki", "Walmart and Target", "Alibaba and JD"], answer: "B", explanation: "'apps like Shopee, Lazada, and Tiki.'" },
      { question: "How long does delivery usually take?", options: ["Same day", "One to three days", "One week", "Two weeks"], answer: "B", explanation: "'usually within one to three days.'" },
      { question: "What are '11.11' and '12.12'?", options: ["Public holidays", "Special sale events", "App updates", "Delivery dates"], answer: "B", explanation: "'special sale events like 11.11 and 12.12 when products are much cheaper.'" },
      { question: "What is one problem with online shopping?", options: ["Products are always expensive", "Shops are always closed", "Products may look different from photos", "Delivery is always slow"], answer: "C", explanation: "'Sometimes the product you receive looks different from the photos.'" },
      { question: "What do experts advise shoppers to do?", options: ["Buy everything on sale", "Only shop at night", "Read reviews and compare prices", "Avoid all online shops"], answer: "C", explanation: "'read reviews carefully, compare prices on different apps.'" },
    ],
  },

  // ─── B1 ────────────────────────────────────────────────
  {
    slug: "water-crisis",
    title: "The Global Water Crisis",
    titleVi: "Khủng hoảng nước toàn cầu",
    level: "B1",
    category: "environment",
    passage: `Water is essential for life, yet billions of people around the world do not have access to clean, safe drinking water. According to the United Nations, approximately 2.2 billion people lack access to safely managed drinking water services. In many developing countries, women and children walk several kilometers every day to collect water from rivers and wells, which is often contaminated with bacteria and parasites. Unsafe water causes diseases such as cholera, typhoid, and dysentery. The World Health Organization estimates that contaminated water causes approximately 485,000 deaths from diarrheal diseases each year. Climate change is making the water crisis worse. Rising temperatures are causing droughts in some regions while increasing flooding in others. Glaciers, which serve as natural water reservoirs for billions of people, are melting at an alarming rate. Agriculture uses about 70% of the world's freshwater supply. As the global population grows — expected to reach 9.7 billion by 2050 — the demand for water will increase significantly. Some solutions to the water crisis include building better water infrastructure, developing water-efficient farming techniques, desalinating seawater, and reducing water waste. Israel, for example, has become a world leader in water technology, recycling about 85% of its wastewater for agricultural use. Education about water conservation is also crucial, as even small changes in daily habits can make a big difference.`,
    questions: [
      { question: "How many people lack safe drinking water?", options: ["About 1 billion", "About 2.2 billion", "About 3.5 billion", "About 5 billion"], answer: "B", explanation: "'approximately 2.2 billion people lack access to safely managed drinking water.'" },
      { question: "How many deaths does contaminated water cause yearly?", options: ["About 100,000", "About 250,000", "About 485,000", "About 1 million"], answer: "C", explanation: "'approximately 485,000 deaths from diarrheal diseases each year.'" },
      { question: "What percentage of freshwater does agriculture use?", options: ["About 30%", "About 50%", "About 70%", "About 90%"], answer: "C", explanation: "'Agriculture uses about 70% of the world's freshwater supply.'" },
      { question: "What is the projected world population by 2050?", options: ["8.5 billion", "9.2 billion", "9.7 billion", "10.5 billion"], answer: "C", explanation: "'expected to reach 9.7 billion by 2050.'" },
      { question: "How much wastewater does Israel recycle?", options: ["About 50%", "About 65%", "About 75%", "About 85%"], answer: "D", explanation: "'recycling about 85% of its wastewater.'" },
    ],
  },
  {
    slug: "benefits-of-reading",
    title: "The Benefits of Reading",
    titleVi: "Lợi ích của việc đọc sách",
    level: "B1",
    category: "daily-life",
    passage: `Reading is one of the most valuable habits a person can develop. Research has consistently shown that regular reading improves vocabulary, strengthens writing skills, and enhances critical thinking abilities. A study by the University of Sussex found that reading for just six minutes can reduce stress levels by up to 68%, making it more effective than listening to music, going for a walk, or drinking a cup of tea. Reading fiction, in particular, has been shown to improve empathy and emotional intelligence. When we read about characters' experiences and emotions, our brains simulate those experiences, helping us understand different perspectives. A study published in the journal Science found that people who read literary fiction scored higher on tests measuring social perception and empathy. Reading also keeps the brain active and healthy as we age. A study published in the journal Neurology found that people who engaged in mentally stimulating activities like reading throughout their lives had a 32% slower rate of cognitive decline compared to those who did not. In the digital age, the way we read has changed dramatically. E-books and audiobooks have made reading more accessible than ever, though some researchers argue that reading on screens may reduce comprehension and retention compared to reading physical books. Regardless of the format, the key is to make reading a daily habit. Even 20 minutes of reading per day adds up to about 1.8 million words per year — the equivalent of reading approximately 30 books.`,
    questions: [
      { question: "How much can reading reduce stress?", options: ["Up to 40%", "Up to 55%", "Up to 68%", "Up to 80%"], answer: "C", explanation: "'reduce stress levels by up to 68%.'" },
      { question: "What does reading fiction improve?", options: ["Math skills", "Physical fitness", "Empathy and emotional intelligence", "Memory for numbers"], answer: "C", explanation: "'reading fiction has been shown to improve empathy and emotional intelligence.'" },
      { question: "What did the Neurology study find?", options: ["Reading prevents all diseases", "Readers had 32% slower cognitive decline", "Reading cures depression", "Readers live 10 years longer"], answer: "B", explanation: "'32% slower rate of cognitive decline.'" },
      { question: "How many words does 20 minutes of daily reading add up to per year?", options: ["About 500,000", "About 1 million", "About 1.8 million", "About 3 million"], answer: "C", explanation: "'about 1.8 million words per year.'" },
      { question: "What concern exists about digital reading?", options: ["E-books are too expensive", "It may reduce comprehension compared to physical books", "Screens damage eyesight permanently", "Audiobooks are too short"], answer: "B", explanation: "'reading on screens may reduce comprehension and retention compared to reading physical books.'" },
    ],
  },

  // ─── B2 ────────────────────────────────────────────────
  {
    slug: "mental-health-workplace",
    title: "Mental Health in the Workplace",
    titleVi: "Sức khỏe tâm thần nơi làm việc",
    level: "B2",
    category: "health",
    passage: `Mental health has emerged as one of the most critical issues in the modern workplace. The World Health Organization estimates that depression and anxiety cost the global economy approximately $1 trillion per year in lost productivity. Despite growing awareness, mental health remains stigmatized in many workplace cultures, with employees fearing that disclosing psychological struggles could jeopardize their careers. Burnout — a state of chronic physical and emotional exhaustion caused by prolonged workplace stress — was officially recognized by the WHO as an occupational phenomenon in 2019. Common symptoms include emotional depletion, feelings of cynicism toward one's job, and reduced professional efficacy. A Gallup survey found that 76% of employees experience burnout at least sometimes, with 28% reporting feeling burned out "very often" or "always." Several factors contribute to poor workplace mental health: excessive workloads, lack of autonomy, unclear expectations, poor management, and the blurring of boundaries between work and personal life — a problem exacerbated by the rise of remote work. Progressive companies are responding by implementing Employee Assistance Programs (EAPs), offering mental health days, training managers to recognize signs of distress, and creating cultures where seeking help is normalized rather than penalized. Research shows that every dollar invested in mental health initiatives yields a return of $4 in improved health and productivity. Japan has introduced the concept of "ikigai" — finding purpose and meaning in work — as a framework for improving employee well-being, while some European countries have legislated the "right to disconnect" from work communications outside business hours.`,
    questions: [
      { question: "How much do depression and anxiety cost the global economy?", options: ["About $500 billion", "About $1 trillion", "About $2 trillion", "About $5 trillion"], answer: "B", explanation: "'approximately $1 trillion per year in lost productivity.'" },
      { question: "When was burnout officially recognized by the WHO?", options: ["2015", "2017", "2019", "2021"], answer: "C", explanation: "'officially recognized by the WHO as an occupational phenomenon in 2019.'" },
      { question: "What percentage of employees experience burnout sometimes?", options: ["56%", "66%", "76%", "86%"], answer: "C", explanation: "'76% of employees experience burnout at least sometimes.'" },
      { question: "What return does every dollar in mental health initiatives yield?", options: ["$2", "$3", "$4", "$5"], answer: "C", explanation: "'every dollar invested in mental health initiatives yields a return of $4.'" },
      { question: "What is 'ikigai'?", options: ["A type of meditation", "Finding purpose and meaning in work", "A Japanese management style", "A mental health medication"], answer: "B", explanation: "'ikigai — finding purpose and meaning in work.'" },
    ],
  },
  {
    slug: "ocean-exploration",
    title: "Exploring the Deep Ocean",
    titleVi: "Khám phá đại dương sâu thẳm",
    level: "B2",
    category: "science",
    passage: `Despite covering more than 70% of the Earth's surface, the ocean remains largely unexplored. Scientists estimate that more than 80% of the ocean floor has never been mapped, observed, or explored. In fact, we have better maps of the surface of Mars than of our own ocean floor. The deep ocean — defined as depths below 200 meters where sunlight cannot penetrate — is one of the most extreme environments on Earth. Temperatures hover just above freezing, pressure increases by one atmosphere for every 10 meters of depth, and there is complete darkness. At the bottom of the Mariana Trench, the deepest point in the ocean at approximately 11,000 meters, the pressure is more than 1,000 times the atmospheric pressure at sea level. Yet even in these extreme conditions, life thrives. Hydrothermal vents, discovered in 1977, support entire ecosystems powered not by sunlight but by chemical energy from the Earth's interior — a process called chemosynthesis. These deep-sea ecosystems include giant tube worms that can grow up to 2 meters long, ghostly white crabs, and bioluminescent fish that produce their own light. Deep-ocean exploration has also revealed potentially valuable resources. Polymetallic nodules scattered across the ocean floor contain manganese, nickel, copper, and cobalt — metals essential for electronics and renewable energy technology. However, deep-sea mining is highly controversial, as it could cause irreversible damage to fragile ecosystems that have taken thousands of years to develop. The technology for deep-sea exploration has advanced rapidly. Autonomous underwater vehicles (AUVs) can now reach depths that would be lethal for human divers, mapping the ocean floor with unprecedented detail.`,
    questions: [
      { question: "How much of the ocean floor has never been explored?", options: ["About 50%", "About 65%", "About 80%", "About 95%"], answer: "C", explanation: "'more than 80% of the ocean floor has never been mapped, observed, or explored.'" },
      { question: "How deep is the Mariana Trench?", options: ["About 5,000 meters", "About 8,000 meters", "About 11,000 meters", "About 15,000 meters"], answer: "C", explanation: "'approximately 11,000 meters.'" },
      { question: "When were hydrothermal vents discovered?", options: ["1965", "1977", "1985", "1999"], answer: "B", explanation: "'Hydrothermal vents, discovered in 1977.'" },
      { question: "What powers deep-sea ecosystems near vents?", options: ["Sunlight", "Nuclear energy", "Chemical energy (chemosynthesis)", "Thermal energy from the sun"], answer: "C", explanation: "'powered not by sunlight but by chemical energy from the Earth's interior — chemosynthesis.'" },
      { question: "Why is deep-sea mining controversial?", options: ["It is too expensive", "It could damage fragile ecosystems", "It is technically impossible", "It produces pollution on land"], answer: "B", explanation: "'could cause irreversible damage to fragile ecosystems.'" },
    ],
  },

  // ─── C1 ────────────────────────────────────────────────
  {
    slug: "behavioral-economics",
    title: "Behavioral Economics: Why We Make Irrational Decisions",
    titleVi: "Kinh tế học hành vi: Tại sao chúng ta đưa ra quyết định phi lý",
    level: "C1",
    category: "business",
    passage: `Traditional economic theory assumes that human beings are rational actors who make decisions by carefully weighing costs and benefits to maximize their utility. Behavioral economics, pioneered by psychologists Daniel Kahneman and Amos Tversky in the 1970s, has systematically demonstrated that this assumption is fundamentally flawed. Humans are subject to a wide range of cognitive biases that lead to predictably irrational decisions. One of the most well-documented biases is "loss aversion" — the tendency to feel the pain of losing something approximately twice as intensely as the pleasure of gaining something of equal value. This explains why investors often hold onto losing stocks far too long, hoping to avoid realizing a loss, while selling winning stocks too early to "lock in" gains. The "anchoring effect" describes our tendency to rely heavily on the first piece of information we encounter when making decisions. In negotiations, for example, the first number put on the table disproportionately influences the final outcome, regardless of its actual relevance. The "default effect" reveals that people overwhelmingly stick with pre-selected options, even when alternatives might better serve their interests. This insight has been applied to policy design through "nudge theory," developed by Richard Thaler and Cass Sunstein. By changing default options — for instance, making organ donation or retirement savings opt-out rather than opt-in — governments can significantly influence behavior without restricting freedom of choice. Countries that adopted opt-out organ donation systems saw consent rates rise from around 15% to over 90%. Kahneman's distinction between "System 1" (fast, intuitive, automatic thinking) and "System 2" (slow, deliberate, analytical thinking) provides a framework for understanding when and why we fall prey to cognitive biases. Most of our daily decisions are made by System 1, which, while efficient, is prone to systematic errors that System 2 thinking could correct — if we bothered to engage it.`,
    questions: [
      { question: "Who pioneered behavioral economics?", options: ["Adam Smith and David Ricardo", "Milton Friedman and John Keynes", "Daniel Kahneman and Amos Tversky", "Richard Thaler and Gary Becker"], answer: "C", explanation: "'pioneered by psychologists Daniel Kahneman and Amos Tversky in the 1970s.'" },
      { question: "How much more intensely do people feel losses compared to gains?", options: ["About 1.5 times", "About twice", "About three times", "About four times"], answer: "B", explanation: "'approximately twice as intensely as the pleasure of gaining something of equal value.'" },
      { question: "What happened when countries adopted opt-out organ donation?", options: ["Consent dropped to 50%", "Nothing changed", "Consent rose from ~15% to over 90%", "Consent rose to about 50%"], answer: "C", explanation: "'consent rates rise from around 15% to over 90%.'" },
      { question: "What is 'System 1' thinking?", options: ["Slow and analytical", "Fast, intuitive, and automatic", "Only used for math", "A computer system"], answer: "B", explanation: "'System 1 (fast, intuitive, automatic thinking).'" },
      { question: "What is the 'anchoring effect'?", options: ["Being stuck in one location", "Relying heavily on the first piece of information", "Always choosing the cheapest option", "Following the crowd's decisions"], answer: "B", explanation: "'our tendency to rely heavily on the first piece of information we encounter.'" },
    ],
  },
  {
    slug: "gene-editing-crispr",
    title: "CRISPR: Rewriting the Code of Life",
    titleVi: "CRISPR: Viết lại mã di truyền sự sống",
    level: "C1",
    category: "science",
    passage: `CRISPR-Cas9, often simply called CRISPR, has been hailed as the most significant breakthrough in biotechnology since the discovery of DNA's double helix structure in 1953. This revolutionary gene-editing technology allows scientists to precisely cut, delete, or replace specific sequences of DNA with unprecedented accuracy and efficiency. Developed by Jennifer Doudna and Emmanuelle Charpentier — who received the Nobel Prize in Chemistry in 2020 — CRISPR was adapted from a natural defense mechanism that bacteria use to fight viruses. The medical potential of CRISPR is staggering. Clinical trials are underway for treatments targeting sickle cell disease, certain forms of blindness, and various types of cancer. In December 2023, the FDA approved Casgevy, the first CRISPR-based therapy, for the treatment of sickle cell disease — a milestone that marked the transition of gene editing from laboratory science to clinical medicine. In agriculture, CRISPR is being used to develop crops that are more resistant to drought, disease, and pests, potentially addressing food security challenges as the global population grows. However, the technology raises profound ethical questions. In 2018, Chinese scientist He Jiankui shocked the world by announcing that he had used CRISPR to edit the genes of twin girls to make them resistant to HIV — the first known case of editing human embryos for reproduction. The scientific community widely condemned this experiment as premature and reckless, as the long-term effects of germline editing (changes that can be passed to future generations) remain unknown. The incident prompted calls for a global moratorium on human germline editing and intensified debates about where to draw the line between therapeutic applications and genetic enhancement. As the technology becomes more accessible and affordable, societies must grapple with questions that once belonged exclusively to the realm of science fiction: Should we edit out genetic diseases? Could we enhance human intelligence or physical abilities? Who decides which modifications are acceptable?`,
    questions: [
      { question: "Who developed CRISPR-Cas9?", options: ["James Watson and Francis Crick", "Jennifer Doudna and Emmanuelle Charpentier", "He Jiankui", "Craig Venter"], answer: "B", explanation: "'Developed by Jennifer Doudna and Emmanuelle Charpentier.'" },
      { question: "What was the first CRISPR-based therapy approved by the FDA?", options: ["Casgevy", "Zolgensma", "Luxturna", "Kymriah"], answer: "A", explanation: "'the FDA approved Casgevy, the first CRISPR-based therapy.'" },
      { question: "What disease was Casgevy approved to treat?", options: ["Cancer", "Diabetes", "Sickle cell disease", "Alzheimer's"], answer: "C", explanation: "'for the treatment of sickle cell disease.'" },
      { question: "What did He Jiankui do in 2018?", options: ["Won the Nobel Prize", "Edited the genes of twin girls", "Discovered a new gene", "Cured cancer with CRISPR"], answer: "B", explanation: "'he had used CRISPR to edit the genes of twin girls.'" },
      { question: "What is 'germline editing'?", options: ["Editing plant genes", "Changes that can be passed to future generations", "Editing genes in adults only", "A type of gene therapy"], answer: "B", explanation: "'germline editing (changes that can be passed to future generations).'" },
    ],
  },
];

async function main() {
  console.log("Seeding extra reading passages (batch 3)...\n");

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
