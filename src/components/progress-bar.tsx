"use client";

import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import React from "react";

const wordToNumber: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};

export function ProgressBar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  let currentStep = 1;
  if (lastSegment.includes("step-")) {
    const stepWord = lastSegment.split("-")[1];
    currentStep = wordToNumber[stepWord] || 1;
  }

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles: Record<number, string> = {
    1: "Payer Info",
    2: "Payee Info",
    3: "Transaction Details",
    4: "Review & Payment"
  };

  const stepDescriptions: Record<number, string> = {
    1: "Provide your information as the payer.",
    2: "Next, fill in all the payee's details.",
    3: "Enter amount and notes for transaction.",
    4: "Review all details before continuing."
  };

  const title = stepTitles[currentStep];
  const description = stepDescriptions[currentStep];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm font-light text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
