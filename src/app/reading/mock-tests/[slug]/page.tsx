"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  HelpCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── types ─── */

interface Question {
  id: string;
  kind: string;
  question: string;
  options: string[];
  order: number;
}

interface Section {
  order: number;
  passage: {
    id: string;
    slug: string;
    title: string;
    titleVi: string;
    level: string;
    passage: string;
    wordCount: number;
    questions: Question[];
  };
}

interface Exam {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  type: string;
  timeMinutes: number;
  sections: Section[];
}

interface SubmitResponse {
  score: number;
  total: number;
  accuracy: number;
  band: number;
  results: Record<
    string,
    {
      correct: boolean;
      yourAnswer: string;
      correctAnswer: string;
      explanation: string | null;
    }
  >;
}

const optionLetters = ["A", "B", "C", "D"];

/* ─── page ─── */

export default function MockTestPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [exam, setExam] = React.useState<Exam | null>(null);
  const [loading, setLoading] = React.useState(true);

  // test state
  const [started, setStarted] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<SubmitResponse | null>(null);
  const [activeQ, setActiveQ] = React.useState(0);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // timer
  const [timeLeft, setTimeLeft] = React.useState(0);
  const startTimeRef = React.useRef(0);

  React.useEffect(() => {
    fetch(`/api/reading/exams/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setExam(data);
        setTimeLeft(data.timeMinutes * 60);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  React.useEffect(() => {
    if (!started || result) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, result]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1120] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#0a1120] flex items-center justify-center text-slate-400">
        Không tìm thấy bài thi.
      </div>
    );
  }

  const allQuestions = exam.sections.flatMap((s) => s.passage.questions);
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const section = exam.sections[currentSection];
  const sectionQuestions = section.passage.questions;

  const globalQuestionOffset = exam.sections
    .slice(0, currentSection)
    .reduce((sum, s) => sum + s.passage.questions.length, 0);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setStarted(true);
    startTimeRef.current = Date.now();
  };

  const handleSelect = (questionId: string, letter: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
    try {
      const res = await fetch(`/api/reading/exams/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, timeSec: elapsedSec }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setActiveQ(0);
    setCurrentSection(0);
    setStarted(false);
    setTimeLeft(exam.timeMinutes * 60);
  };

  const timerColor =
    timeLeft <= 60
      ? "text-red-400"
      : timeLeft <= 300
        ? "text-amber-400"
        : "text-emerald-400";

  const timerBg =
    timeLeft <= 60
      ? "bg-red-500/10 border-red-500/30"
      : timeLeft <= 300
        ? "bg-amber-500/10 border-amber-500/30"
        : "bg-emerald-500/10 border-emerald-500/30";

  /* ─── start screen ─── */
  if (!started) {
    return (
      <div className="min-h-screen bg-[#0a1120] px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <button
            onClick={() => router.push("/reading/mock-tests")}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Quay lại danh sách
          </button>

          <div className="rounded-2xl border border-white/[0.06] bg-[#131F36] overflow-hidden">
            {/* Gradient header */}
            <div
              className={`h-3 ${
                exam.type === "academic"
                  ? "bg-gradient-to-r from-blue-600 via-violet-500 to-purple-600"
                  : "bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600"
              }`}
            />
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <Badge
                  className={`text-[10px] border ${
                    exam.type === "academic"
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  IELTS {exam.type === "academic" ? "Academic" : "General Training"}
                </Badge>
                <h1 className="text-xl sm:text-2xl font-bold text-white">{exam.title}</h1>
                <p className="text-sm text-slate-400">{exam.titleVi}</p>
              </div>

              {/* Test info */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: "Thời gian", value: `${exam.timeMinutes} phút`, color: "text-blue-400" },
                  { icon: HelpCircle, label: "Câu hỏi", value: `${totalQuestions} câu`, color: "text-violet-400" },
                  {
                    icon: AlertTriangle,
                    label: "Sections",
                    value: `${exam.sections.length} phần`,
                    color: "text-amber-400",
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <Icon className={`h-5 w-5 ${color} mx-auto mb-1.5`} />
                    <p className="text-[11px] text-slate-400">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Sections preview */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-300 uppercase tracking-wider">Nội dung bài thi</p>
                {exam.sections.map((s, i) => (
                  <div
                    key={s.passage.id}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/20 text-violet-400 text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm text-white">{s.passage.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {s.passage.wordCount} từ · {s.passage.questions.length} câu hỏi
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-white/5 text-slate-400 border-white/10 text-[10px]">{s.passage.level}</Badge>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
                <p className="text-xs font-medium text-amber-400 mb-2">Lưu ý trước khi thi</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Bài thi sẽ tự động nộp khi hết 60 phút</li>
                  <li>• Bạn có thể chuyển qua lại giữa các passage</li>
                  <li>• Đồng hồ bắt đầu đếm ngược ngay khi bấm "Bắt đầu thi"</li>
                  <li>• Kết quả sẽ hiển thị band score IELTS Reading tương ứng</li>
                </ul>
              </div>

              <Button
                onClick={handleStart}
                className={`w-full py-6 text-base font-semibold rounded-xl ${
                  exam.type === "academic"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                Bắt đầu thi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── result screen ─── */
  if (result) {
    const bandColor =
      result.band >= 7
        ? "text-emerald-400"
        : result.band >= 5.5
          ? "text-amber-400"
          : "text-red-400";

    return (
      <div className="min-h-screen bg-[#0a1120] px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        {/* Result header */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#131F36] p-6 text-center space-y-4">
          <Trophy className="h-12 w-12 text-amber-400 mx-auto" />
          <h1 className="text-2xl font-bold text-white">Kết quả bài thi</h1>
          <p className="text-sm text-slate-400">{exam.title}</p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-4">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
              <p className="text-[11px] text-slate-400">Band Score</p>
              <p className={`text-3xl font-bold ${bandColor}`}>{result.band}</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
              <p className="text-[11px] text-slate-400">Điểm</p>
              <p className="text-3xl font-bold text-white">
                {result.score}/{result.total}
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
              <p className="text-[11px] text-slate-400">Chính xác</p>
              <p className="text-3xl font-bold text-white">{result.accuracy}%</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <Button onClick={handleRetry} variant="outline" className="gap-1.5 border-white/15 text-white">
              <RotateCcw className="h-3.5 w-3.5" />
              Làm lại
            </Button>
            <Button onClick={() => router.push("/reading/mock-tests")} variant="outline" className="gap-1.5 border-white/15 text-white">
              <ArrowLeft className="h-3.5 w-3.5" />
              Danh sách đề thi
            </Button>
          </div>
        </div>

        {/* Review sections */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {exam.sections.map((s, i) => (
            <button
              key={s.passage.id}
              onClick={() => { setCurrentSection(i); setActiveQ(0); }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                currentSection === i
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              Passage {i + 1}
            </button>
          ))}
        </div>

        {/* Split: passage + answers */}
        <div className="grid gap-4 lg:grid-cols-[1fr,420px]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-6 lg:p-8 max-h-[calc(100vh-280px)] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1">
              Passage {currentSection + 1}: {section.passage.title}
            </h2>
            <p className="text-xs text-slate-400 mb-6">{section.passage.titleVi}</p>
            <div className="text-sm text-slate-200/90 leading-[1.9] whitespace-pre-line">
              {section.passage.passage}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-5 max-h-[calc(100vh-280px)] overflow-y-auto space-y-4">
            {/* Q nav */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/[0.08]">
              {sectionQuestions.map((q, i) => {
                const r = result.results[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQ(i)}
                    className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                      r?.correct
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    } ${activeQ === i ? "ring-2 ring-white/30" : ""}`}
                  >
                    {globalQuestionOffset + i + 1}
                  </button>
                );
              })}
            </div>

            {/* Active question review */}
            {sectionQuestions[activeQ] && (() => {
              const q = sectionQuestions[activeQ];
              const r = result.results[q.id];
              return (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-white">
                    <span className="text-blue-400 mr-1.5">Q{globalQuestionOffset + activeQ + 1}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const letter = optionLetters[oi];
                      const selected = answers[q.id] === letter;
                      const isCorrect = r?.correctAnswer === letter;
                      const isWrong = selected && !r?.correct;

                      let cls =
                        "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left ";
                      if (isCorrect) cls += "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
                      else if (isWrong) cls += "border border-red-500/40 bg-red-500/10 text-red-300";
                      else cls += "border border-white/[0.06] text-slate-500";

                      return (
                        <div key={letter} className={cls}>
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                              isCorrect
                                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                                : isWrong
                                  ? "border-red-400 bg-red-500/20 text-red-300"
                                  : "border-white/15 text-slate-500"
                            }`}
                          >
                            {letter}
                          </span>
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-400" />}
                          {isWrong && <XCircle className="h-4 w-4 ml-auto text-red-400" />}
                        </div>
                      );
                    })}
                  </div>
                  {r?.explanation && (
                    <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 px-3 py-2 text-xs text-blue-300">
                      {r.explanation}
                    </div>
                  )}
                  {/* Nav buttons */}
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={activeQ === 0}
                      onClick={() => setActiveQ(activeQ - 1)}
                      className="text-slate-400 gap-1"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Trước
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={activeQ === sectionQuestions.length - 1}
                      onClick={() => setActiveQ(activeQ + 1)}
                      className="text-slate-400 gap-1"
                    >
                      Sau
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  }

  /* ─── test-taking screen ─── */
  return (
    <div className="min-h-screen bg-[#0a1120] flex flex-col">
      {/* Top bar: timer + progress */}
      <div className="sticky top-0 z-50 bg-[#0a1120]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Section tabs */}
          <div className="flex items-center gap-1.5">
            {exam.sections.map((s, i) => {
              const secAnswered = s.passage.questions.filter((q) => answers[q.id]).length;
              const secTotal = s.passage.questions.length;
              return (
                <button
                  key={s.passage.id}
                  onClick={() => { setCurrentSection(i); setActiveQ(0); }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    currentSection === i
                      ? "bg-violet-600 text-white"
                      : secAnswered === secTotal
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  P{i + 1}
                  <span className="ml-1 text-[10px] opacity-60">
                    {secAnswered}/{secTotal}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${timerBg}`}>
            <Clock className={`h-4 w-4 ${timerColor}`} />
            <span className={`text-sm font-mono font-bold ${timerColor}`}>{formatTime(timeLeft)}</span>
          </div>

          {/* Progress + Submit */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {answeredCount}/{totalQuestions}
            </span>
            <Button
              onClick={() => setShowConfirm(true)}
              size="sm"
              className="bg-violet-600 hover:bg-violet-500 text-white gap-1.5 rounded-full text-xs"
            >
              <Send className="h-3 w-3" />
              Nộp bài
            </Button>
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl bg-[#131F36] border border-white/[0.08] p-6 max-w-sm mx-4 space-y-4">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Xác nhận nộp bài?</h3>
              <p className="text-sm text-slate-400">
                Bạn đã trả lời {answeredCount}/{totalQuestions} câu.
                {answeredCount < totalQuestions && (
                  <span className="text-amber-400">
                    {" "}
                    Còn {totalQuestions - answeredCount} câu chưa trả lời.
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirm(false)}
                variant="outline"
                className="flex-1 border-white/15 text-white"
              >
                Tiếp tục làm
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white"
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Nộp bài"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[1fr,420px] h-[calc(100vh-72px)]">
          {/* Left: Passage */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-6 lg:p-8 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/20 text-violet-400 text-xs font-bold">
                {currentSection + 1}
              </span>
              <div>
                <h2 className="text-base font-bold text-white">{section.passage.title}</h2>
                <p className="text-[11px] text-slate-400">{section.passage.titleVi}</p>
              </div>
            </div>
            <div className="text-sm text-slate-200/90 leading-[1.9] whitespace-pre-line selection:bg-blue-500/30">
              {section.passage.passage}
            </div>
          </div>

          {/* Right: Questions */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#131F36] p-5 overflow-y-auto space-y-4">
            {/* Question number nav */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/[0.08]">
              {sectionQuestions.map((q, i) => {
                const answered = !!answers[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQ(i)}
                    className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                      activeQ === i
                        ? "bg-blue-600 text-white"
                        : answered
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-white/5 text-slate-400 border border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    {globalQuestionOffset + i + 1}
                  </button>
                );
              })}
            </div>

            {/* Active question */}
            {sectionQuestions[activeQ] && (() => {
              const q = sectionQuestions[activeQ];
              return (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-white">
                    <span className="text-blue-400 mr-1.5">Q{globalQuestionOffset + activeQ + 1}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const letter = optionLetters[oi];
                      const selected = answers[q.id] === letter;

                      return (
                        <button
                          key={letter}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all text-left ${
                            selected
                              ? "border border-blue-500/50 bg-blue-500/15 text-blue-300"
                              : "border border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-white/[0.03]"
                          }`}
                          onClick={() => handleSelect(q.id, letter)}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                              selected
                                ? "border-blue-400 bg-blue-500/20 text-blue-300"
                                : "border-white/15 text-slate-400"
                            }`}
                          >
                            {letter}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={activeQ === 0 && currentSection === 0}
                      onClick={() => {
                        if (activeQ > 0) {
                          setActiveQ(activeQ - 1);
                        } else if (currentSection > 0) {
                          setCurrentSection(currentSection - 1);
                          setActiveQ(exam.sections[currentSection - 1].passage.questions.length - 1);
                        }
                      }}
                      className="text-slate-400 gap-1"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Trước
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={
                        activeQ === sectionQuestions.length - 1 &&
                        currentSection === exam.sections.length - 1
                      }
                      onClick={() => {
                        if (activeQ < sectionQuestions.length - 1) {
                          setActiveQ(activeQ + 1);
                        } else if (currentSection < exam.sections.length - 1) {
                          setCurrentSection(currentSection + 1);
                          setActiveQ(0);
                        }
                      }}
                      className="text-slate-400 gap-1"
                    >
                      Sau
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
