"use server";

import { updateUser as updateUserData } from "@/db/user/mutations/update-user";
import type { SelectUser } from "@/db/schema";

export async function updateUser(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
) {
  return await updateUserData(id, data);
}
