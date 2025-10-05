import { eq } from "drizzle-orm";
import { db } from "../../index";
import { transactions } from "../../schema";
import type { SelectTransaction } from "../../schema";

export async function selectTransactionById(id: SelectTransaction["id"]) {
  const response = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id));
  return response;
}
