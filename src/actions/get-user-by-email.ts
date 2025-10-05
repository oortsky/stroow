"use server";

import { selectUserByEmail as selectUserByEmailFromData } from "@/db/queries/select";
import type { SelectUser } from "@/db/schema";

export async function getUserByEmail(email: SelectUser["email"]) {
  return await selectUserByEmailFromData(email);
}
