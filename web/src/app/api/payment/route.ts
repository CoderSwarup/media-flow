import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2024-11-20.acacia",
    });

    const products = await stripe.prices.list({
      limit: 3,
    });

    return NextResponse.json(products.data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching products" });
  }
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2024-11-20.acacia",
  });
  const data = await req.json();
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
  });
  return NextResponse.json(session.url);
}
