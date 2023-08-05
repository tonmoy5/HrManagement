import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const legacyPrefixes = ["/api/auth"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && pathname.startsWith("/api"))
    return NextResponse.json(
      { success: false, message: "Unauthenticated access" },
      { status: 401 }
    );

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
