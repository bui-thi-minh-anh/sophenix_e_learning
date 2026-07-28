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
  // 1. A1 — Daily Life: My Favorite Food
  // ═══════════════════════════════════════════════════════════
  {
    slug: "my-favorite-food",
    title: "My Favorite Food",
    titleVi: "Món ăn yêu thích của tôi",
    level: "A1",
    category: "daily-life",
    passage: `My Favorite Food

My name is Linh. I am twelve years old. I live in Hanoi with my family. I love eating, and my favorite food is phở.

Phở is a Vietnamese soup. It has rice noodles, meat, and vegetables in a hot broth. My mother makes phở every Sunday morning. She wakes up very early to cook the broth. It takes a long time, but it is very delicious.

I like phở with beef. My brother likes phở with chicken. My mother puts fresh herbs on the table: basil, bean sprouts, and lime. I always add a lot of herbs to my bowl. I also like to add chili sauce because I like spicy food.

On school days, I eat phở at a small shop near my school. The shop opens at 6:00 AM. Many students eat there before class. A bowl of phở costs 35,000 dong. It is not expensive.

Sometimes, my family goes to a restaurant on Saturday evening. We eat different food like fried rice, spring rolls, and grilled fish. But phở is still my number one. I want to learn how to cook phở like my mother when I am older.`,
    questions: [
      { question: "What is Linh's favorite food?", options: ["Fried rice", "Phở", "Spring rolls", "Grilled fish"], answer: "B", explanation: "'My favorite food is phở.'" },
      { question: "Where does Linh live?", options: ["Ho Chi Minh City", "Da Nang", "Hanoi", "Hue"], answer: "C", explanation: "'I live in Hanoi with my family.'" },
      { question: "When does Linh's mother make phở at home?", options: ["Every day", "Every Saturday", "Every Sunday", "Every Monday"], answer: "C", explanation: "'My mother makes phở every Sunday morning.'" },
      { question: "What kind of phở does Linh's brother prefer?", options: ["Beef", "Pork", "Chicken", "Shrimp"], answer: "C", explanation: "'My brother likes phở with chicken.'" },
      { question: "How much does a bowl of phở cost at the shop?", options: ["25,000 dong", "30,000 dong", "35,000 dong", "40,000 dong"], answer: "C", explanation: "'A bowl of phở costs 35,000 dong.'" },
      { question: "What time does the phở shop near the school open?", options: ["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM"], answer: "B", explanation: "'The shop opens at 6:00 AM.'" },
      { question: "Why does Linh add chili sauce?", options: ["It is free", "She likes spicy food", "Her mother tells her to", "It makes the soup hot"], answer: "B", explanation: "'I also like to add chili sauce because I like spicy food.'" },
      { question: "What does Linh want to learn in the future?", options: ["How to cook phở", "How to open a restaurant", "How to grow herbs", "How to make spring rolls"], answer: "A", explanation: "'I want to learn how to cook phở like my mother.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. A1 — Culture: Mid-Autumn Festival
  // ═══════════════════════════════════════════════════════════
  {
    slug: "mid-autumn-festival",
    title: "The Mid-Autumn Festival",
    titleVi: "Tết Trung Thu",
    level: "A1",
    category: "culture",
    passage: `The Mid-Autumn Festival

The Mid-Autumn Festival is a special holiday in Vietnam. It happens on the 15th day of the 8th month in the lunar calendar. This is usually in September or October.

This holiday is very important for children. On this day, children carry colorful lanterns. The lanterns have many shapes: stars, fish, rabbits, and butterflies. Some lanterns are made of paper. Some are made of plastic. At night, children walk in the streets with their lanterns. It is very beautiful.

Mooncakes are a traditional food for this festival. Mooncakes are round and can have different fillings inside. Some have mung bean paste. Some have lotus seed paste. Some have egg yolk in the middle. My grandmother makes mooncakes at home every year. They are very sweet and tasty.

There is also a lion dance during the festival. People wear lion costumes and dance to the sound of drums. Children love to watch the lion dance. It is very exciting and noisy.

Families get together on this night. They sit outside, look at the full moon, eat mooncakes, and drink tea. Parents tell stories about the moon. My favorite story is about Chú Cuội and the banyan tree on the moon.

I love the Mid-Autumn Festival because I can play with my friends at night and eat many delicious mooncakes.`,
    questions: [
      { question: "When does the Mid-Autumn Festival usually happen?", options: ["January or February", "March or April", "September or October", "November or December"], answer: "C", explanation: "'This is usually in September or October.'" },
      { question: "What do children carry during the festival?", options: ["Flowers", "Lanterns", "Flags", "Balloons"], answer: "B", explanation: "'Children carry colorful lanterns.'" },
      { question: "What shape is a mooncake?", options: ["Square", "Triangle", "Round", "Star"], answer: "C", explanation: "'Mooncakes are round.'" },
      { question: "Who makes mooncakes at home?", options: ["Linh's mother", "The narrator's grandmother", "A baker", "The narrator's father"], answer: "B", explanation: "'My grandmother makes mooncakes at home every year.'" },
      { question: "What happens during the lion dance?", options: ["People sing songs", "People wear lion costumes and dance", "Children fly kites", "People cook food"], answer: "B", explanation: "'People wear lion costumes and dance to the sound of drums.'" },
      { question: "What do families do at night during the festival?", options: ["Watch TV together", "Go to a movie", "Sit outside and look at the full moon", "Go to the market"], answer: "C", explanation: "'They sit outside, look at the full moon, eat mooncakes, and drink tea.'" },
      { question: "What is the narrator's favorite story about?", options: ["A princess", "Chú Cuội and the banyan tree", "A rabbit on the moon", "A star and a fish"], answer: "B", explanation: "'My favorite story is about Chú Cuội and the banyan tree on the moon.'" },
      { question: "Why does the narrator love this festival?", options: ["No school", "Playing with friends at night and eating mooncakes", "Getting money", "Watching fireworks"], answer: "B", explanation: "'I can play with my friends at night and eat many delicious mooncakes.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. A2 — Animals: Dolphins of the Ocean
  // ═══════════════════════════════════════════════════════════
  {
    slug: "dolphins-of-the-ocean",
    title: "Dolphins of the Ocean",
    titleVi: "Cá heo đại dương",
    level: "A2",
    category: "animals",
    passage: `Dolphins of the Ocean

Dolphins are one of the most intelligent animals in the world. They live in oceans and seas around the globe. There are about 40 different species of dolphins. The most common type is the bottlenose dolphin.

Dolphins are mammals, not fish. This means they breathe air, just like humans. They come to the surface of the water to breathe through a hole on top of their head called a blowhole. Baby dolphins are born alive, and mother dolphins feed their babies with milk.

Dolphins are very social animals. They live in groups called pods. A pod can have from 10 to hundreds of dolphins. They communicate with each other using clicks, whistles, and body movements. Each dolphin has its own special whistle, almost like a name.

These animals are excellent swimmers. They can swim at speeds of up to 35 kilometers per hour. Dolphins often jump out of the water, which is called breaching. Scientists believe they do this for fun, to communicate, or to remove parasites from their skin.

Dolphins eat fish and squid. They work together when hunting. A group of dolphins may circle a school of fish to trap them, and then they take turns swimming through to eat.

Unfortunately, dolphins face many dangers today. Pollution, fishing nets, and climate change are serious threats to their survival. Many organizations around the world are working to protect dolphins and their ocean habitats.`,
    questions: [
      { question: "How many species of dolphins exist?", options: ["About 20", "About 30", "About 40", "About 50"], answer: "C", explanation: "'There are about 40 different species of dolphins.'" },
      { question: "Why are dolphins classified as mammals?", options: ["They have scales", "They lay eggs", "They breathe air", "They live in water"], answer: "C", explanation: "'They breathe air, just like humans.'" },
      { question: "What is a blowhole?", options: ["A type of food", "A hole for breathing on top of their head", "A part of the ocean", "A dolphin's eye"], answer: "B", explanation: "'They come to the surface... to breathe through a hole on top of their head called a blowhole.'" },
      { question: "What is a group of dolphins called?", options: ["A flock", "A herd", "A pod", "A pack"], answer: "C", explanation: "'They live in groups called pods.'" },
      { question: "How fast can dolphins swim?", options: ["Up to 15 km/h", "Up to 25 km/h", "Up to 35 km/h", "Up to 45 km/h"], answer: "C", explanation: "'They can swim at speeds of up to 35 kilometers per hour.'" },
      { question: "What does 'breaching' mean?", options: ["Diving deep", "Jumping out of the water", "Swimming backward", "Making sounds"], answer: "B", explanation: "'Dolphins often jump out of the water, which is called breaching.'" },
      { question: "How do dolphins hunt together?", options: ["They chase fish alone", "They circle fish to trap them", "They wait for fish to come", "They use rocks"], answer: "B", explanation: "'A group of dolphins may circle a school of fish to trap them.'" },
      { question: "Which is NOT mentioned as a danger to dolphins?", options: ["Pollution", "Fishing nets", "Hunting by humans", "Climate change"], answer: "C", explanation: "The passage mentions pollution, fishing nets, and climate change, but not hunting by humans." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. A2 — Travel: A Day at the Beach
  // ═══════════════════════════════════════════════════════════
  {
    slug: "a-day-at-the-beach",
    title: "A Day at the Beach",
    titleVi: "Một ngày ở biển",
    level: "A2",
    category: "travel",
    passage: `A Day at the Beach

Last Saturday, my family drove to Vung Tau for a day trip. We left our house in Ho Chi Minh City at 5:30 in the morning. The drive took about two hours.

When we arrived at the beach, it was still early. The sand was clean and the water was calm. We found a good spot under some coconut trees. My father set up a large umbrella and my mother spread out a mat on the sand.

My sister and I changed into our swimsuits and ran to the water. The waves were small and gentle, so it was safe to swim. We played in the water for a long time. I tried to catch small fish with my hands, but they were too fast. My sister collected seashells along the shore. She found some very pretty ones with pink and white colors.

At noon, we had lunch at a seafood restaurant near the beach. We ordered grilled shrimp, steamed crab, and fried squid. The seafood was very fresh and delicious. My father also ordered coconut juice for everyone. We drank it straight from the coconut.

After lunch, we rested for a while. Then my father and I built a sandcastle. We used a bucket and small shovels. Our sandcastle was not very big, but we were proud of it. My mother took a photo of us with our sandcastle.

We left Vung Tau at about 4:00 PM. I was tired but very happy. I fell asleep in the car on the way home. It was one of the best days of my summer vacation.`,
    questions: [
      { question: "Where did the family go for their day trip?", options: ["Da Nang", "Nha Trang", "Vung Tau", "Phu Quoc"], answer: "C", explanation: "'My family drove to Vung Tau for a day trip.'" },
      { question: "How long did the drive from Ho Chi Minh City take?", options: ["One hour", "Two hours", "Three hours", "Four hours"], answer: "B", explanation: "'The drive took about two hours.'" },
      { question: "What did the sister collect at the beach?", options: ["Rocks", "Sand", "Seashells", "Fish"], answer: "C", explanation: "'My sister collected seashells along the shore.'" },
      { question: "What did the family eat for lunch?", options: ["Pizza and pasta", "Rice and chicken", "Grilled shrimp, steamed crab, and fried squid", "Hamburgers"], answer: "C", explanation: "'We ordered grilled shrimp, steamed crab, and fried squid.'" },
      { question: "What did the narrator and his father build?", options: ["A tent", "A sandcastle", "A boat", "A fire"], answer: "B", explanation: "'My father and I built a sandcastle.'" },
      { question: "What time did the family leave Vung Tau?", options: ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"], answer: "C", explanation: "'We left Vung Tau at about 4:00 PM.'" },
      { question: "What happened to the narrator in the car on the way home?", options: ["He played games", "He fell asleep", "He ate food", "He read a book"], answer: "B", explanation: "'I fell asleep in the car on the way home.'" },
      { question: "What drink did the father order for everyone?", options: ["Lemonade", "Iced tea", "Coconut juice", "Soda"], answer: "C", explanation: "'My father also ordered coconut juice for everyone.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. B1 — Health: Yoga and Mindfulness
  // ═══════════════════════════════════════════════════════════
  {
    slug: "yoga-and-mindfulness",
    title: "Yoga and Mindfulness",
    titleVi: "Yoga và chánh niệm",
    level: "B1",
    category: "health",
    passage: `Yoga and Mindfulness

In recent years, yoga and mindfulness have become extremely popular around the world. Once considered a niche activity, yoga is now practiced by an estimated 300 million people globally. But what exactly makes these practices so appealing, and what benefits do they offer?

Yoga originated in India more than 5,000 years ago. It combines physical postures, breathing exercises, and meditation. There are many different styles of yoga, from gentle forms like Hatha yoga to more physically demanding types like Ashtanga and Vinyasa. Regardless of the style, the goal is the same: to create harmony between the body and the mind.

The physical benefits of yoga are well documented. Regular practice improves flexibility, strengthens muscles, and enhances balance. Studies have shown that yoga can lower blood pressure, reduce chronic pain, and improve sleep quality. Many doctors now recommend yoga as a complementary therapy for patients with conditions such as back pain, arthritis, and heart disease.

Mindfulness, which is often practiced alongside yoga, involves paying full attention to the present moment without judgment. This might sound simple, but in today's fast-paced world, most people spend their time worrying about the future or thinking about the past. Mindfulness training teaches people to slow down and focus on what is happening right now.

Research has demonstrated that mindfulness can significantly reduce stress and anxiety. A study at Harvard University found that just eight weeks of mindfulness meditation actually changed the structure of the brain, increasing gray matter in areas associated with memory, empathy, and stress regulation.

For beginners, starting a yoga or mindfulness practice does not require expensive equipment or a gym membership. Many free resources are available online, including video tutorials and guided meditation apps. Even ten minutes a day can make a noticeable difference in how you feel physically and mentally.`,
    questions: [
      { question: "How many people practice yoga worldwide?", options: ["About 100 million", "About 200 million", "About 300 million", "About 500 million"], answer: "C", explanation: "'Yoga is now practiced by an estimated 300 million people globally.'" },
      { question: "Where did yoga originate?", options: ["China", "Japan", "India", "Thailand"], answer: "C", explanation: "'Yoga originated in India more than 5,000 years ago.'" },
      { question: "Which yoga style is described as 'gentle'?", options: ["Ashtanga", "Vinyasa", "Hatha", "Bikram"], answer: "C", explanation: "'Gentle forms like Hatha yoga.'" },
      { question: "What does mindfulness involve?", options: ["Planning for the future", "Paying full attention to the present moment", "Remembering past events", "Setting long-term goals"], answer: "B", explanation: "'Mindfulness involves paying full attention to the present moment without judgment.'" },
      { question: "What did the Harvard University study find about mindfulness meditation?", options: ["It improved eyesight", "It changed brain structure", "It increased muscle strength", "It lowered body weight"], answer: "B", explanation: "'Eight weeks of mindfulness meditation actually changed the structure of the brain.'" },
      { question: "Which of the following is NOT mentioned as a physical benefit of yoga?", options: ["Better flexibility", "Weight loss", "Improved balance", "Lower blood pressure"], answer: "B", explanation: "The passage mentions flexibility, balance, and blood pressure but not weight loss." },
      { question: "How long did the Harvard study's mindfulness program last?", options: ["Four weeks", "Six weeks", "Eight weeks", "Twelve weeks"], answer: "C", explanation: "'Just eight weeks of mindfulness meditation.'" },
      { question: "What is recommended for beginners who want to start practicing?", options: ["Hiring a personal trainer", "Buying expensive equipment", "Using free online resources", "Joining a yoga retreat"], answer: "C", explanation: "'Many free resources are available online, including video tutorials and guided meditation apps.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. B1 — Business: Starting a Small Business
  // ═══════════════════════════════════════════════════════════
  {
    slug: "starting-a-small-business",
    title: "Starting a Small Business",
    titleVi: "Khởi nghiệp kinh doanh nhỏ",
    level: "B1",
    category: "business",
    passage: `Starting a Small Business

Starting a small business is one of the most common dreams people have. Many want to be their own boss, set their own schedule, and build something meaningful. However, the reality is that starting a business requires careful planning, hard work, and a willingness to take risks.

The first step in starting a business is identifying a good idea. Successful businesses usually solve a problem or meet a need that is not being addressed. Before investing time and money, entrepreneurs should research their target market carefully. Who will buy the product or service? How much are they willing to pay? Is there enough demand?

Once the idea is validated, the next step is creating a business plan. A business plan is a document that outlines the company's goals, strategies, target audience, and financial projections. Banks and investors often require a business plan before they will provide funding. Even if external funding is not needed, a business plan helps the founder stay focused and organized.

Funding is often the biggest challenge for new businesses. Options include personal savings, loans from banks, support from family and friends, or investment from venture capitalists. In Vietnam, there are also government programs that provide low-interest loans and mentorship for young entrepreneurs.

Another important consideration is choosing the right business structure. In most countries, options include sole proprietorship, partnership, and limited liability company. Each structure has different tax implications and legal responsibilities.

Marketing is essential from day one. In the digital age, even a small business can reach thousands of potential customers through social media, a website, and online advertising. Building a strong brand identity — including a memorable name, logo, and message — helps a business stand out from competitors.

Statistics show that about 20% of small businesses fail within the first year, and nearly 50% fail within five years. The most common reasons are poor cash flow management, lack of market research, and failure to adapt to changing conditions. However, with persistence and good planning, a small business can grow into something extraordinary.`,
    questions: [
      { question: "What should entrepreneurs do before investing in a business idea?", options: ["Hire employees", "Research the target market", "Open a bank account", "Register the business name"], answer: "B", explanation: "'Entrepreneurs should research their target market carefully.'" },
      { question: "What is a business plan?", options: ["A marketing advertisement", "A legal contract", "A document outlining goals, strategies, and financial projections", "A tax form"], answer: "C", explanation: "'A business plan is a document that outlines the company's goals, strategies, target audience, and financial projections.'" },
      { question: "What does the passage say about government support in Vietnam?", options: ["There is no government support", "The government provides free office space", "There are programs with low-interest loans and mentorship", "The government pays salaries for new employees"], answer: "C", explanation: "'Government programs that provide low-interest loans and mentorship for young entrepreneurs.'" },
      { question: "What percentage of small businesses fail within the first year?", options: ["10%", "20%", "30%", "50%"], answer: "B", explanation: "'About 20% of small businesses fail within the first year.'" },
      { question: "Which is NOT mentioned as a funding option?", options: ["Personal savings", "Bank loans", "Crowdfunding", "Venture capitalists"], answer: "C", explanation: "Personal savings, bank loans, and venture capitalists are mentioned, but not crowdfunding." },
      { question: "What does a strong brand identity include?", options: ["A large office", "A memorable name, logo, and message", "Many employees", "A government license"], answer: "B", explanation: "'A memorable name, logo, and message — helps a business stand out.'" },
      { question: "What is described as the biggest challenge for new businesses?", options: ["Finding employees", "Funding", "Choosing a location", "Getting a license"], answer: "B", explanation: "'Funding is often the biggest challenge for new businesses.'" },
      { question: "Which is mentioned as a common reason businesses fail?", options: ["Too much advertising", "Poor cash flow management", "Having too many customers", "Using social media"], answer: "B", explanation: "'Poor cash flow management' is listed as a common reason for failure." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 7. B2 — Science: Quantum Computing Basics
  // ═══════════════════════════════════════════════════════════
  {
    slug: "quantum-computing-basics",
    title: "Quantum Computing Basics",
    titleVi: "Cơ bản về máy tính lượng tử",
    level: "B2",
    category: "science",
    passage: `Quantum Computing Basics

For decades, classical computers have powered our digital world. These machines process information using bits — tiny switches that are either 0 or 1. Every calculation, from sending an email to rendering a video, ultimately boils down to manipulating billions of these binary digits. Quantum computing, however, represents a fundamentally different approach to processing information, and it could revolutionize fields from medicine to cryptography.

At the heart of quantum computing lies the qubit, or quantum bit. Unlike a classical bit, which must be either 0 or 1, a qubit can exist in a state called superposition, where it is effectively both 0 and 1 at the same time. This property means that a quantum computer with just 300 qubits could theoretically represent more states simultaneously than there are atoms in the observable universe.

Another key quantum phenomenon is entanglement. When two qubits become entangled, the state of one instantly influences the state of the other, regardless of the distance between them. Einstein famously called this "spooky action at a distance." Entanglement allows quantum computers to process vast amounts of interconnected data far more efficiently than classical machines.

Despite these remarkable capabilities, quantum computing faces significant challenges. Qubits are extremely fragile. They must be kept at temperatures close to absolute zero — about minus 273 degrees Celsius — and isolated from any electromagnetic interference. Even a tiny vibration can cause a qubit to lose its quantum state, a problem known as decoherence.

Currently, the most advanced quantum computers have a few thousand qubits, but most of these are used for error correction rather than actual computation. Companies like IBM, Google, and several startups are racing to build more stable and powerful quantum processors. In 2019, Google claimed to have achieved "quantum supremacy" — performing a calculation in 200 seconds that would take the world's most powerful supercomputer approximately 10,000 years.

Practical applications of quantum computing are still in the early stages. However, researchers believe it could transform drug discovery by simulating molecular interactions, optimize supply chains and logistics, break current encryption methods, and enable breakthroughs in artificial intelligence. The question is no longer whether quantum computing will become practical, but when.`,
    questions: [
      { question: "What is the basic unit of information in a classical computer?", options: ["Qubit", "Byte", "Bit", "Pixel"], answer: "C", explanation: "'These machines process information using bits.'" },
      { question: "What makes a qubit different from a classical bit?", options: ["It is faster", "It can be both 0 and 1 at the same time", "It uses less energy", "It is physically larger"], answer: "B", explanation: "'A qubit can exist in a state called superposition, where it is effectively both 0 and 1 at the same time.'" },
      { question: "What did Einstein call entanglement?", options: ["Quantum leap", "Spooky action at a distance", "The uncertainty principle", "Parallel processing"], answer: "B", explanation: "'Einstein famously called this \"spooky action at a distance.\"'" },
      { question: "What temperature must qubits be kept at?", options: ["Room temperature", "Minus 100°C", "Close to absolute zero", "Exactly 0°C"], answer: "C", explanation: "'They must be kept at temperatures close to absolute zero — about minus 273 degrees Celsius.'" },
      { question: "What is 'decoherence'?", options: ["A type of qubit", "When a qubit loses its quantum state", "A quantum algorithm", "A measurement technique"], answer: "B", explanation: "'Even a tiny vibration can cause a qubit to lose its quantum state, a problem known as decoherence.'" },
      { question: "What did Google claim to achieve in 2019?", options: ["Building a 1-million-qubit processor", "Quantum supremacy", "Room-temperature quantum computing", "Quantum internet"], answer: "B", explanation: "'Google claimed to have achieved \"quantum supremacy.\"'" },
      { question: "How long did Google's quantum computer take for the supremacy calculation?", options: ["2 seconds", "200 seconds", "2,000 seconds", "20,000 seconds"], answer: "B", explanation: "'Performing a calculation in 200 seconds.'" },
      { question: "Which is NOT mentioned as a potential application of quantum computing?", options: ["Drug discovery", "Breaking encryption", "Social media analysis", "Supply chain optimization"], answer: "C", explanation: "Drug discovery, encryption, and supply chains are mentioned, but social media analysis is not." },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 8. B2 — Culture: The Japanese Tea Ceremony
  // ═══════════════════════════════════════════════════════════
  {
    slug: "japanese-tea-ceremony",
    title: "The Japanese Tea Ceremony",
    titleVi: "Trà đạo Nhật Bản",
    level: "B2",
    category: "culture",
    passage: `The Japanese Tea Ceremony

The Japanese tea ceremony, known as chadō or sadō — literally "the way of tea" — is one of the most refined cultural traditions in the world. Far more than simply preparing and drinking tea, it is a spiritual practice rooted in Zen Buddhism that emphasizes harmony, respect, purity, and tranquility.

The tea ceremony was formalized in the 16th century by Sen no Rikyū, a tea master who is still regarded as the most influential figure in the history of chadō. Rikyū established the principles that continue to guide the ceremony today. He advocated for simplicity and the beauty of imperfection, concepts embodied in the Japanese aesthetic known as wabi-sabi.

A traditional tea ceremony takes place in a purpose-built tearoom called a chashitsu. The entrance to the tearoom is deliberately small, requiring guests to bow as they enter — a symbolic act of humility. The room is typically decorated with a hanging scroll featuring calligraphy or a painting, and a simple flower arrangement called chabana.

The host prepares matcha, a powdered green tea, using specific tools: a bamboo whisk called a chasen, a bamboo scoop called a chashaku, and a ceramic tea bowl called a chawan. Every movement in the preparation is deliberate and precise, from the way the host wipes the utensils to the angle at which the tea bowl is rotated before serving.

Guests also follow strict etiquette. When receiving the tea bowl, a guest bows, lifts the bowl, and rotates it clockwise to avoid drinking from its front. After drinking, the guest wipes the rim and returns the bowl. Conversation is minimal and focuses on appreciating the tea, the utensils, and the seasonal decorations.

The ceremony can last anywhere from 20 minutes for an informal gathering to four hours for a full formal event that includes a multi-course meal called kaiseki. Despite the rigid structure, each ceremony is unique — the host selects scrolls, flowers, and utensils to reflect the season, the occasion, and the relationship with the guests.

In modern Japan, the tea ceremony remains popular. Many schools and community centers offer classes, and it is considered an essential part of cultural education. For visitors to Japan, participating in a tea ceremony provides a profound insight into the values of mindfulness, attention to detail, and appreciation for the present moment that are central to Japanese culture.`,
    questions: [
      { question: "What does 'chadō' literally mean?", options: ["The art of tea", "The way of tea", "The spirit of tea", "The house of tea"], answer: "B", explanation: "'Chadō or sadō — literally \"the way of tea.\"'" },
      { question: "Who formalized the tea ceremony in the 16th century?", options: ["Emperor Meiji", "Sen no Rikyū", "Matsuo Bashō", "Miyamoto Musashi"], answer: "B", explanation: "'The tea ceremony was formalized in the 16th century by Sen no Rikyū.'" },
      { question: "What is 'wabi-sabi'?", options: ["A type of tea", "A Japanese aesthetic of simplicity and imperfection", "A meditation technique", "A style of pottery"], answer: "B", explanation: "'Simplicity and the beauty of imperfection, concepts embodied in the Japanese aesthetic known as wabi-sabi.'" },
      { question: "Why is the tearoom entrance deliberately small?", options: ["To save space", "As a symbolic act of humility", "For decoration", "To keep the room warm"], answer: "B", explanation: "'Requiring guests to bow as they enter — a symbolic act of humility.'" },
      { question: "What is a 'chasen'?", options: ["A ceramic tea bowl", "A bamboo whisk", "A bamboo scoop", "A type of tea"], answer: "B", explanation: "'A bamboo whisk called a chasen.'" },
      { question: "How should a guest rotate the tea bowl before drinking?", options: ["Counterclockwise", "Clockwise", "They should not rotate it", "Upside down"], answer: "B", explanation: "'A guest... rotates it clockwise to avoid drinking from its front.'" },
      { question: "How long can a full formal tea ceremony last?", options: ["20 minutes", "One hour", "Two hours", "Four hours"], answer: "D", explanation: "'Four hours for a full formal event.'" },
      { question: "What is 'kaiseki'?", options: ["A type of tea", "A formal greeting", "A multi-course meal", "A flower arrangement"], answer: "C", explanation: "'A full formal event that includes a multi-course meal called kaiseki.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 9. C1 — Environment: Deep-Sea Mining
  // ═══════════════════════════════════════════════════════════
  {
    slug: "deep-sea-mining-debate",
    title: "The Deep-Sea Mining Debate",
    titleVi: "Tranh luận về khai thác khoáng sản biển sâu",
    level: "C1",
    category: "environment",
    passage: `The Deep-Sea Mining Debate

Thousands of meters beneath the ocean's surface lies a vast, largely unexplored frontier that has become the subject of one of the most contentious environmental debates of our time. The deep seabed is home to enormous deposits of polymetallic nodules — potato-sized rocks rich in manganese, nickel, cobalt, and copper — minerals that are essential for manufacturing electric vehicle batteries, wind turbines, and smartphones. As global demand for these minerals surges, deep-sea mining has emerged as a potential solution, but the ecological consequences remain deeply uncertain.

Proponents of deep-sea mining argue that it could provide a more sustainable alternative to terrestrial mining, which often involves deforestation, displacement of indigenous communities, and severe water pollution. The Democratic Republic of Congo, for instance, supplies over 70% of the world's cobalt, much of it extracted under hazardous conditions, including the use of child labor. Mining the deep ocean, advocates contend, could diversify supply chains and reduce dependence on these ethically problematic sources.

The International Seabed Authority (ISA), a United Nations body established under the 1982 Law of the Sea, is responsible for regulating mining activities in international waters. As of 2024, the ISA has granted 31 exploration contracts covering more than 1.5 million square kilometers of ocean floor, primarily in the Clarion-Clipperton Zone between Hawaii and Mexico. However, no commercial extraction has yet been approved, and negotiations over the final mining code have been protracted and divisive.

Opponents of deep-sea mining point to the profound lack of scientific understanding about deep-ocean ecosystems. The abyssal plains where nodules are found support unique communities of organisms, many of which are new to science. These ecosystems have evolved over millions of years in conditions of extreme pressure, near-freezing temperatures, and perpetual darkness. Research suggests that sediment plumes created by mining equipment could smother filter-feeding organisms over vast areas, and that the noise and light pollution could disrupt species that have adapted to a silent, dark environment.

A landmark study published in Nature Geoscience in 2023 found that polymetallic nodules take millions of years to form, growing at a rate of just a few millimeters per million years. This means that any resources extracted would be, for all practical purposes, non-renewable. Furthermore, the study documented that recovery of benthic communities after simulated mining disturbance was negligible even after 26 years, suggesting that the ecological damage could be essentially permanent.

Several nations, including France, Germany, Chile, and a coalition of Pacific Island states, have called for a moratorium on deep-sea mining until more research is conducted. Major companies such as BMW, Volvo, and Samsung SDI have pledged not to use deep-sea minerals in their products. Yet other nations, particularly those with limited terrestrial mineral resources, view deep-sea mining as a critical economic opportunity.

The debate ultimately hinges on a fundamental question: can humanity meet its growing demand for green technology minerals without sacrificing the health of one of the planet's last pristine ecosystems? As climate change accelerates the transition to renewable energy, the pressure to find an answer grows more urgent by the day.`,
    questions: [
      { question: "What are polymetallic nodules?", options: ["Underwater volcanoes", "Rocks rich in manganese, nickel, cobalt, and copper", "Fossilized marine organisms", "Coral reef formations"], answer: "B", explanation: "'Polymetallic nodules — potato-sized rocks rich in manganese, nickel, cobalt, and copper.'" },
      { question: "What percentage of the world's cobalt comes from the DRC?", options: ["Over 50%", "Over 60%", "Over 70%", "Over 80%"], answer: "C", explanation: "'The Democratic Republic of Congo supplies over 70% of the world's cobalt.'" },
      { question: "What is the ISA?", options: ["An environmental NGO", "A UN body regulating mining in international waters", "A mining corporation", "A research university"], answer: "B", explanation: "'The International Seabed Authority (ISA), a United Nations body established under the 1982 Law of the Sea.'" },
      { question: "Where is the Clarion-Clipperton Zone located?", options: ["Between Australia and Antarctica", "Between Hawaii and Mexico", "Between Africa and South America", "Between Japan and the Philippines"], answer: "B", explanation: "'Primarily in the Clarion-Clipperton Zone between Hawaii and Mexico.'" },
      { question: "How fast do polymetallic nodules grow?", options: ["A few centimeters per year", "A few millimeters per year", "A few millimeters per million years", "A few meters per century"], answer: "C", explanation: "'Growing at a rate of just a few millimeters per million years.'" },
      { question: "What did the Nature Geoscience study find about ecosystem recovery?", options: ["Full recovery occurred within 5 years", "Recovery was negligible even after 26 years", "Ecosystems adapted within a decade", "New species replaced old ones quickly"], answer: "B", explanation: "'Recovery of benthic communities after simulated mining disturbance was negligible even after 26 years.'" },
      { question: "Which companies have pledged not to use deep-sea minerals?", options: ["Apple and Tesla", "BMW, Volvo, and Samsung SDI", "Toyota and Microsoft", "Amazon and Google"], answer: "B", explanation: "'BMW, Volvo, and Samsung SDI have pledged not to use deep-sea minerals.'" },
      { question: "How many exploration contracts has the ISA granted?", options: ["15", "21", "31", "45"], answer: "C", explanation: "'The ISA has granted 31 exploration contracts.'" },
      { question: "What could sediment plumes from mining equipment do?", options: ["Create new habitats", "Smother filter-feeding organisms", "Warm the ocean water", "Produce oxygen"], answer: "B", explanation: "'Sediment plumes created by mining equipment could smother filter-feeding organisms.'" },
      { question: "What is the fundamental question at the heart of the debate?", options: ["How to make mining equipment cheaper", "Whether deep-sea mining is profitable", "Whether mineral demand can be met without destroying pristine ecosystems", "Whether the ISA should be replaced"], answer: "C", explanation: "The passage ends with the question of meeting mineral demand 'without sacrificing the health of one of the planet's last pristine ecosystems.'" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 10. C1 — Technology: Digital Privacy in the Modern Era
  // ═══════════════════════════════════════════════════════════
  {
    slug: "digital-privacy-era",
    title: "Digital Privacy in the Modern Era",
    titleVi: "Quyền riêng tư số trong thời đại hiện nay",
    level: "C1",
    category: "technology",
    passage: `Digital Privacy in the Modern Era

In an age where the average person generates approximately 1.7 megabytes of data every second, the concept of privacy has undergone a radical transformation. What was once a matter of keeping personal letters away from prying eyes has evolved into an extraordinarily complex challenge involving governments, corporations, algorithms, and the very architecture of the internet itself.

The surveillance capitalism model, a term coined by scholar Shoshana Zuboff, describes how technology companies extract behavioral data from users, process it using machine learning algorithms, and sell predictive models of human behavior to advertisers. Every click, search query, location check-in, and social media interaction contributes to a detailed digital profile. A 2023 study by the Electronic Frontier Foundation estimated that the average smartphone user's data is shared with over 350 third-party entities without their meaningful knowledge or consent.

The European Union's General Data Protection Regulation (GDPR), implemented in 2018, was the first comprehensive attempt to give individuals control over their personal data. The GDPR introduced concepts such as the "right to be forgotten," data portability, and mandatory breach notifications. Companies that violate the regulation face fines of up to 4% of their annual global revenue. Since its implementation, GDPR has resulted in over 4 billion euros in cumulative fines, with major penalties levied against Meta, Amazon, and Google.

However, critics argue that the GDPR has had unintended consequences. Small businesses struggle with compliance costs, and the constant stream of cookie consent pop-ups has led to "consent fatigue" — users mindlessly clicking "accept" without reading what they are agreeing to. Moreover, the regulation's effectiveness is limited by jurisdictional boundaries; data can easily flow to countries with weaker privacy protections.

The proliferation of facial recognition technology has added another dimension to the privacy debate. Cities like San Francisco and several in the EU have banned or restricted its use by law enforcement, citing concerns about racial bias and mass surveillance. Conversely, countries like China have embraced it extensively for public security, traffic management, and even school attendance monitoring. The technology's accuracy has improved dramatically — modern systems achieve over 99% accuracy under controlled conditions — but error rates increase significantly for women and people with darker skin tones, raising serious questions about equity and discrimination.

End-to-end encryption has emerged as a critical tool for protecting digital privacy. Services like Signal and WhatsApp encrypt messages so that only the sender and recipient can read them. Governments, however, have repeatedly pushed for "backdoor" access to encrypted communications, arguing that encryption shields criminal activity, including terrorism and child exploitation. Privacy advocates counter that any backdoor, once created, can be exploited by malicious actors and authoritarian regimes, fundamentally undermining the security of all users.

The future of digital privacy will likely be shaped by emerging technologies such as homomorphic encryption, which allows computation on encrypted data without decrypting it, and decentralized identity systems built on blockchain technology. These innovations promise to shift control back to individuals, but their widespread adoption remains uncertain. What is clear is that the tension between technological capability and individual rights will only intensify as artificial intelligence becomes more pervasive in daily life.`,
    questions: [
      { question: "How much data does the average person generate per second?", options: ["0.7 megabytes", "1.7 megabytes", "2.7 megabytes", "5 megabytes"], answer: "B", explanation: "'The average person generates approximately 1.7 megabytes of data every second.'" },
      { question: "Who coined the term 'surveillance capitalism'?", options: ["Edward Snowden", "Mark Zuckerberg", "Shoshana Zuboff", "Tim Berners-Lee"], answer: "C", explanation: "'A term coined by scholar Shoshana Zuboff.'" },
      { question: "When was the GDPR implemented?", options: ["2016", "2017", "2018", "2019"], answer: "C", explanation: "'Implemented in 2018.'" },
      { question: "What is the maximum GDPR fine for violations?", options: ["1% of annual revenue", "2% of annual revenue", "4% of annual revenue", "10% of annual revenue"], answer: "C", explanation: "'Fines of up to 4% of their annual global revenue.'" },
      { question: "What is 'consent fatigue'?", options: ["Being tired of reading privacy policies", "Users mindlessly clicking 'accept' without reading", "Refusing to use technology", "Deleting social media accounts"], answer: "B", explanation: "'\"Consent fatigue\" — users mindlessly clicking \"accept\" without reading what they are agreeing to.'" },
      { question: "Which city banned facial recognition use by law enforcement?", options: ["New York", "London", "San Francisco", "Tokyo"], answer: "C", explanation: "'Cities like San Francisco... have banned or restricted its use by law enforcement.'" },
      { question: "What problem do governments see with end-to-end encryption?", options: ["It uses too much energy", "It is too expensive", "It shields criminal activity", "It slows down the internet"], answer: "C", explanation: "'Governments have repeatedly pushed for \"backdoor\" access... arguing that encryption shields criminal activity.'" },
      { question: "What is homomorphic encryption?", options: ["A faster type of internet connection", "Encryption that allows computation on data without decrypting it", "A social media privacy setting", "A type of firewall"], answer: "B", explanation: "'Homomorphic encryption, which allows computation on encrypted data without decrypting it.'" },
      { question: "How many third-party entities receive the average smartphone user's data?", options: ["Over 100", "Over 200", "Over 350", "Over 500"], answer: "C", explanation: "'Shared with over 350 third-party entities.'" },
      { question: "What issue affects facial recognition accuracy?", options: ["Lighting conditions only", "Higher error rates for women and darker skin tones", "Distance from the camera", "Age of the person"], answer: "B", explanation: "'Error rates increase significantly for women and people with darker skin tones.'" },
    ],
  },

];

async function main() {
  const startOrder = 69;

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
