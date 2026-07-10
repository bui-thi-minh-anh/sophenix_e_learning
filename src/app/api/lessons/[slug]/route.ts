import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: {
      sections: { orderBy: { order: "asc" } },
      exerciseSets: {
        include: {
          exercises: {
            orderBy: { order: "asc" },
            include: { options: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Bài học không tồn tại." }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
