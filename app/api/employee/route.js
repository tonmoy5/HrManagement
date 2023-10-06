import bcrypt from "bcryptjs";
import Department from "../../../models/department";
import Designation from "../../../models/designation";
import Employee from "../../../models/employee";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    await Designation.countDocuments();
    await Department.countDocuments();
    const employees = await Employee.find({ role: "employee" })
      .populate("designation")
      .populate("department");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employees retrieved successfully",
        data: employees,
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

export const POST = async (request) => {
  const {
    fullName,
    email,
    username,
    password,
    image,
    role,
    phone,
    gender,
    address,
    designation,
    department,
    joiningDate,
    status,
    inactiveDate,
    terminatedDate,
    salary,
    allowances,
    overtimeRate,
    taxInformation,
    bankAccount,
    links,
    payrollHistory,
  } = await request.json();

  try {
    await connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      fullName,
      email,
      username,
      password: hashedPassword,
      image,
      role,
      phone,
      gender,
      address,
      designation,
      department,
      joiningDate,
      status,
      inactiveDate,
      terminatedDate,
      salary,
      allowances,
      overtimeRate,
      taxInformation,
      bankAccount,
      links,
      payrollHistory,
    });

    await newEmployee.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee added successfully",
        data: { ...newEmployee },
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

// export const DELETE = async (req) => {
//   const url = new URL(req.url);
//   const searchParams = new URLSearchParams(url.search);
//   const id = searchParams.get("id");

//   try {
//     await connectToDB();
//     await Employee.findByIdAndDelete(id);
//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Employee deleted successfully!",
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

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
