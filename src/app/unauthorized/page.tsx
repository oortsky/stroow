"use client";

import { useSearchParams } from "next/navigation";

const reasonMessages: Record<string, string> = {
  expired: "Unauthorized: Your session has expired.",
  invalid: "Unauthorized: Invalid PIN or transaction.",
  blocked: "Unauthorized: Your account has been blocked."
};

export default function Page() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const message =
    (reason && reasonMessages[reason]) ||
    (reason
      ? `Unauthorized: ${reason}`
      : "Unauthorized: Please verify your PIN first");

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-bold text-red-600">{message}</h1>
    </div>
  );
}
