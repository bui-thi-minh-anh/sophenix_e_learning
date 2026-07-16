"use client";

import * as React from "react";
import Image from "next/image";
import {
  Clock,
  HelpCircle,
  Star,
  ChevronRight,
  BookOpen,
  Flame,
  Target,
  Trophy,
  TrendingUp,
  Play,
  ChevronLeft,
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
  if (["A1", "A2"].includes(level))
    return { label: "Easy", color: "text-emerald-400" };
  if (["B1", "B2"].includes(level))
    return { label: "Medium", color: "text-amber-400" };
  return { label: "Hard", color: "text-red-400" };
}

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  "daily-life": { label: "Short Passages", icon: "📖", color: "from-blue-500/20 to-blue-600/10" },
  culture: { label: "Long Passages", icon: "📚", color: "from-purple-500/20 to-purple-600/10" },
  environment: { label: "TOEIC Part 5", icon: "📝", color: "from-emerald-500/20 to-emerald-600/10" },
  technology: { label: "TOEIC Part 6", icon: "📋", color: "from-cyan-500/20 to-cyan-600/10" },
  science: { label: "TOEIC Part 7", icon: "🔬", color: "from-orange-500/20 to-orange-600/10" },
  business: { label: "IELTS Academic", icon: "🎓", color: "from-violet-500/20 to-violet-600/10" },
  health: { label: "Health", icon: "🏥", color: "from-pink-500/20 to-pink-600/10" },
  history: { label: "History", icon: "🏛️", color: "from-amber-500/20 to-amber-600/10" },
  travel: { label: "Travel", icon: "✈️", color: "from-sky-500/20 to-sky-600/10" },
  news: { label: "News", icon: "📰", color: "from-rose-500/20 to-rose-600/10" },
};

const tabFilters = [
  { value: "toeic", label: "TOEIC Reading" },
  { value: "ielts", label: "IELTS Reading" },
];

// ─── Main Page Component ────────────────────────────────
export function ReadingPage() {
  const [list, setList] = React.useState<PassageSummary[]>([]);
  const [selected, setSelected] = React.useState<PassageFull | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("toeic");
  const passagesRef = React.useRef<HTMLDivElement>(null);
  const categoryScrollRef = React.useRef<HTMLDivElement>(null);

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

  const scrollCategory = (dir: "left" | "right") => {
    categoryScrollRef.current?.scrollBy({
      left: dir === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  if (selected) {
    return <ReadingExercise passage={selected} onBack={() => setSelected(null)} />;
  }

  const categories = [...new Set(list.map((p) => p.category))];
  const dailyChallenge = list[0];

  return (
    <div className="flex gap-6">
      {/* ── Main Content ───────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Hero */}
        <ReadingHero onExplore={scrollToPassages} />

        {/* Journey */}
        <ReadingJourney currentStage={3} />

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/[0.06]">
          {tabFilters.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === tab.value
                  ? "text-violet-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Continue Learning + Daily Challenge */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Continue Learning */}
          {list.length > 1 && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white">Continue Learning</h3>
              <div className="flex gap-3">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-[#0c1a35] shrink-0">
                  <Image
                    src="/images/reading/badge-fire.jpg"
                    alt="Continue"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium text-white truncate">{list[1].title}</p>
                  <p className="text-xs text-slate-400">{list[1].category.replace("-", " ")}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full w-[60%] rounded-full bg-blue-500" />
                    </div>
                    <span className="text-[10px] text-slate-400">60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">4 / 7 lessons completed</span>
                    <span className="text-[10px] text-emerald-400 font-medium">+120 XP</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleSelect(list[1].slug)}
                size="sm"
                className="w-full gap-2 bg-violet-600 hover:bg-violet-500 text-white"
              >
                <Play className="h-3.5 w-3.5" />
                Continue Lesson
              </Button>
            </div>
          )}

          {/* Daily Reading Challenge */}
          {dailyChallenge && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-white">Daily Reading Challenge</h3>
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px]">
                    New
                  </Badge>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed mb-3">
                  Read the passage and answer the questions.
                  <br />
                  The topic is about {dailyChallenge.titleVi || dailyChallenge.title}.
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    {dailyChallenge.questionCount} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{readingTime(dailyChallenge.wordCount)} min
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-orange-400 font-medium">
                    <Star className="h-3.5 w-3.5 fill-orange-400" />
                    {xpReward(dailyChallenge.questionCount, dailyChallenge.wordCount)} XP
                  </span>
                  <Button
                    onClick={() => handleSelect(dailyChallenge.slug)}
                    size="sm"
                    className="gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Start Challenge
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practice by Category */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Practice by Category</h2>
            <div className="flex gap-1">
              <button
                onClick={() => scrollCategory("left")}
                className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => scrollCategory("right")}
                className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div
            ref={categoryScrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((cat) => {
              const count = list.filter((p) => p.category === cat).length;
              const cfg = categoryConfig[cat] ?? { label: cat, icon: "📄", color: "from-slate-500/20 to-slate-600/10" };
              const diff = difficultyFromLevel(
                list.find((p) => p.category === cat)?.level ?? "A1"
              );
              return (
                <button
                  key={cat}
                  onClick={() => {
                    const target = list.find((p) => p.category === cat);
                    if (target) handleSelect(target.slug);
                  }}
                  className="flex-shrink-0 w-[130px] rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0f1a2e] to-[#131F36] p-4 space-y-2 hover:border-white/15 hover:scale-[1.02] transition-all"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center text-xl mx-auto`}>
                    {cfg.icon}
                  </div>
                  <p className="text-xs font-medium text-white text-center leading-tight">
                    {cfg.label}
                  </p>
                  <p className="text-[10px] text-slate-400 text-center">{count} lessons</p>
                  <p className={`text-[10px] font-medium text-center ${diff.color}`}>
                    {diff.label}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recommended for you */}
        <section ref={passagesRef} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recommended for you</h2>
            <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-2xl bg-[#0f1a2e] animate-pulse" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <RecommendedCard key={p.id} passage={p} onSelect={handleSelect} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ── Right Sidebar ──────────────────────────── */}
      <aside className="hidden xl:block w-[280px] shrink-0 space-y-4">
        <ReadingProgress />
        <RecentActivity />
        <Achievements />
        <QuoteCard />
      </aside>
    </div>
  );
}

// ─── Recommended Card ──────────────────────────────────
function RecommendedCard({
  passage: p,
  onSelect,
}: {
  passage: PassageSummary;
  onSelect: (slug: string) => void;
}) {
  const diff = difficultyFromLevel(p.level);
  const time = readingTime(p.wordCount);

  return (
    <button
      onClick={() => onSelect(p.slug)}
      className="group text-left rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/15 hover:shadow-lg hover:shadow-black/20 transition-all relative h-[160px]"
    >
      <Image
        src={`/images/reading/covers/${p.slug}.png`}
        alt={p.title}
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-3.5">
        <Badge className="self-start bg-violet-600/80 text-white border-0 text-[9px] backdrop-blur-sm">
          {p.level}
        </Badge>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2 drop-shadow-md">
            {p.title}
          </h3>
          <div className="flex items-center gap-3 text-[10px] text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {time} min
            </span>
            <span className={`font-medium ${diff.color}`}>
              {diff.label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Reading Progress (Sidebar) ────────────────────────
function ReadingProgress() {
  const progress = 65;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white">Reading Progress</h3>

      <div className="flex justify-center">
        <div className="relative">
          <svg width="110" height="110" className="-rotate-90">
            <circle
              cx="55" cy="55" r="45"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <circle
              cx="55" cy="55" r="45"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-emerald-400">Great progress!</p>

      <div className="space-y-2.5">
        {[
          { icon: BookOpen, label: "Lessons Completed", value: "28", color: "text-blue-400" },
          { icon: Target, label: "Passages Read", value: "86", color: "text-emerald-400" },
          { icon: TrendingUp, label: "Average Score", value: "78%", color: "text-amber-400" },
          { icon: Flame, label: "Current Streak", value: "7 days", color: "text-orange-400" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
              <span className="text-[11px] text-slate-400">{stat.label}</span>
            </div>
            <span className="text-xs font-semibold text-white">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Recent Activity (Sidebar) ─────────────────────────
function RecentActivity() {
  const activities = [
    { title: "TOEIC Part 7 Practice", date: "Jul 14, 2026", badge: "Score 160", badgeColor: "bg-blue-500/15 text-blue-400" },
    { title: "IELTS Academic Reading", date: "Jul 12, 2026", badge: "Band 6.5", badgeColor: "bg-violet-500/15 text-violet-400" },
    { title: "Long Passage Practice", date: "Jul 10, 2026", badge: "78%", badgeColor: "bg-emerald-500/15 text-emerald-400" },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        <button className="text-[10px] text-violet-400 hover:text-violet-300">View all</button>
      </div>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-800/80 flex items-center justify-center">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-white truncate">{a.title}</p>
              <p className="text-[10px] text-slate-500">{a.date}</p>
            </div>
            <Badge className={`text-[9px] border-0 ${a.badgeColor}`}>{a.badge}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Achievements (Sidebar) ────────────────────────────
function Achievements() {
  const badges = [
    { label: "50\nPassages", unlocked: true, color: "from-orange-500 to-red-500" },
    { label: "10\nPerfect", unlocked: true, color: "from-amber-500 to-orange-500" },
    { label: "7-Day\nStreak", unlocked: true, color: "from-red-500 to-pink-500" },
    { label: "IELTS\nReader", unlocked: false, color: "from-slate-600 to-slate-700" },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Achievements</h3>
        <button className="text-[10px] text-violet-400 hover:text-violet-300">View all</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {badges.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                b.unlocked
                  ? `bg-gradient-to-br ${b.color}`
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              {b.unlocked ? (
                <Trophy className="h-4 w-4 text-white" />
              ) : (
                <Trophy className="h-4 w-4 text-slate-600" />
              )}
            </div>
            <span className="text-[8px] text-slate-400 text-center leading-tight whitespace-pre-line">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quote Card (Sidebar) ──────────────────────────────
function QuoteCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#1a2340] p-5 relative overflow-hidden">
      <div className="absolute -right-2 -bottom-2 opacity-90">
        <Image
          src="/images/reading/mascot-writing.png"
          alt=""
          width={160}
          height={160}
          className="object-contain"
          unoptimized
        />
      </div>
      <div className="relative z-10">
        <span className="text-3xl text-slate-600 leading-none">&ldquo;</span>
        <p className="text-sm text-white font-medium leading-relaxed mt-1">
          A good reader
          <br />
          is a good thinker.
        </p>
        <p className="text-[10px] text-slate-400 mt-2">
          Keep reading,
          <br />
          keep growing.
        </p>
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-3">
      <span className="text-4xl">📖</span>
      <p className="text-slate-400 text-sm">No reading passages available yet.</p>
    </div>
  );
}
