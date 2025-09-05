import { useSelectTransactionById } from "@/hooks/use-select";
import { decrypt } from "@/utils/crypto";
import { getLabel } from "@/utils/label";
import { Categories } from "@/lib/enums/categories";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export const metadata = {
  title: "Troow - Transaction Details",
  description: "View the details of a specific transaction."
};

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const role = (await searchParams).role;

  const response = await useSelectTransactionById(id);
  const data = response[0];
  console.log(data);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <div className="space-y-2 p-4 border rounded-lg shadow-sm">
        <p className="text-lg">
          <span className="font-semibold">Transaction ID:</span> {id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Role:</span>{" "}
          {role || "No role provided"}
        </p>

        <Accordion>
          <AccordionItem value="transaction">
            <AccordionTrigger>Transaction Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono">{data.id || "-"}</span>
                </div>
              
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PIN:</span>
                  <span className="font-mono">
                    {decrypt(data.pin) || "-"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-mono">{data.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-mono">
                    {getLabel(Categories, data.category ?? "") || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-mono">
                    Rp
                    {data.amount.toLocaleString("id-ID") || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note:</span>
                  <span className="font-mono">{data.note || "-"}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
