"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReadingHeroProps {
  onExplore?: () => void;
}

export function ReadingHero({ onExplore }: ReadingHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#0a1229] h-[340px] sm:h-[400px]">
      <Image
        src="/images/reading/hero-banner.jpg"
        alt="Read more, know more"
        fill
        className="object-cover object-top"
        priority
        unoptimized
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <div className="flex gap-3">
          <Button
            onClick={onExplore}
            className="gap-2 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20"
          >
            <BookOpen className="h-4 w-4" />
            Start Reading
          </Button>
          <Button
            onClick={onExplore}
            variant="outline"
            className="gap-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            Continue Course
          </Button>
        </div>
      </div>
    </section>
  );
}
