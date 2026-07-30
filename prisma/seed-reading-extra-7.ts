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
  // 1. A1 — Environment: Recycling at Home
  // ═══════════════════════════════════════════════════════════
  {
    slug: "recycling-at-home",
    title: "Recycling at Home",
    titleVi: "Tái chế tại nhà",
    level: "A1",
    category: "environment",
    passage: `Recycling at Home

My family recycles every day. We have three bins in our kitchen. One bin is for paper. One bin is for plastic. One bin is for food waste.

Every morning, my mother puts fruit peels and vegetable scraps in the food waste bin. She uses this waste to make compost for her garden. The plants in our garden grow very well because of the compost.

My father collects old newspapers and cardboard boxes. He puts them in the paper bin. Every Saturday, he takes the paper to the recycling center near our house. The recycling center is open from 8:00 AM to 5:00 PM.

I collect plastic bottles and containers. I wash them with water before putting them in the plastic bin. My teacher says washing plastic before recycling is very important. Dirty plastic cannot be recycled.

My younger sister likes to help too. She collects old toys and clothes. We give them to a charity shop in our neighborhood. Other children can use them.

Last month, our school had a recycling competition. Each class collected as much recyclable material as possible. My class collected 45 kilograms of paper and 30 kilograms of plastic. We won second place! I felt very proud.

Recycling is easy. Everyone can do it. It helps keep our city clean and protects the environment.`,
    questions: [
      { question: "How many bins does the family have in the kitchen?", options: ["Two", "Three", "Four", "Five"], answer: "B", explanation: "'We have three bins in our kitchen.'" },
      { question: "What does the mother make from food waste?", options: ["Soup", "Animal food", "Compost", "Medicine"], answer: "C", explanation: "'She uses this waste to make compost for her garden.'" },
      { question: "When does the father take paper to the recycling center?", options: ["Every Monday", "Every Friday", "Every Saturday", "Every Sunday"], answer: "C", explanation: "'Every Saturday, he takes the paper to the recycling center.'" },
      { question: "Why is it important to wash plastic before recycling?", options: ["It looks nicer", "Dirty plastic cannot be recycled", "It is the law", "The bin will smell bad"], answer: "B", explanation: "'Dirty plastic cannot be recycled.'" },
      { question: "What does the younger sister collect?", options: ["Plastic bottles", "Newspapers", "Old toys and clothes", "Glass jars"], answer: "C", explanation: "'She collects old toys and clothes.'" },
      { question: "How much paper did the class collect?", options: ["30 kilograms", "35 kilograms", "40 kilograms", "45 kilograms"], answer: "D", explanation: "'My class collected 45 kilograms of paper.'" },
      { question: "What place did the class win in the competition?", options: ["First place", "Second place", "Third place", "Fourth place"], answer: "B", explanation: "'We won second place!'" },
      { question: "Where do they give old toys and clothes?", options: ["To the school", "To the recycling center", "To a charity shop", "To their neighbors"], answer: "C", explanation: "'We give them to a charity shop in our neighborhood.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. A1 — Animals: My Pet Hamster
  // ═══════════════════════════════════════════════════════════
  {
    slug: "my-pet-hamster",
    title: "My Pet Hamster",
    titleVi: "Chú chuột hamster của tôi",
    level: "A1",
    category: "animals",
    passage: `My Pet Hamster

I have a pet hamster. His name is Biscuit. He is small and has soft brown and white fur. I got Biscuit on my birthday last year. He was a gift from my parents.

Biscuit lives in a cage in my bedroom. The cage has a water bottle, a food bowl, and a small house where he sleeps. He also has a running wheel. Biscuit loves to run on his wheel, especially at night. Sometimes he is very noisy!

I feed Biscuit every morning and evening. He eats seeds, small pieces of fruit, and vegetables. His favorite food is sunflower seeds. He holds them with his tiny hands and eats them very quickly. He also puts food in his cheeks. His cheeks get very big and round. It is very funny to watch.

I clean Biscuit's cage every week. I change the bedding and wash the water bottle and food bowl. My mother helps me sometimes. She says keeping the cage clean is important for Biscuit's health.

Biscuit does not like loud noises. When I play music too loudly, he hides in his little house. I always try to be quiet around him.

My friends like to visit and see Biscuit. They think he is very cute. I am happy to have him as my pet.`,
    questions: [
      { question: "What is the hamster's name?", options: ["Cookie", "Biscuit", "Muffin", "Brownie"], answer: "B", explanation: "'His name is Biscuit.'" },
      { question: "What color is Biscuit's fur?", options: ["Black and white", "Brown and white", "Gray and white", "Orange and white"], answer: "B", explanation: "'He has soft brown and white fur.'" },
      { question: "Where does Biscuit live?", options: ["In the living room", "In the garden", "In the bedroom", "In the kitchen"], answer: "C", explanation: "'Biscuit lives in a cage in my bedroom.'" },
      { question: "When does Biscuit like to run on his wheel?", options: ["In the morning", "In the afternoon", "At night", "After eating"], answer: "C", explanation: "'Biscuit loves to run on his wheel, especially at night.'" },
      { question: "What is Biscuit's favorite food?", options: ["Carrots", "Apples", "Sunflower seeds", "Bread"], answer: "C", explanation: "'His favorite food is sunflower seeds.'" },
      { question: "What does Biscuit do with food?", options: ["He buries it", "He puts food in his cheeks", "He throws it away", "He shares it"], answer: "B", explanation: "'He also puts food in his cheeks.'" },
      { question: "How often is the cage cleaned?", options: ["Every day", "Every week", "Every month", "Every two weeks"], answer: "B", explanation: "'I clean Biscuit's cage every week.'" },
      { question: "What does Biscuit do when music is too loud?", options: ["He runs on his wheel", "He eats more food", "He hides in his little house", "He squeaks loudly"], answer: "C", explanation: "'When I play music too loudly, he hides in his little house.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. A2 — Travel: Famous Landmarks Around the World
  // ═══════════════════════════════════════════════════════════
  {
    slug: "famous-landmarks-world",
    title: "Famous Landmarks Around the World",
    titleVi: "Các địa danh nổi tiếng trên thế giới",
    level: "A2",
    category: "travel",
    passage: `Famous Landmarks Around the World

People love to travel and visit famous places. There are many amazing landmarks around the world. Each landmark has a special history and attracts millions of visitors every year.

The Eiffel Tower is in Paris, France. It was built in 1889 for a world fair. It is 330 meters tall and made of iron. Visitors can take an elevator or climb the stairs to the top. From there, they can see the whole city of Paris. About 7 million people visit the Eiffel Tower every year.

The Great Wall of China is one of the longest structures ever built. It stretches over 21,000 kilometers across northern China. Ancient emperors built the wall to protect China from invaders. Today, visitors can walk along different sections of the wall and enjoy the beautiful mountain views.

Machu Picchu is an ancient city in the mountains of Peru. The Inca people built it around 1450. It is located 2,430 meters above sea level. Visitors must take a train or hike for several days to reach it. The ruins are surrounded by green mountains and clouds. Many people call it one of the most beautiful places on Earth.

The Taj Mahal is a white marble building in Agra, India. Emperor Shah Jahan built it for his wife in the 1600s. It took about 22 years and 20,000 workers to complete. The building changes color during the day — it looks pink in the morning, white during the day, and golden in the evening.

Visiting landmarks teaches us about history, culture, and architecture. Each place tells a unique story about the people who built it.`,
    questions: [
      { question: "When was the Eiffel Tower built?", options: ["1879", "1889", "1899", "1909"], answer: "B", explanation: "'It was built in 1889 for a world fair.'" },
      { question: "How tall is the Eiffel Tower?", options: ["230 meters", "280 meters", "330 meters", "380 meters"], answer: "C", explanation: "'It is 330 meters tall.'" },
      { question: "Why was the Great Wall of China built?", options: ["For decoration", "For trade routes", "To protect from invaders", "For farming"], answer: "C", explanation: "'Ancient emperors built the wall to protect China from invaders.'" },
      { question: "How long is the Great Wall of China?", options: ["Over 10,000 km", "Over 15,000 km", "Over 21,000 km", "Over 30,000 km"], answer: "C", explanation: "'It stretches over 21,000 kilometers.'" },
      { question: "Who built Machu Picchu?", options: ["The Maya people", "The Aztec people", "The Inca people", "The Spanish"], answer: "C", explanation: "'The Inca people built it around 1450.'" },
      { question: "How high is Machu Picchu above sea level?", options: ["1,430 meters", "2,430 meters", "3,430 meters", "4,430 meters"], answer: "B", explanation: "'It is located 2,430 meters above sea level.'" },
      { question: "Who built the Taj Mahal?", options: ["Emperor Akbar", "Emperor Shah Jahan", "Emperor Ashoka", "Emperor Babur"], answer: "B", explanation: "'Emperor Shah Jahan built it for his wife.'" },
      { question: "How long did it take to build the Taj Mahal?", options: ["10 years", "15 years", "22 years", "30 years"], answer: "C", explanation: "'It took about 22 years and 20,000 workers to complete.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. A2 — Animals: The Life of Honey Bees
  // ═══════════════════════════════════════════════════════════
  {
    slug: "life-of-honey-bees",
    title: "The Life of Honey Bees",
    titleVi: "Cuộc sống của ong mật",
    level: "A2",
    category: "animals",
    passage: `The Life of Honey Bees

Honey bees are some of the most important insects in the world. They live in large groups called colonies. One colony can have up to 60,000 bees. Each bee has a special job to do.

The queen bee is the most important bee in the colony. She is the largest bee and her main job is to lay eggs. A queen bee can lay up to 2,000 eggs per day. There is only one queen in each colony.

Worker bees are all female. They do many different jobs. Young worker bees clean the hive and feed baby bees. Older worker bees fly out to collect nectar and pollen from flowers. They visit hundreds of flowers every day. Worker bees also build the honeycomb using wax from their bodies. The honeycomb has hexagonal cells where bees store honey and the queen lays eggs.

Drone bees are male. They are bigger than worker bees but they do not collect food or build the hive. Their only job is to mate with the queen. In winter, when food is limited, worker bees push the drones out of the hive.

Bees communicate through a special "waggle dance." When a bee finds good flowers, it returns to the hive and dances to tell other bees where the flowers are. The direction and length of the dance show the distance and direction of the food.

Bees are very important for our food. They pollinate about one-third of the food we eat, including apples, strawberries, and almonds. Without bees, many plants could not produce fruit.

Unfortunately, bee populations are decreasing around the world. Pesticides, habitat loss, and climate change are the main reasons. Many countries are now working to protect bees and their habitats.`,
    questions: [
      { question: "How many bees can live in one colony?", options: ["Up to 10,000", "Up to 30,000", "Up to 60,000", "Up to 100,000"], answer: "C", explanation: "'One colony can have up to 60,000 bees.'" },
      { question: "How many eggs can a queen bee lay per day?", options: ["Up to 500", "Up to 1,000", "Up to 2,000", "Up to 5,000"], answer: "C", explanation: "'A queen bee can lay up to 2,000 eggs per day.'" },
      { question: "What shape are the honeycomb cells?", options: ["Square", "Triangular", "Hexagonal", "Circular"], answer: "C", explanation: "'The honeycomb has hexagonal cells.'" },
      { question: "What is the only job of drone bees?", options: ["Collecting nectar", "Building the hive", "Mating with the queen", "Protecting the colony"], answer: "C", explanation: "'Their only job is to mate with the queen.'" },
      { question: "How do bees communicate about food locations?", options: ["By buzzing loudly", "Through a waggle dance", "By leaving a scent trail", "By flying in circles"], answer: "B", explanation: "'Bees communicate through a special \"waggle dance.\"'" },
      { question: "What fraction of our food do bees help pollinate?", options: ["One-quarter", "One-third", "One-half", "Two-thirds"], answer: "B", explanation: "'They pollinate about one-third of the food we eat.'" },
      { question: "What happens to drone bees in winter?", options: ["They hibernate", "They fly to warmer areas", "Worker bees push them out", "They become worker bees"], answer: "C", explanation: "'Worker bees push the drones out of the hive.'" },
      { question: "Which is NOT a reason for decreasing bee populations?", options: ["Pesticides", "Habitat loss", "Too many flowers", "Climate change"], answer: "C", explanation: "The passage mentions pesticides, habitat loss, and climate change as the main reasons." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. B1 — Business: Shopping Online Safely
  // ═══════════════════════════════════════════════════════════
  {
    slug: "shopping-online-safely",
    title: "Shopping Online Safely",
    titleVi: "Mua sắm trực tuyến an toàn",
    level: "B1",
    category: "business",
    passage: `Shopping Online Safely

Online shopping has become one of the most popular ways to buy goods and services. In 2023, global e-commerce sales reached approximately 5.8 trillion US dollars. While online shopping offers convenience and a wide variety of products, it also comes with risks that consumers should be aware of.

One of the biggest concerns is security. When you shop online, you share personal information such as your name, address, and credit card number. Cybercriminals can steal this information through fake websites, phishing emails, or unsecured networks. To protect yourself, always look for the padlock icon and "https" in the website address. This means the website uses encryption to keep your data safe.

Another common problem is receiving products that look different from the online photos. Some sellers use edited pictures or misleading descriptions. To avoid disappointment, read customer reviews carefully before making a purchase. Reviews from verified buyers are usually more reliable. It is also helpful to check the seller's return policy in case you need to send the product back.

Price comparison is an important habit for smart online shoppers. The same product can have very different prices on different websites. Use price comparison tools or apps to find the best deal. Be careful with prices that seem too good to be true — they often indicate counterfeit products or scams.

Payment methods also matter. Credit cards generally offer better protection than debit cards because you can dispute charges if something goes wrong. Many experts recommend using digital wallets like PayPal, which add an extra layer of security by keeping your card details hidden from the seller.

Finally, be cautious about sharing too much personal information. Legitimate online stores will never ask for your social security number or bank PIN. If a website asks for unusual information, it is probably not trustworthy.

By following these simple guidelines, you can enjoy the benefits of online shopping while keeping your money and personal information safe.`,
    questions: [
      { question: "How much were global e-commerce sales in 2023?", options: ["3.8 trillion dollars", "4.8 trillion dollars", "5.8 trillion dollars", "6.8 trillion dollars"], answer: "C", explanation: "'Global e-commerce sales reached approximately 5.8 trillion US dollars.'" },
      { question: "What does the padlock icon on a website indicate?", options: ["The website is popular", "The website uses encryption", "The products are on sale", "The website is government-owned"], answer: "B", explanation: "'The padlock icon and \"https\"... means the website uses encryption.'" },
      { question: "What type of reviews are usually more reliable?", options: ["Anonymous reviews", "Reviews with photos only", "Reviews from verified buyers", "The most recent reviews"], answer: "C", explanation: "'Reviews from verified buyers are usually more reliable.'" },
      { question: "What might very low prices indicate?", options: ["A clearance sale", "Counterfeit products or scams", "A new product launch", "A loyalty reward"], answer: "B", explanation: "'Prices that seem too good to be true often indicate counterfeit products or scams.'" },
      { question: "Why are credit cards generally safer than debit cards?", options: ["They have lower interest rates", "You can dispute charges", "They have higher spending limits", "They are accepted everywhere"], answer: "B", explanation: "'Credit cards generally offer better protection... you can dispute charges.'" },
      { question: "What is an advantage of digital wallets like PayPal?", options: ["They offer free shipping", "They give cashback rewards", "They keep card details hidden from sellers", "They have no transaction fees"], answer: "C", explanation: "'Digital wallets... add an extra layer of security by keeping your card details hidden from the seller.'" },
      { question: "What should legitimate stores NEVER ask for?", options: ["Your email address", "Your shipping address", "Your social security number", "Your phone number"], answer: "C", explanation: "'Legitimate online stores will never ask for your social security number or bank PIN.'" },
      { question: "What is recommended before buying a product online?", options: ["Visiting a physical store first", "Reading customer reviews carefully", "Calling the seller directly", "Waiting for a holiday sale"], answer: "B", explanation: "'Read customer reviews carefully before making a purchase.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. B1 — Health: Traditional Herbal Medicine
  // ═══════════════════════════════════════════════════════════
  {
    slug: "traditional-herbal-medicine",
    title: "Traditional Herbal Medicine",
    titleVi: "Y học thảo dược truyền thống",
    level: "B1",
    category: "health",
    passage: `Traditional Herbal Medicine

For thousands of years, people around the world have used plants to treat illnesses and improve their health. Traditional herbal medicine remains popular today, with the World Health Organization estimating that about 80% of people in developing countries rely on herbal remedies for primary healthcare.

In China, traditional medicine has a history of over 2,500 years. Chinese herbal medicine uses thousands of plant species, along with minerals and animal products, to create treatments. One of the most well-known herbs is ginseng, which is believed to boost energy, strengthen the immune system, and improve mental focus. Traditional Chinese medicine also includes practices like acupuncture and tai chi.

In India, the traditional system of medicine is called Ayurveda, which means "science of life." Ayurvedic medicine uses herbs such as turmeric, ashwagandha, and holy basil. Turmeric contains a compound called curcumin, which has anti-inflammatory properties. Modern research has confirmed that curcumin can help reduce joint pain and inflammation.

In Vietnam, traditional medicine combines influences from Chinese medicine with local knowledge. Common Vietnamese remedies include ginger tea for colds, lemongrass oil for headaches, and wormwood for digestive problems. Many Vietnamese families keep a small herb garden at home for everyday health needs.

While herbal medicine has many benefits, there are also risks. Some herbs can interact dangerously with modern medications. For example, St. John's Wort, a popular herb for mild depression, can reduce the effectiveness of birth control pills and blood thinners. Other herbs may be contaminated with heavy metals or pesticides if they are not grown or processed properly.

Scientists today are studying traditional remedies using modern methods. Many important modern medicines originally came from plants. Aspirin was developed from willow bark, and the malaria drug artemisinin comes from sweet wormwood, a plant used in Chinese medicine for centuries.

The key is to use herbal medicine wisely. Always consult a healthcare professional before combining herbs with modern medicine, and buy herbal products from trusted sources.`,
    questions: [
      { question: "What percentage of people in developing countries use herbal remedies?", options: ["About 50%", "About 60%", "About 70%", "About 80%"], answer: "D", explanation: "'About 80% of people in developing countries rely on herbal remedies.'" },
      { question: "How old is the history of Chinese herbal medicine?", options: ["Over 1,000 years", "Over 1,500 years", "Over 2,500 years", "Over 5,000 years"], answer: "C", explanation: "'Traditional medicine has a history of over 2,500 years.'" },
      { question: "What does 'Ayurveda' mean?", options: ["Art of healing", "Science of life", "Path to health", "Natural balance"], answer: "B", explanation: "'Ayurveda, which means \"science of life.\"'" },
      { question: "What compound in turmeric has anti-inflammatory properties?", options: ["Capsaicin", "Curcumin", "Caffeine", "Carotene"], answer: "B", explanation: "'Turmeric contains a compound called curcumin, which has anti-inflammatory properties.'" },
      { question: "What Vietnamese remedy is used for colds?", options: ["Lemongrass oil", "Wormwood tea", "Ginger tea", "Basil leaves"], answer: "C", explanation: "'Common Vietnamese remedies include ginger tea for colds.'" },
      { question: "What problem can St. John's Wort cause?", options: ["Allergic reactions", "Reduced effectiveness of some medications", "High blood pressure", "Stomach ulcers"], answer: "B", explanation: "'St. John's Wort... can reduce the effectiveness of birth control pills and blood thinners.'" },
      { question: "What modern medicine was developed from willow bark?", options: ["Penicillin", "Aspirin", "Insulin", "Ibuprofen"], answer: "B", explanation: "'Aspirin was developed from willow bark.'" },
      { question: "Where does the malaria drug artemisinin come from?", options: ["Ginseng", "Turmeric", "Sweet wormwood", "Holy basil"], answer: "C", explanation: "'The malaria drug artemisinin comes from sweet wormwood.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 7. B1 — Science: How Volcanoes Work
  // ═══════════════════════════════════════════════════════════
  {
    slug: "how-volcanoes-work",
    title: "How Volcanoes Work",
    titleVi: "Núi lửa hoạt động như thế nào",
    level: "B1",
    category: "science",
    passage: `How Volcanoes Work

A volcano is an opening in the Earth's surface where hot molten rock, ash, and gases escape from deep underground. There are approximately 1,500 active volcanoes on Earth, and about 50 to 70 of them erupt each year.

Deep beneath the Earth's surface, temperatures are extremely high — reaching up to 6,000 degrees Celsius at the core. This heat melts rock and creates a thick, flowing substance called magma. Magma is lighter than the solid rock surrounding it, so it slowly rises toward the surface. When magma reaches the surface through a volcanic eruption, it is called lava.

There are three main types of volcanoes. Shield volcanoes have gentle, sloping sides and produce slow-moving lava flows. Mauna Loa in Hawaii is the world's largest shield volcano. Stratovolcanoes, also called composite volcanoes, are tall and cone-shaped. They can produce violent eruptions with thick lava, ash clouds, and pyroclastic flows. Mount Fuji in Japan and Mount Vesuvius in Italy are famous stratovolcanoes. Cinder cone volcanoes are the smallest type. They are built from small pieces of lava that cool and fall as cinders.

Volcanic eruptions can be extremely destructive. In 79 AD, Mount Vesuvius erupted and buried the Roman cities of Pompeii and Herculaneum under meters of ash. More recently, the 1991 eruption of Mount Pinatubo in the Philippines was one of the largest eruptions of the 20th century. It ejected so much ash into the atmosphere that global temperatures dropped by about 0.5 degrees Celsius for the following year.

However, volcanoes also bring benefits. Volcanic soil is very fertile, which is why many farming communities develop near volcanoes. Geothermal energy from volcanic regions provides clean electricity in countries like Iceland, where about 25% of electricity comes from geothermal sources. Volcanoes also create new land — the Hawaiian Islands were entirely formed by volcanic activity over millions of years.

Scientists monitor active volcanoes using seismographs to detect earthquakes, GPS to measure ground movements, and satellites to track gas emissions. These tools help predict eruptions and save lives.`,
    questions: [
      { question: "How many active volcanoes are there on Earth?", options: ["About 500", "About 1,000", "About 1,500", "About 2,000"], answer: "C", explanation: "'There are approximately 1,500 active volcanoes on Earth.'" },
      { question: "What is magma called when it reaches the Earth's surface?", options: ["Ash", "Lava", "Cinder", "Core"], answer: "B", explanation: "'When magma reaches the surface through a volcanic eruption, it is called lava.'" },
      { question: "Which type of volcano has gentle, sloping sides?", options: ["Stratovolcano", "Cinder cone", "Shield volcano", "Composite volcano"], answer: "C", explanation: "'Shield volcanoes have gentle, sloping sides.'" },
      { question: "What happened to Pompeii in 79 AD?", options: ["An earthquake destroyed it", "A flood covered it", "A volcano buried it in ash", "A fire burned it down"], answer: "C", explanation: "'Mount Vesuvius erupted and buried the Roman cities of Pompeii and Herculaneum under meters of ash.'" },
      { question: "How much did global temperatures drop after Mount Pinatubo's eruption?", options: ["About 0.2°C", "About 0.5°C", "About 1.0°C", "About 2.0°C"], answer: "B", explanation: "'Global temperatures dropped by about 0.5 degrees Celsius.'" },
      { question: "What percentage of Iceland's electricity comes from geothermal sources?", options: ["About 10%", "About 15%", "About 25%", "About 50%"], answer: "C", explanation: "'About 25% of electricity comes from geothermal sources.'" },
      { question: "How were the Hawaiian Islands formed?", options: ["By earthquakes", "By volcanic activity", "By ocean waves", "By glaciers"], answer: "B", explanation: "'The Hawaiian Islands were entirely formed by volcanic activity.'" },
      { question: "What tools do scientists use to monitor volcanoes?", options: ["Telescopes and radar", "Thermometers and barometers", "Seismographs, GPS, and satellites", "Microscopes and cameras"], answer: "C", explanation: "'Scientists monitor active volcanoes using seismographs... GPS... and satellites.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 8. B2 — Culture: Street Food Around the World
  // ═══════════════════════════════════════════════════════════
  {
    slug: "street-food-around-world",
    title: "Street Food Around the World",
    titleVi: "Ẩm thực đường phố trên thế giới",
    level: "B2",
    category: "culture",
    passage: `Street Food Around the World

Street food is more than just a quick meal — it is a window into a culture's history, geography, and social fabric. The United Nations Food and Agriculture Organization estimates that approximately 2.5 billion people eat street food every day, making it one of the most significant yet underappreciated aspects of global food culture.

In Southeast Asia, street food is practically an institution. Bangkok, often regarded as the world's street food capital, is home to over 300,000 street vendors. The city's legendary pad thai — stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce — was originally promoted by the Thai government in the 1930s as a nation-building tool to reduce rice consumption and create a unifying national dish. In Vietnam, the sidewalk economy is equally vibrant, with dishes like bánh mì, a crispy baguette filled with pâté, pickled vegetables, and herbs, representing a delicious fusion of French colonial and Vietnamese culinary traditions.

Mexico's street food scene tells its own compelling story. Tacos al pastor, featuring marinated pork cooked on a vertical spit, is actually a culinary adaptation brought by Lebanese immigrants in the early 20th century, who modified their traditional shawarma technique using local chili peppers and pineapple. This cross-cultural exchange has produced what many consider Mexico's most iconic street food.

In India, the concept of "chaat" — savory snacks sold at roadside stalls — encompasses an astonishing variety of flavors and textures. Mumbai's vada pav, a spiced potato fritter in a bread roll, was invented in the 1960s as an affordable meal for textile mill workers. Today, it is considered Mumbai's signature dish, with an estimated 20,000 vendors selling it across the city.

Turkey's street food heritage dates back to the Ottoman Empire. The döner kebab, invented in the 19th century, has since become one of the most globally successful street foods. Its German adaptation, the Berliner döner, generates approximately 7 billion euros annually in Germany alone, employing over 200,000 people.

Despite its cultural significance, street food faces challenges. Urbanization and modernization efforts in many cities have led to crackdowns on street vendors. Bangkok's controversial 2017 ban on street vending in certain areas sparked international outcry. Food safety concerns also persist, though research suggests that contamination rates for street food are comparable to those in formal restaurants.

The UNESCO recognition of several street food traditions as Intangible Cultural Heritage highlights the growing acknowledgment that these humble culinary traditions deserve preservation and respect.`,
    questions: [
      { question: "How many people eat street food daily worldwide?", options: ["About 1 billion", "About 1.5 billion", "About 2.5 billion", "About 3.5 billion"], answer: "C", explanation: "'Approximately 2.5 billion people eat street food every day.'" },
      { question: "Why was pad thai originally promoted by the Thai government?", options: ["To attract tourists", "To reduce rice consumption and unify the nation", "To compete with Chinese food", "To increase exports"], answer: "B", explanation: "'Promoted by the Thai government in the 1930s as a nation-building tool to reduce rice consumption and create a unifying national dish.'" },
      { question: "What cultural influences does bánh mì represent?", options: ["Chinese and Vietnamese", "French colonial and Vietnamese", "Japanese and Vietnamese", "American and Vietnamese"], answer: "B", explanation: "'Representing a delicious fusion of French colonial and Vietnamese culinary traditions.'" },
      { question: "Who introduced the cooking technique that led to tacos al pastor?", options: ["Spanish colonizers", "Chinese immigrants", "Lebanese immigrants", "Italian immigrants"], answer: "C", explanation: "'A culinary adaptation brought by Lebanese immigrants.'" },
      { question: "Who was vada pav originally created for?", options: ["School children", "Textile mill workers", "Government employees", "Train passengers"], answer: "B", explanation: "'Invented in the 1960s as an affordable meal for textile mill workers.'" },
      { question: "How much revenue does the Berliner döner generate annually?", options: ["About 3 billion euros", "About 5 billion euros", "About 7 billion euros", "About 10 billion euros"], answer: "C", explanation: "'Generates approximately 7 billion euros annually in Germany alone.'" },
      { question: "What happened in Bangkok in 2017 regarding street food?", options: ["A food festival was organized", "Street vending was banned in certain areas", "Street food was declared a cultural heritage", "New food safety rules were introduced"], answer: "B", explanation: "'Bangkok's controversial 2017 ban on street vending in certain areas.'" },
      { question: "What does research suggest about street food safety?", options: ["It is much safer than restaurants", "Contamination rates are comparable to restaurants", "It is significantly more dangerous", "No research has been done"], answer: "B", explanation: "'Contamination rates for street food are comparable to those in formal restaurants.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 9. B2 — Environment: The Arctic Ice Crisis
  // ═══════════════════════════════════════════════════════════
  {
    slug: "arctic-ice-crisis",
    title: "The Arctic Ice Crisis",
    titleVi: "Khủng hoảng băng Bắc Cực",
    level: "B2",
    category: "environment",
    passage: `The Arctic Ice Crisis

The Arctic region is warming nearly four times faster than the global average, a phenomenon scientists call "Arctic amplification." Since satellite monitoring began in 1979, the Arctic has lost approximately 13% of its sea ice per decade, and the rate of loss is accelerating. Many climate models now predict that the Arctic could experience ice-free summers as early as the 2030s.

The primary driver of Arctic ice loss is the increase in global greenhouse gas emissions. As atmospheric CO2 concentrations have risen from pre-industrial levels of 280 parts per million to over 420 ppm today, the resulting warming has had a disproportionate effect on polar regions. The ice-albedo feedback loop amplifies this warming: as white, reflective ice melts, it exposes darker ocean water, which absorbs more solar energy, leading to further warming and more ice loss.

The consequences of Arctic ice loss extend far beyond the polar region. The Greenland ice sheet, which contains enough frozen water to raise global sea levels by approximately 7.4 meters, is losing mass at an accelerating rate. Between 2002 and 2021, Greenland lost an average of 270 billion tonnes of ice per year. If this trend continues, coastal cities around the world — from Miami to Mumbai, from Shanghai to Lagos — will face increasingly severe flooding.

Arctic ice loss also disrupts global weather patterns. The jet stream, a band of strong winds high in the atmosphere that separates cold Arctic air from warmer air to the south, is weakened by reduced temperature differences between the Arctic and mid-latitudes. This weakening allows the jet stream to develop deeper waves, bringing prolonged cold snaps to normally temperate regions and extended heat waves elsewhere. Scientists believe this mechanism contributed to the devastating Texas freeze of 2021 and the European heat waves of 2022 and 2023.

The melting of permafrost — permanently frozen ground that covers about 25% of the Northern Hemisphere's land surface — presents another grave concern. Permafrost contains an estimated 1.5 trillion tonnes of organic carbon, roughly twice the amount currently in the atmosphere. As permafrost thaws, microorganisms decompose this organic material, releasing carbon dioxide and methane. Methane is particularly worrying because it is approximately 80 times more potent as a greenhouse gas than CO2 over a 20-year period.

Indigenous communities in the Arctic are already experiencing the direct impacts of these changes. Traditional hunting and fishing practices are becoming unreliable as animal migration patterns shift and sea ice that was once stable enough to travel on becomes dangerously thin. Several communities in Alaska and Siberia are being forced to relocate as coastal erosion accelerates.

International cooperation is essential but has proven difficult. The Arctic Council, composed of eight nations with Arctic territory, has made progress on scientific research and environmental monitoring, but political tensions — particularly between Russia and Western nations — have complicated collaborative efforts to address the crisis.`,
    questions: [
      { question: "How much faster is the Arctic warming compared to the global average?", options: ["About twice as fast", "About three times as fast", "About four times as fast", "About five times as fast"], answer: "C", explanation: "'The Arctic region is warming nearly four times faster than the global average.'" },
      { question: "When could ice-free Arctic summers begin according to climate models?", options: ["The 2020s", "The 2030s", "The 2050s", "The 2070s"], answer: "B", explanation: "'The Arctic could experience ice-free summers as early as the 2030s.'" },
      { question: "How much could sea levels rise if the entire Greenland ice sheet melted?", options: ["About 3.4 meters", "About 5.4 meters", "About 7.4 meters", "About 9.4 meters"], answer: "C", explanation: "'Contains enough frozen water to raise global sea levels by approximately 7.4 meters.'" },
      { question: "What is the ice-albedo feedback loop?", options: ["Ice reflects heat back to space, cooling the Earth", "Melting ice exposes dark water that absorbs more heat, causing more melting", "Ice blocks sunlight from reaching the ocean floor", "Cold water creates more ice in winter"], answer: "B", explanation: "'As white, reflective ice melts, it exposes darker ocean water, which absorbs more solar energy, leading to further warming and more ice loss.'" },
      { question: "How much organic carbon does permafrost contain?", options: ["About 500 billion tonnes", "About 1 trillion tonnes", "About 1.5 trillion tonnes", "About 2 trillion tonnes"], answer: "C", explanation: "'Permafrost contains an estimated 1.5 trillion tonnes of organic carbon.'" },
      { question: "How much more potent is methane than CO2 over 20 years?", options: ["About 25 times", "About 50 times", "About 80 times", "About 100 times"], answer: "C", explanation: "'Methane is approximately 80 times more potent as a greenhouse gas than CO2 over a 20-year period.'" },
      { question: "What weather event do scientists link to Arctic ice loss?", options: ["Hurricane Katrina", "The Texas freeze of 2021", "The 2004 Indian Ocean tsunami", "The 2020 Australian bushfires"], answer: "B", explanation: "'Scientists believe this mechanism contributed to the devastating Texas freeze of 2021.'" },
      { question: "How many nations make up the Arctic Council?", options: ["Five", "Six", "Eight", "Ten"], answer: "C", explanation: "'The Arctic Council, composed of eight nations with Arctic territory.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 10. B2 — Technology: The Rise of Electric Vehicles
  // ═══════════════════════════════════════════════════════════
  {
    slug: "rise-of-electric-vehicles",
    title: "The Rise of Electric Vehicles",
    titleVi: "Sự trỗi dậy của xe điện",
    level: "B2",
    category: "technology",
    passage: `The Rise of Electric Vehicles

The global automotive industry is undergoing its most significant transformation since Henry Ford introduced the assembly line over a century ago. Electric vehicles (EVs), once dismissed as impractical novelties, have rapidly moved into the mainstream. In 2023, global EV sales exceeded 14 million units, representing approximately 18% of all new car sales — up from just 4% in 2020.

The technology behind EVs has improved dramatically. Modern lithium-ion battery packs can store enough energy to provide ranges exceeding 500 kilometers on a single charge, compared to less than 150 kilometers a decade ago. Battery costs have fallen by over 90% since 2010, from approximately $1,100 per kilowatt-hour to under $140 in 2023. This price reduction has been the single most important factor in making EVs competitive with conventional vehicles.

China has emerged as the undisputed leader in the EV market, accounting for roughly 60% of global sales. Chinese manufacturers like BYD have achieved remarkable economies of scale, producing EVs that are significantly cheaper than their Western counterparts. In 2023, BYD surpassed Tesla as the world's largest EV seller by volume. The company's success is built on vertical integration — it manufactures everything from batteries to semiconductors in-house.

Charging infrastructure remains the most significant barrier to widespread adoption. While home charging is convenient for homeowners, apartment dwellers and those in rural areas often lack access to reliable charging. Fast-charging networks are expanding rapidly, with companies like Tesla, ChargePoint, and Electrify America building stations along major highways. The latest generation of fast chargers can add 300 kilometers of range in approximately 15 minutes.

The environmental benefits of EVs depend significantly on how the electricity used to charge them is generated. In countries with clean grids — such as Norway, where 98% of electricity comes from hydropower — EVs produce virtually zero operational emissions. However, in coal-dependent regions, the emissions advantage of EVs is considerably reduced. A comprehensive lifecycle analysis must also account for the environmental costs of mining lithium, cobalt, and nickel for batteries, as well as the challenge of recycling batteries at the end of their useful life.

Governments worldwide are accelerating the transition through policy measures. The European Union has set a deadline of 2035 to ban the sale of new internal combustion engine cars. Norway aims to achieve this target by 2025, and several other countries have announced similar goals. Tax incentives, subsidies, and investments in charging infrastructure are making EVs increasingly accessible to middle-income consumers.

The transition to electric mobility will also reshape employment in the automotive sector. EVs have significantly fewer moving parts than conventional vehicles — roughly 20 compared to over 2,000 — which means fewer workers are needed for assembly and maintenance.`,
    questions: [
      { question: "What percentage of new car sales were EVs in 2023?", options: ["About 10%", "About 14%", "About 18%", "About 25%"], answer: "C", explanation: "'Representing approximately 18% of all new car sales.'" },
      { question: "How much have battery costs fallen since 2010?", options: ["Over 70%", "Over 80%", "Over 90%", "Over 95%"], answer: "C", explanation: "'Battery costs have fallen by over 90% since 2010.'" },
      { question: "What share of global EV sales does China account for?", options: ["About 40%", "About 50%", "About 60%", "About 70%"], answer: "C", explanation: "'China... accounting for roughly 60% of global sales.'" },
      { question: "Which company surpassed Tesla as the largest EV seller in 2023?", options: ["Volkswagen", "Toyota", "BYD", "Hyundai"], answer: "C", explanation: "'BYD surpassed Tesla as the world's largest EV seller by volume.'" },
      { question: "How quickly can the latest fast chargers add 300 km of range?", options: ["About 5 minutes", "About 15 minutes", "About 30 minutes", "About 45 minutes"], answer: "B", explanation: "'The latest generation of fast chargers can add 300 kilometers of range in approximately 15 minutes.'" },
      { question: "What percentage of Norway's electricity comes from hydropower?", options: ["78%", "88%", "93%", "98%"], answer: "D", explanation: "'Norway, where 98% of electricity comes from hydropower.'" },
      { question: "When has the EU set a deadline to ban new combustion engine cars?", options: ["2030", "2035", "2040", "2050"], answer: "B", explanation: "'The European Union has set a deadline of 2035.'" },
      { question: "How many moving parts does a typical EV have compared to a conventional car?", options: ["20 vs. 200", "20 vs. 500", "20 vs. 1,000", "20 vs. 2,000"], answer: "D", explanation: "'Roughly 20 compared to over 2,000.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 11. C1 — Science: The Psychology of Color
  // ═══════════════════════════════════════════════════════════
  {
    slug: "psychology-of-color",
    title: "The Psychology of Color",
    titleVi: "Tâm lý học về màu sắc",
    level: "C1",
    category: "science",
    passage: `The Psychology of Color

Color is not merely a visual phenomenon — it is a powerful psychological force that shapes human behavior, cognition, and emotion in ways that are both profound and often unconscious. The field of color psychology, while sometimes dismissed as pseudoscience, has produced a substantial body of empirical research demonstrating that color significantly influences everything from consumer purchasing decisions to athletic performance and even the perceived efficacy of pharmaceutical drugs.

The physiological basis for color's psychological effects is rooted in the way different wavelengths of light interact with the human visual system and brain. When light enters the eye, it is processed not only by the visual cortex but also by the hypothalamus, which regulates hormones and the autonomic nervous system. This direct neural pathway means that color can trigger physiological responses — such as changes in heart rate, blood pressure, and cortisol levels — before conscious awareness even occurs.

Red, the color with the longest visible wavelength, has been extensively studied for its arousing properties. Research published in the Journal of Experimental Psychology found that participants exposed to red backgrounds performed significantly worse on analytical tasks but excelled at detail-oriented tasks. In competitive contexts, a 2005 study of Olympic combat sports revealed that athletes wearing red uniforms won approximately 60% of bouts, a statistically significant advantage that researchers attributed to red's association with dominance and aggression in both humans and other primates.

Blue, occupying the shorter wavelength end of the visible spectrum, produces markedly different psychological effects. Studies have consistently shown that blue environments reduce heart rate and blood pressure, promote creative thinking, and increase perceptions of trustworthiness. This is why an estimated 33% of the world's top 100 brands use blue as their primary color, including Facebook, Samsung, Ford, and American Express. Hospital operating rooms are painted in shades of blue-green not only for practical reasons — the color provides visual contrast with red blood — but also because it has been shown to reduce surgeon stress.

The cultural dimensions of color perception add another layer of complexity. While Western cultures associate white with purity and weddings, many East Asian cultures traditionally associate it with mourning and death. Similarly, yellow represents happiness and optimism in many Western contexts, but in some Latin American countries, it is associated with death and mourning. These cultural variations suggest that while certain physiological responses to color may be universal, the emotional and symbolic meanings assigned to colors are largely learned.

The commercial application of color psychology is a multi-billion-dollar industry. Research indicates that up to 90% of snap judgments about products are based on color alone. The "isolation effect" — where an item that stands out from its surroundings is more easily remembered — is a cornerstone of visual marketing. Fast-food chains overwhelmingly use red and yellow in their branding, as these warm colors have been shown to stimulate appetite and create a sense of urgency. Luxury brands, conversely, tend toward black, gold, and deep jewel tones to convey exclusivity and sophistication.

In therapeutic settings, chromotherapy — the use of color as a healing modality — has ancient origins. Modern applications include the use of blue light therapy for seasonal affective disorder, exposure to green environments for stress reduction (the "biophilia" effect), and pink holding cells in prisons, based on research suggesting that a specific shade known as Baker-Miller Pink temporarily reduces aggression and muscular strength.

The emerging field of digital color psychology examines how screen-based colors affect behavior differently than physical colors, given the additive (RGB) versus subtractive (CMYK) nature of light. Preliminary research suggests that the blue light emitted by screens not only disrupts circadian rhythms through melatonin suppression but may also affect decision-making processes in ways that differ from exposure to the same wavelengths in natural light.`,
    questions: [
      { question: "How does color trigger physiological responses before conscious awareness?", options: ["Through the spinal cord reflex arc", "Through the hypothalamus, which regulates hormones", "Through the cerebellum", "Through peripheral nerve endings"], answer: "B", explanation: "'Processed not only by the visual cortex but also by the hypothalamus, which regulates hormones and the autonomic nervous system.'" },
      { question: "What advantage did athletes wearing red have in Olympic combat sports?", options: ["They won about 55% of bouts", "They won about 60% of bouts", "They won about 65% of bouts", "They won about 70% of bouts"], answer: "B", explanation: "'Athletes wearing red uniforms won approximately 60% of bouts.'" },
      { question: "What percentage of the world's top 100 brands use blue as primary color?", options: ["About 25%", "About 33%", "About 40%", "About 50%"], answer: "B", explanation: "'An estimated 33% of the world's top 100 brands use blue as their primary color.'" },
      { question: "Why are operating rooms painted in blue-green?", options: ["It is the cheapest paint color", "It contrasts with red blood and reduces surgeon stress", "Patients prefer this color", "It makes the room look larger"], answer: "B", explanation: "'The color provides visual contrast with red blood... and has been shown to reduce surgeon stress.'" },
      { question: "What does white symbolize in many East Asian cultures?", options: ["Purity and innocence", "Wealth and prosperity", "Mourning and death", "Peace and harmony"], answer: "C", explanation: "'Many East Asian cultures traditionally associate it with mourning and death.'" },
      { question: "What percentage of snap product judgments are based on color alone?", options: ["Up to 60%", "Up to 70%", "Up to 80%", "Up to 90%"], answer: "D", explanation: "'Up to 90% of snap judgments about products are based on color alone.'" },
      { question: "What is Baker-Miller Pink used for?", options: ["Marketing luxury products", "Stimulating appetite", "Temporarily reducing aggression", "Treating color blindness"], answer: "C", explanation: "'Baker-Miller Pink temporarily reduces aggression and muscular strength.'" },
      { question: "How do red backgrounds affect performance on analytical tasks?", options: ["They significantly improve performance", "They have no effect", "They significantly worsen performance", "They improve speed but reduce accuracy"], answer: "C", explanation: "'Participants exposed to red backgrounds performed significantly worse on analytical tasks.'" },
      { question: "Why do fast-food chains predominantly use red and yellow?", options: ["These colors are cheapest to print", "They stimulate appetite and create urgency", "They are visible from far away", "Government regulations require it"], answer: "B", explanation: "'Red and yellow... stimulate appetite and create a sense of urgency.'" },
      { question: "What emerging concern exists about screen-based blue light?", options: ["It causes permanent eye damage", "It may affect decision-making differently than natural light", "It reduces color perception over time", "It increases attention span"], answer: "B", explanation: "'May also affect decision-making processes in ways that differ from exposure to the same wavelengths in natural light.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 12. C1 — Business: The Global Supply Chain Crisis
  // ═══════════════════════════════════════════════════════════
  {
    slug: "global-supply-chain-crisis",
    title: "The Global Supply Chain Crisis",
    titleVi: "Khủng hoảng chuỗi cung ứng toàn cầu",
    level: "C1",
    category: "business",
    passage: `The Global Supply Chain Crisis

The concept of a seamlessly interconnected global supply chain — in which raw materials, components, and finished goods flow effortlessly across borders — was one of the defining achievements of late-20th-century capitalism. Yet the events of the early 2020s exposed the extraordinary fragility concealed beneath this apparent efficiency, triggering a systemic crisis that fundamentally challenged longstanding assumptions about globalized production.

The COVID-19 pandemic served as the initial catalyst, but the vulnerabilities it exposed had been accumulating for decades. The relentless pursuit of just-in-time manufacturing — a philosophy pioneered by Toyota in the 1970s that minimizes inventory by coordinating deliveries to arrive precisely when needed — had stripped virtually all redundancy from global supply networks. When lockdowns simultaneously disrupted production facilities and transportation networks across multiple continents, the consequences cascaded through interconnected industries with devastating speed.

The semiconductor shortage exemplified the problem with particular clarity. Modern automobiles contain between 1,000 and 3,000 semiconductor chips, and a single missing component can halt an entire production line. When automotive manufacturers cancelled chip orders at the onset of the pandemic, semiconductor foundries — predominantly concentrated in Taiwan, which produces approximately 65% of the world's chips and 90% of the most advanced ones — redirected capacity to consumer electronics manufacturers experiencing surging demand. When auto demand recovered faster than anticipated, manufacturers found themselves at the back of a queue that would take years to clear. The global automotive industry lost an estimated $210 billion in revenue in 2021 alone due to chip shortages.

The Suez Canal blockage in March 2021, when the container ship Ever Given ran aground and obstructed one of the world's most critical shipping routes for six days, provided a dramatic illustration of the system's single points of failure. Approximately 12% of global trade passes through the 193-kilometer canal, and the blockage delayed an estimated $9.6 billion worth of goods per day. The incident forced companies to confront an uncomfortable reality: the efficiency gains of routing enormous volumes of trade through narrow maritime chokepoints created catastrophic vulnerability.

The crisis accelerated several strategic shifts that are reshaping the global economy. "Nearshoring" — relocating production closer to end markets — has gained significant momentum. Mexico has emerged as a primary beneficiary, with foreign direct investment increasing substantially as companies seek alternatives to distant Asian manufacturing. "Friend-shoring," a term popularized by U.S. Treasury Secretary Janet Yellen, describes the practice of restricting supply chains to geopolitically aligned nations, reflecting the growing intertwining of economic and security considerations.

The drive toward supply chain resilience has also reinvigorated the case for domestic semiconductor manufacturing. The U.S. CHIPS Act, signed in 2022, allocated $52.7 billion to incentivize domestic chip production. The European Union followed with its own European Chips Act, targeting €43 billion in public and private investment. Taiwan Semiconductor Manufacturing Company (TSMC) began constructing new fabrication plants in Arizona and Japan, while Samsung invested in a new facility in Texas.

However, the transition from hyper-efficient, concentrated supply chains to more resilient, distributed ones involves significant trade-offs. Diversifying suppliers and maintaining safety stock increases costs, which are ultimately passed to consumers. McKinsey estimates that building true supply chain resilience could reduce corporate profits by 2-5% across affected industries. The central question facing business leaders is no longer whether to prioritize resilience over pure efficiency, but how to find the optimal balance between the two.`,
    questions: [
      { question: "What manufacturing philosophy was pioneered by Toyota in the 1970s?", options: ["Lean manufacturing", "Just-in-time manufacturing", "Six Sigma", "Total quality management"], answer: "B", explanation: "'Just-in-time manufacturing — a philosophy pioneered by Toyota in the 1970s.'" },
      { question: "What percentage of the world's most advanced chips does Taiwan produce?", options: ["About 65%", "About 75%", "About 85%", "About 90%"], answer: "D", explanation: "'Taiwan, which produces approximately 65% of the world's chips and 90% of the most advanced ones.'" },
      { question: "How much revenue did the auto industry lose due to chip shortages in 2021?", options: ["$110 billion", "$ 160 billion", "$210 billion", "$310 billion"], answer: "C", explanation: "'The global automotive industry lost an estimated $210 billion in revenue in 2021.'" },
      { question: "How long was the Suez Canal blocked by the Ever Given?", options: ["Three days", "Six days", "Ten days", "Two weeks"], answer: "B", explanation: "'Obstructed one of the world's most critical shipping routes for six days.'" },
      { question: "How much goods value was delayed per day during the Suez Canal blockage?", options: ["$5.6 billion", "$ 7.6 billion", "$9.6 billion", "$12.6 billion"], answer: "C", explanation: "'Delayed an estimated $9.6 billion worth of goods per day.'" },
      { question: "What does 'friend-shoring' mean?", options: ["Moving production to friendly climate zones", "Restricting supply chains to geopolitically aligned nations", "Sharing manufacturing equipment between allies", "Building factories near the coast"], answer: "B", explanation: "'Restricting supply chains to geopolitically aligned nations.'" },
      { question: "How much did the U.S. CHIPS Act allocate?", options: ["$32.7 billion", "$42.7 billion", "$52.7 billion", "$62.7 billion"], answer: "C", explanation: "'The U.S. CHIPS Act... allocated $52.7 billion.'" },
      { question: "How many semiconductor chips does a modern automobile contain?", options: ["100 to 500", "500 to 1,000", "1,000 to 3,000", "3,000 to 5,000"], answer: "C", explanation: "'Modern automobiles contain between 1,000 and 3,000 semiconductor chips.'" },
      { question: "How much could building supply chain resilience reduce corporate profits?", options: ["1-2%", "2-5%", "5-10%", "10-15%"], answer: "B", explanation: "'Building true supply chain resilience could reduce corporate profits by 2-5%.'" },
      { question: "Which country has emerged as a primary nearshoring beneficiary?", options: ["Brazil", "India", "Mexico", "Vietnam"], answer: "C", explanation: "'Mexico has emerged as a primary beneficiary.'" },
    ],
  },

];

async function main() {
  const startOrder = 79;

  for (let i = 0; i < passages.length; i++) {
    const p = passages[i];
    const wordCount = p.passage.split(/\s+/).filter(Boolean).length;

    const passage = await prisma.readingPassage.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount,
        order: startOrder + i,
      },
      create: {
        slug: p.slug,
        title: p.title,
        titleVi: p.titleVi,
        level: p.level,
        category: p.category,
        passage: p.passage,
        wordCount,
        order: startOrder + i,
      },
    });

    await prisma.readingQuestion.deleteMany({ where: { passageId: passage.id } });

    for (let q = 0; q < p.questions.length; q++) {
      const qd = p.questions[q];
      await prisma.readingQuestion.create({
        data: {
          passageId: passage.id,
          question: qd.question,
          kind: "mcq",
          options: qd.options,
          answer: qd.answer,
          explanation: qd.explanation,
          order: q,
        },
      });
    }

    console.log(`✅ ${p.slug} — ${wordCount}w, ${p.questions.length}q`);
  }

  console.log(`\nDone! Seeded ${passages.length} passages.`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
