import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const category = searchParams.get("category");

  const prompts = await prisma.speakingPrompt.findMany({
    where: {
      ...(level ? { level } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      titleVi: true,
      level: true,
      category: true,
      instruction: true,
      hints: true,
      durationSec: true,
    },
  });

  return NextResponse.json(prompts);
}
