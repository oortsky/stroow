"use server";

import { deleteTransaction as deleteTransactionFromData } from "@/db/transaction/mutations/delete-transaction";
import type { SelectTransaction } from "@/db/schema";

export async function deleteTransaction(id: SelectTransaction["id"]) {
  return await deleteTransactionFromData(id);
}
