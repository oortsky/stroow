"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useFormContext } from "@/context/form-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLabel } from "@/utils/label";
import { Categories } from "@/lib/enums/categories";
import { Banks } from "@/lib/enums/banks";
import { getFullName } from "@/utils/fullname";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";

const additionalSchema = z.object({
  isAcceptTnC: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions."
  })
});

type AdditionalFormValues = z.output<typeof additionalSchema>;

export default function Page() {
  const router = useRouter();
  const { form, updateForm, currentStep, setCurrentStep, totalSteps } =
    useFormContext();

  const stepFourSchema = useForm<AdditionalFormValues>({
    resolver: zodResolver(additionalSchema),
    mode: "onSubmit",
    defaultValues: form.additional
  });

  function onSubmit(values: AdditionalFormValues) {
    updateForm({
      additional: { ...values }
    });

    console.log("Form Data:", form);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(form, null, 2)}</code>
        </pre>
      )
    });
  }

  function prevStep() {
    router.back();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className="space-y-6">
      {/* --- Transaction Review --- */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            Here’s a quick recap of your transaction with payer and payee
            details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {/* --- Payer Information --- */}
            <AccordionItem value="payer">
              <AccordionTrigger>Payer Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono">{form.payer?.id || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-mono">
                      {getFullName(
                        form.payer?.first_name,
                        form.payer?.last_name
                      ) || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-mono">
                      {form.payer?.email || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-mono">
                      {form.payer?.phone || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Bank:</span>
                    <span className="font-mono">
                      {getLabel(Banks, form.payer?.account_bank ?? "") || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Account Number:
                    </span>
                    <span className="font-mono">
                      {form.payer?.account_number || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Account Holder:
                    </span>
                    <span className="font-mono">
                      {form.payer?.account_holder_name || "-"}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* --- Payee Information --- */}
            <AccordionItem value="payee">
              <AccordionTrigger>Payee Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono">{form.payee?.id || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-mono">
                      {getFullName(
                        form.payee?.first_name,
                        form.payee?.last_name
                      ) || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-mono">
                      {form.payee?.email || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-mono">
                      {form.payee?.phone || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Bank:</span>
                    <span className="font-mono">
                      {getLabel(Banks, form.payee?.account_bank ?? "") || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Account Number:
                    </span>
                    <span className="font-mono">
                      {form.payee?.account_number || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Account Holder:
                    </span>
                    <span className="font-mono">
                      {form.payee?.account_holder_name || "-"}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* --- Transaction Information --- */}
            <AccordionItem value="transaction">
              <AccordionTrigger>Transaction Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono">
                      {form.transaction?.id || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-mono">
                      {form.transaction?.name || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-mono">
                      {getLabel(Categories, form.transaction?.category ?? "") ||
                        "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-mono">
                      Rp
                      {form.transaction?.amount.toLocaleString("id-ID") || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Note:</span>
                    <span className="font-mono">
                      {form.transaction?.note || "-"}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Double-check everything here before moving on to payment.
          </p>
        </CardFooter>
      </Card>

      {/* --- Transaction Calculation --- */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Here’s a quick summary of your payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Amount:</span>
              <span className="font-mono">
                Rp{form.transaction?.amount.toLocaleString("id-ID") || "0"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Service Fee (
                {form.transaction?.amount < 500000 ? "Fixed" : "1.6%"}):
              </span>
              <span className="font-mono">
                Rp{form.transaction?.service_fee.toLocaleString("id-ID") || "0"}
              </span>
            </div>

            {/* --- Divider --- */}
            <hr className="my-3 border-t border-muted" />

            <div className="flex justify-between text-base font-semibold">
              <span className="text-muted-foreground">Total Payment:</span>
              <span className="font-mono font-bold">
                Rp{form.transaction?.total.toLocaleString("id-ID") || "0"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            The total is your amount plus the service fee.
          </p>
        </CardFooter>
      </Card>

      {/* --- Terms and Conditions --- */}
      <Form {...stepFourSchema}>
        <form onSubmit={stepFourSchema.handleSubmit(onSubmit)}>
          <FormField
            control={stepFourSchema.control}
            name="isAcceptTnC"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      id="terms-2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms-2">
                      Accept terms and conditions
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      By clicking this checkbox, you agree to the terms and
                      conditions.
                    </p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- Buttons --- */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit">Pay Escrow</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
