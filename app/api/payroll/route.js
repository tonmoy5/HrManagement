import Employee from "../../../models/employee";
import Payroll from "../../../models/payroll";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const selectedMonth = request.nextUrl.searchParams?.get("month");

    const currentDate = new Date(selectedMonth);

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const employees = await Employee.find({});

    const existingPayrollRecords = await Payroll.find({
      month: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    });

    if (existingPayrollRecords.length > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Payroll for the current month already generated",
          data: existingPayrollRecords,
        }),
        { status: 200 }
      );
    }

    const payrollRecords = await Employee.aggregate([
      {
        $match: {
          _id: {
            $in: employees.map((employee) => employee._id),
          },
        },
      },
      {
        $lookup: {
          from: "attendances",
          let: {
            employeeId: "$_id",
            firstDay: firstDayOfMonth,
            lastDay: lastDayOfMonth,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$employee", "$$employeeId"] },
                    { $gte: ["$date", "$$firstDay"] },
                    { $lte: ["$date", "$$lastDay"] },
                  ],
                },
              },
            },
          ],
          as: "attendanceRecords",
        },
      },
      {
        $addFields: {
          overtimeHours: {
            $sum: "$attendanceRecords.overtimeHour",
          },
        },
      },
      {
        $project: {
          _id: 0,
          employee: "$_id",
          salary: 1,
          allowances: 1,
          overtimeRate: 1,
          overtimeHours: 1,
          netSalary: {
            $sum: [
              "$salary",
              "$allowances",
              {
                $multiply: ["$overtimeRate", "$overtimeHours"],
              },
            ],
          },
          status: "pending",
          dateOfGeneration: new Date(),
          month: firstDayOfMonth,
          employeeName: "$fullName",
        },
      },
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payroll generated successfully",
        data: payrollRecords,
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
  const payrollRecords = await req.json();

  try {
    await connectToDB();

    const savedPayrollRecords = await Payroll.insertMany(payrollRecords);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payroll records saved successfully",
        data: savedPayrollRecords,
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

export const DELETE = async (req) => {
  try {
    await connectToDB();

    const { recordIds } = req.body;

    if (!Array.isArray(recordIds) || recordIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid or empty recordIds array provided.",
        }),
        { status: 400 }
      );
    }

    const result = await Payroll.deleteMany({ _id: { $in: recordIds } });

    if (result.deletedCount > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: `Deleted ${result.deletedCount} payroll records.`,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No matching payroll records found for deletion.",
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
