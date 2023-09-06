// /api/employee/check-exist

import Employee from "../../../../models/employee";
import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request) => {
  const username = request.nextUrl.searchParams?.get("username");
  const email = request.nextUrl.searchParams?.get("email");
  try {
    await connectToDB();
    let user =
      (await User.findOne({ username: username })) ||
      (await Employee.findOne({ username: username }));
    if (user) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "User username already exists",
          data: { username: true, email: false },
        }),
        { status: 200 }
      );
    }

    user =
      (await User.findOne({ email })) || (await Employee.findOne({ email }));
    if (user) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "User email already exists",
          data: { username: false, email: true },
        }),
        { status: 200 }
      );
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: "User not exists",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
