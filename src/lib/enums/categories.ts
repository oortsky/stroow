export const Categories = [
  // Pengeluaran Rutin & Kebutuhan Pokok
  { value: "food_dining", label: "Food & Dining" },
  { value: "groceries", label: "Groceries" },
  { value: "bills_utilities", label: "Bills & Utilities" },
  { value: "transportation", label: "Transportation" },
  { value: "shopping", label: "Shopping" },

  // Lifestyle & Hiburan
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "health_fitness", label: "Health & Fitness" },
  { value: "hobbies", label: "Hobbies" },

  // Keuangan & Investasi
  { value: "loan_debt", label: "Loan & Debt" },
  { value: "investment", label: "Investment" },
  { value: "savings", label: "Savings" },
  { value: "insurance", label: "Insurance" },

  // Lain-lain
  { value: "education", label: "Education" },
  { value: "gifts", label: "Gifts & Donations" },
  { value: "work_business", label: "Work & Business" },
  { value: "other", label: "Other" },
] as const;

export type CategoryValue = (typeof Categories)[number]["value"];