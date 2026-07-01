import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

async function readDB() {
  const p = path.join(process.cwd(), "data", "db.json");
  const raw = await readFile(p, "utf8");
  return JSON.parse(raw);
}

async function writeDB(data: any) {
  const p = path.join(process.cwd(), "data", "db.json");
  await writeFile(p, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const db = await readDB();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("id");

    if (userId) {
      const user = db.users.find((u: any) => u.id == userId);
      if (user) {
        return NextResponse.json({ user }, { status: 200 });
      }
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ users: db.users || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDB();

    const newUser = {
      id:
        Math.max(
          ...db.users.map((u: any) => (typeof u.id === "number" ? u.id : 0)),
          0
        ) + 1,
      ...body,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.name}`,
      joinDate: new Date().toISOString().split("T")[0],
    };

    db.users.push(newUser);
    await writeDB(db);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const db = await readDB();
    const userIndex = db.users.findIndex((u: any) => u.id == userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users[userIndex] = { ...db.users[userIndex], ...body };
    await writeDB(db);

    return NextResponse.json({ user: db.users[userIndex] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const db = await readDB();
    const userIndex = db.users.findIndex((u: any) => u.id == userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users.splice(userIndex, 1);
    await writeDB(db);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
