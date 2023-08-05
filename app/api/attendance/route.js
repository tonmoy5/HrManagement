// api/attendance.js

import Attendance from "@models/attendance";
import Employee from "@models/employee";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract the startDate, endDate, and employeeId query parameters from the request URL
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const employeeId = searchParams.get("employeeId");

    // Prepare the query object to filter by date range and employeeId
    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (employeeId) {
      query.employee = employeeId;
    }

    // Fetch the attendance data with the specified date range and employeeId
    await Employee.countDocuments();
    const attendances = await Attendance.find(query)
      .populate("employee")
      .sort({ date: "desc" });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendances retrieved successfully",
        data: attendances,
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
