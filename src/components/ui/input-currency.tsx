"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface InputCurrencyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string | number;
  onValueChange?: (value: string) => void;
}

export function InputCurrency({
  value,
  onValueChange,
  ...props
}: InputCurrencyProps) {
  const formatValue = (val: string | number | undefined) => {
    if (!val) return "";
    const num = String(val).replace(/\D/g, "");
    if (!num) return "";
    return new Intl.NumberFormat("id-ID").format(parseInt(num, 10));
  };

  const displayValue = formatValue(value);

  return (
    <div className="flex items-center group border rounded-md focus-within:border-primary">
      <FormLabel className="px-3 py-2 bg-muted rounded-md rounded-r-none text-muted-foreground text-sm select-none cursor-text">
        Rp
      </FormLabel>
      <Input
        {...props}
        value={displayValue}
        onChange={e => {
          const raw = e.target.value.replace(/\D/g, "");
          onValueChange?.(raw);
        }}
        inputMode="numeric"
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none"
        placeholder="1.000.000"
      />
    </div>
  );
}

/**
 * DISCLAIMER: This script can only be used inside form components (Shadcn/UI).
 */
