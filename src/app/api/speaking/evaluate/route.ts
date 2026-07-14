import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";
import { evaluateSpeaking } from "@/lib/gemini";

const DAILY_LIMIT = 20;

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "AI chấm chưa được cấu hình." }, { status: 503 });
  }

  const { promptId, transcript } = (await req.json()) as {
    promptId?: string;
    transcript?: string;
  };

  if (!promptId || !transcript?.trim()) {
    return NextResponse.json({ error: "promptId và transcript là bắt buộc." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = await prisma.speakingResult.count({
    where: { userId: user.id, createdAt: { gte: today } },
  });

  if (todayCount >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: `Bạn đã dùng hết ${DAILY_LIMIT} lượt chấm hôm nay. Quay lại ngày mai nhé!` },
      { status: 429 },
    );
  }

  const prompt = await prisma.speakingPrompt.findUnique({ where: { id: promptId } });
  if (!prompt) {
    return NextResponse.json({ error: "Đề bài không tồn tại." }, { status: 404 });
  }

  let evaluation;
  try {
    evaluation = await evaluateSpeaking(prompt.instruction, prompt.level, transcript);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("429") || msg.includes("quota")) {
      return NextResponse.json({ error: "AI đang quá tải hoặc hết lượt miễn phí. Vui lòng thử lại sau." }, { status: 429 });
    }
    return NextResponse.json({ error: "Lỗi khi gọi AI chấm bài. Vui lòng thử lại." }, { status: 502 });
  }

  const result = await prisma.speakingResult.create({
    data: {
      userId: user.id,
      promptId: prompt.id,
      transcript,
      ...evaluation,
    },
  });

  return NextResponse.json({
    ...result,
    remaining: DAILY_LIMIT - todayCount - 1,
  });
}
