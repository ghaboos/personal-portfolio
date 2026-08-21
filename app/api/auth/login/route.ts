import { NextResponse } from "next/server";
import { createSessionToken, isAuthConfigured, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!isAuthConfigured()) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
    const { password } = await request.json();
    if (typeof password !== "string" || !verifyPassword(password)) return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", createSessionToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch { return NextResponse.json({ error: "Login failed." }, { status: 500 }); }
}
