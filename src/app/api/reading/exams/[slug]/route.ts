import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const exam = await prisma.readingExam.findUnique({
    where: { slug },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          passage: {
            include: {
              questions: { orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!exam) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: exam.id,
    slug: exam.slug,
    title: exam.title,
    titleVi: exam.titleVi,
    type: exam.type,
    timeMinutes: exam.timeMinutes,
    sections: exam.sections.map((s) => ({
      order: s.order,
      passage: {
        id: s.passage.id,
        slug: s.passage.slug,
        title: s.passage.title,
        titleVi: s.passage.titleVi,
        level: s.passage.level,
        passage: s.passage.passage,
        wordCount: s.passage.wordCount,
        questions: s.passage.questions.map((q) => ({
          id: q.id,
          kind: q.kind,
          question: q.question,
          options: q.options,
          order: q.order,
        })),
      },
    })),
  });
}
