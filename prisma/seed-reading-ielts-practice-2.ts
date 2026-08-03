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

// ─────────────────────────────────────────────────────────────
// Passage 1 — The Sharing Economy: Benefits and Risks (B2)
// Question types: mcq + tfng
// ─────────────────────────────────────────────────────────────

const P1_PASSAGE = [
  "The Sharing Economy: Benefits and Risks",
  "",
  "A. Over the past decade, a new economic model has transformed the way millions of people access goods and services. The sharing economy, sometimes called the collaborative economy or peer-to-peer economy, is a system in which private individuals share access to assets, resources, or skills, typically through digital platforms. Companies such as Airbnb, Uber, and TaskRabbit have become household names, enabling ordinary citizens to monetise underutilised possessions — a spare bedroom, a car sitting idle for most of the day, or specialised expertise offered on an hourly basis. According to a 2019 report by PricewaterhouseCoopers, the global sharing economy was projected to grow from approximately 15 billion dollars in 2014 to 335 billion dollars by 2025, reflecting both widespread consumer adoption and substantial investor confidence in the model.",
  "",
  "B. Proponents of the sharing economy argue that it delivers significant environmental benefits. When individuals share vehicles through ride-hailing or car-sharing services, the overall number of privately owned cars on the road may decline, potentially reducing traffic congestion and carbon emissions. A study conducted by the University of California, Berkeley found that each shared vehicle removed between nine and thirteen private cars from the road. Similarly, platforms that facilitate the sharing of household tools, clothing, and electronic devices extend the useful life of manufactured goods, thereby reducing waste and the demand for raw materials. The underlying principle is straightforward: if a power drill is used for an average of only thirteen minutes over its entire lifetime, it makes far more economic and ecological sense to share one among several households than for each household to purchase its own.",
  "",
  "C. The sharing economy has also been praised for its capacity to generate income for individuals who might otherwise struggle in traditional labour markets. Freelancers, retirees, students, and stay-at-home parents can earn supplementary income by offering services or renting assets on their own schedules. In developing countries, platforms such as Grab in Southeast Asia and Gojek in Indonesia have created millions of income opportunities for drivers, delivery workers, and small vendors. Research published by the Brookings Institution noted that in the United States alone, an estimated 44 million adults had participated in some form of sharing-economy activity by 2018, with many reporting that the flexibility it afforded was its most valued feature.",
  "",
  "D. Critics, however, raise serious concerns about the labour conditions that the sharing economy produces. Because most platform workers are classified as independent contractors rather than employees, they typically receive no health insurance, paid leave, pension contributions, or protection against unfair dismissal. This classification has been the subject of intense legal battles in multiple jurisdictions. In 2021, the United Kingdom Supreme Court ruled that Uber drivers were entitled to workers' rights, including the minimum wage and holiday pay. Despite this landmark decision, enforcement across the broader gig economy remains inconsistent, and many workers continue to operate without a safety net. Research by the International Labour Organization found that the average hourly earnings of platform workers in developing countries were as low as 3.40 dollars, well below the living wage in most regions.",
  "",
  "E. Regulatory challenges represent another contentious dimension of the sharing economy. Traditional industries such as hotels and taxis operate under strict licensing, safety, and taxation frameworks that have evolved over decades. Sharing-economy companies, by contrast, have frequently entered markets without equivalent regulatory oversight, creating what critics describe as an uneven playing field. In cities such as Barcelona, Berlin, and New York, local governments have introduced restrictions on short-term rental platforms after residents complained about rising housing costs, noise disturbances, and the erosion of community cohesion in neighbourhoods increasingly dominated by transient visitors. Balancing innovation with consumer protection and fair competition has proved to be one of the most complex policy challenges of the digital era.",
  "",
  "F. Privacy and data security constitute a further area of concern. Sharing-economy platforms collect vast quantities of personal information, including users' locations, financial details, travel patterns, and social connections. This data is commercially valuable and has, in several documented cases, been mishandled. In 2016, Uber disclosed that a data breach had compromised the personal information of approximately 57 million riders and drivers worldwide. The company initially concealed the breach, paying the hackers 100,000 dollars to delete the stolen data and remain silent. Such incidents erode consumer trust and highlight the need for robust data protection regulation that keeps pace with technological innovation.",
  "",
  "G. Looking to the future, the sharing economy is likely to continue expanding, driven by advances in mobile technology, artificial intelligence, and blockchain-based trust systems. However, its long-term sustainability will depend on the willingness of governments, platforms, and consumers to address the structural inequities and regulatory gaps that currently exist. A model that delivers convenience and cost savings to consumers while systematically transferring risk and cost to workers is unlikely to remain politically or socially tenable indefinitely. The challenge, then, is not whether to embrace the sharing economy, but how to design governance frameworks that preserve its benefits while mitigating its most harmful consequences.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// Passage 2 — Water Scarcity and Desalination Technology (C1)
// Question types: matching-headings + fill-blank
// ─────────────────────────────────────────────────────────────

const P2_HEADINGS = [
  "i. The disparity between freshwater demand and planetary supply",
  "ii. Transforming seawater through membrane filtration",
  "iii. Early thermal approaches and their limitations",
  "iv. Ecological consequences of concentrated discharge",
  "v. Harnessing renewable sources to lower operational expenses",
  "vi. Political agreements governing transboundary water resources",
  "vii. Prospects for emerging purification methods beyond current paradigms",
  "viii. Regional dependence on manufactured freshwater in arid nations",
  "ix. The role of pharmaceutical companies in water treatment",
];

const P2_PASSAGE = [
  "Water Scarcity and Desalination Technology",
  "",
  "A. Freshwater, upon which all terrestrial life depends, constitutes a remarkably small fraction of the planet's total water resources. Approximately 97.5 percent of all water on Earth is saline, found in oceans and seas. Of the remaining 2.5 percent that is fresh, roughly two-thirds is locked in glaciers and polar ice caps, rendering it inaccessible for human use. The result is that less than one percent of the world's water is readily available for drinking, agriculture, and industry. Meanwhile, global demand for freshwater has increased sixfold over the past century, driven by population growth, agricultural intensification, and industrial expansion. The United Nations estimates that by 2025, approximately 1.8 billion people will live in regions experiencing absolute water scarcity, while two-thirds of the global population may face water-stressed conditions.",
  "",
  "B. Desalination — the process of removing dissolved salts and other minerals from seawater or brackish water to produce potable water — has been practised for centuries. Early methods relied on thermal distillation, in which seawater was heated until it evaporated, and the resulting steam was condensed to yield fresh water. Multi-stage flash distillation, developed in the 1950s, improved upon simple distillation by passing heated seawater through a series of chambers at progressively lower pressures, causing it to flash into steam at each stage. While effective, thermal desalination is extraordinarily energy-intensive, requiring between 25 and 60 kilowatt-hours of energy per cubic metre of freshwater produced, which has historically limited its adoption to oil-rich nations where energy costs are subsidised.",
  "",
  "C. The development of reverse osmosis technology in the 1960s represented a fundamental shift in desalination science. Rather than heating water, reverse osmosis forces seawater through semi-permeable membranes under high pressure, allowing water molecules to pass through while retaining dissolved salts. Modern reverse osmosis plants consume between 3 and 5 kilowatt-hours per cubic metre — a fraction of the energy required by thermal methods. The Sorek desalination facility in Israel, one of the world's largest reverse osmosis plants, produces approximately 624,000 cubic metres of freshwater daily, supplying roughly 20 percent of the country's domestic water needs at a cost of approximately 0.50 dollars per cubic metre. Advances in membrane materials, energy recovery devices, and pre-treatment processes continue to drive costs downward.",
  "",
  "D. Despite these technological advances, desalination poses significant environmental challenges. The most pressing is the disposal of brine, the highly concentrated salt solution that remains after freshwater has been extracted. For every litre of freshwater produced, approximately 1.5 litres of brine are generated. When discharged into coastal waters, this hypersaline effluent can devastate marine ecosystems by reducing dissolved oxygen levels, altering local salinity gradients, and smothering benthic organisms. A 2019 study published in the journal Science of the Total Environment estimated that the world's approximately 16,000 desalination plants collectively produce 141.5 million cubic metres of brine daily — enough to cover the state of Florida to a depth of 30 centimetres each year. Chemical additives used in pre-treatment and membrane cleaning, including chlorine, anti-scalants, and biocides, further compound the ecological impact when they enter marine environments.",
  "",
  "E. The energy demands of desalination have prompted growing interest in coupling desalination facilities with renewable energy sources. Solar-powered desalination is particularly promising in arid regions where both sunshine and water scarcity are abundant. The Al Khafji solar desalination plant in Saudi Arabia, which commenced operations in 2018, was the world's first large-scale facility powered entirely by photovoltaic energy. Wind-powered desalination is operational in several island nations, including the Canary Islands and the island of Curaçao, where consistent trade winds provide a reliable energy source. Analysts at the International Renewable Energy Agency project that by 2030, renewable-energy-powered desalination could reduce the carbon footprint of water production by up to 90 percent compared with fossil-fuel-driven plants.",
  "",
  "F. Several Middle Eastern and North African nations have become profoundly dependent on desalinated water. Saudi Arabia operates more than 30 desalination plants that collectively supply over 50 percent of the kingdom's drinking water. The United Arab Emirates derives approximately 42 percent of its municipal water from desalination, while Kuwait relies on desalinated sources for nearly 100 percent of its potable supply. Israel's five large-scale desalination plants, concentrated along the Mediterranean coast, now provide approximately 80 percent of the country's domestic water, a transformation that has effectively insulated the nation from the droughts that periodically afflict the region. This heavy reliance, however, raises questions about infrastructure resilience, since a single coordinated disruption to desalination capacity could precipitate a national water crisis.",
  "",
  "G. Researchers are now investigating next-generation technologies that may transcend the limitations of current reverse osmosis systems. Forward osmosis, which exploits natural osmotic gradients rather than applied pressure, offers the potential for significantly lower energy consumption. Membrane distillation, a hybrid thermal-membrane approach, can utilise low-grade waste heat from industrial processes to drive separation. Perhaps most ambitiously, graphene-based membranes — single-atom-thick sheets of carbon — have demonstrated in laboratory settings the ability to filter salt ions with extraordinary precision while allowing water to pass at rates far exceeding those of conventional polymer membranes. While none of these technologies has yet achieved commercial scale, they represent promising avenues for making desalination cheaper, more efficient, and more environmentally sustainable.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// Passage 3 — The Evolution of the Human Diet (B2)
// Question types: matching-information + mcq
// ─────────────────────────────────────────────────────────────

const P3_PARAGRAPHS = [
  "Paragraph A",
  "Paragraph B",
  "Paragraph C",
  "Paragraph D",
  "Paragraph E",
  "Paragraph F",
  "Paragraph G",
];

const P3_PASSAGE = [
  "The Evolution of the Human Diet",
  "",
  "A. The story of human evolution is, in many respects, a story about food. The dietary choices made by our ancestors over millions of years shaped not only our bodies but also our brains, our social structures, and our relationship with the natural world. Understanding how the human diet has changed over time provides valuable insights into modern nutrition, public health, and the environmental consequences of contemporary food systems. Archaeological evidence, isotopic analysis of fossilised bones, and comparative studies of primate diets have enabled researchers to reconstruct, with increasing precision, the dietary history of our species.",
  "",
  "B. The earliest hominins, living approximately 4 to 6 million years ago in the forests of East and Central Africa, were predominantly frugivorous, subsisting mainly on fruits, leaves, seeds, and insects — a diet broadly similar to that of modern chimpanzees. As the African climate became drier and forests gave way to open savannahs, early hominins were forced to adapt. Australopithecus species, which appeared around 4 million years ago, developed robust jaws and large molars adapted for grinding tough, fibrous plant foods such as tubers, roots, and sedges. Dental microwear analysis suggests that these early ancestors consumed a remarkably varied diet, adjusting their food choices seasonally in response to availability.",
  "",
  "C. A pivotal dietary transition occurred with the emergence of the genus Homo approximately 2.5 million years ago. Fossil evidence from sites in Ethiopia and Tanzania indicates that early Homo species began incorporating substantial quantities of animal protein into their diets, initially through scavenging carcasses left by predators and later through active hunting. Stone tools dating to this period — sharp-edged flakes used for cutting meat and hammerstones for cracking bones to access marrow — confirm the growing importance of meat consumption. The nutritional density of animal foods, rich in protein, fat, and essential micronutrients such as iron, zinc, and vitamin B12, is widely believed to have fuelled the dramatic increase in brain size observed in the Homo lineage.",
  "",
  "D. The mastery of fire, which most researchers date to between 1 million and 400,000 years ago, represented perhaps the single most transformative development in human dietary history. Cooking breaks down tough plant fibres and denatures proteins, making food easier to chew, digest, and absorb. The biological anthropologist Richard Wrangham has argued that cooking effectively outsourced part of the digestive process to an external technology, allowing the human gut to shrink while the brain expanded — a trade-off that would not have been energetically feasible on a raw diet. Cooked food also killed parasites and pathogens, reducing disease and extending lifespan. Beyond its physiological effects, the hearth became a social focal point, fostering communication, cooperation, and the cultural transmission of knowledge.",
  "",
  "E. The Neolithic Revolution, beginning around 10,000 years ago, fundamentally altered the human diet once more. The transition from hunting and gathering to settled agriculture enabled populations to grow dramatically, but it also narrowed the range of foods consumed. Early agricultural societies became heavily dependent on a small number of domesticated cereal grains — wheat, rice, maize, and barley — which provided abundant calories but lacked the micronutrient diversity of the wild foods they replaced. Skeletal evidence from this period reveals a marked decline in average height, dental health, and bone density, suggesting that early farmers were, paradoxically, less well-nourished than the hunter-gatherers who preceded them.",
  "",
  "F. The Industrial Revolution of the eighteenth and nineteenth centuries introduced yet another radical transformation. Mechanised milling stripped grains of their nutrient-rich bran and germ, producing refined white flour that was cheaper, lighter, and longer-lasting but significantly less nutritious. The mass production of sugar, facilitated by colonial plantation economies and the development of sugar beet processing in Europe, made this once-rare luxury widely available. By the twentieth century, the rise of processed and ultra-processed foods — engineered for palatability, shelf stability, and low cost — had created diets characterised by excessive sugar, refined carbohydrates, saturated fats, and sodium, but deficient in fibre, vitamins, and minerals.",
  "",
  "G. Today, the consequences of these dietary shifts are manifested in a global epidemic of non-communicable diseases. The World Health Organization reports that cardiovascular disease, type 2 diabetes, and diet-related cancers collectively account for over 70 percent of all deaths worldwide. Simultaneously, approximately 690 million people remain undernourished, while over 2 billion suffer from micronutrient deficiencies — a phenomenon known as hidden hunger. A growing body of research suggests that returning to dietary patterns more closely aligned with those of our evolutionary past — rich in vegetables, fruits, lean proteins, nuts, and unprocessed foods — may offer a pathway to improved health outcomes. However, achieving such a shift at a global scale requires not merely individual behavioural change but systemic reform of agricultural subsidies, food marketing regulations, and supply chain structures.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// Passage 4 — Noise Pollution and Public Health (C1)
// Question types: matching-sentence-endings + tfng
// ─────────────────────────────────────────────────────────────

const P4_SENTENCE_BEGINNINGS_OPTIONS = [
  "it can trigger permanent hearing loss through damage to cochlear hair cells.",
  "it disrupts the release of melatonin and alters sleep architecture.",
  "they are often excluded from environmental noise legislation.",
  "it raises cortisol and catecholamine levels even during sleep.",
  "the economic burden of noise-related illness runs into billions annually.",
  "they restrict heavy vehicle access during nighttime hours.",
  "it interferes with phonological processing in developing brains.",
  "residents in quieter areas have measurably higher property values.",
  "it reduces cognitive test scores by up to fifteen percent.",
];

const P4_PASSAGE = [
  "Noise Pollution and Public Health",
  "",
  "A. Among the many forms of environmental pollution that affect human well-being, noise pollution remains one of the most pervasive yet least regulated. The World Health Organization has identified environmental noise as the second largest environmental health risk in Europe, surpassed only by air pollution. Unlike chemical pollutants, which can be measured in parts per million and regulated through emission standards, noise is transient and subjective, making it difficult to quantify, monitor, and control. Nevertheless, a substantial and growing body of epidemiological research demonstrates that chronic exposure to environmental noise exerts profound and measurable effects on both physical and mental health.",
  "",
  "B. The most direct health consequence of excessive noise exposure is hearing impairment. Prolonged exposure to sounds exceeding 85 decibels — equivalent to heavy traffic or a crowded restaurant — can cause irreversible damage to the delicate hair cells of the cochlea, the spiral-shaped structure in the inner ear responsible for converting sound vibrations into electrical signals. The World Health Organization estimates that approximately 1.1 billion young people worldwide are at risk of noise-induced hearing loss due to exposure to unsafe sound levels in recreational settings, including concerts, nightclubs, and personal audio devices. Unlike many health conditions, noise-induced hearing loss is entirely preventable, yet awareness of the risk remains alarmingly low.",
  "",
  "C. Beyond auditory damage, chronic noise exposure has been convincingly linked to cardiovascular disease. A landmark study published in the European Heart Journal in 2014 found that for every 10-decibel increase in average nighttime noise exposure, the risk of heart attack increased by between 7 and 17 percent. The mechanism is physiological: noise activates the sympathetic nervous system, triggering the release of stress hormones including cortisol and catecholamines. These hormones elevate blood pressure, increase heart rate, and promote systemic inflammation — responses that, when chronically activated, accelerate the development of atherosclerosis, hypertension, and ischaemic heart disease. Critically, these cardiovascular effects occur even when the individual is asleep and consciously unaware of the noise, as the auditory system continues to process environmental sounds during all stages of sleep.",
  "",
  "D. The impact of noise on sleep quality represents another major public health concern. Environmental noise disrupts normal sleep architecture by preventing or delaying the onset of deep slow-wave sleep and rapid eye movement sleep, both of which are essential for cognitive restoration, immune function, and emotional regulation. Nocturnal noise exposure has been shown to suppress the secretion of melatonin, the hormone that regulates circadian rhythms, and to increase the frequency of arousals and sleep-stage transitions. A large-scale study of over 4,000 residents living near European airports found that aircraft noise exposure above 40 decibels at night was associated with a significant increase in self-reported insomnia, daytime sleepiness, and the use of sleep medication.",
  "",
  "E. Children are particularly vulnerable to the effects of environmental noise. Research conducted near major airports in London, Amsterdam, and Madrid — collectively known as the RANCH study — demonstrated that chronic aircraft noise exposure was associated with significant impairments in reading comprehension and long-term memory among primary school children. The effect was dose-dependent: for every 5-decibel increase in noise exposure, reading age fell by approximately two months. Researchers attribute these findings to noise interference with phonological processing — the ability to distinguish and manipulate the sounds of language — which is foundational to literacy acquisition. Additionally, children exposed to chronic noise exhibit elevated cortisol levels and reduced motivation, suggesting that the cognitive effects are compounded by physiological stress responses.",
  "",
  "F. Despite the accumulating evidence of its health impacts, noise pollution has received comparatively little regulatory attention. In many jurisdictions, environmental noise standards apply only to industrial sources and major transport infrastructure, leaving domestic noise, construction noise, and commercial noise largely unregulated. Urban planning decisions frequently prioritise economic development over acoustic amenity, resulting in residential areas situated uncomfortably close to highways, railway lines, and flight paths. Some European cities, notably Vienna, Zurich, and Copenhagen, have pioneered noise action plans that integrate acoustic mapping, quiet zone designation, speed reduction on arterial roads, and restrictions on heavy goods vehicles during nighttime hours. These initiatives have yielded measurable reductions in ambient noise levels and corresponding improvements in residents' reported quality of life.",
  "",
  "G. The economic dimensions of noise pollution are substantial but often overlooked. A comprehensive study commissioned by the European Environment Agency estimated that environmental noise costs the European Union approximately 40 billion euros annually in health-related expenses, lost productivity, and reduced property values. In the United States, the Federal Aviation Administration has documented that residential properties located within high-noise zones near airports sell for between 5 and 15 percent less than comparable properties in quieter areas. These economic costs, borne disproportionately by lower-income communities — which are more likely to be situated near highways, industrial zones, and airports — add a dimension of environmental justice to the noise pollution debate. Addressing noise pollution effectively will require not merely stricter regulation but a fundamental rethinking of how cities are designed, built, and managed.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// Passage 5 — The Digital Divide in Education (B2)
// Question types: matching-features + fill-blank
// ─────────────────────────────────────────────────────────────

const P5_PASSAGE = [
  "The Digital Divide in Education",
  "",
  "A. The rapid expansion of digital technology in the twenty-first century has transformed virtually every aspect of modern life, and education is no exception. Online learning platforms, interactive educational software, digital textbooks, and video-conferencing tools have created unprecedented opportunities for students to access knowledge from anywhere in the world. During the COVID-19 pandemic, when schools in over 190 countries were forced to close their physical doors, digital technology became not merely a supplement to traditional education but its primary delivery mechanism. Yet this sudden transition laid bare a stark reality: hundreds of millions of students lacked the devices, internet connectivity, or digital skills necessary to participate in online learning, exposing the depth and breadth of the global digital divide.",
  "",
  "B. The digital divide in education manifests along multiple axes, including geography, income, gender, and disability. In sub-Saharan Africa, only approximately 22 percent of the population has access to the internet, compared with over 90 percent in Northern Europe. Within countries, disparities between urban and rural areas are often pronounced. A report by UNICEF found that in India, 60 percent of urban households had internet access in 2020, while in rural areas the figure was just 25 percent. Economic inequality further compounds the problem: students from low-income families are significantly less likely to own laptops, tablets, or smartphones, and when they do possess devices, these are often shared among multiple family members and may be outdated or poorly maintained.",
  "",
  "C. Gender disparities in digital access remain particularly acute in parts of South Asia, the Middle East, and sub-Saharan Africa. Globally, women are 16 percent less likely than men to use mobile internet, a gap that widens to 41 percent in sub-Saharan Africa. Cultural norms that restrict girls' mobility and access to technology, combined with safety concerns about online harassment, create additional barriers. The consequences for educational equity are significant: girls who cannot access digital learning resources during school closures fall further behind their male peers, compounding existing gender gaps in literacy and numeracy. The International Telecommunication Union has warned that without targeted interventions, digitalisation risks widening rather than narrowing gender inequality in education.",
  "",
  "D. The digital divide extends beyond mere access to hardware and connectivity. Even where devices and internet are available, disparities in digital literacy — the ability to find, evaluate, create, and communicate information using digital technologies — create a second-order divide. Students from disadvantaged backgrounds are more likely to use technology passively, for entertainment and social media, rather than actively, for research, creation, and collaboration. Their teachers, too, may lack training in digital pedagogy, resulting in online lessons that simply replicate traditional lecturing rather than exploiting the interactive and personalised capabilities of digital tools. Research by the Organisation for Economic Co-operation and Development has found that technology alone does not improve educational outcomes; it must be accompanied by teacher training, curriculum redesign, and pedagogical innovation.",
  "",
  "E. Several governments and international organisations have launched ambitious initiatives to bridge the educational digital divide. In Uruguay, the Plan Ceibal programme, launched in 2007, provided every primary school student and teacher with a free laptop and internet access, making it the first country in the world to achieve one-to-one computing in its public schools. Rwanda's One Laptop Per Child programme distributed over 200,000 devices to students in rural areas and trained thousands of teachers in digital skills. In the United States, the Federal Communications Commission's Emergency Connectivity Fund disbursed 7.17 billion dollars during the pandemic to provide devices and broadband connections to schools and libraries serving low-income communities.",
  "",
  "F. Private-sector and non-profit initiatives have also made notable contributions. The Khan Academy, a free online platform offering courses in mathematics, science, and humanities, serves over 120 million learners in 190 countries and is available in more than 50 languages. Google's Project Loon, though eventually discontinued, experimented with high-altitude balloons to deliver internet connectivity to remote regions. The Worldreader organisation has partnered with mobile network operators to provide free access to digital books for students in Africa and Asia, reaching over 20 million readers. These initiatives demonstrate that closing the digital divide requires not only governmental action but also collaboration between the private sector, civil society, and international institutions.",
  "",
  "G. Ultimately, bridging the digital divide in education is not merely a technical challenge but a question of political will and social priorities. The infrastructure investments required — broadband networks, affordable devices, electricity supply in off-grid communities — are substantial but achievable with sufficient commitment. More fundamentally, the digital divide reflects and reinforces broader patterns of social and economic inequality. A child born into poverty in a rural village in sub-Saharan Africa or South Asia faces educational disadvantages that extend far beyond the absence of a laptop. Addressing the digital divide meaningfully requires tackling its root causes: poverty, gender discrimination, inadequate public investment in education, and the structural inequities that determine who benefits from technological progress and who is left behind.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// Passage 6 — Coral Bleaching and Climate Change (C1)
// Question types: matching-headings + mcq + tfng
// ─────────────────────────────────────────────────────────────

const P6_HEADINGS = [
  "i. The symbiotic relationship that sustains reef ecosystems",
  "ii. Financial consequences for communities dependent on reef resources",
  "iii. Laboratory experiments to cultivate temperature-tolerant algae",
  "iv. How elevated temperatures disrupt an essential biological partnership",
  "v. International frameworks governing emissions reduction targets",
  "vi. The cumulative effect of repeated thermal episodes on recovery capacity",
  "vii. Anthropogenic factors that compound thermal stress on reef systems",
  "viii. Contrasting regional vulnerability based on oceanographic conditions",
  "ix. A comprehensive assessment of contemporary reef degradation worldwide",
  "x. The nutritional dependence of certain marine species on reef habitats",
];

const P6_PASSAGE = [
  "Coral Bleaching and Climate Change",
  "",
  "A. Coral reefs are among the most biologically diverse ecosystems on the planet, supporting an estimated 25 percent of all marine species despite covering less than 0.1 percent of the ocean floor. Often described as the rainforests of the sea, reef systems provide critical habitat for fish, invertebrates, and algae, and sustain the livelihoods of approximately 500 million people worldwide through fisheries, tourism, and coastal protection. The biological engine that drives reef productivity is a mutualistic symbiosis between reef-building corals and microscopic photosynthetic algae known as zooxanthellae, which reside within coral tissue. The algae supply the coral with up to 90 percent of its energy requirements through photosynthesis, while the coral provides the algae with shelter, carbon dioxide, and access to sunlight.",
  "",
  "B. Coral bleaching occurs when environmental stressors — most commonly elevated sea surface temperatures — cause the breakdown of this symbiotic relationship. When water temperatures rise by as little as 1 to 2 degrees Celsius above the normal summer maximum for a sustained period, corals expel their zooxanthellae in a stress response that leaves the coral tissue transparent, revealing the white calcium carbonate skeleton beneath. The term bleaching is therefore descriptive rather than chemical: the coral has not been stripped of colour by a bleaching agent but has instead lost the pigmented algae that gave it colour. Without their algal partners, bleached corals can survive for several weeks by feeding on zooplankton and dissolved organic matter, but if thermal stress persists, they will starve and die.",
  "",
  "C. The scale of coral bleaching has intensified dramatically in recent decades. The first recognised global mass bleaching event occurred in 1998, driven by a powerful El Nino that elevated sea surface temperatures across the tropics, killing an estimated 16 percent of the world's reef corals. Subsequent global events in 2010, 2014-2017, and 2020 have been progressively more severe. The 2014-2017 event, the longest and most widespread on record, affected over 70 percent of reef systems worldwide. Australia's Great Barrier Reef — the largest coral reef system on Earth, stretching over 2,300 kilometres — experienced unprecedented back-to-back bleaching events in 2016 and 2017, with aerial surveys revealing that approximately 50 percent of the reef's shallow-water corals died during this two-year period.",
  "",
  "D. The frequency and severity of bleaching events have profound implications for reef recovery. Healthy coral reefs can recover from bleaching if given sufficient time — typically between 10 and 15 years — for surviving corals to regrow and for larvae to recolonise damaged areas. However, as ocean temperatures continue to rise, the intervals between bleaching events are shrinking. On the Great Barrier Reef, the average gap between severe bleaching episodes has decreased from approximately 27 years in the 1980s to fewer than 6 years in recent events. This compression means that reefs are being struck again before they have recovered from the previous episode, creating a ratchet effect in which cumulative damage exceeds cumulative recovery. Climate projections suggest that under current emissions trajectories, most tropical reefs will experience annual bleaching-level thermal stress by the 2040s.",
  "",
  "E. While rising ocean temperatures are the primary driver of mass bleaching, several additional anthropogenic stressors exacerbate coral vulnerability. Agricultural runoff carrying fertilisers, pesticides, and sediment smothers reef surfaces and promotes the growth of algae that compete with corals for space and light. Overfishing removes herbivorous species such as parrotfish and sea urchins that would otherwise control algal overgrowth, further tilting the competitive balance against corals. Ocean acidification — the absorption of excess atmospheric carbon dioxide by seawater, which lowers pH and reduces the availability of carbonate ions — weakens coral skeletons and slows the rate of reef calcification. Destructive fishing practices, including the use of dynamite and cyanide, cause direct physical damage to reef structures. These stressors interact synergistically: a reef already weakened by pollution and overfishing is far less likely to survive a bleaching event than one in otherwise pristine condition.",
  "",
  "F. The economic consequences of reef degradation are far-reaching. The global economic value of coral reef ecosystem services — including fisheries production, coastal protection, tourism revenue, and pharmaceutical potential — has been estimated at approximately 375 billion dollars annually. In countries such as the Maldives, Fiji, and the Philippines, reef-dependent tourism and fisheries represent a substantial proportion of national income and employment. A 2018 study calculated that the Great Barrier Reef contributes 6.4 billion dollars annually to the Australian economy and supports 64,000 jobs. The degradation of reef systems therefore threatens not only biodiversity but also the economic stability and food security of hundreds of millions of people in tropical coastal communities.",
  "",
  "G. Scientists are pursuing a range of strategies to enhance reef resilience and buy time for coral ecosystems. Assisted gene flow — the deliberate translocation of heat-tolerant coral genotypes from warmer regions to cooler ones — aims to accelerate natural adaptation. Researchers at the Australian Institute of Marine Science have successfully bred hybrid corals that demonstrate enhanced thermal tolerance in controlled experiments. Coral gardening, in which fragments of resilient coral species are cultivated in underwater nurseries and then transplanted onto degraded reefs, has shown promise in the Caribbean and the Red Sea. Some teams are experimenting with cloud brightening — spraying fine mist particles into the atmosphere above reefs to increase cloud reflectivity and reduce solar radiation reaching the water surface. However, scientists caution that these interventions, while valuable, are ultimately palliative. Without rapid and substantial reductions in global greenhouse gas emissions, even the most innovative restoration efforts will be overwhelmed by the pace of warming.",
].join("\n");

// ─────────────────────────────────────────────────────────────
// All passages
// ─────────────────────────────────────────────────────────────

const passages: PassageData[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. The Sharing Economy: Benefits and Risks (B2) — mcq + tfng
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-sharing-economy",
    title: "The Sharing Economy: Benefits and Risks",
    titleVi: "Nền kinh tế chia sẻ: Lợi ích và Rủi ro",
    level: "B2",
    category: "ielts",
    passage: P1_PASSAGE,
    questions: [
      // MCQ (4 questions)
      { kind: "mcq", question: "According to the PricewaterhouseCoopers report, the global sharing economy was projected to reach approximately how much by 2025?", options: ["15 billion dollars", "150 billion dollars", "335 billion dollars", "500 billion dollars"], answer: "C", explanation: "The passage states the sharing economy was projected to grow 'from approximately 15 billion dollars in 2014 to 335 billion dollars by 2025.'" },
      { kind: "mcq", question: "What example does the passage use to illustrate wasteful individual ownership?", options: ["A lawnmower used once a month", "A power drill used for thirteen minutes in its lifetime", "A car driven only on weekends", "A bicycle stored in a garage"], answer: "B", explanation: "The passage states: 'if a power drill is used for an average of only thirteen minutes over its entire lifetime, it makes far more economic and ecological sense to share one among several households.'" },
      { kind: "mcq", question: "What did the UK Supreme Court rule in 2021 regarding Uber drivers?", options: ["They must pass additional driving examinations", "They are entitled to workers' rights including minimum wage and holiday pay", "They should be classified as business owners", "They must pay higher taxes as independent contractors"], answer: "B", explanation: "The passage states: 'the United Kingdom Supreme Court ruled that Uber drivers were entitled to workers' rights, including the minimum wage and holiday pay.'" },
      { kind: "mcq", question: "What did Uber pay hackers after the 2016 data breach?", options: ["50,000 dollars", "100,000 dollars", "500,000 dollars", "1 million dollars"], answer: "B", explanation: "The passage states Uber paid 'the hackers 100,000 dollars to delete the stolen data and remain silent.'" },
      // TFNG (5 questions)
      { kind: "tfng", question: "The University of California, Berkeley study found that each shared vehicle removed between nine and thirteen private cars from the road.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage explicitly states: 'each shared vehicle removed between nine and thirteen private cars from the road.'" },
      { kind: "tfng", question: "The sharing economy has been most successful in countries with high levels of public transport infrastructure.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage does not discuss any relationship between public transport infrastructure and the success of the sharing economy." },
      { kind: "tfng", question: "In the United States, fewer than 30 million adults had participated in sharing-economy activity by 2018.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states 'an estimated 44 million adults had participated in some form of sharing-economy activity by 2018,' which is more than 30 million." },
      { kind: "tfng", question: "Barcelona, Berlin, and New York have all introduced restrictions on short-term rental platforms.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage states: 'In cities such as Barcelona, Berlin, and New York, local governments have introduced restrictions on short-term rental platforms.'" },
      { kind: "tfng", question: "The Uber data breach of 2016 affected more riders than drivers.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage states the breach 'compromised the personal information of approximately 57 million riders and drivers worldwide' but does not specify the ratio between the two groups." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. Water Scarcity and Desalination Technology (C1) — matching-headings + fill-blank
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-water-desalination",
    title: "Water Scarcity and Desalination Technology",
    titleVi: "Khan hiếm nước và Công nghệ khử muối",
    level: "C1",
    category: "ielts",
    passage: P2_PASSAGE,
    questions: [
      // Matching headings (5 questions for 7 paragraphs, with distractors in the heading pool)
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P2_HEADINGS, answer: "A", explanation: "Paragraph A discusses how only a tiny fraction of the world's water is freshwater while demand has increased sixfold — a disparity between supply and demand. Heading i ('The disparity between freshwater demand and planetary supply') matches precisely. Heading vi about political agreements is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P2_HEADINGS, answer: "C", explanation: "Paragraph B describes early thermal distillation methods and multi-stage flash distillation, noting their extraordinary energy intensity as a limitation. Heading iii ('Early thermal approaches and their limitations') matches. Heading ii about membrane filtration describes reverse osmosis in Paragraph C, not thermal methods." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph C?", options: P2_HEADINGS, answer: "B", explanation: "Paragraph C describes reverse osmosis technology, which forces seawater through semi-permeable membranes. Heading ii ('Transforming seawater through membrane filtration') captures this precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P2_HEADINGS, answer: "D", explanation: "Paragraph D discusses the environmental impact of brine disposal — the concentrated salt discharge that devastates marine ecosystems. Heading iv ('Ecological consequences of concentrated discharge') matches. Heading ix about pharmaceutical companies is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph E?", options: P2_HEADINGS, answer: "E", explanation: "Paragraph E discusses solar and wind-powered desalination and projections for reducing the carbon footprint. Heading v ('Harnessing renewable sources to lower operational expenses') matches." },
      // Fill-blank (5 questions)
      { kind: "fill-blank", question: "Approximately _____ percent of all water on Earth is saline.", options: [], answer: "97.5", explanation: "The passage states: 'Approximately 97.5 percent of all water on Earth is saline.'" },
      { kind: "fill-blank", question: "The Sorek desalination facility produces freshwater at a cost of approximately _____ dollars per cubic metre.", options: [], answer: "0.50|0.5", explanation: "The passage states: 'at a cost of approximately 0.50 dollars per cubic metre.'" },
      { kind: "fill-blank", question: "For every litre of freshwater produced by desalination, approximately _____ litres of brine are generated.", options: [], answer: "1.5", explanation: "The passage states: 'For every litre of freshwater produced, approximately 1.5 litres of brine are generated.'" },
      { kind: "fill-blank", question: "Kuwait relies on desalinated sources for nearly _____ percent of its potable water supply.", options: [], answer: "100", explanation: "The passage states: 'Kuwait relies on desalinated sources for nearly 100 percent of its potable supply.'" },
      { kind: "fill-blank", question: "Graphene-based membranes are single-atom-thick sheets of _____.", options: [], answer: "carbon|Carbon", explanation: "The passage states: 'graphene-based membranes — single-atom-thick sheets of carbon.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. The Evolution of the Human Diet (B2) — matching-information + mcq
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-human-diet-evolution",
    title: "The Evolution of the Human Diet",
    titleVi: "Sự tiến hóa của chế độ ăn uống con người",
    level: "B2",
    category: "ielts",
    passage: P3_PASSAGE,
    questions: [
      // Matching information (5 questions)
      { kind: "matching-information", question: "Which paragraph mentions the social function of cooking beyond its nutritional benefits?", options: P3_PARAGRAPHS, answer: "D", explanation: "Paragraph D states: 'the hearth became a social focal point, fostering communication, cooperation, and the cultural transmission of knowledge.'" },
      { kind: "matching-information", question: "Which paragraph describes the paradox that early farmers were less healthy than hunter-gatherers?", options: P3_PARAGRAPHS, answer: "E", explanation: "Paragraph E states: 'early farmers were, paradoxically, less well-nourished than the hunter-gatherers who preceded them,' based on skeletal evidence of declining height, dental health, and bone density." },
      { kind: "matching-information", question: "Which paragraph refers to the use of isotopic analysis as a research method?", options: P3_PARAGRAPHS, answer: "A", explanation: "Paragraph A mentions 'isotopic analysis of fossilised bones' as one of the methods used to reconstruct dietary history." },
      { kind: "matching-information", question: "Which paragraph discusses the role of colonial economies in changing the modern diet?", options: P3_PARAGRAPHS, answer: "F", explanation: "Paragraph F states: 'The mass production of sugar, facilitated by colonial plantation economies and the development of sugar beet processing in Europe.'" },
      { kind: "matching-information", question: "Which paragraph explains how stone tools provide evidence of dietary change?", options: P3_PARAGRAPHS, answer: "C", explanation: "Paragraph C describes 'sharp-edged flakes used for cutting meat and hammerstones for cracking bones to access marrow' as confirmation of the growing importance of meat consumption." },
      // MCQ (5 questions)
      { kind: "mcq", question: "According to the passage, what proportion of all deaths worldwide is attributed to cardiovascular disease, type 2 diabetes, and diet-related cancers?", options: ["Over 50 percent", "Over 60 percent", "Over 70 percent", "Over 80 percent"], answer: "C", explanation: "Paragraph G states these diseases 'collectively account for over 70 percent of all deaths worldwide.'" },
      { kind: "mcq", question: "What dietary change does Richard Wrangham's theory link to brain expansion?", options: ["The consumption of raw vegetables", "The cooking of food", "The hunting of large mammals", "The cultivation of cereal grains"], answer: "B", explanation: "Paragraph D explains Wrangham's argument that 'cooking effectively outsourced part of the digestive process to an external technology, allowing the human gut to shrink while the brain expanded.'" },
      { kind: "mcq", question: "What is 'hidden hunger' as described in the passage?", options: ["The inability to find food in urban environments", "Micronutrient deficiencies despite sufficient caloric intake", "A psychological condition related to food insecurity", "Hunger experienced during religious fasting periods"], answer: "B", explanation: "Paragraph G describes 'over 2 billion suffer from micronutrient deficiencies — a phenomenon known as hidden hunger,' distinguishing it from caloric undernourishment." },
      { kind: "mcq", question: "What was the primary diet of the earliest hominins?", options: ["Mainly meat obtained through scavenging", "Predominantly cereal grains and tubers", "Mainly fruits, leaves, seeds, and insects", "A balanced mix of meat and vegetables"], answer: "C", explanation: "Paragraph B states the earliest hominins 'were predominantly frugivorous, subsisting mainly on fruits, leaves, seeds, and insects.'" },
      { kind: "mcq", question: "According to the passage, what effect did mechanised milling have on flour?", options: ["It increased its fibre content", "It made it more nutritious", "It removed nutrient-rich bran and germ", "It made it more expensive to produce"], answer: "C", explanation: "Paragraph F states: 'Mechanised milling stripped grains of their nutrient-rich bran and germ, producing refined white flour that was cheaper, lighter, and longer-lasting but significantly less nutritious.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. Noise Pollution and Public Health (C1) — matching-sentence-endings + tfng
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-noise-pollution-health",
    title: "Noise Pollution and Public Health",
    titleVi: "Ô nhiễm tiếng ồn và Sức khỏe cộng đồng",
    level: "C1",
    category: "ielts",
    passage: P4_PASSAGE,
    questions: [
      // Matching sentence endings (5 questions, 9 endings — more endings than questions)
      { kind: "matching-sentence-endings", question: "Prolonged exposure to sounds exceeding 85 decibels is harmful because", options: P4_SENTENCE_BEGINNINGS_OPTIONS, answer: "A", explanation: "Paragraph B explains that such exposure 'can cause irreversible damage to the delicate hair cells of the cochlea.' Option A ('it can trigger permanent hearing loss through damage to cochlear hair cells') matches." },
      { kind: "matching-sentence-endings", question: "Chronic noise exposure contributes to cardiovascular disease because", options: P4_SENTENCE_BEGINNINGS_OPTIONS, answer: "D", explanation: "Paragraph C explains that noise 'activates the sympathetic nervous system, triggering the release of stress hormones including cortisol and catecholamines' and that 'these cardiovascular effects occur even when the individual is asleep.' Option D matches." },
      { kind: "matching-sentence-endings", question: "Environmental noise disrupts sleep partly because", options: P4_SENTENCE_BEGINNINGS_OPTIONS, answer: "B", explanation: "Paragraph D states that nocturnal noise 'has been shown to suppress the secretion of melatonin' and disrupts sleep architecture. Option B ('it disrupts the release of melatonin and alters sleep architecture') matches." },
      { kind: "matching-sentence-endings", question: "Aircraft noise impairs children's reading development because", options: P4_SENTENCE_BEGINNINGS_OPTIONS, answer: "G", explanation: "Paragraph E attributes the findings to 'noise interference with phonological processing — the ability to distinguish and manipulate the sounds of language.' Option G ('it interferes with phonological processing in developing brains') matches." },
      { kind: "matching-sentence-endings", question: "Some European cities such as Vienna and Zurich have addressed noise pollution by introducing plans that", options: P4_SENTENCE_BEGINNINGS_OPTIONS, answer: "F", explanation: "Paragraph F describes initiatives including 'restrictions on heavy goods vehicles during nighttime hours.' Option F ('they restrict heavy vehicle access during nighttime hours') matches." },
      // TFNG (5 questions)
      { kind: "tfng", question: "The World Health Organization considers environmental noise to be the most significant environmental health risk in Europe.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states noise is 'the second largest environmental health risk in Europe, surpassed only by air pollution.' It is the second, not the most significant." },
      { kind: "tfng", question: "Noise-induced hearing loss caused by recreational settings affects an estimated 1.1 billion young people.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage says 1.1 billion young people are 'at risk of noise-induced hearing loss,' not that they are already affected. Being at risk is not the same as being affected." },
      { kind: "tfng", question: "For every 10-decibel increase in nighttime noise, the risk of heart attack increased by between 7 and 17 percent.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage explicitly states: 'for every 10-decibel increase in average nighttime noise exposure, the risk of heart attack increased by between 7 and 17 percent.'" },
      { kind: "tfng", question: "The RANCH study found that noise-related reading impairment affected secondary school students more severely than primary school children.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage mentions only primary school children in the RANCH study. No comparison with secondary school students is made." },
      { kind: "tfng", question: "Environmental noise costs the European Union approximately 40 billion euros per year.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage states: 'environmental noise costs the European Union approximately 40 billion euros annually.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. The Digital Divide in Education (B2) — matching-features + fill-blank
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-digital-divide-education",
    title: "The Digital Divide in Education",
    titleVi: "Khoảng cách số trong Giáo dục",
    level: "B2",
    category: "ielts",
    passage: P5_PASSAGE,
    questions: [
      // Matching features (5 questions — match initiatives to their descriptions)
      { kind: "matching-features", question: "Which initiative was the first to achieve one-to-one computing in all its public schools?", options: ["Plan Ceibal (Uruguay)", "One Laptop Per Child (Rwanda)", "Emergency Connectivity Fund (USA)", "Khan Academy", "Project Loon (Google)"], answer: "A", explanation: "The passage states Uruguay's Plan Ceibal 'provided every primary school student and teacher with a free laptop and internet access, making it the first country in the world to achieve one-to-one computing in its public schools.'" },
      { kind: "matching-features", question: "Which initiative distributed over 200,000 devices to students in rural areas?", options: ["Plan Ceibal (Uruguay)", "One Laptop Per Child (Rwanda)", "Emergency Connectivity Fund (USA)", "Khan Academy", "Project Loon (Google)"], answer: "B", explanation: "The passage states: 'Rwanda's One Laptop Per Child programme distributed over 200,000 devices to students in rural areas.'" },
      { kind: "matching-features", question: "Which initiative disbursed over 7 billion dollars to provide devices and broadband to underserved communities?", options: ["Plan Ceibal (Uruguay)", "One Laptop Per Child (Rwanda)", "Emergency Connectivity Fund (USA)", "Khan Academy", "Project Loon (Google)"], answer: "C", explanation: "The passage states the FCC's Emergency Connectivity Fund 'disbursed 7.17 billion dollars during the pandemic.'" },
      { kind: "matching-features", question: "Which initiative serves over 120 million learners across 190 countries?", options: ["Plan Ceibal (Uruguay)", "One Laptop Per Child (Rwanda)", "Emergency Connectivity Fund (USA)", "Khan Academy", "Project Loon (Google)"], answer: "D", explanation: "The passage states Khan Academy 'serves over 120 million learners in 190 countries and is available in more than 50 languages.'" },
      { kind: "matching-features", question: "Which initiative attempted to deliver internet connectivity using high-altitude balloons?", options: ["Plan Ceibal (Uruguay)", "One Laptop Per Child (Rwanda)", "Emergency Connectivity Fund (USA)", "Khan Academy", "Project Loon (Google)"], answer: "E", explanation: "The passage states: 'Google's Project Loon, though eventually discontinued, experimented with high-altitude balloons to deliver internet connectivity to remote regions.'" },
      // Fill-blank (5 questions)
      { kind: "fill-blank", question: "In sub-Saharan Africa, only approximately _____ percent of the population has access to the internet.", options: [], answer: "22", explanation: "The passage states: 'In sub-Saharan Africa, only approximately 22 percent of the population has access to the internet.'" },
      { kind: "fill-blank", question: "Globally, women are _____ percent less likely than men to use mobile internet.", options: [], answer: "16", explanation: "The passage states: 'Globally, women are 16 percent less likely than men to use mobile internet.'" },
      { kind: "fill-blank", question: "The gender gap in mobile internet use widens to _____ percent in sub-Saharan Africa.", options: [], answer: "41", explanation: "The passage states: 'a gap that widens to 41 percent in sub-Saharan Africa.'" },
      { kind: "fill-blank", question: "The Worldreader organisation has reached over _____ million readers in Africa and Asia.", options: [], answer: "20", explanation: "The passage states: 'reaching over 20 million readers.'" },
      { kind: "fill-blank", question: "During the COVID-19 pandemic, schools in over _____ countries were forced to close.", options: [], answer: "190", explanation: "The passage states: 'schools in over 190 countries were forced to close their physical doors.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. Coral Bleaching and Climate Change (C1) — matching-headings + mcq + tfng
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ielts-coral-bleaching-climate",
    title: "Coral Bleaching and Climate Change",
    titleVi: "Tẩy trắng san hô và Biến đổi khí hậu",
    level: "C1",
    category: "ielts",
    passage: P6_PASSAGE,
    questions: [
      // Matching headings (4 questions)
      { kind: "matching-headings", question: "Which heading best fits Paragraph A?", options: P6_HEADINGS, answer: "A", explanation: "Paragraph A describes the mutualistic symbiosis between corals and zooxanthellae, explaining how the algae supply energy through photosynthesis while the coral provides shelter. Heading i ('The symbiotic relationship that sustains reef ecosystems') matches. Heading x about nutritional dependence of marine species is a distractor — Paragraph A focuses on the coral-algae relationship, not fish feeding habits." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph B?", options: P6_HEADINGS, answer: "D", explanation: "Paragraph B explains how elevated temperatures cause corals to expel zooxanthellae, breaking down the symbiotic relationship and leaving the coral at risk of starvation. Heading iv ('How elevated temperatures disrupt an essential biological partnership') matches precisely." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph D?", options: P6_HEADINGS, answer: "F", explanation: "Paragraph D discusses how the shrinking intervals between bleaching events prevent recovery, creating a 'ratchet effect' of cumulative damage. Heading vi ('The cumulative effect of repeated thermal episodes on recovery capacity') matches. Heading v about international frameworks is a distractor." },
      { kind: "matching-headings", question: "Which heading best fits Paragraph F?", options: P6_HEADINGS, answer: "B", explanation: "Paragraph F discusses the economic value of reef systems (375 billion dollars annually), tourism revenue, jobs, and the threat to food security and economic stability. Heading ii ('Financial consequences for communities dependent on reef resources') matches." },
      // MCQ (3 questions)
      { kind: "mcq", question: "What percentage of all marine species do coral reefs support?", options: ["10 percent", "15 percent", "20 percent", "25 percent"], answer: "D", explanation: "Paragraph A states reefs support 'an estimated 25 percent of all marine species.'" },
      { kind: "mcq", question: "What was the estimated percentage of the world's reef corals killed during the 1998 bleaching event?", options: ["8 percent", "12 percent", "16 percent", "20 percent"], answer: "C", explanation: "Paragraph C states the 1998 event killed 'an estimated 16 percent of the world's reef corals.'" },
      { kind: "mcq", question: "According to the passage, what strategy involves deliberately moving heat-tolerant corals from warmer to cooler regions?", options: ["Coral gardening", "Assisted gene flow", "Cloud brightening", "Membrane distillation"], answer: "B", explanation: "Paragraph G describes 'Assisted gene flow — the deliberate translocation of heat-tolerant coral genotypes from warmer regions to cooler ones.'" },
      // TFNG (3 questions)
      { kind: "tfng", question: "Bleached corals can survive indefinitely by feeding on zooplankton.", options: ["True", "False", "Not Given"], answer: "B", explanation: "FALSE — The passage states bleached corals 'can survive for several weeks by feeding on zooplankton and dissolved organic matter, but if thermal stress persists, they will starve and die.' They cannot survive indefinitely." },
      { kind: "tfng", question: "The average gap between severe bleaching episodes on the Great Barrier Reef has decreased from 27 years to fewer than 6 years.", options: ["True", "False", "Not Given"], answer: "A", explanation: "TRUE — The passage states: 'the average gap between severe bleaching episodes has decreased from approximately 27 years in the 1980s to fewer than 6 years in recent events.'" },
      { kind: "tfng", question: "Cloud brightening has been successfully deployed at scale on the Great Barrier Reef.", options: ["True", "False", "Not Given"], answer: "C", explanation: "NOT GIVEN — The passage mentions some teams 'are experimenting with cloud brightening' but does not state it has been deployed at scale on the Great Barrier Reef or anywhere else." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Seed runner
// ─────────────────────────────────────────────────────────────

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
        order: 97 + idx,
      },
      create: {
        slug: p.slug,
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount: wc,
        order: 97 + idx,
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
