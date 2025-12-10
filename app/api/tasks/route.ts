// app/api/tasks/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Get tasks
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  // Create task
  return NextResponse.json({ id: "new" });
}
