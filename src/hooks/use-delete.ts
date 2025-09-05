"use server";

import { deleteUser, deleteTransaction } from "@/db/queries/delete";
import type { SelectUser, SelectTransaction } from "@/db/schema";

export async function useDeleteUser(id: SelectUser["id"]) {
  return await deleteUser(id);
}

export async function useDeleteTransaction(id: SelectTransaction["id"]) {
  return await deleteTransaction(id);
}
