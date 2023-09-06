import Attendance from "../../../../models/attendance";
import { connectToDB } from "../../../../utils/database";

export const PUT = async (req) => {
  const { employeeId, date, checkOutTime } = await req.json();

  try {
    await connectToDB();

    // Find the existing attendance document by employeeId and date
    const existingAttendance = await Attendance.findOneAndUpdate(
      { employee: employeeId, date },
      { checkOutTime },
      { new: true }
    );

    if (!existingAttendance) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Attendance not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance punched out successfully",
        data: await existingAttendance.populate("employee"),
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
