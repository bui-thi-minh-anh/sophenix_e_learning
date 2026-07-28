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
  // 1. A1 — Animals: My Pet Dog
  // ═══════════════════════════════════════════════════════════
  {
    slug: "my-pet-dog",
    title: "My Pet Dog",
    titleVi: "Con chó cưng của tôi",
    level: "A1",
    category: "animals",
    passage: `My Pet Dog

My name is Hoa. I have a pet dog. His name is Lucky. He is three years old. Lucky is small and white. He has big brown eyes and a short tail.

Every morning, I wake up at 6:30. Lucky is always waiting at my bedroom door. He is very happy to see me. His tail moves very fast. I give him breakfast. He eats dog food and drinks water.

After school, I play with Lucky in the garden. We play with a ball. I throw the ball, and Lucky runs to get it. He brings it back to me. He is very good at this game. Sometimes, Lucky is tired, and he lies down under the big tree.

In the evening, Lucky sits next to me when I do my homework. He is very quiet. He does not make noise. After dinner, I take Lucky for a walk. We walk around the park near my house. Lucky likes to meet other dogs at the park.

At night, Lucky sleeps in his small bed in the living room. I say "Good night, Lucky!" and he closes his eyes. I love Lucky very much. He is my best friend.`,
    questions: [
      { question: "What is the dog's name?", options: ["Hoa", "Lucky", "Max", "Buddy"], answer: "B", explanation: "'His name is Lucky.'" },
      { question: "What color is Lucky?", options: ["Brown", "Black", "White", "Gray"], answer: "C", explanation: "'Lucky is small and white.'" },
      { question: "How old is Lucky?", options: ["One year old", "Two years old", "Three years old", "Four years old"], answer: "C", explanation: "'He is three years old.'" },
      { question: "What does Hoa do with Lucky after school?", options: ["She reads a book", "She plays with a ball", "She watches TV", "She goes shopping"], answer: "B", explanation: "'We play with a ball.'" },
      { question: "Where does Lucky sleep?", options: ["In Hoa's bedroom", "In the garden", "In the living room", "In the kitchen"], answer: "C", explanation: "'Lucky sleeps in his small bed in the living room.'" },
      { question: "What time does Hoa wake up?", options: ["6:00", "6:30", "7:00", "7:30"], answer: "B", explanation: "'I wake up at 6:30.'" },
      { question: "Where do they walk in the evening?", options: ["Around the school", "In the garden", "Around the park", "On the street"], answer: "C", explanation: "'We walk around the park near my house.'" },
      { question: "What does Lucky do when Hoa does homework?", options: ["He barks loudly", "He plays with toys", "He sits quietly", "He eats food"], answer: "C", explanation: "'Lucky sits next to me... He is very quiet.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. A1 — Travel: At the Hotel
  // ═══════════════════════════════════════════════════════════
  {
    slug: "at-the-hotel",
    title: "At the Hotel",
    titleVi: "Ở khách sạn",
    level: "A1",
    category: "travel",
    passage: `At the Hotel

Last weekend, my family went to Da Nang. We stayed at the Sun Hotel for two nights. The hotel is near the beach.

We arrived at the hotel at 3:00 PM. My father talked to the receptionist. He said, "Hello, we have a reservation. The name is Nguyen Van Minh." The receptionist smiled and said, "Yes, room 405 on the fourth floor. Here is your key card."

Our room was very nice. It had two big beds, a TV, a small fridge, and a bathroom. From the window, we could see the sea. The view was beautiful!

The hotel had a swimming pool on the second floor. My sister and I went swimming after we put our bags in the room. The water was warm and clean. There were also chairs next to the pool, and my mother sat there and read a book.

For breakfast, the hotel had a buffet restaurant on the first floor. There was bread, eggs, fruit, juice, and coffee. I ate a lot of fruit. My father drank three cups of coffee!

We checked out on Sunday at 11:00 AM. My mother said to the receptionist, "Thank you. We had a wonderful stay." The receptionist said, "Thank you for staying with us. We hope to see you again!"

I want to go back to Da Nang soon.`,
    questions: [
      { question: "Where did the family go?", options: ["Ha Noi", "Ho Chi Minh City", "Da Nang", "Hue"], answer: "C", explanation: "'my family went to Da Nang.'" },
      { question: "How many nights did they stay?", options: ["One night", "Two nights", "Three nights", "Four nights"], answer: "B", explanation: "'We stayed at the Sun Hotel for two nights.'" },
      { question: "What floor was their room on?", options: ["First floor", "Second floor", "Third floor", "Fourth floor"], answer: "D", explanation: "'room 405 on the fourth floor.'" },
      { question: "What could they see from the window?", options: ["Mountains", "A garden", "The sea", "The city"], answer: "C", explanation: "'From the window, we could see the sea.'" },
      { question: "Where was the swimming pool?", options: ["First floor", "Second floor", "Third floor", "Outside"], answer: "B", explanation: "'a swimming pool on the second floor.'" },
      { question: "What did the mother do at the pool?", options: ["She went swimming", "She read a book", "She slept", "She took photos"], answer: "B", explanation: "'my mother sat there and read a book.'" },
      { question: "What time did they check out?", options: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"], answer: "C", explanation: "'We checked out on Sunday at 11:00 AM.'" },
      { question: "How many cups of coffee did the father drink?", options: ["One", "Two", "Three", "Four"], answer: "C", explanation: "'My father drank three cups of coffee!'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. A2 — Health: Going to the Doctor
  // ═══════════════════════════════════════════════════════════
  {
    slug: "going-to-the-doctor",
    title: "Going to the Doctor",
    titleVi: "Đi khám bác sĩ",
    level: "A2",
    category: "health",
    passage: `Going to the Doctor

Last Tuesday, I didn't feel well. I had a headache and a sore throat. My body temperature was 38.5°C. My mother said I had a fever, so she took me to the clinic.

We arrived at Dr. Tran's clinic at 9:00 AM. There were five people in the waiting room. We sat down and waited for about 20 minutes. A nurse called my name: "Nguyen Thanh Long, please come in."

Dr. Tran was very friendly. She asked me, "What's wrong? Where does it hurt?" I told her about my headache, sore throat, and fever. She used a stethoscope to listen to my chest. Then she checked my throat with a small light. She said, "Your throat is red. You have a cold. It is not serious, but you need to rest."

Dr. Tran gave me a prescription for three types of medicine: one for the fever, one for the sore throat, and one vitamin C tablet to take every day. She said, "Take the fever medicine three times a day, after meals. Drink lots of warm water and sleep at least eight hours every night. Don't eat ice cream or drink cold water for a few days."

My mother bought the medicine at the pharmacy next to the clinic. It cost 120,000 dong. I took the medicine and stayed home for two days. On Thursday, I felt much better. I went back to school on Friday.

Now I always wash my hands often and wear a jacket when it's cold. I don't want to get sick again!`,
    questions: [
      { question: "What symptoms did the writer have?", options: ["Stomachache and fever", "Headache, sore throat, and fever", "Cough and runny nose", "Backache and headache"], answer: "B", explanation: "'I had a headache and a sore throat... I had a fever.'" },
      { question: "What was the body temperature?", options: ["37.0°C", "37.5°C", "38.0°C", "38.5°C"], answer: "D", explanation: "'My body temperature was 38.5°C.'" },
      { question: "How long did they wait at the clinic?", options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"], answer: "C", explanation: "'We sat down and waited for about 20 minutes.'" },
      { question: "What did the doctor say was wrong?", options: ["The flu", "A cold", "An allergy", "Food poisoning"], answer: "B", explanation: "'You have a cold.'" },
      { question: "How many types of medicine were prescribed?", options: ["One", "Two", "Three", "Four"], answer: "C", explanation: "'a prescription for three types of medicine.'" },
      { question: "How often should the fever medicine be taken?", options: ["Once a day", "Twice a day", "Three times a day", "Four times a day"], answer: "C", explanation: "'Take the fever medicine three times a day.'" },
      { question: "How much did the medicine cost?", options: ["80,000 dong", "100,000 dong", "120,000 dong", "150,000 dong"], answer: "C", explanation: "'It cost 120,000 dong.'" },
      { question: "When did the writer go back to school?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: "C", explanation: "'I went back to school on Friday.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. A2 — Business: My First Job Interview
  // ═══════════════════════════════════════════════════════════
  {
    slug: "first-job-interview",
    title: "My First Job Interview",
    titleVi: "Buổi phỏng vấn đầu tiên",
    level: "A2",
    category: "business",
    passage: `My First Job Interview

My name is Linh. I am 22 years old. I graduated from university in June with a degree in marketing. Last month, I applied for a job at a company called BrightMedia. They make advertisements for other businesses.

Two weeks after I sent my CV, I received an email. It said: "We would like to invite you for an interview on October 5 at 2:00 PM. Please bring your ID card and a copy of your CV." I was so excited!

Before the interview, I prepared a lot. I read about BrightMedia on their website. I learned that the company was founded in 2018 and has 50 employees. I also practiced answering common interview questions with my friend. My mother helped me choose clothes — I wore a white shirt, black pants, and comfortable shoes.

On the day of the interview, I arrived 15 minutes early. The office was on the 8th floor of a tall building in District 1. A young woman at the front desk gave me a visitor badge and asked me to wait.

The interview lasted about 30 minutes. There were two interviewers: Mr. Hoang, the marketing manager, and Ms. Phuong from HR. They asked me about my studies, my skills, and why I wanted to work at BrightMedia. I felt nervous at first, but they were very kind, and I relaxed after a few minutes.

Mr. Hoang asked, "What is your biggest strength?" I said, "I am creative and I work well in a team." Ms. Phuong asked, "Can you start in November?" I said, "Yes, I can."

Three days later, I got an email: "Congratulations! We are happy to offer you the position of Junior Marketing Assistant." I was so happy! My starting salary is 10 million dong per month. I will start on November 3.`,
    questions: [
      { question: "What did Linh study at university?", options: ["Business", "Marketing", "Design", "English"], answer: "B", explanation: "'a degree in marketing.'" },
      { question: "When was BrightMedia founded?", options: ["2015", "2016", "2018", "2020"], answer: "C", explanation: "'the company was founded in 2018.'" },
      { question: "How many employees does BrightMedia have?", options: ["30", "40", "50", "60"], answer: "C", explanation: "'has 50 employees.'" },
      { question: "How long was the interview?", options: ["15 minutes", "20 minutes", "30 minutes", "45 minutes"], answer: "C", explanation: "'The interview lasted about 30 minutes.'" },
      { question: "What floor was the office on?", options: ["5th floor", "6th floor", "7th floor", "8th floor"], answer: "D", explanation: "'on the 8th floor of a tall building.'" },
      { question: "What did Linh say is her biggest strength?", options: ["She speaks English well", "She is creative and works well in a team", "She has work experience", "She knows many people"], answer: "B", explanation: "'I am creative and I work well in a team.'" },
      { question: "What is Linh's job title?", options: ["Marketing Manager", "Senior Designer", "Junior Marketing Assistant", "HR Coordinator"], answer: "C", explanation: "'the position of Junior Marketing Assistant.'" },
      { question: "What is Linh's starting salary?", options: ["8 million dong", "9 million dong", "10 million dong", "12 million dong"], answer: "C", explanation: "'My starting salary is 10 million dong per month.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. B1 — Animals: Endangered Species in Vietnam
  // ═══════════════════════════════════════════════════════════
  {
    slug: "endangered-species-vietnam",
    title: "Endangered Species in Vietnam",
    titleVi: "Các loài nguy cấp ở Việt Nam",
    level: "B1",
    category: "animals",
    passage: `Endangered Species in Vietnam

Vietnam is one of the most biodiverse countries in the world, home to thousands of species of plants and animals. However, many of these species are now endangered due to habitat loss, illegal hunting, and climate change. According to the Vietnam Red Data Book, over 900 species of animals and plants are currently at risk of extinction.

One of the most critically endangered animals in Vietnam is the Indochinese tiger. In the 1990s, there were an estimated 200 tigers in Vietnam's forests. Today, scientists believe fewer than 5 remain in the wild. The main threats to tigers are poaching — driven by demand for tiger bones and skins in traditional medicine — and the destruction of forests for agriculture and logging.

The Saola, sometimes called the "Asian unicorn," is another extremely rare animal found only in the Annamite Mountains of Vietnam and Laos. Discovered by scientists as recently as 1992, the Saola is so rare that no one knows exactly how many exist. Estimates range from a few dozen to perhaps a few hundred. The Saola has been seen only four times in the wild since its discovery.

Vietnam's rivers and coastal waters also face challenges. The Yangtze giant softshell turtle was once considered the rarest turtle in the world. As of 2024, only one confirmed individual was known to exist in Dong Mo Lake in Hanoi — and it passed away in 2016. Scientists hope that undiscovered individuals may exist in remote lakes.

Conservation efforts are growing. Vietnam has established 34 national parks and over 170 nature reserves. Organizations like WWF Vietnam and the Wildlife Conservation Society work with local communities to protect habitats and combat poaching. Education programs in schools teach young people about the importance of biodiversity.

Despite these efforts, the challenge remains enormous. Experts agree that stronger law enforcement, community involvement, and international cooperation are essential to save Vietnam's most vulnerable species before it is too late.`,
    questions: [
      { question: "How many species are at risk according to the Vietnam Red Data Book?", options: ["About 500", "Over 700", "Over 900", "About 1,200"], answer: "C", explanation: "'over 900 species of animals and plants are currently at risk.'" },
      { question: "How many Indochinese tigers are estimated to remain in the wild?", options: ["About 50", "About 20", "About 10", "Fewer than 5"], answer: "D", explanation: "'scientists believe fewer than 5 remain in the wild.'" },
      { question: "When was the Saola discovered?", options: ["1985", "1990", "1992", "1998"], answer: "C", explanation: "'Discovered by scientists as recently as 1992.'" },
      { question: "What is the Saola sometimes called?", options: ["The forest ghost", "The Asian unicorn", "The mountain deer", "The hidden ox"], answer: "B", explanation: "'sometimes called the Asian unicorn.'" },
      { question: "How many times has the Saola been seen in the wild?", options: ["Two", "Three", "Four", "Six"], answer: "C", explanation: "'only four times in the wild since its discovery.'" },
      { question: "How many national parks has Vietnam established?", options: ["24", "30", "34", "42"], answer: "C", explanation: "'Vietnam has established 34 national parks.'" },
      { question: "What is the main threat to tigers?", options: ["Disease and pollution", "Poaching and forest destruction", "Tourism and noise", "Climate change only"], answer: "B", explanation: "'The main threats to tigers are poaching... and the destruction of forests.'" },
      { question: "Where was the Yangtze giant softshell turtle found?", options: ["Hoan Kiem Lake", "Dong Mo Lake", "Ba Be Lake", "West Lake"], answer: "B", explanation: "'only one confirmed individual was known to exist in Dong Mo Lake in Hanoi.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. B1 — Culture: Street Food Around the World
  // ═══════════════════════════════════════════════════════════
  {
    slug: "street-food-around-the-world",
    title: "Street Food Around the World",
    titleVi: "Ẩm thực đường phố trên thế giới",
    level: "B1",
    category: "culture",
    passage: `Street Food Around the World

Street food is an important part of food culture in many countries. It is usually cheap, fast, and delicious. For millions of people, street food is not just a quick meal — it is a way of life and a proud tradition passed down through generations.

In Vietnam, street food is everywhere. Pho — a beef or chicken noodle soup — is perhaps the most famous Vietnamese dish in the world. A bowl of pho from a street vendor costs between 30,000 and 50,000 dong (about $1.20–$2.00). Banh mi, a Vietnamese baguette sandwich filled with meat, vegetables, and herbs, has become globally popular. In 2023, British magazine "Time Out" named Ho Chi Minh City the best city in the world for street food.

Thailand's street food scene is equally vibrant. Bangkok's Yaowarat Road (Chinatown) is famous for dishes like pad thai, mango sticky rice, and grilled seafood. In 2018, a Bangkok street food vendor named Jay Fai became the first street food chef in Thailand to receive a Michelin star for her legendary crab omelet, which costs about $30 — expensive by street food standards, but customers queue for hours.

Mexico is another street food paradise. Tacos are the king of Mexican street food — soft corn tortillas filled with various meats, onions, cilantro, and salsa. In Mexico City alone, there are an estimated 50,000 street food vendors. Elote, grilled corn on the cob covered in mayonnaise, chili, and cheese, is another popular street snack.

Japan's street food culture is most visible at matsuri (festivals) and yatai (food stalls). Popular items include takoyaki (octopus balls), yakitori (grilled chicken skewers), and okonomiyaki (savory pancakes). Unlike many countries, eating while walking is generally considered impolite in Japan — most people eat standing near the stall.

Street food faces challenges in modern cities. Governments sometimes try to remove street vendors for hygiene reasons or to "clean up" urban areas. However, many cities now recognize that street food is a cultural treasure and tourist attraction. Singapore, for instance, moved its street vendors into organized "hawker centres" — and in 2020, Singapore's hawker culture was inscribed on UNESCO's list of Intangible Cultural Heritage.`,
    questions: [
      { question: "How much does a bowl of pho cost from a street vendor?", options: ["10,000–20,000 dong", "20,000–40,000 dong", "30,000–50,000 dong", "50,000–80,000 dong"], answer: "C", explanation: "'costs between 30,000 and 50,000 dong.'" },
      { question: "Which city was named the best for street food in 2023?", options: ["Bangkok", "Ho Chi Minh City", "Mexico City", "Singapore"], answer: "B", explanation: "'Time Out named Ho Chi Minh City the best city in the world for street food.'" },
      { question: "What dish did Jay Fai receive a Michelin star for?", options: ["Pad thai", "Mango sticky rice", "Crab omelet", "Tom yum soup"], answer: "C", explanation: "'her legendary crab omelet.'" },
      { question: "How many street food vendors are in Mexico City?", options: ["About 20,000", "About 35,000", "About 50,000", "About 80,000"], answer: "C", explanation: "'an estimated 50,000 street food vendors.'" },
      { question: "What is considered impolite in Japan?", options: ["Eating with chopsticks", "Sharing food", "Eating while walking", "Ordering too much"], answer: "C", explanation: "'eating while walking is generally considered impolite in Japan.'" },
      { question: "What are takoyaki?", options: ["Chicken skewers", "Savory pancakes", "Rice balls", "Octopus balls"], answer: "D", explanation: "'takoyaki (octopus balls).'" },
      { question: "What did Singapore do with its street vendors?", options: ["Banned them", "Moved them into hawker centres", "Gave them Michelin stars", "Built food trucks"], answer: "B", explanation: "'moved its street vendors into organized hawker centres.'" },
      { question: "When was Singapore's hawker culture added to UNESCO's list?", options: ["2018", "2019", "2020", "2022"], answer: "C", explanation: "'in 2020, Singapore's hawker culture was inscribed on UNESCO's list.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 7. B2 — Travel: Sustainable Tourism
  // ═══════════════════════════════════════════════════════════
  {
    slug: "sustainable-tourism",
    title: "Sustainable Tourism",
    titleVi: "Du lịch bền vững",
    level: "B2",
    category: "travel",
    passage: `Sustainable Tourism: Traveling Without Leaving a Trace

The global tourism industry has rebounded dramatically since the pandemic, with international tourist arrivals reaching 1.3 billion in 2023, according to the United Nations World Tourism Organization (UNWTO). While tourism generates an estimated $1.7 trillion in export revenues and supports roughly 1 in 10 jobs worldwide, its environmental and social costs are increasingly impossible to ignore.

Tourism accounts for approximately 8% of global greenhouse gas emissions when transportation, accommodation, food, and shopping are combined. Aviation alone contributes about 2.5% of global CO₂ emissions, and tourism-related flights make up a significant portion of that figure. In popular destinations, overtourism has led to environmental degradation, strained infrastructure, overcrowded cultural sites, and rising housing costs for local residents. Venice, Barcelona, and Dubrovnik have all implemented measures to limit tourist numbers after years of complaints from residents.

Sustainable tourism — also referred to as responsible tourism or eco-tourism — seeks to minimize negative impacts while maximizing the benefits for local communities and ecosystems. The concept rests on three pillars: environmental sustainability (reducing carbon footprint, protecting biodiversity), social sustainability (respecting local cultures, ensuring fair wages for tourism workers), and economic sustainability (keeping tourism revenue within local economies rather than flowing to international hotel chains).

Several practical approaches are gaining traction. "Slow travel" encourages tourists to stay longer in fewer places, reducing the carbon cost per destination and allowing deeper cultural engagement. Community-based tourism (CBT) connects visitors directly with local communities — homestays in rural Vietnam, cooking classes with indigenous families in Peru, or guided nature walks led by tribal elders in Borneo. Studies show that CBT projects retain 60–95% of tourist spending within the local community, compared to just 10–20% for conventional package tours.

Technology is enabling more informed choices. Apps like "Green Travel Guide" and "FairTrip" help travelers find eco-certified accommodations and restaurants. Carbon offset programs, while imperfect, allow travelers to compensate for their flight emissions by funding renewable energy or reforestation projects. Some airlines now display the carbon footprint of each flight option during booking, nudging passengers toward more efficient routes and aircraft.

Vietnam has significant potential for sustainable tourism. The country's 34 national parks, extensive coastline, and rich cultural heritage offer abundant opportunities. In Sa Pa, community-based trekking programs run by Hmong and Dao communities have become a model for how tourism can support indigenous livelihoods while preserving traditional practices. However, challenges remain: rapid hotel construction along coastlines, plastic pollution on beaches, and the limited enforcement of environmental regulations continue to threaten Vietnam's natural assets.`,
    questions: [
      { question: "How many international tourist arrivals were recorded in 2023?", options: ["900 million", "1.1 billion", "1.3 billion", "1.5 billion"], answer: "C", explanation: "'international tourist arrivals reaching 1.3 billion in 2023.'" },
      { question: "What percentage of global emissions does tourism account for?", options: ["About 4%", "About 6%", "About 8%", "About 12%"], answer: "C", explanation: "'approximately 8% of global greenhouse gas emissions.'" },
      { question: "How much tourist spending do CBT projects retain locally?", options: ["20–40%", "40–60%", "60–95%", "Nearly 100%"], answer: "C", explanation: "'CBT projects retain 60–95% of tourist spending within the local community.'" },
      { question: "How much do conventional package tours retain locally?", options: ["5–10%", "10–20%", "30–40%", "50–60%"], answer: "B", explanation: "'just 10–20% for conventional package tours.'" },
      { question: "Which three cities are mentioned as having limited tourist numbers?", options: ["Paris, London, Rome", "Venice, Barcelona, Dubrovnik", "Amsterdam, Prague, Lisbon", "Athens, Florence, Bruges"], answer: "B", explanation: "'Venice, Barcelona, and Dubrovnik have all implemented measures to limit tourist numbers.'" },
      { question: "What are the three pillars of sustainable tourism?", options: ["Profit, people, planet", "Environmental, social, economic sustainability", "Education, innovation, regulation", "Conservation, tourism, development"], answer: "B", explanation: "The passage lists environmental, social, and economic sustainability." },
      { question: "What is 'slow travel'?", options: ["Traveling by train only", "Staying longer in fewer places", "Walking instead of driving", "Visiting only nearby countries"], answer: "B", explanation: "'Slow travel encourages tourists to stay longer in fewer places.'" },
      { question: "Which communities in Sa Pa run trekking programs?", options: ["Kinh and Tay", "Hmong and Dao", "Thai and Muong", "Nung and Khmer"], answer: "B", explanation: "'community-based trekking programs run by Hmong and Dao communities.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 8. B2 — Health: Mental Health in the Workplace
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mental-health-workplace",
    title: "Mental Health in the Workplace",
    titleVi: "Sức khỏe tâm thần tại nơi làm việc",
    level: "B2",
    category: "health",
    passage: `Mental Health in the Workplace

Mental health has emerged as one of the most pressing workplace issues of the 21st century. The World Health Organization (WHO) estimates that depression and anxiety cost the global economy approximately $1 trillion per year in lost productivity. In a 2023 Gallup survey, 44% of workers worldwide reported experiencing significant stress the previous day — the highest level ever recorded.

The relationship between work and mental health is bidirectional. Work can be protective: meaningful employment provides structure, purpose, social connections, and financial security — all of which support psychological well-being. However, toxic workplace conditions — excessive workload, lack of autonomy, bullying, job insecurity, and poor work-life balance — can trigger or worsen mental health conditions. A meta-analysis of 72 studies found that employees working more than 55 hours per week have a 33% higher risk of stroke and a 13% higher risk of coronary heart disease compared to those working 35–40 hours.

The stigma surrounding mental health remains a major barrier. Research from the Centre for Mental Health in London found that 58% of employees would not tell their manager if they were experiencing a mental health problem, fearing discrimination or career consequences. This silence means that problems often go unaddressed until they reach a crisis point — resulting in extended sick leave, turnover, or worse.

Progressive companies are responding with comprehensive approaches. Unilever introduced a global mental health framework that includes trained "Mental Health Champions" in every major office — employees who receive 40 hours of training to recognize signs of distress and guide colleagues to appropriate support. Google offers 12 free counseling sessions per year to all employees and their household members. Microsoft Japan experimented with a four-day work week in 2019, reporting a 40% increase in productivity.

In Vietnam, awareness of workplace mental health is growing but remains at an early stage. A 2022 survey by Anphabe found that 42% of Vietnamese office workers reported burnout symptoms, yet only 15% of companies surveyed had any formal mental health support program. The Vietnamese Labor Code was amended in 2019 to include provisions on preventing workplace stress, but enforcement has been limited.

Experts recommend that organizations start with simple, evidence-based interventions: regular one-on-one check-ins between managers and team members, flexible working arrangements, clear boundaries around after-hours communication, and easy access to confidential counseling. The return on investment is compelling — for every $1 invested in mental health treatment, the WHO estimates a return of $4 in improved health and productivity.`,
    questions: [
      { question: "How much do depression and anxiety cost the global economy annually?", options: ["$500 billion", "$750 billion", "$1 trillion", "$2 trillion"], answer: "C", explanation: "'approximately $1 trillion per year in lost productivity.'" },
      { question: "What percentage of workers reported significant stress in the Gallup survey?", options: ["32%", "38%", "44%", "51%"], answer: "C", explanation: "'44% of workers worldwide reported experiencing significant stress.'" },
      { question: "What is the increased risk of stroke for those working more than 55 hours/week?", options: ["13%", "23%", "33%", "43%"], answer: "C", explanation: "'33% higher risk of stroke.'" },
      { question: "What percentage of employees would not tell their manager about a mental health problem?", options: ["42%", "48%", "52%", "58%"], answer: "D", explanation: "'58% of employees would not tell their manager.'" },
      { question: "How many hours of training do Unilever's Mental Health Champions receive?", options: ["20 hours", "30 hours", "40 hours", "50 hours"], answer: "C", explanation: "'40 hours of training.'" },
      { question: "What was the result of Microsoft Japan's four-day work week?", options: ["10% productivity increase", "25% productivity increase", "40% productivity increase", "60% productivity increase"], answer: "C", explanation: "'reporting a 40% increase in productivity.'" },
      { question: "What percentage of Vietnamese companies had mental health programs?", options: ["10%", "15%", "20%", "25%"], answer: "B", explanation: "'only 15% of companies surveyed had any formal mental health support program.'" },
      { question: "What is the estimated ROI for mental health investment according to WHO?", options: ["$2 return per $1", "$3 return per $1", "$4 return per $1", "$5 return per $1"], answer: "C", explanation: "'for every $1 invested... a return of $4.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 9. C1 — Business: The Gig Economy
  // ═══════════════════════════════════════════════════════════
  {
    slug: "the-gig-economy",
    title: "The Gig Economy",
    titleVi: "Nền kinh tế việc làm tự do",
    level: "C1",
    category: "business",
    passage: `The Gig Economy: Freedom, Flexibility, and Fragility

A. The gig economy — a labor market characterized by short-term contracts, freelance work, and platform-mediated tasks rather than traditional permanent employment — has grown exponentially in the 21st century. McKinsey Global Institute estimates that up to 162 million people in the United States and Europe participate in some form of independent work, representing approximately 20–30% of the working-age population. The rise of digital platforms like Uber, Grab, DoorDash, Upwork, and Fiverr has made it easier than ever to match workers with tasks, creating a new category of employment that defies traditional definitions.

B. Proponents of the gig economy emphasize its benefits: flexibility, autonomy, and the democratization of opportunity. Workers can choose when, where, and how much they work. A graphic designer in Ho Chi Minh City can compete for the same projects as one in New York. A parent can drive for Grab during school hours and be home when their children return. A 2022 survey by Upwork found that 60% of freelancers said they would not return to traditional employment even if offered the same pay, citing flexibility and work-life balance as the primary reasons.

C. However, the gig economy's flexibility comes at a significant cost. Most gig workers are classified as "independent contractors" rather than employees, which means they are excluded from fundamental labor protections: minimum wage guarantees, health insurance, paid sick leave, retirement contributions, and unemployment benefits. In many countries, gig workers earn less than the minimum wage after accounting for expenses such as fuel, vehicle maintenance, and platform commissions. A study by the Economic Policy Institute found that after expenses, the median Uber driver in the US earned $9.21 per hour — below the federal minimum wage of $7.25 only in nominal terms, but far below living wage thresholds in most cities.

D. The legal classification of gig workers has become one of the most contentious labor disputes of the decade. In 2021, the UK Supreme Court ruled that Uber drivers are "workers" (an intermediate category in British law) entitled to minimum wage, holiday pay, and pension contributions — a landmark decision that forced Uber to reclassify over 70,000 drivers in the UK. California passed Assembly Bill 5 (AB5) in 2019, which established a strict test for classifying workers as independent contractors. However, Proposition 22, a ballot measure backed by $200 million from Uber, Lyft, and DoorDash, largely exempted ride-hailing and delivery drivers from AB5 — a vote that was later ruled unconstitutional by a state court, though appeals continue.

E. The gig economy in Southeast Asia presents its own complexities. In Vietnam, Grab has over 200,000 driver-partners and is one of the largest "employers" in the country — yet none of these drivers are legally classified as employees. Vietnamese labor law does not have a clear framework for platform workers, creating a regulatory gray zone. In Indonesia, GoTo (formerly Gojek) drivers organized large-scale protests in 2022 demanding minimum fare guarantees and better insurance coverage, leading to government-mandated minimum prices in several cities.

F. The future of work may lie not in choosing between traditional employment and the gig economy, but in creating hybrid models that combine the flexibility of independent work with the protections of employment. The European Union's Platform Workers Directive, adopted in 2024, establishes a legal presumption that platform workers are employees unless the platform can demonstrate genuine independence — effectively shifting the burden of proof. Such regulatory innovations, combined with portable benefits systems that follow workers across jobs rather than being tied to a single employer, could address the gig economy's most glaring inequities while preserving its genuine advantages.`,
    questions: [
      { question: "How many people participate in independent work in the US and Europe?", options: ["About 80 million", "About 120 million", "Up to 162 million", "About 200 million"], answer: "C", explanation: "'up to 162 million people.'" },
      { question: "What percentage of freelancers said they wouldn't return to traditional employment?", options: ["40%", "50%", "60%", "70%"], answer: "C", explanation: "'60% of freelancers said they would not return to traditional employment.'" },
      { question: "How much did the median Uber driver earn per hour after expenses?", options: ["$7.25", "$9.21", "$11.50", "$13.75"], answer: "B", explanation: "'the median Uber driver in the US earned $9.21 per hour.'" },
      { question: "How many Uber drivers were reclassified in the UK?", options: ["About 30,000", "About 50,000", "Over 70,000", "Over 100,000"], answer: "C", explanation: "'reclassify over 70,000 drivers in the UK.'" },
      { question: "How much money backed Proposition 22?", options: ["$50 million", "$100 million", "$150 million", "$200 million"], answer: "D", explanation: "'backed by $200 million from Uber, Lyft, and DoorDash.'" },
      { question: "How many driver-partners does Grab have in Vietnam?", options: ["About 100,000", "Over 150,000", "Over 200,000", "About 300,000"], answer: "C", explanation: "'Grab has over 200,000 driver-partners.'" },
      { question: "When was the EU Platform Workers Directive adopted?", options: ["2022", "2023", "2024", "2025"], answer: "C", explanation: "'adopted in 2024.'" },
      { question: "What did California's AB5 establish?", options: ["Minimum wage for gig workers", "A strict test for classifying independent contractors", "Free health insurance for drivers", "A platform tax"], answer: "B", explanation: "'established a strict test for classifying workers as independent contractors.'" },
      { question: "[Matching] Which paragraph discusses legal battles over worker classification?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses UK Supreme Court, AB5, and Proposition 22." },
      { question: "[Matching] Which paragraph covers Southeast Asia's gig economy?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses Vietnam (Grab) and Indonesia (GoTo/Gojek)." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 10. C1 — Culture: The Global Influence of K-Pop
  // ═══════════════════════════════════════════════════════════
  {
    slug: "kpop-global-influence",
    title: "The Global Influence of K-Pop",
    titleVi: "Ảnh hưởng toàn cầu của K-Pop",
    level: "C1",
    category: "culture",
    passage: `The Global Influence of K-Pop

A. In 2012, PSY's "Gangnam Style" became the first YouTube video to reach one billion views, introducing the world to K-pop — South Korean popular music — in a way that no previous act had achieved. Yet the phenomenon that followed would dwarf even that milestone. By 2023, BTS had sold out stadiums on every continent, BLACKPINK had headlined Coachella, and K-pop had generated an estimated $12.4 billion annually for the South Korean economy, according to the Korea Creative Content Agency (KOCCA).

B. K-pop's success is not accidental. It is the product of a meticulously engineered entertainment system. The major agencies — SM Entertainment, YG Entertainment, JYP Entertainment, and HYBE — recruit trainees as young as 11 or 12, who then undergo 3 to 7 years of intensive training in singing, dancing, foreign languages, and media skills before debuting. This "idol factory" model has been both praised for producing exceptionally polished performers and criticized for its grueling demands. Trainees typically practice 12 to 16 hours a day, and many never debut at all — debut rates at major agencies are estimated at 1 in 1,000.

C. The K-pop fan ecosystem is unlike anything in Western entertainment. Organized fan clubs — known as "fandoms" — engage in coordinated streaming campaigns to boost chart positions, crowdfund billboard advertisements in Times Square, and even donate to charitable causes in their idols' names. BTS's fandom, ARMY, raised over $1 million for Black Lives Matter in 2020, matching a donation by the group itself within 24 hours. Fan labor is deeply integrated into the industry's marketing strategy: agencies release content designed to be shared, analyzed, and discussed across social media platforms, creating a self-sustaining promotional engine.

D. K-pop has had a measurable impact on South Korea's cultural exports — a phenomenon known as "hallyu" or the Korean Wave. The Korea Foundation estimated in 2022 that there were approximately 178.8 million hallyu fans in 116 countries. K-pop's popularity has driven demand for Korean language classes (enrollment at the King Sejong Institute, South Korea's global language education network, grew from 57,000 students in 2017 to over 250,000 in 2023), Korean cosmetics and fashion (the K-beauty industry was valued at $13.9 billion in 2023), and Korean tourism (before the pandemic, an estimated 7.5% of foreign tourists cited K-pop as a primary reason for visiting).

E. However, K-pop is not without controversy. Mental health concerns within the industry have received growing attention following the deaths of several prominent idols. Sulli and Goo Hara, both former members of major groups, died by suicide in 2019, prompting a national conversation about the pressures of idol life, cyberbullying, and the inadequacy of mental health support in the entertainment industry. South Korea's National Assembly subsequently passed amendments requiring agencies to provide psychological counseling and limit work hours for underage trainees.

F. K-pop's influence extends beyond music into geopolitics and soft power. The South Korean government has explicitly incorporated K-pop into its diplomatic and nation-branding strategies. President Yoon Suk-yeol appointed BTS as special presidential envoys to the United Nations in 2021, where they addressed the General Assembly and performed a video message that was viewed over 10 million times. Scholars argue that K-pop has given South Korea cultural influence far disproportionate to its geographic size and population of 52 million, fundamentally reshaping how the world perceives the country.`,
    questions: [
      { question: "When did 'Gangnam Style' reach one billion YouTube views?", options: ["2010", "2011", "2012", "2013"], answer: "C", explanation: "'In 2012, PSY's Gangnam Style became the first YouTube video to reach one billion views.'" },
      { question: "How much does K-pop generate annually for South Korea's economy?", options: ["$5.2 billion", "$8.7 billion", "$10.1 billion", "$12.4 billion"], answer: "D", explanation: "'an estimated $12.4 billion annually.'" },
      { question: "What is the estimated debut rate at major K-pop agencies?", options: ["1 in 100", "1 in 500", "1 in 1,000", "1 in 5,000"], answer: "C", explanation: "'debut rates at major agencies are estimated at 1 in 1,000.'" },
      { question: "How much did ARMY raise for Black Lives Matter?", options: ["$500,000", "$750,000", "$1 million", "$2 million"], answer: "C", explanation: "'ARMY raised over $1 million for Black Lives Matter.'" },
      { question: "How many hallyu fans were estimated worldwide in 2022?", options: ["About 100 million", "About 130 million", "About 178.8 million", "About 250 million"], answer: "C", explanation: "'approximately 178.8 million hallyu fans in 116 countries.'" },
      { question: "How many students were at the King Sejong Institute in 2023?", options: ["Over 100,000", "Over 150,000", "Over 200,000", "Over 250,000"], answer: "D", explanation: "'grew from 57,000 students in 2017 to over 250,000 in 2023.'" },
      { question: "What is South Korea's population?", options: ["38 million", "45 million", "52 million", "60 million"], answer: "C", explanation: "'geographic size and population of 52 million.'" },
      { question: "[Matching] Which paragraph discusses mental health issues in the K-pop industry?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses idol deaths, cyberbullying, and mental health legislation." },
      { question: "[Matching] Which paragraph explains the K-pop training system?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes the trainee system, agencies, and debut rates." },
      { question: "How was K-pop's value to the K-beauty industry described?", options: ["$5.4 billion", "$9.2 billion", "$13.9 billion", "$18.5 billion"], answer: "C", explanation: "'the K-beauty industry was valued at $13.9 billion in 2023.'" },
    ],
  },
];

async function main() {
  console.log("Seeding general reading passages (batch 5)...\n");

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
