import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { kind: string; question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-general-test-7";

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: Apartment Building Regulations (~600 words, B1, 13 questions)
  // Section 1 — Practical/everyday
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt7-apartment-regulations",
    title: "Apartment Building Regulations",
    titleVi: "Quy định toà nhà chung cư",
    level: "B1",
    category: "mock-general",
    passage: [
      "Apartment Building Regulations",
      "",
      "Riverside Court — Rules and Information for All Residents",
      "",
      "A. General Conduct",
      "All residents and their guests are expected to behave in a considerate manner at all times. Excessive noise — including loud music, television, and power tools — is prohibited between 22:00 and 08:00 on weekdays and between 23:00 and 09:00 on weekends and public holidays. Residents must not leave personal belongings in shared corridors, stairwells, or the entrance lobby, as this constitutes a fire safety hazard. The building management reserves the right to remove any items left in communal areas without prior notice.",
      "",
      "B. Waste Disposal",
      "General household waste must be placed in the large grey bins located in the bin store on the ground floor. Recycling should be separated into blue bins (paper and cardboard), green bins (glass and metal), and orange bags (plastics). The bin store is accessible between 07:00 and 22:00 daily. Bulky items such as furniture and large appliances must not be left in the bin store; instead, residents should arrange a special collection through the local council, which charges £25 per collection of up to three items. Failure to follow waste disposal rules may result in a cleaning surcharge of £50 added to the next service charge invoice.",
      "",
      "C. Parking and Bicycles",
      "Each apartment is allocated one parking space in the underground car park. Visitor parking is available on a first-come, first-served basis in bays marked 'V' and is limited to a maximum of 48 hours. Vehicles parked beyond this limit or in unauthorised spaces may be clamped, with a release fee of £120. Bicycles must be stored in the designated bicycle racks on Level -1 and must not be brought into apartments or left chained to external railings. The building provides 40 bicycle spaces; additional spaces can be requested from the management office at a monthly fee of £15.",
      "",
      "D. Pets",
      "Residents may keep a maximum of two domestic pets (cats or small dogs under 10 kg) provided they have obtained written approval from the management office before the animal is brought onto the premises. Dogs must be kept on a lead in all communal areas and must not be left unattended on balconies. Pet owners are responsible for immediately cleaning up after their animals. Exotic pets, including reptiles, birds, and rodents, are not permitted under any circumstances.",
      "",
      "E. Maintenance and Repairs",
      "Residents are responsible for maintenance within their own apartments, including plumbing fixtures, internal doors, and appliances. The building management is responsible for communal areas, the building exterior, and shared systems such as lifts, entry phones, and central heating. To report a maintenance issue in a communal area, residents should submit a request through the online portal at www.riversidecourt.co.uk/maintenance or call the management office on 020 7946 0123 during office hours (Monday to Friday, 09:00–17:00). Emergency repairs outside office hours should be reported to the 24-hour hotline on 020 7946 0199.",
      "",
      "F. Security",
      "The main entrance is secured by an electronic key fob system. Each apartment receives two key fobs; replacements cost £35 each. Residents must not prop open external doors or allow unidentified individuals to enter the building. CCTV cameras operate in the car park, entrance lobby, and all corridors. Footage is retained for 30 days. Any security concerns should be reported to the management office immediately.",
      "",
      "G. Alterations and Improvements",
      "Residents who wish to carry out structural alterations, including removing or building internal walls, installing new flooring, or modifying plumbing and electrical systems, must obtain written consent from the freeholder before commencing work. Applications should be submitted at least six weeks in advance and must include detailed plans prepared by a qualified professional. A non-refundable administration fee of £150 applies to all alteration applications. Minor cosmetic changes such as painting, wallpapering, and replacing light fittings do not require permission."
    ].join("\n"),
    questions: [
      // Q1–Q7: Matching Information — "Which section (A–G) mentions the following?"
      { kind: "matching-information", question: "Which section mentions a fee for having an item removed from an unauthorised location?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "C", explanation: "Section C states a clamped vehicle has a release fee of £120." },
      { kind: "matching-information", question: "Which section mentions a penalty added to a regular bill?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "B", explanation: "Section B mentions 'a cleaning surcharge of £50 added to the next service charge invoice.'" },
      { kind: "matching-information", question: "Which section mentions obtaining approval before bringing something into the building?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "D", explanation: "Section D requires 'written approval from the management office before the animal is brought onto the premises.'" },
      { kind: "matching-information", question: "Which section mentions a service available at all hours?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "E", explanation: "Section E mentions 'the 24-hour hotline on 020 7946 0199.'" },
      { kind: "matching-information", question: "Which section mentions the right to dispose of residents' property?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "A", explanation: "Section A states 'The building management reserves the right to remove any items left in communal areas without prior notice.'" },
      { kind: "matching-information", question: "Which section mentions how long recorded visual data is kept?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "F", explanation: "Section F states 'Footage is retained for 30 days.'" },
      { kind: "matching-information", question: "Which section mentions the need for documentation prepared by a specialist?", options: ["A", "B", "C", "D", "E", "F", "G"], answer: "G", explanation: "Section G requires 'detailed plans prepared by a qualified professional.'" },
      // Q8–Q13: MCQ
      { kind: "mcq", question: "On a Saturday night, noise restrictions begin at:", options: ["21:00", "22:00", "23:00", "00:00"], answer: "C", explanation: "'between 23:00 and 09:00 on weekends and public holidays.'" },
      { kind: "mcq", question: "What is the cost of a bulky item collection by the council?", options: ["£15 per item", "£25 for up to three items", "£35 per collection", "£50 per item"], answer: "B", explanation: "'£25 per collection of up to three items.'" },
      { kind: "mcq", question: "Visitor parking is permitted for a maximum of:", options: ["24 hours", "36 hours", "48 hours", "72 hours"], answer: "C", explanation: "'limited to a maximum of 48 hours.'" },
      { kind: "mcq", question: "Which type of pet is completely prohibited?", options: ["Cats", "Small dogs under 10 kg", "Birds", "No pets are prohibited"], answer: "C", explanation: "'Exotic pets, including reptiles, birds, and rodents, are not permitted under any circumstances.'" },
      { kind: "mcq", question: "How much does a replacement key fob cost?", options: ["£15", "£25", "£35", "£50"], answer: "C", explanation: "'replacements cost £35 each.'" },
      { kind: "mcq", question: "Which of the following home improvements does NOT require permission?", options: ["Removing an internal wall", "Installing new flooring", "Replacing light fittings", "Modifying the plumbing"], answer: "C", explanation: "'Minor cosmetic changes such as painting, wallpapering, and replacing light fittings do not require permission.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Volunteer Programme Handbook (~650 words, B2, 13 questions)
  // Section 2 — Work-related
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt7-volunteer-programme",
    title: "Volunteer Programme Handbook",
    titleVi: "Sổ tay chương trình tình nguyện",
    level: "B2",
    category: "mock-general",
    passage: [
      "Volunteer Programme Handbook",
      "",
      "Greenway Community Trust — Volunteer Guide 2025–2026",
      "",
      "A. Welcome and Mission",
      "Thank you for joining the Greenway Community Trust volunteer programme. Our mission is to strengthen community bonds by providing essential support services to vulnerable residents across the borough. Since our founding in 2003, over 4,500 volunteers have contributed more than 180,000 hours of service. As a volunteer, you are a vital part of this work, and we are committed to ensuring your experience is rewarding, safe, and well-supported.",
      "",
      "B. Volunteer Roles",
      "We offer a range of volunteer roles to suit different skills, interests, and availability. Current roles include: befriending visitors (weekly one-hour visits to isolated elderly residents), community drivers (transporting residents to medical appointments using Trust vehicles), food bank assistants (sorting donations, packing parcels, and distributing food every Wednesday and Saturday), youth mentors (supporting young people aged 14–18 through structured mentoring sessions), and event coordinators (helping to plan and run community events throughout the year). New roles are added regularly based on community need; check our website for updates.",
      "",
      "C. Commitment and Scheduling",
      "We ask all volunteers to commit to a minimum of three months and to provide at least four hours of service per week. We understand that personal circumstances change, so if you need to reduce your hours or take a temporary break, please inform your volunteer coordinator at least two weeks in advance. Volunteers who are absent without notice for three consecutive scheduled sessions may have their placement reviewed. Scheduling is managed through the VolTime app, which allows you to view available shifts, book sessions, swap shifts with other volunteers, and log your hours.",
      "",
      "D. Training and Development",
      "All new volunteers must complete a mandatory induction session before starting their placement. This three-hour session covers safeguarding, health and safety, data protection, and the Trust's code of conduct. Role-specific training is provided for positions that require additional skills — for example, community drivers must complete a driver assessment and a four-hour first aid course, while youth mentors attend a two-day mentoring skills workshop. We also offer optional professional development opportunities, including workshops on communication skills, conflict resolution, and mental health first aid. Volunteers who complete 200 hours of service receive a formal certificate of achievement and a detailed reference letter.",
      "",
      "E. Expenses and Benefits",
      "Volunteering with us should not cost you money. We reimburse reasonable travel expenses up to a maximum of £20 per session upon submission of receipts through the VolTime app. Community drivers receive a mileage allowance of 45p per mile for any journeys made in their personal vehicles on Trust business. Meal expenses are not covered, but free tea, coffee, and biscuits are available at all Trust premises. All volunteers receive a Greenway discount card offering 10% off at participating local businesses.",
      "",
      "F. Health, Safety, and Insurance",
      "The Trust takes health and safety seriously. All volunteers are covered by our public liability insurance while carrying out authorised activities. You must report any accidents, incidents, or near-misses to your coordinator immediately and complete an incident report form within 24 hours. If you have a medical condition or disability that may affect your ability to carry out your role, please disclose this during your application so that we can make appropriate adjustments. Fire evacuation procedures are displayed in all Trust buildings; familiarise yourself with the nearest exits on your first visit.",
      "",
      "G. Ending Your Placement",
      "If you decide to stop volunteering, we ask that you give at least two weeks' notice so that we can arrange cover for your role. Before leaving, you should return any Trust property, including ID badges, keys, and uniforms. We value feedback from all volunteers, and you will be invited to complete an exit survey to help us improve the programme. Volunteers who leave in good standing are welcome to return at any time without repeating the full induction, provided they return within 12 months of their departure."
    ].join("\n"),
    questions: [
      // Q14–Q20: TFNG
      { kind: "tfng", question: "The Greenway Community Trust was established more than twenty years ago.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'Since our founding in 2003' — 2003 to 2025 is 22 years, which is more than twenty." },
      { kind: "tfng", question: "Food bank distribution takes place three times per week.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'distributing food every Wednesday and Saturday' — that is twice per week, not three times." },
      { kind: "tfng", question: "Volunteers must inform their coordinator at least one month before reducing hours.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'please inform your volunteer coordinator at least two weeks in advance' — two weeks, not one month." },
      { kind: "tfng", question: "The VolTime app can be downloaded free of charge from the Trust's website.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage mentions the VolTime app but does not say whether it is free or where to download it." },
      { kind: "tfng", question: "Youth mentors are required to attend a training programme lasting two days.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'youth mentors attend a two-day mentoring skills workshop.'" },
      { kind: "tfng", question: "Volunteers are reimbursed for meals purchased during their shifts.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Meal expenses are not covered.'" },
      { kind: "tfng", question: "The Trust's public liability insurance covers volunteers during their commute to Trust premises.", options: ["True", "False", "Not Given"], answer: "C", explanation: "The passage says insurance covers 'authorised activities' but does not specify whether commuting is included." },
      // Q21–Q26: Fill-in-the-blank
      { kind: "fill-blank", question: "Volunteers who are absent without notice for ___ consecutive sessions may have their placement reviewed.", options: [], answer: "three|Three|3", explanation: "'absent without notice for three consecutive scheduled sessions.'" },
      { kind: "fill-blank", question: "The mandatory induction session lasts ___ hours.", options: [], answer: "three|Three|3", explanation: "'This three-hour session covers safeguarding...'" },
      { kind: "fill-blank", question: "Community drivers receive a mileage allowance of ___ per mile.", options: [], answer: "45p", explanation: "'a mileage allowance of 45p per mile.'" },
      { kind: "fill-blank", question: "Volunteers who complete ___ hours of service receive a formal certificate.", options: [], answer: "200", explanation: "'Volunteers who complete 200 hours of service receive a formal certificate of achievement.'" },
      { kind: "fill-blank", question: "An incident report form must be completed within ___ hours of an accident.", options: [], answer: "24", explanation: "'complete an incident report form within 24 hours.'" },
      { kind: "fill-blank", question: "Former volunteers can return without repeating induction if they come back within ___ months.", options: [], answer: "12", explanation: "'provided they return within 12 months of their departure.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The History of Public Health (~950 words, C1, 14 questions)
  // Section 3 — General interest/longer
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt7-history-public-health",
    title: "The History of Public Health",
    titleVi: "Lịch sử y tế công cộng",
    level: "C1",
    category: "mock-general",
    passage: [
      "The History of Public Health",
      "",
      "A. The Ancient Foundations",
      "Public health — the organised effort to prevent disease and promote well-being across entire populations — is often regarded as a modern invention, yet its roots stretch back thousands of years. The ancient Romans engineered elaborate aqueduct systems to supply clean water to cities and constructed extensive sewer networks, most notably the Cloaca Maxima in Rome, which is still partially in use today. Roman bathhouses served not only as places of hygiene but also as centres of social life, reflecting an intuitive understanding that sanitation and community well-being were interconnected. In the Indus Valley civilisation, circa 2500 BCE, the cities of Mohenjo-daro and Harappa featured remarkably sophisticated drainage systems that connected individual households to covered main drains running along the streets — an engineering achievement that would not be matched in Europe for millennia.",
      "",
      "B. The Medieval Period and Quarantine",
      "The collapse of the Roman Empire led to a deterioration of sanitation infrastructure across Europe, contributing to devastating outbreaks of infectious disease. The Black Death of 1347–1351, which killed an estimated 30–60% of Europe's population, forced authorities to develop new strategies for disease control. The concept of quarantine originated in the port city of Ragusa (modern-day Dubrovnik) in 1377, where arriving ships were required to anchor offshore for 30 days — later extended to 40 days, or quaranta giorni in Italian, giving the practice its name. Although medieval authorities did not understand the germ theory of disease, their empirical observation that isolating the sick reduced transmission proved remarkably effective and established a principle that remains central to infectious disease control today.",
      "",
      "C. The Sanitary Revolution",
      "The Industrial Revolution of the 18th and 19th centuries brought unprecedented urbanisation, with millions of workers crowding into cities that lacked adequate housing, water supply, or waste disposal. Cholera epidemics ravaged industrial cities, killing tens of thousands. The pivotal moment came in 1854 when Dr John Snow, a London physician, traced a cholera outbreak in Soho to a contaminated water pump on Broad Street. By mapping cases geographically, Snow demonstrated that cholera was waterborne rather than caused by 'miasma' (bad air), as was widely believed. His work is considered the founding act of modern epidemiology. Edwin Chadwick's 1842 report on sanitary conditions among the labouring population further galvanised reform, leading to the Public Health Act of 1848 — the first legislation in the world to establish a systematic framework for improving public health through clean water provision, sewage disposal, and the appointment of local medical officers.",
      "",
      "D. The Germ Theory and Vaccination",
      "The late 19th century witnessed a revolution in understanding disease causation. Louis Pasteur's experiments in the 1860s demonstrated that microorganisms caused fermentation and spoilage, laying the groundwork for germ theory. Robert Koch subsequently identified the specific bacteria responsible for tuberculosis (1882) and cholera (1883), establishing Koch's postulates — a set of criteria for proving that a particular organism causes a particular disease. Meanwhile, vaccination had already begun to transform public health. Edward Jenner's pioneering work with cowpox in 1796 had demonstrated that deliberate infection with a mild disease could protect against a deadly one. By the early 20th century, vaccines against rabies, typhoid, and plague were in widespread use, and mass vaccination campaigns would eventually eradicate smallpox entirely — the only human disease ever to have been deliberately eliminated, with the last natural case occurring in Somalia in 1977.",
      "",
      "E. The Epidemiological Transition",
      "As sanitation, vaccination, and antibiotics dramatically reduced mortality from infectious diseases throughout the 20th century, the disease burden in developed nations shifted towards chronic, non-communicable conditions. Heart disease, cancer, diabetes, and respiratory illness — driven largely by tobacco use, poor diet, physical inactivity, and environmental pollution — became the leading causes of death. This 'epidemiological transition' required public health to evolve from a discipline focused primarily on environmental sanitation and infectious disease control to one that also addressed individual behaviour, lifestyle choices, and the social determinants of health. The landmark 1964 US Surgeon General's report linking smoking to lung cancer exemplified this shift, leading to public awareness campaigns, advertising restrictions, and taxation policies that have since reduced smoking rates in many countries by more than half.",
      "",
      "F. Global Health Challenges",
      "Despite remarkable progress, public health faces formidable challenges in the 21st century. The HIV/AIDS pandemic, which has killed over 40 million people since its identification in the 1980s, exposed the limitations of health systems in developing nations and highlighted the intersection of disease with poverty, inequality, and stigma. The emergence of antibiotic-resistant bacteria — so-called 'superbugs' — threatens to reverse decades of progress in treating bacterial infections, with the World Health Organization warning that antimicrobial resistance could cause 10 million deaths annually by 2050 if left unchecked. Climate change is creating new health risks through extreme heat events, expanded ranges for disease-carrying insects, air pollution, and disruptions to food and water security.",
      "",
      "G. Lessons and Future Directions",
      "The COVID-19 pandemic of 2020–2023 served as a stark reminder that infectious diseases remain a potent threat, even in technologically advanced societies. It also demonstrated both the power and the limitations of public health interventions: lockdowns and mask mandates reduced transmission but imposed enormous social and economic costs, while the unprecedented speed of vaccine development — with effective vaccines available within a year of the virus's identification — showcased the potential of modern biotechnology. Looking ahead, public health must grapple with the tension between individual liberty and collective welfare, invest in surveillance systems capable of detecting novel pathogens before they become pandemics, and address the deep structural inequalities that determine who lives, who falls ill, and who dies."
    ].join("\n"),
    questions: [
      // Q27–Q33: Matching Headings (10 headings, 7 paragraphs, 3 distractors)
      { kind: "matching-headings", question: "List of Headings:\ni. The shift from infectious to lifestyle-related diseases\nii. Ancient engineering for community well-being\niii. How poverty shapes modern disease patterns\niv. Early disease containment through isolation\nv. Political responses to health crises in the 21st century\nvi. Identifying micro-organisms as causes of illness\nvii. Present-day threats to global health progress\nviii. Balancing freedom with public welfare in future planning\nix. Poor urban conditions and the birth of epidemiology\nx. The role of traditional medicine in disease prevention\n\nParagraph A", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "ii", explanation: "Paragraph A discusses Roman aqueducts, sewers, bathhouses, and Indus Valley drainage — ancient engineering for community well-being." },
      { kind: "matching-headings", question: "Paragraph B", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "iv", explanation: "Paragraph B describes the origin of quarantine in Ragusa and isolation of the sick — early disease containment through isolation." },
      { kind: "matching-headings", question: "Paragraph C", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "ix", explanation: "Paragraph C covers the Industrial Revolution's crowded, unsanitary cities, Snow's cholera investigation, and Chadwick's report — poor urban conditions and the birth of epidemiology." },
      { kind: "matching-headings", question: "Paragraph D", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "vi", explanation: "Paragraph D discusses Pasteur's germ theory, Koch's identification of bacteria, and vaccination — identifying micro-organisms as causes of illness." },
      { kind: "matching-headings", question: "Paragraph E", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "i", explanation: "Paragraph E describes the shift from infectious diseases to chronic non-communicable conditions like heart disease, cancer, and diabetes." },
      { kind: "matching-headings", question: "Paragraph F", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "vii", explanation: "Paragraph F discusses HIV/AIDS, antibiotic-resistant superbugs, and climate change — present-day threats to global health progress." },
      { kind: "matching-headings", question: "Paragraph G", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"], answer: "viii", explanation: "Paragraph G discusses COVID-19 lessons, the tension between individual liberty and collective welfare, and future directions." },
      // Q34–Q37: MCQ
      { kind: "mcq", question: "According to the passage, the quarantine period was eventually set at 40 days because:", options: ["Scientific experiments proved 40 days was necessary to eliminate infection.", "The Italian term 'quaranta giorni' meaning 40 days became the standard.", "Ships required 40 days to complete their journey to port.", "Religious authorities considered 40 a spiritually significant number."], answer: "B", explanation: "'later extended to 40 days, or quaranta giorni in Italian, giving the practice its name.' The passage links the 40-day period to the Italian term." },
      { kind: "mcq", question: "John Snow's contribution to public health was significant primarily because he:", options: ["Discovered the bacterium that causes cholera.", "Proved that miasma theory was correct.", "Used geographic mapping to identify the source of a disease outbreak.", "Developed the first effective treatment for waterborne illnesses."], answer: "C", explanation: "'By mapping cases geographically, Snow demonstrated that cholera was waterborne.' He used geographic methods — the founding act of modern epidemiology." },
      { kind: "mcq", question: "The passage states that smallpox is unique because it:", options: ["Was the first disease to be treated with antibiotics.", "Is the only human disease to have been deliberately eliminated.", "Killed more people than any other disease in history.", "Was the first disease whose cause was identified under a microscope."], answer: "B", explanation: "'the only human disease ever to have been deliberately eliminated.'" },
      { kind: "mcq", question: "Which of the following does the passage identify as a potential consequence of antimicrobial resistance?", options: ["A return to pre-industrial life expectancy within a decade.", "Ten million deaths per year by 2050.", "The complete elimination of antibiotic medicines by 2040.", "A global ban on livestock farming."], answer: "B", explanation: "'antimicrobial resistance could cause 10 million deaths annually by 2050.'" },
      // Q38–Q40: YNNG
      { kind: "ynng", question: "The writer suggests that Roman authorities fully understood the scientific basis for their sanitation practices.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "The passage describes the Romans' understanding as 'intuitive' — 'reflecting an intuitive understanding that sanitation and community well-being were interconnected.' This implies they did NOT fully understand the scientific basis." },
      { kind: "ynng", question: "The writer believes that the speed of COVID-19 vaccine development demonstrates the value of modern biotechnology.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "'showcased the potential of modern biotechnology' — the writer clearly views this positively." },
      { kind: "ynng", question: "The writer considers the 1964 Surgeon General's report to have been the single most important event in the history of public health.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage calls the report a landmark example of the epidemiological transition but does not claim it was the single most important event in public health history." },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 1000 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 1000 + passages.indexOf(p) },
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
    update: { title: "IELTS General Training Reading — Test 7", titleVi: "IELTS General Training Reading — De 7", type: "general", difficulty: "hard", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training Reading — Test 7", titleVi: "IELTS General Training Reading — De 7", type: "general", difficulty: "hard", timeMinutes: 60, order: 13 },
  });
  console.log("\n  OK Exam: " + exam.slug);

  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log("Done! 3 passages (" + passages.reduce((s, p) => s + p.questions.length, 0) + " questions)");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
