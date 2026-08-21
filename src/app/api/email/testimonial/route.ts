import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import TestimonialReplyEmail from "@/emails/testimonial-reply";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    await resend.emails.send({
      from: process.env.AUTO_EMAIL!,
      to: email,
      subject: "Thanks for sharing your experience",
      react: TestimonialReplyEmail({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
