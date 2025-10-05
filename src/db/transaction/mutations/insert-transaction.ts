import { db } from "../../index";
import { transactions } from "../../schema";
import type { InsertTransaction } from "../../schema";

export async function insertTransaction(data: InsertTransaction) {
  const response = await db.insert(transactions).values(data);
  return response;
}
