"use server";

import { updateUser, updateTransaction } from "@/db/queries/update";
import type { SelectUser, SelectTransaction } from "@/db/schema";

export async function useUpdateUser(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
) {
  return await updateUser(id, data);
}

export async function useUpdateTransaction(
  id: SelectTransaction["id"],
  data: Partial<Omit<SelectTransaction, "id">>
) {
  return await updateTransaction(id, data);
}
