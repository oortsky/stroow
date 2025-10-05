import { NextResponse } from "next/server";
import { selectTransactionById } from "@/db/queries/select";

async function validateTransaction(
  transactionId: string,
  roleId: string,
  pin: string
) {
  const transaction = await selectTransactionById(transactionId);

  if (!transaction) {
    return { valid: false, reason: "invalid" as const };
  }

  const isRoleValid =
    transaction.payer_id === roleId || transaction.payee_id === roleId;

  if (!isRoleValid) {
    return { valid: false, reason: "invalid" as const };
  }

  if (transaction.pin !== pin) {
    return { valid: false, reason: "invalid" as const };
  }

  return { valid: true as const };
}

export async function POST(req: Request) {
  const { transactionId, roleId, pin } = await req.json();

  const result = await validateTransaction(transactionId, roleId, pin);

  if (!result.valid) {
    return NextResponse.json(
      { success: false, reason: result.reason },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("transaction-session", `${transactionId}:${roleId}`, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 10
  });

  return res;
}
