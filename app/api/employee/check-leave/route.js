// /api/employee/check-leave
import { NextResponse } from "next/server";
import Leave from "../../../../models/leave";
import { connectToDB } from "../../../../utils/database";

export async function GET(request) {
  // Connect to the database
  await connectToDB();

  const searchParams = request.nextUrl.searchParams;
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

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
