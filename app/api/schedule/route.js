import { NextResponse } from "next/server";
import Schedule from "../../../models/schedule";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    let schedule = await Schedule.findOne({});
    if (!schedule) {
      schedule = await Schedule.create({
        weekend: {
          days: ["Friday", "Saturday"],
        },
        workHours: {
          startTime: "10:00 AM",
          endTime: "07:00 PM",
        },
      });
    }

    return NextResponse.json({ success: true, schedule }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    await connectToDB();
    const { weekend, workHours } = await request.json();

    const updatedSchedule = await Schedule.findOneAndUpdate(
      {},
      { $set: { weekend, workHours } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: updatedSchedule },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
