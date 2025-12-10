// services/auth.service.ts
import { httpClient } from "./http/client";

export async function login() {
  return httpClient.post("/auth/login");
}
