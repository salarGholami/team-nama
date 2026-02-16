import { cookies } from "next/headers";
import type { SessionUser } from "@/types/session";

export async function getServerSession(): Promise<SessionUser | null> {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token, "base64").toString()) as SessionUser;
  } catch {
    return null;
  }
}
