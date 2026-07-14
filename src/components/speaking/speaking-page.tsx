"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Play,
  Volume2,
  Lock,
  Check,
  ChevronRight,
  BookOpen,
  Clock,
  Target,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { SpeakingBrowser } from "./speaking-browser";

// ── Data ────────────────────────────────────────────────────────────────────

interface JourneyStep {
  id: number;
  label: string;
  icon: LucideIcon;
  status: "completed" | "current" | "locked";
}

const journeySteps: JourneyStep[] = [
  { id: 1, label: "IPA", icon: Mic, status: "current" },
  { id: 2, label: "Words", icon: BookOpen, status: "locked" },
  { id: 3, label: "Word Pairs", icon: BookOpen, status: "locked" },
  { id: 4, label: "Sentences", icon: BookOpen, status: "locked" },
  { id: 5, label: "Paragraphs", icon: BookOpen, status: "locked" },
  { id: 6, label: "Conversation", icon: BookOpen, status: "locked" },
  { id: 7, label: "IELTS Speaking", icon: Target, status: "locked" },
];

interface IPASound {
  symbol: string;
  word: string;
  unlocked: boolean;
}

const ipaSounds: IPASound[] = [
  { symbol: "/iː/", word: "see", unlocked: false },
  { symbol: "/ɪ/", word: "sit", unlocked: false },
  { symbol: "/ʊ/", word: "book", unlocked: false },
  { symbol: "/uː/", word: "food", unlocked: false },
  { symbol: "/ɔː/", word: "law", unlocked: false },
];

const pronunciationTips = [
  "Open your mouth slightly.",
  "Relax your jaw.",
  'Make a short "a" sound.',
  "Keep it short and clear.",
];

// ── Component ───────────────────────────────────────────────────────────────

export function SpeakingPage() {
  const [view, setView] = React.useState<"hub" | "practice">("hub");

  if (view === "practice") {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => setView("hub")}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Quay lại
        </button>
        <SpeakingBrowser />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      {/* ── Main grid: content + right sidebar ─────────────── */}
      <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
        {/* Left / Main content */}
        <div className="min-w-0 space-y-8">
          <HeroBanner onStart={() => setView("practice")} />
          <JourneyRoadmap />
          <PracticeIPA />
          <MoreIPASounds />
        </div>

        {/* Right sidebar */}
        <aside className="hidden space-y-6 xl:block">
          <ProgressCard />
          <DailyGoalCard />
          <MotivationalCard />
          <SpeakingTipsCard />
        </aside>
      </div>

      {/* On smaller screens, sidebar cards flow below main content */}
      <div className="grid gap-4 sm:grid-cols-2 xl:hidden">
        <ProgressCard />
        <DailyGoalCard />
        <MotivationalCard />
        <SpeakingTipsCard />
      </div>
    </div>
  );
}

// ── Hero Banner ─────────────────────────────────────────────────────────────

function HeroBanner({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      <Image
        src="/images/speaking/hero-banner.png"
        alt="Phoenix mascot holding a microphone under a starry night sky"
        width={2752}
        height={1536}
        className="h-[280px] w-full scale-110 object-cover sm:h-[320px] md:h-[360px]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/60 to-transparent" />
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-10">
        <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          Speak today,
          <br />
          <span className="text-orange-400">shine tomorrow.</span>
        </h1>
        <p className="mt-3 max-w-sm text-sm text-white/60">
          Every word you speak is a step forward.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 hover:scale-[1.02]"
          >
            <Mic className="h-4 w-4" />
            Start Speaking
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10">
            Continue Course
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Journey Roadmap ─────────────────────────────────────────────────────────

function JourneyRoadmap() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Your Speaking Journey</h2>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {journeySteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                  step.status === "current"
                    ? "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : step.status === "completed"
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
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
              <div className="text-center">
                <p className="text-[10px] font-medium text-muted-foreground">
                  {step.id}
                </p>
                <p
                  className={`text-xs font-medium ${step.status === "current" ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {i < journeySteps.length - 1 && (
              <ChevronRight className="mx-1 h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// ── Practice IPA ────────────────────────────────────────────────────────────

function PracticeIPA() {
  return (
    <section>
      <h2 className="text-lg font-semibold">Practice IPA</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Learn the sounds of English.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* IPA symbol card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card p-6 text-center">
          <p className="text-5xl font-bold text-foreground">/&aelig;/</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>as in</span>
            <span className="font-semibold text-foreground">cat</span>
            <button className="ml-1 rounded-full p-1 text-blue-400 transition-colors hover:bg-blue-500/10">
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mouth illustration card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card p-6">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-400/20 to-orange-400/20">
            <span className="text-5xl">👄</span>
          </div>
          <button className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-400 hover:scale-105">
            <Play className="ml-0.5 h-4 w-4" />
          </button>
        </div>

        {/* Pronunciation tips card */}
        <div className="rounded-2xl border border-border/40 bg-card p-6">
          <h3 className="mb-3 text-sm font-semibold">
            How to pronounce /&aelig;/
          </h3>
          <ul className="space-y-2">
            {pronunciationTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                {tip}
              </li>
            ))}
          </ul>
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:scale-[1.02]">
            <Mic className="h-4 w-4" />
            Practice Now
          </button>
        </div>
      </div>
    </section>
  );
}

// ── More IPA Sounds ─────────────────────────────────────────────────────────

function MoreIPASounds() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">More IPA Sounds</h2>
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {ipaSounds.map((s) => (
          <div
            key={s.symbol}
            className="flex shrink-0 flex-col items-center rounded-2xl border border-border/40 bg-card px-5 py-4 transition-all hover:scale-[1.02]"
          >
            <p className="text-xl font-bold text-foreground">{s.symbol}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.word}</p>
            {!s.unlocked && <Lock className="mt-2 h-3.5 w-3.5 text-muted-foreground/50" />}
          </div>
        ))}
        <Link
          href="#"
          className="flex shrink-0 items-center gap-1 rounded-2xl border border-border/40 bg-card px-5 py-6 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

// ── Right Sidebar Cards ─────────────────────────────────────────────────────

function ProgressCard() {
  const progress = 65;
  const stats = [
    { icon: BookOpen, label: "Lessons Completed", value: "18/28", color: "text-blue-400" },
    { icon: Clock, label: "Speaking Time", value: "4h 32m", color: "text-emerald-400" },
    { icon: Mic, label: "Words Practiced", value: "246", color: "text-orange-400" },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-center">Speaking Progress</h3>
      {/* Circular progress */}
      <div className="relative mx-auto mb-3 flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute text-xl font-bold">{progress}%</span>
      </div>
      <p className="mb-4 text-center text-xs text-muted-foreground">You&apos;re doing great!</p>
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

function DailyGoalCard() {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <h3 className="mb-1 text-sm font-semibold">Today&apos;s Goal</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Practice speaking for 15 minutes
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
          style={{ width: "67%" }}
        />
      </div>
      <p className="mt-1.5 text-right text-xs text-muted-foreground">10/15 min</p>
    </div>
  );
}

function MotivationalCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-[#1a1a4a]">
      <Image
        src="/images/speaking/mascot-motivational.png"
        alt="Phoenix mascot giving thumbs up — You can do it!"
        width={320}
        height={320}
        className="mx-auto h-44 w-auto object-contain"
      />
    </div>
  );
}

function SpeakingTipsCard() {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-5">
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold">Speaking Tips</h3>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Don&apos;t worry about making mistakes. Focus on communicating clearly.
      </p>
      <Link
        href="#"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
      >
        Learn more <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
