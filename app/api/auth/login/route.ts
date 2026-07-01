import { NextResponse } from "next/server";
import db from "@/data/db.json";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 },
      );
    }

    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    const payload = {
      id: user.id,
      role: user.roleId,
      name: user.name,
      email: user.email,
    };

    const token = Buffer.from(JSON.stringify(payload)).toString("base64");

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
