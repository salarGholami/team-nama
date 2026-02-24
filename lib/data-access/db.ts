// src/lib/data-access/db.ts

import { cache } from "react";
import db from "@/data/db.json";

export const getDB = cache(async () => {
  return db;
});
