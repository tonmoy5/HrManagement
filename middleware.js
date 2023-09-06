// import { prettyLogger } from "@/services/prettyLogger";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
const legacyPrefixes = ["/api/auth"];
const adminPaths = ["/profile/admin", "/setting/admin"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  // prettyLogger.info(`User agent: ${req.headers.get("user-agent")}`);
  // prettyLogger.info(`Request from: ${req.headers.get("referer")}`);

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if (token?.role === "employee" && pathname.includes("/admin")) {
  //   return NextResponse.redirect("/profile");
  // }

  // if (token?.role === "admin" && (pathname==="/profile" ||pathname==="/setting")) {
  //   return NextResponse.redirect("/profile");
  // }

  if (!token && pathname.startsWith("/api"))
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
