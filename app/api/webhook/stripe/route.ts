// app/api/webhook/stripe/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Stripe webhook
  return NextResponse.json({ received: true });
}
