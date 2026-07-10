import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const topics = await prisma.vocabTopic.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      level: true,
      category: true,
      summary: true,
      _count: { select: { words: true } },
    },
  });

  const result = topics.map(({ _count, ...t }) => ({
    ...t,
    itemCount: _count.words,
  }));

  return NextResponse.json(result);
}
