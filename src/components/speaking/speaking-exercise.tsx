"use client";

import * as React from "react";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpeechRecorder } from "./speech-recorder";
import { SpeakingFeedback } from "./speaking-feedback";

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

interface EvalResult {
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreFluency: number;
  scoreTask: number;
  scoreOverall: number;
  feedback: string;
  corrections: string;
  suggestedResponse: string;
  remaining?: number;
}

const categoryLabels: Record<string, string> = {
  describe: "Mô tả",
  roleplay: "Đóng vai",
  opinion: "Nêu ý kiến",
  retell: "Kể lại",
};

export function SpeakingExercise({ prompt, onBack }: { prompt: Prompt; onBack: () => void }) {
  const [transcript, setTranscript] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<EvalResult | null>(null);
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/speaking/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt.id, transcript }),
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
    setTranscript("");
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" size="sm" className="gap-1.5 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Prompt card */}
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
                  <span key={h} className="rounded-md border bg-background px-2 py-0.5 text-xs">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recorder or result */}
      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ghi âm câu trả lời</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SpeechRecorder
              onTranscript={setTranscript}
              disabled={loading}
              maxDurationSec={prompt.durationSec}
            />

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!transcript.trim() || loading}
              className="w-full gap-2"
            >
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
          <SpeakingFeedback result={result} />
          <Button onClick={handleRetry} variant="outline" className="w-full">
            Thử lại
          </Button>
        </>
      )}
    </div>
  );
}
