import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Privacy, { attributes } from "@/content/privacy.md";
import MdxLayout from "@/components/mdx-layout";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const metadata = {
  title: "Troow - Privacy Policy",
  description: "Safe. Fast. Easy.",
  openGraph: {
    title: "Troow - Privacy Policy",
    description: "Safe. Fast. Easy.",
    type: "article",
    publishedTime: attributes.date,
  }
};

dayjs.locale("id");

export default function Page() {
  const { title, date } = attributes;

  const formattedDate = dayjs(date).format("dddd, D MMMM YYYY");

  return (
    <main className="container w-full h-screen mx-auto p-4 font-sans">
      <ScrollArea className="w-full h-full rounded-md border mb-4">
        <div className="p-4">
          <MdxLayout>
            <h1>{title}</h1>
            <p>
              <strong>Tanggal Berlaku:</strong> {formattedDate}
            </p>
            <Privacy />
          </MdxLayout>
        </div>
      </ScrollArea>
      <div className="flex justify-between items-center pb-4">
        <Button variant="link" asChild>
          <Link href="/" aria-label="Back to Home">
            Back to Home
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#" target="_blank" download>
            Download
          </Link>
        </Button>
      </div>
    </main>
  );
}
