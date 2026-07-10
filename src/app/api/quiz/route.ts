import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const quizType = searchParams.get("type");

  const results = await prisma.quizResult.findMany({
    where: {
      userId: user.id,
      ...(quizType ? { quizType } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(results);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { quizType, quizId, score, total } = (await req.json()) as {
    quizType?: string;
    quizId?: string;
    score?: number;
    total?: number;
  };

  if (!quizType || !quizId || score == null || !total) {
    return NextResponse.json(
      { error: "quizType, quizId, score và total là bắt buộc." },
      { status: 400 },
    );
  }

  const accuracy = Math.round((score / total) * 100);
  const result = await prisma.quizResult.create({
    data: { userId: user.id, quizType, quizId, score, total, accuracy },
  });

  return NextResponse.json(result, { status: 201 });
}
