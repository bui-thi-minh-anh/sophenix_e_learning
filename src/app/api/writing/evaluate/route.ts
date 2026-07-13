import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";
import { evaluateWriting } from "@/lib/gemini";

const DAILY_LIMIT = 20;

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "AI chấm chưa được cấu hình." }, { status: 503 });
  }

  const { promptId, essay } = (await req.json()) as {
    promptId?: string;
    essay?: string;
  };

  if (!promptId || !essay?.trim()) {
    return NextResponse.json({ error: "promptId và essay là bắt buộc." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = await prisma.writingResult.count({
    where: { userId: user.id, createdAt: { gte: today } },
  });

  if (todayCount >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: `Bạn đã dùng hết ${DAILY_LIMIT} lượt chấm hôm nay. Quay lại ngày mai nhé!` },
      { status: 429 },
    );
  }

  const prompt = await prisma.writingPrompt.findUnique({ where: { id: promptId } });
  if (!prompt) {
    return NextResponse.json({ error: "Đề bài không tồn tại." }, { status: 404 });
  }

  const evaluation = await evaluateWriting(prompt.instruction, prompt.level, essay);

  const result = await prisma.writingResult.create({
    data: {
      userId: user.id,
      promptId: prompt.id,
      essay,
      ...evaluation,
    },
  });

  return NextResponse.json({ ...result, remaining: DAILY_LIMIT - todayCount - 1 });
}
