export const Categories = [
  { value: "education", label: "Education" },
  { value: "shopping", label: "Shopping" },
  { value: "bills", label: "Bills & Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food & Dining" },
  { value: "other", label: "Other" }
] as const;

export type CategoryValue = (typeof Categories)[number]["value"];
