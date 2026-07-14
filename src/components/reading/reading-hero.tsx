"use client";

import { BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
  }));

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </>
  );
}

interface ReadingHeroProps {
  onContinue?: () => void;
  onExplore?: () => void;
  hasContinue?: boolean;
}

export function ReadingHero({ onContinue, onExplore, hasContinue }: ReadingHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl h-[320px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060e1f] via-[#0c1a3a] to-[#1a1040]" />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <Stars />
      </div>

      {/* Moon */}
      <div className="absolute top-10 right-[38%] h-14 w-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 opacity-90 shadow-[0_0_60px_rgba(251,191,36,0.25)]" />

      {/* Clouds */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0c1a3a]/80 to-transparent" />
      <div className="absolute bottom-8 left-[10%] h-6 w-32 rounded-full bg-slate-400/5 blur-xl" />
      <div className="absolute bottom-14 right-[20%] h-5 w-40 rounded-full bg-slate-400/5 blur-xl" />

      {/* Soft orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-96 rounded-full bg-orange-500/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-8 lg:px-12">
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl xl:text-[2.75rem] tracking-tight">
            Read smarter,
            <br />
            understand deeper.
          </h1>
          <p className="text-sm text-slate-300/90 max-w-sm leading-relaxed">
            Every passage you finish expands your world.
          </p>
          <div className="flex gap-3 pt-1">
            {hasContinue && (
              <Button
                onClick={onContinue}
                className="gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
              >
                <BookOpen className="h-4 w-4" />
                Continue Reading
              </Button>
            )}
            <Button
              onClick={onExplore}
              variant="outline"
              className="gap-2 border-white/15 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Compass className="h-4 w-4" />
              Explore Passages
            </Button>
          </div>
        </div>

        {/* Phoenix Explorer placeholder */}
        <div className="hidden lg:flex flex-col items-center justify-center w-[260px] gap-3">
          <div className="relative">
            <span className="text-7xl drop-shadow-2xl" role="img" aria-label="phoenix">
              🔥
            </span>
            <span className="absolute -right-4 -bottom-1 text-3xl" role="img" aria-label="magnifying glass">
              🔍
            </span>
          </div>
          <div className="flex gap-2 opacity-60">
            <span className="text-lg">📖</span>
            <span className="text-sm mt-1">✨</span>
            <span className="text-lg">📄</span>
            <span className="text-xs mt-2">⭐</span>
            <span className="text-lg">📜</span>
          </div>
        </div>
      </div>
    </section>
  );
}
