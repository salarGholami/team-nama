import { httpClient } from "./http/client";

export async function getTasks() {
  const res = await httpClient.get("/tasks");
  return res.data;
}

export async function createTask(payload: any) {
  const res = await httpClient.post("/tasks", payload);
  return res.data;
}
