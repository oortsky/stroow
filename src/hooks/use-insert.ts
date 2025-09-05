"use server";

import { insertUser, insertTransaction } from "@/db/queries/insert";
import type { InsertUser, InsertTransaction } from "@/db/schema";

export async function useInsertUser(data: InsertUser) {
  return await insertUser(data);
}

export async function useInsertTransaction(data: InsertTransaction) {
  return await insertTransaction(data);
}
