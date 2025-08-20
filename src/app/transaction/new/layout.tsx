"use client";

import { PropsWithChildren } from "react";
import { FormProvider } from "@/context/form-context";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <FormProvider>{children}</FormProvider>
    </main>
  );
}
