"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PenLine,
  Play,
  Lock,
  Check,
  ChevronRight,
  BookOpen,
  Clock,
  Target,
  Lightbulb,
  FileText,
  Flame,
  Award,
  Sparkles,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { WritingBrowser } from "./writing-browser";

// ── Data ────────────────────────────────────────────────────────────────────

interface JourneyStep {
  id: number;
  label: string;
  status: "completed" | "current" | "future" | "locked";
}

const journeySteps: JourneyStep[] = [
  { id: 1, label: "Sentence", status: "completed" },
  { id: 2, label: "Paragraph", status: "completed" },
  { id: 3, label: "Email", status: "current" },
  { id: 4, label: "Essay", status: "future" },
  { id: 5, label: "TOEIC Writing", status: "future" },
  { id: 6, label: "IELTS Task 1", status: "locked" },
  { id: 7, label: "IELTS Task 2", status: "locked" },
];

const writingTopics = [
  { title: "Sentence Practice", lessons: 28, difficulty: "Easy" as const, emoji: "✏️" },
  { title: "Paragraph Writing", lessons: 36, difficulty: "Easy" as const, emoji: "📝" },
  { title: "Email Writing", lessons: 24, difficulty: "Medium" as const, emoji: "📧" },
  { title: "Essay Writing", lessons: 28, difficulty: "Medium" as const, emoji: "📄" },
  { title: "TOEIC Writing", lessons: 32, difficulty: "Hard" as const, emoji: "📋" },
  { title: "IELTS Writing", lessons: 38, difficulty: "Hard" as const, emoji: "📑" },
];

const difficultyColors = {
  Easy: "text-emerald-400",
  Medium: "text-orange-400",
  Hard: "text-red-400",
};

const tabs = [
  { id: "daily", label: "Daily Writing", icon: PenLine },
  { id: "toeic", label: "TOEIC Writing", icon: FileText },
  { id: "ielts", label: "IELTS Writing", icon: BookOpen },
  { id: "ai", label: "AI Writing Coach", icon: Bot },
];

// ── Component ───────────────────────────────────────────────────────────────

export function WritingPage() {
  const [view, setView] = React.useState<"hub" | "practice">("hub");
  const [activeTab, setActiveTab] = React.useState("daily");

  if (view === "practice") {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => setView("hub")}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Quay lại
        </button>
        <WritingBrowser />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          <HeroBanner onStart={() => setView("practice")} />
          <WritingJourney />
          <LearningTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <MainContent onStart={() => setView("practice")} />
          <ExploreTopics />
        </div>

        <aside className="hidden space-y-6 xl:block">
          <ProgressCard />
          <RecentWriting />
          <Achievements />
          <QuoteCard />
        </aside>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:hidden">
        <ProgressCard />
        <RecentWriting />
        <Achievements />
        <QuoteCard />
      </div>
    </div>
  );
}

// ── Hero Banner ─────────────────────────────────────────────────────────────

function HeroBanner({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      <Image
        src="/images/writing/hero-banner.jpg"
        alt="Phoenix mascot writing with a feather pen under a starry night sky"
        width={2752}
        height={1536}
        className="h-[320px] w-full object-cover object-top sm:h-[360px] md:h-[400px]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-3 sm:bottom-8 sm:left-10">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 hover:scale-[1.02]"
        >
          <PenLine className="h-4 w-4" />
          Start Writing
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10">
          Continue Course
        </button>
      </div>
    </section>
  );
}

// ── Writing Journey ─────────────────────────────────────────────────────────

function WritingJourney() {
  return (
    <section className="rounded-2xl border border-border/40 bg-card p-5">
      <h2 className="mb-4 text-lg font-semibold">Your Writing Journey</h2>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {journeySteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                  step.status === "completed"
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : step.status === "current"
                      ? "border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                      : step.status === "future"
                        ? "border-blue-500/50 bg-transparent text-blue-400"
                        : "border-border/50 bg-card text-muted-foreground"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="h-5 w-5" />
                ) : step.status === "locked" ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <p
                className={`text-xs font-medium ${
                  step.status === "current" ? "text-purple-400" : step.status === "completed" ? "text-emerald-400" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
            </div>
            {i < journeySteps.length - 1 && (
              <div className={`mx-1 h-0 w-6 shrink-0 border-t-2 border-dashed ${
                step.status === "completed" ? "border-emerald-500/50" : "border-border/40"
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// ── Learning Tabs ───────────────────────────────────────────────────────────

function LearningTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border/40 pb-px">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "border-b-2 border-blue-500 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-orange-400" : ""}`} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── Main Content ────────────────────────────────────────────────────────────

function MainContent({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Continue Learning */}
      <div className="rounded-2xl border border-border/40 bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Continue Learning</h3>
        <div className="flex items-start gap-3">
          <span className="text-3xl">📝</span>
          <div className="flex-1">
            <p className="font-semibold">Paragraph Writing</p>
            <p className="text-xs text-muted-foreground">Descriptive Paragraph</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-blue-400">60%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: "60%" }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>4 / 7 lessons completed</span>
            <span className="font-semibold text-orange-400">+120 XP</span>
          </div>
        </div>
        <button
          onClick={onStart}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:scale-[1.02]"
        >
          <Play className="h-4 w-4" />
          Continue Lesson
        </button>
      </div>

      {/* Daily Writing Challenge */}
      <div className="relative rounded-2xl border border-border/40 bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-sm font-semibold">Daily Writing Challenge</h3>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">New</span>
        </div>
        <div className="rounded-xl border border-border/30 bg-muted/30 p-3">
          <p className="text-sm italic leading-relaxed text-foreground/90">
            Some people prefer to live in the city, while others prefer to live in the countryside.
            Which do you prefer and why?
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Write at least 120 words.</p>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" /> 120+ words
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" /> 100 XP
          </span>
        </div>
        <button
          onClick={onStart}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500/50 bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-400 transition-all hover:bg-orange-500/20 hover:scale-[1.02]"
        >
          Start Writing
        </button>
        {/* Mascot decoration */}
        <Image
          src="/images/writing/mascot-sparkle.png"
          alt="Phoenix mascot"
          width={80}
          height={80}
          className="absolute -right-2 -top-6 h-16 w-16 object-contain xl:h-20 xl:w-20"
        />
      </div>
    </div>
  );
}

// ── Explore Writing Topics ──────────────────────────────────────────────────

function ExploreTopics() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Explore Writing Topics</h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {writingTopics.map((t) => (
          <div
            key={t.title}
            className="flex w-36 shrink-0 flex-col rounded-2xl border border-border/40 bg-card p-4 transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer"
          >
            <span className="mb-3 text-3xl">{t.emoji}</span>
            <p className="text-sm font-semibold">{t.title}</p>
            <div className="mt-auto pt-2 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{t.lessons} lessons</span>
              <span className={`font-semibold ${difficultyColors[t.difficulty]}`}>{t.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Right Sidebar Cards ─────────────────────────────────────────────────────

function ProgressCard() {
  const progress = 65;
  const stats = [
    { icon: BookOpen, label: "Lessons Completed", value: "28", color: "text-blue-400" },
    { icon: FileText, label: "Words Written", value: "12,450", color: "text-emerald-400" },
    { icon: Target, label: "Average Score", value: "78%", color: "text-purple-400" },
    { icon: Flame, label: "Current Streak", value: "7 days", color: "text-orange-400" },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <h3 className="mb-4 text-center text-sm font-semibold">Writing Progress</h3>
      <div className="relative mx-auto mb-3 flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute text-xl font-bold">{progress}%</span>
      </div>
      <p className="mb-4 text-center text-xs text-muted-foreground">Great progress!</p>
      <div className="space-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-muted-foreground">{s.label}</span>
            </div>
            <span className={`font-semibold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentWriting() {
  const items = [
    { title: "IELTS Task 2 Essay", date: "May 12, 2024", badge: "Band 6.5", badgeColor: "text-blue-400 bg-blue-500/15" },
    { title: "TOEIC Email Response", date: "May 10, 2024", badge: "Score 160", badgeColor: "text-emerald-400 bg-emerald-500/15" },
    { title: "Descriptive Paragraph", date: "May 8, 2024", badge: "78%", badgeColor: "text-purple-400 bg-purple-500/15" },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent Writing</h3>
        <button className="text-xs font-medium text-orange-400 hover:text-orange-300">View all</button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-[11px] text-muted-foreground">{item.date}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.badgeColor}`}>
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Achievements() {
  const badges = [
    { label: "100\nSentences", unlocked: true, emoji: "🏅" },
    { label: "10\nEssays", unlocked: true, emoji: "✏️" },
    { label: "7-Day\nStreak", unlocked: true, emoji: "🔥" },
    { label: "IELTS\nWriter", unlocked: false, emoji: "🏆" },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Achievements</h3>
        <button className="text-xs font-medium text-orange-400 hover:text-orange-300">View all</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {badges.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
              b.unlocked
                ? "border-orange-500/30 bg-orange-500/10"
                : "border-border/40 bg-muted/50 grayscale"
            }`}>
              <span className="text-lg">{b.emoji}</span>
              {!b.unlocked && <Lock className="absolute h-3 w-3 text-muted-foreground" />}
            </div>
            <p className="text-center text-[9px] leading-tight text-muted-foreground whitespace-pre-line">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5">
      <div className="flex items-start gap-3">
        <Image
          src="/images/writing/mascot-reading.png"
          alt="Phoenix reading a book"
          width={80}
          height={53}
          className="h-20 w-auto shrink-0 object-contain"
        />
        <div className="flex-1">
          <span className="text-2xl leading-none text-muted-foreground/30">&ldquo;</span>
          <p className="text-sm italic leading-relaxed text-foreground/80">
            Every great writer starts with one sentence.
          </p>
        </div>
      </div>
    </div>
  );
}
