import { NextRequest, NextResponse } from "next/server";
import { isValidSession } from "@/lib/auth";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();
  const token = request.cookies.get("admin_session")?.value;
  if (isValidSession(token)) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/admin/:path*"] };
