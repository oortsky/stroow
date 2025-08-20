"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface InputPhoneProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function InputPhone({ value, onValueChange, ...props }: InputPhoneProps) {
  const localValue = value?.replace(/^\+62/, "") || "";

  return (
    <div className="flex items-center group border rounded-md focus-within:border-primary">
      <FormLabel className="px-3 py-2 bg-muted rounded-md rounded-r-none text-muted-foreground text-sm select-none cursor-text">
        +62
      </FormLabel>
      <Input
        {...props}
        value={localValue}
        onChange={e => {
          const raw = e.target.value.replace(/\D/g, "");
          onValueChange?.(raw ? `+62${raw}` : "");
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none"
        placeholder="87306102004"
      />
    </div>
  );
}

/**
 * DISCLAIMER: This script can only be used inside form components (Shadcn/UI).
 */