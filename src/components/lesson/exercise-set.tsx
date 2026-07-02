"use client";

import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Exercise, ExerciseSet as TExerciseSet } from "@/content/lessons/types";

// So khớp đáp án cho câu điền từ (bỏ khoảng trắng thừa, không phân biệt hoa/thường).
function isCorrect(ex: Exercise, value: string | undefined): boolean {
  if (value === undefined || value === "") return false;
  if (ex.kind === "fill") {
    const norm = (s: string) => s.trim().toLowerCase();
    const got = norm(value);
    return got === norm(ex.answer) || (ex.acceptable ?? []).some((a) => norm(a) === got);
  }
  return value === ex.answer;
}

// Một bộ bài tập độc lập: mở ra → làm → "Nộp bài" mới chấm (deferred grading) → xem điểm + giải thích.
export function ExerciseSet({ set }: { set: TExerciseSet }) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const total = set.exercises.length;
  const answered = set.exercises.filter((ex) => {
    const v = answers[ex.id];
    return v !== undefined && v !== "";
  }).length;
  const score = set.exercises.filter((ex) => isCorrect(ex, answers[ex.id])).length;

  function setValue(exId: string, value: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [exId]: value }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <Accordion type="single" collapsible className="rounded-lg border bg-card px-4">
      <AccordionItem value={set.id} className="border-b-0">
        <AccordionTrigger>
          <div className="flex flex-1 items-center justify-between gap-3 pr-3">
            <div className="text-left">
              <span className="font-semibold">{set.title}</span>
              {set.description && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {set.description}
                </span>
              )}
            </div>
            {submitted ? (
              <Badge variant={score === total ? "success" : "secondary"}>
                {score}/{total} đúng
              </Badge>
            ) : (
              <Badge variant="outline">
                {answered}/{total}
              </Badge>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {submitted && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-accent/50 p-3">
              <p className="font-semibold">
                Kết quả: {score}/{total} ({Math.round((score / total) * 100)}%)
                {score === total ? " 🎉" : ""}
              </p>
              <Button size="sm" variant="outline" onClick={reset}>
                Làm lại
              </Button>
            </div>
          )}

          {set.exercises.map((ex, index) => {
            const value = answers[ex.id];
            const correct = isCorrect(ex, value);
            return (
              <div key={ex.id} className="rounded-md border p-3">
                <p className="mb-2 font-medium">
                  <span className="text-muted-foreground">Câu {index + 1}.</span> {ex.question}
                </p>

                {ex.kind === "fill" ? (
                  <Input
                    value={value ?? ""}
                    onChange={(e) => setValue(ex.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Nhập câu trả lời…"
                    className={cn(
                      submitted && correct && "border-success",
                      submitted && !correct && "border-destructive"
                    )}
                  />
                ) : (
                  <div className="grid gap-2">
                    {(ex.options ?? []).map((opt) => {
                      const selected = value === opt.key;
                      const showCorrect = submitted && opt.key === ex.answer;
                      const showWrong = submitted && selected && opt.key !== ex.answer;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setValue(ex.id, opt.key)}
                          disabled={submitted}
                          className={cn(
                            "flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                            !submitted && "hover:border-primary hover:bg-accent",
                            selected && !submitted && "border-primary bg-accent",
                            showCorrect && "border-success bg-success/10",
                            showWrong && "border-destructive bg-destructive/10",
                            !selected && !showCorrect && !showWrong && "border-border"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                            {opt.key}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                          {showWrong && <XCircle className="h-5 w-5 text-destructive" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {submitted && (
                  <div
                    className={cn(
                      "mt-2 rounded-md p-2 text-sm",
                      correct ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    )}
                  >
                    <span className="font-semibold">
                      {correct ? "✓ Chính xác. " : `✗ Đáp án đúng: ${ex.answer}. `}
                    </span>
                    {ex.explanation && <span className="text-foreground/80">{ex.explanation}</span>}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-sm text-muted-foreground">
                Đã làm {answered}/{total} câu
              </span>
              <Button onClick={() => setSubmitted(true)} disabled={answered === 0}>
                Nộp bài & chấm điểm
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
