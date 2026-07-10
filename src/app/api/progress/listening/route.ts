import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { topicId, lessonId, accuracy, addTimeSec } = (await req.json()) as {
    topicId?: string;
    lessonId?: string;
    accuracy?: number;
    addTimeSec?: number;
  };

  if (!topicId || !lessonId) {
    return NextResponse.json({ error: "topicId và lessonId là bắt buộc." }, { status: 400 });
  }

  const existing = await prisma.listeningProgress.findUnique({
    where: { userId_topicId_lessonId: { userId: user.id, topicId, lessonId } },
  });

  const progress = await prisma.listeningProgress.upsert({
    where: { userId_topicId_lessonId: { userId: user.id, topicId, lessonId } },
    update: {
      completed: true,
      accuracy: Math.max(existing?.accuracy ?? 0, Math.round(accuracy ?? 0)),
      timeSec: (existing?.timeSec ?? 0) + Math.round(addTimeSec ?? 0),
    },
    create: {
      userId: user.id,
      topicId,
      lessonId,
      completed: true,
      accuracy: Math.round(accuracy ?? 0),
      timeSec: Math.round(addTimeSec ?? 0),
    },
  });

  return NextResponse.json(progress);
}
