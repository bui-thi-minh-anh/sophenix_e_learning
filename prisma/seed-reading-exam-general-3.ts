import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // SECTION 1: Notices & Ads (~650 words, A2, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt3-section1",
    title: "GT Mock 3 — Section 1: Travel & Transport Notices",
    titleVi: "GT Đề 3 — Phần 1: Thông tin giao thông & du lịch",
    level: "A2",
    category: "mock-general",
    passage: `— TEXT 1: BUS SERVICE TIMETABLE —

CITY EXPRESS BUS — ROUTE 36
Ho Chi Minh City → Vung Tau Beach

SCHEDULE (Daily service):
Departure from HCMC (Mien Dong Bus Station):
  6:00 AM | 7:30 AM | 9:00 AM | 10:30 AM | 12:00 PM | 2:00 PM | 4:00 PM | 6:00 PM

Departure from Vung Tau (Vung Tau Bus Station):
  6:00 AM | 7:30 AM | 9:00 AM | 11:00 AM | 1:00 PM | 3:00 PM | 5:00 PM | 7:00 PM

Journey time: Approximately 2 hours (traffic dependent)
Fare: Adults — 120,000 VND one-way / 210,000 VND return
      Children (under 12) — 60,000 VND one-way / 110,000 VND return
      Infants (under 2) — Free (must sit on parent's lap, no separate seat)

LUGGAGE: Each passenger may bring 1 carry-on bag and 1 checked bag (max 20 kg). Additional luggage: 30,000 VND per item.
BOOKING: Online at cityexpress.vn or at the station ticket counter. Online bookings receive a 5% discount.
CANCELLATION: Free cancellation up to 24 hours before departure. 50% refund for cancellations within 24 hours. No refund for no-shows.

— TEXT 2: HOTEL BOOKING CONFIRMATION —

BOOKING CONFIRMATION — SEASIDE RESORT VUNG TAU

Guest name: Mr. Tran Van Duc
Booking reference: VT-20260815-4472
Check-in: Friday, August 15, 2026, from 2:00 PM
Check-out: Sunday, August 17, 2026, by 11:00 AM

Room type: Deluxe Sea View (2 adults, 1 child — extra bed included)
Rate: 1,800,000 VND per night × 2 nights = 3,600,000 VND
Taxes & fees: 360,000 VND (10% VAT)
Total: 3,960,000 VND (pre-paid via credit card)

Included:
• Daily breakfast buffet for 2 adults and 1 child (6:30–10:00 AM, Level 1 Restaurant)
• Free Wi-Fi in room and public areas
• Access to swimming pool (7:00 AM – 9:00 PM) and private beach
• Free airport/bus station shuttle (advance booking required, call reception)

Not included:
• Minibar, room service, spa treatments, and water sports
• Late check-out: 300,000 VND/hour (subject to availability)
• Early check-in before 12:00 PM: 500,000 VND

Special requests noted: High floor preferred, extra pillows.

Cancellation: Free cancellation until August 12, 2026. After this date, the first night's rate will be charged.

Contact: reservations@seasideresort.vn | +84-254-382-1000

— TEXT 3: TOURIST ATTRACTION NOTICE —

BA RIA — VUNG TAU LIGHTHOUSE
Built in 1910 | Height: 18 metres | 360° panoramic view of the coastline

VISITING HOURS: Daily, 7:30 AM – 5:00 PM (last entry 4:30 PM)
ADMISSION: 10,000 VND (adults) | 5,000 VND (children 6–16) | Free (under 6)
NOTE: 148 steps to the top. Not suitable for visitors with mobility difficulties. No elevator.
Photography permitted. No drones allowed.`,
    questions: [
      { question: "How long does the bus journey take?", options: ["1 hour", "1.5 hours", "2 hours", "2.5 hours"], answer: "C", explanation: "'Approximately 2 hours.'" },
      { question: "How much is a one-way adult ticket?", options: ["100,000 VND", "110,000 VND", "120,000 VND", "150,000 VND"], answer: "C", explanation: "'Adults — 120,000 VND one-way.'" },
      { question: "What discount do online bookings receive?", options: ["3%", "5%", "8%", "10%"], answer: "B", explanation: "'Online bookings receive a 5% discount.'" },
      { question: "What is the refund for cancellations within 24 hours?", options: ["No refund", "25%", "50%", "75%"], answer: "C", explanation: "'50% refund for cancellations within 24 hours.'" },
      { question: "What is Mr. Tran's check-in date?", options: ["August 14", "August 15", "August 16", "August 17"], answer: "B", explanation: "'Check-in: Friday, August 15, 2026.'" },
      { question: "What is the total hotel cost?", options: ["3,200,000 VND", "3,600,000 VND", "3,800,000 VND", "3,960,000 VND"], answer: "D", explanation: "'Total: 3,960,000 VND.'" },
      { question: "When does the breakfast buffet end?", options: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"], answer: "C", explanation: "'6:30–10:00 AM.'" },
      { question: "How much does late check-out cost per hour?", options: ["200,000 VND", "250,000 VND", "300,000 VND", "400,000 VND"], answer: "C", explanation: "'300,000 VND/hour.'" },
      { question: "When was the lighthouse built?", options: ["1890", "1900", "1910", "1920"], answer: "C", explanation: "'Built in 1910.'" },
      { question: "How many steps to the top of the lighthouse?", options: ["98", "118", "138", "148"], answer: "D", explanation: "'148 steps to the top.'" },
      { question: "[True / False / Not Given] Infants get a separate seat on the bus.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'must sit on parent's lap, no separate seat.' False." },
      { question: "[True / False / Not Given] The hotel has a gym.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage doesn't mention a gym. Not Given." },
      { question: "[True / False / Not Given] Drones are allowed at the lighthouse.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'No drones allowed.' False." },
      { question: "What is the free cancellation deadline for the hotel?", options: ["August 10", "August 11", "August 12", "August 13"], answer: "C", explanation: "'Free cancellation until August 12, 2026.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 2: Training & Workplace (~700 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt3-section2",
    title: "GT Mock 3 — Section 2: Training & Workplace Policies",
    titleVi: "GT Đề 3 — Phần 2: Đào tạo & chính sách nơi làm việc",
    level: "B1",
    category: "mock-general",
    passage: `— TEXT 1: CUSTOMER SERVICE TRAINING GUIDE —

GOLDEN STAR HOTEL — CUSTOMER SERVICE STANDARDS

All front desk and guest relations staff must follow these standards:

GREETING GUESTS:
• Acknowledge every guest within 10 seconds of approaching the desk
• Make eye contact, smile, and say: "Good morning/afternoon/evening. Welcome to the Golden Star Hotel. How may I help you?"
• Use the guest's name at least twice during the interaction (check the reservation system)
• Never say "I don't know." Instead, say "Let me find that out for you right away."

HANDLING COMPLAINTS:
Follow the HEAT method:
H — Hear the guest out completely without interrupting
E — Empathize: "I understand how frustrating this must be."
A — Apologize: "I sincerely apologize for the inconvenience."
T — Take action: Offer a specific solution within your authority, or escalate to your supervisor

Authority levels for resolution:
• Front desk staff: May offer complimentary drink, room upgrade (if available), or late check-out
• Duty Manager: May offer one free night, meal voucher (up to $50), or spa credit
• General Manager: May offer full refund or compensation package

Response time targets:
• Maintenance issues (e.g., broken AC, plumbing): Technician dispatched within 15 minutes
• Room change requests: Completed within 30 minutes
• Written complaints: Acknowledged within 24 hours, resolved within 72 hours

TELEPHONE ETIQUETTE:
• Answer within 3 rings
• "Good [morning/afternoon/evening], Golden Star Hotel, [your name] speaking. How may I assist you?"
• Place caller on hold for no more than 30 seconds without checking back
• Transfer calls with a warm introduction: tell the next person the caller's name and reason for calling

— TEXT 2: STAFF BENEFITS SUMMARY —

GOLDEN STAR HOTEL — EMPLOYEE BENEFITS (Full-time staff, after probation)

LEAVE:
• Annual leave: 15 days/year (increases to 18 days after 3 years, 22 days after 5 years)
• Sick leave: 10 days/year (medical certificate required for 3+ consecutive days)
• Maternity leave: 6 months (full pay for first 3 months, 50% for months 4–6)
• Paternity leave: 5 days (within 30 days of child's birth)

MEALS:
• Free staff meal during each shift (Staff Canteen, Level B1)
• 50% discount at hotel restaurants for personal dining (not during peak hours: 12–1 PM and 6–8 PM)

PROFESSIONAL DEVELOPMENT:
• Annual training budget: $300 per employee for external courses/certifications
• Internal English classes: Free, every Tuesday and Thursday, 3:00–4:00 PM
• Promotion priority given to internal candidates

OTHER BENEFITS:
• Staff rate for hotel rooms: 70% off (subject to availability, max 5 nights/year)
• Annual health check-up: Free (partner clinic, arranged by HR)
• Employee of the Month: $100 bonus + certificate + reserved parking space`,
    questions: [
      { question: "Within how many seconds should a guest be acknowledged?", options: ["5 seconds", "10 seconds", "15 seconds", "20 seconds"], answer: "B", explanation: "'Acknowledge every guest within 10 seconds.'" },
      { question: "What does the 'E' in HEAT stand for?", options: ["Explain", "Empathize", "Evaluate", "Engage"], answer: "B", explanation: "'E — Empathize.'" },
      { question: "What can front desk staff offer to resolve complaints?", options: ["A free night", "A full refund", "A complimentary drink or room upgrade", "A $50 meal voucher"], answer: "C", explanation: "'May offer complimentary drink, room upgrade, or late check-out.'" },
      { question: "How quickly should a technician be dispatched for maintenance?", options: ["5 minutes", "10 minutes", "15 minutes", "30 minutes"], answer: "C", explanation: "'Technician dispatched within 15 minutes.'" },
      { question: "Within how many rings should the phone be answered?", options: ["2 rings", "3 rings", "4 rings", "5 rings"], answer: "B", explanation: "'Answer within 3 rings.'" },
      { question: "How many annual leave days do new employees get?", options: ["10 days", "12 days", "15 days", "18 days"], answer: "C", explanation: "'Annual leave: 15 days/year.'" },
      { question: "When does annual leave increase to 18 days?", options: ["After 1 year", "After 2 years", "After 3 years", "After 5 years"], answer: "C", explanation: "'increases to 18 days after 3 years.'" },
      { question: "How long is maternity leave at full pay?", options: ["1 month", "2 months", "3 months", "6 months"], answer: "C", explanation: "'full pay for first 3 months.'" },
      { question: "[Sentence Completion] The annual training budget is $_____ per employee.", options: ["$200", "$250", "$300", "$400"], answer: "C", explanation: "'$300 per employee.'" },
      { question: "[Sentence Completion] Staff hotel room discount is _____% off.", options: ["50%", "60%", "70%", "80%"], answer: "C", explanation: "'70% off.'" },
      { question: "[True / False / Not Given] Written complaints must be resolved within 48 hours.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'resolved within 72 hours.' False — 72, not 48." },
      { question: "[True / False / Not Given] The staff restaurant discount applies during lunch peak hours.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'not during peak hours: 12–1 PM and 6–8 PM.' False." },
      { question: "What does the Employee of the Month receive?", options: ["$50 bonus", "$100 bonus + certificate + parking", "$200 bonus", "A free vacation"], answer: "B", explanation: "'$100 bonus + certificate + reserved parking space.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 3: Magazine Article (~900 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt3-section3",
    title: "GT Mock 3 — Section 3: The Future of Food",
    titleVi: "GT Đề 3 — Phần 3: Tương lai của thực phẩm",
    level: "B2",
    category: "mock-general",
    passage: `The Future of Food: How Technology Is Transforming What We Eat

A. By 2050, the global population is projected to reach 9.7 billion, according to the United Nations. Feeding this many people will require a 60% increase in food production compared to 2012 levels, according to the Food and Agriculture Organization (FAO). Yet the conventional food system is already straining: agriculture accounts for 70% of global freshwater withdrawals, occupies 50% of the world's habitable land, and generates approximately 26% of global greenhouse gas emissions. Clearly, simply scaling up existing agricultural practices is not a viable solution. Innovation in food technology — from lab-grown meat to precision agriculture — offers potential pathways to feed the world sustainably.

B. Cellular agriculture, commonly known as "lab-grown meat" or "cultivated meat," is perhaps the most revolutionary food technology in development. The process involves extracting cells from a living animal, placing them in a nutrient-rich culture medium, and growing them in bioreactors to produce muscle tissue that is biologically identical to conventional meat. The first lab-grown burger was produced by Professor Mark Post at Maastricht University in 2013 at a cost of $330,000. By 2023, companies like Upside Foods and GOOD Meat had received regulatory approval to sell cultivated chicken in the United States, with costs falling to approximately $20–50 per pound — still far above conventional chicken ($3–4/lb) but declining rapidly. Proponents argue that cultivated meat could reduce land use by 95%, water use by 78%, and greenhouse gas emissions by 92% compared to conventional beef production.

C. Plant-based meat alternatives have already achieved significant market penetration. Companies such as Beyond Meat and Impossible Foods use plant proteins (from peas, soy, and other sources), fats, binding agents, and flavouring compounds to create products that closely mimic the taste and texture of conventional meat. The global plant-based meat market was valued at $6.1 billion in 2023 and is projected to reach $15.7 billion by 2030. However, the sector faces challenges: sales growth has slowed since the post-pandemic peak of 2020–2021, and consumer surveys indicate that taste, price, and concerns about "ultra-processing" remain barriers to wider adoption.

D. Precision agriculture uses technology to optimise crop production while minimising resource waste. GPS-guided tractors, drone-mounted sensors, satellite imagery, and soil moisture monitors allow farmers to apply water, fertiliser, and pesticides with unprecedented accuracy — targeting individual plants or small zones rather than entire fields. A study by the International Food Policy Research Institute found that precision agriculture techniques reduced water use by 20–30%, fertiliser use by 15–20%, and pesticide use by 25–50% while maintaining or increasing yields. Artificial intelligence is increasingly central to precision agriculture: machine learning algorithms can predict crop diseases days before visible symptoms appear, analyse weather patterns to optimise planting schedules, and even automate harvesting.

E. Vertical farming — growing crops in stacked indoor layers using LED lights and hydroponic or aeroponic systems — is gaining traction in land-scarce urban environments. Japan's Spread Co. operates one of the world's largest vertical farms, producing 30,000 heads of lettuce per day using 98% less water and zero pesticides compared to conventional farming. Singapore, which imports 90% of its food, has set a national target of producing 30% of its nutritional needs domestically by 2030, with vertical farming as a key strategy. However, vertical farming remains energy-intensive — the electricity cost of running LED growing lights is the single largest expense — and is currently limited to high-value leafy greens, herbs, and strawberries rather than staple crops like wheat and rice.

F. Insect farming represents a less glamorous but potentially impactful food technology. Insects are extraordinarily efficient converters of feed to protein: crickets require 12 times less feed than cattle to produce the same amount of protein, and they can be raised on organic waste streams. The European Union approved the sale of house crickets, yellow mealworms, and migratory locusts as food products in 2023. Thailand already has over 20,000 cricket farms, and the global edible insect market is projected to reach $9.6 billion by 2030. While Western consumers remain hesitant, insect-based protein is increasingly used as animal feed — replacing environmentally costly soy and fishmeal — and as a protein ingredient in processed foods where the insect origin is less visible.

G. The food system of the future will almost certainly draw on all of these technologies, with different solutions suited to different contexts. What is clear is that the status quo — a food system that feeds 8 billion people while simultaneously degrading the environment that sustains it — is not sustainable. The question is not whether the food system will change, but how quickly and how equitably.`,
    questions: [
      { question: "[Matching] Which paragraph discusses lab-grown meat?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes cellular agriculture, Mark Post's burger, and Upside Foods." },
      { question: "[Matching] Which paragraph covers precision agriculture?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses GPS, drones, sensors, and AI in farming." },
      { question: "[Matching] Which paragraph discusses insect farming?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F covers crickets, mealworms, and the edible insect market." },
      { question: "What is the projected global population by 2050?", options: ["8.5 billion", "9.2 billion", "9.7 billion", "10.3 billion"], answer: "C", explanation: "'projected to reach 9.7 billion.'" },
      { question: "How much did the first lab-grown burger cost?", options: ["$130,000", "$230,000", "$330,000", "$430,000"], answer: "C", explanation: "'at a cost of $330,000.'" },
      { question: "[Yes / No / Not Given] Cultivated meat uses less land than conventional beef.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'reduce land use by 95%.' Yes." },
      { question: "[Yes / No / Not Given] The plant-based meat market has grown consistently every year.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'sales growth has slowed since the post-pandemic peak.' No." },
      { question: "[Yes / No / Not Given] Most vertical farms can grow wheat efficiently.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'currently limited to leafy greens, herbs, and strawberries rather than staple crops like wheat.' No." },
      { question: "How much less feed do crickets require compared to cattle?", options: ["6 times less", "8 times less", "10 times less", "12 times less"], answer: "D", explanation: "'crickets require 12 times less feed than cattle.'" },
      { question: "What is the projected value of the edible insect market by 2030?", options: ["$5.4 billion", "$7.2 billion", "$9.6 billion", "$12.1 billion"], answer: "C", explanation: "'projected to reach $9.6 billion by 2030.'" },
      { question: "How much of its food does Singapore import?", options: ["70%", "80%", "90%", "95%"], answer: "C", explanation: "'Singapore, which imports 90% of its food.'" },
      { question: "What is the global plant-based meat market value in 2023?", options: ["$4.3 billion", "$5.2 billion", "$6.1 billion", "$7.8 billion"], answer: "C", explanation: "'valued at $6.1 billion in 2023.'" },
      { question: "What percentage of global freshwater does agriculture use?", options: ["50%", "60%", "70%", "80%"], answer: "C", explanation: "'agriculture accounts for 70% of global freshwater withdrawals.'" },
    ],
  },
];

const examSlug = "ielts-general-test-3";

async function main() {
  console.log("Seeding IELTS General Training Mock Test 3...\n");
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
    update: { title: "IELTS General Training — Mock Test 3", titleVi: "IELTS General Training — Thi thử 3", type: "general", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training — Mock Test 3", titleVi: "IELTS General Training — Thi thử 3", type: "general", timeMinutes: 60, order: 2 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
