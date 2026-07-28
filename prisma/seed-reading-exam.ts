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
  // TOEIC PART 5 — Incomplete Sentences (A2–B1)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part5-set1",
    title: "TOEIC Part 5: Incomplete Sentences — Set 1",
    titleVi: "TOEIC Part 5: Hoàn thành câu — Bộ 1",
    level: "A2",
    category: "toeic",
    passage: `TOEIC Part 5: Incomplete Sentences

Directions: Choose the best word or phrase to complete each sentence.

In this section of the TOEIC test, you will see sentences with a blank space. You need to select the answer that best completes the sentence grammatically and meaningfully. This tests your knowledge of vocabulary, grammar, and how words function in context. Pay attention to the part of speech needed (noun, verb, adjective, adverb), verb tenses, prepositions, and word collocations. Read the entire sentence before choosing your answer, as context clues often appear after the blank.`,
    questions: [
      { question: "All employees must _____ their ID badges while in the building.", options: ["wear", "wore", "wearing", "worn"], answer: "A", explanation: "'must' is followed by the base form of the verb. 'must wear.'" },
      { question: "The meeting has been _____ until next Monday.", options: ["postpone", "postponing", "postponed", "postpones"], answer: "C", explanation: "'has been + past participle' forms the present perfect passive. 'has been postponed.'" },
      { question: "Ms. Chen is responsible _____ managing the marketing department.", options: ["to", "for", "with", "at"], answer: "B", explanation: "'responsible for' is the correct collocation." },
      { question: "The new software is _____ easier to use than the previous version.", options: ["many", "very", "much", "too"], answer: "C", explanation: "'much' is used before comparatives. 'much easier.'" },
      { question: "Please ensure that all documents are submitted _____ the deadline.", options: ["until", "since", "by", "from"], answer: "C", explanation: "'by the deadline' means before or at the deadline." },
      { question: "The factory has increased its _____ by 20% this quarter.", options: ["produce", "production", "productive", "productively"], answer: "B", explanation: "A noun is needed after 'its.' 'production' is the noun form." },
      { question: "The hotel offers a complimentary breakfast _____ all guests.", options: ["to", "at", "on", "by"], answer: "A", explanation: "'offers something to someone' is the correct pattern." },
      { question: "Mr. Tanaka will _____ the Singapore office next week.", options: ["visit", "visited", "visiting", "visits"], answer: "A", explanation: "'will' is followed by the base form. 'will visit.'" },
      { question: "The report should be written as _____ as possible.", options: ["clear", "clearer", "clearly", "clarity"], answer: "C", explanation: "'as + adverb + as possible.' 'as clearly as possible.'" },
      { question: "Due to _____ weather conditions, the flight has been canceled.", options: ["severe", "severely", "severity", "severed"], answer: "A", explanation: "An adjective is needed before the noun 'weather conditions.' 'severe' is the adjective." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 6 — Text Completion (B1)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part6-email",
    title: "TOEIC Part 6: Text Completion — Business Email",
    titleVi: "TOEIC Part 6: Hoàn thành đoạn văn — Email công việc",
    level: "B1",
    category: "toeic",
    passage: `From: Sarah Mitchell <s.mitchell@globaltech.com>
To: All Staff
Subject: Office Relocation Update
Date: March 15, 2026

Dear Colleagues,

I am writing to inform you that our office relocation to the new Riverside Tower building is now confirmed for April 14. As previously announced, the move is necessary because our current lease expires at the end of April and the new location offers significantly more space for our growing team.

Over the next few weeks, you will receive detailed instructions about packing your personal belongings and work materials. Packing boxes and labels will be distributed to each department by March 25. Please ensure that all items are clearly labeled with your name, department, and the designated floor in the new building.

The IT department will handle the transfer of all computer equipment. You do not need to disconnect any cables or devices — the IT team will take care of everything. However, please make sure to back up any important files to the cloud drive before April 10, as there may be a brief period of network downtime during the transition.

Parking arrangements at the new building are slightly different. Each employee will be assigned a numbered parking space in the underground garage. If you currently use public transportation, please note that the new office is located directly above Riverside Metro Station, making the commute even more convenient.

A welcome orientation at the new office will be held on April 14 at 9:00 AM in Conference Room A on the 3rd floor. Attendance is mandatory for all staff.

If you have any questions or concerns about the move, please do not hesitate to contact the Facilities Team at facilities@globaltech.com.

Best regards,
Sarah Mitchell
Director of Operations`,
    questions: [
      { question: "Why is the company moving to a new office?", options: ["The current building is being demolished", "The current lease expires and they need more space", "The employees requested a new location", "The rent is cheaper at the new building"], answer: "B", explanation: "'our current lease expires at the end of April and the new location offers significantly more space.'" },
      { question: "When will packing boxes be distributed?", options: ["March 10", "March 15", "March 25", "April 10"], answer: "C", explanation: "'Packing boxes and labels will be distributed to each department by March 25.'" },
      { question: "What should employees do before April 10?", options: ["Pack their belongings", "Disconnect their computers", "Back up important files to the cloud", "Move to the new office"], answer: "C", explanation: "'please make sure to back up any important files to the cloud drive before April 10.'" },
      { question: "Where is the new office located?", options: ["Next to a shopping mall", "Near the airport", "Directly above Riverside Metro Station", "In the suburbs"], answer: "C", explanation: "'the new office is located directly above Riverside Metro Station.'" },
      { question: "What is scheduled for April 14 at 9:00 AM?", options: ["A farewell party", "A welcome orientation", "An IT training session", "A staff meeting"], answer: "B", explanation: "'A welcome orientation at the new office will be held on April 14 at 9:00 AM.'" },
      { question: "Who is handling the transfer of computer equipment?", options: ["Each employee individually", "The Facilities Team", "The IT department", "An external company"], answer: "C", explanation: "'The IT department will handle the transfer of all computer equipment.'" },
      { question: "[Sentence Completion] Each employee will be assigned a numbered parking space in the _____.", options: ["rooftop lot", "street parking area", "underground garage", "visitor section"], answer: "C", explanation: "'assigned a numbered parking space in the underground garage.'" },
      { question: "Who wrote this email?", options: ["The IT Manager", "The CEO", "The Director of Operations", "The Facilities Team"], answer: "C", explanation: "'Sarah Mitchell, Director of Operations.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Single Passage (B1–B2)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-advertisement",
    title: "TOEIC Part 7: Single Passage — Job Advertisement",
    titleVi: "TOEIC Part 7: Đọc hiểu đoạn đơn — Quảng cáo tuyển dụng",
    level: "B1",
    category: "toeic",
    passage: `PACIFIC DYNAMICS — JOB OPENING

Position: Senior Marketing Coordinator
Department: Global Marketing
Location: Ho Chi Minh City, Vietnam (hybrid — 3 days in office, 2 days remote)
Salary: Competitive, commensurate with experience
Application Deadline: April 30, 2026

About Pacific Dynamics:
Pacific Dynamics is a leading technology solutions company operating in 15 countries across the Asia-Pacific region. Founded in 2008, we have grown from a small startup to a team of over 3,000 employees. Our mission is to deliver innovative digital solutions that help businesses thrive in the modern economy.

Role Overview:
We are seeking an experienced and creative Senior Marketing Coordinator to join our Global Marketing team. The successful candidate will be responsible for developing and executing marketing campaigns across multiple channels, managing social media presence, coordinating with regional marketing teams, and analyzing campaign performance data.

Requirements:
• Bachelor's degree in Marketing, Communications, or a related field
• Minimum 5 years of experience in marketing, preferably in the technology sector
• Proven track record of managing multi-channel marketing campaigns
• Strong proficiency in digital marketing tools (Google Analytics, Meta Ads Manager, HubSpot)
• Excellent written and verbal communication skills in English (IELTS 7.0+ or equivalent)
• Experience working in multicultural, cross-functional teams
• Strong analytical skills with the ability to interpret data and make data-driven decisions

Preferred Qualifications:
• Master's degree in Marketing or MBA
• Experience with marketing automation platforms
• Knowledge of the Asia-Pacific market
• Proficiency in Vietnamese, Mandarin, or Japanese is a plus

What We Offer:
• Competitive salary with annual performance bonuses
• Comprehensive health insurance for employees and dependents
• 20 days of annual leave plus 5 personal days
• Professional development budget of $2,000 per year
• Flexible working arrangements (hybrid model)
• Modern office with free gym, cafeteria, and recreational areas
• Annual company retreat

How to Apply:
Send your resume and a cover letter to careers@pacificdynamics.com with the subject line "Senior Marketing Coordinator — [Your Name]." Shortlisted candidates will be contacted within 2 weeks of the application deadline for an initial phone screening, followed by two rounds of in-person interviews.

Pacific Dynamics is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.`,
    questions: [
      { question: "How many days per week is the employee expected to work in the office?", options: ["1 day", "2 days", "3 days", "5 days"], answer: "C", explanation: "'hybrid — 3 days in office, 2 days remote.'" },
      { question: "When was Pacific Dynamics founded?", options: ["2005", "2008", "2010", "2012"], answer: "B", explanation: "'Founded in 2008.'" },
      { question: "What is the minimum work experience required?", options: ["2 years", "3 years", "5 years", "7 years"], answer: "C", explanation: "'Minimum 5 years of experience in marketing.'" },
      { question: "What English proficiency level is required?", options: ["IELTS 5.5+", "IELTS 6.0+", "IELTS 6.5+", "IELTS 7.0+"], answer: "D", explanation: "'IELTS 7.0+ or equivalent.'" },
      { question: "How many days of annual leave does the company offer?", options: ["15 days", "18 days", "20 days", "25 days"], answer: "C", explanation: "'20 days of annual leave plus 5 personal days.'" },
      { question: "What is the professional development budget per year?", options: ["$1,000", "$1,500", "$2,000", "$3,000"], answer: "C", explanation: "'Professional development budget of $2,000 per year.'" },
      { question: "How will shortlisted candidates first be contacted?", options: ["By email", "By mail", "Through a phone screening", "Through a video call"], answer: "C", explanation: "'contacted within 2 weeks... for an initial phone screening.'" },
      { question: "Which of the following is a PREFERRED (not required) qualification?", options: ["5 years of experience", "Bachelor's degree", "Experience with marketing automation platforms", "English proficiency"], answer: "C", explanation: "'Experience with marketing automation platforms' is listed under Preferred Qualifications." },
      { question: "[True / False / Not Given] The company has fewer than 1,000 employees.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'a team of over 3,000 employees.' False." },
      { question: "[True / False / Not Given] The office has a free swimming pool.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions gym, cafeteria, and recreational areas but not a swimming pool. Not Given." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Double Passage (B2)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-double-passage",
    title: "TOEIC Part 7: Double Passage — Hotel Booking",
    titleVi: "TOEIC Part 7: Đọc hiểu đoạn kép — Đặt phòng khách sạn",
    level: "B2",
    category: "toeic",
    passage: `— PASSAGE 1: HOTEL WEBSITE —

GRAND MARINA HOTEL — DA NANG, VIETNAM
⭐⭐⭐⭐⭐ Five-Star Beachfront Resort

Room Types & Rates (per night, including breakfast):
• Deluxe City View: $120 (max 2 guests)
• Premium Ocean View: $185 (max 2 guests)
• Family Suite: $260 (max 4 guests, 2 bedrooms)
• Presidential Suite: $450 (max 4 guests, 3 bedrooms, private pool)

Special Offers:
• Early Bird: Book 60+ days in advance → 25% discount
• Extended Stay: Stay 7+ nights → 15% discount on total
• Business Package: Meeting room + coffee break + lunch for $45/person/day

Check-in: 2:00 PM | Check-out: 11:00 AM
Late check-out until 3:00 PM: $30 | Until 6:00 PM: $60

Cancellation Policy:
• Free cancellation up to 7 days before check-in
• 50% charge for cancellations 3–6 days before check-in
• Full charge for cancellations less than 3 days before check-in

Amenities: Private beach, infinity pool, spa & wellness center, 3 restaurants, airport shuttle ($25 one-way), free Wi-Fi, fitness center, kids' club.

Contact: reservations@grandmarina.vn | +84 236 123 4567

— PASSAGE 2: EMAIL —

From: David Park <d.park@seoulsolutions.kr>
To: reservations@grandmarina.vn
Subject: Reservation Request — May Conference
Date: February 28, 2026

Dear Reservations Team,

I am writing to make a reservation for our company's annual strategy conference. We would like to book the following:

• 8 Premium Ocean View rooms for 5 nights (May 12–17, 2026)
• 2 Family Suites for 5 nights (May 12–17, 2026) — for executives traveling with families
• Business Package for 20 people for 3 days (May 13–15, 2026)
• Airport shuttle for 24 people on May 12 (arrival) and May 17 (departure)

Could you please confirm the total cost and let me know if the Early Bird discount applies, since we are booking more than 60 days in advance? Also, would it be possible to arrange a late check-out until 3:00 PM on May 17 for all rooms?

Additionally, I would like to inquire whether you offer any group discount for bookings of 10 or more rooms.

Thank you for your assistance. I look forward to hearing from you.

Best regards,
David Park
Chief Operating Officer
Seoul Solutions Co., Ltd.`,
    questions: [
      { question: "How much does a Premium Ocean View room cost per night?", options: ["$120", "$150", "$185", "$260"], answer: "C", explanation: "'Premium Ocean View: $185 (max 2 guests).'" },
      { question: "How many rooms in total does David want to book?", options: ["8", "10", "12", "20"], answer: "B", explanation: "8 Premium Ocean View + 2 Family Suites = 10 rooms." },
      { question: "How many nights is the stay?", options: ["3 nights", "4 nights", "5 nights", "7 nights"], answer: "C", explanation: "'5 nights (May 12–17, 2026).'" },
      { question: "Does the Early Bird discount apply to this booking?", options: ["Yes, they booked 60+ days in advance", "No, they booked too late", "Only for some room types", "The passage doesn't provide enough information"], answer: "A", explanation: "Booking date is Feb 28, check-in is May 12. That's about 73 days — more than 60, so the 25% Early Bird discount applies." },
      { question: "What is the cost of the Business Package per person per day?", options: ["$25", "$35", "$45", "$55"], answer: "C", explanation: "'Business Package: Meeting room + coffee break + lunch for $45/person/day.'" },
      { question: "How much would late check-out until 3:00 PM cost for all 10 rooms?", options: ["$30", "$100", "$300", "$600"], answer: "C", explanation: "Late check-out until 3:00 PM is $30 per room × 10 rooms = $300." },
      { question: "What is the total airport shuttle cost for 24 people (round trip)?", options: ["$600", "$1,000", "$1,200", "$1,400"], answer: "C", explanation: "Shuttle is $25 one-way × 24 people × 2 trips = $1,200." },
      { question: "What is David's job title?", options: ["CEO", "CFO", "COO", "CTO"], answer: "C", explanation: "'Chief Operating Officer' = COO." },
      { question: "[True / False / Not Given] The hotel offers a group discount for 10+ rooms.", options: ["True", "False", "Not Given"], answer: "C", explanation: "David asks about it, but the hotel website doesn't mention a group discount. Not Given." },
      { question: "What is the cancellation charge if they cancel on May 8?", options: ["Free", "25% of total", "50% of total", "Full charge"], answer: "C", explanation: "May 8 is 4 days before May 12 check-in (3–6 day range). '50% charge for cancellations 3–6 days before.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TOEIC PART 7 — Triple Passage (B2)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "toeic-part7-triple-passage",
    title: "TOEIC Part 7: Triple Passage — Product Launch",
    titleVi: "TOEIC Part 7: Đọc hiểu ba đoạn — Ra mắt sản phẩm",
    level: "B2",
    category: "toeic",
    passage: `— PASSAGE 1: PRESS RELEASE —

FOR IMMEDIATE RELEASE
March 20, 2026

NEXGEN ELECTRONICS ANNOUNCES SMARTWATCH X1 PRO

Singapore — NexGen Electronics, a leading consumer technology company, today announced the launch of the SmartWatch X1 Pro, the company's most advanced wearable device to date. The SmartWatch X1 Pro features a 1.8-inch AMOLED display, 7-day battery life, built-in GPS, heart rate and blood oxygen monitoring, sleep tracking, and water resistance up to 50 meters.

"The SmartWatch X1 Pro represents a significant leap forward in wearable technology," said CEO Maria Santos. "We've listened to our customers and addressed their top requests: longer battery life, a larger display, and more accurate health monitoring."

The SmartWatch X1 Pro will be available in three colors — Midnight Black, Silver Frost, and Ocean Blue — starting April 15, 2026. Retail price: $299 (Standard Edition) / $399 (Premium Edition with titanium case and sapphire glass).

Pre-orders begin March 25 at nexgen.com and authorized retailers.

Media Contact: press@nexgen.com

— PASSAGE 2: PRODUCT REVIEW —

NexGen SmartWatch X1 Pro Review
By TechDaily — April 20, 2026

Rating: 4.5/5 ⭐

After using the SmartWatch X1 Pro for five days, I can confidently say it lives up to most of its promises. The 1.8-inch AMOLED display is bright, sharp, and easily readable in direct sunlight — a significant improvement over the X1's 1.4-inch screen. Battery life is impressive: with GPS tracking and continuous heart rate monitoring enabled, I consistently got 5 to 6 days of use before needing to recharge, which is close to the advertised 7 days.

Health monitoring features are excellent. The blood oxygen sensor was consistently within 1% of a medical-grade pulse oximeter. Sleep tracking is detailed and accurate, providing breakdowns of light, deep, and REM sleep stages.

However, there are some drawbacks. The watch face is noticeably heavier than competitors like the Apple Watch Series 10 (52g vs 42g). The app ecosystem is still limited compared to Apple and Samsung, with only about 800 compatible apps versus thousands on competing platforms. Also, while NexGen claims the watch is water-resistant to 50 meters, they recommend against swimming with it — which seems contradictory.

Bottom line: The SmartWatch X1 Pro offers outstanding hardware and health features at a competitive price point, but NexGen needs to invest more in its software ecosystem to compete with the big players.

— PASSAGE 3: CUSTOMER EMAIL —

From: James Wu <j.wu@mail.com>
To: support@nexgen.com
Subject: SmartWatch X1 Pro — Warranty Question
Date: May 3, 2026

Dear NexGen Support,

I purchased the SmartWatch X1 Pro (Premium Edition, Ocean Blue) on April 16 from your official website. Order number: NX-20260416-7842.

Yesterday, I noticed that the heart rate monitor occasionally shows readings that seem inaccurate — showing 45 bpm while I was exercising, which is clearly too low. I have restarted the device and updated the firmware to version 2.1.3, but the issue persists.

I would like to know:
1. Is this a known issue, and is a software fix planned?
2. If the device is defective, can I get a replacement under warranty?
3. What is the warranty period for the Premium Edition?

I am otherwise very happy with the watch — the battery life and display are fantastic.

Thank you,
James Wu`,
    questions: [
      { question: "When did pre-orders for the SmartWatch X1 Pro begin?", options: ["March 15", "March 20", "March 25", "April 15"], answer: "C", explanation: "'Pre-orders begin March 25.'" },
      { question: "What is the price difference between Standard and Premium editions?", options: ["$50", "$75", "$100", "$150"], answer: "C", explanation: "$399 - $299 = $100 difference." },
      { question: "How long did the reviewer actually get from the battery?", options: ["3–4 days", "5–6 days", "7 days", "8–9 days"], answer: "B", explanation: "'I consistently got 5 to 6 days of use before needing to recharge.'" },
      { question: "How does the X1 Pro's weight compare to the Apple Watch?", options: ["10g lighter", "Same weight", "10g heavier", "20g heavier"], answer: "C", explanation: "'52g vs 42g' — the X1 Pro is 10g heavier." },
      { question: "How accurate was the blood oxygen sensor compared to medical equipment?", options: ["Within 0.5%", "Within 1%", "Within 3%", "Within 5%"], answer: "B", explanation: "'consistently within 1% of a medical-grade pulse oximeter.'" },
      { question: "What issue is James Wu experiencing?", options: ["The display is cracked", "The battery drains too fast", "The heart rate monitor shows inaccurate readings", "The GPS doesn't work"], answer: "C", explanation: "'the heart rate monitor occasionally shows readings that seem inaccurate.'" },
      { question: "Which edition did James purchase?", options: ["Standard Edition, Midnight Black", "Standard Edition, Ocean Blue", "Premium Edition, Silver Frost", "Premium Edition, Ocean Blue"], answer: "D", explanation: "'Premium Edition, Ocean Blue.'" },
      { question: "What has James already tried to fix the issue?", options: ["Returned the watch", "Contacted a repair shop", "Restarted the device and updated firmware", "Reset to factory settings"], answer: "C", explanation: "'I have restarted the device and updated the firmware to version 2.1.3.'" },
      { question: "[Matching] According to the reviewer, what is the main weakness of the X1 Pro?", options: ["Battery life", "Display quality", "Limited app ecosystem", "Health monitoring accuracy"], answer: "C", explanation: "'NexGen needs to invest more in its software ecosystem' — only 800 apps vs thousands on competitors." },
      { question: "[True / False / Not Given] James bought his watch on the first day it was available in stores.", options: ["True", "False", "Not Given"], answer: "B", explanation: "The watch launched April 15, but James bought on April 16 — one day after launch. False." },
      { question: "How many apps are available for the SmartWatch X1 Pro?", options: ["About 200", "About 500", "About 800", "About 2,000"], answer: "C", explanation: "'only about 800 compatible apps.'" },
      { question: "What is contradictory about the water resistance claim?", options: ["It's not waterproof at all", "50m resistance but they recommend against swimming", "It can only handle rain", "The warranty doesn't cover water damage"], answer: "B", explanation: "'claims the watch is water-resistant to 50 meters, they recommend against swimming with it — which seems contradictory.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — Passage: The History of Timekeeping
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-timekeeping-history",
    title: "IELTS Academic: The History of Timekeeping",
    titleVi: "IELTS Academic: Lịch sử đo thời gian",
    level: "B2",
    category: "ielts",
    passage: `The History of Timekeeping

A. Humans have been measuring time for at least 5,000 years. The earliest known timekeeping devices were sundials, which used the position of the sun's shadow to indicate the time of day. The ancient Egyptians developed some of the first sophisticated sundials around 1500 BCE, dividing daylight into 12 equal parts — the origin of our 12-hour system. However, sundials had obvious limitations: they were useless at night and on cloudy days, and the length of their "hours" varied with the seasons since they divided the actual period of daylight into equal segments regardless of how long that period was.

B. To overcome these limitations, ancient civilizations developed water clocks (clepsydrae), which measured time by the regulated flow of water from or into a vessel. The earliest known water clock dates to approximately 1500 BCE in Egypt. Water clocks could function at night and indoors, making them more versatile than sundials. The ancient Greeks and Romans refined the design considerably, and by the 3rd century BCE, the Greek engineer Ctesibius had created remarkably accurate water clocks that incorporated feedback mechanisms to maintain a constant flow rate. In medieval China, the astronomer Su Song built an elaborate water-clock-driven astronomical tower in 1088 CE that is considered one of the greatest technological achievements of the pre-modern era.

C. The invention of the mechanical clock in medieval Europe — probably in the late 13th century, though the exact date and inventor are unknown — represented a revolutionary breakthrough. Early mechanical clocks used a verge-and-foliot escapement mechanism, which regulated the release of energy from a wound spring or falling weight. These clocks were large, expensive, and initially found only in churches and public towers. They were not particularly accurate, losing or gaining as much as 15 minutes per day, but they transformed society by making timekeeping independent of natural phenomena for the first time.

D. The development of the pendulum clock by Dutch scientist Christiaan Huygens in 1656 dramatically improved accuracy. Galileo Galilei had observed that a pendulum's swing period is nearly constant regardless of its amplitude — a property called isochronism — and Huygens applied this principle to clockmaking. His pendulum clocks were accurate to within about 10 seconds per day, a fifty-fold improvement over existing mechanical clocks. By the 18th century, further refinements had achieved accuracy of about one second per day.

E. The quest for accurate timekeeping was not merely academic; it had enormous practical importance for navigation. At sea, determining longitude required comparing local time (easily established by observing the sun) with the time at a known reference point. An error of just four minutes in timekeeping translated to a one-degree error in longitude — approximately 111 kilometers at the equator. The British Parliament's Longitude Act of 1714 offered a prize of £20,000 (equivalent to several million pounds today) for a solution. English carpenter and clockmaker John Harrison spent decades developing marine chronometers and finally produced the H4 in 1761, a sea clock accurate to within 1.25 seconds per day, which solved the longitude problem and saved countless lives at sea.

F. The 20th century brought two revolutions in timekeeping. Quartz clocks, first developed in 1927 by Warren Marrison at Bell Telephone Laboratories, used the precise vibrations of a quartz crystal (oscillating at 32,768 times per second) to keep time. By the 1970s, quartz technology had been miniaturized into affordable wristwatches that were accurate to within a few seconds per month. The second revolution was the atomic clock, first built in 1955 by Louis Essen at the National Physical Laboratory in England. Atomic clocks measure the natural resonance frequency of atoms — specifically the cesium-133 atom, which oscillates at exactly 9,192,631,770 cycles per second. Modern cesium atomic clocks are accurate to within one second in 300 million years.

G. Today, precise timekeeping underpins much of modern civilization in ways most people rarely consider. Global Positioning System (GPS) satellites carry atomic clocks, and a timing error of just one microsecond would produce a positioning error of approximately 300 meters. Financial markets rely on timestamps accurate to microseconds to sequence trades. Telecommunications networks, power grids, and the internet all depend on precisely synchronized time. The current frontier is optical atomic clocks, which use laser-trapped atoms vibrating at optical frequencies (hundreds of trillions of cycles per second) and are accurate to within one second in 15 billion years — longer than the current age of the universe.`,
    questions: [
      // Matching Heading
      { question: "[Matching] Which paragraph discusses the invention of the pendulum clock?", options: ["Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E"], answer: "C", explanation: "Paragraph D discusses Christiaan Huygens and the pendulum clock (1656)." },
      { question: "[Matching] Which paragraph explains why accurate timekeeping was crucial for sailors?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E explains the longitude problem and John Harrison's marine chronometers." },

      // True / False / Not Given
      { question: "[True / False / Not Given] The ancient Egyptians invented the concept of dividing day into 12 parts.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'dividing daylight into 12 equal parts — the origin of our 12-hour system.' True." },
      { question: "[True / False / Not Given] Ctesibius was a Roman engineer.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'the Greek engineer Ctesibius.' He was Greek, not Roman. False." },
      { question: "[True / False / Not Given] John Harrison was a professional scientist.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'English carpenter and clockmaker John Harrison.' He was a carpenter and clockmaker, not a scientist. False." },
      { question: "[True / False / Not Given] Quartz watches cost more than mechanical watches in the 1970s.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage says quartz watches were 'affordable' but doesn't compare prices directly. Not Given." },

      // Multiple Choice
      { question: "How accurate were early mechanical clocks?", options: ["Within 1 second per day", "Within 1 minute per day", "They could lose or gain up to 15 minutes per day", "Within 10 seconds per day"], answer: "C", explanation: "'losing or gaining as much as 15 minutes per day.'" },
      { question: "How fast does a quartz crystal oscillate?", options: ["1,000 times/sec", "32,768 times/sec", "1 million times/sec", "9.19 billion times/sec"], answer: "B", explanation: "'oscillating at 32,768 times per second.'" },
      { question: "What positioning error would a 1-microsecond GPS timing error cause?", options: ["30 meters", "100 meters", "300 meters", "1 kilometer"], answer: "C", explanation: "'a timing error of just one microsecond would produce a positioning error of approximately 300 meters.'" },

      // Sentence Completion
      { question: "[Sentence Completion] A 4-minute timekeeping error at sea equals a _____ error in longitude.", options: ["Half-degree", "One-degree", "Two-degree", "Five-degree"], answer: "B", explanation: "'An error of just four minutes in timekeeping translated to a one-degree error in longitude.'" },
      { question: "[Sentence Completion] Modern cesium clocks are accurate to within one second in _____ years.", options: ["1 million", "100 million", "300 million", "1 billion"], answer: "C", explanation: "'accurate to within one second in 300 million years.'" },
      { question: "[Sentence Completion] Optical atomic clocks are accurate to one second in _____ years.", options: ["1 billion", "5 billion", "10 billion", "15 billion"], answer: "D", explanation: "'accurate to within one second in 15 billion years.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS GENERAL — Section 2: Workplace Notice
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-general-workplace-safety",
    title: "IELTS General: Workplace Safety Guidelines",
    titleVi: "IELTS General: Quy định an toàn nơi làm việc",
    level: "B1",
    category: "ielts",
    passage: `BRIGHTFIELD MANUFACTURING — WORKPLACE HEALTH & SAFETY GUIDELINES

All employees must read and follow these guidelines. Failure to comply may result in disciplinary action.

PERSONAL PROTECTIVE EQUIPMENT (PPE)
The following PPE must be worn at all times in production areas:
• Hard hat (yellow for general workers, white for supervisors, red for visitors)
• Safety goggles or face shield when operating cutting or grinding machinery
• Steel-toed boots (provided by the company at no charge)
• High-visibility vest
• Ear protection in zones marked with noise warning signs (above 85 decibels)
• Gloves appropriate to the task (heat-resistant for welding, cut-resistant for handling sheet metal)

FIRE SAFETY
• Know the location of fire extinguishers, fire blankets, and emergency exits on your floor
• Fire extinguishers: Red = water (for wood, paper, fabric fires ONLY — never use on electrical or oil fires); Blue = dry powder (suitable for most fire types); Black = CO2 (for electrical fires)
• If you discover a fire: activate the nearest fire alarm, call the emergency number (ext. 999), evacuate via the nearest marked exit. Do NOT use elevators.
• Fire drills are conducted quarterly. All employees must participate.
• Assembly point: Car Park B (north side of the building)

HAZARDOUS MATERIALS
• All chemicals must be stored in the designated chemical storage room (Building 3, Room G-12)
• Material Safety Data Sheets (MSDS) are available in the red binder at each workstation and digitally on the company intranet
• Spill kits are located at the end of each production aisle, marked with yellow signs
• In case of chemical spill: evacuate the immediate area, do NOT attempt to clean large spills yourself, notify the Safety Officer (ext. 112), and follow MSDS instructions for the specific substance

REPORTING INCIDENTS
• ALL workplace injuries, near-misses, and safety concerns must be reported within 24 hours
• Report to your direct supervisor AND submit a digital incident report via SafetyNet (accessible from any company computer)
• A Safety Committee meeting is held on the first Tuesday of every month. Employee representatives are welcome.

FIRST AID
• First aid kits are located in every production area (mounted on walls, marked with green crosses)
• Trained first aiders: Maria Gomez (ext. 245), Tran Van Huy (ext. 318), and Ahmed Khalil (ext. 402)
• For serious injuries, call the emergency services (ext. 999) and the on-site nurse (ext. 300)

EMERGENCY CONTACTS
Internal Emergency: ext. 999
Safety Officer: ext. 112
On-site Nurse: ext. 300
HR Department: ext. 200`,
    questions: [
      { question: "What color hard hat do supervisors wear?", options: ["Yellow", "White", "Red", "Blue"], answer: "B", explanation: "'white for supervisors.'" },
      { question: "At what noise level must ear protection be worn?", options: ["Above 70 decibels", "Above 75 decibels", "Above 80 decibels", "Above 85 decibels"], answer: "D", explanation: "'above 85 decibels.'" },
      { question: "Which fire extinguisher should be used for electrical fires?", options: ["Red (water)", "Blue (dry powder)", "Black (CO2)", "Any type"], answer: "C", explanation: "'Black = CO2 (for electrical fires).'" },
      { question: "Where is the fire drill assembly point?", options: ["The main entrance", "Car Park A", "Car Park B", "The cafeteria"], answer: "C", explanation: "'Assembly point: Car Park B (north side of the building).'" },
      { question: "Where are chemicals stored?", options: ["At each workstation", "Building 3, Room G-12", "The first aid room", "Car Park B"], answer: "B", explanation: "'the designated chemical storage room (Building 3, Room G-12).'" },

      // True / False / Not Given
      { question: "[True / False / Not Given] Employees must pay for their own steel-toed boots.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'provided by the company at no charge.' False." },
      { question: "[True / False / Not Given] Red (water) extinguishers can be used on oil fires.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'never use on electrical or oil fires.' False." },
      { question: "[True / False / Not Given] Safety Committee meetings happen every week.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'the first Tuesday of every month' — monthly, not weekly. False." },

      // Matching
      { question: "[Matching] Who should you call if someone is seriously injured?", options: ["ext. 112 only", "ext. 200 only", "ext. 999 and ext. 300", "ext. 245 only"], answer: "C", explanation: "'For serious injuries, call the emergency services (ext. 999) and the on-site nurse (ext. 300).'" },
      { question: "[Matching] Within what time frame must incidents be reported?", options: ["Immediately", "Within 12 hours", "Within 24 hours", "Within 48 hours"], answer: "C", explanation: "'must be reported within 24 hours.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — Passage: The Psychology of Decision-Making
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-decision-fatigue",
    title: "IELTS Academic: Decision Fatigue",
    titleVi: "IELTS Academic: Mệt mỏi quyết định",
    level: "C1",
    category: "ielts",
    passage: `Decision Fatigue: The Hidden Cost of Making Choices

A. Every day, the average adult makes approximately 35,000 decisions, ranging from trivial choices — what to wear, what to eat for breakfast — to consequential ones involving finances, career, and relationships. While most of these decisions are made automatically by the unconscious mind, a significant number require deliberate cognitive effort. Research in psychology and behavioral science has revealed that this cognitive effort is a depletable resource: the more decisions a person makes, the worse the quality of subsequent decisions becomes. This phenomenon, known as "decision fatigue," has profound implications for personal well-being, professional performance, and even the justice system.

B. The concept of decision fatigue is rooted in the theory of "ego depletion," first proposed by psychologist Roy Baumeister in the late 1990s. Baumeister's research demonstrated that self-control and decision-making draw upon a shared pool of mental energy. In one famous experiment, subjects who were asked to resist eating freshly baked cookies (exercising self-control) subsequently gave up more quickly on unsolvable puzzles compared to those who were allowed to eat the cookies freely. The implication was striking: the act of resisting temptation had consumed mental resources that were then unavailable for persistence on the subsequent task.

C. Perhaps the most alarming evidence of decision fatigue comes from a landmark study of judicial decisions in Israel. Researchers Shai Danziger, Jonathan Levav, and Liora Avnaim-Pesso analyzed 1,112 parole decisions made by eight experienced judges over a ten-month period. They found that the probability of a prisoner receiving a favorable parole ruling dropped from approximately 65% at the beginning of a session to nearly 0% just before a break. After the judges took a food break and rested, the approval rate jumped back to about 65%. The pattern repeated throughout the day. The researchers concluded that as judges' mental resources became depleted, they defaulted to the cognitively easier option — which, in the context of parole decisions, was to deny parole and maintain the status quo.

D. Decision fatigue manifests in several predictable ways. The first is "decision avoidance" — simply postponing or delegating decisions rather than making them. This is why people who have spent the day making difficult choices are more likely to accept the default option when presented with a complex decision in the evening. The second manifestation is "impulsive decision-making" — choosing the option that provides immediate gratification rather than long-term benefit. This explains why dieters are more likely to break their diet in the evening: after a day of willpower-depleting decisions, they lack the mental energy to resist temptation. The third is "decision paralysis," where an overwhelming number of choices leads to anxiety and inaction.

E. The commercial world has become acutely aware of decision fatigue and exploits it strategically. Supermarkets place candy, magazines, and impulse-buy items at checkout counters, knowing that shoppers' willpower is at its lowest after navigating an entire store of choices. Online retailers use limited-time offers and countdown timers to pressure fatigued consumers into quick purchasing decisions. Car dealerships deliberately front-load the buying process with numerous small customization decisions (color, trim, wheels, interior), so that by the time customers reach the costly add-ons (extended warranties, premium sound systems, paint protection), their decision-making capacity is diminished and they are more likely to say yes.

F. Several strategies can mitigate the effects of decision fatigue. Former U.S. President Barack Obama and Facebook founder Mark Zuckerberg famously reduced their daily wardrobe to a limited set of identical outfits to eliminate trivial decisions and preserve mental energy for more important matters. Research supports the effectiveness of making important decisions early in the day, when cognitive resources are at their peak. Establishing routines and habits automates recurring decisions, freeing up mental bandwidth. Meal planning, automated bill payments, and pre-set exercise schedules are practical applications of this principle. Organizations can also help by simplifying choice architectures — reducing the number of options presented to employees and customers, and designing systems with sensible defaults.

G. The study of decision fatigue raises important ethical questions about the design of systems that affect people's lives. If judges' parole decisions are significantly influenced by when they last ate, should the justice system restructure hearing schedules? If consumers are systematically exploited when their willpower is depleted, should regulations limit the use of manipulative marketing techniques? As our understanding of the cognitive limits of decision-making deepens, society must grapple with how to design institutions, policies, and commercial environments that account for — rather than exploit — the fundamental limitations of the human mind.`,
    questions: [
      // Matching Heading
      { question: "[Matching] Which paragraph describes how businesses exploit decision fatigue?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E describes supermarkets, online retailers, and car dealerships exploiting decision fatigue." },
      { question: "[Matching] Which paragraph presents strategies to combat decision fatigue?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F discusses Obama's wardrobe strategy, routines, and simplified choice architectures." },

      // Yes / No / Not Given
      { question: "[Yes / No / Not Given] The author believes decision fatigue has been exaggerated by the media.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage does not discuss media coverage of decision fatigue. Not Given." },
      { question: "[Yes / No / Not Given] Decision fatigue affects both trivial and important choices.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "The passage shows decision fatigue affects everything from parole decisions to diet choices. Yes." },
      { question: "[Yes / No / Not Given] Baumeister's ego depletion theory has been universally accepted.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage does not discuss whether the theory was challenged or universally accepted. Not Given." },

      // Multiple Choice
      { question: "How many decisions does the average adult make daily?", options: ["About 5,000", "About 15,000", "About 35,000", "About 50,000"], answer: "C", explanation: "'the average adult makes approximately 35,000 decisions.'" },
      { question: "What happened in Baumeister's cookie experiment?", options: ["Cookie resisters performed better on puzzles", "Cookie resisters gave up faster on puzzles", "Both groups performed equally", "Cookie eaters refused the puzzles"], answer: "B", explanation: "'subjects who were asked to resist eating freshly baked cookies subsequently gave up more quickly on unsolvable puzzles.'" },
      { question: "What was the parole approval rate just before a break?", options: ["About 25%", "About 35%", "About 50%", "Nearly 0%"], answer: "D", explanation: "'dropped to nearly 0% just before a break.'" },

      // Sentence Completion
      { question: "[Sentence Completion] Car dealerships front-load _____ decisions so customers accept costly add-ons later.", options: ["financial", "small customization", "warranty", "insurance"], answer: "B", explanation: "'front-load the buying process with numerous small customization decisions.'" },
      { question: "[Sentence Completion] The judges' parole approval rate returned to _____ after a food break.", options: ["45%", "55%", "65%", "75%"], answer: "C", explanation: "'the approval rate jumped back to about 65%.'" },

      // Matching Features
      { question: "[Matching] Who reduced their wardrobe to preserve mental energy?", options: ["Roy Baumeister", "Shai Danziger", "Barack Obama and Mark Zuckerberg", "The Israeli judges"], answer: "C", explanation: "'Former U.S. President Barack Obama and Facebook founder Mark Zuckerberg famously reduced their daily wardrobe.'" },
      { question: "[Matching] Who proposed the theory of ego depletion?", options: ["Shai Danziger", "Roy Baumeister", "Barack Obama", "Jonathan Levav"], answer: "B", explanation: "'first proposed by psychologist Roy Baumeister in the late 1990s.'" },
    ],
  },
];

async function main() {
  console.log("Seeding TOEIC + IELTS reading passages...\n");

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
