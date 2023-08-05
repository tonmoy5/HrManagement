import { NextResponse } from "next/server";

export const POST = (request) => {
  // Create a new NextResponse instance with a 200 status code and the desired headers
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie": [
        "next-auth.session-token=deleted; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "next-auth.csrf-token=deleted; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ],
    },
  });

  return response;
};
