// /api/profile/reset-password

import { getSession } from "@auth/cookies"; // Assuming you have a way to retrieve session information
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectToDB();

    // Get the user's session information
    const session = await getSession(request);

    // Check if the user making the request is an admin
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    // Find the user by session ID
    const user = await User.findById(session.user._id);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Only admin can reset passwords.",
        },
        { status: 401 }
      );
    }

    // Extract employee's email and new password from the request body
    const { email, newPassword } = await request.json();

    // Find the employee by email
    const employeeUser = await User.findOne({ email });

    if (!employeeUser) {
      return NextResponse.json(
        { success: false, message: "Employee not found." },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the employee's password in the database
    await User.findByIdAndUpdate(employeeUser._id, {
      password: hashedPassword,
    });

    // Send a response indicating success
    return NextResponse.json(
      { success: true, message: "Password reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { success: false, message: "Error resetting password" },
      { status: 500 }
    );
  }
}
