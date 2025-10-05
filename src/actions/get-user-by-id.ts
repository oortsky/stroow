"use server";

import { selectUserById as selectUserByIdFromData } from "@/db/user/queries/select-user-by-id";
import type { SelectUser } from "@/db/schema";

export async function getUserById(id: SelectUser["id"]) {
  return await selectUserByIdFromData(id);
}
