"use server";

import { updateTransaction as updateTransactionData } from "@/db/transaction/mutations/update-transaction";
import type { SelectTransaction } from "@/db/schema";

export async function updateTransaction(
  id: SelectTransaction["id"],
  data: Partial<Omit<SelectTransaction, "id">>
) {
  return await updateTransactionData(id, data);
}
