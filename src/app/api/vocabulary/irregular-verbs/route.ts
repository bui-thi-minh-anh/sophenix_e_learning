import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const verbs = await prisma.irregularVerb.findMany({
    orderBy: { stt: "asc" },
  });
  return NextResponse.json(verbs);
}
