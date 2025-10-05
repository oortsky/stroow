import { eq } from "drizzle-orm";
import { db } from "../../index";
import { users } from "../../schema";
import type { SelectUser } from "../../schema";

export async function updateUser(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
) {
  const response = await db.update(users).set(data).where(eq(users.id, id));
  return response;
}
