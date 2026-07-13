"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Puzzle,
  MessageSquare,
  GraduationCap,
  PenLine,
  FileText,
  Layers,
  Languages,
  Clock,
  ListChecks,
} from "lucide-react";
import { getAllLessons } from "@/content/lessons";
import type { Level } from "@/content/lessons/types";
import { SearchBar } from "@/components/ui/search-bar";
import { matchesQuery } from "@/lib/search";

const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Bắt đầu", value: "A" },
  { label: "Trung cấp", value: "B1" },
  { label: "Trung cao cấp", value: "B2" },
  { label: "Cao cấp", value: "C" },
] as const;

const iconMap: Record<string, typeof BookOpen> = {
  "Từ loại": Layers,
  "Danh từ": FileText,
  "Tính từ": PenLine,
  "So sánh": Languages,
  "Đại từ": MessageSquare,
  "Mạo từ": GraduationCap,
  "Thì": Clock,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  "Từ loại": { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400" },
  "Danh từ": { bg: "from-purple-500/20 to-purple-600/10", icon: "text-purple-400" },
  "Tính từ": { bg: "from-pink-500/20 to-pink-600/10", icon: "text-pink-400" },
  "So sánh": { bg: "from-emerald-500/20 to-emerald-600/10", icon: "text-emerald-400" },
  "Đại từ": { bg: "from-orange-500/20 to-orange-600/10", icon: "text-orange-400" },
  "Mạo từ": { bg: "from-cyan-500/20 to-cyan-600/10", icon: "text-cyan-400" },
  "Thì": { bg: "from-indigo-500/20 to-indigo-600/10", icon: "text-indigo-400" },
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
  return { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400" };
}

function levelBadgeClass(level: Level): string {
  if (level.startsWith("A"))
    return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (level === "B1")
    return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  if (level === "B2")
    return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

function matchesFilter(level: Level, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "A") return level.startsWith("A");
  if (filter === "C") return level.startsWith("C");
  return level === filter;
}

export default function LessonsPage() {
  const lessons = getAllLessons();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = lessons.filter(
    (l) => matchesFilter(l.level, filter) && matchesQuery(query, l.title, l.topic, l.summary)
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bài giảng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn một bài để học lý thuyết và làm bài tập.
        </p>
      </div>

      {/* Search */}
      <SearchBar value={query} onChange={setQuery} placeholder="Tìm bài giảng (tiếng Anh hoặc tiếng Việt)..." />

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {levelFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lesson grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lesson) => {
          const Icon = getIcon(lesson.topic);
          const color = getColor(lesson.topic);
          const exerciseCount = lesson.exerciseSets.reduce(
            (n, s) => n + s.exercises.length,
            0
          );

          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className="group rounded-xl border border-border/40 bg-card/80 p-4 transition-colors hover:border-border hover:bg-card"
            >
              {/* Icon + Badge row */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color.bg}`}
                >
                  <Icon className={`h-5 w-5 ${color.icon}`} />
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${levelBadgeClass(lesson.level)}`}
                >
                  {lesson.level}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">
                {lesson.title}
              </h3>
              {lesson.summary && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {lesson.summary}
                </p>
              )}

              {/* Stats */}
              <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ListChecks className="h-3 w-3" />
                  {lesson.exerciseSets.length} bộ
                </span>
                <span className="flex items-center gap-1">
                  <Puzzle className="h-3 w-3" />
                  {exerciseCount} câu bài tập
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {query
            ? `Không tìm thấy bài giảng nào khớp với "${query}".`
            : "Chưa có bài giảng nào cho cấp độ này."}
        </p>
      )}
    </div>
  );
}
