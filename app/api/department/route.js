import Department from "@models/department";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const departments = await Department.find({});

    return new Response(
      JSON.stringify({
        success: true,
        message: "Departments retrieved successfully",
        data: departments,
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
  const { name, description } = await req.json();

  try {
    await connectToDB();
    const newDepartment = new Department({
      name,
      description,
    });
    await newDepartment.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Department added successfully",
        data: newDepartment,
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
  const { id, name, description } = await req.json();

  try {
    await connectToDB();

    // Find the existing Department document by ID
    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Department not found",
        }),
        { status: 404 }
      );
    }

    // Update the fields with the new values
    existingDepartment.name = name;
    existingDepartment.description = description;

    // Save the updated document
    const updatedDepartment = await existingDepartment.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Department updated successfully",
        data: updatedDepartment,
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
    await Department.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Department deleted successfully!",
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
