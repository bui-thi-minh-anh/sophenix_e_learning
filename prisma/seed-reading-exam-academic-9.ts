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

const examSlug = "ielts-academic-test-9";

/* ────────────────────────────────────────────
   Shared option arrays
   ──────────────────────────────────────────── */

const P1_HEADINGS = [
  "i. The emotional consequences of perpetual deferral",
  "ii. A revised understanding of what procrastination actually entails",
  "iii. Biological substrates of the tendency to delay",
  "iv. Strategic postponement as a productive tool",
  "v. Interventions that address the underlying emotional drivers",
  "vi. How anticipated discomfort overrides long-term calculation",
  "vii. The disproportionate weight assigned to the present moment",
  "viii. Evidence that personality alone cannot account for chronic avoidance",
  "ix. The financial and professional toll of habitual delay",
  "x. Cultural attitudes that normalise task avoidance",
  "xi. The distinction between ordinary laziness and compulsive delay",
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
  "the cost of producing each additional copy became negligible once the initial mould had been manufactured.",
  "religious authorities initially embraced the technology as a means of propagating orthodox doctrine.",
  "the social consequences of the innovation extended far beyond what its inventors could have foreseen.",
  "existing power structures attempted to control and restrict access to the new medium.",
  "the democratisation of information fundamentally altered the relationship between rulers and the governed.",
  "earlier technological precedents in East Asia had failed to produce comparable societal transformation.",
  "the technology's impact was delayed by decades due to low rates of literacy among the general population.",
  "the standardisation of vernacular languages was an unintended consequence of commercial incentive.",
  "scholars have overstated the speed with which the innovation displaced earlier methods of production.",
  "the economic model of the new industry required a readership that did not yet exist in sufficient numbers.",
];

/* ────────────────────────────────────────────
   PASSAGE 1 — Psychology / Social Science
   The Psychology of Procrastination
   13 questions: 7 matching-headings + 6 TFNG
   ──────────────────────────────────────────── */

const passage1: PassageData = {
  slug: "mock-ac9-psychology-of-procrastination",
  title: "The Psychology of Procrastination",
  titleVi: "Tam ly hoc cua su tri hoan",
  level: "C1",
  category: "mock-academic",
  passage: [
    "The Psychology of Procrastination",
    "",
    "A. Few behavioural tendencies are as universally recognised, yet as persistently mischaracterised, as procrastination. In popular discourse the term is typically treated as synonymous with laziness or poor time management — a mere deficit of willpower that the sufficiently disciplined individual ought to be able to overcome through sheer determination. Contemporary psychological research, however, has converged on a markedly different conceptualisation. Procrastination, according to the definition now standard in the empirical literature, is the voluntary, irrational delay of an intended course of action despite the expectation that the delay will result in negative consequences. The qualifier 'irrational' is critical: it distinguishes procrastination from deliberate, strategic postponement, in which delay serves a functional purpose such as gathering additional information or awaiting more favourable conditions. The procrastinator, by contrast, delays while fully recognising that doing so is contrary to his or her own interests — a pattern that situates procrastination not as a time-management failure but as a breakdown in the regulation of emotion.",
    "",
    "B. The reconceptualisation of procrastination as fundamentally an emotional regulation problem rather than a cognitive or organisational one represents perhaps the most significant theoretical advance in the field over the past two decades. Research led by the psychologist Timothy Pychyl and his colleagues at Carleton University has demonstrated that when individuals procrastinate, they are not making a rational, if misguided, calculation about the optimal allocation of their time; rather, they are prioritising the management of their immediate negative mood state — anxiety, boredom, frustration, self-doubt, resentment — over the pursuit of their longer-term objectives. The task itself becomes aversive not necessarily because of its intrinsic difficulty but because of the negative emotions it evokes, and the procrastinator copes with this aversion in the only way that provides immediate relief: avoidance. That this relief is temporary, and that it invariably compounds the original distress through accumulated urgency, guilt, and diminished performance, is precisely what makes procrastination irrational — the individual sacrifices future well-being for a transient amelioration of present discomfort.",
    "",
    "C. This present-focused orientation is not merely a metaphorical description but reflects a measurable cognitive bias that behavioural economists term 'temporal discounting' — the systematic tendency to assign disproportionately greater value to immediate rewards and costs relative to those occurring in the future. Experimental studies have consistently demonstrated that procrastinators exhibit steeper temporal discounting curves than non-procrastinators, meaning they devalue future outcomes more sharply as the time horizon extends. A deadline three weeks hence feels, to the chronic procrastinator, almost abstract in its remoteness, whereas the discomfort of beginning an unpleasant task is vivid, concrete, and immediate. This asymmetry in psychological salience — the felt intensity of present experience versus the pallid representation of future consequences — creates a structural bias toward delay that operates largely beneath the threshold of conscious deliberation.",
    "",
    "D. Neuroimaging research has begun to illuminate the neural architecture underlying this bias. Functional magnetic resonance imaging studies have revealed that when procrastinators contemplate aversive tasks, they exhibit heightened activation in the amygdala — the brain region most centrally implicated in threat detection and the generation of fear and anxiety responses — coupled with diminished activity in the dorsolateral prefrontal cortex, which mediates executive functions such as planning, impulse inhibition, and the cognitive reappraisal of emotional stimuli. This pattern suggests that procrastination involves a genuine neurobiological imbalance: the threat-response system effectively overwhelms the regulatory apparatus that would ordinarily enable an individual to override momentary aversion in service of longer-term goals. Importantly, the magnitude of this amygdala-prefrontal imbalance correlates with the severity of procrastinatory behaviour, lending support to the view that chronic procrastination may represent a stable neurological disposition rather than a transient failure of character.",
    "",
    "E. If procrastination were simply a matter of temperamental predisposition, one might expect it to correlate strongly and exclusively with established personality dimensions — and indeed, procrastination does show robust negative associations with conscientiousness, the Big Five personality trait encompassing self-discipline, orderliness, and goal-directed persistence. However, conscientiousness alone accounts for only approximately 20% of the variance in procrastinatory behaviour, leaving the substantial majority unexplained. Additional variance is contributed by neuroticism (the tendency toward negative emotional states), low self-efficacy (doubt about one's capacity to perform the task adequately), perfectionism (the paralysing fear that one's output will fall short of excessively high standards), and what psychologists term 'task aversiveness' — the degree to which the specific activity in question evokes boredom, anxiety, or frustration. The multifactorial nature of procrastination's determinants underscores why simplistic interventions targeting a single dimension — such as instruction in time management or the provision of organisational tools — have generally proven ineffective in reducing chronic procrastination.",
    "",
    "F. More promising therapeutic approaches have emerged from the recognition that procrastination is, at its core, an emotional regulation difficulty. Cognitive behavioural therapy protocols adapted specifically for procrastination focus not on scheduling or prioritisation but on identifying and modifying the catastrophic cognitions and negative self-evaluations that render tasks emotionally aversive. Acceptance and Commitment Therapy, which encourages individuals to acknowledge uncomfortable emotions without attempting to eliminate them, and to act in accordance with their values despite the presence of distress, has shown particular promise in clinical trials conducted by researchers at Stockholm University. Self-compassion interventions — which aim to reduce the harsh self-criticism that both triggers and perpetuates procrastinatory cycles — have likewise demonstrated efficacy, with a series of studies by Sirois and Pychyl showing that individuals who treat their own procrastination with understanding rather than self-condemnation are significantly less likely to procrastinate on subsequent tasks. The common thread linking these approaches is their targeting of the emotional substrate of procrastination rather than its behavioural surface.",
    "",
    "G. The costs of procrastination, both individual and societal, are substantial. Research estimates that approximately 20% of adults in Western societies identify as chronic procrastinators — not occasional delayers but individuals for whom procrastination constitutes a pervasive, debilitating pattern across multiple life domains. Studies have linked chronic procrastination to poorer academic performance, diminished career advancement, increased financial difficulties resulting from delayed bill payment and deferred retirement planning, and compromised physical health arising from postponed medical consultations and neglected preventive behaviours. A longitudinal study by Tice and Baumeister found that while procrastinating students initially reported lower stress levels than their non-procrastinating peers early in the semester — a finding consistent with the short-term mood-repair function of avoidance — by semester's end they exhibited significantly higher stress, more illness episodes, and lower grades. The aggregate economic burden of procrastination-related productivity losses, while difficult to quantify precisely, has been estimated by some researchers at billions of dollars annually in the United States alone.",
  ].join("\n"),
  questions: [
    { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P1_HEADINGS, answer: "B", explanation: "Paragraph A redefines procrastination away from the popular view (laziness) toward its true nature — irrational voluntary delay due to emotional failure, not time-management deficit. Heading ii ('A revised understanding of what procrastination actually entails') captures this reconceptualisation. Heading xi ('The distinction between ordinary laziness and compulsive delay') is a distractor — the paragraph touches on this distinction but its main purpose is a comprehensive redefinition." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P1_HEADINGS, answer: "F", explanation: "Paragraph B explains that procrastinators delay because they prioritise managing immediate discomfort (anxiety, boredom, frustration) over long-term goals. Heading vi ('How anticipated discomfort overrides long-term calculation') matches. Heading i ('emotional consequences of perpetual deferral') is a distractor — the paragraph is about discomfort as the cause of delay, not the emotional consequences of having delayed." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P1_HEADINGS, answer: "G", explanation: "Paragraph C discusses temporal discounting — assigning greater psychological weight to present experience than future outcomes. Heading vii ('The disproportionate weight assigned to the present moment') captures this precisely. Heading ix ('financial and professional toll') is a distractor." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P1_HEADINGS, answer: "C", explanation: "Paragraph D presents neuroimaging findings: heightened amygdala activation and reduced prefrontal cortex activity. Heading iii ('Biological substrates of the tendency to delay') matches. The paragraph focuses on neural architecture, which is biological in nature." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph E?", options: P1_HEADINGS, answer: "H", explanation: "Paragraph E shows that conscientiousness accounts for only 20% of variance, with multiple other factors contributing — demonstrating that personality alone is insufficient. Heading viii ('Evidence that personality alone cannot account for chronic avoidance') matches." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P1_HEADINGS, answer: "E", explanation: "Paragraph F describes CBT, ACT, and self-compassion interventions that target the emotional roots of procrastination. Heading v ('Interventions that address the underlying emotional drivers') matches. Heading iv ('Strategic postponement as a productive tool') is a distractor — the paragraph is about therapy, not productive delay." },
    { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P1_HEADINGS, answer: "I", explanation: "Paragraph G quantifies procrastination's impact: poorer academic results, career setbacks, financial difficulties, health problems, and billions in productivity losses. Heading ix ('The financial and professional toll of habitual delay') matches." },
    { kind: "tfng", question: "Timothy Pychyl's research established that procrastinators delay tasks primarily because they miscalculate how long tasks will take.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states the opposite: procrastinators 'are not making a rational, if misguided, calculation about the optimal allocation of their time; rather, they are prioritising the management of their immediate negative mood state.' The cause is emotional regulation, not time miscalculation." },
    { kind: "tfng", question: "Procrastinators show greater activity in the amygdala and less activity in the dorsolateral prefrontal cortex when facing unpleasant tasks.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph D explicitly states: 'heightened activation in the amygdala... coupled with diminished activity in the dorsolateral prefrontal cortex.'" },
    { kind: "tfng", question: "Conscientiousness is the single most important predictor of procrastination, accounting for the majority of individual variation.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states conscientiousness accounts for 'only approximately 20% of the variance,' explicitly leaving 'the substantial majority unexplained.' It is the strongest single personality correlate but does not account for the majority." },
    { kind: "tfng", question: "Acceptance and Commitment Therapy was originally developed specifically for the treatment of procrastination.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage mentions ACT 'has shown particular promise in clinical trials' for procrastination, but never states whether it was originally developed for procrastination or adapted from another therapeutic context." },
    { kind: "tfng", question: "Students who procrastinated experienced more stress than non-procrastinators throughout the entire academic semester.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states that 'procrastinating students initially reported lower stress levels than their non-procrastinating peers early in the semester.' They only exhibited higher stress 'by semester's end.' The stress was not higher throughout the entire semester." },
    { kind: "tfng", question: "The economic cost of procrastination-related productivity losses in the United States has been precisely calculated at over five billion dollars per year.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage states the burden 'has been estimated by some researchers at billions of dollars annually' but explicitly notes it is 'difficult to quantify precisely.' No specific figure of five billion is mentioned, and the passage hedges the estimate heavily." },
  ],
};

/* ────────────────────────────────────────────
   PASSAGE 2 — Natural Science
   The Microbiome and Human Health
   13 questions: 7 matching-information + 6 fill-blank
   ──────────────────────────────────────────── */

const passage2: PassageData = {
  slug: "mock-ac9-microbiome-human-health",
  title: "The Microbiome and Human Health",
  titleVi: "He vi sinh vat va suc khoe con nguoi",
  level: "C1",
  category: "mock-academic",
  passage: [
    "The Microbiome and Human Health",
    "",
    "A. The human body is host to an extraordinary community of microorganisms — bacteria, archaea, fungi, viruses, and protists — collectively termed the 'microbiome,' which inhabits virtually every surface and cavity of the organism with which it has co-evolved. Current estimates suggest that the human body harbours approximately 38 trillion microbial cells, a figure roughly equivalent to the number of human cells it contains, overturning the long-cited but erroneous claim that microbial cells outnumber human cells by a ratio of ten to one. The vast majority of these microorganisms reside in the gastrointestinal tract, particularly the colon, where bacterial density reaches approximately 10^11 cells per millilitre of intestinal content — a concentration that renders the human gut one of the most densely populated microbial ecosystems on the planet. The collective genome of this microbial community, sometimes called the 'metagenome,' encompasses approximately 3.3 million unique genes, outnumbering the roughly 20,000 protein-coding genes of the human genome by a factor of more than 150, and encoding metabolic capabilities that the human organism itself lacks.",
    "",
    "B. The composition of the gut microbiome is neither random nor static. It is shaped by a complex interplay of host genetics, mode of birth, early feeding practices, antibiotic exposure, diet, geography, and age. Infants born by vaginal delivery acquire their initial microbial colonisation from the maternal birth canal and perineal region, dominated by Lactobacillus species, whereas those delivered by Caesarean section are first colonised by skin-associated bacteria such as Staphylococcus, a distinction that has been associated in epidemiological studies with differential susceptibility to allergic conditions, asthma, and obesity later in life. Breastfeeding further sculpts the infant microbiome through the provision of human milk oligosaccharides — complex sugars that are indigestible by the infant itself but serve as selective substrates for beneficial Bifidobacterium species. By approximately three years of age, the microbiome achieves a relatively stable adult-like configuration, though it remains subject to perturbation by dietary shifts, illness, medication, and environmental exposures throughout the lifespan.",
    "",
    "C. The metabolic contributions of the gut microbiome to human physiology are extensive and, in several instances, indispensable. Gut bacteria ferment dietary fibres that escape digestion in the upper gastrointestinal tract, producing short-chain fatty acids — principally butyrate, propionate, and acetate — that serve as the primary energy source for colonocytes, the epithelial cells lining the colon, and exert systemic anti-inflammatory effects through the modulation of immune signalling pathways. The microbiome synthesises several essential vitamins, including vitamin K, biotin, and folate, that the human genome does not encode the capacity to produce. It participates in the metabolism of bile acids, the biotransformation of xenobiotic compounds including pharmaceutical drugs, and the regulation of intestinal barrier integrity — the selective permeability of the gut lining that permits nutrient absorption while excluding pathogens and toxins. Disruption of this barrier function, a condition termed 'intestinal hyperpermeability' or colloquially 'leaky gut,' has been implicated in the pathogenesis of conditions ranging from inflammatory bowel disease to type 1 diabetes.",
    "",
    "D. Perhaps the most conceptually striking development in microbiome research has been the elucidation of the so-called 'gut-brain axis' — a bidirectional communication network linking the enteric nervous system of the gastrointestinal tract with the central nervous system. This communication operates through multiple channels: the vagus nerve, which provides a direct neural conduit between gut and brain; the production by gut bacteria of neurotransmitters including serotonin, dopamine, and gamma-aminobutyric acid (GABA); the modulation of the hypothalamic-pituitary-adrenal stress axis; and the regulation of systemic inflammatory mediators that can cross the blood-brain barrier. An estimated 90% of the body's serotonin is produced in the gut, predominantly by enterochromaffin cells whose activity is influenced by the surrounding microbial environment. Animal studies have demonstrated that germ-free mice — raised in sterile conditions and lacking a microbiome entirely — exhibit pronounced behavioural abnormalities including elevated anxiety, impaired social interaction, and exaggerated stress responses, many of which can be partially reversed by the introduction of specific bacterial strains.",
    "",
    "E. The therapeutic implications of microbiome research have generated enormous scientific and commercial interest. Faecal microbiota transplantation (FMT), in which a preparation of stool from a healthy donor is introduced into the gastrointestinal tract of a patient, has achieved remarkable success in the treatment of recurrent Clostridioides difficile infection, with cure rates exceeding 90% in clinical trials — a figure that dramatically outperforms conventional antibiotic therapy. The mechanistic rationale is straightforward: C. difficile proliferates opportunistically in the ecological vacuum created by antibiotic-induced depletion of the normal gut flora, and FMT restores the competitive microbial community that holds it in check. Attempts to extend the FMT paradigm to other conditions — inflammatory bowel disease, metabolic syndrome, autism spectrum disorder — have yielded more equivocal results, reflecting the greater complexity of these conditions relative to the comparatively simple ecological disruption underlying C. difficile infection.",
    "",
    "F. The commercial probiotics industry, which generates global revenues exceeding $50 billion annually, has capitalised on public awareness of the microbiome's importance, though the scientific evidence supporting the majority of commercially available probiotic products remains disappointingly thin. Most over-the-counter probiotics contain bacterial strains selected for their ease of cultivation and shelf stability rather than for demonstrated clinical efficacy, and the dosages employed are typically orders of magnitude below those used in clinical research. A landmark 2018 study by Zmora and colleagues at the Weizmann Institute of Science demonstrated that the colonisation patterns of probiotic bacteria vary dramatically between individuals, with some participants showing robust engraftment while others exhibited near-complete resistance to colonisation — a finding that undermines the 'one-size-fits-all' approach implicit in mass-market probiotic formulations. The emerging paradigm of 'precision probiotics' — strain-specific interventions tailored to an individual's existing microbiome composition — represents a more scientifically rigorous approach, though one that remains largely confined to the research setting.",
    "",
    "G. Notwithstanding the field's considerable achievements, microbiome science confronts methodological challenges that warrant caution in the interpretation of its findings. The overwhelming majority of human microbiome studies to date are observational and cross-sectional in design, establishing correlations between microbial composition and health outcomes but falling short of demonstrating causation. The ecological complexity of the microbiome — with its hundreds of interacting species, metabolic redundancy, and sensitivity to confounding variables including diet, medication, and circadian rhythm — renders the isolation of individual causal pathways extraordinarily difficult. Animal models, while invaluable for generating mechanistic hypotheses, employ organisms whose physiology, diet, and social behaviour differ substantially from those of humans, limiting the translatability of their findings. The field's rapid commercialisation, moreover, has outpaced its evidence base, creating a landscape in which scientifically dubious health claims coexist with genuinely transformative discoveries — a situation that demands both continued rigorous investigation and informed public scepticism.",
  ].join("\n"),
  questions: [
    { kind: "matching-information", question: "a correction of a widely repeated but inaccurate statistical claim", options: P2_PARAGRAPHS, answer: "A", explanation: "Paragraph A states the 38 trillion figure 'overturning the long-cited but erroneous claim that microbial cells outnumber human cells by a ratio of ten to one.'" },
    { kind: "matching-information", question: "an explanation of how the method of childbirth affects an infant's microbial community", options: P2_PARAGRAPHS, answer: "B", explanation: "Paragraph B contrasts vaginal delivery (Lactobacillus colonisation) with Caesarean section (Staphylococcus colonisation) and their differential health associations." },
    { kind: "matching-information", question: "a treatment that restores a depleted microbial ecosystem with a success rate above 90%", options: P2_PARAGRAPHS, answer: "E", explanation: "Paragraph E describes FMT for C. difficile infection 'with cure rates exceeding 90% in clinical trials.'" },
    { kind: "matching-information", question: "evidence that a commercially popular health product often lacks scientific support", options: P2_PARAGRAPHS, answer: "F", explanation: "Paragraph F states that 'the scientific evidence supporting the majority of commercially available probiotic products remains disappointingly thin' and that strains are chosen for shelf stability rather than efficacy." },
    { kind: "matching-information", question: "the discovery that the majority of a particular neurotransmitter is manufactured outside the brain", options: P2_PARAGRAPHS, answer: "D", explanation: "Paragraph D states 'An estimated 90% of the body's serotonin is produced in the gut' — serotonin is a neurotransmitter produced predominantly outside the brain." },
    { kind: "matching-information", question: "a warning that most existing studies cannot prove that microbial differences cause disease", options: P2_PARAGRAPHS, answer: "G", explanation: "Paragraph G explicitly notes studies are 'observational and cross-sectional... establishing correlations... but falling short of demonstrating causation.'" },
    { kind: "matching-information", question: "substances produced by bacteria that serve as fuel for the cells of the intestinal wall", options: P2_PARAGRAPHS, answer: "C", explanation: "Paragraph C describes short-chain fatty acids (butyrate, propionate, acetate) that 'serve as the primary energy source for colonocytes, the epithelial cells lining the colon.'" },
    { kind: "fill-blank", question: "The collective genome of the human microbiome is sometimes referred to as the '______'.", options: [], answer: "metagenome|Metagenome", explanation: "Paragraph A: 'The collective genome of this microbial community, sometimes called the metagenome.'" },
    { kind: "fill-blank", question: "Complex sugars in breast milk called human milk ______ selectively nourish beneficial gut bacteria.", options: [], answer: "oligosaccharides|Oligosaccharides", explanation: "Paragraph B: 'human milk oligosaccharides — complex sugars that are indigestible by the infant itself but serve as selective substrates for beneficial Bifidobacterium species.'" },
    { kind: "fill-blank", question: "The condition in which the gut lining becomes excessively permeable is formally termed 'intestinal ______'.", options: [], answer: "hyperpermeability|Hyperpermeability", explanation: "Paragraph C: 'a condition termed intestinal hyperpermeability or colloquially leaky gut.'" },
    { kind: "fill-blank", question: "The neural pathway providing direct communication between the gut and the brain is the ______ nerve.", options: [], answer: "vagus|Vagus", explanation: "Paragraph D: 'the vagus nerve, which provides a direct neural conduit between gut and brain.'" },
    { kind: "fill-blank", question: "Mice raised without any microorganisms, known as ______-free mice, show abnormal anxiety and social behaviour.", options: [], answer: "germ|Germ", explanation: "Paragraph D: 'germ-free mice — raised in sterile conditions and lacking a microbiome entirely — exhibit pronounced behavioural abnormalities.'" },
    { kind: "fill-blank", question: "The 2018 study by Zmora and colleagues was conducted at the ______ Institute of Science.", options: [], answer: "Weizmann|weizmann|WEIZMANN", explanation: "Paragraph F: 'A landmark 2018 study by Zmora and colleagues at the Weizmann Institute of Science.'" },
  ],
};

/* ────────────────────────────────────────────
   PASSAGE 3 — History / Technology
   The Gutenberg Revolution
   14 questions: 7 matching-sentence-endings + 7 MCQ
   ──────────────────────────────────────────── */

const passage3: PassageData = {
  slug: "mock-ac9-gutenberg-revolution",
  title: "The Gutenberg Revolution Reconsidered",
  titleVi: "Xem xet lai cuoc cach mang Gutenberg",
  level: "C1",
  category: "mock-academic",
  passage: [
    "The Gutenberg Revolution Reconsidered",
    "",
    "A. The invention of movable-type printing by Johannes Gutenberg in Mainz, Germany, around 1440 is routinely cited as one of the most consequential technological innovations in human history — an event whose reverberations through religion, politics, science, and literacy have been compared, not unreasonably, to those of the internet five centuries later. Yet the popular narrative surrounding Gutenberg's achievement, which tends toward the heroic and the singular, obscures a considerably more complex historical reality. Gutenberg did not invent printing itself, nor even movable type: woodblock printing had been practised in China since at least the seventh century, and Bi Sheng had developed a movable-type system using ceramic characters around 1040, some four hundred years before Gutenberg's press. What Gutenberg achieved was the development of a specific constellation of technologies — an oil-based ink, a hand mould for casting uniform metal type from an alloy of lead, tin, and antimony, and a wooden screw press adapted from those used in winemaking — that made movable-type printing economically viable for the Latin alphabet and the European commercial context.",
    "",
    "B. The question of why East Asian movable type did not produce a transformation comparable to Gutenberg's has occupied historians for decades. The most persuasive explanation is not technological but linguistic: the Chinese writing system, with its tens of thousands of distinct characters, rendered the production, storage, and manipulation of movable type enormously cumbersome — a single print shop might require upwards of 100,000 individual type pieces — whereas the alphabetic scripts of Europe, with their mere 26 to 30 characters, reduced the type inventory to a manageable scale. Korean printers under the Joseon dynasty did develop a sophisticated metal movable-type system (jikji) in the fourteenth century, and the Korean script Hangul, with its limited character set, was arguably better suited to movable type than Chinese. Yet the Korean innovation failed to achieve wide social penetration, partly because the Confucian scholarly elite continued to privilege classical Chinese as the language of learning and governance, and partly because the Korean state exercised close control over printing, limiting its use to official and religious texts rather than permitting the emergence of a commercial publishing industry.",
    "",
    "C. In Europe, by contrast, the economics of Gutenberg's press aligned propitiously with a latent demand for written material that the manuscript tradition could no longer satisfy. Prior to printing, the production of books was a laborious artisanal process: a single copyist working full-time might produce two to three copies of a standard-length text per year, at a cost that restricted book ownership to monasteries, universities, and the wealthiest members of the aristocracy. Gutenberg's press, once the substantial initial investment in type-casting and press construction had been absorbed, reduced the marginal cost of each additional copy to a fraction of the manuscript price — a classic instance of what economists would later term 'economies of scale.' By 1500, an estimated 20 million volumes had been printed across Europe by some 1,000 printing establishments, a quantity that dwarfed the entire accumulated manuscript production of the preceding millennium.",
    "",
    "D. The relationship between the printing press and the Protestant Reformation of the sixteenth century illustrates the capacity of a communications technology to catalyse social change in ways that far exceed the intentions of either its inventor or its early adopters. Martin Luther's Ninety-Five Theses, posted in Wittenberg in 1517, were translated from Latin into German, printed in pamphlet form, and disseminated across the Holy Roman Empire with a speed that would have been inconceivable in the manuscript age — an estimated 300,000 copies were in circulation within three months. Luther himself proved an astute exploiter of the new medium, producing a torrent of accessible vernacular pamphlets, sermons, and biblical translations that bypassed the ecclesiastical hierarchy and appealed directly to a literate laity. The Catholic Church, which had initially welcomed printing as an instrument for the standardised production of liturgical texts, indulgences, and papal bulls, found itself confronting a technology that was inherently resistant to centralised control: once a text had been set in type, it could be reproduced by any press operator anywhere in Europe, rendering censorship a perpetual game of suppression and evasion.",
    "",
    "E. The effects of printing on the development of European vernacular languages were profound, though largely unplanned. In the manuscript era, written language existed in a bewildering multiplicity of regional dialects, with no standardised orthography, grammar, or vocabulary. The commercial imperatives of the printing industry — the need to reach the largest possible market — drove printers to select and promote particular dialect forms as de facto standards. In England, William Caxton's decision to print in the London dialect of English, rather than in the Midlands or Northern varieties, contributed materially to the emergence of standard English; in Germany, Luther's biblical translation into the Saxon chancery dialect performed a comparable unifying function. The fixity of print — the fact that thousands of identical copies of a text could be distributed simultaneously — accelerated the process of linguistic standardisation by creating stable reference points against which regional variation could be measured and, gradually, suppressed.",
    "",
    "F. The democratising potential of print, however, was constrained by a factor that is easily overlooked from the vantage point of the twenty-first century: the limited extent of literacy in early modern Europe. At the time of Gutenberg's invention, functional literacy rates across the continent probably did not exceed 5% to 10% of the adult population, with enormous variation by region, social class, and gender. The printing revolution thus initially produced books for an audience that was, in numerical terms, minuscule — a paradox that the industry resolved partly by stimulating the very demand it sought to serve. The availability of affordable printed material created new incentives for literacy acquisition; the spread of literacy, in turn, expanded the market for printed books; and this positive feedback loop, operating over generations, gradually transformed Europe from a predominantly oral culture into a literate one. The process was neither rapid nor linear — mass literacy in most of Western Europe was not achieved until the nineteenth century, three and a half centuries after Gutenberg — but the causal connection between printing and the eventual universalisation of literacy is beyond serious dispute.",
    "",
    "G. Contemporary scholarship has increasingly emphasised the need to temper the triumphalist narrative of the 'Gutenberg Revolution' with an appreciation of the technology's more gradual and contested reception. The historian Elizabeth Eisenstein, whose magisterial 1979 study 'The Printing Press as an Agent of Change' did more than any other work to establish the press as a primary driver of European modernity, has herself been criticised for overstating the rupture between manuscript and print culture. Revisionist scholars such as Adrian Johns have argued that the transition from manuscript to print was far slower, more uneven, and more dependent on pre-existing social and institutional structures than the revolutionary narrative implies. Manuscript production continued alongside printing for decades; early printed books deliberately imitated the visual conventions of manuscripts; and the authority of printed texts was by no means automatically accepted — piracy, forgery, and textual corruption were rampant in the early print industry, and readers accustomed to the authenticated provenance of hand-copied manuscripts regarded the new medium with considerable suspicion. The truth, as is often the case, lies between the revolutionary and the revisionist accounts: printing was transformative, but its transformation was neither instantaneous nor inevitable.",
  ].join("\n"),
  questions: [
    { kind: "matching-sentence-endings", question: "Gutenberg's printing press achieved economic viability because...", options: P3_ENDINGS, answer: "A", explanation: "Paragraph C explains that once the initial investment was absorbed, 'the marginal cost of each additional copy' dropped dramatically — matching ending A about negligible cost per copy after the initial mould." },
    { kind: "matching-sentence-endings", question: "The Catholic Church's initial reaction to printing demonstrates that...", options: P3_ENDINGS, answer: "B", explanation: "Paragraph D states 'The Catholic Church... had initially welcomed printing as an instrument for the standardised production of liturgical texts, indulgences, and papal bulls' — matching ending B about religious authorities initially embracing the technology." },
    { kind: "matching-sentence-endings", question: "The case of Martin Luther's pamphlets illustrates that...", options: P3_ENDINGS, answer: "C", explanation: "Paragraph D shows that Luther's use of printing to spread the Reformation produced social upheaval far beyond what Gutenberg or early printers intended — matching ending C about consequences extending beyond what inventors foresaw." },
    { kind: "matching-sentence-endings", question: "Once printed texts could be reproduced by any press operator, the consequence was that...", options: P3_ENDINGS, answer: "D", explanation: "Paragraph D notes that the Church found printing 'inherently resistant to centralised control' and censorship became 'a perpetual game of suppression and evasion' — matching ending D about existing power structures attempting to control the new medium." },
    { kind: "matching-sentence-endings", question: "The printing industry's need to sell to the widest audience meant that...", options: P3_ENDINGS, answer: "H", explanation: "Paragraph E describes how 'commercial imperatives of the printing industry — the need to reach the largest possible market — drove printers to select and promote particular dialect forms as de facto standards.' This was unplanned — matching ending H about standardisation of vernacular languages as an unintended consequence of commercial incentive." },
    { kind: "matching-sentence-endings", question: "The historian Adrian Johns has argued that...", options: P3_ENDINGS, answer: "I", explanation: "Paragraph G presents Johns's revisionist argument that 'the transition from manuscript to print was far slower, more uneven' than the revolutionary narrative suggests — matching ending I about scholars overstating the speed of displacement." },
    { kind: "matching-sentence-endings", question: "Despite the alphabetic advantage, the movable type developed in Korea did not achieve widespread impact because...", options: P3_ENDINGS, answer: "F", explanation: "Paragraph B discusses how Korean and Chinese movable type preceded Gutenberg but failed to transform society comparably. Ending F ('earlier technological precedents in East Asia had failed to produce comparable societal transformation') captures this. The passage explains why: elite preference for classical Chinese and state control over printing." },
    { kind: "mcq", question: "The author's primary purpose in Paragraph A is to...", options: ["celebrate Gutenberg's singular genius as the inventor of printing technology", "argue that Chinese and Korean printing was technologically superior to Gutenberg's", "complicate the popular narrative by placing Gutenberg's innovation in a broader historical context", "demonstrate that European technological development was entirely derivative of Asian innovations"], answer: "C", explanation: "Paragraph A acknowledges Gutenberg's significance but immediately complicates the 'heroic and singular' narrative by noting prior Chinese and Korean developments. It neither celebrates uncritically (A) nor claims Asian superiority (B) nor calls European work derivative (D)." },
    { kind: "mcq", question: "According to the passage, the primary reason East Asian movable type did not produce a social transformation comparable to Gutenberg's was...", options: ["the inferior metallurgical quality of the type used in Chinese and Korean presses", "the incompatibility between the complexity of the Chinese writing system and the practical requirements of movable type", "the absence of a literate population capable of reading printed materials in East Asia", "the geographic isolation of East Asian printing centres from major trade routes"], answer: "B", explanation: "Paragraph B states 'The most persuasive explanation is not technological but linguistic: the Chinese writing system, with its tens of thousands of distinct characters, rendered the production, storage, and manipulation of movable type enormously cumbersome.' This is about the writing system's complexity, not metallurgy, literacy, or geography." },
    { kind: "mcq", question: "The passage suggests that the relationship between printing and literacy in early modern Europe was best characterised as...", options: ["linear, with printing directly and immediately raising literacy rates across all social classes", "mutually reinforcing, with printing stimulating literacy which in turn expanded the market for print", "antagonistic, as the established literate elite resisted the spread of printed materials to lower classes", "negligible, since mass literacy was not achieved until several centuries after printing was invented"], answer: "B", explanation: "Paragraph F describes a 'positive feedback loop' in which 'affordable printed material created new incentives for literacy acquisition; the spread of literacy, in turn, expanded the market for printed books.' Option D is a trap — while mass literacy took centuries, the passage explicitly states the connection is 'beyond serious dispute,' so it was not negligible." },
    { kind: "mcq", question: "The author mentions William Caxton in Paragraph E primarily to illustrate...", options: ["how individual commercial decisions had lasting consequences for linguistic development", "that English printers were more commercially astute than their continental counterparts", "the superiority of the London dialect over other regional varieties of English", "that language standardisation was a deliberate goal of early European printers"], answer: "A", explanation: "Caxton's 'decision to print in the London dialect' is presented as a commercial choice that 'contributed materially to the emergence of standard English' — an individual business decision with lasting linguistic impact. Option D is a distractor: the passage says standardisation was 'largely unplanned,' not a deliberate goal." },
    { kind: "mcq", question: "The passage indicates that revisionist historians like Adrian Johns differ from Elizabeth Eisenstein primarily in their assessment of...", options: ["whether the printing press was invented in Europe or Asia", "the pace and completeness of the transition from manuscript to print culture", "whether Gutenberg personally deserves credit for the invention of movable type", "the total number of books produced in Europe before 1500"], answer: "B", explanation: "Paragraph G contrasts Eisenstein's view of a revolutionary rupture with Johns's argument that 'the transition from manuscript to print was far slower, more uneven, and more dependent on pre-existing social and institutional structures.' The disagreement is about pace and completeness of transition." },
    { kind: "mcq", question: "The phrase 'a perpetual game of suppression and evasion' in Paragraph D suggests that...", options: ["the Catholic Church successfully prevented the spread of Protestant ideas through censorship", "the printing press made it practically impossible for authorities to fully control the flow of information", "printers deliberately sought to undermine religious authority by producing subversive material", "Luther's pamphlets were the only printed texts that the Church attempted to suppress"], answer: "B", explanation: "The phrase describes censorship as an ongoing, ultimately futile struggle — 'once a text had been set in type, it could be reproduced by any press operator anywhere in Europe.' This shows the inherent difficulty of information control, not successful suppression (A), deliberate subversion by printers (C), or exclusive targeting of Luther (D)." },
    { kind: "mcq", question: "The author's overall conclusion about the impact of Gutenberg's printing press is that it was...", options: ["revolutionary and produced immediate, sweeping changes across all levels of European society", "less significant than historians have traditionally claimed, given the prior existence of Asian printing", "genuinely transformative but neither as sudden nor as inevitable as popular accounts suggest", "primarily an economic innovation whose cultural effects have been greatly exaggerated"], answer: "C", explanation: "The final sentence of the passage states: 'printing was transformative, but its transformation was neither instantaneous nor inevitable.' This balanced view — acknowledging transformation while qualifying its speed and inevitability — matches option C. Option A overstates by claiming 'immediate' change; option B understates significance; option D dismisses cultural effects." },
  ],
};

/* ────────────────────────────────────────────
   Assemble passages array
   ──────────────────────────────────────────── */

const passages: PassageData[] = [passage1, passage2, passage3];

/* ────────────────────────────────────────────
   Main seeding function
   ──────────────────────────────────────────── */

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 950 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 950 + passages.indexOf(p) },
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
    update: { title: "IELTS Academic Reading — Test 9", titleVi: "IELTS Academic Reading — Đề 9", type: "academic", difficulty: "hard", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 9", titleVi: "IELTS Academic Reading — Đề 9", type: "academic", difficulty: "hard", timeMinutes: 60, order: 8 },
  });
  console.log("\n  OK Exam: " + exam.slug + " (difficulty: hard)");
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log("Done! 3 passages (" + passages.reduce((s, p) => s + p.questions.length, 0) + " questions) + exam + sections.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
