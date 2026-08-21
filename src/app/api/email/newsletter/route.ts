import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import NewsletterConfirmationEmail from "@/emails/newsletter-confirmation";

/**
 * Legacy's newsletter form told users to check their email and sent nothing
 * (BRAND_EXTRACT.md §3). This is the route that actually does it.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await resend.emails.send({
      from: process.env.AUTO_EMAIL!,
      to: email,
      subject: "You're subscribed",
      react: NewsletterConfirmationEmail(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
