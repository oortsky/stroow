import { eq } from "drizzle-orm";
import { db } from "../../index";
import { users } from "../../schema";
import type { SelectUser } from "../../schema";

export async function selectUserById(id: SelectUser["id"]) {
  const response = await db.select().from(users).where(eq(users.id, id));
  return response;
}
