import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

export function unauthorized() {
  return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
}
