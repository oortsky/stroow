"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useFormContext } from "@/context/form-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories } from "@/lib/enums/categories";
import { TransactionStatusEnum } from "@/lib/enums/transaction-status";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { InputCurrency } from "@/components/ui/input-currency";

import { randomID } from "@/utils/id";
import { randomPIN } from "@/utils/pin";
import { encrypt } from "@/utils/crypto";

const calcServiceFee = (amount: number) => {
  if (amount <= 500_000) return 8000;
  const fee = Math.floor(amount * 0.016);
  return fee > 50_000 ? 50_000 : fee;
};

const transactionFormSchema = z.object({
  id: z
    .string()
    .transform(val => (val && val.length > 0 ? val : randomID("TRX"))),
  name: z.string().min(3, "Transaction name must be at least 3 characters."),
  category: z.enum(
    Categories.map(c => c.value),
    {
      message: "Please select a valid category."
    }
  ),
  amount: z
    .number()
    .min(10000, "Transaction amount must be at least Rp10.000."),
  note: z.string().optional()
});

type TransactionFormValues = z.output<typeof transactionFormSchema>;

export default function Page() {
  const router = useRouter();
  const { form, updateForm, currentStep, setCurrentStep, totalSteps } =
    useFormContext();

  const stepThreeForm = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    mode: "onChange",
    defaultValues: {
      ...form.transaction,
      id: form.transaction?.id || randomID("TRX")
    }
  });

  function onSubmit(values: TransactionFormValues) {
    const payer = form.payer;
    const payee = form.payee;

    const service_fee = calcServiceFee(values.amount);
    const total = values.amount + service_fee;

    const trx = {
      ...values,
      payer_id: payer?.id ?? randomID("PYR"),
      payee_id: payee?.id ?? randomID("PYE"),
      service_fee,
      total,
      status: TransactionStatusEnum.PENDING,
      pin: encrypt(randomPIN()),
      snap: {
        transaction_details: {
          order_id: values.id,
          gross_amount: total
        },
        item_details: [
          { name: values.name, price: values.amount, quantity: 1 },
          { name: "Service Fee", price: service_fee, quantity: 1 }
        ],
        customer_details: {
          first_name: payer?.first_name ?? "",
          last_name: payer?.last_name ?? "",
          email: payer?.email ?? "",
          phone: payer?.phone ?? ""
        }
      }
    };

    updateForm({ transaction: trx });
    router.push("/transaction/new/step-four");
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }
  
  function prevStep() {
    router.back();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <Form {...stepThreeForm}>
      <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* --- Name --- */}
        <FormField
          control={stepThreeForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Album NewJeans 2027" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Category --- */}
        <FormField
          control={stepThreeForm.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  items={[...Categories]}
                  placeholder="Select category..."
                  searchPlaceholder="Search category..."
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Amount --- */}
        <FormField
          control={stepThreeForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <InputCurrency
                  value={field.value}
                  onValueChange={val => field.onChange(Number(val))}
                />
              </FormControl>
              <FormDescription>Minimum transaction Rp10.000.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Note --- */}
        <FormField
          control={stepThreeForm.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                You can add a note for your own reference.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Buttons --- */}
        <div className="flex justify-between pt-6">
<Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
