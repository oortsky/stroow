export const Banks = [
  { value: "mandiri", label: "Bank Mandiri" },
  { value: "bca", label: "BCA" },
  { value: "cimb", label: "CIMB Niaga" },
  { value: "danamon", label: "Bank Danamon" },
  { value: "bni", label: "BNI" },
  { value: "bri", label: "BRI" },
  { value: "permata", label: "Bank Permata" }
] as const;

export type BankValue = (typeof Banks)[number]["value"];