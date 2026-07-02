// Loader dữ liệu Listening — CHỈ chạy phía server (dùng fs).
// Đọc trực tiếp từ docs/09_PAGE_CONTENT/listening/ theo yêu cầu ở 03_LISTENING.md:
// mỗi thư mục = 1 chủ đề, mỗi file lesson-*.md = 1 bài nghe. KHÔNG hardcode.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const LISTENING_DIR = path.join(
  process.cwd(),
  "docs/09_PAGE_CONTENT/listening",
);

export interface Speaker {
  id: string;
  role: string;
  voice: string;
}
export interface VocabItem {
  word: string;
  ipa: string;
  meaning: string;
  example: string;
}
export interface FillBlank {
  text: string; // câu có "___"
  answer: string;
}
export interface McqItem {
  question: string;
  options: string[];
  answer: string; // "A" | "B" | "C"
  explanation?: string;
}
export interface TranscriptTurn {
  speaker: string; // id
  role: string;
  text: string;
}

export interface ListeningLessonMeta {
  topicId: string;
  lessonId: string; // slug từ tên file (lesson-01)
  titleEn: string;
  titleVi: string;
  level: string;
  audioType: string;
  duration: number;
  accent: string;
  audio: string;
  image: string;
  difficulty: string;
  tags: string[];
}

export interface ListeningLesson extends ListeningLessonMeta {
  speakers: Speaker[];
  vocabulary: VocabItem[];
  fillBlanks: FillBlank[];
  mcq: McqItem[];
  grammarFocus: string;
  transcript: string; // văn bản thô dưới ## Transcript (còn nhãn speaker)
  transcriptTurns: TranscriptTurn[];
}

export interface ListeningTopic {
  topicId: string;
  titleEn: string;
  titleVi: string;
  description: string;
  icon: string;
  emoji: string; // fallback "3D illustration" khi chưa có ảnh
  illustration: string; // đường dẫn ảnh 3D (public/images/...), rỗng nếu chưa có
  ieltsSection: string; // vd "Section 1"
  difficulty: string; // Beginner | Intermediate | IELTS ...
  order: number;
  lessonCount: number;
  totalDuration: number; // tổng giây
  levels: string[]; // các cấp độ xuất hiện trong chủ đề
  lessons: ListeningLessonMeta[];
}

function readDirSafe(dir: string): fs.Dirent[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true });
}

function extractTranscript(body: string): string {
  const m = body.match(/^##\s+Transcript\s*$/im);
  if (!m || m.index === undefined) return "";
  const rest = body.slice(m.index + m[0].length);
  const nxt = rest.match(/^##\s+/m);
  return (nxt ? rest.slice(0, nxt.index) : rest).trim();
}

function parseTurns(transcript: string, speakers: Speaker[]): TranscriptTurn[] {
  const roleById = new Map(speakers.map((s) => [s.id, s.role]));
  const validIds = new Set(speakers.map((s) => s.id));
  const turns: TranscriptTurn[] = [];
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

function toMeta(topicId: string, lessonId: string, data: Record<string, unknown>): ListeningLessonMeta {
  return {
    topicId,
    lessonId,
    titleEn: String(data.title ?? data.title_en ?? lessonId),
    titleVi: String(data.title_vi ?? ""),
    level: String(data.level ?? ""),
    audioType: String(data.audio_type ?? ""),
    duration: Number(data.duration ?? 0),
    accent: String(data.accent ?? ""),
    audio: String(data.audio ?? ""),
    image: String(data.image ?? ""),
    difficulty: String(data.difficulty ?? data.level ?? ""),
    tags: Array.isArray(data.tags) ? (data.tags as unknown[]).map(String) : [],
  };
}

function lessonFiles(topicDir: string): string[] {
  // Mọi file .md trừ README.md — tên file có nghĩa (vd booking-a-room-by-phone.md).
  return readDirSafe(topicDir)
    .filter((e) => e.isFile() && /\.md$/i.test(e.name) && e.name.toLowerCase() !== "readme.md")
    .map((e) => e.name)
    .sort();
}

export function getListeningTopics(): ListeningTopic[] {
  const topics: ListeningTopic[] = [];
  for (const entry of readDirSafe(LISTENING_DIR)) {
    if (!entry.isDirectory()) continue;
    const topicId = entry.name;
    const topicDir = path.join(LISTENING_DIR, topicId);

    const readmePath = path.join(topicDir, "README.md");
    let data: Record<string, unknown> = {};
    let description = "";
    if (fs.existsSync(readmePath)) {
      const parsed = matter(fs.readFileSync(readmePath, "utf-8"));
      data = parsed.data;
      description = String(data.description ?? "");
    }

    const files = lessonFiles(topicDir);
    const lessons = files.map((f) => {
      const parsed = matter(fs.readFileSync(path.join(topicDir, f), "utf-8"));
      return toMeta(topicId, f.replace(/\.md$/i, ""), parsed.data);
    });

    topics.push({
      topicId,
      titleEn: String(data.title_en ?? topicId),
      titleVi: String(data.title_vi ?? ""),
      description,
      icon: String(data.icon ?? "headphones"),
      emoji: String(data.emoji ?? "🎧"),
      illustration: String(data.illustration ?? ""),
      ieltsSection: String(data.ielts_section ?? "IELTS Listening"),
      difficulty: String(data.difficulty ?? ""),
      order: Number(data.order ?? 999),
      lessonCount: lessons.length,
      totalDuration: lessons.reduce((n, l) => n + l.duration, 0),
      levels: Array.from(new Set(lessons.map((l) => l.level).filter(Boolean))),
      lessons,
    });
  }
  return topics.sort((a, b) => a.order - b.order || a.titleEn.localeCompare(b.titleEn));
}

export function getListeningTopic(topicId: string): ListeningTopic | undefined {
  return getListeningTopics().find((t) => t.topicId === topicId);
}

export function getListeningLesson(topicId: string, lessonId: string): ListeningLesson | undefined {
  const file = path.join(LISTENING_DIR, topicId, `${lessonId}.md`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  const speakers: Speaker[] = Array.isArray(data.speakers)
    ? (data.speakers as Record<string, unknown>[]).map((s) => ({
        id: String(s.id),
        role: String(s.role ?? s.id),
        voice: String(s.voice ?? ""),
      }))
    : [];
  const transcript = extractTranscript(content);
  return {
    ...toMeta(topicId, lessonId, data),
    speakers,
    vocabulary: Array.isArray(data.vocabulary) ? (data.vocabulary as VocabItem[]) : [],
    fillBlanks: Array.isArray(data.fill_blanks) ? (data.fill_blanks as FillBlank[]) : [],
    mcq: Array.isArray(data.mcq) ? (data.mcq as McqItem[]) : [],
    grammarFocus: String(data.grammar_focus ?? ""),
    transcript,
    transcriptTurns: parseTurns(transcript, speakers),
  };
}
