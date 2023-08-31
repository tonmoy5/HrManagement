import Department from "@models/department";
import Designation from "@models/designation";
import Employee from "@models/employee";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

export const GET = async (request) => {
  try {
    await connectToDB();
    await Designation.countDocuments();
    await Department.countDocuments();
    const employees = await Employee.find({})
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
    phone,
    gender,
    address,
    designation,
    department,
    joiningDate,
    status,
    salary,
    allowances,
    overtimeRate,
    bankAccount,
    // for create new user
    image,
    username,
    password,
    website,
    github,
    twitter,
    linkedin,
  } = await request.json();

  try {
    await connectToDB();

    const newEmployee = new Employee({
      fullName,
      email,
      phone,
      gender,
      address,
      designation,
      department,
      joiningDate,
      status,
      salary,
      allowances,
      overtimeRate,
      bankAccount,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      image,
      username,
      password: hashedPassword,
      website,
      github,
      twitter,
      linkedin,
    });
    await newEmployee.save();
    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee added successfully",
        data: { ...newEmployee, ...newUser },
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
