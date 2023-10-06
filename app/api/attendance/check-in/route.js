import Attendance from "../../../../models/attendance";
import Point from "../../../../models/point";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req) => {
  const { employeeId, date, checkInTime } = await req.json();

  try {
    await connectToDB();

    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date,
    });

    if (existingAttendance) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Check in data already exists!",
        }),
        { status: 500 }
      );
    }
    const newAttendance = new Attendance({
      employee: employeeId,
      date,
      checkInTime,
    });
    await newAttendance.save();

    const newPoint = new Point({
      employee: employeeId,
      points: 1,
      source: "Daily Attendance!",
    });

    await newPoint.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance punched in successfully",
        data: await newAttendance.populate("employee"),
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
