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

const examSlug = "ielts-academic-test-7";

const P1_HEADINGS = [
  "i. The global trade's reliance on a single botanical variety",
  "ii. Initial European hostility toward an unfamiliar drink",
  "iii. The neurochemical mechanisms underlying its stimulant properties",
  "iv. Tracing the plant to its indigenous growing region",
  "v. The expansion of cultivation through colonial enterprise",
  "vi. The emergence of establishments dedicated to its consumption",
  "vii. Inconclusive scientific evidence regarding long-term health effects",
  "viii. Ancient medicinal applications across Asian cultures",
  "ix. The gradual transformation from raw berry to prepared beverage",
  "x. The environmental consequences of large-scale monoculture",
];

const P2_RESEARCHERS = [
  "Santiago Ramon y Cajal",
  "Paul Bach-y-Rita",
  "Michael Merzenich",
  "Eleanor Maguire",
  "Alvaro Pascual-Leone",
];

const P3_ENDINGS = [
  "the difference in temperature between urban and surrounding areas can reach 12 degrees Celsius.",
  "dark surfaces absorb the vast majority of solar energy and convert it to heat.",
  "shade from trees can lower the temperature of surfaces beneath them by up to 12 degrees Celsius.",
  "the effect is most pronounced during clear, calm nights with minimal wind.",
  "city inhabitants experience substantially greater risk of heat-related death.",
  "greater energy use for cooling generates additional heat and emissions.",
  "they can cut summertime cooling energy requirements by 30 to 40 percent.",
  "urban water bodies provide a significant and reliable cooling effect on surrounding districts.",
  "traditional building materials are more thermally efficient than modern alternatives.",
  "cities with extensive public transport networks experience reduced heat island effects.",
];

const passages: PassageData[] = [
  {
    slug: "mock-ac7-coffee-history",
    title: "The History and Science of Coffee",
    titleVi: "Lịch sử và khoa học của cà phê",
    level: "C1",
    category: "mock-academic",
    passage: `The History and Science of Coffee

A. The genus Coffea comprises over 120 species, yet global coffee production depends almost exclusively on just two: Coffea arabica, which accounts for approximately 60-70% of world production, and Coffea canephora (commonly known as robusta), which makes up most of the remainder. Arabica is indigenous to the montane rainforests of southwestern Ethiopia, where it grows naturally in the understory at elevations between 1,000 and 2,000 metres. The earliest credible evidence of coffee consumption dates to the fifteenth century, though the widely repeated legend of Kaldi, an Ethiopian goatherd who supposedly noticed his animals becoming unusually energetic after eating coffee berries, remains unverifiable. Botanical and genetic studies suggest that Coffea arabica originated as a natural hybrid between Coffea eugenioides and Coffea canephora, an event that occurred tens of thousands of years ago in the forests of present-day Ethiopia and South Sudan.

B. The transformation of the coffee fruit into a recognisable beverage was neither instantaneous nor inevitable. Early Ethiopian consumers are believed to have chewed the raw berries or mixed the crushed fruit with animal fat to create energy-dense balls for long journeys. By the fifteenth century, Sufi monks in Yemen had begun brewing a liquid from roasted coffee beans — a practice that facilitated their prolonged nocturnal devotions. The Yemeni port of Mocha became the world's first commercial coffee hub, and Yemen guarded its monopoly jealously, prohibiting the export of fertile seeds. The successive innovations of roasting, grinding, and brewing with hot water — each of which profoundly altered the beverage's chemical composition and flavour profile — evolved gradually over approximately two centuries, yielding the preparation methods that remain broadly recognisable today.

C. When coffee first appeared in European markets in the early seventeenth century, it was met with considerable suspicion. Conservatives within the Catholic Church branded it "the bitter invention of Satan," arguing that its stimulating effects constituted an unnatural and possibly demonic influence. A widely recounted — though possibly apocryphal — account holds that Pope Clement VIII, upon tasting the beverage around 1600, declared it so satisfying that it would be a sin to leave it exclusively to non-Christians, thereby effectively sanctioning its consumption. Medical opinion was equally divided: some physicians recommended coffee as a remedy for digestive ailments and melancholy, while others warned that it overheated the blood and induced trembling. These debates did little to slow its adoption, and by 1650 coffee was widely available in major European cities.

D. The proliferation of coffeehouses across Europe during the seventeenth and eighteenth centuries created a new category of social institution. London's first coffeehouse opened in 1652, and within three decades the city boasted over 3,000 such establishments. These venues became centres of intellectual exchange, political debate, and commercial transaction — functions that earned them the nickname "penny universities," since the price of a cup of coffee granted access to conversation with merchants, scientists, writers, and politicians. Edward Lloyd's coffeehouse, established in 1688, became the birthplace of the insurance market that bears his name. In Paris, the Cafe de Procope, opened in 1686, hosted Voltaire, Rousseau, and Diderot. In Vienna, the coffeehouse tradition became so deeply embedded in civic life that UNESCO inscribed "Viennese Coffee House Culture" on its Intangible Cultural Heritage list in 2011.

E. The European appetite for coffee drove the establishment of vast plantations throughout colonial territories during the eighteenth and nineteenth centuries. The Dutch transplanted coffee cultivation to Java in the 1690s, establishing the first large-scale commercial production outside the Arab world. The French carried seedlings to the Caribbean island of Martinique in 1720, from which cultivation spread to Central and South America. Brazil, which received its first coffee plants in 1727, had become the world's largest producer by the mid-nineteenth century — a position it retains today, accounting for roughly one-third of global output. The expansion of coffee cultivation was inextricably linked to the exploitation of enslaved labour: in Brazil alone, an estimated 1.5 million enslaved Africans worked on coffee plantations during the nineteenth century, a historical reality that the industry has only recently begun to confront through fair-trade and ethical sourcing initiatives.

F. The stimulant properties of coffee derive primarily from caffeine, a methylxanthine compound that occurs naturally in approximately sixty plant species. Caffeine's mechanism of action centres on its structural similarity to adenosine, a neuromodulator that accumulates in the brain during waking hours and promotes drowsiness by binding to adenosine receptors. Caffeine competitively blocks these receptors without activating them, effectively preventing the build-up of the physiological signal for sleep. This blockade also triggers increased release of dopamine and norepinephrine, neurotransmitters associated with alertness, mood elevation, and enhanced concentration. Caffeine reaches peak plasma concentration within 30 to 60 minutes of ingestion, with a half-life of approximately 5 to 6 hours in healthy adults — though this varies substantially with genetic polymorphisms in the CYP1A2 enzyme responsible for caffeine metabolism.

G. The health effects of habitual coffee consumption have been the subject of extensive and often contradictory research. Numerous large-scale prospective studies have identified statistically significant associations between regular coffee drinking and reduced risk of several conditions, including Parkinson's disease, type 2 diabetes, certain liver diseases (including hepatocellular carcinoma), and all-cause mortality. A 2017 umbrella review in the British Medical Journal, encompassing over 200 meta-analyses, concluded that moderate coffee consumption (3-4 cups daily) was "more likely to benefit health than to harm it." However, coffee has also been associated with elevated blood pressure, increased urinary calcium excretion, and — during pregnancy — higher rates of low birth weight. Individual responses vary significantly based on genetic factors, particularly variations in the CYP1A2 gene that determine whether a person is a "fast" or "slow" caffeine metaboliser.`,
    questions: [
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P1_HEADINGS, answer: "D", explanation: "Paragraph A discusses the origins and native habitat of coffee in Ethiopia. Heading iv ('Tracing the plant to its indigenous growing region') is correct. Heading i ('reliance on a single botanical variety') is a distractor — while arabica is mentioned, the paragraph's focus is on origin, not trade dependence." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P1_HEADINGS, answer: "I", explanation: "Paragraph B describes how coffee went from raw berries (chewed or mixed with fat) to a brewed beverage through roasting and grinding innovations over two centuries. Heading ix ('The gradual transformation from raw berry to prepared beverage') fits precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P1_HEADINGS, answer: "B", explanation: "Paragraph C covers European suspicion and resistance to coffee, including the Church's condemnation and divided medical opinion. Heading ii ('Initial European hostility toward an unfamiliar drink') captures this accurately." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P1_HEADINGS, answer: "F", explanation: "Paragraph D describes the rise of coffeehouses as intellectual and social venues across European cities. Heading vi ('The emergence of establishments dedicated to its consumption') is the correct match." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph E?", options: P1_HEADINGS, answer: "E", explanation: "Paragraph E details how European colonial powers established coffee plantations in Java, the Caribbean, and Brazil. Heading v ('The expansion of cultivation through colonial enterprise') matches this content." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P1_HEADINGS, answer: "C", explanation: "Paragraph F explains how caffeine blocks adenosine receptors and triggers dopamine/norepinephrine release. Heading iii ('The neurochemical mechanisms underlying its stimulant properties') is the precise match." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph G?", options: P1_HEADINGS, answer: "G", explanation: "Paragraph G presents both protective associations and negative effects of coffee, with individual genetic variation. Heading vii ('Inconclusive scientific evidence regarding long-term health effects') captures the contradictory findings." },
      { kind: "tfng", question: "Coffea arabica resulted from a natural hybridisation between two other coffee species.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph A states: 'Coffea arabica originated as a natural hybrid between Coffea eugenioides and Coffea canephora.'" },
      { kind: "tfng", question: "Yemen prohibited all exports of coffee to maintain its commercial monopoly.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Paragraph B states Yemen prohibited 'the export of fertile seeds,' not all coffee exports. Yemen exported roasted/processed coffee through the port of Mocha; it was only fertile seeds that were banned." },
      { kind: "tfng", question: "Pope Clement VIII issued an official papal decree approving the consumption of coffee.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage describes a 'widely recounted — though possibly apocryphal — account' of the Pope declaring coffee satisfying, but no official papal decree is mentioned." },
      { kind: "tfng", question: "The insurance market known as Lloyd's of London originated in a coffeehouse.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — Paragraph D states: 'Edward Lloyd's coffeehouse, established in 1688, became the birthplace of the insurance market that bears his name.'" },
      { kind: "tfng", question: "Brazil became the world's largest coffee producer during the eighteenth century.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — Paragraph E states Brazil 'had become the world's largest producer by the mid-nineteenth century,' not the eighteenth century." },
      { kind: "tfng", question: "The 2017 BMJ umbrella review concluded that consuming more than five cups of coffee daily is harmful to health.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The review concluded that 3-4 cups was 'more likely to benefit health than to harm it,' but no specific claim about quantities above five cups is made in the passage." },
    ],
  },

  {
    slug: "mock-ac7-neuroplasticity",
    title: "Neuroplasticity: The Brain's Capacity for Reorganisation",
    titleVi: "Tính dẻ uốn của não: Khả năng tái tổ chức của bộ não",
    level: "C1",
    category: "mock-academic",
    passage: `Neuroplasticity: The Brain's Capacity for Reorganisation

For over a century following Santiago Ramon y Cajal's pioneering work in neuroanatomy — for which he received the Nobel Prize in 1906 — the prevailing orthodoxy in neuroscience held that the adult brain was essentially fixed in its structure and function. Cajal himself, despite his extraordinary contributions to mapping the cellular architecture of the nervous system, concluded that neural pathways were "fixed, ended, immutable" once development was complete. This doctrine, often summarised as the principle that "neurons that are lost are never regenerated," seemed to be confirmed by the devastating and irreversible nature of brain injuries and strokes. It was not until the latter decades of the twentieth century that a series of revolutionary experiments began to challenge this deeply entrenched assumption.

Among the earliest and most dramatic challenges to neural fixity came from the work of Paul Bach-y-Rita, a neuroscientist at the University of Wisconsin. In the late 1960s, Bach-y-Rita constructed a device that enabled congenitally blind individuals to perceive visual information through tactile stimulation. His original apparatus consisted of a dental chair fitted with a matrix of 400 vibrating stimulators against the subject's back, connected to a camera. Remarkably, after sufficient training, subjects could identify objects, describe shadows, and detect the movement of a ball rolling across a table — demonstrating that the brain's visual processing regions could learn to interpret sensory input arriving through an entirely different channel. Bach-y-Rita later refined this technology into a small electrode array placed on the tongue, which proved even more effective because of the tongue's exceptionally high density of sensory receptors.

The experimental work of Michael Merzenich at the University of California, San Francisco, provided some of the most rigorous evidence for cortical plasticity in adult brains. Through meticulous microelectrode mapping of the somatosensory cortex in owl monkeys, Merzenich demonstrated that the cortical area devoted to processing sensory input from a particular finger expanded dramatically when that finger was subjected to intensive tactile stimulation. Conversely, when a finger was amputated, its cortical territory was rapidly colonised by representations of adjacent fingers. This bidirectional reorganisation revealed that cortical maps are not anatomical fixtures but dynamic entities continuously shaped by experience and use. Merzenich's findings had profound practical implications: he co-developed one of the first cochlear implants and later created the Fast ForWord programme, a computer-based intervention for children with language-learning difficulties that exploits neural plasticity to improve auditory processing speed.

Perhaps no study has captured the public imagination more vividly than Eleanor Maguire's investigation of London taxi drivers, published in 2000. Using structural magnetic resonance imaging (MRI), Maguire and her colleagues at University College London demonstrated that the posterior hippocampi of experienced taxi drivers were significantly larger than those of age-matched control subjects, and that the degree of enlargement correlated positively with the number of years spent driving a taxi. London's extraordinarily complex street layout — comprising some 25,000 streets and 20,000 landmarks, all of which prospective drivers must memorise during a training process known as "The Knowledge" that typically requires three to four years of intensive study — appeared to have physically sculpted the brain region most closely associated with spatial navigation and memory formation.

Alvaro Pascual-Leone, a researcher at Harvard Medical School, demonstrated the remarkable speed with which cortical reorganisation can occur. In an elegant experiment, Pascual-Leone blindfolded sighted volunteers for five consecutive days while they practised intensive Braille reading. Using transcranial magnetic stimulation (TMS) to map cortical activity, he discovered that the participants' visual cortex — ordinarily dedicated exclusively to processing visual information — had begun responding to tactile input within just five days. Even more striking, when the blindfolds were removed, the visual cortex reverted to its normal function within approximately 24 hours, suggesting that the brain maintains latent cross-modal connections that can be rapidly unmasked when circumstances demand. This finding implied that plasticity is not solely a slow, structural process but can also involve the rapid functional redeployment of existing neural circuits.

The mechanisms underlying neuroplasticity operate at multiple levels. At the synaptic level, the principle articulated by Donald Hebb in 1949 — often paraphrased as "neurons that fire together wire together" — describes how simultaneous activation of pre-synaptic and post-synaptic neurons strengthens the connection between them through long-term potentiation (LTP). At the molecular level, brain-derived neurotrophic factor (BDNF) promotes the survival, growth, and differentiation of neurons and synapses, and its expression is upregulated by physical exercise, cognitive stimulation, and environmental enrichment. Plasticity is not unlimited, however: critical periods in early development represent windows of heightened malleability after which certain types of reorganisation become substantially more difficult, though not impossible. The extent of adult plasticity also varies by brain region, with sensory and motor cortices showing greater reorganisational capacity than, for example, primary visual cortex for certain functions.

The recognition that the adult brain retains significant plastic potential has transformed approaches to neurological rehabilitation. Constraint-induced movement therapy, developed by Edward Taub, forces stroke patients to use their affected limbs by restraining the unaffected ones, exploiting competitive plasticity to drive cortical reorganisation. Mindfulness meditation has been shown to increase grey matter density in regions associated with attention and emotional regulation. Cognitive training programmes, while commercially overstated in their claims, have demonstrated measurable benefits when closely targeted to specific deficits. As neuroscience continues to elucidate the rules and limits of plasticity, the prospect of precisely directed neural reorganisation — through pharmacological enhancement, non-invasive brain stimulation, or targeted behavioural interventions — moves closer to clinical reality.`,
    questions: [
      { kind: "matching-features", question: "Who concluded that neural pathways could not change after the brain had fully developed?", options: P2_RESEARCHERS, answer: "A", explanation: "Santiago Ramon y Cajal 'concluded that neural pathways were fixed, ended, immutable once development was complete.'" },
      { kind: "matching-features", question: "Who demonstrated that blind individuals could perceive visual information through sensations on their skin?", options: P2_RESEARCHERS, answer: "B", explanation: "Paul Bach-y-Rita 'constructed a device that enabled congenitally blind individuals to perceive visual information through tactile stimulation.'" },
      { kind: "matching-features", question: "Who showed that the cortical area representing a body part expanded with increased stimulation?", options: P2_RESEARCHERS, answer: "C", explanation: "Michael Merzenich 'demonstrated that the cortical area devoted to processing sensory input from a particular finger expanded dramatically when that finger was subjected to intensive tactile stimulation.'" },
      { kind: "matching-features", question: "Who used brain imaging to reveal structural differences linked to navigational expertise?", options: P2_RESEARCHERS, answer: "D", explanation: "Eleanor Maguire used 'structural magnetic resonance imaging (MRI)' to show taxi drivers' hippocampi were larger." },
      { kind: "matching-features", question: "Who proved that significant cortical reorganisation could occur within a matter of days?", options: P2_RESEARCHERS, answer: "E", explanation: "Alvaro Pascual-Leone showed the visual cortex 'had begun responding to tactile input within just five days.'" },
      { kind: "matching-features", question: "Who contributed to the development of technology that assists people with hearing impairment?", options: P2_RESEARCHERS, answer: "C", explanation: "Michael Merzenich 'co-developed one of the first cochlear implants.' This is tricky because Bach-y-Rita also worked with sensory substitution, but the cochlear implant specifically targets hearing." },
      { kind: "fill-blank", question: "Ramon y Cajal described neural pathways as 'fixed, ended, ______'.", options: [], answer: "immutable|Immutable", explanation: "The passage directly quotes Cajal: 'neural pathways were fixed, ended, immutable.'" },
      { kind: "fill-blank", question: "Bach-y-Rita's refined sensory substitution device used an electrode array placed on the ______.", options: [], answer: "tongue|the tongue", explanation: "'Bach-y-Rita later refined this technology into a small electrode array placed on the tongue.'" },
      { kind: "fill-blank", question: "Merzenich conducted his cortical mapping experiments using ______ as test subjects.", options: [], answer: "owl monkeys|monkeys", explanation: "'Through meticulous microelectrode mapping of the somatosensory cortex in owl monkeys.'" },
      { kind: "fill-blank", question: "The intensive memorisation process required of London taxi drivers is known as '______'.", options: [], answer: "The Knowledge|the Knowledge|Knowledge", explanation: "'a training process known as The Knowledge that typically requires three to four years.'" },
      { kind: "fill-blank", question: "After the blindfolds were removed, the visual cortex reverted to normal function within approximately ______ hours.", options: [], answer: "24|twenty-four|twentyfour", explanation: "'the visual cortex reverted to its normal function within approximately 24 hours.'" },
      { kind: "fill-blank", question: "The popular paraphrase of Hebb's principle states that neurons that fire together ______ together.", options: [], answer: "wire|Wire", explanation: "'often paraphrased as neurons that fire together wire together.'" },
      { kind: "fill-blank", question: "The molecule whose expression is increased by exercise and promotes neuronal survival is abbreviated as ______.", options: [], answer: "BDNF", explanation: "'brain-derived neurotrophic factor (BDNF) promotes the survival, growth, and differentiation of neurons and synapses, and its expression is upregulated by physical exercise.'" },
    ],
  },

  {
    slug: "mock-ac7-urban-heat-island",
    title: "The Urban Heat Island Effect",
    titleVi: "Hiệu ứng đảo nhiệt đô thị",
    level: "C1",
    category: "mock-academic",
    passage: `The Urban Heat Island Effect

A. The urban heat island (UHI) effect — the phenomenon whereby cities experience significantly higher temperatures than surrounding rural areas — was first systematically documented by Luke Howard, a British amateur meteorologist and manufacturing chemist, in his 1818 publication "The Climate of London." Howard's meticulous temperature records revealed that central London was consistently warmer than its rural periphery by an average of approximately 2 degrees Celsius, with the differential reaching 3.7 degrees on calm, cloudless nights. More than two centuries later, the effect Howard described has intensified dramatically: modern studies have recorded urban-rural temperature differentials exceeding 12 degrees Celsius in some cities, and the phenomenon has been identified in urban areas across every inhabited continent, from tropical megacities to subarctic settlements.

B. The principal driver of the UHI effect is the radical transformation of natural land surfaces into impervious artificial materials. Forests, grasslands, and wetlands — which cool the environment through evapotranspiration and by providing shade — are replaced by asphalt, concrete, steel, and glass, which possess fundamentally different thermal properties. Dark-coloured asphalt, which typically covers 30-45% of urban surfaces, has an albedo (solar reflectance) of just 0.05-0.10, meaning it absorbs 90-95% of incoming solar radiation and converts it to sensible heat. By contrast, natural vegetation reflects significantly more solar energy and actively cools the air through the evaporation of water from leaf surfaces. Concrete, while lighter in colour than asphalt, has a high thermal mass that allows it to store large quantities of heat during the day and release it gradually after sunset — a process that sustains elevated nocturnal temperatures.

C. Urban canyon geometry further amplifies the heat island effect. Tall buildings lining narrow streets create canyon-like configurations that trap solar radiation through multiple reflections between building surfaces, reducing the effective albedo of the urban surface far below that of individual building materials. These canyons also restrict sky view factors — the proportion of sky visible from ground level — impeding the radiative cooling that allows rural surfaces to shed heat efficiently after dark. Compounding these geometric effects is the substantial anthropogenic heat generated by urban activities. Vehicles, industrial processes, air conditioning systems, and the metabolic heat of dense human populations all inject thermal energy directly into the urban atmosphere. In Manhattan, anthropogenic heat flux has been estimated at approximately 100 watts per square metre — a figure comparable to the solar radiation reaching the surface on a cloudy winter day.

D. The UHI effect varies significantly across temporal scales. The most pronounced temperature differentials between urban and rural areas typically occur during nighttime hours, particularly under clear skies with low wind speeds, when rural areas cool rapidly through radiative heat loss while urban thermal mass continues to release stored heat. This nocturnal intensification carries important health implications: in a natural environment, cool nights provide physiological respite from daytime heat stress, allowing the body's thermoregulatory systems to recover. When urban temperatures remain elevated throughout the night, this recovery is compromised, cumulatively increasing the risk of heat-related illness and mortality. Seasonal patterns also influence UHI intensity: in mid-latitude cities, the effect tends to be strongest during summer when solar radiation input is greatest, though winter UHI effects are observable in cities with high energy consumption for heating.

E. The consequences of the UHI effect extend well beyond discomfort. During the devastating European heatwave of 2003, which caused an estimated 70,000 excess deaths, mortality rates in urban centres were significantly and disproportionately higher than in surrounding rural areas. Epidemiological studies have established that for each 1-degree Celsius increase in ambient temperature above local thresholds, heat-related mortality rises by approximately 2-5%. The UHI effect also degrades urban air quality: elevated temperatures accelerate the photochemical reactions that produce ground-level ozone (a harmful pollutant), increase the volatilisation of organic compounds from building materials and vehicle emissions, and intensify the formation of secondary particulate matter. Furthermore, the UHI creates a positive feedback loop with energy consumption: higher temperatures drive increased demand for mechanical cooling, which generates additional waste heat and requires greater electricity production — often from fossil fuel sources.

F. An increasingly sophisticated array of mitigation strategies has emerged to combat the UHI effect. Urban greening — the strategic incorporation of vegetation into the built environment — addresses multiple UHI drivers simultaneously. Street trees provide direct shade that can reduce surface temperatures beneath their canopy by up to 12 degrees Celsius while cooling ambient air through evapotranspiration. Green roofs, which replace conventional roofing materials with living vegetation, reduce both the building's thermal gain and the heat radiated into the surrounding environment; studies have demonstrated reductions of 30-40% in summertime cooling energy demand for buildings with extensive green roofs. Urban parks create measurable "cool islands" within cities, with cooling effects detectable up to several hundred metres beyond their boundaries — though the magnitude of this effect depends critically on park size, vegetation density, and the presence of irrigated surfaces.

G. Cool surface technologies offer another powerful mitigation pathway. High-albedo roofing materials, which can reflect 60-70% of solar radiation compared to 10-20% for conventional dark roofs, substantially reduce heat absorption. Cool pavements — engineered to maximise reflectance, permeability, or both — are being increasingly deployed in pilot programmes worldwide; Los Angeles has applied reflective coatings to over 60 street-miles as part of its comprehensive heat reduction strategy. At the urban planning scale, design principles that optimise building orientation for natural ventilation, preserve wind corridors, and maximise green space connectivity can mitigate UHI formation before it begins. The integration of these strategies into urban climate action plans has accelerated markedly since 2015, reflecting growing recognition that heat resilience must be embedded in the fabric of city design, not retrofitted as an afterthought.`,
    questions: [
      { kind: "matching-sentence-endings", question: "Modern research has established that in some cities...", options: P3_ENDINGS, answer: "A", explanation: "Paragraph A states 'urban-rural temperature differentials exceeding 12 degrees Celsius in some cities,' matching ending A." },
      { kind: "matching-sentence-endings", question: "Asphalt contributes significantly to urban heating because...", options: P3_ENDINGS, answer: "B", explanation: "Paragraph B explains asphalt 'absorbs 90-95% of incoming solar radiation and converts it to sensible heat,' which matches ending B." },
      { kind: "matching-sentence-endings", question: "The most extreme urban heat island effect typically occurs...", options: P3_ENDINGS, answer: "D", explanation: "Paragraph D states the most pronounced differentials occur 'during nighttime hours, particularly under clear skies with low wind speeds,' matching ending D." },
      { kind: "matching-sentence-endings", question: "During the 2003 European heatwave, evidence showed that...", options: P3_ENDINGS, answer: "E", explanation: "Paragraph E states 'mortality rates in urban centres were significantly and disproportionately higher,' matching ending E about greater risk of heat-related death." },
      { kind: "matching-sentence-endings", question: "The use of air conditioning creates a feedback problem because...", options: P3_ENDINGS, answer: "F", explanation: "Paragraph E describes the positive feedback loop: 'higher temperatures drive increased demand for mechanical cooling, which generates additional waste heat,' matching ending F." },
      { kind: "matching-sentence-endings", question: "Research indicates that mature urban trees are effective because...", options: P3_ENDINGS, answer: "C", explanation: "Paragraph F states 'Street trees provide direct shade that can reduce surface temperatures beneath their canopy by up to 12 degrees Celsius,' matching ending C." },
      { kind: "matching-sentence-endings", question: "Studies on vegetated roofing systems have demonstrated that...", options: P3_ENDINGS, answer: "G", explanation: "Paragraph F states 'reductions of 30-40% in summertime cooling energy demand,' matching ending G." },
      { kind: "mcq", question: "Luke Howard is described in the passage as...", options: ["a professional meteorologist employed by the British government", "an amateur weather observer who also worked as a chemist", "a university professor who studied atmospheric science", "a journalist who published articles about London's climate"], answer: "B", explanation: "Paragraph A describes Howard as 'a British amateur meteorologist and manufacturing chemist.' Option B paraphrases this accurately." },
      { kind: "mcq", question: "What does the term 'albedo' refer to in the passage?", options: ["the heat-storing capacity of building materials", "the amount of heat released by a surface after sunset", "the proportion of solar radiation reflected by a surface", "the temperature difference between urban and rural areas"], answer: "C", explanation: "Paragraph B defines albedo parenthetically as '(solar reflectance),' which matches option C." },
      { kind: "mcq", question: "The passage states that 'urban canyon' geometry increases heat primarily because...", options: ["buildings block wind and prevent natural ventilation", "solar radiation is trapped through multiple reflections between surfaces", "vehicle emissions become concentrated in narrow spaces", "pedestrian activity generates significant metabolic heat"], answer: "B", explanation: "Paragraph C states canyons 'trap solar radiation through multiple reflections between building surfaces.'" },
      { kind: "mcq", question: "According to the passage, why is the nocturnal heat island effect particularly hazardous?", options: ["people consume more energy at night for lighting and appliances", "emergency services are less available during nighttime hours", "the body's thermoregulatory systems cannot recover from daytime heat stress", "air pollution concentrations peak during the early morning hours"], answer: "C", explanation: "Paragraph D explains that cool nights provide 'physiological respite' and when this is compromised, 'the risk of heat-related illness and mortality' increases." },
      { kind: "mcq", question: "Ground-level ozone formation is worsened by the UHI effect because...", options: ["ozone molecules become unstable in colder atmospheric conditions", "elevated temperatures accelerate the photochemical reactions that produce ozone", "vehicle emissions increase proportionally with ambient temperature", "industrial output tends to rise significantly during warmer months"], answer: "B", explanation: "Paragraph E states 'elevated temperatures accelerate the photochemical reactions that produce ground-level ozone.'" },
      { kind: "mcq", question: "The 'cool island' effect of urban parks...", options: ["is strictly limited to the area within park boundaries", "can extend up to several hundred metres beyond the park", "depends primarily on the number of visitors using the park", "is uniform regardless of vegetation type or park size"], answer: "B", explanation: "Paragraph F states 'cooling effects detectable up to several hundred metres beyond their boundaries.'" },
      { kind: "mcq", question: "The passage implies that the most effective long-term approach to urban heat resilience is to...", options: ["invest primarily in reflective roofing materials for existing buildings", "restrict maximum building heights across all urban centres", "integrate heat mitigation into city planning and design from the start", "relocate the most vulnerable populations to suburban areas"], answer: "C", explanation: "Paragraph G concludes that 'heat resilience must be embedded in the fabric of city design, not retrofitted as an afterthought.'" },
    ],
  },
];

async function main() {
  const passageIds: string[] = [];

  for (const p of passages) {
    const wc = p.passage.split(/\s+/).filter(Boolean).length;
    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: { title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 930 + passages.indexOf(p) },
      create: { slug: p.slug, title: p.title, titleVi: p.titleVi, level: p.level, category: p.category, passage: p.passage, wordCount: wc, order: 930 + passages.indexOf(p) },
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
    console.log(`  ✓ [${p.level}] ${p.slug} (${wc} words, ${p.questions.length} questions)`);
  }

  const exam = await prisma.readingExam.upsert({
    where: { slug: examSlug },
    update: { title: "IELTS Academic Reading — Test 7", titleVi: "IELTS Academic Reading — Đề 7", type: "academic", timeMinutes: 60 },
    create: { slug: examSlug, title: "IELTS Academic Reading — Test 7", titleVi: "IELTS Academic Reading — Đề 7", type: "academic", timeMinutes: 60, order: 6 },
  });
  console.log(`\n  ✓ Exam: ${exam.slug}`);
  await prisma.readingExamSection.deleteMany({ where: { examId: exam.id } });
  for (let i = 0; i < passageIds.length; i++) {
    await prisma.readingExamSection.create({ data: { examId: exam.id, passageId: passageIds[i], order: i } });
  }
  console.log(`Done! 3 passages (${passages.reduce((s, p) => s + p.questions.length, 0)} questions) + exam + sections.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
