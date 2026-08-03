import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData { kind: string; question: string; options: string[]; answer: string; explanation: string; }
interface PassageData { slug: string; title: string; titleVi: string; level: string; category: string; passage: string; questions: QuestionData[]; }

const examSlug = "ielts-general-test-6";

// ── Passage 3 matching-headings (10 headings for 7 paragraphs = 3 distractors) ──
const P3_HEADINGS = [
  "i. The limitations of genetic modification in addressing nutritional shortfalls",
  "ii. How conventional farming methods have degraded the quality of what we eat",
  "iii. A technological solution that bypasses the need for soil altogether",
  "iv. The increasing gap between caloric abundance and genuine nourishment",
  "v. Why restoring soil health could reverse declining nutrient levels",
  "vi. Evidence that modern produce contains fewer essential vitamins and minerals",
  "vii. The role of biodiversity loss in weakening crop resilience",
  "viii. How consumer demand for appearance over substance has reshaped agriculture",
  "ix. The economic barriers preventing widespread adoption of regenerative practices",
  "x. Historical parallels between past agricultural revolutions and present-day challenges",
];

// ── Passage 2 matching-features: three policy categories ──
const P2_CATEGORIES = [
  "A. Formal warning",
  "B. Summary dismissal",
  "C. Disciplinary hearing",
  "D. No action required",
];

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: Car Insurance Policy Summary (~600 words, B1, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt6-car-insurance-policy",
    title: "Car Insurance Policy Summary",
    titleVi: "Tom tat chinh sach bao hiem o to",
    level: "B1",
    category: "mock-general",
    passage: [
      "Car Insurance Policy Summary",
      "",
      "A. Welcome to Clearview Motor Insurance. This document summarises the key terms and conditions of your comprehensive car insurance policy. Please read it carefully and keep it in a safe place. Your full policy document is available online at www.clearviewinsurance.co.uk or by calling our customer service line on 0800 555 3200.",
      "",
      "B. Your policy covers damage to your vehicle caused by accidents, fire, theft, and severe weather events including storms, floods, and hail. It also covers damage you may cause to other people's vehicles or property while driving. Third-party injury cover provides compensation of up to £20 million for injuries to other road users. Windscreen repair is covered without affecting your no-claims bonus, provided you use one of our approved repair centres. Replacement windscreens are subject to an excess of £75.",
      "",
      "C. Your policy includes personal accident cover of up to £5,000 per person for you and any named drivers. It also provides a courtesy car for up to 14 days while your vehicle is being repaired at one of our approved garages. If your car is stolen and not recovered within 14 days, or if it is declared a total loss, we will pay the market value of the vehicle at the time of the incident, minus any applicable excess.",
      "",
      "D. Your standard excess is £250 for all claims. Drivers under the age of 25 must pay an additional young driver excess of £350, making their total excess £600. Any voluntary excess you have chosen will be added to these amounts. You are not required to pay an excess for windscreen repairs carried out at approved centres.",
      "",
      "E. Your policy does not cover mechanical breakdown, general wear and tear, or damage caused by using the vehicle for purposes not declared on your policy. Racing, rallying, and track days are excluded. Driving under the influence of alcohol or drugs will invalidate your cover entirely. The policy also excludes any accessories or modifications not declared at the time of purchase or renewal. Personal belongings left in the vehicle are covered up to a maximum of £150, but only if the vehicle was locked and there is evidence of forced entry.",
      "",
      "F. You must inform us within 48 hours of any incident that may lead to a claim, even if you do not intend to make a claim yourself. Failure to report an incident within this period may result in your claim being rejected. When reporting an incident, please have your policy number, vehicle registration, and a description of what happened ready. Photographs of damage and details of any witnesses will help us process your claim more quickly. Our claims team operates 24 hours a day, 7 days a week.",
      "",
      "G. You may cancel your policy at any time by calling 0800 555 3200 or writing to us at Clearview Insurance, PO Box 4480, Manchester M60 2AT. If you cancel within the first 14 days (the cooling-off period), you will receive a full refund minus a £25 administration fee and any charges for days of cover already provided. After the cooling-off period, your refund will be calculated on a pro-rata basis for the remaining term, subject to a cancellation fee of £50. No refund is available if a claim has been made or is pending during the current policy year.",
    ].join("\n"),
    questions: [
      { kind: "mcq", question: "What is the maximum compensation for third-party injuries?", options: ["£5 million", "£10 million", "£15 million", "£20 million"], answer: "D", explanation: "'Third-party injury cover provides compensation of up to £20 million.'" },
      { kind: "mcq", question: "What happens if you use a non-approved centre for windscreen repair?", options: ["It is covered without excess", "It is covered with £75 excess", "It may affect your no-claims bonus", "It is not mentioned in the policy"], answer: "D", explanation: "The policy only states that windscreen repair is covered 'without affecting your no-claims bonus, provided you use one of our approved repair centres.' It does not specify what happens with non-approved centres." },
      { kind: "mcq", question: "How long can you use a courtesy car while your vehicle is being repaired?", options: ["Up to 7 days", "Up to 10 days", "Up to 14 days", "Up to 21 days"], answer: "C", explanation: "'a courtesy car for up to 14 days while your vehicle is being repaired.'" },
      { kind: "mcq", question: "What is the total excess for a 22-year-old driver making a claim?", options: ["£250", "£350", "£500", "£600"], answer: "D", explanation: "Standard excess £250 + young driver excess £350 = £600. A 22-year-old is under 25." },
      { kind: "tfng", question: "Windscreen repairs at approved centres require the policyholder to pay an excess.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — 'Windscreen repair is covered without affecting your no-claims bonus' and Section D states 'You are not required to pay an excess for windscreen repairs carried out at approved centres.' Repairs are excess-free; only replacements carry a £75 excess." },
      { kind: "tfng", question: "The policy covers personal belongings stolen from an unlocked vehicle.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — 'only if the vehicle was locked and there is evidence of forced entry.' An unlocked vehicle would not be covered." },
      { kind: "tfng", question: "Policyholders who have made a previous claim in a different policy year can still receive a cancellation refund.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The policy states 'No refund is available if a claim has been made or is pending during the current policy year.' It says nothing about claims in previous policy years." },
      { kind: "tfng", question: "Clearview Insurance has more than one office location in the United Kingdom.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — Only one postal address is provided (Manchester). The passage does not state whether additional offices exist." },
      { kind: "tfng", question: "Driving under the influence of drugs results in a reduced payout rather than full policy invalidation.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — 'Driving under the influence of alcohol or drugs will invalidate your cover entirely.' It invalidates the policy completely, not partially." },
      { kind: "fill-blank", question: "Incidents must be reported to Clearview within ______ hours.", options: [], answer: "48|forty-eight", explanation: "'You must inform us within 48 hours of any incident.'" },
      { kind: "fill-blank", question: "The administration fee for cancelling during the cooling-off period is £______.", options: [], answer: "25|twenty-five", explanation: "'a full refund minus a £25 administration fee.'" },
      { kind: "fill-blank", question: "Personal belongings in the vehicle are covered up to a maximum of £______.", options: [], answer: "150", explanation: "'Personal belongings left in the vehicle are covered up to a maximum of £150.'" },
      { kind: "fill-blank", question: "If a stolen car is not recovered within ______ days, the insurer will pay the market value.", options: [], answer: "14|fourteen", explanation: "'If your car is stolen and not recovered within 14 days.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Staff Disciplinary Procedures (~650 words, B2, 13 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt6-staff-disciplinary-procedures",
    title: "Staff Disciplinary Procedures",
    titleVi: "Quy trinh ky luat nhan vien",
    level: "B2",
    category: "mock-general",
    passage: [
      "Staff Disciplinary Procedures",
      "",
      "A. Purpose and Scope. These procedures apply to all employees of Halton & Webb Associates who have completed their probationary period of three months. The purpose of the disciplinary procedure is to ensure that issues of misconduct or unsatisfactory performance are handled fairly, consistently, and in accordance with current employment legislation. Managers are expected to address minor issues informally before initiating formal disciplinary proceedings. Informal conversations should be documented via email and a copy sent to the employee within two working days.",
      "",
      "B. Investigation. When a potential disciplinary matter is identified, the line manager must notify the Human Resources department within 24 hours. HR will appoint an investigating officer who is not directly involved in the case. The investigating officer will gather evidence, interview relevant witnesses, and produce a written report within 10 working days. The employee under investigation has the right to be informed of the allegations in writing and to respond before any decision is made. During the investigation, the employee may be suspended on full pay if their continued presence in the workplace could compromise the investigation or pose a risk to other staff.",
      "",
      "C. Formal Warning Stages. The formal disciplinary process operates in three stages. Stage 1 is a verbal warning, which is recorded on the employee's file and remains active for six months. Stage 2 is a first written warning, which remains on file for twelve months. Stage 3 is a final written warning, which remains on file for eighteen months. At each stage, the employee will be informed in writing of the specific nature of the misconduct, the improvement required, the timescale for improvement, and the consequences of further misconduct. An employee is not required to progress through all stages sequentially — the severity of the misconduct determines the appropriate starting point.",
      "",
      "D. Gross Misconduct. Certain offences are classified as gross misconduct and may result in summary dismissal — that is, immediate termination without notice or pay in lieu of notice. Gross misconduct includes, but is not limited to: theft or fraud; deliberate falsification of records; physical violence or threats of violence; serious insubordination; being under the influence of alcohol or illegal drugs during working hours; serious breach of health and safety regulations; and deliberate damage to company property. Allegations of gross misconduct will always be investigated before any action is taken, and the employee will have the right to present their case at a disciplinary hearing.",
      "",
      "E. Disciplinary Hearing. A disciplinary hearing will be convened when formal action beyond a verbal warning is being considered. The employee will receive at least five working days' written notice of the hearing, including details of the allegations, the evidence to be presented, and the possible outcomes. The employee has the right to be accompanied at the hearing by a trade union representative or a colleague employed by the company. The hearing panel will consist of at least two managers, neither of whom should have been involved in the investigation. The panel must reach a decision within three working days of the hearing and communicate the outcome to the employee in writing.",
      "",
      "F. Appeals. An employee who wishes to appeal against a disciplinary decision must submit a written appeal to the HR Director within five working days of receiving the written outcome. The appeal will be heard by a senior manager who was not involved in the original decision, within 10 working days of receipt. The appeal hearing follows the same procedural rights as the original disciplinary hearing. The outcome of the appeal is final and will be communicated in writing within three working days.",
      "",
      "G. Record Keeping and Confidentiality. All disciplinary records are maintained by the HR department and treated as strictly confidential. Records of verbal warnings are removed from the employee's file after six months, provided no further misconduct has occurred. Written warnings are removed after the periods specified in Section C. Records of summary dismissal are retained permanently. Employees may request access to their own disciplinary file at any time by submitting a written request to HR. Information about disciplinary proceedings will not be disclosed to other employees except where strictly necessary for the investigation or hearing process.",
    ].join("\n"),
    questions: [
      { kind: "matching-features", question: "An employee is caught falsifying expense claims.", options: P2_CATEGORIES, answer: "B", explanation: "Falsification of records is listed under gross misconduct in Section D, which may result in summary dismissal." },
      { kind: "matching-features", question: "An employee arrives ten minutes late for the third time this month.", options: P2_CATEGORIES, answer: "A", explanation: "Repeated minor misconduct (lateness) would typically begin at Stage 1 — a verbal/formal warning. It does not constitute gross misconduct." },
      { kind: "matching-features", question: "An employee is accused of threatening a colleague with physical violence.", options: P2_CATEGORIES, answer: "B", explanation: "'physical violence or threats of violence' is listed as gross misconduct in Section D, which may result in summary dismissal." },
      { kind: "matching-features", question: "An employee who has received a first written warning commits the same offence again.", options: P2_CATEGORIES, answer: "C", explanation: "A further offence after a first written warning would progress to Stage 3 (final written warning), which requires a disciplinary hearing as described in Section E." },
      { kind: "matching-features", question: "A new employee in their second month makes an error of judgement that causes minor inconvenience.", options: P2_CATEGORIES, answer: "D", explanation: "The procedures apply to employees who have 'completed their probationary period of three months.' An employee in their second month is still on probation, so these procedures do not apply." },
      { kind: "matching-information", question: "Which section describes the right to bring someone to a formal meeting?", options: ["Section A", "Section B", "Section C", "Section D", "Section E", "Section F", "Section G"], answer: "E", explanation: "Section E states the employee 'has the right to be accompanied at the hearing by a trade union representative or a colleague.'" },
      { kind: "matching-information", question: "Which section explains how long disciplinary records are retained?", options: ["Section A", "Section B", "Section C", "Section D", "Section E", "Section F", "Section G"], answer: "G", explanation: "Section G specifies retention periods: verbal warnings removed after six months, written warnings after specified periods, and dismissal records retained permanently." },
      { kind: "matching-information", question: "Which section states that stages may be skipped depending on the seriousness of the offence?", options: ["Section A", "Section B", "Section C", "Section D", "Section E", "Section F", "Section G"], answer: "C", explanation: "Section C: 'An employee is not required to progress through all stages sequentially — the severity of the misconduct determines the appropriate starting point.'" },
      { kind: "mcq", question: "How long does a final written warning remain on an employee's file?", options: ["Six months", "Twelve months", "Eighteen months", "Twenty-four months"], answer: "C", explanation: "'Stage 3 is a final written warning, which remains on file for eighteen months.'" },
      { kind: "mcq", question: "What is the minimum notice an employee must receive before a disciplinary hearing?", options: ["Two working days", "Three working days", "Five working days", "Ten working days"], answer: "C", explanation: "'at least five working days' written notice of the hearing.'" },
      { kind: "mcq", question: "Who hears an appeal against a disciplinary decision?", options: ["The original investigating officer", "The HR Director personally", "A senior manager not involved in the original decision", "An external mediator"], answer: "C", explanation: "'heard by a senior manager who was not involved in the original decision.' Not the HR Director — the appeal is submitted to the HR Director but heard by a senior manager." },
      { kind: "tfng", question: "An employee under investigation can continue working during the investigation in all circumstances.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Section B states the employee 'may be suspended on full pay if their continued presence in the workplace could compromise the investigation or pose a risk.' So continued working is not guaranteed in all circumstances." },
      { kind: "tfng", question: "The investigating officer is usually the employee's line manager.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Section B states 'HR will appoint an investigating officer who is not directly involved in the case.' The line manager notifies HR but does not investigate." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Hidden Cost of Cheap Food (~950 words, C1, 14 questions)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mock-gt6-hidden-cost-cheap-food",
    title: "The Hidden Cost of Cheap Food",
    titleVi: "Chi phi an giau cua thuc pham gia re",
    level: "C1",
    category: "mock-general",
    passage: [
      "The Hidden Cost of Cheap Food",
      "",
      "A. For most of human history, food was scarce, seasonal, and labour-intensive to produce. Today, supermarket shelves groan under the weight of year-round abundance, and the average household in a developed nation spends a smaller proportion of its income on food than at any point in recorded history — roughly 10% in the United Kingdom, compared with nearly 50% in 1950. This remarkable transformation is frequently cited as one of the great triumphs of modern agriculture. Yet a growing body of evidence suggests that the relentless pursuit of cheaper calories has come at a cost that rarely appears on the receipt: the systematic depletion of the nutritional value of the food itself.",
      "",
      "B. The scale of this decline is striking. A landmark study conducted by Donald Davis and his colleagues at the University of Texas, published in the Journal of the American College of Nutrition in 2004, compared the nutrient content of 43 common garden crops as recorded by the United States Department of Agriculture in 1950 and 1999. The researchers found statistically reliable declines in six key nutrients: protein had fallen by 6%, calcium by 16%, phosphorus by 9%, iron by 15%, riboflavin (vitamin B2) by 38%, and ascorbic acid (vitamin C) by 20%. Similar studies in the United Kingdom, using data from government food composition tables spanning 1940 to 2002, revealed that the iron content of 15 varieties of meat had dropped by 47%, while the magnesium content of common vegetables had decreased by 24%. These are not marginal shifts; they represent a fundamental alteration in the nutritional profile of the food supply.",
      "",
      "C. The primary driver of this nutrient erosion is a phenomenon that agronomists call the \"dilution effect.\" Modern crop varieties have been selectively bred to maximise yield — to produce larger fruits, heavier grain heads, and faster-growing vegetables. As a plant channels more of its metabolic resources into producing bulk carbohydrate and water content, the concentration of minerals and vitamins in each unit of edible tissue decreases proportionally. In essence, the plant grows bigger but not more nutritious. Davis's research demonstrated an inverse correlation between yield and nutrient density across virtually every crop examined: the higher the yield per hectare, the lower the concentration of essential micronutrients per kilogram of harvested produce.",
      "",
      "D. Soil degradation compounds this problem considerably. Intensive monoculture farming — the practice of growing the same crop on the same land year after year — strips the soil of trace minerals, disrupts the microbial communities that facilitate nutrient uptake by plant roots, and reduces the organic matter content that gives soil its structure and water-holding capacity. The United Nations Food and Agriculture Organization has estimated that one-third of the world's topsoil is already degraded and that, at current rates of erosion, the planet has approximately 60 harvests of topsoil remaining. When the soil itself is depleted of minerals such as zinc, selenium, and iodine, the crops grown in it inevitably reflect those deficiencies, creating a chain of nutritional impoverishment that extends from the field to the dinner plate.",
      "",
      "E. The emphasis on cosmetic appearance has further distorted breeding priorities. Consumers — and, more precisely, the supermarket procurement standards that purport to represent consumer preferences — consistently favour produce that is uniform in size, unblemished in appearance, and capable of withstanding the rigours of long-distance transport and extended shelf life. These qualities are largely unrelated to nutritional content and, in some cases, actively conflict with it. Tomatoes bred for firmness during transport, for example, carry a genetic mutation that simultaneously reduces the production of sugars and carotenoids, the pigments responsible for both colour and significant antioxidant properties. The result is a fruit that looks appealing but delivers measurably less nutritional benefit than its less photogenic predecessors.",
      "",
      "F. Vertical farming and soilless hydroponic systems are sometimes proposed as technological solutions to these problems, and they offer genuine advantages in terms of water efficiency, pesticide reduction, and year-round production in controlled environments. However, the nutritional evidence is mixed. Plants grown hydroponically receive a precisely calibrated mineral solution, but this typically contains only the 16 elements known to be essential for plant growth — far fewer than the 70 or more trace elements found in healthy, biologically active soil. Early comparative studies suggest that hydroponically grown lettuce may contain lower levels of certain antioxidants and phenolic compounds than soil-grown equivalents, though research in this area remains limited and methodological differences between studies make definitive conclusions premature.",
      "",
      "G. A more promising avenue, according to a growing number of soil scientists and agroecologists, lies in regenerative agriculture — farming practices designed to restore rather than deplete soil health. These include cover cropping (planting non-harvest crops to protect and enrich the soil between seasons), composting, reduced tillage, crop rotation, and the integration of livestock grazing into crop systems. A 2022 study published in PeerJ compared the nutrient density of crops grown on regenerative farms with those from conventional operations and found that regeneratively produced crops contained, on average, 34% more vitamin K, 15% more vitamin E, 17% more vitamin B1, and 11% more calcium. The mineral content of the soil on regenerative farms was also significantly higher. Critics note that regenerative methods often produce lower yields per hectare and require more labour, making food more expensive in the short term — an objection that proponents counter by arguing that the true cost of cheap food has simply been deferred to healthcare systems, environmental remediation, and the long-term collapse of agricultural productivity itself.",
    ].join("\n"),
    questions: [
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P3_HEADINGS, answer: "D", explanation: "Paragraph A contrasts the affordability and abundance of modern food with evidence that its nutritional value has declined. Heading iv ('The increasing gap between caloric abundance and genuine nourishment') captures this precisely. Heading ii ('How conventional farming methods have degraded the quality of what we eat') is a distractor — Paragraph A introduces the problem but does not yet discuss farming methods." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P3_HEADINGS, answer: "F", explanation: "Paragraph B presents the Davis study and UK data showing specific percentage declines in vitamins and minerals. Heading vi ('Evidence that modern produce contains fewer essential vitamins and minerals') matches directly. Heading iv is a distractor but refers to the broader gap, not the specific evidence." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P3_HEADINGS, answer: "B", explanation: "Paragraph C explains the 'dilution effect' — how breeding for higher yield reduces nutrient concentration. Heading ii ('How conventional farming methods have degraded the quality of what we eat') fits because selective breeding for yield is the conventional farming method described. Heading i ('genetic modification') is a distractor — the paragraph discusses selective breeding, not GM." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P3_HEADINGS, answer: "VII", explanation: "Paragraph D discusses monoculture stripping soil of minerals and disrupting microbial communities, reducing crop resilience. Heading vii ('The role of biodiversity loss in weakening crop resilience') matches. Heading v ('restoring soil health') is a distractor — this paragraph describes the problem, not the solution." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph E?", options: P3_HEADINGS, answer: "H", explanation: "Paragraph E describes how consumer and supermarket preferences for uniform, attractive produce have driven breeding away from nutrition. Heading viii ('How consumer demand for appearance over substance has reshaped agriculture') matches precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P3_HEADINGS, answer: "C", explanation: "Paragraph F discusses hydroponics and vertical farming as soilless alternatives. Heading iii ('A technological solution that bypasses the need for soil altogether') matches. Heading i ('genetic modification') is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P3_HEADINGS, answer: "E", explanation: "Paragraph G describes regenerative agriculture and its demonstrated ability to increase nutrient density. Heading v ('Why restoring soil health could reverse declining nutrient levels') matches. Heading ix ('economic barriers') is mentioned but is only a counterpoint, not the main focus." },
      { kind: "ynng", question: "The decline in food nutrient levels represents one of the most serious public health crises of the modern era.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage describes the nutrient decline as significant ('not marginal shifts') but never characterises it as a 'public health crisis.' The writer presents evidence without making this specific evaluative claim." },
      { kind: "ynng", question: "Supermarket procurement standards accurately reflect what consumers truly want.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "NO — The writer uses the phrase 'purport to represent consumer preferences,' which implies scepticism that these standards genuinely reflect what consumers want. The word 'purport' signals doubt." },
      { kind: "ynng", question: "The objection that regenerative agriculture is more expensive fails to account for hidden costs of conventional farming.", options: ["Yes", "No", "Not Given"], answer: "A", explanation: "YES — Paragraph G states that proponents counter the cost objection 'by arguing that the true cost of cheap food has simply been deferred to healthcare systems, environmental remediation, and the long-term collapse of agricultural productivity itself.' The writer presents this argument sympathetically as the essay's concluding point." },
      { kind: "mcq", question: "According to the Davis study, which nutrient showed the greatest percentage decline between 1950 and 1999?", options: ["Protein", "Iron", "Riboflavin (vitamin B2)", "Ascorbic acid (vitamin C)"], answer: "C", explanation: "Riboflavin declined by 38%, which is the largest percentage decline among the six nutrients listed from the Davis study. Iron declined by 15%, vitamin C by 20%, and protein by 6%." },
      { kind: "mcq", question: "What does the author suggest is the main problem with hydroponically grown produce?", options: ["It requires excessive amounts of water", "It uses more pesticides than conventional farming", "The mineral solutions lack the trace elements found in natural soil", "It cannot be grown year-round"], answer: "C", explanation: "Paragraph F states that hydroponic solutions 'typically contain only the 16 elements known to be essential for plant growth — far fewer than the 70 or more trace elements found in healthy, biologically active soil.'" },
      { kind: "mcq", question: "The UN Food and Agriculture Organization's estimate about topsoil suggests that", options: ["topsoil loss has already halted in most developed nations", "current farming practices could exhaust topsoil within a human lifetime", "erosion primarily affects tropical regions", "regenerative agriculture has begun reversing the trend globally"], answer: "B", explanation: "'at current rates of erosion, the planet has approximately 60 harvests of topsoil remaining.' Since harvests occur annually, this means roughly 60 years — within a human lifetime. The other options are not supported." },
      { kind: "fill-blank", question: "The average UK household spent approximately ______% of its income on food in 1950.", options: [], answer: "50|fifty", explanation: "'compared with nearly 50% in 1950.'" },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 990 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 990 + passages.indexOf(p) },
    });
    await prisma.readingQuestion.deleteMany({ where: { passageId: passage.id } });
    for (let q = 0; q < p.questions.length; q++) {
      const qn = p.questions[q];
      await prisma.readingQuestion.create({
        data: {
          passageId: passage.id,
          kind: qn.kind,
          question: qn.question,
          options: qn.options,
          answer: qn.answer,
          explanation: qn.explanation,
          order: q,
        },
      });
    }
    passageIds.push(passage.id);
    console.log("  OK [" + p.level + "] " + p.slug + " (" + wc + " words, " + p.questions.length + " questions)");
  }

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: "IELTS General Training Reading — Test 6", titleVi: "IELTS General Training Reading — De 6", type: "general", difficulty: "hard", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS General Training Reading — Test 6", titleVi: "IELTS General Training Reading — De 6", type: "general", difficulty: "hard", timeMinutes: 60, order: 12 },
  });
  console.log("\n  OK Exam: " + exam.slug + " (difficulty: hard)");
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log("Done! 3 passages (" + passages.reduce((s, p) => s + p.questions.length, 0) + " questions)");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
