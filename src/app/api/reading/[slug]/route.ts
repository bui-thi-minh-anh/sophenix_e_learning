import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const passage = await prisma.readingPassage.findUnique({
    where: { slug },
    include: {
      questions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          kind: true,
          question: true,
          options: true,
          order: true,
        },
      },
    },
  });

  if (!passage) {
    return NextResponse.json({ error: "Bài đọc không tồn tại." }, { status: 404 });
  }

  return NextResponse.json(passage);
}
