import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const topics = await prisma.listeningTopic.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { lessonSlug: "asc" },
        select: {
          id: true,
          lessonSlug: true,
          titleEn: true,
          titleVi: true,
          level: true,
          audioType: true,
          duration: true,
          accent: true,
          audio: true,
          image: true,
          difficulty: true,
          tags: true,
        },
      },
      _count: { select: { lessons: true } },
    },
  });

  const result = topics.map(({ _count, lessons, ...t }) => ({
    ...t,
    lessonCount: _count.lessons,
    totalDuration: lessons.reduce((sum, l) => sum + l.duration, 0),
    levels: [...new Set(lessons.map((l) => l.level).filter(Boolean))],
    lessons,
  }));

  return NextResponse.json(result);
}
