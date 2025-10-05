"use server";

import { selectTransactionById as selectTransactionByIdFromData } from "@/db/transaction/queries/select-transaction-by-id";
import type { SelectTransaction } from "@/db/schema";

export async function getTransactionById(id: SelectTransaction["id"]) {
  return await selectTransactionByIdFromData(id);
}
