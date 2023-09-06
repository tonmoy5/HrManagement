// // api/payroll/route.js

// import Attendance from "../../../../models/attendance";
// import Employee from "../../../../models/employee";
// import Payroll from "../../../../models/payroll";
// import { connectToDB } from "../utils/database";

// export const GET = async (req) => {
//   try {
//     await connectToDB();

//     const currentMonth = new Date();
//     currentMonth.setDate(1); // Set the date to the first day of the month

//     // Find all employees
//     const employees = await Employee.find({});

//     // Array to store payroll data for all employees
//     const payrollData = [];

//     for (const employee of employees) {
//       // Check if payroll entry for the current month exists for this employee
//       const existingPayroll = await Payroll.findOne({
//         employee: employee._id,
//         payPeriodStart: { $gte: currentMonth },
//       });

//       if (!existingPayroll || true) {
//         // Calculate overtime hours for the employee for the current month
//         const overtimeHours = await calculateOvertimeHours(
//           employee,
//           currentMonth
//         );

//         // Calculate payroll for the employee for the current month
//         const payrollEntry = {
//           employee: employee.toObject(),
//           payPeriodStart: currentMonth,
//           payPeriodEnd: new Date(),
//           basicSalary: employee.salary,
//           overtimeHours, // Assign the calculated overtime hours
//           overtimeRate: employee.overtimeRate || 500, // Assuming overtime rate is already available in the employee model
//           // Other payroll fields (grossSalary, deductions, allowances, netSalary)
//           // Calculate grossSalary, deductions, allowances, netSalary
//           grossSalary: await calculateGrossSalary(employee),
//           deductions: await calculateDeductions(employee),
//           allowances: calculateAllowances(employee),
//           netSalary: await calculateNetSalary(employee),
//           paymentDate: new Date(),
//           status: "draft", // Set the default status to "draft"
//         };

//         console.log(
//           "🚀 ~ file: route.js:55 ~ GET ~ payrollEntry:",
//           payrollEntry
//         );
//         payrollData.push(payrollEntry);

//         // Save the newly generated payroll to the database
//         // await Payroll.create(payrollEntry);
//       } else {
//         // Payroll for the current month already exists, add it to the response data
//         payrollData.push(existingPayroll);
//       }
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Payroll data retrieved successfully",
//         data: payrollData,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// };

// // Helper function to calculate overtime hours for an employee
// const calculateOvertimeHours = async (employee, currentMonth) => {
//   // Find all attendance records for the employee in the current month
//   const attendanceRecords = await Attendance.find({
//     employee: employee._id,
//     date: { $gte: currentMonth },
//   });

//   // Calculate total overtime hours
//   let totalOvertimeHours = 0;
//   for (const record of attendanceRecords) {
//     // Calculate hours worked for each attendance record (assuming checkInTime and checkOutTime are valid Date objects)
//     const hoursWorked =
//       (record.checkOutTime - record.checkInTime) / (1000 * 60 * 60);

//     // Consider all hours worked beyond 8 hours as overtime
//     const overtimeHours = Math.max(hoursWorked - 8, 0);
//     totalOvertimeHours += overtimeHours;
//   }

//   return totalOvertimeHours;
// };

// export const POST = async (req) => {
//   try {
//     const { employeeId } = await req.json();
//     if (!employeeId) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Employee ID is required.",
//         }),
//         { status: 400 }
//       );
//     }

//     await connectToDB();

//     // Update the status of the payroll entry for the current month to "approved"
//     const currentMonth = new Date();
//     currentMonth.setDate(1); // Set the date to the first day of the month
//     await Payroll.updateOne(
//       { employee: employeeId, payPeriodStart: { $gte: currentMonth } },
//       { $set: { status: "approved" } }
//     );

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Payroll approved successfully",
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// };

// // Add your payroll calculation functions here
// async function calculateOvertimeData(employee, payPeriodStart, payPeriodEnd) {
//   // Fetch the Attendance records for the given employee and pay period
//   const attendanceRecords = await Attendance.find({
//     employee: employee._id,
//     date: { $gte: payPeriodStart, $lte: payPeriodEnd },
//   });

//   let overtimeHours = 0;

//   // Calculate the total overtime hours based on business logic (e.g., work hours per day)
//   for (const record of attendanceRecords) {
//     // Add your logic to calculate overtime hours based on check-in and check-out times
//     // For example:
//     if (record.checkOutTime && record.checkInTime) {
//       const timeDiffInHours =
//         Math.abs(record.checkOutTime - record.checkInTime) / 3600000; // Convert milliseconds to hours
//       if (timeDiffInHours > 8) {
//         overtimeHours += timeDiffInHours - 8;
//       }
//     }
//   }

//   // Calculate overtime rate based on business logic (e.g., hourly rate for overtime)
//   const overtimeRate = 20; // Replace with your business logic to determine the rate

//   return { overtimeHours, overtimeRate };
// }

// async function calculateGrossSalary(employee, payPeriodStart, payPeriodEnd) {
//   const { overtimeHours, overtimeRate } = await calculateOvertimeData(
//     employee,
//     payPeriodStart,
//     payPeriodEnd
//   );

//   // Calculate gross salary based on the basic salary and overtime pay
//   const overtimePay = overtimeHours * overtimeRate;
//   const grossSalary = employee.salary + overtimePay;
//   return grossSalary;
// }

// async function calculateDeductions(employee) {
//   // Example: Deduct 5% of the gross salary as tax
//   const taxRate = 0.05;
//   const grossSalary = await calculateGrossSalary(employee);
//   const deductions = grossSalary * taxRate;
//   return deductions;
// }

// function calculateAllowances(employee) {
//   console.log(
//     "🚀 ~ file: route.js:203 ~ calculateAllowances ~ employee:",
//     employee
//   );
//   // Example: Allowances are fixed at 1000 for all employees
//   return 1000;
// }

// async function calculateNetSalary(employee) {
//   // Calculate net salary based on the gross salary and deductions
//   const grossSalary = await calculateGrossSalary(employee);
//   const deductions = await calculateDeductions(employee);
//   const allowances = calculateAllowances(employee);
//   const netSalary = grossSalary - deductions + allowances;
//   return netSalary;
// }
