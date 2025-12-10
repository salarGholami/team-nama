// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Logout logic
  return NextResponse.json({ message: "Logged out" });
}
