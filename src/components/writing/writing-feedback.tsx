"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WritingEvalResult {
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

function scoreColor(score: number) {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function scoreBadge(score: number) {
  if (score >= 80) return "success" as const;
  if (score >= 60) return "warning" as const;
  return "destructive" as const;
}

function ScoreRow({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className={`font-semibold tabular-nums ${scoreColor(score)}`}>{score}/100</span>
      </div>
      <Progress value={score} />
    </div>
  );
}

export function WritingFeedback({ result }: { result: WritingEvalResult }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Kết quả</CardTitle>
            <Badge variant={scoreBadge(result.scoreOverall)} className="text-base px-3 py-1">
              {result.scoreOverall}/100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScoreRow label="Ngữ pháp (Grammar)" score={result.scoreGrammar} />
          <ScoreRow label="Từ vựng (Vocabulary)" score={result.scoreVocabulary} />
          <ScoreRow label="Mạch lạc (Coherence)" score={result.scoreCoherence} />
          <ScoreRow label="Hoàn thành đề (Task)" score={result.scoreTask} />
        </CardContent>
      </Card>

      {result.feedback && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Nhận xét</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{result.feedback}</p>
          </CardContent>
        </Card>
      )}

      {result.corrections && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sửa lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm leading-relaxed whitespace-pre-line">{result.corrections}</div>
          </CardContent>
        </Card>
      )}

      {result.improved && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bài viết cải thiện</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed italic">{result.improved}</p>
          </CardContent>
        </Card>
      )}

      {result.remaining != null && (
        <p className="text-xs text-muted-foreground text-center">
          Còn {result.remaining} lượt chấm hôm nay
        </p>
      )}
    </div>
  );
}
