import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const lessons = await prisma.lesson.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      level: true,
      topic: true,
      series: true,
      summary: true,
    },
  });
  return NextResponse.json(lessons);
}
