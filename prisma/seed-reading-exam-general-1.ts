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

// ═══════════════════════════════════════════════════════════════════════════════
// IELTS General Training Reading — Mock Test 1
// 3 sections, 40 questions total, ~2,400 words
// ═══════════════════════════════════════════════════════════════════════════════

const passages: PassageData[] = [

  // ═══════════════════════════════════════════════════════════
  // SECTION 1: "Social Survival" — 3 short texts (~600 words, 14 questions)
  // Level A2-B1
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt1-section1",
    title: "IELTS GT Mock 1 — Section 1: Community Notices",
    titleVi: "IELTS GT Thi thử 1 — Phần 1: Thông báo cộng đồng",
    level: "A2",
    category: "mock-general",
    passage: `— TEXT 1 —

RIVERSIDE FITNESS CENTRE — MEMBERSHIP OPTIONS

Welcome to Riverside Fitness Centre! We offer flexible membership plans to suit every lifestyle and budget. Our modern facility includes a fully equipped gym with over 120 machines, a 25-metre heated swimming pool, two group fitness studios, a sauna and steam room, and a members-only lounge with free Wi-Fi.

Membership Plans:
• Day Pass: $15 per visit (no commitment required)
• Monthly Standard: $49/month — access to gym floor, pool, and sauna (6:00 AM – 10:00 PM)
• Monthly Premium: $69/month — all Standard benefits plus unlimited group classes (yoga, spinning, Pilates, HIIT, Zumba) and extended hours (5:00 AM – 11:00 PM)
• Annual Premium: $660/year (save $168 compared to monthly Premium — equivalent to $55/month)
• Student/Senior: $39/month — same as Standard access (valid student ID or proof of age 65+ required)
• Family Bundle: $119/month for up to 4 family members (Standard access for all, group classes for 2 nominated members)

All new members receive a free 45-minute fitness assessment with a certified personal trainer during their first week. Personal training sessions are available at $60 per hour or $450 for a 10-session package.

How to Join:
Visit our front desk with a photo ID, or register online at www.riversidefitness.com. Monthly memberships require 30 days' written notice to cancel. Annual memberships are non-refundable but may be transferred to another person for a $25 administration fee.

Opening Hours: Monday–Friday 5:00 AM – 11:00 PM | Saturday–Sunday 6:00 AM – 9:00 PM
Address: 42 Riverside Drive, Maplewood | Phone: (03) 9555 1234

— TEXT 2 —

MAPLEWOOD PUBLIC LIBRARY — NEW MEMBER INFORMATION

The Maplewood Public Library is free to join for all residents of the Maplewood district. To register, bring a form of photo identification and proof of your current address (a utility bill or bank statement dated within the last 3 months) to any branch.

Borrowing Limits:
• Adults: up to 15 items at a time (books, DVDs, audiobooks, magazines)
• Children (under 16): up to 10 items
• Loan period: 3 weeks for books and audiobooks; 1 week for DVDs and magazines
• Renewals: items may be renewed up to 2 times online, by phone, or in person, unless another member has placed a hold on the item
• Late fees: $0.30 per day per item (maximum $9.00 per item). DVDs: $1.00 per day (maximum $15.00)

Services:
• Free public computers with internet access (60-minute sessions; booking recommended)
• Printing and photocopying: black & white $0.15/page, colour $0.50/page
• Free Wi-Fi throughout all branches
• Weekly storytime for children aged 3–6 (Wednesdays 10:30 AM)
• Monthly book club for adults (first Thursday of each month, 7:00 PM)
• Quiet study rooms available for booking (up to 2 hours per day)

Hours: Monday–Thursday 9:00 AM – 8:00 PM | Friday 9:00 AM – 5:00 PM | Saturday 10:00 AM – 4:00 PM | Closed Sundays and public holidays

— TEXT 3 —

MAPLEWOOD COMMUNITY FAIR — SATURDAY, 18 OCTOBER

The Maplewood Community Association invites you to the annual Community Fair at Riverside Park! This free, family-friendly event celebrates our diverse neighbourhood with food, entertainment, and activities for all ages.

Schedule:
• 10:00 AM — Gates open; market stalls selling handmade crafts, baked goods, and local produce
• 10:30 AM — Children's zone opens (face painting, bouncy castle, treasure hunt)
• 11:00 AM — Live music on the main stage (local bands and school choirs performing throughout the day)
• 12:00 PM — International food court opens (Thai, Mexican, Italian, Lebanese, Vietnamese, Indian stalls)
• 1:00 PM — Community talent show (registration at the info tent before 12:30 PM)
• 2:30 PM — Dog show (categories: Best Trick, Best Costume, Friendliest Dog — entry fee $5 per dog)
• 4:00 PM — Raffle draw (tickets $2 each or 3 for $5; prizes include a $500 shopping voucher, restaurant gift cards, and a weekend getaway)
• 5:00 PM — Event closes

Parking: Free parking is available at Maplewood High School (5-minute walk). There is NO parking at Riverside Park on the day of the event. A free shuttle bus runs every 15 minutes between Maplewood Station and the park entrance from 9:30 AM to 5:30 PM.

Volunteers Needed: We are still looking for volunteers to help with setup (7:00 AM), food stalls, and cleanup (5:00 PM – 7:00 PM). Contact Sarah at community@maplewood.org or call (03) 9555 6789.`,
    questions: [
      // Questions 1–6: Riverside Fitness Centre
      { question: "How much does the Monthly Premium membership cost?", options: ["$39/month", "$49/month", "$69/month", "$119/month"], answer: "C", explanation: "'Monthly Premium: $69/month.'" },
      { question: "What is the annual saving with the Annual Premium plan compared to paying Monthly Premium for 12 months?", options: ["$55", "$120", "$168", "$228"], answer: "C", explanation: "'save $168 compared to monthly Premium.'" },
      { question: "[True / False / Not Given] The Student/Senior membership includes group fitness classes.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Student/Senior is '$39/month — same as Standard access.' Standard does NOT include group classes (only Premium does). False." },
      { question: "[True / False / Not Given] Annual memberships can be cancelled for a full refund.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Annual memberships are non-refundable.' False." },
      { question: "How many machines does the gym have?", options: ["Over 80", "Over 100", "Over 120", "Over 150"], answer: "C", explanation: "'a fully equipped gym with over 120 machines.'" },
      { question: "What happens during a new member's first week?", options: ["They receive a free month", "They get a discount on classes", "They receive a free fitness assessment", "They are paired with a training partner"], answer: "C", explanation: "'a free 45-minute fitness assessment with a certified personal trainer during their first week.'" },

      // Questions 7–10: Maplewood Public Library
      { question: "How many items can an adult borrow at one time?", options: ["10", "12", "15", "20"], answer: "C", explanation: "'Adults: up to 15 items at a time.'" },
      { question: "What is the late fee for an overdue DVD?", options: ["$0.30 per day", "$0.50 per day", "$1.00 per day", "$1.50 per day"], answer: "C", explanation: "'DVDs: $1.00 per day (maximum $15.00).'" },
      { question: "[True / False / Not Given] The library is open on Sundays.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Closed Sundays and public holidays.' False." },
      { question: "How long is a computer session at the library?", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"], answer: "C", explanation: "'Free public computers with internet access (60-minute sessions).'" },

      // Questions 11–14: Community Fair
      { question: "When does the raffle draw take place?", options: ["1:00 PM", "2:30 PM", "4:00 PM", "5:00 PM"], answer: "C", explanation: "'4:00 PM — Raffle draw.'" },
      { question: "Where should visitors park their cars?", options: ["At Riverside Park", "At Maplewood Station", "At Maplewood High School", "On Riverside Drive"], answer: "C", explanation: "'Free parking is available at Maplewood High School.' There is no parking at the park." },
      { question: "[True / False / Not Given] The talent show requires advance registration.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'registration at the info tent before 12:30 PM.' True — you must register in advance." },
      { question: "How much does it cost to enter a dog in the dog show?", options: ["Free", "$2", "$5", "$10"], answer: "C", explanation: "'entry fee $5 per dog.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 2: "Workplace Survival" — 2 workplace texts (~700 words, 13 questions)
  // Level B1
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt1-section2",
    title: "IELTS GT Mock 1 — Section 2: Workplace Documents",
    titleVi: "IELTS GT Thi thử 1 — Phần 2: Tài liệu nơi làm việc",
    level: "B1",
    category: "mock-general",
    passage: `— TEXT 1 —

GREENLEAF HOSPITALITY GROUP — EMPLOYEE HANDBOOK (EXTRACT)

Chapter 4: Working Hours, Leave, and Attendance

4.1 Standard Working Hours
All full-time employees are contracted to work 38 hours per week. Standard shifts are 8 hours including a 30-minute unpaid lunch break. Part-time employees work between 15 and 30 hours per week as specified in their individual contracts. Overtime must be approved in advance by your line manager and is paid at 1.5 times your normal hourly rate for the first 2 hours and double time thereafter.

4.2 Annual Leave
Full-time employees receive 20 days of paid annual leave per year, accruing at 1.67 days per month. Part-time employees receive a proportional entitlement based on their contracted hours. Leave requests must be submitted through the HR portal at least 2 weeks in advance. During the peak holiday season (15 December – 15 January), leave requests require approval from both your line manager and the department head due to high business demand. No more than 2 employees from the same team may take leave at the same time during peak season.

4.3 Sick Leave
Employees are entitled to 10 days of paid sick leave per year. For absences of 1–2 days, you must notify your manager by phone or email before the start of your shift. For absences of 3 or more consecutive days, a medical certificate from a registered doctor is required. Unused sick leave does not carry over to the following year and is not paid out upon resignation.

4.4 Attendance and Punctuality
All employees must clock in and clock out using the electronic time system at their assigned entrance. Arriving more than 10 minutes late without prior notice is recorded as a "late arrival." Three late arrivals within a single calendar month will trigger a formal discussion with your line manager. Persistent lateness may result in a written warning. If you anticipate being late due to an emergency, contact your manager as soon as possible.

4.5 Dress Code
Front-of-house staff must wear the company uniform provided. Uniforms must be clean, pressed, and worn with closed-toe black shoes. Name badges must be visible at all times. Back-of-house and administrative staff should follow the business casual dress code: no jeans, shorts, flip-flops, or clothing with visible logos or slogans. Specific safety attire requirements apply in the kitchen and maintenance departments as outlined in the Health & Safety manual.

— TEXT 2 —

GREENLEAF HOSPITALITY GROUP — WORKPLACE SAFETY INDUCTION (SUMMARY)

Welcome to Greenleaf Hospitality. All new employees must complete the safety induction within their first 3 working days. This summary covers the essential points, but you must attend the full 2-hour induction session and pass the online safety quiz (minimum score: 80%) before you are permitted to begin unsupervised work.

Fire Safety:
Fire exits are located at both ends of every corridor and are marked with green illuminated signs. Fire extinguishers are wall-mounted beside every exit. In the event of a fire alarm, leave the building immediately via the nearest fire exit. Do not use lifts. Do not stop to collect personal belongings. Assemble at the designated meeting point in the rear car park. Fire wardens (identifiable by orange high-visibility vests) will conduct a headcount. Fire drills are held every 6 months and participation is compulsory.

Manual Handling:
Incorrect lifting is the leading cause of workplace injury at Greenleaf. Always bend your knees and keep your back straight when lifting. Do not attempt to lift items over 15 kilograms without assistance or a trolley. Report any back pain or strain to your manager immediately.

Hazard Reporting:
If you notice any hazard — a wet floor, broken equipment, exposed wiring, blocked exits — report it immediately to your supervisor or use the "Report a Hazard" feature on the staff app. Do not attempt to fix electrical or structural hazards yourself. Wet floor signs must be placed whenever a floor has been mopped or a spill has occurred.

First Aid:
First aid kits are located in every kitchen, at reception, and in the staff break room. Trained first aiders are listed on the noticeboard in each department. For any injury that requires more than basic first aid, call emergency services on 000 and then notify your manager. All workplace injuries, no matter how minor, must be recorded in the Incident Register located at reception.`,
    questions: [
      // Questions 15–22: Employee Handbook
      { question: "How many hours per week do full-time employees work?", options: ["35", "37.5", "38", "40"], answer: "C", explanation: "'All full-time employees are contracted to work 38 hours per week.'" },
      { question: "What is the overtime pay rate for the first 2 hours?", options: ["Normal rate", "1.25 times normal rate", "1.5 times normal rate", "Double time"], answer: "C", explanation: "'paid at 1.5 times your normal hourly rate for the first 2 hours.'" },
      { question: "[Sentence Completion] During peak season, leave requests need approval from the line manager and the _____.", options: ["HR manager", "department head", "general manager", "CEO"], answer: "B", explanation: "'require approval from both your line manager and the department head.'" },
      { question: "[Matching] Match the following to the correct policy: 'A medical certificate is required.'", options: ["Any sick leave absence", "Absences of 2+ days", "Absences of 3+ consecutive days", "Absences during peak season"], answer: "C", explanation: "'For absences of 3 or more consecutive days, a medical certificate from a registered doctor is required.'" },
      { question: "[True / False / Not Given] Unused sick leave is paid out when an employee resigns.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Unused sick leave does not carry over... and is not paid out upon resignation.' False." },
      { question: "How many late arrivals in a month trigger a formal discussion?", options: ["2", "3", "4", "5"], answer: "B", explanation: "'Three late arrivals within a single calendar month will trigger a formal discussion.'" },
      { question: "[Matching] Which staff must wear a company uniform?", options: ["All employees", "Administrative staff", "Front-of-house staff", "Back-of-house staff"], answer: "C", explanation: "'Front-of-house staff must wear the company uniform provided.'" },
      { question: "How many days of annual leave do full-time employees receive?", options: ["15", "18", "20", "25"], answer: "C", explanation: "'Full-time employees receive 20 days of paid annual leave per year.'" },

      // Questions 23–27: Safety Induction
      { question: "What minimum score is needed on the online safety quiz?", options: ["60%", "70%", "80%", "90%"], answer: "C", explanation: "'pass the online safety quiz (minimum score: 80%).'" },
      { question: "[Sentence Completion] Fire drills are held every _____ and participation is compulsory.", options: ["3 months", "6 months", "12 months", "2 years"], answer: "B", explanation: "'Fire drills are held every 6 months and participation is compulsory.'" },
      { question: "What is the maximum weight an employee should lift alone?", options: ["10 kg", "15 kg", "20 kg", "25 kg"], answer: "B", explanation: "'Do not attempt to lift items over 15 kilograms without assistance or a trolley.'" },
      { question: "[Matching] Where is the Incident Register located?", options: ["In the staff break room", "In the kitchen", "At reception", "In each department"], answer: "C", explanation: "'the Incident Register located at reception.'" },
      { question: "How can staff identify fire wardens during an evacuation?", options: ["They carry megaphones", "They wear orange high-visibility vests", "They have red helmets", "They carry clipboards"], answer: "B", explanation: "'Fire wardens (identifiable by orange high-visibility vests).'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 3: "General interest" — 1 long text (~900 words, 13 questions)
  // Level B2
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt1-section3",
    title: "IELTS GT Mock 1 — Section 3: The Rise of Remote Work",
    titleVi: "IELTS GT Thi thử 1 — Phần 3: Sự trỗi dậy của làm việc từ xa",
    level: "B2",
    category: "mock-general",
    passage: `The Rise of Remote Work: How the Pandemic Reshaped the Modern Workplace

A. For decades, the traditional office was the undisputed centre of professional life. Employees commuted to a physical workplace, sat at assigned desks, attended meetings in conference rooms, and clocked out at the end of the day. Although telecommuting had existed in various forms since the 1970s — when the term was coined by NASA engineer Jack Nilles — it remained a niche arrangement, viewed with suspicion by most managers who equated physical presence with productivity. As recently as 2019, only about 5% of the workforce in developed nations worked from home on a regular basis.

B. The COVID-19 pandemic changed everything almost overnight. In March 2020, governments around the world imposed lockdowns that forced millions of office workers to work from home. Companies that had resisted remote work for years had no choice but to adapt. Within weeks, video conferencing platforms like Zoom saw their daily active users surge from 10 million to over 300 million. Organizations invested heavily in cloud computing, collaboration software, and cybersecurity infrastructure. What had been viewed as a temporary emergency measure gradually became a permanent feature of the modern workplace. By 2023, surveys indicated that approximately 28% of the workforce in major economies worked remotely at least part of the time, and the figure has remained relatively stable since then.

C. Proponents of remote work point to a range of significant benefits. Studies by Stanford University and others have found that remote workers are, on average, 13% more productive than their office-based counterparts, largely because they experience fewer interruptions, spend less time commuting, and have greater control over their work environment. Employees consistently report higher job satisfaction and improved work-life balance when given the flexibility to work from home. For employers, remote work can reduce overhead costs dramatically: Global Workplace Analytics estimates that a typical employer can save approximately $11,000 per year for each employee who works remotely half of the time, through savings on office space, utilities, cleaning, and other facilities costs.

D. Remote work has also opened doors that were previously closed. People with physical disabilities, chronic health conditions, or caregiving responsibilities — who may have found it difficult or impossible to commute to an office every day — now have access to employment opportunities that were largely unavailable to them before. Companies are no longer limited to hiring talent within commuting distance of their offices; they can recruit from a global pool of candidates, which has been particularly beneficial for technology companies and startups seeking specialized skills. Rural communities and smaller cities have experienced economic revitalization as remote workers relocate from expensive metropolitan areas, bringing their purchasing power and tax contributions with them.

E. However, the shift to remote work has not been without significant challenges. The most frequently cited problem is isolation. Without the casual social interactions that occur naturally in an office — the conversations by the coffee machine, the spontaneous lunches, the hallway chats — remote workers often report feeling lonely and disconnected from their colleagues. A 2023 survey by the American Psychological Association found that 67% of remote workers experienced feelings of isolation at least sometimes, and 22% described these feelings as severe. This isolation can contribute to mental health issues including anxiety and depression, and it makes it harder for organizations to build and maintain a cohesive company culture.

F. Another major concern is the blurring of boundaries between work and personal life. When the office is also the home, many remote workers find it difficult to "switch off" at the end of the workday. Research by the International Labour Organization has shown that remote workers tend to work longer hours than their office-based peers, with 40% reporting that they regularly work outside their contracted hours compared to 28% of office workers. The phenomenon of "always-on" culture — being expected to respond to emails and messages at any time — has led to increased rates of burnout among remote employees. Several countries, including France, Spain, Portugal, and Belgium, have responded by introducing "right to disconnect" laws that protect employees from being penalized for not responding to work communications outside of working hours.

G. The emerging consensus among business leaders and researchers is that the future of work lies not in a complete return to the office or in fully remote arrangements, but in hybrid models that combine elements of both. Most large companies, including Google, Microsoft, and Amazon, have settled on requiring employees to be in the office two to three days per week, while allowing them to work from home on the remaining days. This approach aims to capture the best of both worlds: the collaboration, mentorship, and social connection that in-person work provides, together with the flexibility, autonomy, and productivity benefits of remote work. A 2024 survey by McKinsey found that 83% of employees who had experienced hybrid work considered it a significant factor in their decision to stay with their current employer, suggesting that offering flexibility has become a competitive necessity for talent retention rather than merely a perk. The challenge for organizations is to design hybrid systems that are genuinely flexible rather than merely adding the inconveniences of both arrangements, and to ensure that remote and in-office employees are treated equitably in terms of career advancement, visibility, and access to opportunities.`,
    questions: [
      // Questions 28–31: Matching Headings
      { question: "[Matching] Which paragraph discusses the negative effects of social isolation on remote workers?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses isolation, loneliness, and disconnection among remote workers." },
      { question: "[Matching] Which paragraph explains how remote work has benefited people with disabilities and rural areas?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses how remote work opened doors for people with disabilities and revitalized rural communities." },
      { question: "[Matching] Which paragraph describes the hybrid model as the likely future of work?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G discusses the emerging consensus around hybrid models combining office and remote work." },
      { question: "[Matching] Which paragraph covers the rapid technological adaptation during the pandemic?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes the surge in Zoom users, investment in cloud computing, and the shift during COVID-19." },

      // Questions 32–36: Yes / No / Not Given
      { question: "[Yes / No / Not Given] The author believes that remote work is more productive than office work in all situations.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The author cites a Stanford study showing 13% higher productivity on average, but does not make a universal claim. Not Given." },
      { question: "[Yes / No / Not Given] Jack Nilles invented video conferencing technology.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage says Nilles 'coined the term' telecommuting. It does not say he invented video conferencing. Not Given." },
      { question: "[Yes / No / Not Given] France has passed laws to protect employees' right to disconnect from work communications.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'Several countries, including France... have responded by introducing right to disconnect laws.' Yes." },
      { question: "[Yes / No / Not Given] Fully remote work arrangements will eventually replace all office work.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'the future of work lies not in a complete return to the office or in fully remote arrangements, but in hybrid models.' The author disagrees. No." },
      { question: "[Yes / No / Not Given] Remote workers are less likely to receive promotions than office workers.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "Paragraph G mentions the need to 'ensure that remote and in-office employees are treated equitably in terms of career advancement' but does not state whether this is currently a problem. Not Given." },

      // Questions 37–40: MCQ
      { question: "What percentage of the workforce worked from home regularly before the pandemic?", options: ["About 2%", "About 5%", "About 10%", "About 15%"], answer: "B", explanation: "'only about 5% of the workforce in developed nations worked from home on a regular basis.'" },
      { question: "How much can an employer save per remote worker per year, according to Global Workplace Analytics?", options: ["$5,000", "$8,000", "$11,000", "$15,000"], answer: "C", explanation: "'approximately $11,000 per year for each employee who works remotely half of the time.'" },
      { question: "What percentage of remote workers reported feeling isolated at least sometimes?", options: ["45%", "55%", "67%", "78%"], answer: "C", explanation: "'67% of remote workers experienced feelings of isolation at least sometimes.'" },
      { question: "How many days per week do most large companies require employees to be in the office under hybrid models?", options: ["1 to 2 days", "2 to 3 days", "3 to 4 days", "4 to 5 days"], answer: "B", explanation: "'requiring employees to be in the office two to three days per week.'" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Main seed function
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log("Seeding IELTS General Training Mock Test 1...\n");

  // ── Step 1: Upsert passages and their questions ──────────────────────────

  const existingCount = await prisma.readingPassage.count();
  let order = existingCount;

  const passageIds: string[] = [];

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

    passageIds.push(passage.id);

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

  // ── Step 2: Upsert the ReadingExam ───────────────────────────────────────

  const examSlug = "ielts-general-test-1";
  const examTitle = "IELTS General Training — Mock Test 1";
  const examTitleVi = "IELTS General Training — Thi thử 1";

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: examTitle, titleVi: examTitleVi, type: "general", timeMinutes: 60 },
    create: { slug: examSlug, title: examTitle, titleVi: examTitleVi, type: "general", timeMinutes: 60, order: 0 },
  });

  console.log(`\n  ✓ ReadingExam: ${exam.slug} (id: ${exam.id})`);

  // ── Step 3: Re-create exam sections ──────────────────────────────────────

  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });

  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({
      data: {
        examId: exam.id,
        passageId: passageIds[i],
        order: i,
      },
    });
    console.log(`  ✓ Section ${i + 1} → passage ${passages[i].slug}`);
  }

  // ── Summary ──────────────────────────────────────────────────────────────

  const totalQuestions = passages.reduce((sum, p) => sum + p.questions.length, 0);
  console.log(`\nDone! Seeded ${passages.length} passages (${totalQuestions} questions) + 1 exam with ${passageIds.length} sections.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
