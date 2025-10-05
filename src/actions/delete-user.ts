"use server";

import { deleteUser as deleteUserFromData } from "@/db/user/mutations/delete-user";
import type { SelectUser } from "@/db/schema";

export async function deleteUser(id: SelectUser["id"]) {
  return await deleteUserFromData(id);
}
