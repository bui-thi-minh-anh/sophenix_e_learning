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
  // IELTS ACADEMIC — PASSAGE 1 (B1–B2, easiest)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-urban-farming",
    title: "IELTS Academic: Urban Farming",
    titleVi: "IELTS Academic: Nông nghiệp đô thị",
    level: "B2",
    category: "ielts",
    passage: `Urban Farming: Growing Food in the City

A. As the world's population becomes increasingly urbanized — with over 56% of people now living in cities, a figure expected to rise to 68% by 2050 — the question of how to feed urban populations sustainably has become more pressing than ever. Urban farming, also known as urban agriculture, refers to the practice of growing food within cities and their surrounding areas. While the concept is not new — city dwellers have been cultivating small gardens for centuries — the scale and sophistication of modern urban farming represent a significant departure from traditional practices.

B. One of the most promising developments in urban farming is vertical farming, in which crops are grown in stacked layers inside controlled indoor environments. These facilities use hydroponic systems (growing plants in nutrient-rich water without soil), aeroponic systems (suspending plant roots in air and misting them with nutrients), or aquaponic systems (combining fish farming with plant cultivation in a symbiotic cycle). Vertical farms can produce crops year-round regardless of weather conditions and use up to 95% less water than traditional farming. The world's largest vertical farm, located in Dubai, covers 330,000 square feet and produces over 900 tons of leafy greens annually.

C. Rooftop farming has also gained significant traction in recent years. In cities like New York, Paris, and Singapore, unused rooftop spaces are being transformed into productive gardens. The Brooklyn Grange in New York operates the world's largest rooftop soil farms, spanning over 5.6 acres across multiple rooftops and producing over 80,000 pounds of organically grown vegetables each year. Beyond food production, rooftop farms provide additional benefits: they reduce the urban heat island effect by absorbing sunlight that would otherwise heat building surfaces, improve air quality by filtering pollutants, manage stormwater runoff, and provide habitat for pollinators such as bees and butterflies.

D. Community gardens represent perhaps the most accessible form of urban farming. These shared spaces allow city residents — many of whom lack private outdoor areas — to grow their own food, learn gardening skills, and build social connections with their neighbors. Research has consistently shown that community gardens improve food security, promote physical activity, enhance mental well-being, and strengthen community bonds. A study by the University of Pennsylvania found that the presence of community gardens was associated with a 28% reduction in crime rates in surrounding neighborhoods. Cities like Detroit, which experienced significant population decline and economic hardship, have turned thousands of vacant lots into productive gardens, transforming urban blight into green spaces that provide fresh food for local residents.

E. Despite its many benefits, urban farming faces significant challenges. Land in cities is expensive, and competition for space from housing, commercial development, and infrastructure is intense. Contamination of urban soils with heavy metals and other pollutants can make growing food in the ground risky without proper soil testing and remediation. The initial investment required for high-tech approaches like vertical farming can be substantial — building a commercial vertical farm can cost between $10 million and $100 million. Energy costs for artificial lighting and climate control in indoor farms remain high, though the increasing affordability of LED technology and renewable energy is helping to address this issue.

F. Looking ahead, urban farming is unlikely to replace conventional agriculture, which still produces the vast majority of the world's food. However, it can play an increasingly important complementary role by providing fresh, locally grown produce, reducing food transportation distances, creating green jobs, and making cities more resilient to disruptions in global food supply chains. As technology continues to advance and awareness of food sustainability grows, urban farming is poised to become an integral part of the food system of the future.`,
    questions: [
      // True / False / Not Given
      { question: "[True / False / Not Given] Over half of the world's population currently lives in cities.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'over 56% of people now living in cities' — this is more than half, so True." },
      { question: "[True / False / Not Given] Vertical farming uses more water than traditional farming.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'use up to 95% less water than traditional farming' — so it uses less, not more. False." },
      { question: "[True / False / Not Given] The Brooklyn Grange rooftop farm is located in Chicago.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'The Brooklyn Grange in New York' — it's in New York, not Chicago. False." },
      { question: "[True / False / Not Given] Community gardens have been shown to reduce crime rates.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'associated with a 28% reduction in crime rates.' True." },
      { question: "[True / False / Not Given] The Dubai vertical farm produces more than 1,000 tons of food annually.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'produces over 900 tons' — not more than 1,000. False." },

      // Matching Heading (which paragraph)
      { question: "[Matching] Which paragraph discusses the challenges that urban farming encounters?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: "C", explanation: "Paragraph E discusses land costs, soil contamination, high investment, and energy costs." },
      { question: "[Matching] Which paragraph describes farming technology that uses stacked layers indoors?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes vertical farming with 'crops grown in stacked layers inside controlled indoor environments.'" },

      // Multiple Choice
      { question: "How much of the rooftop area does the Brooklyn Grange cover?", options: ["3.2 acres", "4.5 acres", "5.6 acres", "7.8 acres"], answer: "C", explanation: "'spanning over 5.6 acres across multiple rooftops.'" },
      { question: "What is a key benefit of rooftop farms besides food production?", options: ["They generate electricity", "They reduce the urban heat island effect", "They provide parking space", "They filter drinking water"], answer: "B", explanation: "'they reduce the urban heat island effect by absorbing sunlight.'" },

      // Summary Completion
      { question: "[Summary] Urban farming is unlikely to _____ conventional agriculture, but it can provide fresh produce and create green jobs.", options: ["improve", "replace", "support", "destroy"], answer: "B", explanation: "'urban farming is unlikely to replace conventional agriculture.'" },
      { question: "[Summary] Community gardens allow residents to grow food, learn skills, and build _____ with neighbors.", options: ["businesses", "houses", "social connections", "technology"], answer: "C", explanation: "'build social connections with their neighbors.'" },

      // Sentence Completion
      { question: "[Sentence Completion] Detroit transformed thousands of _____ into productive gardens.", options: ["parking lots", "vacant lots", "school yards", "abandoned factories"], answer: "B", explanation: "'turned thousands of vacant lots into productive gardens.'" },
      { question: "[Sentence Completion] Hydroponic systems grow plants in nutrient-rich water without _____.", options: ["sunlight", "electricity", "soil", "fertilizer"], answer: "C", explanation: "'growing plants in nutrient-rich water without soil.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — PASSAGE 2 (B2, moderate)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-sleep-science",
    title: "IELTS Academic: The Science of Sleep",
    titleVi: "IELTS Academic: Khoa học về giấc ngủ",
    level: "B2",
    category: "ielts",
    passage: `The Science of Sleep: Why We Sleep and What Happens When We Don't

A. Sleep has long been one of the great mysteries of biology. For most of human history, sleep was regarded as a passive state — a period of inactivity in which the brain essentially "shut down." Modern neuroscience has completely overturned this view. We now know that sleep is an intensely active process during which the brain performs critical functions that cannot occur during waking hours. Far from being a waste of time, sleep is as essential to survival as food and water.

B. Sleep is regulated by two interconnected systems: the circadian rhythm and the sleep-wake homeostasis. The circadian rhythm is an internal biological clock, located in the suprachiasmatic nucleus (SCN) of the hypothalamus, that operates on a roughly 24-hour cycle. This clock is synchronized with the external light-dark cycle through specialized photoreceptors in the retina. When light diminishes in the evening, the SCN signals the pineal gland to produce melatonin, a hormone that promotes drowsiness. Sleep-wake homeostasis, the second system, tracks the amount of time spent awake and creates a progressively stronger drive to sleep. This pressure is mediated in part by the accumulation of adenosine, a chemical byproduct of cellular energy consumption. Caffeine works by blocking adenosine receptors, which is why it makes us feel more alert — though it does not eliminate the underlying sleep debt.

C. During a typical night's sleep, the brain cycles through four distinct stages approximately every 90 minutes. Stages 1 and 2 are light sleep, during which muscle activity decreases and the body prepares for deeper rest. Stage 3, known as slow-wave sleep or deep sleep, is the most physically restorative phase: growth hormone is released, tissues are repaired, the immune system is strengthened, and energy stores are replenished. Stage 4 is REM (Rapid Eye Movement) sleep, characterized by vivid dreaming, rapid eye movements behind closed eyelids, and temporary paralysis of voluntary muscles — a phenomenon called atonia that prevents us from physically acting out our dreams.

D. REM sleep plays a crucial role in cognitive function. During REM, the brain consolidates procedural memories (how to do things) and emotional memories. It processes the emotional experiences of the day, which may explain why people who are sleep-deprived tend to be more emotionally reactive and less able to regulate their responses. Studies have shown that REM sleep is essential for creative problem-solving: subjects who were allowed to enter REM sleep were 40% more likely to solve complex puzzles compared to those who remained awake or were in non-REM sleep. The brain also engages in memory consolidation during non-REM sleep, transferring factual information from the hippocampus (short-term storage) to the neocortex (long-term storage) through a process of neural replay.

E. One of the most remarkable discoveries in sleep science is the glymphatic system, identified by Maiken Nedergaard's research team in 2012. During sleep, the spaces between brain cells expand by approximately 60%, allowing cerebrospinal fluid to flow more freely and flush out metabolic waste products — including beta-amyloid, a protein strongly associated with Alzheimer's disease. This "brain-cleaning" function operates almost exclusively during sleep, particularly during deep non-REM sleep. The discovery has led researchers to hypothesize that chronic sleep deprivation may contribute to the development of neurodegenerative diseases by allowing toxic proteins to accumulate in the brain.

F. The consequences of insufficient sleep are both immediate and long-term. In the short term, even one night of poor sleep impairs attention, working memory, logical reasoning, and reaction time. After 17 hours without sleep, cognitive performance deteriorates to a level equivalent to a blood alcohol concentration of 0.05% — the legal driving limit in many countries. Chronically sleeping fewer than six hours per night is associated with a 12% increased risk of premature death compared to those who sleep seven to eight hours. Long-term sleep deprivation has been linked to a 48% increased risk of developing coronary heart disease, a three-fold increase in the likelihood of developing type 2 diabetes, and significant impairments in immune function — individuals who sleep fewer than seven hours are nearly three times more likely to develop a cold after exposure to a rhinovirus.

G. Despite the overwhelming scientific evidence of sleep's importance, modern society continues to undervalue it. Approximately 35% of adults in developed countries report sleeping fewer than seven hours per night. The 24-hour culture of constant connectivity, shift work, and artificial lighting all contribute to what sleep researchers have called a "global sleep loss epidemic." Addressing this crisis requires both individual behavioral changes — such as maintaining consistent sleep schedules, limiting screen exposure before bed, and creating dark, cool sleeping environments — and systemic reforms, including later school start times for adolescents, whose circadian rhythms naturally shift toward later sleep and wake times during puberty.`,
    questions: [
      // Yes / No / Not Given
      { question: "[Yes / No / Not Given] The author argues that sleep was correctly understood as a passive state until recently.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'Modern neuroscience has completely overturned this view.' The author says the old passive view was wrong. No." },
      { question: "[Yes / No / Not Given] Caffeine eliminates the body's need for sleep.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'it does not eliminate the underlying sleep debt.' No." },
      { question: "[Yes / No / Not Given] The glymphatic system was discovered before 2010.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'identified by Maiken Nedergaard's research team in 2012.' No, it was 2012." },
      { question: "[Yes / No / Not Given] All developed countries have passed laws mandating minimum sleep hours.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage mentions no laws about mandatory sleep hours. Not Given." },

      // Multiple Choice
      { question: "What is the role of adenosine in sleep regulation?", options: ["It blocks caffeine receptors", "It creates an increasing drive to sleep", "It produces melatonin", "It controls the circadian rhythm"], answer: "B", explanation: "'mediated in part by the accumulation of adenosine' which builds sleep pressure." },
      { question: "What prevents us from acting out our dreams during REM sleep?", options: ["Melatonin", "The circadian rhythm", "Muscle atonia", "Adenosine"], answer: "C", explanation: "'temporary paralysis of voluntary muscles — a phenomenon called atonia.'" },
      { question: "By how much do brain cell spaces expand during sleep?", options: ["About 30%", "About 40%", "About 50%", "About 60%"], answer: "D", explanation: "'spaces between brain cells expand by approximately 60%.'" },

      // Matching Information
      { question: "[Matching] Which paragraph explains the two biological systems that control when we sleep?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B describes 'the circadian rhythm and the sleep-wake homeostasis.'" },
      { question: "[Matching] Which paragraph discusses the brain's waste-removal process during sleep?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "B", explanation: "Paragraph E describes the glymphatic system that flushes metabolic waste." },

      // True / False / Not Given
      { question: "[True / False / Not Given] People who entered REM sleep were 40% more likely to solve complex puzzles.", options: ["True", "False", "Not Given"], answer: "A", explanation: "'subjects who were allowed to enter REM sleep were 40% more likely to solve complex puzzles.' True." },
      { question: "[True / False / Not Given] Sleeping fewer than 6 hours increases death risk by 20%.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'a 12% increased risk of premature death' — 12%, not 20%. False." },

      // Sentence Completion
      { question: "[Sentence Completion] After 17 hours without sleep, cognitive performance equals a blood alcohol level of _____.", options: ["0.02%", "0.05%", "0.08%", "0.10%"], answer: "B", explanation: "'equivalent to a blood alcohol concentration of 0.05%.'" },
      { question: "[Sentence Completion] About _____ of adults in developed countries sleep fewer than 7 hours.", options: ["25%", "30%", "35%", "40%"], answer: "C", explanation: "'Approximately 35% of adults in developed countries.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS ACADEMIC — PASSAGE 3 (C1, hardest)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-consciousness",
    title: "IELTS Academic: The Problem of Consciousness",
    titleVi: "IELTS Academic: Vấn đề về ý thức",
    level: "C1",
    category: "ielts",
    passage: `The Hard Problem of Consciousness

A. Among the most enduring and perplexing questions in philosophy and science is the nature of consciousness — the subjective, first-person experience of being aware. While neuroscience has made extraordinary progress in mapping the neural correlates of consciousness — identifying which brain regions become active during various conscious experiences — it has yet to explain why physical processes in the brain give rise to subjective experience at all. The philosopher David Chalmers famously termed this the "hard problem" of consciousness in 1995, distinguishing it from the "easy problems," which involve explaining cognitive functions such as attention, memory, and language processing in terms of neural mechanisms.

B. The hard problem can be articulated through a thought experiment known as the "philosophical zombie." Imagine a being that is physically identical to a human in every respect — same brain structure, same neural activity, same behavioral responses — but entirely lacks subjective experience. There is "nothing it is like" to be this creature; it processes information and responds to stimuli without any inner awareness. The question is: can we conceive of such a being without logical contradiction? If we can, then consciousness cannot be fully explained by physical processes alone, since those processes could, in principle, occur without consciousness accompanying them. This argument, while controversial, highlights the explanatory gap between objective descriptions of brain activity and the subjective quality of experience — what philosophers call "qualia."

C. Several competing theories attempt to bridge this gap. Integrated Information Theory (IIT), developed by neuroscientist Giulio Tononi, proposes that consciousness is a fundamental property of any system that integrates information in a sufficiently complex way. IIT introduces a mathematical measure called Phi (Φ), which quantifies the degree to which a system is simultaneously differentiated (capable of existing in a large number of distinct states) and integrated (such that these states are not reducible to independent parts). According to IIT, any system with a Phi value greater than zero possesses some degree of consciousness — a view that implies consciousness could exist in non-biological systems, including sufficiently complex artificial intelligence, and even in simple organisms or physical structures.

D. Global Workspace Theory (GWT), proposed by Bernard Baars and later refined as Global Neuronal Workspace Theory by Stanislas Dehaene and Jean-Pierre Changeux, takes a more functionalist approach. GWT compares consciousness to a theater: most cognitive processing occurs "backstage" (unconsciously), but certain information is selected and "broadcast" to a "global workspace" — a network of widely distributed neurons, particularly in the prefrontal and parietal cortices — where it becomes available to multiple cognitive processes simultaneously, including attention, memory, decision-making, and verbal report. On this view, consciousness arises when information gains access to this global broadcast network. GWT has significant empirical support: neuroimaging studies consistently show that conscious perception is associated with a sudden, widespread "ignition" of neural activity across distant brain regions, in contrast to unconscious processing, which remains localized.

E. A more radical proposal comes from panpsychism, the view that consciousness is a fundamental and ubiquitous feature of the physical world — that even elementary particles possess some rudimentary form of experience. While this idea may seem counterintuitive, its proponents, including philosopher Philip Goff, argue that panpsychism elegantly avoids the hard problem by denying that consciousness emerges from non-conscious matter. If consciousness is fundamental rather than emergent, there is no need to explain how it arises from purely physical processes. The challenge for panpsychism, however, is the "combination problem": how do the micro-experiences of individual particles combine to form the unified, rich conscious experience of a human mind? This remains an open question.

F. The study of consciousness has important practical implications beyond pure philosophy. In medicine, determining whether patients in vegetative states retain consciousness is a matter of life and death. Adrian Owen's groundbreaking research at the University of Western Ontario demonstrated that some patients who appear entirely unresponsive are in fact conscious: when asked to imagine playing tennis (which activates motor areas) or navigating their home (which activates spatial areas), their brain scans showed patterns of activity indistinguishable from those of healthy controls. This research has led to the development of brain-computer interfaces that allow some of these "locked-in" patients to communicate by modulating their brain activity.

G. The rise of artificial intelligence has injected new urgency into the consciousness debate. If an AI system exhibits all the behavioral hallmarks of consciousness — if it reports having experiences, responds emotionally to stimuli, and passes every conceivable test — are we justified in attributing consciousness to it, or could it be a sophisticated philosophical zombie? The answer has profound ethical implications: if AI can be conscious, it may deserve moral consideration and legal protections. The development of increasingly capable AI systems means that what was once an abstract philosophical puzzle may soon demand concrete policy answers. As philosopher Thomas Nagel observed, consciousness is "what makes the mind-body problem really intractable" — and four decades after he wrote those words, the observation remains as valid as ever.`,
    questions: [
      // Matching Heading
      { question: "[Matching] Which paragraph introduces the concept of 'philosophical zombies'?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"], answer: "B", explanation: "Paragraph B presents the 'philosophical zombie' thought experiment." },
      { question: "[Matching] Which paragraph discusses whether AI could be conscious?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "D", explanation: "Paragraph G discusses AI consciousness and its ethical implications." },
      { question: "[Matching] Which paragraph describes research on patients in vegetative states?", options: ["Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"], answer: "C", explanation: "Paragraph F describes Adrian Owen's research on vegetative state patients." },

      // Yes / No / Not Given
      { question: "[Yes / No / Not Given] The author believes the hard problem of consciousness has been solved.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "The passage presents the hard problem as still unresolved: 'the observation remains as valid as ever.' No." },
      { question: "[Yes / No / Not Given] IIT suggests that only biological organisms can be conscious.", options: ["Yes", "No", "Not Given"], answer: "B", explanation: "'consciousness could exist in non-biological systems, including sufficiently complex AI.' No." },
      { question: "[Yes / No / Not Given] Panpsychism is the most widely accepted theory of consciousness.", options: ["Yes", "No", "Not Given"], answer: "C", explanation: "The passage does not state which theory is most widely accepted. Not Given." },

      // Multiple Choice
      { question: "What does Phi (Φ) measure in Integrated Information Theory?", options: ["Brain wave frequency", "The degree of information integration in a system", "The number of neurons activated", "Emotional intensity of experience"], answer: "B", explanation: "'Phi (Φ), which quantifies the degree to which a system is simultaneously differentiated and integrated.'" },
      { question: "What does Global Workspace Theory compare consciousness to?", options: ["A computer network", "A theater", "An ocean", "A library"], answer: "B", explanation: "'GWT compares consciousness to a theater.'" },
      { question: "What challenge does panpsychism face?", options: ["The binding problem", "The combination problem", "The measurement problem", "The halting problem"], answer: "B", explanation: "'the combination problem: how do the micro-experiences of individual particles combine.'" },

      // Sentence Completion
      { question: "[Sentence Completion] David Chalmers coined the term 'hard problem' of consciousness in _____.", options: ["1985", "1990", "1995", "2000"], answer: "C", explanation: "'David Chalmers famously termed this the hard problem of consciousness in 1995.'" },
      { question: "[Sentence Completion] Adrian Owen's patients imagined playing _____ to demonstrate consciousness.", options: ["chess", "piano", "tennis", "football"], answer: "C", explanation: "'asked to imagine playing tennis.'" },

      // Matching Features
      { question: "[Matching] Which theory proposes that consciousness is a fundamental property of all matter?", options: ["Integrated Information Theory", "Global Workspace Theory", "Panpsychism", "Functionalism"], answer: "C", explanation: "Panpsychism holds that 'consciousness is a fundamental and ubiquitous feature of the physical world.'" },
      { question: "[Matching] Which researcher demonstrated consciousness in vegetative-state patients?", options: ["David Chalmers", "Giulio Tononi", "Bernard Baars", "Adrian Owen"], answer: "D", explanation: "'Adrian Owen's groundbreaking research... demonstrated that some patients who appear entirely unresponsive are in fact conscious.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // IELTS GENERAL — Section 1 (A2–B1, practical texts)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-general-apartment-guide",
    title: "IELTS General: Renting an Apartment",
    titleVi: "IELTS General: Hướng dẫn thuê căn hộ",
    level: "B1",
    category: "ielts",
    passage: `GREENFIELD APARTMENTS — Tenant Information Guide

Welcome to Greenfield Apartments! Please read this guide carefully before moving in.

LEASE TERMS
All leases are for a minimum of 12 months. If you wish to leave before your lease ends, you must give 60 days' written notice and pay an early termination fee equal to two months' rent. Lease renewals are offered 90 days before your lease expiry date. Rent is due on the 1st of each month. A late fee of $50 will be applied to payments received after the 5th.

SECURITY DEPOSIT
A security deposit equal to one month's rent is required before move-in. This deposit will be returned within 30 days of moving out, provided the apartment is in good condition. Deductions may be made for damages beyond normal wear and tear, unpaid rent, or cleaning fees if the apartment is not left in a reasonably clean state.

MAINTENANCE & REPAIRS
For non-emergency repairs (e.g., broken appliances, leaky faucets), submit a request through the tenant portal at greenfield-apts.com/maintenance. Requests are typically addressed within 48 hours. For emergencies (e.g., burst pipes, gas leaks, electrical hazards), call the 24-hour emergency line at (555) 234-5678. Do not attempt to make repairs yourself, as unauthorized modifications may result in charges.

BUILDING RULES
• Quiet hours are from 10:00 PM to 7:00 AM daily. Please keep noise to a minimum during these hours.
• Smoking is prohibited in all indoor areas, including apartments, hallways, and common rooms. Smoking is permitted only in the designated outdoor area near the west entrance.
• Pets: A maximum of two pets per apartment is allowed. Dogs must be leashed in all common areas. Pet owners are responsible for cleaning up after their animals. An additional pet deposit of $300 per pet is required.
• Parking: Each apartment is assigned one parking space. Additional spaces may be rented for $75/month, subject to availability. Visitor parking is available in Lot B for a maximum of 72 hours.
• Garbage must be placed in the dumpsters located behind Building C. Recycling bins are provided for paper, plastic, and glass. Do not leave garbage bags in hallways or stairwells.

AMENITIES
Residents have free access to the fitness center (open 5:00 AM – 11:00 PM), the rooftop terrace, and the community lounge. The swimming pool is open from May 1 to September 30, daily from 8:00 AM to 9:00 PM. Pool rules are posted at the entrance.

CONTACT
Leasing Office: Building A, Ground Floor. Hours: Monday–Friday 9:00 AM – 6:00 PM, Saturday 10:00 AM – 2:00 PM. Closed Sundays and public holidays.
Email: info@greenfield-apts.com | Phone: (555) 123-4567`,
    questions: [
      // True / False / Not Given
      { question: "[True / False / Not Given] The minimum lease period is 6 months.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'All leases are for a minimum of 12 months.' False." },
      { question: "[True / False / Not Given] Late fees are applied after the 10th of each month.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'A late fee of $50 will be applied to payments received after the 5th.' False." },
      { question: "[True / False / Not Given] Tenants can have up to three pets.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'A maximum of two pets per apartment is allowed.' False." },
      { question: "[True / False / Not Given] The fitness center requires a monthly membership fee.", options: ["True", "False", "Not Given"], answer: "B", explanation: "'Residents have free access to the fitness center.' False." },

      // Multiple Choice
      { question: "How much is the early termination fee?", options: ["One month's rent", "Two months' rent", "Three months' rent", "$500"], answer: "B", explanation: "'pay an early termination fee equal to two months' rent.'" },
      { question: "How should non-emergency repairs be reported?", options: ["Call the leasing office", "Submit a request through the tenant portal", "Email the manager", "Visit Building A"], answer: "B", explanation: "'submit a request through the tenant portal at greenfield-apts.com/maintenance.'" },
      { question: "Where is smoking permitted?", options: ["On balconies", "In the parking lot", "In the designated outdoor area near the west entrance", "Nowhere on the property"], answer: "C", explanation: "'Smoking is permitted only in the designated outdoor area near the west entrance.'" },

      // Sentence Completion
      { question: "[Sentence Completion] The security deposit will be returned within _____ days of moving out.", options: ["14", "21", "30", "60"], answer: "C", explanation: "'returned within 30 days of moving out.'" },
      { question: "[Sentence Completion] Visitor parking is available for a maximum of _____ hours.", options: ["24", "48", "72", "96"], answer: "C", explanation: "'Visitor parking is available in Lot B for a maximum of 72 hours.'" },
      { question: "[Sentence Completion] The swimming pool is open from May 1 to _____.", options: ["August 31", "September 15", "September 30", "October 31"], answer: "C", explanation: "'The swimming pool is open from May 1 to September 30.'" },

      // Matching
      { question: "[Matching] What should you do if there is a gas leak?", options: ["Submit a portal request", "Call (555) 234-5678", "Email the office", "Visit the leasing office"], answer: "B", explanation: "'For emergencies (e.g., burst pipes, gas leaks), call the 24-hour emergency line at (555) 234-5678.'" },
      { question: "[Matching] Where should garbage be placed?", options: ["In the hallway", "Outside your door", "In dumpsters behind Building C", "In the parking lot"], answer: "C", explanation: "'Garbage must be placed in the dumpsters located behind Building C.'" },
    ],
  },
];

async function main() {
  console.log("Seeding IELTS reading passages...\n");

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

  console.log(`\nDone! Seeded ${passages.length} IELTS passages.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
