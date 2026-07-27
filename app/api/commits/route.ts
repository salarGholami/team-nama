import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

function readDb() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/commits
export async function GET() {
  try {
    const db = readDb();
    return NextResponse.json(db.commits || []);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت کامیت‌ها" },
      { status: 500 },
    );
  }
}

// POST /api/commits  (فقط مدیران بعداً استفاده می‌کنن)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = readDb();

    if (!db.commits) db.commits = [];

    const newCommit = {
      id: Date.now(),
      ...body,
    };

    db.commits.unshift(newCommit);
    writeDb(db);

    return NextResponse.json(newCommit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطا در ایجاد کامیت" }, { status: 500 });
  }
}
