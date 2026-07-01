// app/api/roles/route.ts
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

async function readDB() {
  const p = path.join(process.cwd(), "data", "db.json");
  const raw = await readFile(p, "utf8");
  return JSON.parse(raw);
}

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ roles: db.roles || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
