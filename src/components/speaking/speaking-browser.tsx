"use client";

import * as React from "react";
import { Mic, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpeakingExercise } from "./speaking-exercise";

interface Prompt {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  instruction: string;
  hints: string[];
  durationSec: number;
}

const categoryLabels: Record<string, string> = {
  describe: "Mô tả",
  roleplay: "Đóng vai",
  opinion: "Nêu ý kiến",
  retell: "Kể lại",
};

const levelColors: Record<string, string> = {
  A1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  A2: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  B1: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  B2: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  C1: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  C2: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function SpeakingBrowser() {
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [selected, setSelected] = React.useState<Prompt | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [filterLevel, setFilterLevel] = React.useState<string>("");

  React.useEffect(() => {
    fetch("/api/speaking/prompts")
      .then((r) => r.json())
      .then((data) => setPrompts(data))
      .finally(() => setLoading(false));
  }, []);

  if (selected) {
    return <SpeakingExercise prompt={selected} onBack={() => setSelected(null)} />;
  }

  const levels = [...new Set(prompts.map((p) => p.level))].sort();
  const filtered = filterLevel ? prompts.filter((p) => p.level === filterLevel) : prompts;

  const grouped = filtered.reduce<Record<string, Prompt[]>>((acc, p) => {
    (acc[p.level] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Luyện nói</h1>
        <p className="mt-2 text-muted-foreground">
          Chọn đề bài, nói tiếng Anh, và nhận phản hồi từ AI.
        </p>
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterLevel("")}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${!filterLevel ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          Tất cả
        </button>
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => setFilterLevel(l)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${filterLevel === l ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Đang tải...</div>
      ) : (
        Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([level, items]) => (
            <div key={level} className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${levelColors[level] ?? ""}`}>
                  {level}
                </span>
                {level === "A1" || level === "A2" ? "Cơ bản" : level === "B1" || level === "B2" ? "Trung cấp" : "Nâng cao"}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <Card
                    key={p.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                    onClick={() => setSelected(p)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px]">
                          {categoryLabels[p.category] ?? p.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Clock className="h-3 w-3" />
                          {Math.floor(p.durationSec / 60)} phút
                        </span>
                      </div>
                      <CardTitle className="text-base">{p.title}</CardTitle>
                      <CardDescription>{p.titleVi}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.instruction}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-primary">
                        <Mic className="h-3.5 w-3.5" />
                        Bắt đầu nói
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
}
