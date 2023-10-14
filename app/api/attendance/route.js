// api/attendance.js

import Attendance from "../../../models/attendance.js";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const startDate = request.nextUrl.searchParams?.get("startDate");
    const endDate = request.nextUrl.searchParams?.get("endDate");
    const employeeId = request.nextUrl.searchParams?.get("employeeId");
    const limit = parseInt(request.nextUrl.searchParams?.get("limit")); // Allow limit to be provided

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

    // Fetch the attendance data with the specified filters and optional limit
    let attendancesQuery = Attendance.find(query)
      .populate("employee")
      .sort({ date: "desc" });

    if (limit) {
      attendancesQuery = attendancesQuery.limit(limit);
    }

    const attendances = await attendancesQuery;

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

export const PUT = async (request) => {
  try {
    await connectToDB();

    const id = request.nextUrl.searchParams?.get("id");
    const update = await request.json();
    const data = await Attendance.findByIdAndUpdate(id, update, { new: true });
    console.log("🚀 ~ file: route.js:64 ~ PUT ~ data:", data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendances updated successfully",
        data,
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

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
