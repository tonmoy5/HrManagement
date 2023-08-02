import Department from "@models/department";
import Designation from "@models/designation";
import Employee from "@models/employee";
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
