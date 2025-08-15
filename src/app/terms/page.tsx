import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Terms from "@/content/terms.mdx";
import MdxLayout from "@/components/mdx-layout";

export const metadata = {
  title: "Troow - Terms and Conditions",
  description: "Safe. Fast. Easy."
};

export default function Page() {
  return (
    <main className="container w-full h-screen mx-auto p-4 font-sans">
      <ScrollArea className="w-full h-full rounded-md border mb-4">
        <div className="p-4">
          <MdxLayout>
            <Terms />
          </MdxLayout>
        </div>
      </ScrollArea>
      <div className="flex justify-between items-center pb-4">
        <Button variant="link" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#" target="_blank">
            Download
          </Link>
        </Button>
      </div>
    </main>
  );
}
