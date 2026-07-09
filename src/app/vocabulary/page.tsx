"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Languages,
  MessageSquare,
  Layers,
  ListChecks,
  Puzzle,
} from "lucide-react";
import { getAllVocabTopics } from "@/content/vocabulary";
import type { VocabLevel } from "@/content/vocabulary/types";

const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Bắt đầu", value: "A" },
  { label: "Trung cấp", value: "B1" },
  { label: "Trung cao cấp", value: "B2" },
  { label: "Cao cấp", value: "C" },
] as const;

const iconMap: Record<string, typeof BookOpen> = {
  "Động từ": Languages,
  "Danh từ": Layers,
  "Tính từ": MessageSquare,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  "Động từ": { bg: "from-emerald-500/20 to-emerald-600/10", icon: "text-emerald-400" },
  "Danh từ": { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400" },
  "Tính từ": { bg: "from-pink-500/20 to-pink-600/10", icon: "text-pink-400" },
};

function getIcon(category: string) {
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (category.includes(key)) return Icon;
  }
  return BookOpen;
}

function getColor(category: string) {
  for (const [key, color] of Object.entries(colorMap)) {
    if (category.includes(key)) return color;
  }
  return { bg: "from-blue-500/20 to-blue-600/10", icon: "text-blue-400" };
}

function levelBadgeClass(level: VocabLevel): string {
  if (level.startsWith("A"))
    return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (level === "B1")
    return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  if (level === "B2")
    return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

function matchesFilter(level: VocabLevel, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "A") return level.startsWith("A");
  if (filter === "C") return level.startsWith("C");
  return level === filter;
}

export default function VocabularyPage() {
  const topics = getAllVocabTopics();
  const [filter, setFilter] = useState("all");

  const filtered = topics.filter((t) => matchesFilter(t.level, filter));

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Từ vựng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn một chủ đề từ vựng để tra cứu và luyện tập.
        </p>
      </div>

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

      {/* Topic grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((topic) => {
          const Icon = getIcon(topic.category);
          const color = getColor(topic.category);

          return (
            <Link
              key={topic.slug}
              href={`/vocabulary/${topic.slug}`}
              className="group rounded-xl border border-border/40 bg-card/80 p-4 transition-colors hover:border-border hover:bg-card"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color.bg}`}
                >
                  <Icon className={`h-5 w-5 ${color.icon}`} />
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${levelBadgeClass(topic.level)}`}
                >
                  {topic.level}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">
                {topic.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {topic.summary}
              </p>

              <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ListChecks className="h-3 w-3" />
                  {topic.itemCount} mục
                </span>
                {topic.exerciseSets.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Puzzle className="h-3 w-3" />
                    {topic.exerciseSets.reduce((n, s) => n + s.exercises.length, 0)} câu bài tập
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Chưa có chủ đề từ vựng nào cho cấp độ này.
        </p>
      )}
    </div>
  );
}
