import { eq } from "drizzle-orm";
import { db } from "../../index";
import { users } from "../../schema";
import type { SelectUser } from "../../schema";

export async function selectUserByEmail(email: SelectUser["email"]) {
  const response = await db.select().from(users).where(eq(users.email, email));
  return response;
}
