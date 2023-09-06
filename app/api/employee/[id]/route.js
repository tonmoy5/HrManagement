import Department from "../../../../models/department";
import Designation from "../../../../models/designation";
import Employee from "../../../../models/employee";
import { connectToDB } from "../../../../utils/database";

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

export const PUT = async (request, { params }) => {
  const {
    fullName,
    email,
    username,
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
    // Find the existing employee document by ID
    await connectToDB();
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
    existingEmployee.username = username;
    existingEmployee.image = image;
    existingEmployee.role = role;
    existingEmployee.phone = phone;
    existingEmployee.gender = gender;
    existingEmployee.address = address;
    existingEmployee.designation = designation;
    existingEmployee.department = department;
    existingEmployee.joiningDate = joiningDate;
    existingEmployee.status = status;
    existingEmployee.inactiveDate = inactiveDate;
    existingEmployee.terminatedDate = terminatedDate;
    existingEmployee.salary = salary;
    existingEmployee.allowances = allowances;
    existingEmployee.overtimeRate = overtimeRate;
    existingEmployee.taxInformation = taxInformation;
    existingEmployee.bankAccount = bankAccount;
    existingEmployee.links = links;
    existingEmployee.payrollHistory = payrollHistory;

    // Save the updated employee document
    const updatedEmployee = await existingEmployee.save({
      validateBeforeSave: false,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Employee updated successfully",
        data: updatedEmployee,
      }),
      { status: 200 }
    );
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
