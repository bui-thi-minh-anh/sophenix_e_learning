import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Languages,
  Headphones,
  Mic,
  BookText,
  PenLine,
  ChevronRight,
  Flame,
  CheckCircle2,
  Star,
  RefreshCw,
} from "lucide-react";

const practiceCards = [
  {
    title: "Lessons",
    desc: "Basic grammar, vocabulary and sentence patterns.",
    href: "/lessons",
    icon: BookOpen,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    title: "Vocabulary",
    desc: "Build your word bank with flashcards.",
    href: "/vocabulary",
    icon: Languages,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    title: "Listening",
    desc: "Train your ears with real conversations.",
    href: "/listening",
    icon: Headphones,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    title: "Speaking",
    desc: "Practice pronunciation with AI feedback.",
    href: "/speaking",
    icon: Mic,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    title: "Reading",
    desc: "Improve comprehension with stories.",
    href: "/reading",
    icon: BookText,
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
  },
  {
    title: "Writing",
    desc: "Write essays, emails and more.",
    href: "/writing",
    icon: PenLine,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
];

const progressStats = [
  {
    value: "7 days",
    subtext: "Keep it up!",
    icon: Flame,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    value: "12",
    subtext: "This month",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    value: "48",
    subtext: "Learned",
    icon: Star,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Hero Banner */}
      <section className="relative -mx-4 -mt-6 overflow-hidden sm:-mx-6 lg:-mx-8 lg:rounded-2xl">
        <div className="relative">
          <Image
            src="/images/brand/hero-banner.jpg"
            alt="Sophie the Phoenix on a mountain cliff at sunset"
            width={1792}
            height={1024}
            className="h-[320px] w-full object-cover object-top sm:h-[360px] md:h-[400px]"
            priority
          />
          {/* Dark overlay on the left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e2a]/80 via-[#0a0e2a]/50 to-transparent" />
          {/* Text content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-8 sm:pl-10">
            <h1 className="max-w-[280px] text-[22px] font-bold leading-[1.25] text-white sm:max-w-xs sm:text-[28px] md:text-[34px]">
              Learn a little
              <br />
              every day,
              <br />
              <span className="italic">rise for real.</span>
            </h1>
            <p className="mt-3 text-xs text-white/50 sm:text-sm">
              Small steps. Big progress.
            </p>
            <Link
              href="/lessons"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
            >
              Continue Learning
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What do you want to practice? */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          What do you want to practice?
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {practiceCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-start gap-3 rounded-xl border border-border/40 bg-card/80 p-3 transition-colors hover:border-border hover:bg-card"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon className={`h-[18px] w-[18px] ${card.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {card.title}
                    </p>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Continue Learning */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Continue Learning
          </h2>
          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3">
          {/* Streak card */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/80 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/15">
              <Flame className="h-5 w-5 text-orange-400" />
            </div>
            <p className="mt-1.5 text-lg font-bold text-foreground">7 days</p>
          </div>
          {/* Current lesson */}
          <div className="flex-1 rounded-xl border border-border/40 bg-card/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Present Simple Tense
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Lesson 4 of 7
                </p>
              </div>
              <span className="text-sm font-bold text-primary">60%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Progress */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Your Progress
          </h2>
          <Link
            href="/lessons"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {progressStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.subtext}
                className="rounded-xl border border-border/40 bg-card/80 p-3 text-center"
              >
                <div
                  className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full ${stat.iconBg}`}
                >
                  <Icon className={`h-[18px] w-[18px] ${stat.iconColor}`} />
                </div>
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8 lg:rounded-2xl">
        <div className="relative">
          <Image
            src="/images/brand/quote-banner.jpg"
            alt="Sophie sleeping peacefully under the stars"
            width={1792}
            height={1024}
            className="h-[160px] w-full object-cover sm:h-[180px]"
          />
          {/* Dark overlay on the left for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e2a]/75 via-[#0a0e2a]/40 to-transparent" />
          {/* Quote text */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-8 sm:pl-10">
            <blockquote className="max-w-[55%] text-[15px] italic leading-relaxed text-white/90 sm:text-base">
              &ldquo;The more you learn,
              <br />
              the higher you rise.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs font-medium text-white/40">
              - Sophenix
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
