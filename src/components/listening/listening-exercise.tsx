"use client";

import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FillBlank, McqItem } from "@/lib/listening";

// ---- Chuẩn hoá & chấm ----
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const tokens = (s: string) => norm(s).split(" ").filter(Boolean);

// Word-level Levenshtein → accuracy cho Dictation.
function wordAccuracy(ref: string, got: string): number {
  const a = tokens(ref);
  const b = tokens(got);
  if (a.length === 0) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const dist = dp[a.length][b.length];
  return Math.max(0, Math.round((1 - dist / a.length) * 100));
}

export interface ExerciseResult {
  correct: number;
  total: number;
  accuracy: number; // 0–100
}

function ResultBanner({ result, onReset }: { result: ExerciseResult; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-accent/50 p-3">
      <p className="font-semibold">
        Kết quả: {result.correct}/{result.total} · Accuracy {result.accuracy}%
        {result.accuracy === 100 ? " 🎉" : ""}
      </p>
      <Button size="sm" variant="outline" onClick={onReset}>
        Làm lại
      </Button>
    </div>
  );
}

// ============ Dạng 1: Dictation ============
export function DictationExercise({
  transcript,
  onResult,
}: {
  transcript: string;
  onResult?: (r: ExerciseResult) => void;
}) {
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  // Transcript sạch (bỏ nhãn speaker "R:") để so khớp và hiển thị đáp án.
  const clean = React.useMemo(
    () =>
      transcript
        .split("\n")
        .map((l) => l.replace(/^[A-Za-z0-9_]{1,12}\s*:\s*/, "").trim())
        .filter(Boolean)
        .join(" "),
    [transcript],
  );
  const acc = submitted ? wordAccuracy(clean, value) : 0;
  const result: ExerciseResult = { correct: Math.round(acc), total: 100, accuracy: acc };

  function submit() {
    setSubmitted(true);
    onResult?.({ correct: Math.round(wordAccuracy(clean, value)), total: 100, accuracy: wordAccuracy(clean, value) });
  }
  function reset() {
    setSubmitted(false);
    setValue("");
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Nghe và chép lại toàn bộ nội dung bạn nghe được.
      </p>
      <Textarea
        rows={6}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={submitted}
        placeholder="Gõ những gì bạn nghe được…"
      />
      {!submitted ? (
        <div className="flex justify-end">
          <Button onClick={submit} disabled={!value.trim()}>
            Nộp bài & chấm điểm
          </Button>
        </div>
      ) : (
        <>
          <ResultBanner result={result} onReset={reset} />
          <div className="rounded-md border p-3">
            <p className="mb-1 text-sm font-semibold">Transcript đúng</p>
            <p className="text-sm leading-relaxed text-foreground/90">{clean}</p>
          </div>
        </>
      )}
    </div>
  );
}

// ============ Dạng 2: Fill in the Blanks ============
export function FillBlanksExercise({
  blanks,
  onResult,
}: {
  blanks: FillBlank[];
  onResult?: (r: ExerciseResult) => void;
}) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const ok = (i: number) => norm(answers[i] ?? "") === norm(blanks[i].answer);
  const correct = blanks.filter((_, i) => ok(i)).length;
  const result: ExerciseResult = {
    correct,
    total: blanks.length,
    accuracy: blanks.length ? Math.round((correct / blanks.length) * 100) : 0,
  };

  function submit() {
    setSubmitted(true);
    onResult?.(result);
  }
  function reset() {
    setSubmitted(false);
    setAnswers({});
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Nghe audio và điền từ còn thiếu.</p>
      {submitted && <ResultBanner result={result} onReset={reset} />}
      <div className="space-y-2">
        {blanks.map((b, i) => {
          const parts = b.text.split("___");
          const correctThis = ok(i);
          return (
            <div key={i} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span className="text-muted-foreground">{i + 1}.</span>
                <span>{parts[0]}</span>
                <Input
                  value={answers[i] ?? ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [i]: e.target.value }))}
                  disabled={submitted}
                  className={cn(
                    "inline-block h-8 w-40",
                    submitted && correctThis && "border-success",
                    submitted && !correctThis && "border-destructive",
                  )}
                  placeholder="…"
                />
                <span>{parts[1] ?? ""}</span>
              </div>
              {submitted && !correctThis && (
                <p className="mt-1 text-xs text-success">Đáp án: {b.answer}</p>
              )}
            </div>
          );
        })}
      </div>
      {!submitted && (
        <div className="flex justify-end">
          <Button onClick={submit} disabled={Object.keys(answers).length === 0}>
            Nộp bài & chấm điểm
          </Button>
        </div>
      )}
    </div>
  );
}

// ============ Dạng 3: Multiple Choice ============
const LETTERS = ["A", "B", "C", "D"];

export function MultipleChoiceExercise({
  items,
  onResult,
}: {
  items: McqItem[];
  onResult?: (r: ExerciseResult) => void;
}) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const correct = items.filter((it, i) => answers[i] === it.answer).length;
  const result: ExerciseResult = {
    correct,
    total: items.length,
    accuracy: items.length ? Math.round((correct / items.length) * 100) : 0,
  };

  function submit() {
    setSubmitted(true);
    onResult?.(result);
  }
  function reset() {
    setSubmitted(false);
    setAnswers({});
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Nghe audio rồi chọn đáp án đúng.</p>
      {submitted && <ResultBanner result={result} onReset={reset} />}
      {items.map((it, qi) => {
        const chosen = answers[qi];
        return (
          <div key={qi} className="rounded-md border p-3">
            <p className="mb-2 font-medium">
              <span className="text-muted-foreground">Câu {qi + 1}.</span> {it.question}
            </p>
            <div className="grid gap-2">
              {it.options.map((opt, oi) => {
                const letter = LETTERS[oi];
                const selected = chosen === letter;
                const showCorrect = submitted && letter === it.answer;
                const showWrong = submitted && selected && letter !== it.answer;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((p) => ({ ...p, [qi]: letter }))}
                    className={cn(
                      "flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      !submitted && "hover:border-primary hover:bg-accent",
                      selected && !submitted && "border-primary bg-accent",
                      showCorrect && "border-success bg-success/10",
                      showWrong && "border-destructive bg-destructive/10",
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                      {letter}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                    {showWrong && <XCircle className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {submitted && it.explanation && (
              <p className="mt-2 rounded-md bg-accent/50 p-2 text-sm text-foreground/80">
                {it.explanation}
              </p>
            )}
          </div>
        );
      })}
      {!submitted && (
        <div className="flex justify-end">
          <Button onClick={submit} disabled={Object.keys(answers).length === 0}>
            Nộp bài & chấm điểm
          </Button>
        </div>
      )}
    </div>
  );
}

export { type ExerciseResult as Result };
