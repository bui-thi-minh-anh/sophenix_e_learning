import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { kind: string; question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-general-test-5";

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: Riverside Community Swimming Pool — Rules & Information (~600 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt5-swimming-pool",
    title: "Riverside Community Swimming Pool — Rules & Information",
    titleVi: "Hồ bơi cộng đồng Riverside — Quy định & Thông tin",
    level: "B1",
    category: "mock-general",
    passage: [
      "Riverside Community Swimming Pool — Rules & Information",
      "",
      "A. General Information",
      "Riverside Community Swimming Pool is open to all residents of Riverside Borough and neighbouring areas. The pool complex includes a 25-metre main pool (8 lanes), a learner pool (0.9 m depth throughout), and a children's splash area. The facility is managed by Riverside Leisure Trust, a registered charity. All visitors must check in at reception before entering the pool area. Day passes and membership packages are available.",
      "",
      "B. Membership & Pricing",
      "Annual membership costs £420 for adults, £240 for concessions (students, seniors over 65, and registered disabled persons), and £150 for juniors (aged 5–17). Children under 5 swim free when accompanied by a paying adult. Family membership (2 adults + up to 3 juniors) costs £960 per year. Non-members may purchase day passes at £8.50 for adults and £5.00 for juniors. All memberships include unlimited access to the gym and fitness classes.",
      "",
      "C. Opening Hours",
      "Monday to Friday: 6:00–21:30. Saturday: 7:00–20:00. Sunday and public holidays: 8:00–18:00. Lane swimming is available Monday to Friday from 6:00 to 9:00 and from 18:00 to 21:30, and Saturday from 7:00 to 9:00. The learner pool and splash area are open during all general sessions but close 30 minutes before the facility closes.",
      "",
      "D. Pool Rules",
      "All swimmers must shower before entering any pool. Outdoor shoes are not permitted on the poolside. Swimming caps are required in the main pool at all times but optional in the learner pool. Diving is prohibited except during supervised diving sessions on Wednesday evenings (19:00–20:30). Running on the poolside is strictly forbidden. Children under 8 must be accompanied in the water by a responsible adult (aged 18+), with a maximum ratio of one adult to two children. Infants who are not toilet-trained must wear approved swim nappies.",
      "",
      "E. Swim Lessons",
      "The pool offers group swimming lessons for all ages and abilities. Junior lessons (Stage 1–7) run on Saturdays from 9:30 to 12:30 in 30-minute sessions. Adult beginner and improver classes are held on Tuesday and Thursday evenings from 19:30 to 20:15. Private one-to-one lessons can be booked at £35 per 30-minute session (minimum 4-session block). All instructors hold Swim England Level 2 Teaching qualifications or above.",
      "",
      "F. Safety & Emergencies",
      "At least two qualified lifeguards are on duty during all public swimming sessions. If the continuous alarm sounds, all swimmers must leave the water immediately and follow staff instructions. Floats, kickboards, and pull buoys are available poolside for training purposes but inflatable toys, snorkels, and fins are not permitted during public sessions. The pool has a defibrillator located at the main reception desk and another at the poolside first-aid station.",
      "",
      "G. Feedback & Complaints",
      "We welcome feedback from all users. Comment cards are available at reception, or you may email feedback@riversidepool.org.uk. Formal complaints will receive a written response within 10 working days. The pool's User Advisory Panel meets quarterly and is open to all members — meeting dates are posted on the main noticeboard and the website."
    ].join("\n"),
    questions: [
      // Q1–Q5: MCQ
      { kind: "mcq", question: "How deep is the learner pool?", options: ["0.6 m", "0.9 m", "1.2 m", "1.5 m"], answer: "B", explanation: "Section A states the learner pool is '0.9 m depth throughout.'" },
      { kind: "mcq", question: "How much does a junior annual membership cost?", options: ["£100", "£120", "£150", "£180"], answer: "C", explanation: "Section B: '£150 for juniors (aged 5–17).'" },
      { kind: "mcq", question: "What is the maximum adult-to-child ratio in the water for children under 8?", options: ["1 adult to 1 child", "1 adult to 2 children", "1 adult to 3 children", "2 adults to 3 children"], answer: "B", explanation: "Section D: 'a maximum ratio of one adult to two children.'" },
      { kind: "mcq", question: "How much does a private one-to-one swimming lesson cost?", options: ["£25 per session", "£30 per session", "£35 per session", "£40 per session"], answer: "C", explanation: "Section E: '£35 per 30-minute session.'" },
      { kind: "mcq", question: "When does the pool open on Sundays?", options: ["6:00", "7:00", "8:00", "9:00"], answer: "C", explanation: "Section C: 'Sunday and public holidays: 8:00–18:00.'" },
      // Q6–Q10: TFNG
      { kind: "tfng", question: "[True / False / Not Given] Swimming caps must be worn in both the main pool and the learner pool.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section D says caps are 'required in the main pool at all times but optional in the learner pool.' So they are NOT required in both pools. False." },
      { kind: "tfng", question: "[True / False / Not Given] Non-members can use the gym facilities by purchasing a day pass.", options: ["True", "False", "Not Given"], answer: "C", explanation: "Section B says 'All memberships include unlimited access to the gym and fitness classes.' Day passes mention only swimming. Whether day-pass holders can use the gym is not stated. Not Given." },
      { kind: "tfng", question: "[True / False / Not Given] Diving is completely banned at Riverside pool.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section D: 'Diving is prohibited except during supervised diving sessions on Wednesday evenings.' It is not completely banned. False." },
      { kind: "tfng", question: "[True / False / Not Given] The pool has more than one defibrillator.", options: ["True", "False", "Not Given"], answer: "A", explanation: "Section F: 'a defibrillator located at the main reception desk and another at the poolside first-aid station.' Two defibrillators means more than one. True." },
      { kind: "tfng", question: "[True / False / Not Given] The User Advisory Panel meets every month.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section G: 'meets quarterly' — i.e. every three months, not every month. False." },
      // Q11–Q13: Matching Information
      { kind: "matching-information", question: "Which section mentions the qualifications required for swimming instructors?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "E", explanation: "Section E: 'All instructors hold Swim England Level 2 Teaching qualifications or above.'" },
      { kind: "matching-information", question: "Which section describes what to do when an alarm sounds?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "F", explanation: "Section F: 'If the continuous alarm sounds, all swimmers must leave the water immediately and follow staff instructions.'" },
      { kind: "matching-information", question: "Which section explains how long formal complaints take to be answered?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "G", explanation: "Section G: 'Formal complaints will receive a written response within 10 working days.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Workplace Health and Safety Procedures (~650 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt5-workplace-safety",
    title: "Workplace Health and Safety Procedures",
    titleVi: "Quy trình An toàn và Sức khỏe nơi Làm việc",
    level: "B2",
    category: "mock-general",
    passage: [
      "Workplace Health and Safety Procedures",
      "",
      "A. Purpose and Scope",
      "This document outlines the health and safety procedures that apply to all employees, contractors, and visitors at Hartfield Manufacturing Ltd. Compliance with these procedures is mandatory and forms part of every employee's contractual obligations. Failure to follow safety procedures may result in disciplinary action, up to and including dismissal. The company is committed to maintaining a safe working environment in accordance with the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999.",
      "",
      "B. Responsibilities",
      "The Health and Safety Manager is responsible for conducting site-wide risk assessments, updating safety policies annually, and coordinating emergency drills. Department supervisors must ensure that all team members have completed mandatory safety training before commencing work. Individual employees are responsible for reporting hazards promptly, wearing prescribed Personal Protective Equipment (PPE), and following safe working practices at all times. Visitors must be escorted by a designated employee and must sign in and out at reception.",
      "",
      "C. Risk Assessment and Reporting",
      "All workplace activities must be subject to a formal risk assessment before they begin. Risk assessments must be reviewed whenever there is a significant change in the process, equipment, or personnel involved. Any employee who identifies a new hazard or near-miss incident must report it within 24 hours using the online Hazard Report Form (accessible via the company intranet). Near-miss reports are treated confidentially and no disciplinary action will be taken against an employee for reporting a genuine safety concern in good faith. The Health and Safety Committee reviews all hazard reports at its fortnightly meetings.",
      "",
      "D. Personal Protective Equipment",
      "Appropriate PPE must be worn in all designated areas. In the production hall, this includes steel-toe-capped boots, safety goggles, high-visibility vests, and ear defenders where noise levels exceed 85 decibels. In the chemical storage area, nitrile gloves and full-face respirators are mandatory. The company provides all required PPE free of charge. Employees must inspect their PPE before each use and report any damaged or worn equipment to their supervisor immediately. Replacement PPE will be issued within one working day of a request.",
      "",
      "E. Fire Safety",
      "Fire exits are marked with green signs and must remain unobstructed at all times. Fire extinguishers are located at intervals of no more than 30 metres throughout all buildings. The company conducts a full fire evacuation drill every six months; all personnel must participate. On hearing the fire alarm, employees should stop work immediately, leave the building by the nearest safe exit without collecting personal belongings, and assemble at the designated muster point in the north car park. Fire wardens on each floor will conduct a headcount. No one may re-enter the building until the all-clear is given by the fire brigade or the Health and Safety Manager.",
      "",
      "F. First Aid",
      "Trained first-aiders are available on every shift. First-aid kits are located in each department — their positions are indicated on the floor plan displayed in every corridor. Any workplace injury, however minor, must be recorded in the Accident Book, which is kept at the main reception and in the production supervisor's office. Injuries that result in an employee being unable to work for more than seven consecutive days must be reported to the Health and Safety Executive under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013).",
      "",
      "G. Training",
      "All new employees must complete a one-day health and safety induction within their first week of employment. This induction covers fire safety, manual handling, hazard communication, and emergency procedures. Department-specific training — such as operating machinery, working at height, or handling hazardous substances — must be completed before the employee begins the relevant tasks. Refresher training is required every 12 months. Training records are maintained by the Human Resources department and are subject to audit by external inspectors."
    ].join("\n"),
    questions: [
      // Q1–Q4: MCQ
      { kind: "mcq", question: "What legislation is specifically mentioned as governing workplace safety?", options: ["Employment Rights Act 1996", "Health and Safety at Work Act 1974", "Equality Act 2010", "Factories Act 1961"], answer: "B", explanation: "Section A: 'in accordance with the Health and Safety at Work Act 1974.'" },
      { kind: "mcq", question: "How often does the Health and Safety Committee meet?", options: ["Weekly", "Fortnightly", "Monthly", "Quarterly"], answer: "B", explanation: "Section C: 'The Health and Safety Committee reviews all hazard reports at its fortnightly meetings.'" },
      { kind: "mcq", question: "At what noise level must ear defenders be worn?", options: ["Over 75 decibels", "Over 80 decibels", "Over 85 decibels", "Over 90 decibels"], answer: "C", explanation: "Section D: 'ear defenders where noise levels exceed 85 decibels.'" },
      { kind: "mcq", question: "How often are full fire evacuation drills conducted?", options: ["Every three months", "Every six months", "Every nine months", "Every twelve months"], answer: "B", explanation: "Section E: 'a full fire evacuation drill every six months.'" },
      // Q5–Q9: TFNG
      { kind: "tfng", question: "[True / False / Not Given] Contractors are exempt from these health and safety procedures.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section A: 'apply to all employees, contractors, and visitors.' Contractors are included, not exempt. False." },
      { kind: "tfng", question: "[True / False / Not Given] Employees who report hazards in good faith may face disciplinary action.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section C: 'no disciplinary action will be taken against an employee for reporting a genuine safety concern in good faith.' False." },
      { kind: "tfng", question: "[True / False / Not Given] Employees must pay a deposit for replacement PPE.", options: ["True", "False", "Not Given"], answer: "C", explanation: "Section D says the company provides PPE 'free of charge' and replacement is 'issued within one working day,' but no deposit is mentioned. Not Given." },
      { kind: "tfng", question: "[True / False / Not Given] During a fire drill, employees should collect personal belongings before evacuating.", options: ["True", "False", "Not Given"], answer: "B", explanation: "Section E: 'leave the building by the nearest safe exit without collecting personal belongings.' False." },
      { kind: "tfng", question: "[True / False / Not Given] Injuries requiring more than seven consecutive days off work must be reported to the HSE.", options: ["True", "False", "Not Given"], answer: "A", explanation: "Section F: 'Injuries that result in an employee being unable to work for more than seven consecutive days must be reported to the Health and Safety Executive.' True." },
      // Q10–Q13: Matching Information
      { kind: "matching-information", question: "Which section mentions the consequences of failing to follow safety procedures?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "A", explanation: "Section A: 'Failure to follow safety procedures may result in disciplinary action, up to and including dismissal.'" },
      { kind: "matching-information", question: "Which section explains who is responsible for ensuring team members complete safety training?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "B", explanation: "Section B: 'Department supervisors must ensure that all team members have completed mandatory safety training.'" },
      { kind: "matching-information", question: "Which section states where the Accident Book is kept?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "F", explanation: "Section F: 'the Accident Book, which is kept at the main reception and in the production supervisor's office.'" },
      { kind: "matching-information", question: "Which section specifies how quickly replacement PPE is provided?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "D", explanation: "Section D: 'Replacement PPE will be issued within one working day of a request.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Science of Sleep (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt5-science-of-sleep",
    title: "The Science of Sleep",
    titleVi: "Khoa học về Giấc ngủ",
    level: "C1",
    category: "mock-general",
    passage: [
      "The Science of Sleep",
      "",
      "A. For most of human history, sleep was regarded as a passive state — a period of inactivity during which the body and mind simply shut down. It was not until the mid-twentieth century that researchers began to uncover the extraordinary complexity of what happens during sleep. Far from being a time of dormancy, sleep is now understood to be a highly active neurological process essential for physical health, cognitive function, emotional regulation, and even survival itself. Despite spending roughly one-third of our lives asleep, many of the mechanisms underlying sleep remain incompletely understood, making it one of the most active frontiers in neuroscience.",
      "",
      "B. Sleep is governed by two principal regulatory systems. The first is the circadian rhythm — an internal biological clock that operates on an approximately 24-hour cycle and is located in a tiny cluster of neurons in the hypothalamus called the suprachiasmatic nucleus (SCN). The SCN responds primarily to light signals received through the eyes, which is why exposure to bright light in the evening — particularly the blue-spectrum light emitted by screens — can delay the onset of sleep. The second regulatory mechanism is the homeostatic sleep drive, which is essentially the body's accumulated need for sleep. The longer a person remains awake, the greater the pressure to sleep becomes. This pressure is thought to be mediated in part by the gradual accumulation of a chemical called adenosine in the brain, which caffeine blocks by occupying the same neural receptors.",
      "",
      "C. A typical night's sleep consists of four to six cycles, each lasting approximately 90 minutes. Each cycle contains distinct stages. Non-rapid eye movement (NREM) sleep comprises three stages of progressively deeper sleep: Stage 1, a brief transitional period during which the sleeper can be easily awakened; Stage 2, characterised by sleep spindles and K-complexes, which are believed to play a role in memory consolidation; and Stage 3, also known as slow-wave sleep, during which the brain produces large, rhythmic delta waves. Slow-wave sleep is the deepest and most restorative stage, and it predominates during the first half of the night. Rapid eye movement (REM) sleep, by contrast, becomes longer and more frequent in the second half of the night. During REM sleep, the brain is almost as active as during wakefulness, and most vivid dreaming occurs. The body, however, is temporarily paralysed — a state known as muscle atonia — which prevents the sleeper from physically acting out dreams.",
      "",
      "D. The consequences of insufficient sleep are far-reaching and increasingly well documented. In the short term, even modest sleep deprivation — sleeping six hours instead of eight — impairs attention, reaction time, decision-making, and emotional control. A landmark study by researchers at the University of Pennsylvania found that participants who slept six hours per night for 14 consecutive days showed cognitive deficits equivalent to those of someone who had been totally sleep-deprived for 48 hours, yet crucially, the participants themselves believed they had adapted and were functioning normally. This subjective unawareness of impairment is one of the most dangerous aspects of chronic sleep loss. In the longer term, habitual sleep deprivation is associated with increased risk of obesity, type 2 diabetes, cardiovascular disease, weakened immune function, and mental health disorders including depression and anxiety. Epidemiological studies have found that adults who consistently sleep fewer than six hours per night have a 12% higher risk of premature mortality compared with those who sleep seven to eight hours.",
      "",
      "E. The relationship between sleep and memory has been extensively studied. Research demonstrates that sleep plays a critical role in consolidating memories — transferring information from short-term to long-term storage. Different stages of sleep appear to serve different memory functions: slow-wave sleep is particularly important for declarative memory (facts and events), while REM sleep is more closely linked to procedural memory (skills and habits) and emotional memory processing. A study conducted at Harvard Medical School asked participants to learn a complex finger-tapping sequence and then tested their performance after a period of sleep or an equivalent period of wakefulness. Those who slept showed a 20% improvement in speed and a 35% improvement in accuracy, while those who remained awake showed no significant improvement. Intriguingly, the degree of improvement correlated specifically with the amount of Stage 2 NREM sleep obtained.",
      "",
      "F. Sleep disorders affect a substantial proportion of the population and can have severe consequences. Insomnia — difficulty falling or staying asleep — affects approximately 30% of adults to some degree, with about 10% experiencing chronic insomnia lasting three months or more. Obstructive sleep apnoea, in which the airway repeatedly collapses during sleep, affects an estimated 4% of men and 2% of women and is strongly associated with obesity. If left untreated, sleep apnoea increases the risk of hypertension, stroke, and heart failure. Other conditions, such as narcolepsy, restless legs syndrome, and circadian rhythm disorders, are less common but can be profoundly debilitating.",
      "",
      "G. Despite growing scientific understanding of sleep, modern lifestyles increasingly work against it. Artificial lighting, shift work, long working hours, and the pervasive use of electronic devices have contributed to what many sleep scientists describe as a global sleep deprivation epidemic. The World Health Organisation has classified night-shift work as a probable carcinogen due to its disruption of circadian rhythms. Public health campaigns advocating for better sleep hygiene — such as maintaining a consistent sleep schedule, limiting caffeine after midday, reducing screen exposure before bed, and keeping bedrooms cool and dark — have gained prominence, but changing deeply ingrained cultural attitudes that equate busyness with productivity and sleep with laziness remains a formidable challenge."
    ].join("\n"),
    questions: [
      // Q1–Q7: Matching Headings
      { kind: "matching-headings", question: "Choose the correct heading for Section A.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "C", explanation: "Section A describes how sleep was historically viewed as passive and how modern science revealed its complexity — 'An evolving understanding of sleep.'" },
      { kind: "matching-headings", question: "Choose the correct heading for Section B.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "F", explanation: "Section B explains the circadian rhythm and homeostatic sleep drive — the two systems that regulate sleep." },
      { kind: "matching-headings", question: "Choose the correct heading for Section C.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "D", explanation: "Section C describes NREM stages 1–3 and REM sleep within a 90-minute cycle — 'The stages of a sleep cycle.'" },
      { kind: "matching-headings", question: "Choose the correct heading for Section D.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "H", explanation: "Section D details impaired cognition, chronic disease risks, and increased mortality from poor sleep — 'Physical and mental consequences of poor sleep.'" },
      { kind: "matching-headings", question: "Choose the correct heading for Section E.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "E", explanation: "Section E discusses how sleep consolidates declarative and procedural memories — 'Sleep's role in learning and memory.'" },
      { kind: "matching-headings", question: "Choose the correct heading for Section F.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "I", explanation: "Section F covers insomnia, sleep apnoea, narcolepsy and their statistics — 'Sleep disorders and their prevalence.'" },
      { kind: "matching-headings", question: "Choose the correct heading for Section G.", options: ["The financial cost of sleep disorders", "Why we underestimate sleep loss", "An evolving understanding of sleep", "The stages of a sleep cycle", "Sleep's role in learning and memory", "How the body regulates sleep", "The modern threat to healthy sleep", "Physical and mental consequences of poor sleep", "Sleep disorders and their prevalence", "Common myths about dreaming"], answer: "G", explanation: "Section G discusses artificial lighting, shift work, screen use, and the WHO carcinogen classification — 'The modern threat to healthy sleep.'" },
      // Q8–Q11: Fill-in-the-blank
      { kind: "fill-blank", question: "The internal body clock is located in a part of the brain called the ___.", options: [], answer: "suprachiasmatic nucleus|SCN|suprachiasmatic nucleus (SCN)", explanation: "Section B: 'located in a tiny cluster of neurons in the hypothalamus called the suprachiasmatic nucleus (SCN).'" },
      { kind: "fill-blank", question: "Caffeine promotes wakefulness by blocking the neural receptors normally used by ___.", options: [], answer: "adenosine|Adenosine", explanation: "Section B: 'the gradual accumulation of a chemical called adenosine in the brain, which caffeine blocks by occupying the same neural receptors.'" },
      { kind: "fill-blank", question: "During REM sleep, the body is prevented from acting out dreams by a state called ___.", options: [], answer: "muscle atonia|atonia|Muscle atonia", explanation: "Section C: 'a state known as muscle atonia — which prevents the sleeper from physically acting out dreams.'" },
      { kind: "fill-blank", question: "The World Health Organisation has classified night-shift work as a probable ___.", options: [], answer: "carcinogen|Carcinogen", explanation: "Section G: 'classified night-shift work as a probable carcinogen due to its disruption of circadian rhythms.'" },
      // Q12–Q14: YNNG (opinion/claim-based)
      { kind: "ynng", question: "[Yes / No / Not Given] The writer believes that people who are chronically sleep-deprived are accurate judges of their own impairment.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "Section D: The writer describes subjective unawareness of impairment as 'one of the most dangerous aspects of chronic sleep loss,' clearly implying people are NOT accurate judges. No." },
      { kind: "ynng", question: "[Yes / No / Not Given] The writer considers sleep apnoea to be more dangerous than insomnia.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "Section F discusses both conditions and their consequences but does not explicitly compare their relative danger. Not Given." },
      { kind: "ynng", question: "[Yes / No / Not Given] The writer suggests that cultural attitudes towards sleep are a significant barrier to improving public health.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "Section G: 'changing deeply ingrained cultural attitudes that equate busyness with productivity and sleep with laziness remains a formidable challenge.' The writer clearly views this as a significant barrier. Yes." },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 980 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 980 + passages.indexOf(p) },
    });
    await prisma.readingQuestion.deleteMany({ where: { passageId: passage.id } });
    for (let q = 0; q < p.questions.length; q++) {
      const qn = p.questions[q];
      await prisma.readingQuestion.create({
        data: { passageId: passage.id, kind: qn.kind, question: qn.question, options: qn.options, answer: qn.answer, explanation: qn.explanation, order: q },
      });
    }
    passageIds.push(passage.id);
    console.log("  OK [" + p.level + "] " + p.slug + " (" + wc + " words, " + p.questions.length + " questions)");
  }

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: "IELTS General Training Reading — Test 5", titleVi: "IELTS General Training Reading — Đề 5", type: "general", difficulty: "hard", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training Reading — Test 5", titleVi: "IELTS General Training Reading — Đề 5", type: "general", difficulty: "hard", timeMinutes: 60, order: 11 },
  });
  console.log("\n  OK Exam: " + exam.slug);

  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log("Done! 3 passages (" + passages.reduce((s, p) => s + p.questions.length, 0) + " questions)");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
