"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/form-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banks } from "@/lib/enums/banks";
import { randomID } from "@/utils/id";
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

const payerSchema = z.object({
  id: z
    .string()
    .transform(val => (val && val.length > 0 ? val : randomID("PYR"))),
  first_name: z.string().min(3, "First name must be at least 3 characters."),
  last_name: z.string().min(3, "Last name must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+62\d{9,13}$/, {
    message: "Phone must start with +62 and be 11–15 digits."
  })
});

type PayerFormValues = z.output<typeof payerSchema>;

export default function Page() {
  const router = useRouter();
  const { form, updateForm } = useFormContext();

  const stepOneForm = useForm<PayerFormValues>({
    resolver: zodResolver(payerSchema),
    mode: "onChange",
    defaultValues: {
      ...form.payer,
      id: form.payer?.id || randomID("PYR")
    }
  });

  function onSubmit(values: PayerFormValues) {
    updateForm({ payer: { ...values } });
    Cookies.set("step1-done", "true", { path: "/transaction/new" });
    router.push("/transaction/new/step-two");
  }

  function prevStep() {
    Cookies.remove("step1-done", { path: "/transaction/new" });
    router.back();
  }

  return (
    <Form {...stepOneForm}>
      <form onSubmit={stepOneForm.handleSubmit(onSubmit)} className="space-y-6">
        {/* --- First Name --- */}
        <FormField
          control={stepOneForm.control}
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
          control={stepOneForm.control}
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
          control={stepOneForm.control}
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
          control={stepOneForm.control}
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
