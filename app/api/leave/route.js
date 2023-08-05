// api/leave/route.js

import Employee from "@models/employee";
import Leave from "@models/leave";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    await Employee.countDocuments();

    // Extract the startDate and endDate query parameters from the request URL
    const { startDate = "", endDate = "" } = req.query || {};
    // Prepare the query object to filter by date range
    const query = {};
    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
      };
      query.endDate = {
        $lte: new Date(endDate),
      };
    }

    // Fetch the leave records with the specified date range
    const leaves = await Leave.find(query).populate("employee");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Leave data retrieved successfully",
        data: leaves,
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

export const POST = async (req) => {
  try {
    const { employeeId, startDate, endDate, halfDay, reason } =
      await req.json();
    console.log(
      "🚀 ~ file: route.jsx:36 ~ POST ~ employeeId, startDate, endDate, halfDay, reason:",
      employeeId,
      startDate,
      endDate,
      halfDay,
      reason
    );

    if (!employeeId || !startDate || !endDate || !reason) {
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Employee ID, start date, end date, and reason are required.",
        }),
        { status: 400 }
      );
    }

    await connectToDB();
    await Employee.countDocuments();

    // Create the leave request record
    const newLeave = await Leave.create({
      employee: employeeId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      halfDay: halfDay || false,
      reason,
      status: "pending", // Set the default status to "pending"
    });

    const leaveData = await newLeave.populate("employee");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Leave request submitted successfully",
        data: leaveData,
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

export const PUT = async (req) => {
  await connectToDB();
  await Employee.countDocuments();

  try {
    const { _id, employeeId, startDate, endDate, halfDay, reason, status } =
      await req.json();
    if (!_id || !employeeId || !startDate || !endDate || !reason) {
      if (status === "approved") {
        await Leave.findByIdAndUpdate(_id, { status: "approved" });
        return new Response(
          JSON.stringify({
            success: true,
            message: "Status updated successfully",
          }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Leave ID, employee ID, start date, end date, and reason are required.",
        }),
        { status: 400 }
      );
    }

    // Find the leave record by ID
    const existingLeave = await Leave.findById(_id);

    if (!existingLeave) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Leave record not found.",
        }),
        { status: 404 }
      );
    }

    // Update the leave record
    existingLeave.employee = employeeId;
    existingLeave.startDate = new Date(startDate);
    existingLeave.endDate = new Date(endDate);
    existingLeave.halfDay = halfDay || false;
    existingLeave.reason = reason;

    await existingLeave.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Leave request updated successfully",
        data: await existingLeave.populate("employee"),
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
