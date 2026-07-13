"use client";

import * as React from "react";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WritingFeedback } from "./writing-feedback";

interface Prompt {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  instruction: string;
  hints: string[];
  minWords: number;
  maxWords: number;
}

interface EvalResult {
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreCoherence: number;
  scoreTask: number;
  scoreOverall: number;
  feedback: string;
  corrections: string;
  improved: string;
  remaining?: number;
}

const categoryLabels: Record<string, string> = {
  personal: "Cá nhân",
  descriptive: "Mô tả",
  narrative: "Tường thuật",
  letter: "Thư",
  opinion: "Quan điểm",
  "problem-solution": "Vấn đề & Giải pháp",
  report: "Báo cáo",
  discussion: "Thảo luận",
};

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function WritingExercise({ prompt, onBack }: { prompt: Prompt; onBack: () => void }) {
  const [essay, setEssay] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<EvalResult | null>(null);
  const [error, setError] = React.useState("");

  const words = wordCount(essay);
  const canSubmit = words >= prompt.minWords && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/writing/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt.id, essay }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Đã xảy ra lỗi.");
        return;
      }
      setResult(data);
    } catch {
      setError("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setEssay("");
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" size="sm" className="gap-1.5 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{prompt.level}</Badge>
            <Badge variant="secondary">{categoryLabels[prompt.category] ?? prompt.category}</Badge>
          </div>
          <CardTitle>{prompt.title}</CardTitle>
          <CardDescription>{prompt.titleVi}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Đề bài:</p>
            <p className="text-sm leading-relaxed">{prompt.instruction}</p>
          </div>

          {prompt.hints.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Gợi ý cụm từ:</p>
              <div className="flex flex-wrap gap-1.5">
                {prompt.hints.map((h) => (
                  <span key={h} className="rounded-md border bg-background px-2 py-0.5 text-xs">{h}</span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Yêu cầu: {prompt.minWords}–{prompt.maxWords} từ
          </p>
        </CardContent>
      </Card>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bài viết của bạn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Viết bài tiếng Anh ở đây..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              disabled={loading}
              className="min-h-[200px] resize-y"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className={words < prompt.minWords ? "text-destructive" : ""}>
                {words} / {prompt.minWords}–{prompt.maxWords} từ
              </span>
              {words > prompt.maxWords && (
                <span className="text-yellow-600 dark:text-yellow-400">Vượt giới hạn khuyến nghị</span>
              )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI đang chấm...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Gửi để chấm điểm
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <WritingFeedback result={result} />
          <Button onClick={handleRetry} variant="outline" className="w-full">Viết lại</Button>
        </>
      )}
    </div>
  );
}
