export const metadata = {
  title: "Troow - PIN Verification",
  description: "Please enter your PIN to continue viewing transaction details."
};

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const role = (await searchParams).role;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <div className="space-y-2 p-4 border rounded-lg shadow-sm">
        <p className="text-lg">
          <span className="font-semibold">Transaction ID:</span> {id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Role:</span>{" "}
          {role || "No role provided"}
        </p>
      </div>
    </main>
  );
}
