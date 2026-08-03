import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface QuestionData {
  kind: string;
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

// ─── Passage 1: matching-headings + tfng ───────────────────────────

const P1_HEADINGS = [
  "i. The biological basis of colour perception and emotional arousal",
  "ii. Why certain brands dominate through consistent colour identity",
  "iii. Cultural variations in the symbolic meaning of colour",
  "iv. How digital marketing has rendered colour irrelevant",
  "v. Gender-based differences in colour preference research",
  "vi. The financial consequences of colour decisions in retail",
  "vii. Evidence that colour influences purchasing speed rather than preference",
  "viii. An overview of academic interest in colour and consumer behaviour",
  "ix. Strategic use of colour to communicate product categories",
];

// ─── Passage 4: matching-headings + matching-sentence-endings ──────

const P4_HEADINGS = [
  "i. Legal frameworks that have failed to protect indigenous land",
  "ii. Medicinal knowledge systems threatened by habitat destruction",
  "iii. The disproportionate role of indigenous territories in carbon storage",
  "iv. Government incentives that accelerate forest clearance",
  "v. Why satellite monitoring alone cannot halt deforestation",
  "vi. A historical overview of how colonialism shaped current land disputes",
  "vii. Collaborative models that benefit both conservation and communities",
  "viii. The psychological toll of displacement on indigenous peoples",
  "ix. Economic arguments for preserving indigenous land management",
];

const P4_SENTENCE_ENDINGS = [
  "A. because their traditional governance structures lack international recognition.",
  "B. because satellite imagery cannot capture the informal agreements that regulate local land use.",
  "C. because carbon stored in indigenous forests exceeds that of many industrialised nations combined.",
  "D. because reforestation efforts rarely restore the original biodiversity of cleared land.",
  "E. because government resettlement programmes often disregard spiritual connections to ancestral territory.",
  "F. because indigenous land management techniques have been shown to reduce fire incidence by up to 30%.",
  "G. because pharmaceutical companies have historically extracted plant knowledge without adequate compensation.",
];

// ─── Passage 6 paragraph labels ────────────────────────────────────

const P6_PARAGRAPHS = [
  "Paragraph A",
  "Paragraph B",
  "Paragraph C",
  "Paragraph D",
  "Paragraph E",
  "Paragraph F",
  "Paragraph G",
];

const passages: PassageData[] = [

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 1: The Psychology of Colour in Marketing (B2)
  // matching-headings + tfng
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-colour-marketing",
    title: "The Psychology of Colour in Marketing",
    titleVi: "Tam ly hoc mau sac trong tiep thi",
    level: "B2",
    category: "ielts",
    passage: [
      "The Psychology of Colour in Marketing",
      "",
      "A. The relationship between colour and consumer behaviour has attracted growing scholarly attention over the past three decades. Researchers in the fields of psychology, neuroscience, and marketing have sought to establish whether specific hues exert a measurable influence on purchasing decisions, brand perception, and emotional engagement. Although early studies were often criticised for small sample sizes and poorly controlled variables, more recent work employing eye-tracking technology, functional magnetic resonance imaging, and large-scale online experiments has produced increasingly robust findings. A meta-analysis published in the Journal of Consumer Psychology in 2019, drawing on 78 independent studies, confirmed that colour can significantly affect consumer attitudes, though the magnitude of the effect varies considerably depending on context, culture, and product category.",
      "",
      "B. At the most fundamental level, colour perception is a neurological process. When light of a particular wavelength enters the eye, it stimulates cone cells in the retina, which transmit electrical signals to the visual cortex. From there, the information is relayed to the amygdala and other limbic structures involved in emotional processing. This pathway means that colour can trigger emotional responses before the conscious mind has had time to evaluate the stimulus. Research by Andrew Elliot at the University of Rochester demonstrated that exposure to the colour red increased heart rate and skin conductance — physiological markers of arousal — within 300 milliseconds, faster than most people can consciously identify the colour they are seeing. This pre-conscious emotional activation is precisely what makes colour such a potent tool in marketing environments.",
      "",
      "C. The meaning attached to particular colours, however, is not universal. In Western cultures, white is associated with purity and cleanliness and is consequently the dominant colour in healthcare branding and wedding attire. In many East Asian cultures, by contrast, white signifies mourning and is worn at funerals. Similarly, red carries connotations of luck and prosperity in China, where it dominates festival decorations and wedding ceremonies, whereas in South Africa it is associated with violence and grief. These cultural divergences present significant challenges for global brands attempting to maintain a consistent visual identity across markets. HSBC, for instance, conducts extensive colour-perception research in every new market it enters, and has on several occasions adjusted its marketing palette to avoid cultural missteps.",
      "",
      "D. One of the most extensively documented applications of colour psychology is the strategic differentiation of product categories through colour coding. Financial institutions overwhelmingly favour blue, which psychological studies consistently associate with trust, reliability, and competence — qualities that banks wish to project. Technology companies have increasingly adopted flat, minimalist colour schemes dominated by whites and greys, reinforced by a single accent colour, to signal innovation and simplicity. Fast-food chains, by contrast, rely heavily on red and yellow, a combination that research suggests stimulates appetite and creates a sense of urgency that encourages rapid consumption and turnover. This category-level colour convention has become so entrenched that brands deviating from it risk confusing consumers about the nature of their offering.",
      "",
      "E. Brand recognition, too, is heavily mediated by colour. Research conducted by the Pantone Color Institute found that a distinctive brand colour increases recognition by up to 80%. Tiffany's robin-egg blue, Cadbury's royal purple, and Coca-Cola's particular shade of red have become so inextricably linked to these brands that competitors rarely dare to use similar hues within the same product category. This phenomenon, known in marketing literature as colour ownership, creates a powerful competitive moat. Legal disputes over colour trademarks — such as the decade-long litigation between Cadbury and Nestle over the right to exclusive use of Pantone 2685C — illustrate the enormous commercial value that companies attach to their signature colours.",
      "",
      "F. Beyond brand identity, colour has been shown to influence the speed and confidence with which consumers make purchasing decisions. A 2020 study by Labrecque and Milne found that products displayed against backgrounds with high colour-background contrast were evaluated 23% faster and received 17% higher purchase-intent ratings than identical products displayed against low-contrast backgrounds. In retail environments, warm-coloured signage — particularly orange and red sale tags — has been demonstrated to increase impulse purchases by between 14% and 22%, depending on the product category. Retailers such as Target have built their entire in-store visual strategy around these findings, using red throughout their branding and store design to create a sense of excitement and urgency.",
      "",
      "G. The financial stakes of colour decisions are considerable. A study commissioned by the Institute for Color Research estimated that colour accounts for between 62% and 90% of a consumer's initial assessment of a product, and that this assessment is typically made within 90 seconds of first seeing the product. For consumer packaged goods companies, where shelf competition is intense and switching costs are low, an ill-chosen colour can translate directly into lost revenue. When Tropicana redesigned its orange juice packaging in 2009, replacing its familiar orange-with-a-straw imagery with a more abstract, minimalist design in muted tones, sales dropped by 20% — a loss of approximately 30 million dollars — within two months, forcing the company to revert to the original design.",
    ].join("\n"),
    questions: [
      // matching-headings (5 paragraphs matched, 2 distractors: iv, vii)
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P1_HEADINGS, answer: "H", explanation: "Paragraph A surveys the development of scholarly research into colour and consumer behaviour, including meta-analyses and improved methodology. Heading viii ('An overview of academic interest in colour and consumer behaviour') captures this precisely. Heading iv is a distractor — the paragraph says nothing about digital marketing rendering colour irrelevant." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P1_HEADINGS, answer: "A", explanation: "Paragraph B explains how colour perception works neurologically — from cone cells in the retina to the amygdala — and how this triggers emotional arousal. Heading i ('The biological basis of colour perception and emotional arousal') matches directly." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P1_HEADINGS, answer: "C", explanation: "Paragraph C discusses how the meaning of colours like white and red differs between Western, East Asian, and South African cultures. Heading iii ('Cultural variations in the symbolic meaning of colour') fits precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P1_HEADINGS, answer: "I", explanation: "Paragraph D describes how different industries (banks, tech, fast food) use specific colours to signal their product category. Heading ix ('Strategic use of colour to communicate product categories') matches. Heading vii is a distractor — purchasing speed is discussed in a different paragraph." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P1_HEADINGS, answer: "F", explanation: "Paragraph G focuses on the financial costs of colour decisions, including Tropicana's 30 million dollar loss from a redesign. Heading vi ('The financial consequences of colour decisions in retail') matches directly." },
      // tfng (5 questions)
      { kind: "tfng", question: "The 2019 meta-analysis in the Journal of Consumer Psychology analysed more than 100 independent studies.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states the meta-analysis drew on '78 independent studies,' not more than 100." },
      { kind: "tfng", question: "Red light triggers a measurable increase in heart rate within 300 milliseconds of exposure.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage states that red 'increased heart rate and skin conductance... within 300 milliseconds.'" },
      { kind: "tfng", question: "HSBC has occasionally changed its core logo colour for specific national markets.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage says HSBC 'adjusted its marketing palette,' but it does not specify whether this extended to its core logo colour or only to peripheral marketing materials." },
      { kind: "tfng", question: "A distinctive brand colour can increase brand recognition by up to 80%.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage explicitly states 'a distinctive brand colour increases recognition by up to 80%.'" },
      { kind: "tfng", question: "Tropicana's 2009 packaging redesign was reversed because customers complained on social media.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage says sales dropped by 20% and the company reverted to the original design, but it does not mention social media complaints as the reason for reversal." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 2: Ocean Acidification and Marine Ecosystems (C1)
  // matching-information + fill-blank
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-ocean-acidification",
    title: "Ocean Acidification and Marine Ecosystems",
    titleVi: "Axit hoa dai duong va he sinh thai bien",
    level: "C1",
    category: "ielts",
    passage: [
      "Ocean Acidification and Marine Ecosystems",
      "",
      "A. Since the onset of the Industrial Revolution in the late eighteenth century, human activities — principally the combustion of fossil fuels, cement production, and land-use change — have released approximately 2,400 gigatonnes of carbon dioxide into the atmosphere. The ocean has absorbed roughly 30% of this anthropogenic CO2, a process that has moderated the pace of atmospheric warming but has simultaneously triggered a less visible yet profoundly consequential chemical transformation: ocean acidification. When CO2 dissolves in seawater, it reacts with water molecules to form carbonic acid, which dissociates into bicarbonate and hydrogen ions. The resulting increase in hydrogen ion concentration lowers the pH of the water. Since pre-industrial times, the average pH of surface ocean water has fallen from approximately 8.21 to 8.10 — a decline of 0.1 units that, because the pH scale is logarithmic, represents a 26% increase in acidity.",
      "",
      "B. The primary chemical consequence of ocean acidification for marine organisms is the reduction in the availability of carbonate ions, which are the essential building blocks for calcium carbonate — the mineral that corals, molluscs, echinoderms, and many species of plankton use to construct their shells and skeletal structures. As carbonate ion concentrations decline, these organisms must expend progressively more metabolic energy to calcify. Laboratory experiments conducted at the Woods Hole Oceanographic Institution demonstrated that the common blue mussel, Mytilus edulis, exhibited a 25% reduction in shell thickness when maintained at pH levels projected for the year 2100 under high-emission scenarios. For pteropods — tiny free-swimming sea snails sometimes called sea butterflies — the consequences are even more severe: at projected mid-century pH levels, their thin aragonite shells begin to dissolve, a phenomenon researchers have documented in living specimens collected from the Southern Ocean.",
      "",
      "C. Coral reefs, which support approximately 25% of all known marine species despite covering less than 0.1% of the ocean floor, are especially vulnerable to acidification. Reef-building corals secrete aragonite, a relatively soluble form of calcium carbonate, to construct the massive limestone frameworks that provide habitat for thousands of species. Under acidified conditions, coral calcification rates decline, and the balance between reef construction and erosion shifts toward net dissolution. A landmark study published in Nature in 2018, led by researchers at the Australian Institute of Marine Science, measured calcification rates across the Great Barrier Reef and found that they had declined by 14.2% between 1990 and 2016. The study attributed this decline to the combined effects of ocean acidification, rising sea temperatures, and increasingly frequent mass bleaching events.",
      "",
      "D. The ecological ramifications extend far beyond calcifying organisms. Ocean acidification has been shown to impair the sensory abilities of fish, with potentially cascading effects throughout marine food webs. Research by Philip Munday and colleagues at James Cook University revealed that elevated CO2 levels disrupt the olfactory system of clownfish larvae, causing them to become attracted to, rather than repelled by, the chemical cues emitted by predators. Subsequent studies found similar sensory disruptions in other species, including damselfish, cardinalfish, and juvenile barramundi. In a 2020 paper published in Nature Climate Change, Munday's team demonstrated that fish raised under projected end-of-century CO2 concentrations exhibited a 50% increase in mortality due to predation in field experiments conducted on natural reefs.",
      "",
      "E. The interaction between ocean acidification and other anthropogenic stressors — notably warming, deoxygenation, and pollution — creates compounding effects that are difficult to predict from single-stressor studies. Warming accelerates metabolic rates, increasing organisms' demand for energy at the same time that acidification imposes additional metabolic costs for calcification and acid-base regulation. Deoxygenation, driven by warming-induced reductions in oxygen solubility and changes in ocean circulation, further constrains the energy budgets of aerobic organisms. This phenomenon, which marine ecologist Hans-Otto Portner has termed the oxygen and capacity-limited thermal tolerance framework, suggests that the combined impact of multiple stressors may exceed the sum of their individual effects, a concept known as synergistic stress.",
      "",
      "F. Not all marine organisms, however, are adversely affected by acidification. Seagrass meadows, which are among the most productive ecosystems on Earth, may actually benefit from elevated CO2 levels because carbon dioxide is a substrate for photosynthesis. Experiments conducted at natural CO2 seep sites in Papua New Guinea, where volcanic vents release CO2 into coastal waters, found that seagrass beds near the vents were denser and more productive than those in ambient pH waters. Similarly, some species of phytoplankton — particularly nitrogen-fixing cyanobacteria such as Trichodesmium — have shown increased growth rates under elevated CO2 conditions. These organisms could potentially alter marine nutrient cycling in ways that reshape the composition of entire plankton communities, with unknown consequences for the species that depend on them.",
      "",
      "G. Efforts to mitigate ocean acidification are inseparable from broader climate policy, since the primary driver is the same CO2 emissions responsible for global warming. However, local interventions may provide partial and temporary relief. The restoration of coastal ecosystems — mangrove forests, salt marshes, and seagrass beds — can locally reduce acidification because these habitats absorb CO2 through photosynthesis. In Washington State, where acidified waters devastated the oyster aquaculture industry in the early 2010s, hatcheries have installed real-time pH monitoring systems and now time their water intake to avoid periods of upwelling, when deep, acidified water rises to the surface. While such adaptations are valuable, scientists emphasise that without substantial reductions in global CO2 emissions, they cannot prevent the large-scale ecological consequences of continued acidification. Under current emission trajectories, surface ocean pH is projected to decline by a further 0.3 to 0.4 units by 2100, reaching levels not experienced in at least 14 million years.",
    ].join("\n"),
    questions: [
      // matching-information (5 questions)
      { kind: "matching-information", question: "Which paragraph explains how a particular group of organisms could paradoxically thrive under higher CO2 concentrations?", options: P6_PARAGRAPHS, answer: "F", explanation: "Paragraph F describes how seagrass meadows and nitrogen-fixing cyanobacteria may benefit from elevated CO2 because carbon dioxide is a substrate for photosynthesis." },
      { kind: "matching-information", question: "Which paragraph describes a quantified decline in reef-building activity over a specific time period?", options: P6_PARAGRAPHS, answer: "C", explanation: "Paragraph C cites the Nature study showing calcification rates across the Great Barrier Reef declined by 14.2% between 1990 and 2016." },
      { kind: "matching-information", question: "Which paragraph discusses how acidification disrupts the ability of fish to detect threats?", options: P6_PARAGRAPHS, answer: "D", explanation: "Paragraph D describes Munday's research showing that elevated CO2 disrupts the olfactory system of clownfish larvae, causing them to be attracted to rather than repelled by predator chemical cues." },
      { kind: "matching-information", question: "Which paragraph identifies a practical adaptation used by a specific industry to cope with acidified water?", options: P6_PARAGRAPHS, answer: "G", explanation: "Paragraph G describes how Washington State oyster hatcheries installed real-time pH monitoring and now time their water intake to avoid upwelling periods." },
      { kind: "matching-information", question: "Which paragraph explains why the combined impact of multiple environmental stressors may be greater than expected?", options: P6_PARAGRAPHS, answer: "E", explanation: "Paragraph E discusses Portner's oxygen and capacity-limited thermal tolerance framework and the concept of synergistic stress — the idea that combined stressors exceed the sum of individual effects." },
      // fill-blank (5 questions)
      { kind: "fill-blank", question: "Since pre-industrial times, the average pH of surface ocean water has declined by ______ units.", options: [], answer: "0.1|0.10", explanation: "The passage states the pH 'has fallen from approximately 8.21 to 8.10 — a decline of 0.1 units.'" },
      { kind: "fill-blank", question: "The common blue mussel showed a ______% reduction in shell thickness under projected 2100 pH levels.", options: [], answer: "25|twenty-five", explanation: "The passage states Mytilus edulis 'exhibited a 25% reduction in shell thickness.'" },
      { kind: "fill-blank", question: "Coral reefs support approximately ______% of all known marine species.", options: [], answer: "25|twenty-five", explanation: "The passage states coral reefs 'support approximately 25% of all known marine species.'" },
      { kind: "fill-blank", question: "Fish raised under end-of-century CO2 concentrations showed a ______% increase in mortality due to predation.", options: [], answer: "50|fifty", explanation: "The passage states fish 'exhibited a 50% increase in mortality due to predation in field experiments.'" },
      { kind: "fill-blank", question: "Under current emission trajectories, surface ocean pH is projected to decline by a further 0.3 to ______ units by 2100.", options: [], answer: "0.4|0.40", explanation: "The passage states pH 'is projected to decline by a further 0.3 to 0.4 units by 2100.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 3: The Rise of Telemedicine (B2)
  // mcq + tfng
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-telemedicine",
    title: "The Rise of Telemedicine",
    titleVi: "Su phat trien cua y te tu xa",
    level: "B2",
    category: "ielts",
    passage: [
      "The Rise of Telemedicine",
      "",
      "A. Telemedicine — the delivery of healthcare services through electronic communication technologies — has existed in various forms for over a century. In 1924, a speculative illustration in the magazine Radio News depicted a doctor examining a patient remotely via a combination of a television screen and a mechanical stethoscope. While the technology of the era was far too primitive to realise such a vision, the concept itself proved remarkably prescient. By the 1960s, the National Aeronautics and Space Administration (NASA) was developing telemedicine systems to monitor the health of astronauts in space, and the University of Nebraska had established one of the first video-linked medical consultation services, connecting a psychiatric institute with a state hospital 112 miles away.",
      "",
      "B. For decades, however, telemedicine remained a marginal practice, largely confined to specialist consultations in remote or underserved areas where in-person care was unavailable. The technology was expensive, the video quality was often poor, and many physicians were sceptical about the diagnostic accuracy of virtual examinations. Regulatory barriers further inhibited adoption: in the United States, medical licensing was administered at the state level, meaning that a physician licensed in California could not legally treat a patient in Nevada via telemedicine without obtaining a separate Nevada licence. Insurance reimbursement for virtual consultations was also inconsistent, with many payers refusing to cover telemedicine visits at the same rate as in-person appointments.",
      "",
      "C. The COVID-19 pandemic, which began in early 2020, transformed telemedicine from a niche service into a mainstream mode of healthcare delivery virtually overnight. As hospitals and clinics restricted in-person visits to reduce viral transmission, telemedicine became the only available channel for many non-emergency consultations. In the United States, telehealth visits increased by an astonishing 4,347% between March and June 2020 compared with the same period in 2019. The federal government temporarily relaxed regulatory restrictions, allowing physicians to practise across state lines and mandating that Medicare reimburse telehealth visits at the same rate as in-person consultations. Similar emergency measures were enacted in the United Kingdom, Australia, Canada, and throughout the European Union.",
      "",
      "D. The rapid expansion of telemedicine during the pandemic revealed both its considerable strengths and its significant limitations. For routine follow-up appointments, medication management, mental health counselling, and chronic disease monitoring, telemedicine proved highly effective. A study published in the Journal of the American Medical Association in 2021 found that patient satisfaction with telehealth visits for these categories was statistically equivalent to satisfaction with in-person visits, and that clinical outcomes for patients with diabetes, hypertension, and depression were comparable across both modalities. Mental health services adapted particularly well to the virtual format: a survey by the American Psychological Association found that 96% of psychologists who offered teletherapy during the pandemic rated it as effective for their patients.",
      "",
      "E. Physical examinations, however, remain a fundamental limitation of telemedicine. Physicians cannot palpate an abdomen, auscultate lungs with a stethoscope, perform a neurological assessment, or inspect a suspicious skin lesion with the same precision through a camera as they can in person. Diagnostic errors in telemedicine are a growing concern. A 2022 study in BMJ Quality & Safety analysed 2,000 malpractice claims involving telehealth visits and found that the most common diagnostic failures involved conditions requiring physical examination — including appendicitis, pulmonary embolism, and skin cancers — that were misdiagnosed or diagnosed late because the clinician could not conduct a hands-on assessment. The study recommended that telehealth platforms incorporate structured triage protocols to identify consultations that require an in-person component.",
      "",
      "F. The digital divide represents another significant barrier to equitable telemedicine access. Telemedicine assumes that patients have access to a reliable internet connection, a device capable of video conferencing, and sufficient digital literacy to navigate telehealth platforms. In the United States, approximately 21 million people — disproportionately concentrated in rural areas, low-income communities, and among elderly populations — lack access to broadband internet. A 2021 analysis published in Health Affairs found that telehealth utilisation during the pandemic was 40% lower among patients over the age of 65, 30% lower among Black and Hispanic patients, and 50% lower among patients with household incomes below the federal poverty line, compared with younger, white, and higher-income populations respectively.",
      "",
      "G. Looking forward, most healthcare analysts expect telemedicine to settle into a hybrid model rather than replacing in-person care entirely. The McKinsey Global Institute estimated in 2022 that approximately 20% of all healthcare interactions in developed countries could permanently shift to virtual delivery — a proportion that would represent roughly a five-fold increase over pre-pandemic levels but would still leave the substantial majority of clinical encounters occurring face-to-face. Investment in remote monitoring technologies — including wearable sensors that track heart rhythm, blood glucose, and oxygen saturation in real time — is expected to expand the scope of conditions that can be effectively managed at a distance. The challenge for healthcare systems will be to integrate virtual and in-person care seamlessly, ensuring that telemedicine enhances rather than fragments the patient experience.",
    ].join("\n"),
    questions: [
      // mcq (4 questions)
      { kind: "mcq", question: "What was the main reason telemedicine remained marginal before the COVID-19 pandemic?", options: ["Patients universally preferred face-to-face appointments.", "Physicians were prohibited by law from using video technology.", "Regulatory barriers, cost, and physician scepticism limited its adoption.", "Internet bandwidth was too low for any form of video communication."], answer: "C", explanation: "Paragraph B identifies multiple barriers: expensive technology, poor video quality, physician scepticism, state-level licensing restrictions, and inconsistent insurance reimbursement. Option C captures this combination. Options A and D are too absolute; option B is factually incorrect." },
      { kind: "mcq", question: "By what factor did telehealth visits increase in the US between March and June 2020?", options: ["Approximately 20 times", "Approximately 43 times", "Approximately 100 times", "Approximately 200 times"], answer: "B", explanation: "The passage states a 4,347% increase. A 4,347% increase means roughly 43.47 times the original figure, so approximately 43 times." },
      { kind: "mcq", question: "According to the BMJ Quality & Safety study, which type of condition was most commonly misdiagnosed via telemedicine?", options: ["Conditions that respond well to medication management", "Mental health disorders requiring counselling", "Conditions requiring physical examination", "Conditions that can be monitored with wearable sensors"], answer: "C", explanation: "Paragraph E states the most common diagnostic failures 'involved conditions requiring physical examination — including appendicitis, pulmonary embolism, and skin cancers.'" },
      { kind: "mcq", question: "What proportion of healthcare interactions could permanently shift to virtual delivery according to the McKinsey estimate?", options: ["About 5%", "About 20%", "About 35%", "About 50%"], answer: "B", explanation: "Paragraph G states McKinsey estimated 'approximately 20% of all healthcare interactions in developed countries could permanently shift to virtual delivery.'" },
      // tfng (5 questions)
      { kind: "tfng", question: "NASA began developing telemedicine systems for astronaut health monitoring in the 1960s.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph A states 'By the 1960s, the National Aeronautics and Space Administration (NASA) was developing telemedicine systems to monitor the health of astronauts in space.'" },
      { kind: "tfng", question: "The University of Nebraska's early telemedicine service connected two hospitals that were more than 200 miles apart.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states the distance was '112 miles,' not more than 200 miles." },
      { kind: "tfng", question: "Patient satisfaction with telehealth for mental health services was higher than for in-person therapy.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage says 96% of psychologists rated teletherapy as effective, and that satisfaction was 'statistically equivalent' for certain categories, but it does not say mental health telehealth satisfaction was higher than in-person satisfaction." },
      { kind: "tfng", question: "Telehealth utilisation during the pandemic was 50% lower among patients with incomes below the federal poverty line.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph F explicitly states telehealth utilisation was '50% lower among patients with household incomes below the federal poverty line.'" },
      { kind: "tfng", question: "The McKinsey estimate of 20% virtual delivery would represent a ten-fold increase over pre-pandemic levels.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states this would represent 'roughly a five-fold increase over pre-pandemic levels,' not ten-fold." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 4: Deforestation and Indigenous Communities (C1)
  // matching-headings + matching-sentence-endings
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-deforestation-indigenous",
    title: "Deforestation and Indigenous Communities",
    titleVi: "Pha rung va cong dong ban dia",
    level: "C1",
    category: "ielts",
    passage: [
      "Deforestation and Indigenous Communities",
      "",
      "A. The destruction of tropical forests has long been framed primarily as an environmental crisis — a threat to biodiversity, carbon storage, and hydrological cycles. While this framing is accurate, it obscures a parallel human catastrophe: the systematic displacement and cultural erosion of indigenous peoples whose territories coincide with the world's most biodiverse and carbon-dense forests. An estimated 370 million indigenous people inhabit approximately 22% of the Earth's land surface, and their territories encompass roughly 80% of the planet's remaining biodiversity. The fate of these communities and the fate of the forests they have managed for millennia are inextricably intertwined.",
      "",
      "B. Indigenous land management practices, refined over thousands of years, have proven remarkably effective at maintaining forest health. In the Brazilian Amazon, satellite analysis conducted by the Instituto de Pesquisa Ambiental da Amazonia demonstrated that deforestation rates within formally demarcated indigenous territories were between 6 and 18 times lower than in comparable unprotected areas during the period 2000 to 2020. Indigenous fire management techniques — including controlled low-intensity burns that clear underbrush and create natural firebreaks — have been shown to reduce the incidence of catastrophic wildfires by up to 30% in Australian Aboriginal-managed savannahs. These findings have led a growing number of conservation scientists to argue that supporting indigenous land rights is not merely a matter of social justice but is one of the most cost-effective strategies for climate change mitigation available.",
      "",
      "C. The carbon stored within indigenous-managed forests is of global significance. A 2021 report by the United Nations Food and Agriculture Organization and the Fund for the Development of Indigenous Peoples of Latin America and the Caribbean calculated that indigenous and tribal territories in Latin America alone contain approximately 34 billion tonnes of carbon — more than the combined annual emissions of China, the United States, and the European Union for an entire year. When these forests are cleared, this carbon is released into the atmosphere, accelerating climate change. The report noted that between 2003 and 2016, carbon emissions from deforestation within indigenous territories increased by 12%, a trend driven primarily by encroachment from cattle ranchers, illegal loggers, and mining operations operating with impunity on indigenous land.",
      "",
      "D. Government policies have often exacerbated rather than alleviated the pressures on indigenous forests. In Brazil, the rapid expansion of soybean cultivation and cattle ranching in the Amazon has been facilitated by tax incentives, subsidised credit programmes, and the construction of road infrastructure — notably the BR-163 highway — that opens previously inaccessible forest areas to commercial exploitation. In Indonesia, the government's transmigration programme, which between 1969 and 2000 relocated approximately 8 million people from densely populated Java to the outer islands, resulted in the conversion of millions of hectares of indigenous forest land to palm oil plantations and rice paddies. These state-sponsored initiatives have systematically prioritised short-term economic development over both environmental sustainability and the customary land rights of indigenous populations.",
      "",
      "E. The limitations of technology-driven monitoring approaches further compound the vulnerability of indigenous territories. While satellite-based deforestation alerts — such as those produced by the University of Maryland's Global Forest Watch programme — can detect large-scale forest clearance in near real time, they are less effective at identifying the incremental encroachment, selective logging, and small-scale land grabs that constitute the most common threats to indigenous forests. Moreover, the detection of deforestation does not guarantee enforcement. In many countries, the agencies responsible for environmental enforcement are chronically underfunded and lack the personnel to investigate alerts in remote forest areas. Satellite data, regardless of its precision, cannot substitute for the on-the-ground governance structures and territorial patrols that indigenous communities themselves provide.",
      "",
      "F. The psychological and cultural consequences of forest loss for indigenous communities are profound but frequently overlooked in policy discussions. Forced displacement from ancestral territory disrupts not only livelihoods but also the spiritual practices, ceremonial traditions, and intergenerational knowledge transmission systems that are embedded in specific landscapes. The Yanomami people of the Brazil-Venezuela border region, for example, maintain an elaborate cosmological system in which particular mountains, rivers, and forest areas are inhabited by spiritual beings whose wellbeing is understood to be interdependent with that of the community. Displacement from these sacred sites produces what psychologists have termed solastalgia — a form of existential distress caused by the loss of a homeland — which manifests in elevated rates of depression, substance abuse, and suicide among displaced indigenous populations.",
      "",
      "G. More hopeful models have emerged in recent years, demonstrating that conservation and indigenous rights can be mutually reinforcing rather than competing objectives. In Australia, the Indigenous Protected Areas programme, established in 1997, enables Aboriginal and Torres Strait Islander communities to manage their traditional lands as part of the National Reserve System while receiving government funding for land management activities. The programme now covers over 74 million hectares — more than 40% of the total National Reserve System. In the Peruvian Amazon, community-based monitoring programmes have equipped indigenous forest rangers with GPS-enabled smartphones and drone technology, enabling them to document illegal incursions and submit geo-referenced evidence to prosecutors. A 2019 evaluation found that these community patrols reduced illegal deforestation by 52% in participating territories compared with unpatrolled areas.",
    ].join("\n"),
    questions: [
      // matching-headings (5 paragraphs matched, 2 distractors: iv, v)
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P4_HEADINGS, answer: "I", explanation: "Paragraph B presents evidence that indigenous fire management reduces wildfire incidence and that supporting indigenous land rights is 'one of the most cost-effective strategies for climate change mitigation' — an economic argument for preservation. Heading ix ('Economic arguments for preserving indigenous land management') matches. Heading iv about government incentives is a distractor — Paragraph D covers that topic." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P4_HEADINGS, answer: "C", explanation: "Paragraph C quantifies the carbon stored in indigenous territories — 34 billion tonnes — and compares it to the combined emissions of major nations. Heading iii ('The disproportionate role of indigenous territories in carbon storage') fits precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P4_HEADINGS, answer: "D", explanation: "Paragraph D describes how Brazilian tax incentives, Indonesian transmigration programmes, and road construction facilitated forest clearance. Heading iv ('Government incentives that accelerate forest clearance') matches directly." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P4_HEADINGS, answer: "H", explanation: "Paragraph F discusses solastalgia, elevated depression, substance abuse, and suicide among displaced peoples — the psychological toll. Heading viii ('The psychological toll of displacement on indigenous peoples') fits." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P4_HEADINGS, answer: "G", explanation: "Paragraph G describes Australia's Indigenous Protected Areas programme and Peru's community-based monitoring — collaborative models that combine conservation with community benefit. Heading vii ('Collaborative models that benefit both conservation and communities') matches." },
      // matching-sentence-endings (4 questions, 7 endings — 3 distractors: A, B, D)
      { kind: "matching-sentence-endings", question: "Conservation scientists increasingly support indigenous land rights...", options: P4_SENTENCE_ENDINGS, answer: "F", explanation: "Paragraph B states that indigenous fire management reduces wildfire incidence by up to 30%, supporting the argument that indigenous practices are effective conservation tools. Ending F captures this evidence." },
      { kind: "matching-sentence-endings", question: "Indigenous forests contain globally significant carbon stocks...", options: P4_SENTENCE_ENDINGS, answer: "C", explanation: "Paragraph C states that indigenous territories in Latin America alone contain approximately 34 billion tonnes of carbon — more than the combined annual emissions of major nations. Ending C reflects this." },
      { kind: "matching-sentence-endings", question: "Displacement from ancestral territory causes psychological harm...", options: P4_SENTENCE_ENDINGS, answer: "E", explanation: "Paragraph F discusses solastalgia and how forced displacement disrupts spiritual practices tied to specific landscapes. Ending E captures the neglect of spiritual connections in resettlement." },
      { kind: "matching-sentence-endings", question: "Indigenous medicinal knowledge is increasingly at risk...", options: P4_SENTENCE_ENDINGS, answer: "G", explanation: "While the passage discusses knowledge transmission systems being disrupted by displacement, ending G addresses the broader issue of pharmaceutical exploitation of plant knowledge — a risk that is compounded when habitat destruction eliminates both the plants and the communities that understand their properties." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 5: The History of Antibiotics (B2)
  // matching-features + fill-blank
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-history-antibiotics",
    title: "The History of Antibiotics",
    titleVi: "Lich su cua khang sinh",
    level: "B2",
    category: "ielts",
    passage: [
      "The History of Antibiotics",
      "",
      "A. The discovery of antibiotics is widely regarded as one of the most transformative events in the history of medicine. Before the twentieth century, bacterial infections were a leading cause of death worldwide. A simple cut could become a fatal wound if bacteria entered the bloodstream, and diseases such as tuberculosis, pneumonia, and scarlet fever claimed millions of lives every year. Surgeons operated with minimal hygiene, and post-operative infections killed roughly half of all patients who underwent major procedures. The average life expectancy in Europe at the beginning of the twentieth century was approximately 47 years, a figure kept low in large part by the prevalence of infectious disease.",
      "",
      "B. The groundwork for modern antibiotic therapy was laid not by a single breakthrough but by a series of incremental discoveries. In 1909, the German scientist Paul Ehrlich developed Salvarsan, an arsenic-based compound that proved effective against syphilis. Ehrlich coined the term 'magic bullet' to describe his vision of a chemical substance that could selectively destroy disease-causing microorganisms without harming the patient — a concept that remains central to pharmacology today. However, Salvarsan was highly toxic, difficult to administer, and effective against only a narrow range of infections, so its practical impact was limited. In the 1930s, Gerhard Domagk, a German pathologist working at the Bayer pharmaceutical company, demonstrated that the red dye Prontosil could cure streptococcal infections in mice. Further research revealed that the active antibacterial component was sulfonamide, a simpler molecule released when Prontosil was metabolised in the body. Domagk was awarded the Nobel Prize in Physiology or Medicine in 1939 for this discovery, though the Nazi government forced him to decline the award.",
      "",
      "C. The most celebrated chapter in antibiotic history began in September 1928, when Alexander Fleming, a Scottish bacteriologist at St Mary's Hospital in London, noticed that a mould of the genus Penicillium had contaminated one of his Staphylococcus culture plates. The bacteria immediately surrounding the mould had been killed, creating a clear zone of inhibition. Fleming identified the antibacterial substance produced by the mould and named it penicillin. He published his findings in the British Journal of Experimental Pathology in 1929, but lacked the resources and chemical expertise to purify the compound for clinical use. It was not until 1940 that Howard Florey and Ernst Boris Chain, working at the University of Oxford, successfully extracted and concentrated penicillin in sufficient quantities for animal testing. Their results were dramatic: mice infected with lethal doses of streptococci survived when treated with penicillin.",
      "",
      "D. The mass production of penicillin during the Second World War represented a remarkable feat of scientific and industrial collaboration. Florey travelled to the United States in 1941 to enlist American pharmaceutical companies in the effort. The US War Production Board classified penicillin as a strategic war material and coordinated its manufacture across 21 companies. By June 1944, enough penicillin had been produced to treat every Allied soldier wounded during the D-Day invasion of Normandy. Production surged from approximately 400 million units per month in early 1943 to over 650 billion units per month by the end of 1945 — a more than 1,600-fold increase in less than three years. Fleming, Florey, and Chain shared the Nobel Prize in Physiology or Medicine in 1945.",
      "",
      "E. The decades following the war are sometimes referred to as the golden age of antibiotic discovery. Between 1940 and 1962, more than 20 distinct classes of antibiotics were identified, most derived from soil microorganisms. Selman Waksman, a Ukrainian-born microbiologist at Rutgers University, developed a systematic screening programme that led to the discovery of streptomycin in 1943 — the first effective treatment for tuberculosis. His laboratory subsequently identified neomycin, chloramphenicol, and several other compounds. Meanwhile, researchers at Eli Lilly isolated vancomycin from a soil sample collected in Borneo in 1953, producing what would later be called the antibiotic of last resort due to its effectiveness against bacteria resistant to other drugs.",
      "",
      "F. After 1962, however, the rate of new antibiotic discovery slowed dramatically. Only two new classes of antibiotics have been introduced since 1987 — a development gap that scientists have termed the discovery void. The reasons for this decline are both scientific and economic. The easily accessible soil microorganisms that yielded the golden-age antibiotics have been extensively screened, and finding genuinely novel compounds requires more sophisticated and expensive technologies. At the same time, pharmaceutical companies have shifted investment away from antibiotics because the return on investment is low: unlike drugs for chronic conditions, which patients take for years or decades, antibiotics are typically prescribed for short courses, and the most effective new antibiotics would be reserved as last-resort treatments, further limiting sales volume.",
      "",
      "G. The consequences of the discovery void are now becoming apparent. The World Health Organization declared antimicrobial resistance one of the top ten global public health threats in 2019. An estimated 1.27 million deaths were directly attributable to antibiotic-resistant infections in 2019, and a further 4.95 million deaths were associated with resistance. If current trends continue, drug-resistant infections are projected to cause 10 million deaths annually by 2050 — more than cancer. To address this crisis, governments and international organisations have proposed a range of measures, including incentive programmes that delink antibiotic revenue from sales volume, increased public funding for basic research, global surveillance networks for resistance patterns, and stricter regulations on the use of antibiotics in animal agriculture, which accounts for approximately 73% of all antibiotic consumption worldwide.",
    ].join("\n"),
    questions: [
      // matching-features (5 questions: match researcher to finding/contribution)
      { kind: "matching-features", question: "Who developed the first effective chemical treatment for syphilis?", options: ["Paul Ehrlich", "Gerhard Domagk", "Alexander Fleming", "Howard Florey and Ernst Chain", "Selman Waksman"], answer: "A", explanation: "Paragraph B states Paul Ehrlich developed Salvarsan in 1909, 'an arsenic-based compound that proved effective against syphilis.'" },
      { kind: "matching-features", question: "Who demonstrated that a red dye could cure streptococcal infections in laboratory animals?", options: ["Paul Ehrlich", "Gerhard Domagk", "Alexander Fleming", "Howard Florey and Ernst Chain", "Selman Waksman"], answer: "B", explanation: "Paragraph B states Gerhard Domagk 'demonstrated that the red dye Prontosil could cure streptococcal infections in mice.'" },
      { kind: "matching-features", question: "Who first observed the antibacterial properties of the Penicillium mould?", options: ["Paul Ehrlich", "Gerhard Domagk", "Alexander Fleming", "Howard Florey and Ernst Chain", "Selman Waksman"], answer: "C", explanation: "Paragraph C describes how Alexander Fleming noticed the Penicillium mould had killed surrounding bacteria on his culture plate." },
      { kind: "matching-features", question: "Who successfully purified penicillin for animal testing?", options: ["Paul Ehrlich", "Gerhard Domagk", "Alexander Fleming", "Howard Florey and Ernst Chain", "Selman Waksman"], answer: "D", explanation: "Paragraph C states that Florey and Chain 'successfully extracted and concentrated penicillin in sufficient quantities for animal testing.'" },
      { kind: "matching-features", question: "Who developed a systematic method for screening soil microorganisms that led to the first tuberculosis treatment?", options: ["Paul Ehrlich", "Gerhard Domagk", "Alexander Fleming", "Howard Florey and Ernst Chain", "Selman Waksman"], answer: "E", explanation: "Paragraph E states Selman Waksman 'developed a systematic screening programme that led to the discovery of streptomycin in 1943 — the first effective treatment for tuberculosis.'" },
      // fill-blank (5 questions)
      { kind: "fill-blank", question: "The average life expectancy in Europe at the beginning of the twentieth century was approximately ______ years.", options: [], answer: "47|forty-seven", explanation: "Paragraph A states 'The average life expectancy in Europe at the beginning of the twentieth century was approximately 47 years.'" },
      { kind: "fill-blank", question: "By the end of 1945, penicillin production had reached over ______ billion units per month.", options: [], answer: "650|six hundred and fifty", explanation: "Paragraph D states production reached 'over 650 billion units per month by the end of 1945.'" },
      { kind: "fill-blank", question: "Vancomycin was isolated from a soil sample collected in ______ in 1953.", options: [], answer: "Borneo|borneo", explanation: "Paragraph E states researchers 'isolated vancomycin from a soil sample collected in Borneo in 1953.'" },
      { kind: "fill-blank", question: "An estimated ______ million deaths were directly attributable to antibiotic-resistant infections in 2019.", options: [], answer: "1.27", explanation: "Paragraph G states 'An estimated 1.27 million deaths were directly attributable to antibiotic-resistant infections in 2019.'" },
      { kind: "fill-blank", question: "Animal agriculture accounts for approximately ______% of all antibiotic consumption worldwide.", options: [], answer: "73|seventy-three", explanation: "Paragraph G states 'animal agriculture, which accounts for approximately 73% of all antibiotic consumption worldwide.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PASSAGE 6: Space Debris: The Growing Threat to Satellites (C1)
  // mcq + tfng + matching-information
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-practice-space-debris",
    title: "Space Debris: The Growing Threat to Satellites",
    titleVi: "Rac khong gian: Moi de doa ngay cang tang doi voi ve tinh",
    level: "C1",
    category: "ielts",
    passage: [
      "Space Debris: The Growing Threat to Satellites",
      "",
      "A. In the six decades since the Soviet Union launched Sputnik 1 in October 1957, humanity has placed thousands of objects into Earth orbit. As of 2024, approximately 10,000 active satellites circle the planet, performing functions essential to modern civilisation: telecommunications, weather forecasting, GPS navigation, military surveillance, scientific observation, and internet connectivity. However, these operational satellites constitute only a small fraction of the objects currently orbiting Earth. The United States Space Surveillance Network tracks approximately 36,500 objects larger than 10 centimetres in diameter, but statistical models estimate that there are also roughly 1 million objects between 1 and 10 centimetres in size and over 130 million fragments smaller than 1 centimetre. This accumulated cloud of defunct satellites, spent rocket stages, fragmentation debris, and mission-related objects — collectively known as space debris or orbital debris — poses a rapidly escalating threat to the space infrastructure upon which modern society depends.",
      "",
      "B. The physics of orbital debris make even the smallest fragments extraordinarily dangerous. Objects in low Earth orbit travel at velocities of approximately 7.8 kilometres per second — roughly 28,000 kilometres per hour. At these speeds, a fleck of paint less than a millimetre across carries the kinetic energy of a rifle bullet, and an object the size of a marble can deliver the destructive force of a hand grenade. The windows of the International Space Station have been chipped on multiple occasions by impacts with particles too small to track, and several spacecraft — including the European Space Agency's Sentinel-1A Earth observation satellite in 2016 — have suffered significant damage from collisions with debris fragments estimated to be only a few centimetres in size. NASA engineers have calculated that an untracked object as small as 1.4 centimetres could penetrate the ISS pressurised modules, potentially causing a catastrophic depressurisation event.",
      "",
      "C. The most significant source of new debris in recent history was the deliberate destruction of the Chinese weather satellite Fengyun-1C during an anti-satellite missile test conducted by the People's Republic of China in January 2007. The test, which targeted the satellite at an altitude of 865 kilometres, generated over 3,500 trackable fragments and an estimated 150,000 pieces too small to catalogue. Because of the altitude at which the test occurred — well above the atmospheric drag that gradually causes debris in lower orbits to re-enter and burn up — most of these fragments will remain in orbit for decades or even centuries. The 2009 collision between the operational Iridium 33 communications satellite and the defunct Russian military satellite Kosmos-2251 added a further 2,300 trackable objects, demonstrating that even accidental collisions in space can generate debris on a massive scale.",
      "",
      "D. In 1978, NASA scientist Donald Kessler proposed a theoretical scenario that has since become known as the Kessler syndrome. Kessler hypothesised that beyond a certain critical density of objects in orbit, collisions between them would generate fragments that would in turn collide with other objects, producing more fragments in a self-sustaining cascade. This chain reaction would eventually render certain orbital bands so congested with fast-moving debris that they would become effectively unusable for satellites or human spaceflight. Although the Kessler syndrome in its most extreme form has not yet occurred, modelling by the European Space Agency's Space Debris Office suggests that the current population of objects in low Earth orbit may already be sufficient to sustain a slow-motion collisional cascade, even if no further objects are launched into space.",
      "",
      "E. The rapid expansion of large satellite constellations has intensified concerns about the long-term sustainability of the orbital environment. SpaceX's Starlink network alone has deployed over 5,500 satellites into low Earth orbit as of early 2024, with plans to expand the constellation to as many as 42,000 satellites. Amazon's Project Kuiper, OneWeb, and several Chinese constellation projects are planning deployments of comparable scale. While these constellations are designed with end-of-life deorbiting capabilities — Starlink satellites are engineered to re-enter the atmosphere within five years of their operational life ending — the sheer number of objects increases the probability of collisions and demands that deorbiting systems function with near-perfect reliability. A failure rate of even 5% across a 42,000-satellite constellation would leave approximately 2,100 uncontrolled objects in orbit.",
      "",
      "F. Active debris removal technologies are under development but remain in the early stages of demonstration. The European Space Agency's ClearSpace-1 mission, scheduled for launch in 2026, aims to capture and deorbit a single piece of debris — a Vega Secondary Payload Adapter left in orbit in 2013 — using a four-armed robotic capture mechanism. The Japanese company Astroscale launched its ELSA-d demonstration mission in 2021, successfully testing magnetic capture technology in orbit. Other proposed approaches include harpoon systems, net capture devices, laser-based systems that ablate debris surfaces to alter their orbits, and ion-beam shepherd spacecraft that use directed ion streams to push debris toward atmospheric re-entry. However, each of these technologies faces formidable technical challenges, and the cost of removing even a single large piece of debris is estimated at between 10 and 30 million dollars.",
      "",
      "G. The governance of space debris is complicated by the absence of binding international regulations. The United Nations Committee on the Peaceful Uses of Outer Space issued voluntary Space Debris Mitigation Guidelines in 2007, recommending that operators limit post-mission orbital lifetimes to 25 years — a threshold that many scientists now consider inadequate. The Outer Space Treaty of 1967, which forms the foundation of international space law, assigns liability for damage caused by space objects to the launching state but does not require states to remove their debris or impose penalties for generating it. Proposals for a more robust regulatory framework — including a binding international treaty on debris mitigation, mandatory collision insurance, orbital-use fees, and tradeable debris permits modelled on carbon-emission trading systems — have been discussed in academic and diplomatic circles but face significant political obstacles, not least because the nations with the largest debris contributions are reluctant to accept obligations that could constrain their strategic and commercial space programmes.",
    ].join("\n"),
    questions: [
      // mcq (3 questions)
      { kind: "mcq", question: "What does the passage identify as the most significant single event in generating tracked orbital debris?", options: ["The collision between Iridium 33 and Kosmos-2251 in 2009", "The destruction of Fengyun-1C during a Chinese anti-satellite test in 2007", "The deployment of SpaceX's Starlink constellation", "The launch of Sputnik 1 by the Soviet Union in 1957"], answer: "B", explanation: "Paragraph C describes the Fengyun-1C destruction as 'the most significant source of new debris in recent history,' generating over 3,500 trackable fragments and an estimated 150,000 uncatalogued pieces." },
      { kind: "mcq", question: "According to ESA modelling, the current orbital debris population is:", options: ["too sparse to cause any cascade effect in the foreseeable future.", "possibly sufficient to sustain a slow collisional cascade even without additional launches.", "certain to trigger a full Kessler syndrome within the next decade.", "only dangerous if large satellite constellations continue to expand."], answer: "B", explanation: "Paragraph D states that ESA modelling 'suggests that the current population of objects in low Earth orbit may already be sufficient to sustain a slow-motion collisional cascade, even if no further objects are launched into space.'" },
      { kind: "mcq", question: "Which of the following is presented as a major obstacle to establishing binding international debris regulations?", options: ["The high cost of developing debris removal technologies", "Disagreement over whether debris poses a genuine threat", "The reluctance of major debris-contributing nations to accept constraining obligations", "The absence of any existing international space law framework"], answer: "C", explanation: "Paragraph G states that proposals for binding frameworks 'face significant political obstacles, not least because the nations with the largest debris contributions are reluctant to accept obligations that could constrain their strategic and commercial space programmes.'" },
      // tfng (4 questions)
      { kind: "tfng", question: "The US Space Surveillance Network currently tracks all objects in Earth orbit that are larger than 1 centimetre.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states the network tracks approximately 36,500 objects 'larger than 10 centimetres in diameter,' not 1 centimetre. Objects between 1 and 10 cm are estimated statistically but not individually tracked." },
      { kind: "tfng", question: "A paint fleck travelling at orbital velocity can carry energy comparable to that of a rifle bullet.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph B states 'a fleck of paint less than a millimetre across carries the kinetic energy of a rifle bullet.'" },
      { kind: "tfng", question: "The ClearSpace-1 mission has already successfully captured and deorbited a piece of debris.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Paragraph F states ClearSpace-1 is 'scheduled for launch in 2026' and 'aims to capture and deorbit' a piece of debris. It has not yet done so." },
      { kind: "tfng", question: "The 25-year post-mission orbital lifetime guideline issued by the United Nations is legally binding on all member states.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Paragraph G explicitly describes these as 'voluntary Space Debris Mitigation Guidelines' and notes the absence of 'binding international regulations.'" },
      // matching-information (3 questions)
      { kind: "matching-information", question: "Which paragraph describes a theoretical chain reaction of collisions that could render orbital regions unusable?", options: P6_PARAGRAPHS, answer: "D", explanation: "Paragraph D explains the Kessler syndrome — a self-sustaining cascade of collisions that could make certain orbital bands 'effectively unusable for satellites or human spaceflight.'" },
      { kind: "matching-information", question: "Which paragraph provides specific examples of technologies being developed to physically remove debris from orbit?", options: P6_PARAGRAPHS, answer: "F", explanation: "Paragraph F describes ClearSpace-1's robotic capture mechanism, Astroscale's magnetic capture, harpoon systems, net capture, laser ablation, and ion-beam shepherd spacecraft." },
      { kind: "matching-information", question: "Which paragraph discusses the challenge posed by large commercial satellite constellations to the orbital environment?", options: P6_PARAGRAPHS, answer: "E", explanation: "Paragraph E discusses Starlink's 5,500+ satellites, planned expansion to 42,000, Project Kuiper, OneWeb, and the deorbiting reliability problem." },
    ],
  },
];

async function main() {
  for (const p of passages) {
    const idx = passages.indexOf(p);
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount: wc,
        order: 91 + idx,
      },
      create: {
        slug: p.slug,
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount: wc,
        order: 91 + idx,
      },
    });

    await prisma.readingQuestion.deleteMany({
      where: { passageId: passage.id },
    });

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

    console.log(
      "  OK [" +
        p.level +
        "] " +
        p.slug +
        " (" +
        wc +
        " words, " +
        p.questions.length +
        " questions)"
    );
  }
  console.log("Done! " + passages.length + " passages seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
