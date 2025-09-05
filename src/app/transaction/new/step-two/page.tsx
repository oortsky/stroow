"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/form-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banks } from "@/lib/enums/banks";
import { randomID } from "@/utils/id";
import { getFullName } from "@/utils/fullname";
import { useSameAsName } from "@/hooks/use-same-as-name";
import Cookies from "js-cookie";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/input-phone";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const payeeSchema = z.object({
  id: z
    .string()
    .transform(val => (val && val.length > 0 ? val : randomID("PYR"))),
  first_name: z.string().min(3, "First name must be at least 3 characters."),
  last_name: z.string().min(3, "Last name must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+62\d{9,13}$/, {
    message: "Phone must start with +62 and be 11–15 digits."
  }),
  account_bank: z.enum(
    Banks.map(b => b.value),
    {
      message: "Please select a valid bank."
    }
  ),
  account_number: z
    .string()
    .min(5, "Account number must be at least 5 digits."),
  account_holder_name: z
    .string()
    .min(3, "Account holder name must be at least 3 characters."),
  same_as_name: z.boolean().default(false).optional()
});

type PayeeFormValues = z.output<typeof payeeSchema>;

export default function StepTwoPage() {
  const router = useRouter();
  const { form, updateForm } = useFormContext();

  const stepTwoForm = useForm<PayeeFormValues>({
    resolver: zodResolver(payeeSchema),
    mode: "onChange",
    defaultValues: {
      ...form.payee,
      id: form.payee?.id || randomID("PYE")
    }
  });

  const sameAsName = stepTwoForm.watch("same_as_name") ?? false;
  const fullName = getFullName(
    stepTwoForm.watch("first_name"),
    stepTwoForm.watch("last_name")
  );

  useSameAsName({
    sameAsName,
    fullName,
    form: stepTwoForm,
    fieldName: "account_holder_name"
  });

  function onSubmit(values: PayeeFormValues) {
    updateForm({ payee: { ...values, same_as_name: sameAsName } });
    Cookies.set("step2-done", "true", { path: "/transaction/new" });
    router.push("/transaction/new/step-three");
  }

  function prevStep() {
    Cookies.remove("step2-done", { path: "/transaction/new" });
    router.back();
  }

  return (
    <Form {...stepTwoForm}>
      <form onSubmit={stepTwoForm.handleSubmit(onSubmit)} className="space-y-6">
        {/* --- First Name --- */}
        <FormField
          control={stepTwoForm.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Last Name --- */}
        <FormField
          control={stepTwoForm.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Email --- */}
        <FormField
          control={stepTwoForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Phone --- */}
        <FormField
          control={stepTwoForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <InputPhone
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Account Bank --- */}
        <FormField
          control={stepTwoForm.control}
          name="account_bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Bank</FormLabel>
              <FormControl>
                <Combobox
                  items={[...Banks]}
                  placeholder="Select bank..."
                  searchPlaceholder="Search bank..."
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Account Number --- */}
        <FormField
          control={stepTwoForm.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input inputMode="numeric" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Account Holder Name + Switch --- */}
        <FormField
          control={stepTwoForm.control}
          name="account_holder_name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Account Holder Name</FormLabel>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="sameAsName"
                    className="text-xs text-muted-foreground"
                  >
                    Same as Name
                  </Label>
                  <Switch
                    id="sameAsName"
                    checked={sameAsName}
                    onCheckedChange={val =>
                      stepTwoForm.setValue("same_as_name", val)
                    }
                  />
                </div>
              </div>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value.toUpperCase())}
                  disabled={sameAsName}
                />
              </FormControl>
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
