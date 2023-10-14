import dayjs from "dayjs";
import Attendance from "../../../../models/attendance";
import Employee from "../../../../models/employee";
import Point from "../../../../models/point";
import Schedule from "../../../../models/schedule";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req) => {
  const { employeeId, date, checkInTime, checkInSnapShoot } = await req.json();

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

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    let overtimeRate = employee.overtimeRate;
    let isLate = false;

    const schedule = await Schedule.findOne({
      employee: employeeId,
    });

    if (
      schedule &&
      schedule.workHours &&
      schedule.workHours.startTime &&
      checkInTime
    ) {
      const scheduleStartTime = schedule.workHours.startTime;

      const checkInTimeDate = dayjs(new Date(checkInTime)).format("HH:mm");

      const sTime = new Date(`2000-01-01T${scheduleStartTime}:00Z`);
      const cTime = new Date(`2000-01-01T${checkInTimeDate}:00`);

      if (!isNaN(sTime) && !isNaN(cTime)) {
        if (cTime > sTime) {
          isLate = true;
        }
      } else {
        console.log("Invalid date format");
      }
    }

    const newAttendance = new Attendance({
      employee: employeeId,
      date,
      checkInTime,
      overtimeRate,
      isLate,
      checkInSnapShoot,
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
