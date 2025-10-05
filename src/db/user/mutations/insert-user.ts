import { db } from "../../index";
import { users } from "../../schema";
import type { InsertUser } from "../../schema";

export async function insertUser(data: InsertUser) {
  const response = await db.insert(users).values(data);
  return response;
}
