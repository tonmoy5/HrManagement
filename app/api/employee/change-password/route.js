// /pages/api/profile/change-password.js

import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import User from "../../../../models/user";
import { hashPassword, verifyPassword } from "../../../../utils/auth";
import { connectToDB } from "../../../../utils/database";

export const PUT = async (request) => {
  const session = await getSession({ req: request.nextRequest });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current and new passwords are required." },
        { status: 400 }
      );
    }

    await connectToDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const passwordMatch = await verifyPassword(currentPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.json("Error updating password:", error);
    return NextResponse.json(
      { success: false, message: "Error updating password." },
      { status: 500 }
    );
  }
};
