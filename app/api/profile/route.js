// /api/profile

import Employee from "@models/employee";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDB();

    const email = request.nextUrl.searchParams?.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 200 }
      );
    }

    const [user, employee] = await Promise.all([
      User.findOne({ email }),
      Employee.findOne({ email })
        .populate("designation")
        .populate("department"),
    ]);

    if (!user && !employee) {
      return NextResponse.json({ message: "User not found." }, { status: 200 });
    }

    const profileData = {
      userId: user?._id,
      employeeId: employee?._id,
      username: user?.username,
      email: user?.email || employee.email,
      role: user?.role,
      image: user?.image,
      fullName: employee?.fullName || "Admin",
      designation: employee?.designation?.title || "Not Available",
      department: employee?.department?.name || "Not Available",
      joiningDate: employee?.joiningDate || "Not Available",
      address: employee?.address || "Not Available",
      phone: employee?.phone || "Not Available",
    };

    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Error fetching user profile" },
      { status: 500 }
    );
  }
}
