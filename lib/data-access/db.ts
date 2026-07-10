// lib/data-access/db.ts

import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function getDB() {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

export async function saveDB(db: unknown) {
  const data = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, data, "utf8");
}
