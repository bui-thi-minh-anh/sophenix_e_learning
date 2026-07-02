"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Headphones,
  BookOpen,
  Clock,
  CheckCircle2,
  Target,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { TopicIllustration } from "@/components/listening/topic-illustration";
import { PhoenixBanner } from "@/components/listening/phoenix-banner";
import { useProgress, topicProgressPct } from "@/lib/listening-progress";
import type { ListeningTopic } from "@/lib/listening";

type Filter = "All" | "Beginner" | "Intermediate" | "IELTS";
type Sort = "Newest" | "Progress" | "A-Z";

// Xếp cấp độ CEFR vào nhóm filter.
function bucket(level: string): Filter {
  if (level.startsWith("A")) return "Beginner";
  if (level.startsWith("B")) return "Intermediate";
  return "IELTS";
}

// Chủ đề khớp filter nếu difficulty của topic thuộc nhóm, hoặc bài trong topic thuộc nhóm.
function topicMatchesFilter(t: ListeningTopic, f: Filter): boolean {
  if (f === "All") return true;
  if (t.difficulty && (t.difficulty === f || bucket(t.difficulty) === f)) return true;
  return t.levels.some((lv) => bucket(lv) === f);
}

function fmtTime(sec: number): string {
  if (sec < 60) return `${Math.round(sec)}s`;
  const m = Math.round(sec / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function ListeningBrowser({ topics }: { topics: ListeningTopic[] }) {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("All");
  const [sort, setSort] = React.useState<Sort>("Newest");
  const progress = useProgress();

  const stats = React.useMemo(() => {
    const entries = Object.values(progress).filter((p) => p.completed);
    const avg = entries.length
      ? Math.round(entries.reduce((n, p) => n + p.accuracy, 0) / entries.length)
      : 0;
    const time = Object.values(progress).reduce((n, p) => n + p.timeSec, 0);
    return { topics: topics.length, completed: entries.length, avg, time };
  }, [progress, topics.length]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = topics.filter((t) => {
      const matchesQuery =
        !q ||
        t.titleEn.toLowerCase().includes(q) ||
        t.titleVi.toLowerCase().includes(q) ||
        t.lessons.some((l) => l.titleEn.toLowerCase().includes(q));
      return matchesQuery && topicMatchesFilter(t, filter);
    });
    list = [...list].sort((a, b) => {
      if (sort === "A-Z") return a.titleEn.localeCompare(b.titleEn);
      if (sort === "Progress") {
        const pa = topicProgressPct(progress, a.topicId, a.lessons.map((l) => l.lessonId));
        const pb = topicProgressPct(progress, b.topicId, b.lessons.map((l) => l.lessonId));
        return pb - pa;
      }
      return a.order - b.order;
    });
    return list;
  }, [topics, query, filter, sort, progress]);

  return (
    <div className="space-y-6">
      {/* Search + Filter + Sort */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative lg:max-w-sm lg:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topic..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["All", "Beginner", "Intermediate", "IELTS"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:border-primary hover:bg-accent",
              )}
            >
              {f}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border bg-background px-3 py-1 text-sm"
            aria-label="Sắp xếp"
          >
            <option value="Newest">Newest</option>
            <option value="Progress">Progress</option>
            <option value="A-Z">A–Z</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Headphones} label="Topics" value={String(stats.topics)} color="violet" />
        <Stat icon={CheckCircle2} label="Listening completed" value={String(stats.completed)} color="emerald" />
        <Stat icon={Target} label="Average accuracy" value={`${stats.avg}%`} color="amber" />
        <Stat icon={Clock} label="Total listening time" value={fmtTime(stats.time)} color="sky" />
      </div>

      {/* Topic Grid: 6 desktop / 3 tablet / 1 mobile */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Headphones}
          title="No listening topics available."
          description="Thêm thư mục chủ đề vào docs/09_PAGE_CONTENT/listening/ để hiển thị ở đây."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          {filtered.map((t) => {
            const pct = topicProgressPct(progress, t.topicId, t.lessons.map((l) => l.lessonId));
            return (
              <Link key={t.topicId} href={`/listening/${t.topicId}`} className="group">
                <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <CardContent className="flex h-full flex-col gap-3 p-4">
                    <TopicIllustration src={t.illustration} emoji={t.emoji} />
                    <div className="flex-1">
                      <h3 className="font-semibold leading-tight group-hover:text-primary">
                        {t.titleEn}
                      </h3>
                      <p className="text-xs text-muted-foreground">{t.ieltsSection}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {t.difficulty && <Badge variant="secondary">{t.difficulty}</Badge>}
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {t.lessonCount}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {fmtTime(t.totalDuration)}
                      </span>
                    </div>
                    <div>
                      <Progress value={pct} className="h-1.5" />
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{pct}%</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Phoenix Banner */}
      <PhoenixBanner />
    </div>
  );
}

const STAT_COLORS: Record<string, string> = {
  violet: "bg-violet-500/15 text-violet-500",
  emerald: "bg-emerald-500/15 text-emerald-500",
  amber: "bg-amber-500/15 text-amber-500",
  sky: "bg-sky-500/15 text-sky-500",
};

function Stat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: keyof typeof STAT_COLORS | string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            STAT_COLORS[color] ?? "bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold leading-none">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
