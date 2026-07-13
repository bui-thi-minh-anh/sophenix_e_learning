import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const results = await prisma.speakingResult.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      prompt: {
        select: { title: true, titleVi: true, level: true, category: true },
      },
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = await prisma.speakingResult.count({
    where: { userId: user.id, createdAt: { gte: today } },
  });

  return NextResponse.json({ results, todayCount, dailyLimit: 20 });
}
