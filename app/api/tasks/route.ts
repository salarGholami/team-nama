// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

async function readDB() {
  const p = path.join(process.cwd(), "data", "db.json");
  const raw = await readFile(p, "utf8");
  return JSON.parse(raw);
}

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.tasks || []);
}

export async function POST(request: Request) {
  // very small placeholder: echo body with id
  const body = await request.json();
  return NextResponse.json({ id: "new", ...body });
}
