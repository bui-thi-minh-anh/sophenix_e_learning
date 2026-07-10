import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await prisma.vocabTopic.findUnique({
    where: { slug },
    include: {
      words: { orderBy: { order: "asc" } },
      collocations: { orderBy: { order: "asc" } },
      patterns: { orderBy: { order: "asc" } },
      exerciseSets: {
        include: {
          exercises: {
            orderBy: { order: "asc" },
            include: { options: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Chủ đề không tồn tại." }, { status: 404 });
  }

  return NextResponse.json(topic);
}
