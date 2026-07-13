"use client";

import * as React from "react";
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question: string;
  options: string[];
  order: number;
}

interface Passage {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  passage: string;
  wordCount: number;
  questions: Question[];
}

interface QuestionResult {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  explanation: string | null;
}

interface SubmitResult {
  score: number;
  total: number;
  accuracy: number;
  results: QuestionResult[];
}

const optionLetters = ["A", "B", "C", "D"];

export function ReadingExercise({ passage, onBack }: { passage: Passage; onBack: () => void }) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<SubmitResult | null>(null);
  const [loading, setLoading] = React.useState(false);

  const allAnswered = passage.questions.every((q) => answers[q.id]);

  const handleSelect = (questionId: string, letter: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reading/${passage.slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
  };

  const getQuestionResult = (qId: string) =>
    result?.results.find((r) => r.questionId === qId);

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" size="sm" className="gap-1.5 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Passage */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{passage.level}</Badge>
            <span className="text-xs text-muted-foreground">{passage.wordCount} từ</span>
          </div>
          <CardTitle>{passage.title}</CardTitle>
          <CardDescription>{passage.titleVi}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed whitespace-pre-line">
            {passage.passage}
          </div>
        </CardContent>
      </Card>

      {/* Result summary */}
      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">
                  Kết quả: {result.score}/{result.total}
                </p>
                <p className="text-sm text-muted-foreground">Độ chính xác: {result.accuracy}%</p>
              </div>
              <Badge
                variant={result.accuracy >= 80 ? "success" : result.accuracy >= 60 ? "warning" : "destructive"}
                className="text-base px-3 py-1"
              >
                {result.accuracy}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Câu hỏi</h2>
        {passage.questions.map((q, qi) => {
          const qResult = getQuestionResult(q.id);
          return (
            <Card key={q.id}>
              <CardContent className="pt-6 space-y-3">
                <p className="text-sm font-medium">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const letter = optionLetters[oi];
                    const selected = answers[q.id] === letter;
                    const isCorrect = qResult && qResult.correctAnswer === letter;
                    const isWrong = qResult && selected && !qResult.correct;

                    let optClass = "border rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2";
                    if (result) {
                      if (isCorrect) optClass += " border-green-500 bg-green-50 dark:bg-green-950/30";
                      else if (isWrong) optClass += " border-red-500 bg-red-50 dark:bg-red-950/30";
                      else optClass += " opacity-60";
                    } else {
                      optClass += selected
                        ? " border-primary bg-primary/10"
                        : " hover:bg-muted/50";
                    }

                    return (
                      <button
                        key={letter}
                        className={optClass}
                        onClick={() => handleSelect(q.id, letter)}
                        disabled={!!result}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                          {letter}
                        </span>
                        <span className="flex-1 text-left">{opt}</span>
                        {result && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                        {result && isWrong && <XCircle className="h-4 w-4 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {qResult?.explanation && (
                  <p className="text-xs text-muted-foreground mt-2 pl-1">
                    {qResult.correct ? "✓" : "✗"} {qResult.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!result ? (
        <Button onClick={handleSubmit} disabled={!allAnswered || loading} className="w-full gap-2">
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Đang chấm...</>
          ) : (
            `Nộp bài (${Object.keys(answers).length}/${passage.questions.length})`
          )}
        </Button>
      ) : (
        <Button onClick={handleRetry} variant="outline" className="w-full">Làm lại</Button>
      )}
    </div>
  );
}
