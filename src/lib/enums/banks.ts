export const Banks = [
  // Major Banks
  { value: "bca", label: "Bank Central Asia" },
  { value: "mandiri", label: "Bank Mandiri" },
  { value: "bri", label: "Bank Rakyat Indonesia" },
  { value: "bni", label: "Bank Negara Indonesia" },
  { value: "cimb", label: "CIMB Niaga" },
  { value: "danamon", label: "Bank Danamon" },
  { value: "permata", label: "Bank Permata" },

  // Digital and Other Banks
  { value: "bca_syariah", label: "BCA Syariah" },
  { value: "bsi", label: "Bank Syariah Indonesia" },
  { value: "btn", label: "Bank Tabungan Negara" },
  { value: "jenius", label: "Jenius (BTPN)" },
  { value: "jago", label: "Bank Jago" },
  { value: "ocbc", label: "OCBC NISP" },
  { value: "panin", label: "Panin Bank" },
  { value: "maybank", label: "Maybank Indonesia" },

  // E-Wallets
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "dana", label: "DANA" },
  { value: "shopeepay", label: "ShopeePay" },
  { value: "linkaja", label: "LinkAja" },

  // Other Options
  { value: "other", label: "Other Bank / E-Wallet" }
] as const;

export type BankValue = (typeof Banks)[number]["value"];
