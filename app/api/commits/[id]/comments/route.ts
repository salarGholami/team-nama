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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    console.log("Received comment for commit:", id, body); // برای دیباگ

    const db = readDb();

    if (!Array.isArray(db.commitComments)) {
      db.commitComments = [];
    }

    const newComment = {
      id: Date.now(),
      commitId: Number(id),
      userId: body.userId,
      text: body.text,
      createdAt: body.createdAt || new Date().toLocaleString("fa-IR"),
    };

    db.commitComments.unshift(newComment);
    writeDb(db);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error: any) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { error: error.message || "خطا در ذخیره نظر" },
      { status: 500 },
    );
  }
}
