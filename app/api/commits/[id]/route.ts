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

// GET /api/commits/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = readDb();
    const commit = (db.commits || []).find((c: any) => c.id === Number(id));

    if (!commit) {
      return NextResponse.json({ error: "کامیت پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(commit);
  } catch (error) {
    return NextResponse.json({ error: "خطا" }, { status: 500 });
  }
}

// PUT /api/commits/:id  (فقط مدیران)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = readDb();

    const index = (db.commits || []).findIndex((c: any) => c.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ error: "کامیت پیدا نشد" }, { status: 404 });
    }

    db.commits[index] = { ...db.commits[index], ...body };
    writeDb(db);

    return NextResponse.json(db.commits[index]);
  } catch (error) {
    return NextResponse.json({ error: "خطا در ویرایش" }, { status: 500 });
  }
}

// DELETE /api/commits/:id  (فقط مدیران)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = readDb();

    db.commits = (db.commits || []).filter((c: any) => c.id !== Number(id));
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}
