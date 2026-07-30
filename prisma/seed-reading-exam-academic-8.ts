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

const examSlug = "ielts-academic-test-8";

const P1_HEADINGS = [
  "i. A well-intentioned policy with outcomes that defied predictions",
  "ii. The assumption that expanding options invariably benefits individuals",
  "iii. Empirical evidence that challenged a fundamental commercial assumption",
  "iv. The cognitive toll of evaluating numerous alternatives simultaneously",
  "v. How awareness of rejected possibilities diminishes contentment",
  "vi. The counterintuitive disadvantage of striving for the optimal selection",
  "vii. Qualifications regarding the universality of the phenomenon",
  "viii. Cultural variations in attitudes toward decision-making autonomy",
  "ix. The commercial exploitation of consumers' desire for variety",
  "x. Historical origins of the philosophical commitment to individual freedom",
  "xi. Neurological evidence for the deterioration of judgement under cognitive load",
];

const P2_PARAGRAPHS = [
  "Paragraph A",
  "Paragraph B",
  "Paragraph C",
  "Paragraph D",
  "Paragraph E",
  "Paragraph F",
  "Paragraph G",
];

const P3_ENDINGS = [
  "the communicative value of the remaining minority language decreases for each continuing speaker.",
  "knowledge with potential applications in pharmacology and conservation may be permanently lost.",
  "each departure from the minority language raises the motivation for others to follow.",
  "successful revival programmes share conditions that are absent for most threatened languages.",
  "a language typically dies not suddenly but through progressive decline across generations.",
  "the pace at which languages are vanishing may exceed the rate of biological species loss.",
  "the dominance patterns resemble those observed in technology platform markets.",
  "governments have universally acknowledged their obligation to preserve minority languages.",
  "recent research has confirmed the strong hypothesis that language entirely determines thought.",
  "digital tools have proven effective at halting language decline in most documented cases.",
];

const passages: PassageData[] = [
  {
    slug: "mock-ac8-paradox-of-choice",
    title: "The Paradox of Choice",
    titleVi: "Nghich ly cua su lua chon",
    level: "C1",
    category: "mock-academic",
    passage: [
      "The Paradox of Choice",
      "",
      "A. The liberal democratic tradition has long held that the expansion of individual choice constitutes an unambiguous good — a position so deeply embedded in Western political and economic thought that questioning it might seem perverse. The underlying logic appears self-evident: if some choice is good, more choice must be better, for it enlarges the domain within which individuals can exercise their autonomy and tailor their lives to their particular preferences. This reasoning, however, rests on assumptions about human cognitive architecture that have been increasingly challenged by empirical research in psychology and behavioural economics, research suggesting that beyond a certain threshold, the proliferation of options can paradoxically undermine the very well-being it purports to enhance.",
      "",
      "B. The seminal demonstration of this effect emerged from an experiment conducted by psychologists Sheena Iyengar and Mark Lepper in 2000, now widely known as the \"jam study.\" At an upscale grocery store in Menlo Park, California, the researchers set up a tasting display that alternated between offering either 6 or 24 varieties of gourmet jam. While the extensive display attracted marginally more initial interest — 60% of passing customers stopped, compared with 40% for the limited display — the purchasing behaviour diverged dramatically. Of those who encountered the 24-jam display, merely 3% proceeded to make a purchase, whereas 30% of those presented with 6 options bought a jar. The larger array, despite its superficial appeal, appeared to induce a form of decisional paralysis that the smaller selection did not.",
      "",
      "C. The mechanisms underlying this phenomenon operate through several distinct but interacting psychological channels. Perhaps the most significant is the escalating cognitive burden that accompanies each additional option in a choice set. Evaluating alternatives requires the decision-maker to hold multiple attributes simultaneously in working memory, to construct and weight comparison criteria, and to anticipate the experiential consequences of options that may be only marginally distinguishable from one another. As the number of alternatives grows, this computational demand can exceed the capacity of the cognitive systems responsible for deliberate reasoning — what the psychologist Daniel Kahneman has termed \"System 2\" processing — producing not a sense of empowerment but one of overwhelm, confusion, and ultimately avoidance.",
      "",
      "D. A related mechanism concerns the corrosive effect of excessive choice on post-decisional satisfaction. When selecting from a small number of alternatives, the rejected options are few and their relative merits easily dismissed. As the set expands, however, the opportunity cost of any particular choice escalates correspondingly: for every feature gained by selecting option A, the decision-maker can readily identify a different attractive feature sacrificed by not selecting options B, C, or D. The psychologist Barry Schwartz, whose influential 2004 book \"The Paradox of Choice\" did much to popularise these findings, argues that this dynamic generates chronic counterfactual thinking — the persistent, nagging suspicion that one of the unchosen alternatives would have been superior — which effectively transforms a satisfactory outcome into an unsatisfying one.",
      "",
      "E. Schwartz further distinguishes between two broad dispositional orientations toward decision-making: \"maximisers,\" who compulsively seek the objectively best option in any given domain, and \"satisficers,\" who adopt a threshold-based strategy, selecting the first option that meets a predetermined standard of acceptability. His research consistently demonstrates that maximisers, despite investing substantially greater time and effort in their decisions and often achieving objectively superior outcomes by conventional metrics, report markedly lower satisfaction, more regret, and greater susceptibility to depression than their satisficing counterparts. The paradox, then, is not merely that more choice can reduce the quality of decisions, but that the very disposition to optimise — to exploit the full range of available options — appears to be psychologically maladaptive.",
      "",
      "F. The phenomenon carries significant implications for institutional design across domains as diverse as healthcare, education, and public policy. In the United States, the Medicare Part D prescription drug programme, introduced in 2006, offered eligible beneficiaries a choice among an average of 40 competing insurance plans — a number that research subsequently demonstrated was so overwhelming that many elderly participants either failed to enrol altogether or selected plans substantially inferior to those they would have chosen from a smaller, curated set. Similarly, evidence from Sweden's partial privatisation of its pension system in 2000, which initially offered participants a choice among 456 investment funds, suggests that the majority of citizens defaulted to the government-selected option, having been effectively paralysed by the scale of the decision.",
      "",
      "G. Critics of the choice-overload hypothesis, however, have cautioned against overgeneralising from what may be a more circumscribed phenomenon than its popularisers suggest. A 2010 meta-analysis by Benjamin Scheibehenne and colleagues, encompassing 50 published studies, found that the average effect size of choice overload across the entire literature was effectively zero, with individual study results varying enormously depending on the decision context, the expertise of the decision-maker, and the degree of differentiation among options. The effect appears most robust when options are difficult to compare, when the decision-maker lacks clear prior preferences, and when no dominant option exists — conditions that, while common in laboratory settings, may not characterise the majority of real-world consumer decisions. The scientific consensus, insofar as one exists, is that excessive choice is a genuine psychological hazard, but one whose manifestation depends critically on contextual moderating variables.",
    ].join("\n"),
    questions: [
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P1_HEADINGS, answer: "B", explanation: "Paragraph A discusses the Western assumption that more choice is always better. Heading ii ('The assumption that expanding options invariably benefits individuals') matches. Heading x ('Historical origins of the philosophical commitment to individual freedom') is a distractor — the paragraph mentions the liberal democratic tradition but focuses on the assumption about choice, not the historical origins of freedom." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P1_HEADINGS, answer: "C", explanation: "Paragraph B describes Iyengar and Lepper's jam study which showed more options led to fewer purchases. Heading iii ('Empirical evidence that challenged a fundamental commercial assumption') fits. Heading ix ('commercial exploitation') is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P1_HEADINGS, answer: "D", explanation: "Paragraph C explains the cognitive burden of processing too many options. Heading iv ('The cognitive toll of evaluating numerous alternatives simultaneously') matches. Heading xi ('Neurological evidence') is a distractor — the paragraph discusses cognitive psychology, not neurology." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P1_HEADINGS, answer: "E", explanation: "Paragraph D discusses how opportunity costs and counterfactual thinking about unchosen options reduce satisfaction. Heading v ('How awareness of rejected possibilities diminishes contentment') captures this precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph E?", options: P1_HEADINGS, answer: "F", explanation: "Paragraph E describes maximisers vs satisficers, showing that those who strive for the best outcome are paradoxically less satisfied. Heading vi ('The counterintuitive disadvantage of striving for the optimal selection') matches. Heading viii ('Cultural variations') is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P1_HEADINGS, answer: "A", explanation: "Paragraph F describes Medicare Part D and Sweden's pension system — policies designed to help citizens through choice that instead caused paralysis. Heading i ('A well-intentioned policy with outcomes that defied predictions') fits precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P1_HEADINGS, answer: "G", explanation: "Paragraph G presents the meta-analysis showing the effect is context-dependent, not universal. Heading vii ('Qualifications regarding the universality of the phenomenon') matches." },
      { kind: "tfng", question: "In Iyengar and Lepper's experiment, customers were ten times more likely to buy jam from the smaller display than the larger one.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — 30% purchased from the 6-jam display versus 3% from the 24-jam display. 30/3 = exactly 10 times." },
      { kind: "tfng", question: "Barry Schwartz first introduced the concepts of 'maximiser' and 'satisficer' in his 2004 book.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage states that Schwartz's 2004 book 'did much to popularise these findings' and that he 'further distinguishes between' the two types, but it does not state whether the concepts were first introduced in that book or in earlier research." },
      { kind: "tfng", question: "Schwartz's research shows that maximisers typically achieve objectively inferior results compared to satisficers.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage explicitly states that maximisers 'often achiev[e] objectively superior outcomes by conventional metrics.' They achieve better results but report lower satisfaction — the question conflates outcomes with satisfaction." },
      { kind: "tfng", question: "The majority of Swedish citizens actively selected their preferred investment fund when the pension system was privatised.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states 'the majority of citizens defaulted to the government-selected option,' meaning they did NOT actively select their preferred fund." },
      { kind: "tfng", question: "Scheibehenne's meta-analysis conclusively disproved the existence of choice overload as a psychological phenomenon.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — While the meta-analysis found 'the average effect size was effectively zero,' the passage concludes that 'excessive choice is a genuine psychological hazard' whose manifestation depends on context. The finding qualified the phenomenon rather than disproving it." },
      { kind: "tfng", question: "Choice overload is most likely to occur when the available options are easily distinguishable from one another.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states the opposite: the effect 'appears most robust when options are difficult to compare,' not when they are easily distinguishable." },
    ],
  },

  {
    slug: "mock-ac8-biomimicry",
    title: "Biomimicry in Engineering",
    titleVi: "Phuong sinh hoc trong ky thuat",
    level: "C1",
    category: "mock-academic",
    passage: [
      "Biomimicry in Engineering",
      "",
      "A. Throughout the history of technological innovation, the most transformative breakthroughs have frequently emerged not from the isolation of the laboratory but from sustained observation of the natural world — a practice that, while ancient in its origins, has been formalised only in recent decades under the rubric of \"biomimicry\" or \"biomimetics.\" The term itself, popularised by the biologist and science writer Janine Benyus in her 1997 book \"Biomimicry: Innovation Inspired by Nature,\" denotes the conscious emulation of biological strategies — evolved over approximately 3.8 billion years of natural selection — to solve human engineering challenges. What distinguishes contemporary biomimicry from the intuitive nature-observation of earlier eras is its systematic, interdisciplinary character: modern practitioners draw upon advances in materials science, nanotechnology, computational modelling, and high-resolution imaging to analyse and replicate biological mechanisms at scales ranging from the molecular to the architectural.",
      "",
      "B. Among the most commercially successful applications of biomimetic principles is the development of drag-reducing surface textures inspired by the skin of fast-swimming sharks. Examination of shark dermal denticles — the tiny, tooth-like scales that cover a shark's body — revealed that their riblet microstructure channels water flow in a manner that significantly reduces turbulent drag. Researchers at the University of Florida translated this insight into Sharklet, an engineered surface pattern of microscopic diamond shapes that not only reduces drag when applied to ship hulls and aircraft fuselages but, quite unexpectedly, also inhibits bacterial colonisation without the use of antibiotics or chemical agents. The mechanism appears to be purely physical: the texture disrupts the ability of bacteria to aggregate into the biofilms that constitute the first stage of infection, representing a potential breakthrough in hospital hygiene at a time when antibiotic resistance has become a critical public health concern.",
      "",
      "C. The architectural profession has perhaps embraced biomimicry most visibly. The Eastgate Centre in Harare, Zimbabwe, designed by architect Mick Pearce in collaboration with engineer Arul Loke, is frequently cited as a landmark in biomimetic architecture. Its passive cooling system draws direct inspiration from the thermoregulatory mechanisms of fungus-cultivating termite mounds, which maintain a remarkably stable internal temperature of approximately 31 degrees Celsius despite external fluctuations ranging from 3 to 42 degrees. The building employs a series of fans and ventilation chimneys that mimic the convective airflow patterns observed in termite structures, drawing cool air through the ground-floor inlets at night, storing it in the building's thermal mass, and expelling warm air through roof-level exhaust stacks during the day. The result is a building that consumes only 10% of the energy used by a conventionally air-conditioned building of comparable size — a saving of approximately $3.5 million in the first five years of operation alone.",
      "",
      "D. At the nanoscale, the so-called \"lotus effect\" has inspired an entire generation of self-cleaning surface technologies. The leaves of the lotus plant (Nelumbo nucifera), revered in Asian cultures as a symbol of purity, maintain their pristine appearance because their surfaces are covered with a hierarchical arrangement of microscopic bumps (papillae) coated with hydrophobic wax crystals. This dual-scale roughness produces extreme water repellency — a property scientists term \"superhydrophobicity\" — causing water droplets to bead up and roll off the surface, carrying contaminant particles with them. The German botanist Wilhelm Barthlott, who first systematically characterised this phenomenon in the 1970s, subsequently licensed the technology to produce Lotusan, a commercial exterior paint that remains clean for years without washing. Similar superhydrophobic coatings have been developed for solar panels, building facades, and automotive windshields, where they reduce maintenance costs and improve functional efficiency.",
      "",
      "E. Gecko adhesion represents another arena in which biological insight has yielded technological innovation of considerable potential. The extraordinary ability of geckos to climb vertical glass surfaces and even traverse ceilings was long attributed to suction or secretions, but detailed electron microscopy revealed a purely mechanical mechanism: each gecko toe pad contains approximately 500,000 hair-like structures called setae, which branch further into hundreds of spatula-shaped tips approximately 200 nanometres wide. These spatulae exploit van der Waals forces — weak intermolecular attractions — to generate adhesion that is collectively powerful yet individually reversible, allowing the gecko to attach and detach its feet approximately 15 times per second during locomotion. Research groups at Stanford University and elsewhere have developed synthetic \"geckskin\" adhesives capable of supporting loads exceeding 300 kilograms on smooth surfaces, with potential applications in robotics, manufacturing, and even surgical wound closure.",
      "",
      "F. The field of biomimetic materials science has expanded considerably beyond surface engineering. The internal structure of bone, which achieves a remarkable combination of strength, lightness, and self-healing capacity through a hierarchical composite architecture of collagen fibres and hydroxyapatite crystals, has informed the design of advanced composite materials for aerospace applications. The abalone shell, composed of relatively weak calcium carbonate arranged in a \"brick-and-mortar\" microstructure with organic polymer interlayers, exhibits fracture toughness approximately 3,000 times greater than its constituent mineral — a performance ratio that has inspired the development of synthetic nacre-like ceramics for body armour and blast-resistant structures.",
      "",
      "G. Notwithstanding these impressive achievements, biomimicry faces inherent constraints that temper expectations of its transformative potential. Biological systems have been optimised by evolution for specific ecological niches under specific environmental pressures, and the engineering requirements of human civilisation do not always align with the selection pressures that shaped a particular organism. Furthermore, the manufacturing processes available to biological organisms — self-assembly at ambient temperature and pressure from a limited palette of abundant elements — differ fundamentally from the high-temperature, high-energy fabrication techniques upon which industrial production currently depends. Bridging this gap between biological elegance and industrial scalability remains the central challenge confronting the field, one that will require not merely the copying of natural forms but a deeper comprehension of the principles that generate them.",
    ].join("\n"),
    questions: [
      { kind: "matching-information", question: "a reference to a surface technology that unexpectedly demonstrated medical benefits", options: P2_PARAGRAPHS, answer: "B", explanation: "Paragraph B describes Sharklet, originally designed to reduce drag, which 'quite unexpectedly, also inhibits bacterial colonisation' — an unintended medical benefit." },
      { kind: "matching-information", question: "a building whose energy consumption is a fraction of conventional equivalents", options: P2_PARAGRAPHS, answer: "C", explanation: "Paragraph C describes the Eastgate Centre consuming 'only 10% of the energy used by a conventionally air-conditioned building.'" },
      { kind: "matching-information", question: "an explanation of why biological designs cannot always be replicated for industrial use", options: P2_PARAGRAPHS, answer: "G", explanation: "Paragraph G discusses the constraints: biological self-assembly differs from high-temperature industrial fabrication." },
      { kind: "matching-information", question: "a material whose structural performance vastly exceeds what its component substances would suggest", options: P2_PARAGRAPHS, answer: "F", explanation: "Paragraph F describes the abalone shell with 'fracture toughness approximately 3,000 times greater than its constituent mineral.'" },
      { kind: "matching-information", question: "a biological mechanism that was initially misidentified by researchers", options: P2_PARAGRAPHS, answer: "E", explanation: "Paragraph E states gecko adhesion 'was long attributed to suction or secretions' but was actually van der Waals forces — the mechanism was misidentified." },
      { kind: "matching-information", question: "how contemporary biomimicry differs from earlier forms of nature observation", options: P2_PARAGRAPHS, answer: "A", explanation: "Paragraph A states: 'What distinguishes contemporary biomimicry from the intuitive nature-observation of earlier eras is its systematic, interdisciplinary character.'" },
      { kind: "matching-information", question: "a natural phenomenon that has been commercially licensed as a consumer product", options: P2_PARAGRAPHS, answer: "D", explanation: "Paragraph D describes how Barthlott 'licensed the technology to produce Lotusan, a commercial exterior paint.'" },
      { kind: "fill-blank", question: "The term 'biomimicry' was popularised by ______ in her 1997 book.", options: [], answer: "Janine Benyus|Benyus|janine benyus|benyus", explanation: "'popularised by the biologist and science writer Janine Benyus in her 1997 book.'" },
      { kind: "fill-blank", question: "The shark-inspired surface texture called Sharklet was developed at the University of ______.", options: [], answer: "Florida|florida", explanation: "'Researchers at the University of Florida translated this insight into Sharklet.'" },
      { kind: "fill-blank", question: "The Eastgate Centre's cooling system was inspired by the mounds built by ______.", options: [], answer: "termites|termite|Termites|Termite", explanation: "'direct inspiration from the thermoregulatory mechanisms of fungus-cultivating termite mounds.'" },
      { kind: "fill-blank", question: "The lotus effect produces extreme water repellency, which scientists call '______'.", options: [], answer: "superhydrophobicity|Superhydrophobicity", explanation: "'a property scientists term superhydrophobicity.'" },
      { kind: "fill-blank", question: "Gecko toe pads exploit ______ forces to achieve reversible adhesion.", options: [], answer: "van der Waals|Van der Waals|van der waals", explanation: "'These spatulae exploit van der Waals forces — weak intermolecular attractions.'" },
      { kind: "fill-blank", question: "Synthetic nacre-like ceramics, inspired by ______ shell structure, are being developed for body armour.", options: [], answer: "abalone|Abalone", explanation: "'The abalone shell... has inspired the development of synthetic nacre-like ceramics for body armour.'" },
    ],
  },

  {
    slug: "mock-ac8-language-death",
    title: "The Economics of Language Death",
    titleVi: "Kinh te hoc cua su mat ngon ngu",
    level: "C1",
    category: "mock-academic",
    passage: [
      "The Economics of Language Death",
      "",
      "A. Of the approximately 7,000 languages currently spoken worldwide, linguists estimate that between 50% and 90% will cease to be used by the end of the twenty-first century — a rate of extinction that, by some calculations, exceeds that of biological species. A language is conventionally deemed \"endangered\" when it is no longer being acquired as a first language by children in the community, and \"extinct\" when its last fluent speaker dies — though the latter designation obscures the more typical pattern of gradual attrition, in which successive generations attain diminishing levels of proficiency until the language survives, if at all, only in fragmentary ritual or ceremonial contexts. The scale of this projected loss has prompted UNESCO to classify approximately 2,500 languages as endangered, of which over 500 are listed as \"critically endangered,\" meaning they are spoken by fewer than 100 individuals.",
      "",
      "B. The proximate causes of language death are well-documented and overwhelmingly economic in character. In the vast majority of cases, speakers abandon a heritage language in favour of a dominant regional or global language — English, Mandarin, Spanish, Arabic, or French — because fluency in the dominant language provides access to education, employment, government services, and social mobility that the minority language cannot offer. This process, often described as \"language shift,\" typically unfolds across three generations: the first generation is bilingual but dominant in the heritage language; the second is bilingual but increasingly dominant in the prestige language, particularly in formal and professional contexts; the third acquires the heritage language imperfectly, if at all, and functions primarily or exclusively in the dominant language. The rational calculus underlying this trajectory is straightforward — parents who recognise that their children's economic prospects depend on competence in the majority language may consciously or unconsciously deprioritise transmission of the minority language, even at considerable cultural cost.",
      "",
      "C. The economic pressures driving language shift are amplified by the network effects that characterise language as a communicative technology. A language's utility to any individual speaker is a function not only of its intrinsic expressive capacity but of the number of other speakers with whom it enables communication — a dynamic economists term \"positive network externalities.\" As speakers migrate to a dominant language, the communicative value of the minority language diminishes for those who remain, creating a self-reinforcing cycle in which each defection raises the incentive for further defection. This mechanism mirrors the economic dynamics of technology platforms, where the dominance of a standard (QWERTY keyboards, Microsoft Windows) persists not because it is inherently superior but because the costs of switching away from a widely-adopted system exceed the benefits.",
      "",
      "D. What exactly is lost when a language disappears? Linguists and anthropologists have argued that each language encodes a unique conceptual framework — a particular way of categorising experience, expressing spatial and temporal relationships, and structuring social interaction — that cannot be fully replicated by translation into another language. The Guugu Yimithirr language of northern Queensland, Australia, for instance, lacks egocentric spatial terms equivalent to \"left\" and \"right,\" relying instead on cardinal directions (north, south, east, west) for all spatial reference, which cultivates in its speakers an extraordinary capacity for geographic orientation. The Piraha language of the Brazilian Amazon reportedly lacks precise number words, using only terms roughly translatable as \"few\" and \"many,\" raising fundamental questions about the relationship between language and numerical cognition. While the strong version of linguistic determinism — the claim that language wholly determines thought — has been largely abandoned by the field, the weaker thesis that language significantly influences habitual patterns of attention and reasoning retains substantial empirical support.",
      "",
      "E. Beyond cognitive diversity, endangered languages frequently harbour knowledge of considerable practical value. Indigenous languages encode millennia of accumulated ecological knowledge — detailed taxonomies of local flora and fauna, sophisticated understanding of seasonal patterns and environmental indicators, and traditional medicinal practices — that may have direct applications in pharmacology, conservation biology, and sustainable resource management. The ethnobotanical knowledge embedded in Amazonian indigenous languages, for example, has contributed to the identification of numerous pharmacologically active compounds, yet the vast majority of this knowledge remains unrecorded and will vanish with the languages that carry it. The linguist David Crystal has estimated that a language dies approximately every two weeks, each extinction representing an irreversible deletion from humanity's collective intellectual heritage.",
      "",
      "F. Efforts to reverse language decline have produced mixed results. Language revitalisation programmes — which may include immersion schooling, documentation projects, digital resource development, and the creation of new domains of use in media and public life — have achieved notable successes in certain cases. Hebrew was famously resurrected from liturgical use to become the everyday language of an entire nation-state. Maori in New Zealand, Welsh in the United Kingdom, and Basque in Spain have all experienced significant revivals through sustained institutional and governmental support. However, these cases share characteristics — literate traditions, state backing, substantial speaker populations, and strong identity-based motivations — that are absent for the great majority of the world's endangered languages, most of which are spoken by small, politically marginalised, and economically disadvantaged communities.",
      "",
      "G. The fundamental tension in language preservation is one that economics illuminates but cannot resolve. From a purely individual perspective, the decision to abandon a minority language in favour of a dominant one is rational: it maximises the speaker's communicative reach and economic opportunities. From a collective perspective, however, the aggregate effect of millions of such individually rational decisions constitutes a catastrophic loss of cognitive, cultural, and scientific diversity — a tragedy of the commons in which the shared resource being depleted is humanity's linguistic patrimony. Addressing this tension requires not moral exhortation but structural intervention: policies that increase the economic utility of minority languages, create institutional domains in which they are valued, and reduce the opportunity cost of multilingualism, so that the preservation of linguistic diversity aligns with, rather than contradicts, the interests of individual speakers.",
    ].join("\n"),
    questions: [
      { kind: "matching-sentence-endings", question: "According to the passage, the current rate of language extinction...", options: P3_ENDINGS, answer: "F", explanation: "Paragraph A states language extinction 'exceeds that of biological species,' matching ending F ('the pace at which languages are vanishing may exceed the rate of biological species loss')." },
      { kind: "matching-sentence-endings", question: "The passage indicates that language death typically occurs...", options: P3_ENDINGS, answer: "E", explanation: "Paragraph A describes 'the more typical pattern of gradual attrition, in which successive generations attain diminishing levels of proficiency,' matching ending E." },
      { kind: "matching-sentence-endings", question: "When speakers of a minority language switch to a dominant one, the result is that...", options: P3_ENDINGS, answer: "A", explanation: "Paragraph C: 'the communicative value of the minority language diminishes for those who remain,' matching ending A." },
      { kind: "matching-sentence-endings", question: "The author draws a parallel between language dominance and technology adoption, arguing that...", options: P3_ENDINGS, answer: "G", explanation: "Paragraph C compares language dynamics to 'the economic dynamics of technology platforms,' matching ending G." },
      { kind: "matching-sentence-endings", question: "The passage warns that when indigenous languages disappear...", options: P3_ENDINGS, answer: "B", explanation: "Paragraph E: ethnobotanical knowledge and pharmacologically active compounds 'will vanish with the languages that carry it,' matching ending B." },
      { kind: "matching-sentence-endings", question: "The cases of Hebrew, Maori, Welsh, and Basque suggest that...", options: P3_ENDINGS, answer: "D", explanation: "Paragraph F: these cases 'share characteristics... that are absent for the great majority of the world's endangered languages,' matching ending D." },
      { kind: "matching-sentence-endings", question: "The self-reinforcing nature of language shift means that...", options: P3_ENDINGS, answer: "C", explanation: "Paragraph C: 'each defection raises the incentive for further defection,' matching ending C." },
      { kind: "mcq", question: "The author's primary purpose in writing this passage is to...", options: ["advocate for government policies mandating bilingual education in all schools", "analyse why languages die and examine the consequences of their disappearance", "argue that economic considerations are more important than cultural preservation", "compare the relative effectiveness of different language revitalisation programmes"], answer: "B", explanation: "The passage systematically examines the causes of language death (economic, network effects), what is lost (cognitive diversity, practical knowledge), and what can be done. It analyses rather than advocates." },
      { kind: "mcq", question: "The phrase 'rational calculus' in Paragraph B is used to suggest that language shift is...", options: ["the result of a precise mathematical formula applied to language valuation", "driven by a logical assessment of economic and social opportunities", "motivated primarily by government pressure on minority communities", "the consequence of a deliberate rejection of cultural identity"], answer: "B", explanation: "'Rational calculus' is used metaphorically to describe parents' logical assessment that the dominant language offers better economic prospects for their children." },
      { kind: "mcq", question: "The author mentions QWERTY keyboards and Microsoft Windows in Paragraph C in order to...", options: ["demonstrate that dominance can persist through switching costs rather than inherent superiority", "argue that language standardisation follows the same pattern as technological innovation", "suggest that minority languages are inherently less efficient as communication tools", "illustrate how market forces inevitably determine the survival of all communication systems"], answer: "A", explanation: "The passage states their dominance 'persists not because it is inherently superior but because the costs of switching away from a widely-adopted system exceed the benefits.' This illustrates network effects, not inherent quality." },
      { kind: "mcq", question: "According to Paragraph D, the Guugu Yimithirr language is significant because it...", options: ["demonstrates that some languages are fundamentally more expressive than others", "shows how spatial concepts within a language can shape speakers' cognitive abilities", "provides conclusive evidence that language entirely determines the structure of thought", "illustrates how all indigenous languages encode superior navigational systems"], answer: "B", explanation: "The passage states this language's cardinal-direction system 'cultivates in its speakers an extraordinary capacity for geographic orientation' — spatial concepts influence cognitive ability. It does NOT prove strong determinism (option C) or language superiority (options A, D)." },
      { kind: "mcq", question: "The author's attitude toward the strong version of linguistic determinism can best be described as...", options: ["strongly supportive, citing recent experimental evidence", "neutral, carefully presenting equal evidence for and against the position", "dismissive, noting that the theory has been largely rejected by researchers", "uncertain, suggesting that substantially more research is needed"], answer: "C", explanation: "The passage states 'the strong version of linguistic determinism... has been largely abandoned by the field,' while the weaker version 'retains substantial empirical support.' This is a dismissive stance toward the strong version specifically." },
      { kind: "mcq", question: "The phrase 'tragedy of the commons' in Paragraph G implies that...", options: ["language death is an inevitable process that cannot be slowed by any intervention", "individuals deplete a shared resource by rationally pursuing their own interests", "governments bear sole responsibility for the preservation of minority languages", "the economic value of linguistic diversity has been consistently overestimated"], answer: "B", explanation: "A 'tragedy of the commons' is an economic concept where individually rational actions (switching to dominant language) collectively deplete a shared resource (linguistic diversity). The passage explicitly frames it as individually rational but collectively catastrophic." },
      { kind: "mcq", question: "The passage concludes by suggesting that effective language preservation ultimately requires...", options: ["persuading speakers of the intrinsic cultural and spiritual value of their heritage language", "legally restricting the use of dominant languages within minority communities", "restructuring incentives so that maintaining minority languages benefits speakers economically", "focusing resources exclusively on documenting and archiving endangered languages before they disappear"], answer: "C", explanation: "Paragraph G calls for 'policies that increase the economic utility of minority languages' and 'reduce the opportunity cost of multilingualism, so that the preservation of linguistic diversity aligns with... the interests of individual speakers.' This is about restructuring economic incentives, not cultural persuasion or legal restriction." },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 940 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 940 + passages.indexOf(p) },
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
    update: { title: "IELTS Academic Reading — Test 8", titleVi: "IELTS Academic Reading — Đề 8", type: "academic", difficulty: "hard", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 8", titleVi: "IELTS Academic Reading — Đề 8", type: "academic", difficulty: "hard", timeMinutes: 60, order: 7 },
  });
  console.log("\n  OK Exam: " + exam.slug + " (difficulty: hard)");
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log("Done! 3 passages (" + passages.reduce((s, p) => s + p.questions.length, 0) + " questions) + exam + sections.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
