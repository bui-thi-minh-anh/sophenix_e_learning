import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const [lessons, listening] = await Promise.all([
    prisma.lessonProgress.findMany({ where: { userId: user.id } }),
    prisma.listeningProgress.findMany({ where: { userId: user.id } }),
  ]);

  return NextResponse.json({ lessons, listening });
}
