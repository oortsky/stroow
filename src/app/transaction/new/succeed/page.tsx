"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/form-context";

import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const { form } = useFormContext();

  async function toTransaction() {
    await router.push(`/transaction/${form.transaction?.id}/${form.payer?.id}`);
  }

  return (
    <>
      <h1>Succeed</h1>
      <h2>A new transaction has been created</h2>
      <p>Check your email to get the Escrow PIN</p>

      <Button onClick={toTransaction}>Go to Transaction</Button>
    </>
  );
}
