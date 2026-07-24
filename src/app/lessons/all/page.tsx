"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Puzzle,
  MessageSquare,
  GraduationCap,
  PenLine,
  FileText,
  Layers,
  Clock,
  Search,
  ChevronLeft,
  Play,
  Star,
  Target,

  GitBranch,
  Shield,
  MessageCircleQuestion,
  Repeat,
  Shuffle,
  Sparkles,
  FlipVertical,
  Link2,
  Regex,
  Users,
  Braces,
  GitMerge,
} from "lucide-react";
import { getAllLessons } from "@/content/lessons";
import type { Lesson } from "@/content/lessons/types";
import type { Level } from "@/content/lessons/types";
import { Badge } from "@/components/ui/badge";
import { matchesQuery } from "@/lib/search";

const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Sơ cấp", value: "A" },
  { label: "Trung cấp", value: "B1" },
  { label: "Cao cấp", value: "B2" },
] as const;

const iconMap: Record<string, typeof BookOpen> = {
  "Từ loại": Layers,
  "Danh từ": FileText,
  "Tính từ": PenLine,
  "So sánh": Layers,
  "Đại từ": MessageSquare,
  "Mạo từ": GraduationCap,
  "Thì": Clock,
  "Động từ": Play,
  "Giới từ": Target,
  "Gerund": Repeat,
  "subject-verb": Users,
  "phrasal-verbs": Link2,
  "conditionals": GitBranch,
  "passive-voice": Shield,
  "reported-speech": MessageSquare,
  "inversion": FlipVertical,
  "question-tags": MessageCircleQuestion,
  "participles": Sparkles,
  "subjunctive": Shuffle,
  "prepositions": Target,
  "relative-clauses": Regex,
  "noun-adverb-clauses": Braces,
  "conjunctions": GitMerge,
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  "Từ loại": { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400", border: "border-blue-500/20" },
  "Danh từ": { bg: "from-purple-500/20 to-purple-600/10", icon: "text-purple-400", border: "border-purple-500/20" },
  "Tính từ": { bg: "from-pink-500/20 to-pink-600/10", icon: "text-pink-400", border: "border-pink-500/20" },
  "So sánh": { bg: "from-emerald-500/20 to-emerald-600/10", icon: "text-emerald-400", border: "border-emerald-500/20" },
  "Đại từ": { bg: "from-orange-500/20 to-orange-600/10", icon: "text-orange-400", border: "border-orange-500/20" },
  "Mạo từ": { bg: "from-cyan-500/20 to-cyan-600/10", icon: "text-cyan-400", border: "border-cyan-500/20" },
  "Thì": { bg: "from-indigo-500/20 to-indigo-600/10", icon: "text-indigo-400", border: "border-indigo-500/20" },
  "Động từ": { bg: "from-violet-500/20 to-violet-600/10", icon: "text-violet-400", border: "border-violet-500/20" },
  "Giới từ": { bg: "from-amber-500/20 to-amber-600/10", icon: "text-amber-400", border: "border-amber-500/20" },
  "Gerund": { bg: "from-teal-500/20 to-teal-600/10", icon: "text-teal-400", border: "border-teal-500/20" },
  "subject-verb": { bg: "from-lime-500/20 to-lime-600/10", icon: "text-lime-400", border: "border-lime-500/20" },
  "phrasal-verbs": { bg: "from-fuchsia-500/20 to-fuchsia-600/10", icon: "text-fuchsia-400", border: "border-fuchsia-500/20" },
  "conditionals": { bg: "from-sky-500/20 to-sky-600/10", icon: "text-sky-400", border: "border-sky-500/20" },
  "passive-voice": { bg: "from-slate-400/20 to-slate-500/10", icon: "text-slate-300", border: "border-slate-400/20" },
  "reported-speech": { bg: "from-rose-500/20 to-rose-600/10", icon: "text-rose-400", border: "border-rose-500/20" },
  "inversion": { bg: "from-yellow-500/20 to-yellow-600/10", icon: "text-yellow-400", border: "border-yellow-500/20" },
  "question-tags": { bg: "from-green-500/20 to-green-600/10", icon: "text-green-400", border: "border-green-500/20" },
  "participles": { bg: "from-red-500/20 to-red-600/10", icon: "text-red-400", border: "border-red-500/20" },
  "subjunctive": { bg: "from-purple-400/20 to-indigo-500/10", icon: "text-purple-300", border: "border-purple-400/20" },
  "prepositions": { bg: "from-amber-500/20 to-amber-600/10", icon: "text-amber-400", border: "border-amber-500/20" },
  "relative-clauses": { bg: "from-emerald-400/20 to-teal-500/10", icon: "text-emerald-300", border: "border-emerald-400/20" },
  "noun-adverb-clauses": { bg: "from-blue-400/20 to-violet-500/10", icon: "text-blue-300", border: "border-blue-400/20" },
  "conjunctions": { bg: "from-orange-400/20 to-rose-500/10", icon: "text-orange-300", border: "border-orange-400/20" },
};

function getIcon(topic: string) {
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (topic.includes(key)) return Icon;
  }
  return BookOpen;
}

function getColor(topic: string) {
  for (const [key, color] of Object.entries(colorMap)) {
    if (topic.includes(key)) return color;
  }
  return { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400", border: "border-blue-500/20" };
}

function levelBadgeClass(level: Level): string {
  if (level.startsWith("A")) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (level === "B1") return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  if (level === "B2") return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

function matchesFilter(level: Level, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "A") return level.startsWith("A");
  if (filter === "C") return level.startsWith("C");
  return level === filter;
}

function xpReward(lesson: Lesson): number {
  const exerciseCount = lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0);
  return exerciseCount * 10 + lesson.sections.length * 5;
}

export default function AllLessonsPage() {
  const lessons = getAllLessons();
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const filtered = lessons.filter(
    (l) => matchesFilter(l.level, filter) && matchesQuery(query, l.title, l.topic, l.summary)
  );

  const categories = [...new Set(lessons.map((l) => l.topic))];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/lessons"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#131F36] text-slate-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">Tất cả bài giảng</h1>
          <p className="text-xs text-slate-400">{lessons.length} bài giảng có sẵn</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm bài giảng (tiếng Anh hoặc tiếng Việt)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#131F36] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>
        <div className="flex gap-1.5">
          {levelFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-[#131F36] text-slate-300 border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((topic) => {
          const Icon = getIcon(topic);
          const color = getColor(topic);
          const count = lessons.filter((l) => l.topic === topic).length;
          const isActive = query === topic;
          return (
            <button
              key={topic}
              onClick={() => setQuery(isActive ? "" : topic)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
                isActive
                  ? `bg-gradient-to-r ${color.bg} ${color.border} text-white`
                  : "bg-[#131F36] border-white/[0.08] text-slate-300 hover:border-white/20"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${color.icon}`} />
              {topic}
              <span className="text-slate-500">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        Hiển thị {filtered.length} / {lessons.length} bài giảng
      </p>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <Image src="/images/lessons/mascot-reading.png" alt="Empty" width={120} height={120} unoptimized />
          <p className="text-slate-400 text-sm">
            {query ? `Không tìm thấy bài giảng nào khớp "${query}".` : "Chưa có bài giảng nào cho cấp độ này."}
          </p>
          <button
            onClick={() => { setQuery(""); setFilter("all"); }}
            className="rounded-full border border-white/15 px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors"
          >
            Xoá bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const Icon = getIcon(lesson.topic);
  const color = getColor(lesson.topic);
  const exerciseCount = lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0);
  const xp = xpReward(lesson);

  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group rounded-[20px] border border-white/[0.06] bg-[#0f1a2e] p-4 transition-all duration-200 hover:scale-[1.02] hover:border-white/15 hover:shadow-xl hover:shadow-black/20 flex flex-col"
    >
      <div className="flex items-start justify-between mb-2.5">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${color.icon}`} />
        </div>
        <Badge className={`text-[9px] border ${levelBadgeClass(lesson.level)}`}>{lesson.level}</Badge>
      </div>

      <h3 className="text-[13px] font-semibold text-white leading-snug mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
        {lesson.title}
      </h3>
      {lesson.summary && (
        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2 mb-auto">{lesson.summary}</p>
      )}

      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-3 mb-2">
        <span className="flex items-center gap-0.5">{exerciseCount} bài tập</span>
        <span className="flex items-center gap-0.5 text-amber-400"><Star className="h-2.5 w-2.5 fill-amber-400" />4.8</span>
      </div>

      <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
        <div className="h-full w-0 rounded-full bg-blue-500" />
      </div>
    </Link>
  );
}
