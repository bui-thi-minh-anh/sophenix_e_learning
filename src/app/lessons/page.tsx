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
  ChevronRight,

  Check,
  Lock,
  Play,
  Star,
  Flame,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { getAllLessons } from "@/content/lessons";
import type { Lesson } from "@/content/lessons/types";
import type { Level } from "@/content/lessons/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { matchesQuery } from "@/lib/search";

// ─── Constants ──────────────────────────────────────────
const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Sơ cấp", value: "A" },
  { label: "Trung cấp", value: "B1" },
  { label: "Cao cấp", value: "B2" },
] as const;

const roadmapLevels = [
  { key: "A0", label: "Beginner" },
  { key: "A1", label: "Elementary" },
  { key: "A2", label: "Pre-Intermediate" },
  { key: "B1", label: "Intermediate" },
  { key: "B2", label: "Upper-Intermediate" },
  { key: "C1", label: "Advanced" },
];

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

function estimateTime(lesson: Lesson): number {
  const exerciseCount = lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0);
  return Math.max(5, Math.ceil(exerciseCount * 0.8 + lesson.sections.length * 3));
}

function xpReward(lesson: Lesson): number {
  const exerciseCount = lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0);
  return exerciseCount * 10 + lesson.sections.length * 5;
}

// ─── Main Page ──────────────────────────────────────────
export default function LessonsPage() {
  const lessons = getAllLessons();
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [showAllCategories, setShowAllCategories] = React.useState(false);
  const lessonsRef = React.useRef<HTMLDivElement>(null);

  const filtered = lessons.filter(
    (l) => matchesFilter(l.level, filter) && matchesQuery(query, l.title, l.topic, l.summary)
  );

  const categories = [...new Set(lessons.map((l) => l.topic))];

  const scrollToLessons = () => {
    lessonsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl flex gap-6">
      {/* ── Main Content ─────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Hero Banner */}
        <LessonsHero onBrowse={scrollToLessons} />

        {/* Learning Roadmap */}
        <LearningRoadmap currentLevel="B1" />

        {/* Search */}
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

        {/* Continue Learning + Categories row */}
        <div className="flex gap-4">
          {/* Continue Learning */}
          <div className="flex-1 min-w-0">
            <ContinueLearning lesson={lessons[0]} />
          </div>

          {/* Categories */}
          <section className="w-[320px] shrink-0 rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Chủ đề ngữ pháp</h2>
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-[10px] text-orange-400 hover:text-orange-300"
              >
                {showAllCategories ? "Thu gọn" : "Xem tất cả"}
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(showAllCategories ? categories : categories.slice(0, 3)).map((topic) => {
                const Icon = getIcon(topic);
                const color = getColor(topic);
                const count = lessons.filter((l) => l.topic === topic).length;
                return (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="flex flex-col items-center gap-1.5 w-[72px] hover:scale-[1.03] transition-all"
                  >
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${color.icon}`} />
                    </div>
                    <p className="text-[10px] font-medium text-white text-center leading-tight">{topic}</p>
                    <p className="text-[8px] text-slate-400">{count} bài giảng</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Lessons Preview */}
        <section ref={lessonsRef} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Tất cả bài giảng <span className="text-slate-400 font-normal">({lessons.length})</span>
            </h2>
            <Link href="/lessons/all" className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-0.5">
              Xem tất cả <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lessons.slice(0, 4).map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </section>
      </div>

      {/* ── Right Sidebar ────────────────────────── */}
      <aside className="hidden xl:block w-[280px] shrink-0 space-y-4">
        <TodaysGoal />
        <LearningStats lessonCount={lessons.length} />
        <RecentLessons lessons={lessons} />
        <AchievementsPanel />
        <QuoteCard />
      </aside>
    </div>
  );
}

// ─── Hero Banner ────────────────────────────────────────
function LessonsHero({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#060e1f] mx-auto" style={{ maxWidth: 753, height: 340 }}>
      <Image
        src="/images/lessons/hero-banner.png"
        alt="Lessons hero"
        fill
        className="object-contain object-right"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060e1f]/85 via-[#060e1f]/50 to-transparent" />

      <div className="absolute inset-0 z-10 flex items-center px-8 lg:px-12">
        <div className="flex-1 space-y-4 max-w-sm">
          <h1 className="text-2xl font-bold leading-tight text-white lg:text-3xl tracking-tight">
            Learn a little every day,
            <br />
            <span className="text-orange-400">master for life.</span>
          </h1>
          <p className="text-sm text-slate-300/90 leading-relaxed">
            Step by step, you will go further.
          </p>
          <div className="flex gap-3 pt-1">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20">
              <BookOpen className="h-4 w-4" />
              Continue Learning
            </Button>
            <Button onClick={onBrowse} variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              <Search className="h-4 w-4" />
              Browse Lessons
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Learning Roadmap ───────────────────────────────────
function LearningRoadmap({ currentLevel }: { currentLevel: string }) {
  const currentIdx = roadmapLevels.findIndex((l) => l.key === currentLevel);

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Your Learning Path</h3>
      <div className="overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex items-center gap-0 min-w-max justify-between px-2">
          {roadmapLevels.map((level, i) => {
            const status = i < currentIdx ? "completed" : i === currentIdx ? "current" : "locked";
            return (
              <div key={level.key} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    status === "completed"
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : status === "current"
                        ? "border-blue-500 bg-blue-600 text-white ring-4 ring-blue-500/20"
                        : "border-slate-600/50 bg-slate-800/30 text-slate-500"
                  }`}>
                    {status === "completed" ? <Check className="h-4 w-4" /> : status === "locked" ? <Lock className="h-3.5 w-3.5" /> : level.key}
                  </div>
                  <span className={`text-[10px] font-medium text-center w-[80px] leading-tight ${
                    status === "completed" ? "text-emerald-400/80" : status === "current" ? "text-blue-400" : "text-slate-500"
                  }`}>
                    {level.label}
                  </span>
                </div>
                {i < roadmapLevels.length - 1 && (
                  <div className={`h-[2px] w-8 mx-0.5 mt-[-1.5rem] rounded-full ${
                    i < currentIdx ? "bg-emerald-500/40" : "bg-slate-700/50"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Continue Learning ──────────────────────────────────
function ContinueLearning({ lesson }: { lesson: Lesson }) {
  const exerciseCount = lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0);
  const time = estimateTime(lesson);
  const xp = xpReward(lesson);

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <h3 className="text-sm font-semibold text-white">Continue Learning</h3>
      <div className="flex gap-4 items-center">
        <Image
          src="/images/lessons/mascot-reading.png"
          alt="Continue"
          width={160}
          height={160}
          className="object-contain shrink-0"
          unoptimized
        />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white truncate">{lesson.title}</p>
            <Badge className={`text-[9px] border ${levelBadgeClass(lesson.level)}`}>{lesson.level}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
            </div>
            <span className="text-[10px] text-slate-400">60%</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{time} phút</span>
            <span className="flex items-center gap-1"><Puzzle className="h-3 w-3" />{exerciseCount} bài tập</span>
            <span className="flex items-center gap-1 text-orange-400"><Star className="h-3 w-3 fill-orange-400" />+{xp} XP</span>
          </div>
          <Link href={`/lessons/${lesson.slug}`}>
            <Button size="sm" className="gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs h-8 px-3 mt-1">
              <Play className="h-3 w-3" />
              Tiếp tục học
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Lesson Card ────────────────────────────────────────
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

// ─── Today's Goal (Sidebar) ─────────────────────────────
function TodaysGoal() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">Mục tiêu hôm nay</h3>
        <p className="text-[10px] text-slate-400">Chỉ cần 20 phút mỗi ngày!</p>
      </div>
      <div className="flex justify-center">
        <ProgressCircle value={45} size={100} label="45%" />
      </div>
      <div className="text-center text-xs text-slate-400">18 / 40 phút</div>
      <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white text-sm">
        Tiếp tục học
      </Button>
    </div>
  );
}

// ─── Learning Stats (Sidebar) ───────────────────────────
function LearningStats({ lessonCount }: { lessonCount: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <h3 className="text-sm font-semibold text-white">Thống kê học tập</h3>
      <div className="space-y-2.5">
        {[
          { icon: BookOpen, label: "Bài giảng đã học", value: "48", color: "text-blue-400" },
          { icon: Target, label: "Bài tập đã làm", value: "326", color: "text-emerald-400" },
          { icon: TrendingUp, label: "Điểm trung bình", value: "78%", color: "text-amber-400" },
          { icon: Flame, label: "Chuỗi ngày hiện tại", value: "7 ngày", color: "text-orange-400" },
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

// ─── Recent Lessons (Sidebar) ───────────────────────────
function RecentLessons({ lessons }: { lessons: Lesson[] }) {
  const recents = lessons.slice(0, 3);
  const progressValues = [60, 30, 90];
  const progressColors = ["text-blue-400", "text-violet-400", "text-emerald-400"];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Bài học gần đây</h3>
        <button className="text-[10px] text-blue-400 hover:text-blue-300">Xem tất cả</button>
      </div>
      <div className="space-y-2.5">
        {recents.map((l, i) => {
          const Icon = getIcon(l.topic);
          const color = getColor(l.topic);
          return (
            <Link key={l.slug} href={`/lessons/${l.slug}`} className="flex items-center gap-2.5 group">
              <Badge className={`text-[9px] border ${levelBadgeClass(l.level)} shrink-0`}>{l.level}</Badge>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">{l.title}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="h-1 w-10 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${progressValues[i]}%` }} />
                </div>
                <span className={`text-[10px] font-semibold ${progressColors[i]}`}>{progressValues[i]}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Achievements (Sidebar) ─────────────────────────────
function AchievementsPanel() {
  const badges = [
    { label: "100\nBài giảng", unlocked: true, color: "from-orange-500 to-red-500" },
    { label: "10 ngày\nLiên tiếp", unlocked: true, color: "from-red-500 to-orange-500" },
    { label: "500\nBài tập", unlocked: true, color: "from-amber-500 to-orange-500" },
    { label: "Chuyên gia\nNgữ pháp", unlocked: false, color: "" },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Thành tích</h3>
        <button className="text-[10px] text-blue-400 hover:text-blue-300">Xem tất cả</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {badges.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              b.unlocked ? `bg-gradient-to-br ${b.color}` : "bg-slate-800 border border-slate-700"
            }`}>
              <Trophy className={`h-4 w-4 ${b.unlocked ? "text-white" : "text-slate-600"}`} />
            </div>
            <span className="text-[8px] text-slate-400 text-center leading-tight whitespace-pre-line">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quote Card (Sidebar) ──────────────────────────────
function QuoteCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#1a2340] p-6 relative overflow-hidden min-h-[140px] flex items-center justify-center">
      <div className="absolute right-2 bottom-2">
        <Image src="/images/lessons/mascot-graduation.png" alt="" width={120} height={120} className="object-contain" unoptimized />
      </div>
      <div className="relative z-10 w-full pr-16 pl-4">
        <span className="text-3xl text-slate-500 leading-none">&ldquo;</span>
        <p className="text-base text-white font-bold leading-snug">
          Knowledge
          <br />
          is power.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Keep learning, keep growing.
        </p>
      </div>
    </div>
  );
}

// ─── Progress Circle ────────────────────────────────────
function ProgressCircle({ value, size, label }: { value: number; size: number; label: string }) {
  const r = (size - 14) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={center} cy={center} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle
          cx={center} cy={center} r={r} fill="none"
          stroke="url(#goal-grad)"
          strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="goal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">{label}</span>
      </div>
    </div>
  );
}
