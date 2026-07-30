import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-general-test-4";

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: Joining a Public Library (~500 words, A2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt4-public-library",
    title: "Joining a Public Library",
    titleVi: "Đăng ký thư viện công cộng",
    level: "A2",
    category: "mock-general",
    passage: `Joining a Public Library

Welcome to Greenfield Public Library

Greenfield Public Library serves all residents of Greenfield and surrounding communities. Membership is free for all residents aged 5 and above. To join, simply visit any of our three branches with a valid photo ID and proof of address (such as a utility bill or bank statement dated within the last three months).

Library Card Benefits
Your library card gives you access to:
• Borrowing up to 15 books, 5 DVDs, and 3 audiobooks at a time
• Free internet and Wi-Fi access at all branches
• Free use of computers (limited to 2 hours per session, booking recommended)
• Access to online databases, e-books, and digital magazines from home
• Discounted entry to partner museums and cultural events

Borrowing Rules
Books and audiobooks may be borrowed for 21 days. DVDs may be borrowed for 7 days. You may renew items up to two times unless another member has placed a hold on the item. Renewals can be done online, by phone, or in person.

Late fees apply at the following rates:
• Books and audiobooks: £0.20 per day, maximum £5.00 per item
• DVDs: £1.00 per day, maximum £10.00 per item
• Lost or damaged items must be paid for at replacement cost

Opening Hours
Main Branch (12 Market Street): Monday–Friday 9:00–20:00, Saturday 9:00–17:00, Sunday 11:00–16:00
East Branch (45 Oak Lane): Monday–Friday 10:00–18:00, Saturday 10:00–14:00, closed Sunday
West Branch (8 River Road): Monday, Wednesday, Friday 10:00–17:00, closed other days

Children's Services
The children's section offers weekly story time sessions every Tuesday at 10:30 (ages 2–5) and Thursday at 15:30 (ages 5–8). During school holidays, we run a free reading challenge programme where children can earn prizes by reading at least 6 books over the holiday period. Parents must supervise children under 8 at all times.

Special Services
We offer a home delivery service for members who are unable to visit the library due to disability, illness, or caring responsibilities. Contact us at homedelivery@greenfieldlibrary.org or call 01onal 555-2847 to arrange this service. Large print books, audiobooks, and books in community languages (Polish, Urdu, Mandarin, and Somali) are available at the Main Branch.

Volunteering
We are always looking for volunteers to help with shelving, reading sessions, IT support, and event organisation. Volunteers must be aged 16 or over and commit to at least 4 hours per month. Training is provided. Apply online at www.greenfieldlibrary.org/volunteer.`,
    questions: [
      { question: "What is the minimum age to join the library?", options: ["3 years", "5 years", "7 years", "No minimum age"], answer: "B", explanation: "'Membership is free for all residents aged 5 and above.'" },
      { question: "What documents do you need to join?", options: ["Photo ID only", "Photo ID and proof of address", "Birth certificate and photo ID", "Passport only"], answer: "B", explanation: "'a valid photo ID and proof of address.'" },
      { question: "How many books can you borrow at one time?", options: ["10", "12", "15", "20"], answer: "C", explanation: "'Borrowing up to 15 books.'" },
      { question: "How long can you borrow DVDs for?", options: ["3 days", "5 days", "7 days", "14 days"], answer: "C", explanation: "'DVDs may be borrowed for 7 days.'" },
      { question: "How many times can you renew items?", options: ["Once", "Twice", "Three times", "Unlimited"], answer: "B", explanation: "'You may renew items up to two times.'" },
      { question: "What is the late fee for books per day?", options: ["£0.10", "£0.20", "£0.50", "£1.00"], answer: "B", explanation: "'Books and audiobooks: £0.20 per day.'" },
      { question: "What time does the Main Branch open on Sundays?", options: ["9:00", "10:00", "11:00", "Closed"], answer: "C", explanation: "'Sunday 11:00–16:00.'" },
      { question: "Which branch is open only three days a week?", options: ["Main Branch", "East Branch", "West Branch", "All branches"], answer: "C", explanation: "'West Branch: Monday, Wednesday, Friday 10:00–17:00, closed other days.'" },
      { question: "What age group is the Tuesday story time for?", options: ["Ages 0–2", "Ages 2–5", "Ages 5–8", "Ages 8–12"], answer: "B", explanation: "'every Tuesday at 10:30 (ages 2–5).'" },
      { question: "How many books must children read for the holiday reading challenge?", options: ["At least 4", "At least 5", "At least 6", "At least 8"], answer: "C", explanation: "'reading at least 6 books over the holiday period.'" },
      { question: "Children under what age must be supervised?", options: ["Under 5", "Under 6", "Under 8", "Under 10"], answer: "C", explanation: "'Parents must supervise children under 8 at all times.'" },
      { question: "What is the minimum age for volunteers?", options: ["14", "15", "16", "18"], answer: "C", explanation: "'Volunteers must be aged 16 or over.'" },
      { question: "How many hours per month must volunteers commit to?", options: ["At least 2 hours", "At least 4 hours", "At least 6 hours", "At least 8 hours"], answer: "B", explanation: "'commit to at least 4 hours per month.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Moving to a New City (~700 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt4-moving-new-city",
    title: "Moving to a New City: A Practical Guide",
    titleVi: "Chuyển đến thành phố mới: Hướng dẫn thực tế",
    level: "B1",
    category: "mock-general",
    passage: `Moving to a New City: A Practical Guide

Moving to a new city can be both exciting and overwhelming. Whether you are relocating for work, study, or personal reasons, careful planning can make the transition much smoother. This guide covers the essential steps to help you settle into your new home.

Before the Move

Start planning at least two months before your moving date. Create a detailed checklist of tasks and set deadlines for each. Research your new city thoroughly — learn about neighbourhoods, public transport, healthcare facilities, and local amenities. If possible, visit the city before moving to explore potential areas to live.

Accommodation is usually the most important decision. Set a realistic budget that includes rent, utilities, council tax (in the UK), and internet. As a general rule, housing costs should not exceed 30% of your gross monthly income. Consider the trade-offs between living centrally (higher rent but lower transport costs and more convenience) and living further out (lower rent but longer commutes). Websites like Rightmove, Zoopla, and SpareRoom are useful for finding rental properties in the UK.

Administrative Tasks

Notify important parties of your change of address at least two weeks before moving. This includes your bank, employer, insurance providers, GP surgery, and the electoral register. Set up mail forwarding with Royal Mail (from £35.99 for three months) to ensure important letters reach you.

Register with a new GP as soon as possible after arriving. In the UK, you can find your nearest GP practice on the NHS website. You do not need proof of address or immigration status to register. If you take regular medication, arrange a prescription transfer with your current pharmacy before moving.

Transport

Research public transport options in your new city. Most cities offer weekly or monthly travel passes that provide significant savings over individual tickets. In London, an Oyster card or contactless payment is essential — a weekly Zone 1–2 Travelcard costs £40.70. Consider whether you need a car: in many cities, the combination of public transport, cycling, and occasional car hire is cheaper and less stressful than car ownership.

Building a Social Network

Making friends in a new city can be challenging, especially for adults. Research consistently shows that social isolation is a significant risk factor for poor mental health. Proactive strategies include joining local clubs or sports teams, attending meetup events (www.meetup.com), volunteering with local charities, and taking evening classes. Many cities have "newcomer" groups specifically designed for people who have recently moved. Workplace relationships are also valuable — say yes to social invitations, even if you feel tired or shy.

Finances

Moving is expensive. A typical move within the UK costs between £500 and £2,000 for a professional removal service, depending on the volume of belongings and distance. Budget for an emergency fund covering at least three months of essential expenses. Hidden costs to anticipate include deposits (typically 5 weeks' rent), utility connection fees, new furniture, and council tax payments.

Managing Homesickness

Feeling homesick is normal and usually fades within three to six months. Maintain regular contact with friends and family through video calls, but avoid spending so much time looking back that you fail to engage with your new surroundings. Establish routines — regular exercise, a favourite coffee shop, a weekly market visit — as familiar patterns provide comfort and a sense of belonging. If feelings of sadness persist beyond six months or significantly affect your daily life, consider speaking to a mental health professional.`,
    questions: [
      { question: "How early should you start planning before a move?", options: ["Two weeks", "One month", "Two months", "Three months"], answer: "C", explanation: "'Start planning at least two months before your moving date.'" },
      { question: "What percentage of income should housing costs not exceed?", options: ["20%", "25%", "30%", "35%"], answer: "C", explanation: "'housing costs should not exceed 30% of your gross monthly income.'" },
      { question: "How much does Royal Mail forwarding cost for three months?", options: ["£25.99", "£30.99", "£35.99", "£40.99"], answer: "C", explanation: "'from £35.99 for three months.'" },
      { question: "What do you NOT need to register with a GP in the UK?", options: ["An appointment", "Proof of address", "A referral letter", "Both B and C"], answer: "B", explanation: "'You do not need proof of address or immigration status to register.'" },
      { question: "How much does a weekly Zone 1–2 Travelcard cost in London?", options: ["£30.70", "£35.70", "£40.70", "£45.70"], answer: "C", explanation: "'a weekly Zone 1–2 Travelcard costs £40.70.'" },
      { question: "[True / False / Not Given] Social isolation increases risk of poor mental health.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'social isolation is a significant risk factor for poor mental health.' True." },
      { question: "[True / False / Not Given] Meetup.com charges a membership fee.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions meetup events but not whether there is a fee. Not Given." },
      { question: "[True / False / Not Given] A typical UK move costs between £500 and £2,000.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'costs between £500 and £2,000 for a professional removal service.' True." },
      { question: "How many months' expenses should an emergency fund cover?", options: ["One month", "Two months", "Three months", "Six months"], answer: "C", explanation: "'covering at least three months of essential expenses.'" },
      { question: "How much is a typical rental deposit?", options: ["3 weeks' rent", "4 weeks' rent", "5 weeks' rent", "6 weeks' rent"], answer: "C", explanation: "'deposits (typically 5 weeks' rent).'" },
      { question: "How long does homesickness usually last?", options: ["One to two months", "Two to three months", "Three to six months", "Six to twelve months"], answer: "C", explanation: "'usually fades within three to six months.'" },
      { question: "When should someone seek professional help for homesickness?", options: ["After one month", "After three months", "After six months", "After one year"], answer: "C", explanation: "'If feelings of sadness persist beyond six months.'" },
      { question: "What is recommended as a way to build comfort in a new city?", options: ["Staying home to rest", "Calling old friends daily", "Establishing routines", "Moving back temporarily"], answer: "C", explanation: "'Establish routines — regular exercise, a favourite coffee shop, a weekly market visit.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Future of Remote Work (~850 words, B2, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt4-remote-work",
    title: "The Future of Remote Work",
    titleVi: "Tương lai của làm việc từ xa",
    level: "B2",
    category: "mock-general",
    passage: `The Future of Remote Work

The COVID-19 pandemic triggered the largest workplace experiment in history. Almost overnight, millions of workers around the world switched from office-based routines to working from home. What began as an emergency measure has evolved into a permanent transformation of how and where people work, with profound implications for employees, employers, urban planning, and the global economy.

Before the pandemic, only about 5% of full-time employees in developed countries worked remotely. By April 2020, this figure had surged to approximately 60% in the United States and similar levels across Europe and Australia. As restrictions eased, many companies adopted hybrid models — combining some days in the office with some days working from home. By 2024, surveys by Gallup and McKinsey indicated that approximately 28% of full-time workers were fully remote and 53% were hybrid, meaning only about 19% worked entirely on-site — a dramatic shift from pre-pandemic norms.

The benefits of remote work are well documented. Employees consistently report improved work-life balance, elimination of commuting time (the average American commute was 55 minutes per day round-trip before the pandemic), and greater flexibility to manage personal responsibilities. Studies by Stanford economist Nicholas Bloom found that remote workers were 13% more productive than their office-based counterparts, largely due to fewer distractions, fewer sick days, and a quieter work environment. Remote work has also expanded access to employment for people with disabilities, carers, and those living in regions with limited job opportunities.

For employers, the financial advantages are significant. Global Workplace Analytics estimates that a company can save approximately $11,000 per year for each employee who works remotely half of the time, through reduced office space, lower utility costs, and decreased turnover. Major tech companies, including Spotify, Airbnb, and Atlassian, have adopted permanent "work from anywhere" policies, while others like Amazon and JPMorgan have mandated full-time return to the office, reflecting deep disagreements about the optimal approach.

However, remote work presents genuine challenges. Social isolation is the most frequently cited concern, with 25% of remote workers in a Buffer survey identifying loneliness as their biggest struggle. The absence of casual office interactions — the "water cooler effect" — can reduce knowledge sharing, weaken team cohesion, and make it harder for new employees to absorb organisational culture. Research from Microsoft's analysis of its own workforce found that remote work reduced cross-team collaboration by approximately 25% and increased the tendency to form communication silos.

Career progression is another concern. The "proximity bias" — the tendency for managers to favour employees they see in person — can disadvantage remote workers when it comes to promotions, challenging assignments, and mentoring opportunities. A study published in the MIT Sloan Management Review found that remote workers received 38% fewer promotions than their in-office counterparts, even when performance ratings were equivalent. Women and minority employees, who disproportionately prefer remote work arrangements, may be particularly affected by this bias.

The shift to remote work has had significant urban consequences. City centres that relied heavily on office worker foot traffic have seen reduced demand for commercial real estate, with office vacancy rates reaching historic highs — 19.6% in the United States and over 10% in London by late 2023. Conversely, smaller cities and suburban areas have experienced population growth as workers freed from daily commutes choose to live where housing is more affordable. This "doughnut effect" has redistributed economic activity from urban cores to suburban rings, benefiting some communities while challenging others.

The technology infrastructure supporting remote work continues to evolve. Video conferencing platforms like Zoom and Microsoft Teams have become essential tools, with Zoom reporting 300 million daily meeting participants at its pandemic peak. Emerging technologies including virtual reality workspaces, AI-powered scheduling tools, and digital whiteboarding platforms are designed to replicate the spontaneity and creativity of in-person collaboration. However, "Zoom fatigue" — the mental exhaustion caused by excessive video calls — has led many organisations to introduce meeting-free days and asynchronous communication practices.

Looking ahead, most experts predict that hybrid work will become the dominant model for knowledge workers. The key challenge for organisations is designing hybrid systems that capture the benefits of both remote flexibility and in-person collaboration while avoiding the pitfalls of each. Companies that get this balance right will likely enjoy significant advantages in attracting and retaining talent in an increasingly competitive global labour market.`,
    questions: [
      { question: "What percentage of workers were fully remote before the pandemic?", options: ["About 2%", "About 5%", "About 10%", "About 15%"], answer: "B", explanation: "'only about 5% of full-time employees... worked remotely.'" },
      { question: "By 2024, what percentage worked entirely on-site?", options: ["About 12%", "About 19%", "About 25%", "About 32%"], answer: "B", explanation: "'only about 19% worked entirely on-site.'" },
      { question: "What was the average American round-trip commute before the pandemic?", options: ["35 minutes", "45 minutes", "55 minutes", "65 minutes"], answer: "C", explanation: "'the average American commute was 55 minutes per day round-trip.'" },
      { question: "How much more productive were remote workers in Stanford's study?", options: ["8%", "10%", "13%", "18%"], answer: "C", explanation: "'remote workers were 13% more productive.'" },
      { question: "How much can a company save per half-time remote employee annually?", options: ["$7,000", "$ 9,000", "$11,000", "$15,000"], answer: "C", explanation: "'approximately $11,000 per year for each employee who works remotely half of the time.'" },
      { question: "What percentage of remote workers identified loneliness as their biggest struggle?", options: ["15%", "20%", "25%", "30%"], answer: "C", explanation: "'25% of remote workers... identifying loneliness as their biggest struggle.'" },
      { question: "By how much did remote work reduce cross-team collaboration at Microsoft?", options: ["About 15%", "About 20%", "About 25%", "About 30%"], answer: "C", explanation: "'reduced cross-team collaboration by approximately 25%.'" },
      { question: "Remote workers received how many fewer promotions?", options: ["28% fewer", "33% fewer", "38% fewer", "43% fewer"], answer: "C", explanation: "'remote workers received 38% fewer promotions.'" },
      { question: "[True / False / Not Given] Spotify adopted a permanent work-from-anywhere policy.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'Major tech companies, including Spotify, Airbnb, and Atlassian, have adopted permanent \"work from anywhere\" policies.' True." },
      { question: "[True / False / Not Given] Amazon allows fully remote work for all employees.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Amazon and JPMorgan have mandated full-time return to the office.' False." },
      { question: "[True / False / Not Given] Zoom had 500 million daily meeting participants at peak.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'300 million daily meeting participants at its pandemic peak.' 300 million, not 500 million. False." },
      { question: "What was the US office vacancy rate by late 2023?", options: ["12.6%", "15.6%", "19.6%", "23.6%"], answer: "C", explanation: "'office vacancy rates reaching... 19.6% in the United States.'" },
      { question: "What is the 'doughnut effect'?", options: ["Increased demand for food delivery", "Redistribution of activity from urban cores to suburban rings", "Higher rents in city centres", "A decline in suburban population"], answer: "B", explanation: "'This \"doughnut effect\" has redistributed economic activity from urban cores to suburban rings.'" },
      { question: "What is 'proximity bias'?", options: ["Preferring to work near one's home", "Managers favouring employees they see in person", "Choosing offices with better facilities", "Workers preferring shorter commutes"], answer: "B", explanation: "'the tendency for managers to favour employees they see in person.'" },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 910 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 910 + passages.indexOf(p) },
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
    update: { title: "IELTS General Training — Mock Test 4", titleVi: "IELTS General Training — Đề 4", type: "general", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training — Mock Test 4", titleVi: "IELTS General Training — Đề 4", type: "general", timeMinutes: 60, order: 7 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
