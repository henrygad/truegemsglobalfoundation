import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactReplyEmail from "@/emails/contact-reply";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: process.env.AUTO_EMAIL!,
      to: email,
      subject: "We received your message",
      react: ContactReplyEmail({ name }),
    });

    await resend.emails.send({
      from: process.env.AUTO_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      replyTo: email,
      subject: "New contact form message",
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
