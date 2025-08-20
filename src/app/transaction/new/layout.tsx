"use client";

import { PropsWithChildren } from "react";
import { FormProvider, useFormContext } from "@/context/form-context";
import { Progress } from "@/components/ui/progress";

function ProgressBar() {
  const { currentStep, totalSteps } = useFormContext();
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles: Record<number, string> = {
    1: "Payer Information",
    2: "Payee Information",
    3: "Transaction Details",
    4: "Summary & Payment"
  };

  const title = stepTitles[currentStep] || "Form Step";

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-mono font-bold text-center">{title}</h2>
      <Progress value={progress} className="w-full" />
    </div>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <FormProvider>
        <div className="px-4 py-6 rounded-lg shadow space-y-6">
          <ProgressBar />
          {children}
        </div>
      </FormProvider>
    </main>
  );
}
