"use server";

import {
  selectUserById,
  selectUserByEmail,
  selectTransactionById
} from "@/db/queries/select";
import type { SelectUser, SelectTransaction } from "@/db/schema";

export async function useSelectUserById(id: SelectUser["id"]) {
  return await selectUserById(id);
}

export async function useSelectUserByEmail(email: SelectUser["email"]) {
  return await selectUserByEmail(email);
}

export async function useSelectTransactionById(id: SelectTransaction["id"]) {
  return await selectTransactionById(id);
}
