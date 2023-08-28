// /api/employee/check-leave
import Leave from "@models/leave";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Connect to the database
  await connectToDB();

  // Extract the date and employeeId query parameters from the request URL
  const url = new URL(request.url); // Corrected "req" to "request"
  const searchParams = new URLSearchParams(url.search);
  const date = searchParams.get("date");
  const employeeId = searchParams.get("employeeId");

  // Check if the employee is on leave for the given date
  const leave = await Leave.findOne({
    employee: employeeId,
    startDate: { $lte: new Date(date) },
    endDate: { $gte: new Date(date) },
    status: "approved",
  });

  // Return the result
  return NextResponse.json({ onLeave: !!leave }, { status: 200 });
}
