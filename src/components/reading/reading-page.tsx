"use client";

import * as React from "react";
import {
  Search,
  BookOpen,
  Clock,
  HelpCircle,
  Star,
  ArrowRight,
  Sparkles,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReadingHero } from "./reading-hero";
import { ReadingJourney } from "./reading-journey";
import { ReadingExercise } from "./reading-exercise";

// ─── Types ──────────────────────────────────────────────
interface PassageSummary {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  wordCount: number;
  questionCount: number;
}

interface PassageFull {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  passage: string;
  wordCount: number;
  questions: Array<{ id: string; question: string; options: string[]; order: number }>;
}

// ─── Helpers ────────────────────────────────────────────
function readingTime(words: number) {
  return Math.max(1, Math.ceil(words / 150));
}

function xpReward(questionCount: number, wordCount: number) {
  return questionCount * 15 + Math.floor(wordCount / 20);
}

function difficultyFromLevel(level: string): { label: string; color: string } {
  if (["A1", "A2"].includes(level)) return { label: "Easy", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
  if (["B1", "B2"].includes(level)) return { label: "Medium", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
  return { label: "Hard", color: "text-red-400 border-red-500/30 bg-red-500/10" };
}

const categoryLabels: Record<string, string> = {
  "daily-life": "Daily Reading",
  culture: "Culture",
  environment: "Environment",
  technology: "Technology",
  science: "Science",
  business: "Business",
  health: "Health",
  history: "History",
  travel: "Travel",
  news: "News",
};

const categoryIcons: Record<string, string> = {
  "daily-life": "📖",
  culture: "🎭",
  environment: "🌿",
  technology: "💻",
  science: "🔬",
  business: "💼",
  health: "🏥",
  history: "🏛️",
  travel: "✈️",
  news: "📰",
};

const filterTabs = [
  { value: "", label: "All" },
  { value: "daily-life", label: "Daily Reading" },
  { value: "culture", label: "Culture" },
  { value: "environment", label: "Environment" },
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
];

const difficultyFilters = [
  { value: "", label: "All Levels" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

// ─── Main Page Component ────────────────────────────────
export function ReadingPage() {
  const [list, setList] = React.useState<PassageSummary[]>([]);
  const [selected, setSelected] = React.useState<PassageFull | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("");
  const [filterDifficulty, setFilterDifficulty] = React.useState("");
  const passagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetch("/api/reading")
      .then((r) => r.json())
      .then((data) => setList(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (slug: string) => {
    const res = await fetch(`/api/reading/${slug}`);
    const data = await res.json();
    setSelected(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPassages = () => {
    passagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ─── Exercise View ──────────────────────────────────
  if (selected) {
    return <ReadingExercise passage={selected} onBack={() => setSelected(null)} />;
  }

  // ─── Filtering ──────────────────────────────────────
  const filtered = list.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.titleVi.toLowerCase().includes(q)) return false;
    }
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterDifficulty) {
      const d = difficultyFromLevel(p.level).label.toLowerCase();
      if (d !== filterDifficulty) return false;
    }
    return true;
  });

  const categories = [...new Set(list.map((p) => p.category))];

  return (
    <div className="space-y-8">
      {/* ── Hero Banner ────────────────────────────── */}
      <ReadingHero onExplore={scrollToPassages} />

      {/* ── Reading Journey ────────────────────────── */}
      <ReadingJourney currentStage={1} />

      {/* ── Categories ─────────────────────────────── */}
      {categories.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {categories.map((cat) => {
              const count = list.filter((p) => p.category === cat).length;
              const isActive = filterCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(isActive ? "" : cat)}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl border p-4 w-28 transition-all hover:scale-[1.02] ${
                    isActive
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-white/[0.08] bg-[#131F36] hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl">{categoryIcons[cat] ?? "📄"}</span>
                  <span className="text-xs font-medium text-white/90 text-center leading-tight">
                    {categoryLabels[cat] ?? cat}
                  </span>
                  <span className="text-[10px] text-slate-400">{count} lessons</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Daily Challenge ────────────────────────── */}
      {list.length > 0 && (
        <section>
          <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-r from-[#131F36] to-[#1a1530] p-6 flex items-center gap-6">
            <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl">
              🔥
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">Today&apos;s Reading Challenge</h3>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                  Daily
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{list[0].title}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  {list[0].questionCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {readingTime(list[0].wordCount)} mins
                </span>
                <span className="flex items-center gap-1 text-orange-400">
                  <Star className="h-3 w-3" />
                  {xpReward(list[0].questionCount, list[0].wordCount)} XP
                </span>
              </div>
            </div>
            <Button
              onClick={() => handleSelect(list[0].slug)}
              className="gap-2 bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20"
            >
              <Sparkles className="h-4 w-4" />
              Start
            </Button>
          </div>
        </section>
      )}

      {/* ── Search & Filters ───────────────────────── */}
      <section ref={passagesRef} className="space-y-4">
        <h2 className="text-lg font-semibold text-white">All Reading Lessons</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reading passages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#131F36] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
          </div>
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterCategory(tab.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                filterCategory === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-[#131F36] text-slate-300 border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="h-6 w-px bg-white/10 mx-1" />
          {difficultyFilters.map((d) => (
            <button
              key={d.value}
              onClick={() => setFilterDifficulty(filterDifficulty === d.value ? "" : d.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                filterDifficulty === d.value
                  ? "bg-blue-600 text-white"
                  : "bg-[#131F36] text-slate-300 border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Passage Cards ──────────────────────────── */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 rounded-3xl bg-[#131F36] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState onReset={() => { setSearch(""); setFilterCategory(""); setFilterDifficulty(""); }} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PassageCard key={p.id} passage={p} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Passage Card ───────────────────────────────────────
function PassageCard({
  passage: p,
  onSelect,
}: {
  passage: PassageSummary;
  onSelect: (slug: string) => void;
}) {
  const diff = difficultyFromLevel(p.level);
  const time = readingTime(p.wordCount);
  const xp = xpReward(p.questionCount, p.wordCount);

  return (
    <button
      onClick={() => onSelect(p.slug)}
      className="group text-left rounded-3xl border border-white/[0.08] bg-[#131F36] p-5 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{categoryIcons[p.category] ?? "📄"}</span>
        <Badge className={`text-[10px] border ${diff.color}`}>{diff.label}</Badge>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-blue-400 transition-colors">
        {p.title}
      </h3>
      <p className="text-xs text-slate-400 mb-4 line-clamp-1">{p.titleVi}</p>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {time} min
        </span>
        <span className="flex items-center gap-1">
          <HelpCircle className="h-3 w-3" />
          {p.questionCount}q
        </span>
        <span className="flex items-center gap-1 text-orange-400">
          <Star className="h-3 w-3" />
          {xp} XP
        </span>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-[10px] border-white/10 text-slate-400">
          {p.level}
        </Badge>
        <span className="flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Read <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

// ─── Empty State ────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <span className="text-5xl">🔍</span>
      <p className="text-slate-400 text-sm">No passages found matching your filters.</p>
      <Button variant="outline" onClick={onReset} className="border-white/15 text-white hover:bg-white/10">
        Reset Filters
      </Button>
    </div>
  );
}
