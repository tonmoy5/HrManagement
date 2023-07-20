import Department from "@models/department";
import Designation from "@models/designation";
import Employee from "@models/employee";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    Designation.init();
    Department.init();
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

export const POST = async (req) => {
  const {
    fullName,
    email,
    designation,
    department,
    joiningDate,
    salary,
    bankAccount,
    taxInformation,
    allowances,
    address,
  } = await req.json();

  try {
    await connectToDB();
    const newEmployee = new Employee({
      fullName,
      email,
      designation,
      department,
      joiningDate,
      salary,
      bankAccount,
      taxInformation,
      allowances,
      address,
    });
    await newEmployee.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee added successfully",
        data: newEmployee,
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

export const PUT = async (req) => {
  const {
    id,
    fullName,
    email,
    designation,
    department,
    joiningDate,
    salary,
    bankAccount,
    taxInformation,
    allowances,
    address,
  } = await req.json();

  try {
    await connectToDB();

    // Find the existing Employee document by ID
    const existingEmployee = await Employee.findById(id);
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
    existingEmployee.designation = designation;
    existingEmployee.department = department;
    existingEmployee.joiningDate = joiningDate;
    existingEmployee.salary = salary;
    existingEmployee.bankAccount = bankAccount;
    existingEmployee.taxInformation = taxInformation;
    existingEmployee.allowances = allowances;
    existingEmployee.address = address;

    // Save the updated document
    const updatedEmployee = await existingEmployee.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee updated successfully",
        data: updatedEmployee,
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

export const DELETE = async (req) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id");

  try {
    await connectToDB();
    await Employee.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee deleted successfully!",
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
