// app/api/auth/me/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Get user info
  return NextResponse.json({ user: {} });
}
