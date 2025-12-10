// services/user.service.ts
import { httpClient } from "./http/client";

export async function getUser() {
  return httpClient.get("/auth/me");
}
