"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  FileText,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Play,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExamSummary {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  type: string;
  timeMinutes: number;
  totalWords: number;
  totalQuestions: number;
  sectionCount: number;
  attempts: number;
}

export default function MockTestsPage() {
  const [exams, setExams] = React.useState<ExamSummary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/reading/exams")
      .then((r) => r.json())
      .then(setExams)
      .finally(() => setLoading(false));
  }, []);

  const academic = exams.filter((e) => e.type === "academic");
  const general = exams.filter((e) => e.type === "general");

  return (
    <div className="min-h-screen bg-[#0a1120] px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/reading"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Quay lại Đọc
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">Thi thử Reading</h1>
          <p className="text-sm text-slate-400 mt-1">
            Làm bài thi thử IELTS Reading đầy đủ format với đếm ngược 60 phút
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Clock, label: "Thời gian", value: "60 phút" },
            { icon: HelpCircle, label: "Số câu hỏi", value: "40 câu" },
            { icon: FileText, label: "Số passages", value: "3 bài" },
            { icon: GraduationCap, label: "Band score", value: "1–9" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.06] bg-[#131F36] p-3 text-center"
            >
              <Icon className="h-5 w-5 text-violet-400 mx-auto mb-1.5" />
              <p className="text-[11px] text-slate-400">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : exams.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Chưa có bài thi thử nào.
        </div>
      ) : (
        <>
          {/* Academic */}
          {academic.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">IELTS Academic</h2>
                <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/20 text-[10px]">
                  {academic.length} đề
                </Badge>
              </div>
              <p className="text-xs text-slate-400 -mt-2">
                3 passages học thuật, từ dễ đến khó. Phù hợp cho du học và học thuật.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {academic.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </section>
          )}

          {/* General */}
          {general.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">IELTS General Training</h2>
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[10px]">
                  {general.length} đề
                </Badge>
              </div>
              <p className="text-xs text-slate-400 -mt-2">
                3 sections: quảng cáo/thông báo, văn bản công việc, bài báo dài. Phù hợp cho định cư và làm việc.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {general.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function ExamCard({ exam }: { exam: ExamSummary }) {
  const isAcademic = exam.type === "academic";

  return (
    <Link
      href={`/reading/mock-tests/${exam.slug}`}
      className="group rounded-2xl border border-white/[0.06] bg-[#131F36] overflow-hidden hover:border-white/15 hover:shadow-lg hover:shadow-black/20 transition-all"
    >
      {/* Top gradient bar */}
      <div
        className={`h-2 ${
          isAcademic
            ? "bg-gradient-to-r from-blue-600 via-violet-500 to-purple-600"
            : "bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600"
        }`}
      />

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
              {exam.title}
            </h3>
            <p className="text-xs text-slate-400">{exam.titleVi}</p>
          </div>
          <Badge
            className={`text-[10px] border ${
              isAcademic
                ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
            }`}
          >
            {isAcademic ? "Academic" : "General"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {exam.timeMinutes} phút
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" />
            {exam.totalQuestions} câu
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {exam.totalWords} từ
          </span>
        </div>

        {/* Start button */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {exam.attempts > 0 ? `Đã làm ${exam.attempts} lần` : "Chưa làm lần nào"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              isAcademic
                ? "bg-blue-600/20 text-blue-300 group-hover:bg-blue-600 group-hover:text-white"
                : "bg-emerald-600/20 text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white"
            }`}
          >
            <Play className="h-3 w-3" />
            Bắt đầu
          </span>
        </div>
      </div>
    </Link>
  );
}
