"use client";

import { useEffect } from "react";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";

interface UseSameAsNameProps<T extends FieldValues> {
  sameAsName: boolean;
  fullName: string;
  form: UseFormReturn<T>;
  fieldName: Path<T>;
}

export function useSameAsName<T extends FieldValues>({
  sameAsName,
  fullName,
  form,
  fieldName
}: UseSameAsNameProps<T>) {
  useEffect(() => {
    if (sameAsName && fullName) {
      form.setValue(
        fieldName,
        fullName.toUpperCase() as PathValue<T, Path<T>>,
        {
          shouldValidate: true
        }
      );
    }
  }, [sameAsName, fullName, form, fieldName]);
}
