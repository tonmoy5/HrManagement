// api/payroll/new/route.js
import Attendance from "../../../../models/attendance";
import Employee from "../../../../models/employee";
import { connectToDB } from "../../../../utils/database";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const month = searchParams.get("month");

    if (!month) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Month is required.",
        }),
        { status: 400 }
      );
    }

    await connectToDB();

    const selectedMonth = new Date(month);
    selectedMonth.setDate(1); // Set the date to the first day of the month

    const employees = await Employee.find({});
    const payrollData = await generatePayrollData(selectedMonth, employees);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payroll data retrieved successfully",
        data: payrollData,
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

const calculateGrossSalary = (employee, selectedMonth, overtimeHours) => {
  const overtimeRate = employee.overtimeRate || 500;
  // Implement your calculation logic here
  // For example:
  const overtimePay = overtimeHours * overtimeRate;
  const grossSalary = (employee.salary + overtimePay).toFixed(2); // Rounded to 2 decimal places
  return parseFloat(grossSalary); // Convert the string back to a number
};

// Other functions (calculateDeductions, calculateAllowances, calculateNetSalary) should be defined here as well

// Function to generate payroll data for all employees
const generatePayrollData = async (selectedMonth, employees) => {
  const payrollData = [];

  for (const employee of employees) {
    const overtimeHours = await calculateOvertimeHours(employee, selectedMonth);
    const payrollEntry = await createPayrollEntry(
      employee,
      selectedMonth,
      overtimeHours
    );

    payrollData.push(payrollEntry);
  }
  return payrollData;
};

// Function to calculate overtime hours for an employee and a specific month
// Function to calculate overtime hours for an employee and a specific month
const calculateOvertimeHours = async (employee, selectedMonth) => {
  const attendanceRecords = await Attendance.find({
    employee: employee._id,
    date: {
      $gte: selectedMonth,
      $lt: new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      ),
    },
  });

  let totalOvertimeHours = 0;
  for (const record of attendanceRecords) {
    const hoursWorked =
      (record.checkOutTime - record.checkInTime) / (1000 * 60 * 60);
    const overtimeHours = Math.max(hoursWorked - 8, 0);
    totalOvertimeHours += parseFloat(overtimeHours.toFixed(2)); // Round to 2 decimal places
  }

  return totalOvertimeHours || 0;
};

// Function to create a payroll entry for an employee
const createPayrollEntry = (employee, selectedMonth, overtimeHours) => {
  const overtimeRate = employee.overtimeRate || 500;
  const grossSalary = calculateGrossSalary(
    employee,
    selectedMonth,
    overtimeHours
  );
  const deductions = grossSalary * 0.05;
  const allowances = employee.allowances;
  const netSalary = grossSalary - deductions + allowances;

  const payrollEntry = {
    employee: employee.toObject(),
    payPeriodStart: selectedMonth,
    payPeriodEnd: new Date(),
    basicSalary: employee.salary,
    overtimeHours,
    overtimeRate,
    grossSalary,
    deductions,
    allowances,
    netSalary,
    paymentDate: new Date(),
    status: "draft",
  };

  return payrollEntry;
};

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
