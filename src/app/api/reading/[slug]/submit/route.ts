import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth-helpers";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { answers } = (await req.json()) as { answers?: Record<string, string> };

  if (!answers || !Object.keys(answers).length) {
    return NextResponse.json({ error: "Chưa có câu trả lời." }, { status: 400 });
  }

  const passage = await prisma.readingPassage.findUnique({
    where: { slug },
    include: { questions: { orderBy: { order: "asc" } } },
  });

  if (!passage) {
    return NextResponse.json({ error: "Bài đọc không tồn tại." }, { status: 404 });
  }

  const results = passage.questions.map((q) => ({
    questionId: q.id,
    question: q.question,
    userAnswer: answers[q.id] ?? "",
    correctAnswer: q.answer,
    correct: (answers[q.id] ?? "").toUpperCase() === q.answer.toUpperCase(),
    explanation: q.explanation,
  }));

  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const user = await getSessionUser();
  if (user) {
    await prisma.readingResult.create({
      data: { userId: user.id, passageId: passage.id, score, total, accuracy },
    });
  }

  return NextResponse.json({ score, total, accuracy, results });
}
