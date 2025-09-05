import React from "react";
import { ProgressBar } from "@/components/progress-bar";
import { FormProvider } from "@/context/form-context";

export const metadata = {
  title: "Troow - New Transaction",
  description: "Safe. Fast. Easy."
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="container mx-auto py-4">
      <div className="max-w-md px-4 py-6 space-y-6 lg:rounded-lg lg:shadow">
        <ProgressBar />
        <FormProvider>{children}</FormProvider>
      </div>
    </main>
  );
}
