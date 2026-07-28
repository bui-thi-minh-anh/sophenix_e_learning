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
  // TOEIC PART 5 — Incomplete Sentences Set 2
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part5-set2",
    title: "TOEIC Part 5: Incomplete Sentences — Set 2",
    titleVi: "TOEIC Part 5: Hoàn thành câu — Bộ 2",
    level: "B1",
    category: "toeic",
    passage: `TOEIC Part 5: Incomplete Sentences — Set 2

Directions: Choose the best word or phrase to complete each sentence. Focus on grammar structures including conditionals, relative clauses, passive voice, and business collocations commonly tested in the TOEIC exam.`,
    questions: [
      { question: "The proposal _____ by the board of directors last Friday.", options: ["approved", "was approved", "has approved", "approving"], answer: "B", explanation: "Passive voice is needed: 'The proposal was approved by the board.'" },
      { question: "Employees who _____ the training workshop will receive a certificate.", options: ["complete", "completing", "completed", "will completing"], answer: "A", explanation: "Present simple in a relative clause for general truth/condition." },
      { question: "The company is looking for candidates _____ experience in data analysis.", options: ["who", "with", "which", "by"], answer: "B", explanation: "'candidates with experience' — 'with' indicates possession of a quality." },
      { question: "If the shipment _____ by Friday, we will need to find another supplier.", options: ["doesn't arrive", "won't arrive", "didn't arrive", "hasn't been arriving"], answer: "A", explanation: "First conditional: 'If + present simple, will + base form.'" },
      { question: "The marketing budget for next year is _____ larger than this year's.", options: ["significance", "significant", "significantly", "signify"], answer: "C", explanation: "An adverb is needed to modify the adjective 'larger.' 'significantly larger.'" },
      { question: "Ms. Park asked _____ the report would be ready before the meeting.", options: ["that", "whether", "what", "which"], answer: "B", explanation: "'asked whether' introduces an indirect yes/no question." },
      { question: "The new policy goes into _____ on January 1st.", options: ["action", "effect", "place", "practice"], answer: "B", explanation: "'goes into effect' is the correct collocation meaning 'becomes active.'" },
      { question: "The client requested that the contract _____ reviewed by a lawyer.", options: ["is", "be", "was", "being"], answer: "B", explanation: "Subjunctive mood after 'requested that': base form 'be' is required." },
      { question: "_____ the heavy rain, the outdoor event proceeded as planned.", options: ["Although", "Because of", "Despite", "However"], answer: "C", explanation: "'Despite + noun phrase' shows contrast. 'Despite the heavy rain.'" },
      { question: "We need to _____ a decision before the end of the quarter.", options: ["do", "make", "take", "have"], answer: "B", explanation: "'make a decision' is the correct collocation." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 6 — Text Completion: Company Announcement
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part6-announcement",
    title: "TOEIC Part 6: Text Completion — Company Announcement",
    titleVi: "TOEIC Part 6: Hoàn thành đoạn văn — Thông báo công ty",
    level: "B1",
    category: "toeic",
    passage: `INTERNAL MEMO

TO: All Employees
FROM: Human Resources Department
DATE: June 5, 2026
SUBJECT: New Employee Wellness Program

We are pleased to announce the launch of our new Employee Wellness Program, effective July 1, 2026. This comprehensive program has been designed to support the physical and mental well-being of all staff members.

Program Benefits:
• Free annual health check-ups at designated partner clinics (list attached)
• Monthly wellness workshops covering topics such as stress management, nutrition, and ergonomics
• Subsidized gym membership — the company will cover 60% of monthly fees at any of the five partner fitness centers
• Access to a confidential counseling service, available 24/7 via phone or online chat
• Two additional "wellness days" per year (separate from annual leave and sick leave)

Eligibility:
All full-time employees who have completed their probationary period (3 months) are eligible. Part-time employees working 20 or more hours per week are also eligible for health check-ups and counseling services, but not for gym subsidies or wellness days.

Enrollment:
To enroll, please complete the online registration form on the HR portal by June 25. Your wellness card will be issued during the first week of July. If you have any questions, contact the Wellness Team at wellness@company.com or extension 450.

We strongly encourage all eligible employees to take advantage of this program. A healthier workforce benefits everyone.

Best regards,
HR Department`,
    questions: [
      { question: "When does the Wellness Program start?", options: ["June 5", "June 25", "July 1", "July 7"], answer: "C", explanation: "'effective July 1, 2026.'" },
      { question: "What percentage of gym fees does the company cover?", options: ["40%", "50%", "60%", "80%"], answer: "C", explanation: "'the company will cover 60% of monthly fees.'" },
      { question: "How many additional wellness days are provided?", options: ["One", "Two", "Three", "Five"], answer: "B", explanation: "'Two additional wellness days per year.'" },
      { question: "What is the probationary period before eligibility?", options: ["1 month", "2 months", "3 months", "6 months"], answer: "C", explanation: "'completed their probationary period (3 months).'" },
      { question: "Which benefit is NOT available to part-time employees?", options: ["Health check-ups", "Counseling services", "Gym subsidies", "The registration form"], answer: "C", explanation: "'not for gym subsidies or wellness days.'" },
      { question: "What is the enrollment deadline?", options: ["June 5", "June 15", "June 25", "July 1"], answer: "C", explanation: "'complete the online registration form on the HR portal by June 25.'" },
      { question: "How can the counseling service be accessed?", options: ["In person only", "By email only", "Via phone or online chat, 24/7", "During office hours only"], answer: "C", explanation: "'available 24/7 via phone or online chat.'" },
      { question: "[True / False / Not Given] Part-time employees working 15 hours per week are eligible for counseling.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Part-time employees working 20 or more hours per week' — 15 hours is below the threshold. False." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Double Passage: Restaurant Review + Response
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-restaurant-review",
    title: "TOEIC Part 7: Double Passage — Restaurant Review",
    titleVi: "TOEIC Part 7: Đọc hiểu đoạn kép — Đánh giá nhà hàng",
    level: "B2",
    category: "toeic",
    passage: `— PASSAGE 1: ONLINE REVIEW —

The Golden Lotus — Vietnamese Fine Dining
★★★☆☆ (3/5)
Reviewed by: Linda Chen | Date: April 18, 2026

My husband and I visited The Golden Lotus for our anniversary dinner on Saturday, April 15. I had heard wonderful things about this restaurant, so my expectations were high.

The ambiance was truly impressive — elegant décor with a beautiful view of the river. The staff were polite and attentive. Our waiter, Minh, was particularly helpful in recommending dishes.

However, I was disappointed with several aspects. First, despite having a reservation for 7:00 PM, we were not seated until 7:25. The manager apologized and explained that a large group had overstayed, but a 25-minute wait with a reservation is unacceptable. Second, while the appetizers (spring rolls and pomelo salad) were excellent, the main courses were underwhelming. My grilled sea bass ($38) was overcooked, and my husband's wagyu beef ($52) was served lukewarm. When we mentioned this to Minh, he offered to replace the dishes, which we appreciated. The replacements were much better.

Dessert (coconut panna cotta) was outstanding — easily the highlight of the meal. Our total bill came to $165 for two people, which is quite steep for a meal with inconsistencies.

Overall, The Golden Lotus has great potential but needs to improve its kitchen consistency. I would be willing to give it another try.

— PASSAGE 2: RESTAURANT RESPONSE —

Response from Tran Duc Anh, General Manager, The Golden Lotus
Date: April 20, 2026

Dear Ms. Chen,

Thank you for taking the time to share your detailed feedback. We sincerely apologize for the delay in seating and the issues with your main courses. These do not reflect the standards we strive to maintain.

We have addressed the seating issue by implementing a new reservation management system that builds in a 15-minute buffer between table assignments. Regarding the food quality, I have personally spoken with our head chef, and we are introducing additional quality checks before dishes leave the kitchen.

As a gesture of our commitment to making things right, we would like to offer you and your husband a complimentary three-course dinner at your convenience. Please email us at manager@goldenlotus.vn to arrange a date.

We truly value your patronage and hope to have the opportunity to provide you with the exceptional experience you deserve.

Warm regards,
Tran Duc Anh`,
    questions: [
      { question: "What was the occasion for the dinner?", options: ["A birthday", "An anniversary", "A business meeting", "A farewell"], answer: "B", explanation: "'visited The Golden Lotus for our anniversary dinner.'" },
      { question: "How long did they wait despite having a reservation?", options: ["10 minutes", "15 minutes", "25 minutes", "40 minutes"], answer: "C", explanation: "'we were not seated until 7:25' — 25 minutes after the 7:00 reservation." },
      { question: "What was wrong with the grilled sea bass?", options: ["It was undercooked", "It was overcooked", "It was too salty", "It was the wrong dish"], answer: "B", explanation: "'My grilled sea bass was overcooked.'" },
      { question: "How much was the total bill?", options: ["$120", "$145", "$165", "$190"], answer: "C", explanation: "'Our total bill came to $165 for two people.'" },
      { question: "What was the highlight of the meal?", options: ["Spring rolls", "Wagyu beef", "Grilled sea bass", "Coconut panna cotta"], answer: "D", explanation: "'Dessert (coconut panna cotta) was outstanding — easily the highlight.'" },
      { question: "What new system did the restaurant implement?", options: ["A new menu", "A new reservation system with 15-minute buffers", "A chef training program", "A customer loyalty program"], answer: "B", explanation: "'implementing a new reservation management system that builds in a 15-minute buffer.'" },
      { question: "What did the manager offer as compensation?", options: ["A 20% discount", "A free dessert", "A complimentary three-course dinner", "A full refund"], answer: "C", explanation: "'offer you and your husband a complimentary three-course dinner.'" },
      { question: "What is the waiter's name?", options: ["Duc Anh", "Minh", "Linda", "Chen"], answer: "B", explanation: "'Our waiter, Minh, was particularly helpful.'" },
      { question: "[True / False / Not Given] The reviewer said she would never return.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'I would be willing to give it another try.' She is open to returning. False." },
      { question: "How much did the wagyu beef cost?", options: ["$38", "$42", "$48", "$52"], answer: "D", explanation: "'my husband's wagyu beef ($52).'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Single Passage: Travel Notice
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-travel-notice",
    title: "TOEIC Part 7: Single Passage — Airport Notice",
    titleVi: "TOEIC Part 7: Đọc hiểu đoạn đơn — Thông báo sân bay",
    level: "A2",
    category: "toeic",
    passage: `TAN SON NHAT INTERNATIONAL AIRPORT — PASSENGER INFORMATION

TERMINAL GUIDE

Terminal 1: Domestic flights (Vietnam Airlines, VietJet Air, Bamboo Airways)
Terminal 2: International flights (all airlines)

CHECK-IN
• Online check-in: Available 24 hours to 1 hour before departure
• Counter check-in: Opens 3 hours before departure, closes 50 minutes before departure
• Self-service kiosks: Available in both terminals (credit card or booking reference required)

BAGGAGE
• Carry-on: Maximum 7 kg, dimensions not exceeding 56 × 36 × 23 cm
• Checked baggage: Allowance varies by airline and ticket class. Overweight baggage fee: 50,000 VND per kg for domestic, $5 per kg for international
• Oversized/special items (sports equipment, musical instruments): Must be checked in at the oversized baggage counter, located next to Counter 30 in Terminal 1 and Counter 45 in Terminal 2
• Lost baggage: Report immediately at the Baggage Service Office (arrivals hall, both terminals)

IMMIGRATION & CUSTOMS (Terminal 2 only)
• Have your passport, boarding pass, and visa (if required) ready
• E-visa holders: Use the automated e-gates (lanes 8–12)
• Customs declaration form required for items exceeding $5,000 in value or restricted goods

FACILITIES
• Free Wi-Fi: Connect to "TSN-Airport-Free" (limited to 60 minutes; unlimited for business lounge guests)
• Currency exchange: Available in both terminals, near Gates 5 and 22
• Charging stations: Every gate area
• Medical clinic: Terminal 2, 2nd floor, open 24 hours
• Prayer room: Terminal 2, 2nd floor

TRANSPORTATION FROM AIRPORT
• Taxi: Metered taxis available at Exit 3 (Terminal 1) and Exit 5 (Terminal 2). Official taxis only — avoid unlicensed vehicles.
• Bus: Route 109 to District 1 center (20,000 VND, every 20 minutes, 5:30 AM – 1:30 AM)
• Ride-hailing apps: Grab/Be pick-up point at Level 1, parking area

For flight information: Call 1900-5858 or visit www.tansonnhatairport.vn`,
    questions: [
      { question: "Which terminal handles international flights?", options: ["Terminal 1", "Terminal 2", "Both terminals", "Terminal 3"], answer: "B", explanation: "'Terminal 2: International flights (all airlines).'" },
      { question: "When does counter check-in close before departure?", options: ["30 minutes", "40 minutes", "50 minutes", "60 minutes"], answer: "C", explanation: "'closes 50 minutes before departure.'" },
      { question: "What is the maximum carry-on weight?", options: ["5 kg", "7 kg", "10 kg", "12 kg"], answer: "B", explanation: "'Carry-on: Maximum 7 kg.'" },
      { question: "How much is the overweight baggage fee for domestic flights?", options: ["30,000 VND/kg", "40,000 VND/kg", "50,000 VND/kg", "70,000 VND/kg"], answer: "C", explanation: "'50,000 VND per kg for domestic.'" },
      { question: "Which lanes are for e-visa holders?", options: ["Lanes 1–4", "Lanes 5–7", "Lanes 8–12", "Lanes 13–16"], answer: "C", explanation: "'Use the automated e-gates (lanes 8–12).'" },
      { question: "How long is the free Wi-Fi available?", options: ["30 minutes", "45 minutes", "60 minutes", "Unlimited"], answer: "C", explanation: "'limited to 60 minutes.'" },
      { question: "How much does Bus Route 109 cost?", options: ["10,000 VND", "15,000 VND", "20,000 VND", "30,000 VND"], answer: "C", explanation: "'Route 109 to District 1 center (20,000 VND).'" },
      { question: "Where is the medical clinic?", options: ["Terminal 1, 1st floor", "Terminal 1, 2nd floor", "Terminal 2, 1st floor", "Terminal 2, 2nd floor"], answer: "D", explanation: "'Medical clinic: Terminal 2, 2nd floor.'" },
      { question: "[True / False / Not Given] The airport has a hotel inside the terminal.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage does not mention any hotel. Not Given." },
      { question: "Where should you report lost baggage?", options: ["At the check-in counter", "At the gate", "At the Baggage Service Office in arrivals", "At the information desk"], answer: "C", explanation: "'Report immediately at the Baggage Service Office (arrivals hall).'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — Passage: The Placebo Effect
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-placebo-effect",
    title: "IELTS Academic: The Placebo Effect",
    titleVi: "IELTS Academic: Hiệu ứng giả dược",
    level: "B2",
    category: "ielts",
    passage: `The Placebo Effect: When Belief Becomes Medicine

A. The placebo effect — the phenomenon in which patients experience real improvements in their condition after receiving a treatment that has no therapeutic properties — has fascinated and puzzled medical researchers for decades. The term "placebo" comes from the Latin phrase meaning "I shall please," and was first used in a medical context in the late 18th century. Today, the placebo effect is recognized as one of the most reliable phenomena in medicine, occurring across a wide range of conditions including pain, depression, anxiety, Parkinson's disease, and irritable bowel syndrome.

B. The standard explanation for the placebo effect centers on expectation and conditioning. When patients believe they are receiving an effective treatment, their brains release endorphins, dopamine, and other neurochemicals that can produce measurable physiological changes. Brain imaging studies have confirmed that placebo treatments activate many of the same neural pathways as actual drugs. In one landmark study, patients with Parkinson's disease who were given a placebo showed increased dopamine release in the brain — the same mechanism targeted by Parkinson's medications. The conditioning component means that past experiences with effective treatments can train the body to respond similarly to placebos, much as Pavlov's dogs learned to salivate at the sound of a bell.

C. Perhaps the most surprising finding in recent placebo research is the discovery that placebos can work even when patients know they are receiving a placebo — so-called "open-label placebos." A groundbreaking study at Harvard Medical School by Ted Kaptchuk found that patients with irritable bowel syndrome who were explicitly told they were taking sugar pills — with no active medication — still experienced significantly greater symptom improvement than patients who received no treatment at all. This finding challenges the long-held assumption that deception is necessary for the placebo effect to work and suggests that the ritual of taking a pill, the interaction with a healthcare provider, and the narrative of receiving treatment may themselves be therapeutic.

D. The strength of the placebo effect varies considerably depending on several factors. The color of pills matters: red and orange placebos tend to work better as stimulants, while blue and green placebos are more effective as sedatives. Larger pills produce stronger effects than smaller ones, and capsules are perceived as more powerful than tablets. Injections produce stronger placebo effects than pills, and sham surgeries produce the strongest effects of all. The manner of the healthcare provider also plays a significant role — warm, empathetic practitioners elicit stronger placebo responses than those who are distant or rushed.

E. The placebo effect poses a fundamental challenge to the way modern medicine evaluates treatments. The gold standard of medical research is the randomized controlled trial (RCT), in which a new treatment is compared to a placebo. A treatment must outperform the placebo to be considered effective. However, if the placebo effect accounts for a significant portion of a treatment's benefit, then some existing medications may be only marginally more effective than a sugar pill. This has been a particular controversy in the field of antidepressant research. A meta-analysis by Irving Kirsch found that for mild to moderate depression, antidepressants were only slightly more effective than placebos, with the drug-placebo difference reaching statistical significance only for severely depressed patients.

F. Some researchers argue that rather than viewing the placebo effect as a confounding nuisance, medicine should actively harness it. "Placebo-enhanced" medicine would use the insights of placebo research — the importance of the therapeutic relationship, the power of positive expectation, the role of treatment rituals — to augment the effects of active treatments. This approach does not advocate replacing proven therapies with placebos, but rather optimizing the psychological and contextual factors that influence healing. As understanding of the placebo effect deepens, it may ultimately transform the practice of medicine by placing greater emphasis on the healing power of the mind-body connection.`,
    questions: [
      { question: "[Matching] Which paragraph discusses how placebo appearance affects its strength?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses pill color, size, capsules vs tablets, and injections." },
      { question: "[Matching] Which paragraph describes placebos that work even when patients know they are placebos?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C discusses 'open-label placebos' by Ted Kaptchuk at Harvard." },
      { question: "[True / False / Not Given] The word 'placebo' comes from Greek.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'comes from the Latin phrase.' It's Latin, not Greek. False." },
      { question: "[True / False / Not Given] Blue placebo pills work better as stimulants than red ones.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'red and orange placebos tend to work better as stimulants, while blue and green placebos are more effective as sedatives.' False — blue works as sedative, not stimulant." },
      { question: "[True / False / Not Given] The placebo effect has been observed in cancer treatment.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage lists pain, depression, anxiety, Parkinson's, and IBS — but doesn't mention cancer. Not Given." },
      { question: "What neurochemicals does the brain release during the placebo effect?", options: ["Cortisol and adrenaline", "Endorphins and dopamine", "Insulin and glucagon", "Serotonin only"], answer: "B", explanation: "'their brains release endorphins, dopamine, and other neurochemicals.'" },
      { question: "Which type of treatment produces the strongest placebo effect?", options: ["Pills", "Capsules", "Injections", "Sham surgeries"], answer: "D", explanation: "'sham surgeries produce the strongest effects of all.'" },
      { question: "What did Irving Kirsch's meta-analysis find about antidepressants?", options: ["They are highly effective for all patients", "They were only slightly more effective than placebos for mild-moderate depression", "They had no effect at all", "They worked better than surgery"], answer: "B", explanation: "'for mild to moderate depression, antidepressants were only slightly more effective than placebos.'" },
      { question: "[Sentence Completion] Ted Kaptchuk's study was conducted at _____.", options: ["Oxford University", "Johns Hopkins", "Harvard Medical School", "Stanford University"], answer: "C", explanation: "'A groundbreaking study at Harvard Medical School by Ted Kaptchuk.'" },
      { question: "[Sentence Completion] The gold standard of medical research is the _____.", options: ["Case study", "Observational study", "Meta-analysis", "Randomized controlled trial"], answer: "D", explanation: "'The gold standard of medical research is the randomized controlled trial (RCT).'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS GENERAL — Section: Museum Visitor Information
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-general-museum-guide",
    title: "IELTS General: Museum Visitor Guide",
    titleVi: "IELTS General: Hướng dẫn tham quan bảo tàng",
    level: "A2",
    category: "ielts",
    passage: `NATIONAL HISTORY MUSEUM — VISITOR INFORMATION

OPENING HOURS
Monday – Friday: 9:00 AM – 5:00 PM (last entry 4:15 PM)
Saturday – Sunday: 10:00 AM – 6:00 PM (last entry 5:15 PM)
Closed: December 25, January 1, and the first Monday of every month for maintenance

ADMISSION
Adults (18–64): $15
Seniors (65+): $10
Students (with valid ID): $8
Children (6–17): $5
Children under 6: Free
Family ticket (2 adults + up to 3 children): $35

GUIDED TOURS
• English tours: 10:30 AM and 2:00 PM daily (included in admission)
• Vietnamese tours: 11:00 AM (weekdays only)
• Private group tours: Available for groups of 10+, must be booked at least 48 hours in advance. Cost: $120 per group (up to 20 people), $5 per additional person.
• Audio guides: Available in 8 languages at the information desk. Rental: $4 per device. Valid ID required as deposit.

MUSEUM RULES
• No photography with flash in exhibition halls
• No food or drinks in exhibition areas (café on Level 2)
• Large bags and backpacks must be stored in free lockers near the entrance
• Strollers are permitted but not in the Fragile Artifacts gallery (Level 3)
• Assistance dogs are welcome; other pets are not permitted

SPECIAL EXHIBITIONS
Currently showing:
• "Ancient Civilizations of Southeast Asia" — Level 1, West Wing (until August 31, 2026)
• "The Science of Volcanoes" — Interactive exhibit, Level 2 (until October 15, 2026) — additional charge: $3 per person

FACILITIES
• Gift shop: Level 1, near main entrance
• Café: Level 2 (open during museum hours)
• Wheelchair access: All levels via elevator
• Baby changing rooms: Levels 1 and 2
• Free Wi-Fi: Connect to "Museum-Guest"

CONTACT
Phone: (555) 789-0123
Email: info@nationalhistory.org
Website: www.nationalhistory.org`,
    questions: [
      { question: "What time is the last entry on Saturdays?", options: ["4:15 PM", "4:30 PM", "5:00 PM", "5:15 PM"], answer: "D", explanation: "'Saturday – Sunday: last entry 5:15 PM.'" },
      { question: "How much does a family ticket cost?", options: ["$25", "$30", "$35", "$40"], answer: "C", explanation: "'Family ticket (2 adults + up to 3 children): $35.'" },
      { question: "How much does an audio guide cost?", options: ["$2", "$3", "$4", "$5"], answer: "C", explanation: "'Rental: $4 per device.'" },
      { question: "What is required to rent an audio guide?", options: ["A ticket", "A valid ID as deposit", "A credit card", "A membership card"], answer: "B", explanation: "'Valid ID required as deposit.'" },
      { question: "Where should large bags be stored?", options: ["At the café", "In the car", "In free lockers near the entrance", "At the information desk"], answer: "C", explanation: "'stored in free lockers near the entrance.'" },
      { question: "How much extra does the volcano exhibition cost?", options: ["Free", "$2", "$3", "$5"], answer: "C", explanation: "'additional charge: $3 per person.'" },
      { question: "[True / False / Not Given] Photography without flash is allowed.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'No photography with flash' — implying photography without flash is permitted. True." },
      { question: "[True / False / Not Given] Vietnamese tours are available on weekends.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Vietnamese tours: 11:00 AM (weekdays only).' False." },
      { question: "How far in advance must private group tours be booked?", options: ["24 hours", "48 hours", "72 hours", "1 week"], answer: "B", explanation: "'must be booked at least 48 hours in advance.'" },
      { question: "Where is the café located?", options: ["Level 1", "Level 2", "Level 3", "Near the entrance"], answer: "B", explanation: "'Café: Level 2.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — The Economics of Happiness
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-economics-of-happiness",
    title: "IELTS Academic: The Economics of Happiness",
    titleVi: "IELTS Academic: Kinh tế học hạnh phúc",
    level: "C1",
    category: "ielts",
    passage: `The Economics of Happiness

A. For much of history, economists have used Gross Domestic Product (GDP) as the primary measure of a nation's success. The logic was straightforward: a wealthier country provides more goods, services, and opportunities, and therefore its citizens must be better off. However, beginning in the 1970s, a growing body of research challenged this assumption, giving rise to a field known as the "economics of happiness" or "subjective well-being research."

B. The most influential early finding in this field was the "Easterlin Paradox," identified by economist Richard Easterlin in 1974. Easterlin observed that while wealthier individuals within a country tend to be happier than poorer ones, increases in a country's overall GDP over time do not correspond to increases in the average happiness of its citizens. In the United States, for example, real GDP per capita roughly tripled between 1950 and 2000, yet average self-reported happiness remained essentially flat. This paradox suggested that beyond a certain threshold, additional national wealth does not translate into greater well-being.

C. Subsequent research has refined this picture. Nobel laureate Daniel Kahneman and economist Angus Deaton, analyzing data from 450,000 Americans, found that emotional well-being (day-to-day mood and feelings) increases with income up to approximately $75,000 per year (in 2010 dollars), after which additional income has diminishing marginal returns on experienced happiness. However, "life evaluation" — people's overall assessment of the quality of their lives when they step back and reflect — continues to rise with income even above this threshold. A 2021 study by Matthew Killingsworth challenged Kahneman's findings, suggesting that experienced well-being does continue to rise with income beyond $75,000, though at a decelerating rate. A subsequent collaborative analysis by Killingsworth and Kahneman found that the $75,000 plateau exists specifically for the least happy 20% of the population, while for the majority, happiness continues to increase with income.

D. If money alone does not buy happiness, what does? The World Happiness Report, published annually since 2012 by the United Nations Sustainable Development Solutions Network, ranks countries based on six key variables: GDP per capita, social support (having someone to count on), healthy life expectancy, freedom to make life choices, generosity, and perceptions of corruption. Nordic countries — Finland, Denmark, Iceland, and Sweden — consistently rank at the top, not because they are the wealthiest nations, but because they score highly across all six dimensions. Finland has topped the rankings for seven consecutive years (2018–2024), despite having a lower GDP per capita than countries like the United States, Singapore, or Qatar.

E. Bhutan has taken perhaps the most radical approach to the economics of happiness. In 1972, the young King Jigme Singye Wangchuck declared that "Gross National Happiness is more important than Gross National Product," and the country subsequently developed a comprehensive GNH index that measures well-being across nine domains: psychological well-being, health, education, time use, cultural diversity, good governance, community vitality, ecological diversity, and living standards. While Bhutan's approach has been praised as visionary, critics point out that the country still faces significant challenges including poverty, limited healthcare access, and restrictions on civil liberties.

F. The implications of happiness research extend to public policy. If the ultimate goal of economic policy is to improve citizens' well-being — rather than simply to maximize GDP — then governments should invest more heavily in mental health services, social connections, work-life balance, and environmental quality. New Zealand became one of the first countries to create a "well-being budget" in 2019, explicitly prioritizing mental health, child poverty reduction, and environmental sustainability alongside traditional economic metrics. The United Kingdom has established a "What Works Centre for Well-being," and several countries now include measures of subjective well-being in their national statistics. As economist Joseph Stiglitz has argued, "What we measure affects what we do; and if our measurements are flawed, decisions may be distorted."`,
    questions: [
      // Matching
      { question: "[Matching] Which paragraph describes the Easterlin Paradox?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B introduces the Easterlin Paradox by Richard Easterlin (1974)." },
      { question: "[Matching] Which paragraph discusses Bhutan's approach to measuring happiness?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E describes Bhutan's Gross National Happiness index." },

      // Yes / No / Not Given
      { question: "[Yes / No / Not Given] The author believes GDP is a good measure of national success.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "The passage presents research challenging GDP as the primary measure. The author's tone suggests GDP alone is insufficient. No." },
      { question: "[Yes / No / Not Given] Finland has the highest GDP per capita in the world.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'despite having a lower GDP per capita than countries like the United States, Singapore, or Qatar.' No." },
      { question: "[Yes / No / Not Given] Japan has adopted a well-being budget similar to New Zealand's.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage mentions New Zealand and UK but not Japan. Not Given." },

      // Multiple Choice
      { question: "At what income level does emotional well-being plateau according to Kahneman?", options: ["$50,000", "$75,000", "$100,000", "$150,000"], answer: "B", explanation: "'emotional well-being increases with income up to approximately $75,000 per year.'" },
      { question: "How many years has Finland topped the happiness rankings consecutively?", options: ["Three", "Five", "Seven", "Ten"], answer: "C", explanation: "'Finland has topped the rankings for seven consecutive years (2018–2024).'" },
      { question: "How many domains does Bhutan's GNH index measure?", options: ["Six", "Seven", "Eight", "Nine"], answer: "D", explanation: "'a comprehensive GNH index that measures well-being across nine domains.'" },

      // Matching Features
      { question: "[Matching] Who said 'What we measure affects what we do'?", options: ["Richard Easterlin", "Daniel Kahneman", "Joseph Stiglitz", "Matthew Killingsworth"], answer: "C", explanation: "'As economist Joseph Stiglitz has argued.'" },
      { question: "[Matching] Who declared that Gross National Happiness is more important than GDP?", options: ["The UN Secretary-General", "Finland's Prime Minister", "Bhutan's King Jigme Singye Wangchuck", "New Zealand's Prime Minister"], answer: "C", explanation: "'the young King Jigme Singye Wangchuck declared.'" },

      // Sentence Completion
      { question: "[Sentence Completion] US real GDP per capita roughly _____ between 1950 and 2000.", options: ["doubled", "tripled", "quadrupled", "increased by 50%"], answer: "B", explanation: "'real GDP per capita roughly tripled between 1950 and 2000.'" },
      { question: "[Sentence Completion] New Zealand created a 'well-being budget' in _____.", options: ["2015", "2017", "2019", "2021"], answer: "C", explanation: "'New Zealand became one of the first countries to create a well-being budget in 2019.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 6 — Text Completion: Product Return Policy
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part6-return-policy",
    title: "TOEIC Part 6: Text Completion — Return Policy",
    titleVi: "TOEIC Part 6: Hoàn thành đoạn văn — Chính sách đổi trả",
    level: "A2",
    category: "toeic",
    passage: `TECHMART ELECTRONICS — RETURN & EXCHANGE POLICY

Thank you for shopping at TechMart Electronics. We want you to be completely satisfied with your purchase. If you are not, our return policy is as follows:

STANDARD RETURNS
• Items may be returned within 30 days of purchase for a full refund
• Items must be in original condition with all packaging, accessories, and documentation
• A valid receipt or proof of purchase is required
• Refunds will be processed to the original payment method within 5–7 business days

EXCHANGES
• Exchanges are accepted within 45 days of purchase
• If the replacement item costs more, you pay the difference; if it costs less, the difference is refunded
• Exchanged items must be in the same product category

EXCEPTIONS — ITEMS THAT CANNOT BE RETURNED
• Opened software, games, and digital download cards
• Custom-built or special-order computers
• Items marked "Final Sale" or "Clearance"
• Gift cards and prepaid cards
• Items damaged by the customer (accidental damage, water damage, etc.)

DEFECTIVE PRODUCTS
If your product is defective or malfunctions within the manufacturer's warranty period:
• Bring the item to any TechMart store with proof of purchase
• Our technicians will inspect the item within 2 business days
• If confirmed defective, you may choose: repair, replacement, or full refund
• Warranty periods vary by product (check your product manual or visit techmart.com/warranty)

ONLINE PURCHASES
• Online orders may be returned by mail or at any physical store
• For mail returns: Request a return shipping label at techmart.com/returns (free for defective items; $8.99 shipping fee for standard returns)
• In-store returns of online purchases: Bring the item and your order confirmation email

NEED HELP?
Customer Service: 1-800-TECHMART (1-800-832-4627)
Available Monday–Saturday, 8:00 AM – 9:00 PM
Email: support@techmart.com | Live chat: techmart.com/help`,
    questions: [
      { question: "How many days do customers have to return items?", options: ["14 days", "21 days", "30 days", "45 days"], answer: "C", explanation: "'returned within 30 days of purchase.'" },
      { question: "How long does it take to process refunds?", options: ["1–2 business days", "3–4 business days", "5–7 business days", "10–14 business days"], answer: "C", explanation: "'within 5–7 business days.'" },
      { question: "How many days are allowed for exchanges?", options: ["14 days", "30 days", "45 days", "60 days"], answer: "C", explanation: "'Exchanges are accepted within 45 days.'" },
      { question: "Which item CANNOT be returned?", options: ["A laptop", "A pair of headphones", "Opened software", "A Bluetooth speaker"], answer: "C", explanation: "'Opened software, games, and digital download cards' cannot be returned." },
      { question: "How long does defective product inspection take?", options: ["Same day", "1 business day", "2 business days", "5 business days"], answer: "C", explanation: "'Our technicians will inspect the item within 2 business days.'" },
      { question: "What is the shipping fee for standard mail returns?", options: ["Free", "$4.99", "$8.99", "$12.99"], answer: "C", explanation: "'$8.99 shipping fee for standard returns.'" },
      { question: "[True / False / Not Given] Defective items can be returned by mail for free.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'free for defective items.' True." },
      { question: "[True / False / Not Given] Customer service is available on Sundays.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Available Monday–Saturday' — not Sunday. False." },
      { question: "What options do customers have for a confirmed defective product?", options: ["Refund only", "Repair or replacement only", "Repair, replacement, or full refund", "Store credit only"], answer: "C", explanation: "'you may choose: repair, replacement, or full refund.'" },
      { question: "What is needed to return an online purchase in-store?", options: ["The original shipping box", "The item and order confirmation email", "A government ID", "The credit card used"], answer: "B", explanation: "'Bring the item and your order confirmation email.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Triple Passage: Conference Registration
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-triple-conference",
    title: "TOEIC Part 7: Triple Passage — Conference Registration",
    titleVi: "TOEIC Part 7: Đọc hiểu ba đoạn — Đăng ký hội nghị",
    level: "C1",
    category: "toeic",
    passage: `— PASSAGE 1: CONFERENCE BROCHURE —

ASIA-PACIFIC INNOVATION SUMMIT 2026
October 12–14, 2026 | Saigon Convention Center, Ho Chi Minh City, Vietnam

Theme: "Sustainable Technology for a Connected World"

Join 2,500+ professionals from 40 countries for three days of keynotes, panel discussions, workshops, and networking. This year's summit features 120+ speakers from leading tech companies, universities, and government agencies.

REGISTRATION FEES (Early bird prices — until August 31):
• Full Summit Pass (3 days): $450 (Regular: $600)
• Single Day Pass: $200 (Regular: $250)
• Student Pass (3 days, valid student ID required): $150
• Virtual Attendance Pass: $99

All in-person passes include: conference materials, lunch and refreshments, access to all keynotes and panels, networking reception (Day 1 evening), exhibition hall access.

Workshop participation requires separate registration ($75 per workshop, maximum 30 participants each).

KEYNOTE SPEAKERS:
• Dr. Sarah Kim, CEO of GreenTech Solutions — "The Carbon-Neutral Data Center"
• Prof. Raj Patel, MIT — "AI Ethics in Developing Economies"
• Nguyen Minh Tuan, Founder of VietAI — "Building Southeast Asia's AI Ecosystem"
• Dr. Elena Volkov, European Space Agency — "Satellite Data for Climate Monitoring"

Register at: www.apinnovationsummit.org

— PASSAGE 2: EMAIL —

From: david.martinez@globalcorp.com
To: events@globalcorp.com
Date: August 25, 2026
Subject: Asia-Pacific Innovation Summit — Team Registration

Hi Events Team,

I'd like to register the following team members for the Asia-Pacific Innovation Summit in Ho Chi Minh City:

1. David Martinez (me) — Full Summit Pass
2. Jennifer Wu — Full Summit Pass
3. Kevin Park — Day 2 only (October 13) — he has client meetings on the other days
4. Sarah Nakamura — Full Summit Pass + Workshop: "AI-Powered Supply Chain" (October 13, 2:00 PM)

Please use the early bird pricing — the deadline is August 31, and I'm sending this well in advance.

Also, Jennifer and I would like to attend the networking reception on Day 1 evening. Can you confirm that's included with the Full Summit Pass?

For Kevin's single day pass, does he still get lunch and access to the exhibition hall, or is that only for full passes?

Budget code: MKTG-2026-Q4-EVENTS

Thanks,
David Martinez
Director of Strategic Partnerships, GlobalCorp

— PASSAGE 3: REPLY —

From: events@globalcorp.com
To: david.martinez@globalcorp.com
Cc: jennifer.wu@globalcorp.com; kevin.park@globalcorp.com; sarah.nakamura@globalcorp.com
Date: August 26, 2026
Subject: RE: Asia-Pacific Innovation Summit — Team Registration

Hi David,

I've processed the registrations. Here's the breakdown:

• David Martinez — Full Summit Pass (early bird): $450
• Jennifer Wu — Full Summit Pass (early bird): $450
• Kevin Park — Single Day Pass (early bird): $200
• Sarah Nakamura — Full Summit Pass (early bird): $450 + Workshop: $75

TOTAL: $1,625 (charged to MKTG-2026-Q4-EVENTS)

To answer your questions:
1. Yes, the networking reception on Day 1 evening is included with all in-person passes (Full and Single Day).
2. Kevin's Single Day Pass includes lunch, refreshments, keynotes, panels, and exhibition hall access — same amenities as the Full Pass, but for one day only.

Note: I was unable to register Sarah for the "AI-Powered Supply Chain" workshop on October 13 at 2:00 PM because it is already fully booked (30/30 participants). I've added her to the waitlist. Alternatively, the same instructor is offering "Machine Learning in Logistics" on October 14 at 10:00 AM — there are 8 spots remaining. Please let me know if she'd like to switch.

Travel arrangements: I'll coordinate with the travel department for flights and hotels. Shall I book the Saigon Grand Hotel (the summit's partner hotel, 10% discount for attendees)?

Best regards,
Amy Chen
Corporate Events Coordinator`,
    questions: [
      { question: "How many speakers does the summit feature?", options: ["80+", "100+", "120+", "150+"], answer: "C", explanation: "'This year's summit features 120+ speakers.'" },
      { question: "What is the early bird deadline?", options: ["August 25", "August 26", "August 31", "September 15"], answer: "C", explanation: "'Early bird prices — until August 31.'" },
      { question: "How much is the total registration cost for the team?", options: ["$1,425", "$1,550", "$1,625", "$1,750"], answer: "C", explanation: "'TOTAL: $1,625' as stated in Amy's reply." },
      { question: "Why couldn't Sarah be registered for the workshop?", options: ["It was cancelled", "It was too expensive", "It was fully booked", "She is not eligible"], answer: "C", explanation: "'it is already fully booked (30/30 participants).'" },
      { question: "Which day will Kevin attend?", options: ["October 12", "October 13", "October 14", "All three days"], answer: "B", explanation: "'Kevin Park — Day 2 only (October 13).'" },
      { question: "What alternative workshop was suggested for Sarah?", options: ["AI Ethics Workshop", "Data Center Management", "Machine Learning in Logistics", "Climate Data Analytics"], answer: "C", explanation: "'the same instructor is offering Machine Learning in Logistics.'" },
      { question: "[True / False / Not Given] Virtual attendees can access the networking reception.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage says in-person passes include the reception, but doesn't specifically say virtual attendees cannot. Not Given." },
      { question: "[True / False / Not Given] The Saigon Grand Hotel offers a 10% discount for summit attendees.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'the summit's partner hotel, 10% discount for attendees.' True." },
      { question: "How many spots remain in the alternative workshop?", options: ["3", "5", "8", "12"], answer: "C", explanation: "'there are 8 spots remaining.'" },
      { question: "What is David Martinez's job title?", options: ["Marketing Manager", "Events Coordinator", "Director of Strategic Partnerships", "VP of Operations"], answer: "C", explanation: "'Director of Strategic Partnerships, GlobalCorp.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — Migration Patterns
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-animal-migration",
    title: "IELTS Academic: Animal Migration",
    titleVi: "IELTS Academic: Di cư động vật",
    level: "B2",
    category: "ielts",
    passage: `Animal Migration: Nature's Greatest Journeys

A. Every year, billions of animals undertake extraordinary journeys across the planet in one of nature's most awe-inspiring phenomena: migration. From the Arctic tern, which flies approximately 71,000 kilometers annually on its round trip between the Arctic and Antarctic, to the monarch butterfly, which travels up to 4,800 kilometers from Canada to central Mexico despite weighing less than a gram, migration represents one of the most remarkable feats of endurance and navigation in the animal kingdom.

B. Animals migrate for several fundamental reasons. The most common driver is the search for food and favorable conditions. Many bird species fly south in autumn to escape harsh winters and exploit food-rich environments, then return north in spring to breed in areas with abundant resources and fewer competitors. Caribou in North America migrate up to 5,000 kilometers annually between their summer calving grounds in the Arctic tundra and winter feeding areas in boreal forests. Marine species such as humpback whales travel between cold, nutrient-rich polar feeding grounds and warm tropical waters where they give birth and nurse their calves.

C. The navigational abilities that enable migration are extraordinarily sophisticated. Birds use a combination of the sun's position, star patterns, the Earth's magnetic field, landmarks, and even olfactory cues to navigate across thousands of kilometers. Research has shown that some species possess magnetite — tiny crystals of iron oxide — in their beaks or brains, which function as a biological compass. Sea turtles can detect both the intensity and the inclination angle of the Earth's magnetic field, allowing them to determine both latitude and longitude. Salmon use their remarkable sense of smell to navigate back to the exact stream where they were born, sometimes after spending years in the open ocean thousands of kilometers away.

D. Climate change is increasingly disrupting established migration patterns. Rising temperatures are causing many species to shift their migration timing. A study published in Nature Climate Change found that European migratory birds are arriving at their breeding grounds an average of 2.1 days earlier per decade. While this may seem minor, it can create dangerous "phenological mismatches" — situations where animals arrive at a location before or after their food sources are available. For instance, if birds arrive at breeding grounds before the insects they feed on have emerged, their chicks may starve.

E. Human activities beyond climate change also threaten migratory species. Habitat loss along migration routes — the draining of wetlands, the conversion of grasslands to agriculture, and urban development — eliminates critical rest and refueling stops. Light pollution from cities disorients millions of birds each year, causing fatal collisions with buildings. The American Bird Conservancy estimates that up to 1 billion birds die annually in the United States alone from building collisions, many during nighttime migration. Fences, roads, and other infrastructure fragment habitats and block terrestrial migration corridors. The construction of the Trans-Siberian Railway, for example, disrupted the ancient migration routes of Mongolian gazelles.

F. Conservation efforts are increasingly focused on protecting not just individual species but entire migration corridors. The Convention on Migratory Species (CMS), an international treaty under the United Nations, now has 133 member countries working to protect migratory routes. "Flyway" initiatives coordinate conservation across the dozens of countries that a single migratory bird species may pass through. Technology is also playing a role: miniaturized GPS trackers, satellite tags, and geolocators are providing unprecedented data on migration routes, stopover sites, and threats, enabling more targeted conservation strategies.`,
    questions: [
      { question: "[Matching] Which paragraph describes how animals navigate during migration?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "C", explanation: "Paragraph C discusses magnetic fields, star patterns, olfactory cues, and magnetite." },
      { question: "[Matching] Which paragraph discusses how climate change affects migration?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses rising temperatures and phenological mismatches." },
      { question: "[True / False / Not Given] The Arctic tern migrates about 71,000 km per year.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'flies approximately 71,000 kilometers annually.' True." },
      { question: "[True / False / Not Given] Monarch butterflies weigh more than 5 grams.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'despite weighing less than a gram.' False." },
      { question: "[True / False / Not Given] All migratory birds use magnetite for navigation.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage says 'some species possess magnetite.' Whether all do is not stated. Not Given." },
      { question: "How many birds die from building collisions annually in the US?", options: ["About 100 million", "About 500 million", "Up to 1 billion", "About 2 billion"], answer: "C", explanation: "'up to 1 billion birds die annually in the United States alone.'" },
      { question: "How many member countries does the CMS have?", options: ["98", "115", "133", "150"], answer: "C", explanation: "'now has 133 member countries.'" },
      { question: "How much earlier are European migratory birds arriving per decade?", options: ["1.2 days", "2.1 days", "3.5 days", "5 days"], answer: "B", explanation: "'arriving at their breeding grounds an average of 2.1 days earlier per decade.'" },
      { question: "[Sentence Completion] Salmon use their sense of _____ to find the stream where they were born.", options: ["sight", "hearing", "smell", "touch"], answer: "C", explanation: "'Salmon use their remarkable sense of smell to navigate back.'" },
      { question: "[Sentence Completion] The _____ disrupted the migration routes of Mongolian gazelles.", options: ["Great Wall of China", "Trans-Siberian Railway", "Silk Road", "Suez Canal"], answer: "B", explanation: "'The construction of the Trans-Siberian Railway disrupted the ancient migration routes.'" },
    ],
  },
];

async function main() {
  console.log("Seeding TOEIC + IELTS reading passages (batch 2)...\n");

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
