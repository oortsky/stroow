"use server";

import { insertTransaction as insertTransactionData } from "@/db/transaction/mutations/insert-transaction";
import type { InsertTransaction } from "@/db/schema";

export async function createTransaction(data: InsertTransaction) {
  return await insertTransactionData(data);
}
