import { metadata } from "@/app/(auth)/layout";

import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItem, customer } = await req.json();
    console.log('Received cartItem:', cartItem);
    console.log('Received customer:', customer);

    if (!cartItem || !customer) {
      return new NextResponse("chua du du lieu", { status: 400 });
    }

    const lineItems = cartItem.map((item: any) => {
      console.log('Processing item:', item);

      if (!item.quantity) {
        throw new Error(`Quantity is missing for item with id ${item.item._id}`);
      }

      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.item.title,
            metadata: {
              productId: item.item._id,
            },
          },
          unit_amount: item.item.price,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1PgCB4RxgjpldBPSzUp2ZySJ" },
        { shipping_rate: "shr_1PfvqoRxgjpldBPSd0uVMJSM" },
      ],
      line_items: lineItems,
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    });

   
    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_post]", err);
    return new NextResponse("loi server ", { status: 500 });
  }
}