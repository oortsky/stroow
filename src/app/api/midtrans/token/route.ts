import midtransClient from "midtrans-client";
import { z } from "zod";
import { NextResponse } from "next/server";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_MID_SERVER_KEY!
});

const snapSchema = z.object({
  transaction_details: z.object({
    order_id: z.string().min(1, "Order ID is required."),
    gross_amount: z.number().min(1, "Gross amount is required.")
  }),
  item_details: z.array(
    z.object({
      name: z.string().min(1, "Item name is required."),
      price: z.number().min(1, "Item price is required."),
      quantity: z.number().min(1).default(1)
    })
  ),
  customer_details: z.object({
    first_name: z.string().min(3, "First name must be at least 3 characters."),
    last_name: z.string().min(3, "Last name must be at least 3 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().regex(/^\+62\d{9,13}$/, {
      message: "Phone must start with +62 and be 11–15 digits."
    })
  })
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = snapSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { transaction_details, item_details, customer_details } =
      parseResult.data;

    const transactionParams: midtransClient.TransactionParams = {
      transaction_details,
      item_details,
      customer_details
    };

    const transaction = await snap.createTransaction(transactionParams);

    return NextResponse.json(
      {
        token: transaction.token,
        redirect_url: transaction.redirect_url
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
