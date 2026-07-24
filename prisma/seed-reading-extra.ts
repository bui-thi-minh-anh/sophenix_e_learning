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
    slug: "my-family",
    title: "My Family",
    titleVi: "Gia đình tôi",
    level: "A1",
    category: "daily-life",
    passage: `My name is Nam. I have a small family. There are four people in my family: my father, my mother, my sister, and me. My father is a teacher. He teaches math at a high school. My mother is a nurse. She works at a hospital. My sister is ten years old. She is in grade 5. I am twelve years old. I am in grade 7. We live in a small house in Hanoi. Every evening, we have dinner together. After dinner, my sister and I do our homework. My parents watch the news on TV. On Sundays, we often go to the park. I love my family very much.`,
    questions: [
      { question: "How many people are in Nam's family?", options: ["Three", "Four", "Five", "Six"], answer: "B", explanation: "'There are four people in my family.'" },
      { question: "What does Nam's father do?", options: ["He is a doctor", "He is a teacher", "He is an engineer", "He is a driver"], answer: "B", explanation: "'My father is a teacher.'" },
      { question: "How old is Nam's sister?", options: ["Eight", "Nine", "Ten", "Twelve"], answer: "C", explanation: "'My sister is ten years old.'" },
      { question: "Where does the family live?", options: ["Ho Chi Minh City", "Da Nang", "Hanoi", "Hue"], answer: "C", explanation: "'We live in a small house in Hanoi.'" },
      { question: "What do they do on Sundays?", options: ["Go to school", "Go to the park", "Go shopping", "Stay at home"], answer: "B", explanation: "'On Sundays, we often go to the park.'" },
    ],
  },
  {
    slug: "my-daily-routine",
    title: "My Daily Routine",
    titleVi: "Thói quen hàng ngày của tôi",
    level: "A1",
    category: "daily-life",
    passage: `I wake up at 6:00 AM every day. First, I brush my teeth and wash my face. Then I have breakfast. I usually eat bread and drink milk for breakfast. I go to school at 6:45 AM. I walk to school with my friend Hoa. School starts at 7:00 AM. I have five classes every day. My favorite class is English. I have lunch at school at 11:30 AM. After school, I go home at 4:30 PM. I do my homework for two hours. Then I have dinner with my family at 6:30 PM. After dinner, I read a book or watch TV. I go to bed at 9:30 PM. I like my daily routine because it helps me study well.`,
    questions: [
      { question: "What time does the writer wake up?", options: ["5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM"], answer: "B", explanation: "'I wake up at 6:00 AM every day.'" },
      { question: "What does the writer eat for breakfast?", options: ["Rice and soup", "Bread and milk", "Noodles", "Eggs and juice"], answer: "B", explanation: "'I usually eat bread and drink milk for breakfast.'" },
      { question: "How does the writer go to school?", options: ["By bus", "By bike", "On foot", "By car"], answer: "C", explanation: "'I walk to school with my friend Hoa.'" },
      { question: "How long does the writer do homework?", options: ["One hour", "Two hours", "Three hours", "Four hours"], answer: "B", explanation: "'I do my homework for two hours.'" },
      { question: "What time does the writer go to bed?", options: ["8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"], answer: "C", explanation: "'I go to bed at 9:30 PM.'" },
    ],
  },
  {
    slug: "the-pet-cat",
    title: "The Pet Cat",
    titleVi: "Con mèo cưng",
    level: "A1",
    category: "animals",
    passage: `I have a pet cat. Her name is Mimi. She is two years old. She has white and orange fur. Her eyes are green. Mimi is very cute and friendly. She likes to sleep on my bed. Every morning, I give her food and water. She eats fish and cat food. Mimi likes to play with a small ball. Sometimes she catches mice in the house. My mother is happy when Mimi catches mice. In the evening, Mimi sits on my lap when I watch TV. She purrs softly. I take Mimi to the vet once a year. The vet says she is healthy. Mimi is not just a pet — she is part of my family.`,
    questions: [
      { question: "What is the cat's name?", options: ["Kitty", "Luna", "Mimi", "Nana"], answer: "C", explanation: "'Her name is Mimi.'" },
      { question: "What color is Mimi's fur?", options: ["Black and white", "White and orange", "Gray", "Brown"], answer: "B", explanation: "'She has white and orange fur.'" },
      { question: "What does Mimi like to eat?", options: ["Rice", "Chicken", "Fish and cat food", "Bread"], answer: "C", explanation: "'She eats fish and cat food.'" },
      { question: "Why is the mother happy?", options: ["Because Mimi is cute", "Because Mimi catches mice", "Because Mimi sleeps a lot", "Because Mimi is quiet"], answer: "B", explanation: "'My mother is happy when Mimi catches mice.'" },
      { question: "How often does the writer take Mimi to the vet?", options: ["Every month", "Twice a year", "Once a year", "Never"], answer: "C", explanation: "'I take Mimi to the vet once a year.'" },
    ],
  },

  // ─── A2 ────────────────────────────────────────────────
  {
    slug: "a-trip-to-da-lat",
    title: "A Trip to Da Lat",
    titleVi: "Chuyến đi Đà Lạt",
    level: "A2",
    category: "travel",
    passage: `Last summer, my family took a trip to Da Lat. We traveled by bus from Ho Chi Minh City. The journey took about seven hours. When we arrived, the weather was cool and foggy. Da Lat is famous for its beautiful flowers and fresh vegetables. On the first day, we visited the Flower Garden. There were many kinds of flowers — roses, sunflowers, and orchids. I took a lot of photos. On the second day, we went to the Valley of Love. We rode a swan-shaped pedal boat on the lake. It was very fun. In the evening, we walked around the night market and tried grilled corn and soy milk. On the last day, we visited a strawberry farm. I picked fresh strawberries and ate them right away. They were sweet and delicious. I bought some strawberry jam as a gift for my friends. Da Lat is a wonderful place, and I hope to go back again soon.`,
    questions: [
      { question: "How did the family travel to Da Lat?", options: ["By car", "By train", "By bus", "By plane"], answer: "C", explanation: "'We traveled by bus from Ho Chi Minh City.'" },
      { question: "What is Da Lat famous for?", options: ["Beaches", "Mountains", "Flowers and fresh vegetables", "Temples"], answer: "C", explanation: "'Da Lat is famous for its beautiful flowers and fresh vegetables.'" },
      { question: "What did they do at the Valley of Love?", options: ["Hiked a mountain", "Rode a pedal boat", "Went swimming", "Played football"], answer: "B", explanation: "'We rode a swan-shaped pedal boat on the lake.'" },
      { question: "What did they eat at the night market?", options: ["Pho and banh mi", "Grilled corn and soy milk", "Rice and fish", "Ice cream"], answer: "B", explanation: "'we tried grilled corn and soy milk.'" },
      { question: "What did the writer buy as a gift?", options: ["Flowers", "Postcards", "Strawberry jam", "Coffee"], answer: "C", explanation: "'I bought some strawberry jam as a gift.'" },
    ],
  },
  {
    slug: "healthy-eating-habits",
    title: "Healthy Eating Habits",
    titleVi: "Thói quen ăn uống lành mạnh",
    level: "A2",
    category: "health",
    passage: `Eating healthy food is important for our body and mind. A good diet includes fruits, vegetables, protein, and whole grains. Doctors say we should eat at least five servings of fruits and vegetables every day. They give us vitamins and minerals that keep us strong. We should also drink plenty of water — about eight glasses a day. Water helps our body work well and keeps our skin healthy. It is best to avoid eating too much sugar, salt, and fat. Fast food like burgers, pizza, and fried chicken tastes good, but eating it every day can cause health problems such as obesity and heart disease. Breakfast is the most important meal of the day. It gives us energy to study and work. A good breakfast might include eggs, bread, fruit, and a glass of milk. We should also try to eat dinner at least two hours before going to bed. This helps our body digest the food properly. Remember: eating well today means a healthier life tomorrow!`,
    questions: [
      { question: "How many servings of fruits and vegetables should we eat daily?", options: ["At least 3", "At least 5", "At least 7", "At least 10"], answer: "B", explanation: "'we should eat at least five servings of fruits and vegetables every day.'" },
      { question: "How much water should we drink per day?", options: ["Four glasses", "Six glasses", "Eight glasses", "Ten glasses"], answer: "C", explanation: "'about eight glasses a day.'" },
      { question: "What can eating too much fast food cause?", options: ["Better sleep", "Obesity and heart disease", "Stronger muscles", "Better eyesight"], answer: "B", explanation: "'eating it every day can cause health problems such as obesity and heart disease.'" },
      { question: "Which meal is the most important?", options: ["Lunch", "Dinner", "Snack", "Breakfast"], answer: "D", explanation: "'Breakfast is the most important meal of the day.'" },
      { question: "When should we eat dinner?", options: ["Right before bed", "At least 2 hours before bed", "At midnight", "At 10 PM"], answer: "B", explanation: "'eat dinner at least two hours before going to bed.'" },
    ],
  },
  {
    slug: "tet-holiday",
    title: "Tet Holiday in Vietnam",
    titleVi: "Ngày Tết ở Việt Nam",
    level: "A2",
    category: "culture",
    passage: `Tet is the most important holiday in Vietnam. It is the Vietnamese Lunar New Year. Tet usually falls in January or February. Before Tet, people clean their houses and decorate them with flowers. The most popular flowers are peach blossoms in the North and apricot blossoms in the South. People also buy new clothes and cook special food. "Bánh chưng" (square sticky rice cake) is a traditional Tet food. On New Year's Eve, families gather together for a big dinner. At midnight, there are fireworks in the sky. Children receive "lì xì" (lucky money) in red envelopes from adults. They say "Chúc mừng năm mới!" which means "Happy New Year!" During Tet, people visit their relatives, go to pagodas, and enjoy the festive atmosphere. Most people have about one week off from work and school. Tet is a time for family, joy, and new beginnings.`,
    questions: [
      { question: "When does Tet usually take place?", options: ["March or April", "January or February", "November or December", "May or June"], answer: "B", explanation: "'Tet usually falls in January or February.'" },
      { question: "What flowers are popular in the North?", options: ["Sunflowers", "Roses", "Peach blossoms", "Apricot blossoms"], answer: "C", explanation: "'peach blossoms in the North.'" },
      { question: "What is 'bánh chưng'?", options: ["A drink", "A soup", "A square sticky rice cake", "A fruit"], answer: "C", explanation: "'Bánh chưng (square sticky rice cake).'" },
      { question: "What do children receive during Tet?", options: ["Toys", "Lucky money in red envelopes", "New books", "Flowers"], answer: "B", explanation: "'Children receive lì xì (lucky money) in red envelopes.'" },
      { question: "How long is the Tet holiday?", options: ["Three days", "Five days", "About one week", "Two weeks"], answer: "C", explanation: "'Most people have about one week off.'" },
    ],
  },

  // ─── B1 ────────────────────────────────────────────────
  {
    slug: "social-media-impact",
    title: "The Impact of Social Media on Teenagers",
    titleVi: "Tác động của mạng xã hội đối với thanh thiếu niên",
    level: "B1",
    category: "technology",
    passage: `Social media has become an integral part of teenagers' lives. Platforms like Facebook, Instagram, TikTok, and YouTube are used by millions of young people every day. According to a recent survey, the average teenager spends about three hours per day on social media. While social media has many benefits — such as staying connected with friends, learning new skills through tutorials, and accessing news — it also has significant drawbacks. One major concern is cyberbullying. Studies show that about 37% of students between the ages of 12 and 17 have experienced cyberbullying at some point. Hurtful comments, embarrassing photos, and online rumors can cause serious emotional damage. Another issue is the effect on mental health. Research has linked excessive social media use to increased rates of anxiety, depression, and low self-esteem among teenagers. Many young people compare their lives to the carefully curated images they see online, leading to feelings of inadequacy. Sleep disruption is also a problem, as many teenagers use their phones late at night. Experts recommend that teenagers limit their social media use to no more than two hours per day and take regular breaks from screens. Parents should also have open conversations with their children about online safety and responsible digital citizenship.`,
    questions: [
      { question: "How much time does the average teenager spend on social media daily?", options: ["One hour", "Two hours", "Three hours", "Four hours"], answer: "C", explanation: "'the average teenager spends about three hours per day on social media.'" },
      { question: "What percentage of students have experienced cyberbullying?", options: ["About 20%", "About 37%", "About 50%", "About 65%"], answer: "B", explanation: "'about 37% of students between the ages of 12 and 17 have experienced cyberbullying.'" },
      { question: "What mental health issues are linked to excessive social media use?", options: ["Headaches and fever", "Anxiety, depression, and low self-esteem", "Memory loss", "Vision problems"], answer: "B", explanation: "'increased rates of anxiety, depression, and low self-esteem.'" },
      { question: "Why do teenagers feel inadequate?", options: ["Because they study too much", "Because they compare their lives to curated images online", "Because they don't have phones", "Because their parents are strict"], answer: "B", explanation: "'Many young people compare their lives to the carefully curated images they see online.'" },
      { question: "How much social media use do experts recommend?", options: ["No more than one hour", "No more than two hours", "No more than three hours", "Unlimited"], answer: "B", explanation: "'limit their social media use to no more than two hours per day.'" },
    ],
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy Sources",
    titleVi: "Các nguồn năng lượng tái tạo",
    level: "B1",
    category: "environment",
    passage: `As the world faces the challenges of climate change, renewable energy has become increasingly important. Unlike fossil fuels such as coal, oil, and natural gas, renewable energy sources do not run out and produce much less pollution. Solar energy is one of the most popular forms of renewable energy. Solar panels convert sunlight into electricity. Many homes and businesses now use solar panels to reduce their electricity bills. Wind energy is another growing source of power. Wind turbines, often grouped together in wind farms, can generate large amounts of electricity. Countries like Denmark and Germany are leaders in wind energy production. Hydropower, which uses the force of flowing water to generate electricity, is the oldest form of renewable energy. Vietnam has several large hydropower plants, including Son La and Hoa Binh. Biomass energy comes from organic materials like wood, crop waste, and animal manure. It can be burned to produce heat and electricity. Although renewable energy sources have many advantages, they also face challenges. Solar and wind energy depend on weather conditions, and building renewable energy infrastructure can be expensive. However, the cost of renewable energy technology has been decreasing rapidly, making it more accessible than ever before.`,
    questions: [
      { question: "What is the main advantage of renewable energy over fossil fuels?", options: ["It is cheaper", "It doesn't run out and produces less pollution", "It is easier to use", "It is available everywhere"], answer: "B", explanation: "'renewable energy sources do not run out and produce much less pollution.'" },
      { question: "What do solar panels do?", options: ["Store water", "Convert sunlight into electricity", "Produce wind", "Heat water"], answer: "B", explanation: "'Solar panels convert sunlight into electricity.'" },
      { question: "Which countries are leaders in wind energy?", options: ["Vietnam and Thailand", "USA and China", "Denmark and Germany", "Japan and Korea"], answer: "C", explanation: "'Countries like Denmark and Germany are leaders in wind energy production.'" },
      { question: "What is the oldest form of renewable energy?", options: ["Solar", "Wind", "Biomass", "Hydropower"], answer: "D", explanation: "'Hydropower... is the oldest form of renewable energy.'" },
      { question: "What challenge do solar and wind energy face?", options: ["They are too powerful", "They depend on weather conditions", "They pollute the air", "They are too noisy"], answer: "B", explanation: "'Solar and wind energy depend on weather conditions.'" },
    ],
  },

  // ─── B2 ────────────────────────────────────────────────
  {
    slug: "remote-work-revolution",
    title: "The Remote Work Revolution",
    titleVi: "Cuộc cách mạng làm việc từ xa",
    level: "B2",
    category: "business",
    passage: `The COVID-19 pandemic fundamentally transformed the way people work. Before 2020, only about 5% of full-time employees worked from home. By mid-2020, that figure had surged to over 60% in many developed countries. Even as the pandemic subsided, a significant portion of the workforce has continued to work remotely or in hybrid arrangements. A Stanford University study found that remote workers are, on average, 13% more productive than their office-based counterparts. The elimination of daily commutes saves employees both time and money — the average American worker spent approximately 27 minutes each way commuting before the pandemic, totaling nearly 200 hours per year. However, remote work is not without its challenges. Many employees report feeling isolated and disconnected from their colleagues. The blurring of boundaries between work and personal life has led to what researchers call "always-on culture," where workers feel pressure to be available around the clock. A 2022 survey by Buffer found that 25% of remote workers struggle with loneliness, while 22% have difficulty unplugging after work hours. Companies are adapting by investing in collaboration tools, redesigning office spaces for occasional in-person meetings, and implementing policies that protect employees' right to disconnect. The future of work is likely to be a hybrid model that combines the flexibility of remote work with the social benefits of face-to-face interaction.`,
    questions: [
      { question: "What percentage of employees worked from home before 2020?", options: ["About 2%", "About 5%", "About 10%", "About 15%"], answer: "B", explanation: "'only about 5% of full-time employees worked from home.'" },
      { question: "How much more productive are remote workers according to Stanford?", options: ["5%", "10%", "13%", "20%"], answer: "C", explanation: "'remote workers are, on average, 13% more productive.'" },
      { question: "How much time did the average American spend commuting annually?", options: ["About 100 hours", "About 150 hours", "About 200 hours", "About 250 hours"], answer: "C", explanation: "'totaling nearly 200 hours per year.'" },
      { question: "What is 'always-on culture'?", options: ["Working only during office hours", "Pressure to be available around the clock", "Having multiple jobs", "Working only at night"], answer: "B", explanation: "'workers feel pressure to be available around the clock.'" },
      { question: "What model does the author predict for the future?", options: ["Fully remote", "Fully in-office", "A hybrid model", "Four-day work week"], answer: "C", explanation: "'The future of work is likely to be a hybrid model.'" },
    ],
  },
  {
    slug: "space-exploration-2024",
    title: "Space Exploration in the Modern Era",
    titleVi: "Khám phá không gian trong thời đại hiện đại",
    level: "B2",
    category: "science",
    passage: `Space exploration has entered a new era, driven by both government agencies and private companies. NASA's Artemis program aims to return humans to the Moon by the mid-2020s, with the ultimate goal of establishing a sustainable presence there. Meanwhile, SpaceX, founded by Elon Musk, has revolutionized space travel with its reusable rocket technology. The Falcon 9 rocket can land vertically after launch and be flown again, dramatically reducing the cost of reaching orbit. The company's Starship, currently in development, is designed to carry up to 100 passengers and could eventually transport humans to Mars. China has also emerged as a major player in space exploration. The country successfully landed a rover on the far side of the Moon in 2019 and completed its own space station, Tiangong, in 2022. India made history in 2023 when its Chandrayaan-3 mission became the first to successfully land near the Moon's south pole. Private space tourism has also become a reality. Companies like Blue Origin and Virgin Galactic have sent paying customers on suborbital flights, though tickets remain prohibitively expensive for most people, costing between $250,000 and $450,000 per seat. Despite the excitement, space exploration faces significant challenges, including the high cost of missions, the health risks of long-duration spaceflight, and the growing problem of space debris — with over 36,000 tracked objects orbiting Earth.`,
    questions: [
      { question: "What is the goal of NASA's Artemis program?", options: ["Send robots to Mars", "Return humans to the Moon", "Build a telescope", "Study asteroids"], answer: "B", explanation: "'aims to return humans to the Moon.'" },
      { question: "What makes SpaceX's Falcon 9 special?", options: ["It is the largest rocket", "It uses nuclear fuel", "It can land vertically and be reused", "It can reach the Sun"], answer: "C", explanation: "'can land vertically after launch and be flown again.'" },
      { question: "What did India achieve in 2023?", options: ["Built a space station", "Landed near the Moon's south pole", "Sent astronauts to Mars", "Launched a satellite to Jupiter"], answer: "B", explanation: "'Chandrayaan-3 mission became the first to successfully land near the Moon's south pole.'" },
      { question: "How much does a space tourism ticket cost?", options: ["$50,000–$100,000", "$100,000–$200,000", "$250,000–$450,000", "$1 million+"], answer: "C", explanation: "'costing between $250,000 and $450,000 per seat.'" },
      { question: "How many tracked objects are orbiting Earth?", options: ["Over 10,000", "Over 20,000", "Over 36,000", "Over 50,000"], answer: "C", explanation: "'over 36,000 tracked objects orbiting Earth.'" },
    ],
  },

  // ─── C1 ────────────────────────────────────────────────
  {
    slug: "language-extinction",
    title: "The Crisis of Language Extinction",
    titleVi: "Khủng hoảng tuyệt chủng ngôn ngữ",
    level: "C1",
    category: "culture",
    passage: `Of the approximately 7,000 languages currently spoken worldwide, linguists estimate that nearly half will become extinct by the end of this century. A language is considered endangered when it is no longer being learned by children as a first language, and it becomes extinct when its last fluent speaker dies. UNESCO has identified over 2,500 languages as being at various stages of endangerment. The causes of language death are multifaceted. Globalization and urbanization have led many communities to abandon their ancestral languages in favor of dominant languages like English, Mandarin, or Spanish, which are perceived as offering greater economic and social mobility. Government policies have historically played a significant role as well — colonial administrations and nation-building efforts frequently suppressed indigenous languages through education systems that punished children for speaking their mother tongues. The consequences of language extinction extend far beyond the loss of a communication system. Each language encodes a unique worldview, a distinct way of categorizing and understanding reality. Indigenous languages often contain invaluable knowledge about local ecosystems, medicinal plants, and sustainable agricultural practices that cannot be easily translated into other languages. When a language dies, this accumulated knowledge — often developed over millennia — is irretrievably lost. Several initiatives are attempting to reverse this trend. Community-based language revitalization programs, digital documentation projects, and the integration of indigenous languages into formal education have shown promising results. The revival of Hebrew as a living spoken language and the ongoing revitalization of Māori in New Zealand demonstrate that language death is not inevitable.`,
    questions: [
      { question: "How many languages are predicted to become extinct by the end of this century?", options: ["About 1,000", "About 2,000", "Nearly half of 7,000", "About 6,000"], answer: "C", explanation: "'nearly half will become extinct by the end of this century.'" },
      { question: "When is a language considered endangered?", options: ["When it has fewer than 100 speakers", "When it is not taught in schools", "When children no longer learn it as a first language", "When it has no written form"], answer: "C", explanation: "'when it is no longer being learned by children as a first language.'" },
      { question: "What unique knowledge do indigenous languages often contain?", options: ["Mathematical formulas", "Knowledge about local ecosystems and medicinal plants", "Computer programming concepts", "International trade regulations"], answer: "B", explanation: "'invaluable knowledge about local ecosystems, medicinal plants, and sustainable agricultural practices.'" },
      { question: "Which language is cited as a successful revival?", options: ["Latin", "Sanskrit", "Hebrew", "Ancient Greek"], answer: "C", explanation: "'The revival of Hebrew as a living spoken language.'" },
      { question: "What role did colonial administrations play?", options: ["They promoted all languages equally", "They suppressed indigenous languages through education", "They documented endangered languages", "They created new languages"], answer: "B", explanation: "'colonial administrations... frequently suppressed indigenous languages through education systems.'" },
    ],
  },
  {
    slug: "gut-brain-connection",
    title: "The Gut-Brain Connection",
    titleVi: "Mối liên hệ giữa ruột và não",
    level: "C1",
    category: "science",
    passage: `Recent advances in neuroscience and microbiology have revealed a remarkable connection between the gastrointestinal system and the brain, often referred to as the "gut-brain axis." The human gut contains approximately 100 trillion microorganisms — collectively known as the gut microbiome — which play a crucial role not only in digestion but also in mental health, immune function, and even behavior. The gut is sometimes called the "second brain" because it contains its own nervous system, the enteric nervous system (ENS), which comprises about 500 million neurons. The ENS can operate independently of the brain, controlling complex digestive processes without conscious input. Communication between the gut and brain occurs through multiple pathways: the vagus nerve (the longest cranial nerve, stretching from the brainstem to the abdomen), hormonal signals, immune system molecules, and metabolites produced by gut bacteria. Research has demonstrated that the composition of gut bacteria can significantly influence mood and mental health. Studies on germ-free mice — animals raised without any gut bacteria — show markedly altered behavior, including increased anxiety and impaired social interaction. In humans, clinical trials have found that certain probiotics (beneficial bacteria) can reduce symptoms of depression and anxiety. A landmark 2019 study published in Nature Microbiology identified specific gut bacteria species that were depleted in people with depression, regardless of their use of antidepressants. The therapeutic implications are profound. "Psychobiotics" — probiotics that confer mental health benefits — represent a novel approach to treating psychiatric conditions. Fecal microbiota transplantation (FMT), already used to treat severe intestinal infections, is being investigated as a potential treatment for conditions ranging from autism to Parkinson's disease. However, the field is still in its infancy, and much more research is needed before gut-based therapies can be widely recommended.`,
    questions: [
      { question: "How many microorganisms does the human gut contain?", options: ["About 1 trillion", "About 10 trillion", "About 100 trillion", "About 1 quadrillion"], answer: "C", explanation: "'approximately 100 trillion microorganisms.'" },
      { question: "Why is the gut called the 'second brain'?", options: ["It can think like the brain", "It contains its own nervous system with 500 million neurons", "It produces brain cells", "It controls memory"], answer: "B", explanation: "'it contains its own nervous system, the enteric nervous system, which comprises about 500 million neurons.'" },
      { question: "What was found in the 2019 Nature Microbiology study?", options: ["A cure for depression", "Specific gut bacteria depleted in people with depression", "A new type of antidepressant", "That diet has no effect on mood"], answer: "B", explanation: "'identified specific gut bacteria species that were depleted in people with depression.'" },
      { question: "What are 'psychobiotics'?", options: ["Antibiotics for the brain", "Probiotics that confer mental health benefits", "Medications for gut infections", "Brain surgery techniques"], answer: "B", explanation: "'Psychobiotics — probiotics that confer mental health benefits.'" },
      { question: "What is FMT being investigated for?", options: ["Only gut infections", "Weight loss only", "Conditions ranging from autism to Parkinson's disease", "Improving athletic performance"], answer: "C", explanation: "'being investigated as a potential treatment for conditions ranging from autism to Parkinson's disease.'" },
    ],
  },
];

async function main() {
  console.log("Seeding extra reading passages...\n");

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
