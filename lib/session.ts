// lib/session.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface UserSession {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

const JWT_SECRET = process.env.JWT_SECRET!; // از env بخوانید

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      avatar?: string;
      email?: string;
    };

    return {
      id: payload.id,
      name: payload.name,
      avatar: payload.avatar,
      email: payload.email,
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
