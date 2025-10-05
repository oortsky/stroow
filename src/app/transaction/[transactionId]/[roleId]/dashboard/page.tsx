import { getTransactionById } from "@/actions/get-transaction-by-id";
import { getUserById } from "@/actions/get-user-by-id";
import { getLabel } from "@/utils/label";
import { getFullName } from "@/utils/fullname";
import { decrypt } from "@/utils/crypto";
import { getUserRole } from "@/utils/role";
import { Banks } from "@/lib/enums/banks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QRCode } from "@/components/qr-code";
import { ShareButton } from "@/components/share-button";
import { CopyButton } from "@/components/copy-button";
import { StatusBadge } from "@/components/status-badge";
import { ProofContent } from "@/components/proof-content";
import {
  DollarSign,
  User,
  Tag,
  Shield,
  FileText,
  Info,
  Users,
  Mail,
  Phone,
  CreditCard,
  Share2
} from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Troow - Transaction Details",
  description: "View comprehensive details of your escrow transaction."
};

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const role = (await searchParams).role as string;

  const response = await getTransactionById(id);
  const data = response[0];

  const [payerResponse, payeeResponse] = await Promise.all([
    getUserById(data.payer_id),
    getUserById(data.payee_id)
  ]);

  const payer = payerResponse[0];
  const payee = payeeResponse[0];

  const payeeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/transaction/${data.id}?role=${data.payee_id}`;
  const userRole = getUserRole(role, data.payer_id, data.payee_id);
  const decryptedPin = decrypt(data.pin);

  return (
    <main className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono">{data.id}</span>
          <CopyButton size="sm" value={data.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left - Main Section */}
        <div className="space-y-6">
          {/* Transaction Overview */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Transaction Details
              </CardTitle>
              <CardDescription>
                Current status and basic information about this transaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col p-3 gap-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">
                  Transaction Amount
                </span>
                <span className="text-3xl font-bold font-mono">
                  Rp{data.amount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-medium">
                  <StatusBadge status={data.status} />
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="font-medium">
                  <Badge variant="outline" className="capitalize">
                    <Tag className="w-3 h-3 mr-1" />
                    {data.category}
                  </Badge>
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">Your Role</span>
                <span className="font-medium">
                  <Badge variant="secondary">
                    <User className="w-3 h-3 mr-1" />
                    {userRole.label}
                  </Badge>
                </span>
              </div>

              <div className="flex flex-col p-3 gap-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">
                  Parties Involved
                </span>
                <span className="font-medium">
                  <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem
                      className="w-full rounded-md px-3 bg-muted/50 border"
                      value="payer"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Payer</span>
                          {userRole.role === "payer" ? (
                            <Badge>You</Badge>
                          ) : null}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center p-2 rounded-md bg-muted/60 border">
                            <span className="text-muted-foreground">ID</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                <Badge
                                  variant="outline"
                                  className="normal-case"
                                >
                                  {payer.id}
                                </Badge>
                              </span>
                              <CopyButton size="sm" value={payer.id} />
                            </div>
                          </div>
                          {payer.first_name && payer.last_name && (
                            <div className="flex justify-between p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Name
                              </span>
                              <span className="font-medium">
                                <Badge variant="outline" className="capitalize">
                                  {getFullName(
                                    payer.first_name,
                                    payer.last_name
                                  )}
                                </Badge>
                              </span>
                            </div>
                          )}
                          {payer.email && (
                            <div className="flex justify-between p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Email
                              </span>
                              <span className="font-medium">
                                <Badge variant="outline" className="lowercase">
                                  {payer.email}
                                </Badge>
                              </span>
                            </div>
                          )}
                          {payer.phone && (
                            <div className="flex justify-between p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Phone
                              </span>
                              <span className="font-medium">
                                <Badge
                                  variant="outline"
                                  className="normal-nums"
                                >
                                  {payer.phone}
                                </Badge>
                              </span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      className="w-full rounded-md px-3 bg-muted/50 border"
                      value="payee"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Payee</span>
                          {userRole.role === "payee" ? (
                            <Badge>You</Badge>
                          ) : null}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center p-2 rounded-md bg-muted/60 border">
                            <span className="text-muted-foreground">ID</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                <Badge
                                  variant="outline"
                                  className="normal-case"
                                >
                                  {payee.id}
                                </Badge>
                              </span>
                              <CopyButton size="sm" value={payee.id} />
                            </div>
                          </div>
                          {payee.first_name && payee.last_name && (
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Name
                              </span>
                              <span className="font-medium">
                                <Badge variant="outline" className="capitalize">
                                  {getFullName(
                                    payee.first_name,
                                    payee.last_name
                                  )}
                                </Badge>
                              </span>
                            </div>
                          )}
                          {payee.email && (
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Email
                              </span>
                              <span className="font-medium">
                                <Badge variant="outline" className="lowercase">
                                  {payee.email}
                                </Badge>
                              </span>
                            </div>
                          )}
                          {payee.phone && (
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/60 border">
                              <span className="text-muted-foreground">
                                Phone
                              </span>
                              <span className="font-medium">
                                <Badge
                                  variant="outline"
                                  className="normal-nums"
                                >
                                  {payee.phone}
                                </Badge>
                              </span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </span>
              </div>

              {data.note && (
                <div className="flex flex-col p-3 gap-3 rounded-md bg-muted/40 border">
                  <span className="text-sm text-muted-foreground">Note</span>
                  <span className="font-medium">
                    <ScrollArea className="min-h-fit max-h-20 w-full rounded-md p-3 bg-muted/50 border">
                      <p className="text-sm leading-relaxed">{data.note}</p>
                    </ScrollArea>
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">Confirmation</Button>
            </CardFooter>
          </Card>

          {/* Bank Destination */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Destination Bank Account
              </CardTitle>
              <CardDescription>
                Funds will be released to this account after transaction
                completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">
                  Account Bank
                </span>
                <span className="font-medium">
                  <Badge variant="outline" className="capitalize">
                    {getLabel(Banks, payee.account_bank)}
                  </Badge>
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">
                  Account Number
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    <Badge variant="outline" className="normal-nums">
                      {payee.account_number}
                    </Badge>
                  </span>
                  <CopyButton size="sm" value={payee.account_number} />
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-md bg-muted/40 border">
                <span className="text-sm text-muted-foreground">
                  Account Holder
                </span>
                <span className="font-medium">
                  <Badge variant="outline" className="uppercase">
                    {payee.account_holder_name}
                  </Badge>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Escrow PIN */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Escrow Security Code
              </CardTitle>
              <CardDescription>
                Your 6-digit verification code for releasing escrow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  className="text-lg font-mono"
                  maxLength={6}
                  value={decryptedPin}
                  readOnly
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot key={i} index={i} className="w-11 h-11" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex gap-2 justify-center">
                <CopyButton value={decryptedPin} size="sm" variant="outline" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right - Sidebar */}
        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Share Transaction
              </CardTitle>
              <CardDescription>
                Share this secure link with the other party
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <QRCode value={payeeUrl} />
                <Input
                  value={payeeUrl}
                  className="text-xs font-mono"
                  readOnly
                />
              </div>
            </CardContent>
            <CardFooter>
              <ShareButton
                title="Share Transaction"
                link={payeeUrl}
                text={`Secure escrow payment for: ${data.name}`}
                className="w-full"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
