import Attendance from "@models/attendance";
import Employee from "@models/employee";
import Leave from "@models/leave";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectToDB();
  const totalEmployees = await Employee.countDocuments();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const presentEmployees = await Attendance.find({
    date: {
      $gte: currentDate,
      $lt: nextDate,
    },
  }).countDocuments();

  const todayLeaves = await Leave.find({
    $and: [
      { startDate: { $lte: currentDate } },
      { endDate: { $gte: currentDate } },
    ],
    status: "approved",
  }).countDocuments();
  return NextResponse.json(
    { success: true, totalEmployees, presentEmployees, todayLeaves },
    { status: 200 }
  );
};
