import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log(request);
  const url = new URL(request.url);
  if (request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }
  //   const session = await getServerSession(authOptions);
  //   console.log("🚀 ~ file: middleware.js:12 ~ middleware ~ session:", session);
  // const response = await fetch("http://localhost:3000/api/auth/session");
  // console.log("🚀 ~ file: middleware.js:12 ~ middleware ~ response:", response);
  // const data = await response.json();
  // console.log("🚀 ~ file: middleware.js:13 ~ middleware ~ data:", data);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
