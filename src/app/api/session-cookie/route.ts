import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const existingSession = req.cookies.get("session_id");

  if (existingSession) {
    return NextResponse.json({ message: "Session cookie already exists" }, { status: 200 });
  }

  const sessionId = crypto.randomUUID();

  const response = NextResponse.json({ message: "Session cookie created successfully" }, { status: 201 });

  response.cookies.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
