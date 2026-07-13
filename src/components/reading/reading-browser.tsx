"use client";

import * as React from "react";
import { BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReadingExercise } from "./reading-exercise";

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

const levelColors: Record<string, string> = {
  A1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  A2: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  B1: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  B2: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  C1: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const categoryLabels: Record<string, string> = {
  "daily-life": "Đời sống",
  culture: "Văn hóa",
  environment: "Môi trường",
  technology: "Công nghệ",
  science: "Khoa học",
};

export function ReadingBrowser() {
  const [list, setList] = React.useState<PassageSummary[]>([]);
  const [selected, setSelected] = React.useState<PassageFull | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [filterLevel, setFilterLevel] = React.useState("");

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
  };

  if (selected) {
    return <ReadingExercise passage={selected} onBack={() => setSelected(null)} />;
  }

  const levels = [...new Set(list.map((p) => p.level))].sort();
  const filtered = filterLevel ? list.filter((p) => p.level === filterLevel) : list;

  const grouped = filtered.reduce<Record<string, PassageSummary[]>>((acc, p) => {
    (acc[p.level] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Luyện đọc</h1>
        <p className="mt-2 text-muted-foreground">
          Đọc bài viết tiếng Anh và trả lời câu hỏi đọc hiểu.
        </p>
      </div>

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
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((p) => (
                  <Card
                    key={p.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                    onClick={() => handleSelect(p.slug)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px]">
                          {categoryLabels[p.category] ?? p.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          <FileText className="inline h-3 w-3 mr-0.5" />
                          {p.wordCount} từ
                        </span>
                      </div>
                      <CardTitle className="text-base">{p.title}</CardTitle>
                      <CardDescription>{p.titleVi}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.questionCount} câu hỏi</span>
                        <span className="flex items-center gap-1 text-primary">
                          <BookOpen className="h-3.5 w-3.5" />
                          Đọc ngay
                        </span>
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
