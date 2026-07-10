import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ topicSlug: string; lessonSlug: string }> },
) {
  const { topicSlug, lessonSlug } = await params;

  const topic = await prisma.listeningTopic.findUnique({
    where: { topicSlug },
    select: { id: true },
  });
  if (!topic) {
    return NextResponse.json({ error: "Chủ đề không tồn tại." }, { status: 404 });
  }

  const lesson = await prisma.listeningLesson.findUnique({
    where: { topicId_lessonSlug: { topicId: topic.id, lessonSlug } },
    include: {
      speakers: true,
      vocabulary: { orderBy: { order: "asc" } },
      fillBlanks: { orderBy: { order: "asc" } },
      mcq: { orderBy: { order: "asc" } },
      transcriptTurns: { orderBy: { order: "asc" } },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Bài nghe không tồn tại." }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
