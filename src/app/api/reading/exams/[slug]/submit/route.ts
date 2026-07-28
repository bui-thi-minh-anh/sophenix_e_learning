import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth-helpers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = await req.json();
  const { answers, timeSec } = body as {
    answers: Record<string, string>;
    timeSec: number;
  };

  const exam = await prisma.readingExam.findUnique({
    where: { slug },
    include: {
      sections: {
        include: {
          passage: {
            include: { questions: true },
          },
        },
      },
    },
  });

  if (!exam) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allQuestions = exam.sections.flatMap((s) => s.passage.questions);
  const total = allQuestions.length;
  let score = 0;

  const results: Record<
    string,
    { correct: boolean; yourAnswer: string; correctAnswer: string; explanation: string | null }
  > = {};

  for (const q of allQuestions) {
    const userAnswer = (answers[q.id] ?? "").toUpperCase();
    const isCorrect = userAnswer === q.answer.toUpperCase();
    if (isCorrect) score++;

    results[q.id] = {
      correct: isCorrect,
      yourAnswer: userAnswer,
      correctAnswer: q.answer,
      explanation: q.explanation,
    };
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const band = ieltsReadingBand(score);

  const user = await getSessionUser();
  if (user) {
    await prisma.readingExamResult.create({
      data: {
        userId: user.id,
        examId: exam.id,
        score,
        total,
        accuracy,
        timeSec: timeSec ?? 0,
        answers: answers as object,
      },
    });
  }

  return NextResponse.json({ score, total, accuracy, band, results });
}

function ieltsReadingBand(score: number): number {
  if (score >= 39) return 9;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3;
  if (score >= 4) return 2.5;
  return 2;
}
