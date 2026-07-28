import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // SECTION 1: Everyday Notices (~650 words, A2, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt2-section1",
    title: "GT Mock 2 — Section 1: Everyday Notices",
    titleVi: "GT Đề 2 — Phần 1: Thông báo hàng ngày",
    level: "A2",
    category: "mock-general",
    passage: `— TEXT 1: APARTMENT RENTAL ADVERTISEMENT —

SUNNY 2-BEDROOM APARTMENT FOR RENT
Location: 45 Nguyen Hue Street, District 1, Ho Chi Minh City
Rent: $650/month (includes water; electricity and internet separate)
Deposit: 2 months' rent ($1,300)
Minimum lease: 12 months
Available: August 1, 2026

Features:
• 75 sqm, 2 bedrooms, 1 bathroom, open-plan kitchen and living area
• Fully furnished: beds, wardrobe, sofa, dining table, washing machine, air conditioning in both bedrooms
• 8th floor with elevator, city view, 24-hour security
• Rooftop pool and gym available to all residents (no extra charge)
• Parking: motorbike $20/month, car $80/month

Pets: Small dogs and cats allowed (under 10 kg, additional $50/month pet fee)
No smoking inside the apartment.

Contact: Mrs. Lan — 0909-123-456 or email: lan.nguyen@realestate.vn
Viewings: Monday–Saturday, 9 AM–6 PM (by appointment only)

— TEXT 2: LANGUAGE SCHOOL ADVERTISEMENT —

GLOBAL ENGLISH CENTRE — NEW TERM STARTS SEPTEMBER 1!

Courses available:
• General English (Beginner to Advanced): Mon/Wed/Fri, 6:00–8:00 PM — $120/month
• IELTS Preparation (Target 6.0–7.5): Tue/Thu/Sat, 9:00–11:30 AM — $180/month
• Business English: Tue/Thu, 6:30–8:30 PM — $150/month
• Kids English (ages 6–12): Sat/Sun, 8:00–10:00 AM — $100/month

All courses: Maximum 15 students per class. Native English-speaking teachers.
Free placement test — book online at www.globalenglish.vn or call 028-3822-5555.

Special offer: Register before August 15 and get 10% off your first month!
Refer a friend: Both you and your friend receive a $20 tuition credit.

Location: 3rd Floor, Vincom Centre, 72 Le Thanh Ton Street, District 1
Free parking for motorbikes. Wi-Fi available in all classrooms.

— TEXT 3: COMMUNITY NOTICE —

NOTICE: WATER SUPPLY INTERRUPTION

Dear residents of Sunrise Apartment Complex,

Due to essential maintenance work on the building's water supply system, there will be a temporary water shut-off on Saturday, August 9, 2026, from 8:00 AM to 4:00 PM (approximately 8 hours).

Please prepare by:
• Storing water in advance for drinking, cooking, and personal use
• Completing any laundry before 8:00 AM on Saturday
• Reporting any existing water leaks to the management office before August 7

Emergency water supply: Two water tanks will be placed in the ground-floor lobby for essential use during the shut-off period.

We apologize for the inconvenience. If the work finishes early, water will be restored ahead of schedule.

For questions: Building Management Office, Room 101 (Mon–Fri 8 AM–5 PM) or call 028-3900-1234.`,
    questions: [
      { question: "How much is the monthly rent for the apartment?", options: ["$550", "$600", "$650", "$700"], answer: "C", explanation: "'Rent: $650/month.'" },
      { question: "What is included in the rent?", options: ["Water only", "Electricity only", "Water and internet", "Water and electricity"], answer: "A", explanation: "'includes water; electricity and internet separate.'" },
      { question: "How much is the pet fee per month?", options: ["$20", "$ 30", "$50", "$80"], answer: "C", explanation: "'additional $50/month pet fee.'" },
      { question: "What is the maximum pet weight allowed?", options: ["5 kg", "8 kg", "10 kg", "15 kg"], answer: "C", explanation: "'under 10 kg.'" },
      { question: "How much does the IELTS Preparation course cost?", options: ["$100/month", "$120/month", "$150/month", "$180/month"], answer: "D", explanation: "'IELTS Preparation: $180/month.'" },
      { question: "What discount do early registrants receive?", options: ["5%", "10%", "15%", "20%"], answer: "B", explanation: "'Register before August 15 and get 10% off.'" },
      { question: "How many students per class maximum?", options: ["10", "12", "15", "20"], answer: "C", explanation: "'Maximum 15 students per class.'" },
      { question: "When is the water shut-off scheduled?", options: ["August 7", "August 8", "August 9", "August 10"], answer: "C", explanation: "'Saturday, August 9, 2026.'" },
      { question: "How long will the water be off?", options: ["4 hours", "6 hours", "8 hours", "10 hours"], answer: "C", explanation: "'approximately 8 hours.'" },
      { question: "[True / False / Not Given] The apartment has air conditioning in the living room.", options: ["True", "False", "Not Given"], answer: "C", explanation: "'air conditioning in both bedrooms' — the living room is not mentioned. Not Given." },
      { question: "[True / False / Not Given] Smoking is allowed on the apartment balcony.", options: ["True", "False", "Not Given"], answer: "C", explanation: "'No smoking inside the apartment' — the balcony is not mentioned. Not Given." },
      { question: "[True / False / Not Given] The language school has free parking for cars.", options: ["True", "False", "Not Given"], answer: "C", explanation: "'Free parking for motorbikes.' Cars are not mentioned. Not Given." },
      { question: "[True / False / Not Given] The referral program gives $20 to both people.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'Both you and your friend receive a $20 tuition credit.' True." },
      { question: "Where will emergency water tanks be placed?", options: ["On the rooftop", "In the parking lot", "In the ground-floor lobby", "Outside the building"], answer: "C", explanation: "'Two water tanks will be placed in the ground-floor lobby.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 2: Workplace Documents (~700 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt2-section2",
    title: "GT Mock 2 — Section 2: Workplace Documents",
    titleVi: "GT Đề 2 — Phần 2: Tài liệu công việc",
    level: "B1",
    category: "mock-general",
    passage: `— TEXT 1: NEW EMPLOYEE ONBOARDING CHECKLIST —

TECHVISION INC. — NEW EMPLOYEE ONBOARDING GUIDE

Welcome to TechVision! To ensure a smooth start, please complete the following within your first week:

DAY 1:
□ Report to HR (Room 302, 3rd floor) by 8:30 AM with your ID and signed contract
□ Collect your employee badge, laptop, and welcome kit from IT (Room 105)
□ Complete mandatory online training modules: "Workplace Safety" (30 min) and "Data Security" (45 min)
□ Set up your company email and Slack account (instructions in welcome kit)

DAYS 2–3:
□ Meet your department manager for team introduction and first assignment
□ Complete HR paperwork: tax forms, bank details for salary deposit, emergency contact form
□ Attend "Company Culture & Values" session (Wed 2:00 PM, Meeting Room A)
□ Choose your health insurance plan (3 options — details on HR portal, deadline: Day 5)

DAYS 4–5:
□ Complete remaining online training: "Anti-Harassment Policy" (20 min), "Customer Data Privacy" (30 min)
□ Submit health insurance selection to HR
□ Schedule your 30-day check-in meeting with your manager

IMPORTANT POLICIES:
• Working hours: 8:30 AM – 5:30 PM (Mon–Fri), 1-hour lunch break (12:00–1:00 PM)
• Dress code: Smart casual (no flip-flops, no shorts)
• Work from home: Available after 3-month probation period, maximum 2 days/week
• Overtime: Must be pre-approved by manager; compensated at 1.5× hourly rate

— TEXT 2: COMPANY TRAVEL POLICY —

TECHVISION INC. — BUSINESS TRAVEL POLICY (Effective January 1, 2026)

1. AUTHORIZATION
All business travel must be approved by your department manager at least 5 working days in advance. International travel requires additional approval from the VP level.

2. TRANSPORTATION
• Domestic flights: Economy class only. Book through the company travel portal for corporate rates.
• International flights: Economy class for flights under 6 hours; business class permitted for flights of 6 hours or more.
• Ground transport: Use company-approved taxi apps (Grab for Asia, Uber for other regions). Personal vehicle mileage: reimbursed at $0.25/km.

3. ACCOMMODATION
• Maximum nightly rate: $120 (domestic), $200 (international — varies by city, see Appendix A)
• Hotel booking must be made through the travel portal. Airbnb is not permitted.

4. MEALS
Daily meal allowance (no receipts required for amounts within limits):
• Domestic: $40/day
• International: $60/day
• Client entertainment meals: Up to $100/person, receipt and client name required

5. EXPENSE REPORTING
Submit expense reports within 10 working days of return. Late submissions (beyond 30 days) will not be reimbursed. All receipts must be attached (photo or scan accepted). Reimbursement is processed within 15 working days of approved submission.

6. NON-REIMBURSABLE EXPENSES
Mini-bar charges, laundry (trips under 3 nights), personal entertainment, flight upgrades (unless pre-approved), and travel insurance (company provides coverage).`,
    questions: [
      { question: "What time should new employees report to HR on Day 1?", options: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM"], answer: "B", explanation: "'Report to HR by 8:30 AM.'" },
      { question: "Where can employees collect their laptop?", options: ["Room 105", "Room 201", "Room 302", "Room 405"], answer: "A", explanation: "'IT (Room 105).'" },
      { question: "How long is the Data Security training module?", options: ["20 min", "30 min", "45 min", "60 min"], answer: "C", explanation: "'Data Security (45 min).'" },
      { question: "When can employees work from home?", options: ["Immediately", "After 1 month", "After 3 months", "After 6 months"], answer: "C", explanation: "'Available after 3-month probation period.'" },
      { question: "What is the overtime pay rate?", options: ["1.0× hourly rate", "1.25× hourly rate", "1.5× hourly rate", "2.0× hourly rate"], answer: "C", explanation: "'compensated at 1.5× hourly rate.'" },
      { question: "[Matching] What class is permitted for international flights over 6 hours?", options: ["Economy only", "Premium economy", "Business class", "First class"], answer: "C", explanation: "'business class permitted for flights of 6 hours or more.'" },
      { question: "How much is the international daily meal allowance?", options: ["$40", "$50", "$ 60", "$80"], answer: "C", explanation: "'International: $60/day.'" },
      { question: "What is the maximum nightly hotel rate for domestic travel?", options: ["$80", "$100", "$120", "$150"], answer: "C", explanation: "'Maximum nightly rate: $120 (domestic).'" },
      { question: "[Sentence Completion] Expense reports must be submitted within _____ working days.", options: ["5", "7", "10", "15"], answer: "C", explanation: "'within 10 working days of return.'" },
      { question: "[Sentence Completion] Personal vehicle mileage is reimbursed at $_____ per km.", options: ["$0.15", "$0.20", "$0.25", "$0.30"], answer: "C", explanation: "'reimbursed at $0.25/km.'" },
      { question: "[True / False / Not Given] Airbnb bookings are allowed for business travel.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Airbnb is not permitted.' False." },
      { question: "[True / False / Not Given] Laundry is reimbursable on trips of 3 nights or more.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'laundry (trips under 3 nights)' is non-reimbursable — implying 3+ nights IS reimbursable. True." },
      { question: "How long does reimbursement take after approval?", options: ["5 working days", "10 working days", "15 working days", "20 working days"], answer: "C", explanation: "'processed within 15 working days.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 3: Magazine Article (~900 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt2-section3",
    title: "GT Mock 2 — Section 3: The Science of Sleep",
    titleVi: "GT Đề 2 — Phần 3: Khoa học về giấc ngủ",
    level: "B2",
    category: "mock-general",
    passage: `The Science of Sleep: Why We Need It and Why We're Not Getting Enough

A. Sleep is as essential to human health as food and water, yet it remains one of the most neglected aspects of modern life. The Centers for Disease Control and Prevention (CDC) has declared insufficient sleep a "public health epidemic," with one in three American adults sleeping less than the recommended seven hours per night. Globally, the problem is even more acute: a study published in Sleep Medicine Reviews found that the average sleep duration across 15 countries has declined by approximately 37 minutes per night since 1970. The consequences of this collective sleep deficit are severe and far-reaching, affecting physical health, mental well-being, cognitive performance, and public safety.

B. During sleep, the body and brain perform critical maintenance functions that cannot occur during waking hours. The glymphatic system — a waste-clearance pathway discovered in 2012 — becomes 60% more active during sleep, flushing toxic metabolic byproducts from the brain, including beta-amyloid, the protein associated with Alzheimer's disease. The immune system releases cytokines — proteins that help fight infection and inflammation — primarily during sleep; this is why people who are sleep-deprived get sick more frequently. Growth hormone, essential for tissue repair and muscle development, is released predominantly during deep sleep. And the brain consolidates memories during sleep, transferring information from short-term to long-term storage — a process that explains why students who sleep after studying retain significantly more material than those who stay awake.

C. Sleep architecture consists of four to six cycles per night, each lasting approximately 90 minutes. Each cycle includes three stages of non-rapid eye movement (NREM) sleep — progressing from light sleep (Stage 1) through deeper sleep (Stage 2) to the deepest sleep (Stage 3, also called slow-wave sleep) — followed by a period of rapid eye movement (REM) sleep. The proportion of each stage shifts across the night: the first half of the night is dominated by deep NREM sleep, while REM sleep periods lengthen in the second half. This architecture explains why sleeping only five hours does not simply mean "missing out on a bit of REM" — it dramatically truncates the REM-dominant cycles essential for emotional regulation and creative problem-solving.

D. The modern world is hostile to healthy sleep in numerous ways. Artificial light, particularly the blue light emitted by smartphones, tablets, and computer screens, suppresses the production of melatonin — the hormone that signals the body to prepare for sleep — by up to 50%. A Harvard study found that reading on a light-emitting device before bed delayed sleep onset by an average of 10 minutes and reduced REM sleep by 11 minutes compared to reading a printed book. Caffeine, consumed by 85% of American adults daily, has a half-life of approximately 5 to 6 hours, meaning that a coffee consumed at 4 PM still has half its stimulating effect at 10 PM. Shift work, which affects approximately 15–20% of workers in industrialised countries, forces the body to override its natural circadian rhythm, leading to what researchers call "social jet lag."

E. The economic cost of sleep deprivation is staggering. A 2016 study by RAND Corporation estimated that the United States loses approximately $411 billion annually — equivalent to 2.28% of GDP — due to sleep-related productivity losses, absenteeism, and accidents. Japan loses $138 billion, Germany $60 billion, and the UK $50 billion. Drowsy driving causes an estimated 100,000 motor vehicle crashes per year in the US, resulting in approximately 1,550 deaths. The Chernobyl nuclear disaster (1986), the Exxon Valdez oil spill (1989), and the Space Shuttle Challenger explosion (1986) have all been attributed at least in part to decision-makers operating on insufficient sleep.

F. Improving sleep hygiene is both simple in theory and difficult in practice. Sleep researchers recommend maintaining a consistent sleep schedule (even on weekends), keeping the bedroom cool (18–20°C is optimal), avoiding screens for at least 30 minutes before bed, and limiting caffeine after midday. Cognitive Behavioural Therapy for Insomnia (CBT-I) has been shown to be more effective than sleeping pills for chronic insomnia, with benefits that persist long after treatment ends. Perhaps most importantly, societies need to challenge the culture that glorifies sleep deprivation — the notion that sleeping less is a sign of productivity and ambition. As sleep researcher Matthew Walker has written: "The shorter your sleep, the shorter your life."`,
    questions: [
      { question: "[Matching] Which paragraph explains the stages of sleep?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C describes NREM stages, REM, and 90-minute cycles." },
      { question: "[Matching] Which paragraph discusses modern threats to sleep?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D covers blue light, caffeine, and shift work." },
      { question: "[Matching] Which paragraph covers the economic impact of sleep loss?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses RAND study, GDP losses, and accidents." },
      { question: "[Yes / No / Not Given] One in three American adults sleeps less than seven hours.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'one in three American adults sleeping less than seven hours.' Yes." },
      { question: "[Yes / No / Not Given] The author thinks sleeping pills are the best treatment for insomnia.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'CBT-I has been shown to be more effective than sleeping pills.' The author favours CBT-I. No." },
      { question: "[Yes / No / Not Given] Children need more sleep than adults.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage doesn't discuss children's sleep needs. Not Given." },
      { question: "By how much has average sleep declined per night since 1970?", options: ["22 minutes", "30 minutes", "37 minutes", "45 minutes"], answer: "C", explanation: "'declined by approximately 37 minutes per night since 1970.'" },
      { question: "How much more active is the glymphatic system during sleep?", options: ["30%", "40%", "50%", "60%"], answer: "D", explanation: "'becomes 60% more active during sleep.'" },
      { question: "How much does blue light suppress melatonin production?", options: ["Up to 25%", "Up to 35%", "Up to 50%", "Up to 65%"], answer: "C", explanation: "'suppresses the production of melatonin by up to 50%.'" },
      { question: "How much does the US lose annually due to sleep deprivation?", options: ["$211 billion", "$311 billion", "$411 billion", "$511 billion"], answer: "C", explanation: "'$411 billion annually.'" },
      { question: "What is the optimal bedroom temperature for sleep?", options: ["15–17°C", "18–20°C", "21–23°C", "24–26°C"], answer: "B", explanation: "'18–20°C is optimal.'" },
      { question: "What is caffeine's half-life?", options: ["2–3 hours", "3–4 hours", "5–6 hours", "7–8 hours"], answer: "C", explanation: "'a half-life of approximately 5 to 6 hours.'" },
      { question: "How many motor vehicle crashes does drowsy driving cause yearly in the US?", options: ["50,000", "75,000", "100,000", "150,000"], answer: "C", explanation: "'an estimated 100,000 motor vehicle crashes per year.'" },
    ],
  },
];

const examSlug = "ielts-general-test-2";

async function main() {
  console.log("Seeding IELTS General Training Mock Test 2...\n");
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
    update: { title: "IELTS General Training — Mock Test 2", titleVi: "IELTS General Training — Thi thử 2", type: "general", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training — Mock Test 2", titleVi: "IELTS General Training — Thi thử 2", type: "general", timeMinutes: 60, order: 1 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
