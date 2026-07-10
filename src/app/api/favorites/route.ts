import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, unauthorized } from "@/lib/auth-helpers";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const favorites = await prisma.favoriteWord.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { word, meaning } = (await req.json()) as {
    word?: string;
    meaning?: string;
  };

  if (!word || !meaning) {
    return NextResponse.json({ error: "word và meaning là bắt buộc." }, { status: 400 });
  }

  const fav = await prisma.favoriteWord.upsert({
    where: { userId_word: { userId: user.id, word } },
    update: { meaning },
    create: { userId: user.id, word, meaning },
  });

  return NextResponse.json(fav, { status: 201 });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { word } = (await req.json()) as { word?: string };

  if (!word) {
    return NextResponse.json({ error: "word là bắt buộc." }, { status: 400 });
  }

  await prisma.favoriteWord.deleteMany({
    where: { userId: user.id, word },
  });

  return NextResponse.json({ ok: true });
}
