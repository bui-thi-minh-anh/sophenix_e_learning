import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { slug, completed } = (await req.json()) as {
    slug?: string;
    completed?: boolean;
  };

  if (!slug) {
    return NextResponse.json({ error: "slug là bắt buộc." }, { status: 400 });
  }

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_slug: { userId: user.id, slug } },
    update: { completed: completed ?? true },
    create: { userId: user.id, slug, completed: completed ?? true },
  });

  return NextResponse.json(progress);
}
