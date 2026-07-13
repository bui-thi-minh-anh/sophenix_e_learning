import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const passages = await prisma.readingPassage.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      titleVi: true,
      level: true,
      category: true,
      wordCount: true,
      _count: { select: { questions: true } },
    },
  });

  return NextResponse.json(
    passages.map(({ _count, ...p }) => ({ ...p, questionCount: _count.questions })),
  );
}
