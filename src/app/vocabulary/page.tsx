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
  Repeat,
  GraduationCap,
  CloudSun,
  Smile,
  Stethoscope,
  UtensilsCrossed,
  ShieldAlert,
  Dumbbell,
  Brain,
  Briefcase,
  Bus,
  Sofa,
  Shirt,
  Users,
  HardHat,
  ShoppingBag,
  Plane,
  Apple,
  PersonStanding,
  type LucideIcon,
} from "lucide-react";
import { getAllVocabTopics } from "@/content/vocabulary";
import type { VocabLevel, VocabTopic } from "@/content/vocabulary/types";
import { SearchBar } from "@/components/ui/search-bar";
import { matchesQuery } from "@/lib/search";

const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Bắt đầu", value: "A" },
  { label: "Trung cấp", value: "B1" },
  { label: "Trung cao cấp", value: "B2" },
  { label: "Cao cấp", value: "C" },
] as const;

// Logo riêng cho từng chủ đề (theo slug) để mỗi chủ đề có nhận diện khác biệt.
const topicVisualMap: Record<string, { icon: LucideIcon; bg: string; icon_color: string }> = {
  "irregular-verbs": { icon: Repeat, bg: "from-emerald-500/20 to-emerald-600/10", icon_color: "text-emerald-400" },
  school: { icon: GraduationCap, bg: "from-blue-500/20 to-blue-600/10", icon_color: "text-blue-400" },
  weather: { icon: CloudSun, bg: "from-sky-500/20 to-sky-600/10", icon_color: "text-sky-400" },
  personality: { icon: Smile, bg: "from-pink-500/20 to-pink-600/10", icon_color: "text-pink-400" },
  sickness: { icon: Stethoscope, bg: "from-rose-500/20 to-rose-600/10", icon_color: "text-rose-400" },
  restaurant: { icon: UtensilsCrossed, bg: "from-amber-500/20 to-amber-600/10", icon_color: "text-amber-400" },
  crime: { icon: ShieldAlert, bg: "from-indigo-500/20 to-indigo-600/10", icon_color: "text-indigo-400" },
  sports: { icon: Dumbbell, bg: "from-orange-500/20 to-orange-600/10", icon_color: "text-orange-400" },
  "personality-2": { icon: Brain, bg: "from-fuchsia-500/20 to-fuchsia-600/10", icon_color: "text-fuchsia-400" },
  workplace: { icon: Briefcase, bg: "from-teal-500/20 to-teal-600/10", icon_color: "text-teal-400" },
  transportation: { icon: Bus, bg: "from-cyan-500/20 to-cyan-600/10", icon_color: "text-cyan-400" },
  "home-furniture": { icon: Sofa, bg: "from-lime-500/20 to-lime-600/10", icon_color: "text-lime-400" },
  "clothes-fashion": { icon: Shirt, bg: "from-purple-500/20 to-purple-600/10", icon_color: "text-purple-400" },
  "family-relationships": { icon: Users, bg: "from-red-500/20 to-red-600/10", icon_color: "text-red-400" },
  "jobs-occupations": { icon: HardHat, bg: "from-yellow-500/20 to-yellow-600/10", icon_color: "text-yellow-400" },
  shopping: { icon: ShoppingBag, bg: "from-green-500/20 to-green-600/10", icon_color: "text-green-400" },
  travel: { icon: Plane, bg: "from-violet-500/20 to-violet-600/10", icon_color: "text-violet-400" },
  "food-drinks": { icon: Apple, bg: "from-stone-500/20 to-stone-600/10", icon_color: "text-stone-300" },
  "body-parts": { icon: PersonStanding, bg: "from-rose-500/20 to-pink-600/10", icon_color: "text-rose-300" },
};

// Fallback theo nhóm từ loại khi chủ đề chưa có logo riêng.
const categoryIconMap: Record<string, LucideIcon> = {
  "Động từ": Languages,
  "Danh từ": Layers,
  "Tính từ": MessageSquare,
  "Chủ đề": Puzzle,
};

const categoryColorMap: Record<string, { bg: string; icon_color: string }> = {
  "Động từ": { bg: "from-emerald-500/20 to-emerald-600/10", icon_color: "text-emerald-400" },
  "Danh từ": { bg: "from-blue-500/20 to-blue-600/10", icon_color: "text-blue-400" },
  "Tính từ": { bg: "from-pink-500/20 to-pink-600/10", icon_color: "text-pink-400" },
  "Chủ đề": { bg: "from-violet-500/20 to-violet-600/10", icon_color: "text-violet-400" },
};

function getIcon(topic: VocabTopic): LucideIcon {
  const own = topicVisualMap[topic.slug];
  if (own) return own.icon;
  for (const [key, Icon] of Object.entries(categoryIconMap)) {
    if (topic.category.includes(key)) return Icon;
  }
  return BookOpen;
}

function getColor(topic: VocabTopic): { bg: string; icon_color: string } {
  const own = topicVisualMap[topic.slug];
  if (own) return { bg: own.bg, icon_color: own.icon_color };
  for (const [key, color] of Object.entries(categoryColorMap)) {
    if (topic.category.includes(key)) return color;
  }
  return { bg: "from-blue-500/20 to-blue-600/10", icon_color: "text-blue-400" };
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
  const [query, setQuery] = useState("");

  const filtered = topics.filter(
    (t) => matchesFilter(t.level, filter) && matchesQuery(query, t.title, t.summary)
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Từ vựng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn một chủ đề từ vựng để tra cứu và luyện tập.
        </p>
      </div>

      {/* Search */}
      <SearchBar value={query} onChange={setQuery} placeholder="Tìm chủ đề (tiếng Anh hoặc tiếng Việt)..." />

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
          const Icon = getIcon(topic);
          const color = getColor(topic);

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
                  <Icon className={`h-5 w-5 ${color.icon_color}`} />
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
          {query
            ? `Không tìm thấy chủ đề nào khớp với "${query}".`
            : "Chưa có chủ đề từ vựng nào cho cấp độ này."}
        </p>
      )}
    </div>
  );
}
