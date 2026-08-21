import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/config/site";

type DonationRequest = {
  donationType: "one-time" | "monthly";
  amount: number | string;
  focusArea: string;
  name: string;
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { donationType, amount: rawAmount, focusArea, name, email } = (await req.json()) as DonationRequest;

    const amount = typeof rawAmount === "string" ? parseFloat(rawAmount) : rawAmount;

    if (!donationType || !amount || amount <= 0 || !focusArea || !name) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: donationType === "monthly" ? "subscription" : "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_creation: "always",
      ...(email && { customer_email: email }),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Donation" },
            unit_amount: Math.round(amount * 100),
            ...(donationType === "monthly" && { recurring: { interval: "month" } }),
          },
          quantity: 1,
        },
      ],
      // siteConfig.baseUrl is Zod-validated to include the https:// scheme —
      // a bare domain here silently breaks these URLs (BRAND_EXTRACT.md §3).
      success_url: `${siteConfig.baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.baseUrl}/donate/failed`,
      metadata: { name, focusArea, donationType },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Stripe error. Please try again." }, { status: 500 });
  }
}
