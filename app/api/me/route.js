import { getToken } from "next-auth/jwt";
import Department from "../../../models/department";
import Designation from "../../../models/designation";
import Employee from "../../../models/employee";
import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    await Designation.countDocuments();
    await Department.countDocuments();
    let user =
      (await Employee.findOne({ email: token.email })
        .populate("designation")
        .populate("department")) ||
      (await User.findOne({ email: token.email }));

    return new Response(
      JSON.stringify({
        success: true,
        message: "User retrieved successfully",
        data: user,
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

export const PUT = async (request) => {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const user = await User.findOne({ email: token.email });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        { status: 500 }
      );
    }

    const { fullName, email, username, image } = await request.json();

    // Update user properties based on request body
    user.fullName = fullName;
    user.email = email;
    user.username = username;
    user.image = image;

    // Save the updated user
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "User updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
};
