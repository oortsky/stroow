import { eq } from "drizzle-orm";
import { db } from "../../index";
import { users } from "../../schema";
import type { SelectUser } from "../../schema";

export async function deleteUser(id: SelectUser["id"]) {
  const response = await db.delete(users).where(eq(users.id, id));
  return response;
}
