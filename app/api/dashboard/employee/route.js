// Import necessary dependencies
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import Attendance from "../../../../models/attendance";
import Employee from "../../../../models/employee";
import Leave from "../../../../models/leave";
import Point from "../../../../models/point";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request) => {
  await connectToDB();
  try {
    // Get the user's email from the token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const { email } = token;

    // Find the employee by email
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return NextResponse.json(
        { success: false, message: "Employee not found" },
        { status: 404 }
      );
    }

    // Get the current date and month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    // Find total present attendance of this month
    const presentAttendances = await Attendance.find({
      employee: employee._id,
      date: {
        $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1),
        $lt: new Date(currentDate.getFullYear(), currentMonth, 1),
      },
    });

    const totalPresentAttendance = presentAttendances.length;

    // Find total leave of this month
    const leaves = await Leave.find({
      employee: employee._id,
      startDate: {
        $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1),
      },
      endDate: {
        $lt: new Date(currentDate.getFullYear(), currentMonth, 1),
      },
    });

    const totalLeaves = leaves.length;

    // Find total points for the employee
    const points = await Point.aggregate([
      {
        $match: { employee: employee._id },
      },
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$points" },
        },
      },
    ]);

    const totalPoints = points.length > 0 ? points[0].totalPoints : 0;

    return NextResponse.json(
      {
        success: true,
        totalPresentAttendance,
        totalLeaves,
        totalPoints,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.js:84 ~ GET ~ error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
