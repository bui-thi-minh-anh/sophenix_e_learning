import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const exams = await prisma.readingExam.findMany({
    orderBy: { order: "asc" },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          passage: {
            select: { wordCount: true, _count: { select: { questions: true } } },
          },
        },
      },
      _count: { select: { results: true } },
    },
  });

  return NextResponse.json(
    exams.map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      titleVi: e.titleVi,
      type: e.type,
      timeMinutes: e.timeMinutes,
      totalWords: e.sections.reduce((s, sec) => s + sec.passage.wordCount, 0),
      totalQuestions: e.sections.reduce((s, sec) => s + sec.passage._count.questions, 0),
      sectionCount: e.sections.length,
      attempts: e._count.results,
    })),
  );
}
