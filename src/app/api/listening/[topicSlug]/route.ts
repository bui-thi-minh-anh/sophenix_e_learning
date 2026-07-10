import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params;
  const topic = await prisma.listeningTopic.findUnique({
    where: { topicSlug },
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
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Chủ đề không tồn tại." }, { status: 404 });
  }

  return NextResponse.json(topic);
}
