"use client";

import * as React from "react";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Clock, HelpCircle, RotateCcw } from "lucide-react";
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
  const [activeQ, setActiveQ] = React.useState(0);

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
    setActiveQ(0);
  };

  const getQuestionResult = (qId: string) => result?.results.find((r) => r.questionId === qId);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" size="sm" className="gap-1.5 -ml-2 text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Badge variant="outline" className="border-white/10">{passage.level}</Badge>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{passage.wordCount} words</span>
          <span className="flex items-center gap-1"><HelpCircle className="h-3 w-3" />{passage.questions.length}q</span>
        </div>
      </div>

      {/* Result banner */}
      {result && (
        <div className={`rounded-2xl p-4 flex items-center justify-between ${
          result.accuracy >= 80 ? "bg-emerald-500/10 border border-emerald-500/30" :
          result.accuracy >= 60 ? "bg-amber-500/10 border border-amber-500/30" :
          "bg-red-500/10 border border-red-500/30"
        }`}>
          <div>
            <p className="font-semibold text-white">
              Score: {result.score}/{result.total}
            </p>
            <p className="text-xs text-slate-400">Accuracy: {result.accuracy}%</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-bold ${
              result.accuracy >= 80 ? "text-emerald-400" : result.accuracy >= 60 ? "text-amber-400" : "text-red-400"
            }`}>
              {result.accuracy}%
            </span>
            <Button onClick={handleRetry} variant="outline" size="sm" className="gap-1.5 border-white/15 text-white">
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Split layout */}
      <div className="grid gap-4 lg:grid-cols-[1fr,420px]">
        {/* Left: Passage */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-6 lg:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <h1 className="text-xl font-bold text-white mb-1">{passage.title}</h1>
          <p className="text-xs text-slate-400 mb-6">{passage.titleVi}</p>
          <div className="text-sm text-slate-200/90 leading-[1.9] whitespace-pre-line selection:bg-blue-500/30">
            {passage.passage}
          </div>
        </div>

        {/* Right: Questions */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-5 max-h-[calc(100vh-200px)] overflow-y-auto space-y-4">
          {/* Question navigation */}
          <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/[0.08]">
            {passage.questions.map((q, i) => {
              const qResult = getQuestionResult(q.id);
              const answered = !!answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQ(i)}
                  className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                    qResult
                      ? qResult.correct
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                      : activeQ === i
                        ? "bg-blue-600 text-white"
                        : answered
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-white/5 text-slate-400 border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Questions */}
          {passage.questions.map((q, qi) => {
            const qResult = getQuestionResult(q.id);
            if (qi !== activeQ && !result) return null;
            if (result && qi !== activeQ) return null;

            return (
              <div key={q.id} className="space-y-3">
                <p className="text-sm font-medium text-white">
                  <span className="text-blue-400 mr-1.5">Q{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const letter = optionLetters[oi];
                    const selected = answers[q.id] === letter;
                    const isCorrect = qResult && qResult.correctAnswer === letter;
                    const isWrong = qResult && selected && !qResult.correct;

                    let cls = "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all text-left ";
                    if (result) {
                      if (isCorrect) cls += "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
                      else if (isWrong) cls += "border border-red-500/40 bg-red-500/10 text-red-300";
                      else cls += "border border-white/[0.06] text-slate-500";
                    } else {
                      cls += selected
                        ? "border border-blue-500/50 bg-blue-500/15 text-blue-300"
                        : "border border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-white/[0.03]";
                    }

                    return (
                      <button key={letter} className={cls} onClick={() => handleSelect(q.id, letter)} disabled={!!result}>
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                          selected && !result ? "border-blue-400 bg-blue-500/20" :
                          isCorrect ? "border-emerald-400 bg-emerald-500/20" :
                          isWrong ? "border-red-400 bg-red-500/20" :
                          "border-white/20"
                        }`}>
                          {letter}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {result && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                        {result && isWrong && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {qResult?.explanation && (
                  <p className="text-xs text-slate-400 pl-1 pt-1">{qResult.correct ? "✓" : "✗"} {qResult.explanation}</p>
                )}
              </div>
            );
          })}

          {/* Navigation + Submit */}
          {!result && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
              <Button
                variant="outline"
                size="sm"
                disabled={activeQ === 0}
                onClick={() => setActiveQ((p) => p - 1)}
                className="border-white/15 text-white"
              >
                Prev
              </Button>
              {activeQ < passage.questions.length - 1 ? (
                <Button
                  size="sm"
                  onClick={() => setActiveQ((p) => p + 1)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!allAnswered || loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Submit ({Object.keys(answers).length}/{passage.questions.length})
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
