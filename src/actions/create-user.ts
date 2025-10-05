"use server";

import { insertUser as insertUserData } from "@/db/user/mutations/insert-user";
import type { InsertUser } from "@/db/schema";

export async function createUser(data: InsertUser) {
  return await insertUserData(data);
}
