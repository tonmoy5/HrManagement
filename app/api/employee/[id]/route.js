import Department from "@models/department";
import Designation from "@models/designation";
import Employee from "@models/employee";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    await Designation.countDocuments();
    await Department.countDocuments();

    const employee = await Employee.findById(params.id)
      .populate("designation")
      .populate("department");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee retrieved successfully",
        data: employee,
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

export const PUT = async (req, { params }) => {
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
    website,
    github,
    twitter,
    linkedin,
  } = await req.json();

  try {
    await connectToDB();

    // Find the existing Employee document by ID
    const existingEmployee = await Employee.findById(params.id);
    if (!existingEmployee) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Employee not found",
        }),
        { status: 404 }
      );
    }

    // Update the fields with the new values
    existingEmployee.fullName = fullName;
    existingEmployee.email = email;
    existingEmployee.phone = phone;
    existingEmployee.gender = gender;
    existingEmployee.address = address;

    existingEmployee.designation = designation;
    existingEmployee.department = department;
    existingEmployee.joiningDate = joiningDate;
    existingEmployee.status = status;

    existingEmployee.salary = salary;
    existingEmployee.allowances = allowances;
    existingEmployee.overtimeRate = overtimeRate;
    existingEmployee.taxInformation = taxInformation;

    existingEmployee.bankAccount = bankAccount;

    // Save the updated document
    const updatedEmployee = await existingEmployee.save();

    const existingUser = await User.findOne({ email: existingEmployee.email });

    existingUser.image = image;
    existingUser.username = username;
    existingUser.website = website;
    existingUser.github = github;
    existingUser.twitter = twitter;
    existingUser.linkedin = linkedin;

    const updatedUser = await existingUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee updated successfully",
        data: { ...updatedEmployee, ...updatedUser },
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
