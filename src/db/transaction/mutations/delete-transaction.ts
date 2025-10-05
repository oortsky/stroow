import { eq } from "drizzle-orm";
import { db } from "../../index";
import { transactions } from "../../schema";
import type { SelectTransaction } from "../../schema";

export async function deleteTransaction(id: SelectTransaction["id"]) {
  const response = await db.delete(transactions).where(eq(transactions.id, id));
  return response;
}
