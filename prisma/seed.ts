import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "node:fs";
import * as path from "node:path";
import matter from "gray-matter";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ROOT = path.resolve(import.meta.dirname, "..");

// ─── Helpers ─────────────────────────────────────────────

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function readDirSafe(dir: string): fs.Dirent[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true });
}

// Tạo slug ASCII từ chuỗi tiếng Việt (bỏ dấu, đ→d).
function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Tách tiêu đề dạng "Home & Furniture — Nhà cửa & Nội thất" thành EN / VI.
function splitTitle(title: string): { en: string; vi: string } {
  const parts = title.split("—");
  if (parts.length >= 2) return { en: parts[0].trim(), vi: parts.slice(1).join("—").trim() };
  return { en: title.trim(), vi: "" };
}

// ─── SHARED TOPIC TAXONOMY ───────────────────────────────
// Bảng Topic dùng chung: upsert theo slug và cache lại id trong 1 lần seed.
// Nhờ cache theo slug, nội dung khác loại (vocab/listening/lesson) có cùng slug
// sẽ trỏ về CÙNG một Topic → match được với nhau.
const topicCache = new Map<string, string>();
let topicCounter = 0;

async function upsertTopic(slug: string, nameEn: string, nameVi: string): Promise<string> {
  const cached = topicCache.get(slug);
  if (cached) return cached;
  const topic = await prisma.topic.upsert({
    where: { slug },
    update: { nameEn: nameEn || undefined, nameVi: nameVi || undefined },
    create: { slug, nameEn, nameVi, order: topicCounter++ },
  });
  topicCache.set(slug, topic.id);
  return topic.id;
}

// ─── SEED LESSONS ────────────────────────────────────────

async function seedLessons() {
  console.log("Seeding lessons...");

  const lessonsDir = path.join(ROOT, "src/content/lessons");

  // TS lessons — import as modules
  const tsFiles = ["tu-loai", "danh-tu-1", "danh-tu-2", "tinh-tu-ing-ed", "so-sanh"];
  const tsLessons: any[] = [];
  for (const name of tsFiles) {
    const mod = await import(path.join(lessonsDir, `${name}.ts`));
    const exported = Object.values(mod)[0] as any;
    tsLessons.push(exported);
  }

  // JSON lessons
  const jsonFiles = fs.readdirSync(lessonsDir).filter((f) => f.endsWith(".json"));
  const jsonLessons = jsonFiles.map((f) => readJson(path.join(lessonsDir, f)));

  const allLessons = [...tsLessons, ...jsonLessons];

  for (let i = 0; i < allLessons.length; i++) {
    const l = allLessons[i];
    const subjectTopicId = l.topic ? await upsertTopic(slugify(l.topic), "", l.topic) : null;
    const lesson = await prisma.lesson.upsert({
      where: { slug: l.slug },
      update: { title: l.title, level: l.level, topic: l.topic, series: l.series ?? null, summary: l.summary ?? null, order: i, subjectTopicId },
      create: { slug: l.slug, title: l.title, level: l.level, topic: l.topic, series: l.series ?? null, summary: l.summary ?? null, order: i, subjectTopicId },
    });

    // Delete old children and recreate
    await prisma.lessonSection.deleteMany({ where: { lessonId: lesson.id } });
    await prisma.exerciseSet.deleteMany({ where: { lessonId: lesson.id } });

    // Sections
    for (let s = 0; s < (l.sections ?? []).length; s++) {
      const sec = l.sections[s];
      await prisma.lessonSection.create({
        data: { lessonId: lesson.id, heading: sec.heading, body: sec.body, order: s },
      });
    }

    // Exercise sets
    for (const es of l.exerciseSets ?? []) {
      const set = await prisma.exerciseSet.create({
        data: { refId: es.id, title: es.title, description: es.description ?? null, lessonId: lesson.id },
      });

      for (let e = 0; e < (es.exercises ?? []).length; e++) {
        const ex = es.exercises[e];
        const exercise = await prisma.exercise.create({
          data: {
            refId: ex.id,
            exerciseSetId: set.id,
            kind: ex.kind ?? "mcq",
            question: ex.question,
            answer: ex.answer,
            acceptable: ex.acceptable ?? [],
            explanation: ex.explanation ?? null,
            order: e,
          },
        });

        for (let o = 0; o < (ex.options ?? []).length; o++) {
          const opt = ex.options[o];
          await prisma.quizOption.create({
            data: { exerciseId: exercise.id, key: opt.key, text: opt.text, order: o },
          });
        }
      }
    }
  }

  console.log(`  ✓ ${allLessons.length} lessons seeded`);
}

// ─── SEED VOCABULARY ─────────────────────────────────────

async function seedVocabulary() {
  console.log("Seeding vocabulary...");

  const vocabDir = path.join(ROOT, "src/content/vocabulary");

  // Irregular verbs
  const irregulars: any[] = readJson(path.join(vocabDir, "irregular-verbs.json"));
  await prisma.irregularVerb.deleteMany();
  for (const v of irregulars) {
    await prisma.irregularVerb.create({
      data: { stt: v.stt, v1: v.v1, v2: v.v2, v3: v.v3, meaning: v.meaning },
    });
  }
  console.log(`  ✓ ${irregulars.length} irregular verbs`);

  // Topic word lists
  const topicMeta: Array<{ slug: string; title: string; level: string; category: string; summary: string }> = [
    { slug: "school", title: "School — Trường học", level: "A1-A2", category: "Chủ đề (Topics)", summary: "20 từ vựng cơ bản về trường học, lớp học và dụng cụ học tập." },
    { slug: "weather", title: "Weather — Thời tiết", level: "A1-B1", category: "Chủ đề (Topics)", summary: "20 từ vựng mô tả thời tiết, nhiệt độ và các hiện tượng tự nhiên." },
    { slug: "personality", title: "Personality — Tính cách", level: "A1-B2", category: "Chủ đề (Topics)", summary: "30 tính từ mô tả tính cách con người, từ cơ bản đến nâng cao." },
    { slug: "sickness", title: "Sickness — Bệnh tật", level: "A1-B2", category: "Chủ đề (Topics)", summary: "30 từ vựng về bệnh tật, triệu chứng và chăm sóc sức khỏe." },
    { slug: "restaurant", title: "Restaurant — Nhà hàng", level: "A1-B2", category: "Chủ đề (Topics)", summary: "30 từ vựng về nhà hàng, món ăn và cách chế biến, kèm bài tập giao tiếp." },
    { slug: "crime", title: "Crime — Tội phạm & Pháp luật", level: "A2-B2", category: "Chủ đề (Topics)", summary: "40 từ vựng về tội phạm, con người và quy trình pháp luật, kèm bài tập phong phú." },
    { slug: "sports", title: "Sports — Thể thao", level: "A1-B2", category: "Chủ đề (Topics)", summary: "Từ vựng về các môn thể thao, thi đấu và rèn luyện sức khỏe, kèm bài tập phong phú." },
    { slug: "personality-2", title: "Advanced Personality — Tính cách nâng cao", level: "B1-C1", category: "Chủ đề (Topics)", summary: "40 tính từ nâng cao mô tả tính cách: tinh tế, thao túng, kiên cường, lập dị..." },
    { slug: "workplace", title: "Workplace — Nơi làm việc", level: "A1-B2", category: "Chủ đề (Topics)", summary: "40 từ vựng về văn phòng, chức danh, hành động công việc và 20 collocations thường gặp." },
    { slug: "transportation", title: "Transportation — Giao thông", level: "A1-B2", category: "Chủ đề (Topics)", summary: "50 từ vựng về phương tiện, hạ tầng giao thông, an toàn đường bộ và 30 collocations." },
    { slug: "home-furniture", title: "Home & Furniture — Nhà cửa & Nội thất", level: "A1-B2", category: "Chủ đề (Topics)", summary: "100 từ vựng về các phòng, đồ nội thất, thiết bị gia dụng, đồ trang trí và tính từ mô tả không gian sống, kèm bài tập phong phú." },
    { slug: "clothes-fashion", title: "Clothes & Fashion — Quần áo & Thời trang", level: "A1-B2", category: "Chủ đề (Topics)", summary: "128 từ vựng về quần áo, giày dép, phụ kiện, chất liệu, họa tiết, màu sắc và động/tính từ mô tả trang phục, kèm bài tập phong phú." },
    { slug: "family-relationships", title: "Family & Relationships — Gia đình & Các mối quan hệ", level: "A1-B2", category: "Chủ đề (Topics)", summary: "107 từ vựng về gia đình, họ hàng, tình trạng quan hệ, sự kiện đời sống và tính từ/động từ mô tả quan hệ, kèm bài tập phong phú." },
    { slug: "jobs-occupations", title: "Jobs & Occupations — Nghề nghiệp", level: "A1-B2", category: "Chủ đề (Topics)", summary: "50 nghề nghiệp phổ biến (y tế, kỹ thuật, dịch vụ, văn phòng, IT...) và 17 collocations về công việc, kèm bài tập phong phú." },
    { slug: "shopping", title: "Shopping — Mua sắm", level: "A1-B2", category: "Chủ đề (Topics)", summary: "100 từ vựng về nơi mua sắm, sản phẩm, quần áo & phụ kiện, thanh toán, mua sắm trực tuyến và động/tính từ liên quan, kèm bài tập phong phú." },
    { slug: "travel", title: "Travel — Du lịch", level: "A1-B2", category: "Chủ đề (Topics)", summary: "144 từ vựng về địa điểm, phương tiện, sân bay, giấy tờ, hành lý, chỗ ở, hoạt động và động/tính từ du lịch, kèm bài tập phong phú." },
    { slug: "food-drinks", title: "Food & Drinks — Đồ ăn & Thức uống", level: "A1-B2", category: "Chủ đề (Topics)", summary: "120 từ vựng về đồ ăn & thức uống (chủ đề nhiều phần): trái cây, rau củ, thịt, hải sản và trứng–sữa, kèm bài tập phong phú." },
    { slug: "body-parts", title: "Body Parts — Bộ phận cơ thể", level: "A1-B2", category: "Chủ đề (Topics)", summary: "45 từ vựng về các bộ phận cơ thể (chủ đề nhiều phần): đầu–mặt và thân trên (tay, vai, ngực, lưng), kèm bài tập phong phú." },
  ];

  for (let i = 0; i < topicMeta.length; i++) {
    const meta = topicMeta[i];
    const jsonPath = path.join(vocabDir, `${meta.slug}.json`);
    if (!fs.existsSync(jsonPath)) continue;
    const data = readJson(jsonPath);

    const topic = await prisma.vocabTopic.upsert({
      where: { slug: meta.slug },
      update: { title: meta.title, level: meta.level, category: meta.category, summary: meta.summary, order: i },
      create: { slug: meta.slug, title: meta.title, level: meta.level, category: meta.category, summary: meta.summary, order: i },
    });

    // Topic dùng chung (cùng slug với chủ đề từ vựng) để match word ↔ chủ đề.
    const { en, vi } = splitTitle(meta.title);
    const sharedTopicId = await upsertTopic(meta.slug, en, vi);

    // Clean old children
    await prisma.vocabWord.deleteMany({ where: { vocabTopicId: topic.id } });
    await prisma.vocabCollocation.deleteMany({ where: { vocabTopicId: topic.id } });
    await prisma.commonPattern.deleteMany({ where: { vocabTopicId: topic.id } });
    await prisma.exerciseSet.deleteMany({ where: { vocabTopicId: topic.id } });

    // Words
    for (let w = 0; w < (data.vocabulary ?? []).length; w++) {
      const v = data.vocabulary[w];
      await prisma.vocabWord.create({
        data: {
          vocabTopicId: topic.id,
          topicId: sharedTopicId,
          word: v.word,
          ipaUk: v.ipa_uk ?? "",
          ipaUs: v.ipa_us ?? "",
          partOfSpeech: v.part_of_speech ?? "",
          meaning: v.meaning,
          example: v.example ?? "",
          order: w,
        },
      });
    }

    // Collocations (can be string or { phrase, meaning })
    for (let c = 0; c < (data.collocations ?? []).length; c++) {
      const col = data.collocations[c];
      const phrase = typeof col === "string" ? col : col.phrase;
      const meaning = typeof col === "string" ? "" : (col.meaning ?? "");
      await prisma.vocabCollocation.create({
        data: { vocabTopicId: topic.id, phrase, meaning, order: c },
      });
    }

    // Common patterns
    for (let p = 0; p < (data.common_patterns ?? []).length; p++) {
      const pat = data.common_patterns[p];
      await prisma.commonPattern.create({
        data: { vocabTopicId: topic.id, pattern: pat.pattern, examples: pat.examples ?? [], order: p },
      });
    }

    // Exercise sets
    for (const es of data.exerciseSets ?? []) {
      const set = await prisma.exerciseSet.create({
        data: { refId: es.id, title: es.title, description: es.description ?? null, vocabTopicId: topic.id },
      });

      for (let e = 0; e < (es.exercises ?? []).length; e++) {
        const ex = es.exercises[e];
        const exercise = await prisma.exercise.create({
          data: {
            refId: ex.id,
            exerciseSetId: set.id,
            kind: ex.kind ?? "mcq",
            question: ex.question,
            answer: ex.answer,
            acceptable: ex.acceptable ?? [],
            explanation: ex.explanation ?? null,
            order: e,
          },
        });

        for (let o = 0; o < (ex.options ?? []).length; o++) {
          const opt = ex.options[o];
          await prisma.quizOption.create({
            data: { exerciseId: exercise.id, key: opt.key, text: opt.text, order: o },
          });
        }
      }
    }

    console.log(`  ✓ ${meta.slug}: ${(data.vocabulary ?? []).length} words, ${(data.collocations ?? []).length} collocations`);
  }
}

// ─── SEED LISTENING ──────────────────────────────────────

function extractTranscript(body: string): string {
  const m = body.match(/^##\s+Transcript\s*$/im);
  if (!m || m.index === undefined) return "";
  const rest = body.slice(m.index + m[0].length);
  const nxt = rest.match(/^##\s+/m);
  return (nxt ? rest.slice(0, nxt.index) : rest).trim();
}

function parseTurns(transcript: string, speakers: Array<{ id: string; role: string }>) {
  const roleById = new Map(speakers.map((s) => [s.id, s.role]));
  const validIds = new Set(speakers.map((s) => s.id));
  const turns: Array<{ speaker: string; role: string; text: string }> = [];
  for (const raw of transcript.split("\n")) {
    const line = raw.trim();
    if (!line || line === "---") continue;
    const m = line.match(/^([A-Za-z0-9_]{1,12})\s*:\s*(.*)$/);
    if (m && validIds.has(m[1])) {
      turns.push({ speaker: m[1], role: roleById.get(m[1]) ?? m[1], text: m[2].trim() });
    } else if (turns.length) {
      turns[turns.length - 1].text += " " + line;
    } else if (speakers.length) {
      turns.push({ speaker: speakers[0].id, role: speakers[0].role, text: line });
    }
  }
  return turns;
}

async function seedListening() {
  console.log("Seeding listening...");

  const listeningDir = path.join(ROOT, "docs/09_PAGE_CONTENT/listening");
  if (!fs.existsSync(listeningDir)) {
    console.log("  (no listening directory found, skipping)");
    return;
  }

  for (const entry of readDirSafe(listeningDir)) {
    if (!entry.isDirectory()) continue;
    const topicSlug = entry.name;
    const topicDir = path.join(listeningDir, topicSlug);

    // Read topic README
    const readmePath = path.join(topicDir, "README.md");
    let topicData: Record<string, any> = {};
    if (fs.existsSync(readmePath)) {
      topicData = matter(fs.readFileSync(readmePath, "utf-8")).data;
    }

    const topic = await prisma.listeningTopic.upsert({
      where: { topicSlug },
      update: {
        titleEn: String(topicData.title_en ?? topicSlug),
        titleVi: String(topicData.title_vi ?? ""),
        description: String(topicData.description ?? ""),
        icon: String(topicData.icon ?? "headphones"),
        emoji: String(topicData.emoji ?? ""),
        illustration: String(topicData.illustration ?? ""),
        ieltsSection: String(topicData.ielts_section ?? ""),
        difficulty: String(topicData.difficulty ?? ""),
        order: Number(topicData.order ?? 999),
      },
      create: {
        topicSlug,
        titleEn: String(topicData.title_en ?? topicSlug),
        titleVi: String(topicData.title_vi ?? ""),
        description: String(topicData.description ?? ""),
        icon: String(topicData.icon ?? "headphones"),
        emoji: String(topicData.emoji ?? ""),
        illustration: String(topicData.illustration ?? ""),
        ieltsSection: String(topicData.ielts_section ?? ""),
        difficulty: String(topicData.difficulty ?? ""),
        order: Number(topicData.order ?? 999),
      },
    });

    // Topic dùng chung (cùng slug với topic nghe) để match bài nghe ↔ chủ đề.
    const sharedTopicId = await upsertTopic(
      topicSlug,
      String(topicData.title_en ?? topicSlug),
      String(topicData.title_vi ?? ""),
    );

    // Lesson files
    const lessonFiles = readDirSafe(topicDir)
      .filter((e) => e.isFile() && /\.md$/i.test(e.name) && e.name.toLowerCase() !== "readme.md")
      .map((e) => e.name)
      .sort();

    let lessonCount = 0;

    for (const file of lessonFiles) {
      const lessonSlug = file.replace(/\.md$/i, "");
      const { data, content } = matter(fs.readFileSync(path.join(topicDir, file), "utf-8"));

      // Upsert lesson
      const existing = await prisma.listeningLesson.findUnique({
        where: { topicId_lessonSlug: { topicId: topic.id, lessonSlug } },
      });

      if (existing) {
        // Clean children
        await prisma.listeningSpeaker.deleteMany({ where: { lessonId: existing.id } });
        await prisma.listeningVocab.deleteMany({ where: { lessonId: existing.id } });
        await prisma.listeningFillBlank.deleteMany({ where: { lessonId: existing.id } });
        await prisma.listeningMcq.deleteMany({ where: { lessonId: existing.id } });
        await prisma.listeningTranscriptTurn.deleteMany({ where: { lessonId: existing.id } });
      }

      const transcript = extractTranscript(content);
      const speakers: Array<{ id: string; role: string; voice: string }> = Array.isArray(data.speakers)
        ? data.speakers.map((s: any) => ({ id: String(s.id), role: String(s.role ?? s.id), voice: String(s.voice ?? "") }))
        : [];

      const lesson = await prisma.listeningLesson.upsert({
        where: { topicId_lessonSlug: { topicId: topic.id, lessonSlug } },
        update: {
          titleEn: String(data.title ?? data.title_en ?? lessonSlug),
          titleVi: String(data.title_vi ?? ""),
          level: String(data.level ?? ""),
          audioType: String(data.audio_type ?? ""),
          duration: Number(data.duration ?? 0),
          accent: String(data.accent ?? ""),
          audio: String(data.audio ?? ""),
          image: String(data.image ?? ""),
          difficulty: String(data.difficulty ?? data.level ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          grammarFocus: String(data.grammar_focus ?? ""),
          transcript,
          subjectTopicId: sharedTopicId,
        },
        create: {
          topicId: topic.id,
          subjectTopicId: sharedTopicId,
          lessonSlug,
          titleEn: String(data.title ?? data.title_en ?? lessonSlug),
          titleVi: String(data.title_vi ?? ""),
          level: String(data.level ?? ""),
          audioType: String(data.audio_type ?? ""),
          duration: Number(data.duration ?? 0),
          accent: String(data.accent ?? ""),
          audio: String(data.audio ?? ""),
          image: String(data.image ?? ""),
          difficulty: String(data.difficulty ?? data.level ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          grammarFocus: String(data.grammar_focus ?? ""),
          transcript,
        },
      });

      // Speakers
      for (const sp of speakers) {
        await prisma.listeningSpeaker.create({
          data: { lessonId: lesson.id, refId: sp.id, role: sp.role, voice: sp.voice },
        });
      }

      // Vocabulary
      const vocab: any[] = Array.isArray(data.vocabulary) ? data.vocabulary : [];
      for (let v = 0; v < vocab.length; v++) {
        await prisma.listeningVocab.create({
          data: {
            lessonId: lesson.id,
            word: String(vocab[v].word ?? ""),
            ipa: String(vocab[v].ipa ?? ""),
            meaning: String(vocab[v].meaning ?? ""),
            example: String(vocab[v].example ?? ""),
            order: v,
          },
        });
      }

      // Fill blanks
      const fills: any[] = Array.isArray(data.fill_blanks) ? data.fill_blanks : [];
      for (let f = 0; f < fills.length; f++) {
        await prisma.listeningFillBlank.create({
          data: { lessonId: lesson.id, text: String(fills[f].text), answer: String(fills[f].answer), order: f },
        });
      }

      // MCQ
      const mcqs: any[] = Array.isArray(data.mcq) ? data.mcq : [];
      for (let m = 0; m < mcqs.length; m++) {
        await prisma.listeningMcq.create({
          data: {
            lessonId: lesson.id,
            question: String(mcqs[m].question),
            options: Array.isArray(mcqs[m].options) ? mcqs[m].options.map(String) : [],
            answer: String(mcqs[m].answer),
            explanation: mcqs[m].explanation ? String(mcqs[m].explanation) : null,
            order: m,
          },
        });
      }

      // Transcript turns
      const turns = parseTurns(transcript, speakers);
      for (let t = 0; t < turns.length; t++) {
        await prisma.listeningTranscriptTurn.create({
          data: { lessonId: lesson.id, speaker: turns[t].speaker, role: turns[t].role, text: turns[t].text, order: t },
        });
      }

      lessonCount++;
    }

    console.log(`  ✓ ${topicSlug}: ${lessonCount} lessons`);
  }
}

// ─── MAIN ────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding Sophenix database...\n");
  await seedLessons();
  console.log();
  await seedVocabulary();
  console.log();
  await seedListening();
  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
