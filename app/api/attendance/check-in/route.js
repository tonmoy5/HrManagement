import Attendance from "@models/attendance";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { employeeId, date, checkInTime } = await req.json();
  console.log(
    "🚀 ~ file: route.js:6 ~ POST ~ employeeId, date, checkInTime:",
    employeeId,
    date,
    checkInTime
  );

  try {
    await connectToDB();
    const newAttendance = new Attendance({
      employee: employeeId,
      date,
      checkInTime,
    });
    await newAttendance.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance punched in successfully",
        data: newAttendance,
      }),
      { status: 201 }
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
