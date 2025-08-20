export enum TransactionStatusEnum {
  PENDING = "pending",
  PAID = "paid",
  PROCEEDED = "proceeded",
  RECEIVED = "received",
  RELEASED = "released",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded"
}

export const TransactionStatusLabels: Record<TransactionStatusEnum, string> = {
  [TransactionStatusEnum.PENDING]: "Pending",
  [TransactionStatusEnum.PAID]: "Paid",
  [TransactionStatusEnum.PROCEEDED]: "Proceeded",
  [TransactionStatusEnum.RECEIVED]: "Received",
  [TransactionStatusEnum.RELEASED]: "Released",
  [TransactionStatusEnum.COMPLETED]: "Completed",
  [TransactionStatusEnum.CANCELLED]: "Cancelled",
  [TransactionStatusEnum.REFUNDED]: "Refunded"
};