import { eq } from "drizzle-orm";
import { db } from "../../index";
import { transactions } from "../../schema";
import type { SelectTransaction } from "../../schema";

export async function updateTransaction(
  id: SelectTransaction["id"],
  data: Partial<Omit<SelectTransaction, "id">>
) {
  const response = await db
    .update(transactions)
    .set(data)
    .where(eq(transactions.id, id));
  return response;
}
