import Designation from "../../../models/designation";
import { connectToDB } from "../../../utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const designations = await Designation.find({});

    return new Response(
      JSON.stringify({
        success: true,
        message: "Designation get successfully",
        data: designations,
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

export const POST = async (req) => {
  const { title, details } = await req.json();

  try {
    await connectToDB();
    const newDesignation = new Designation({
      title,
      details,
    });
    await newDesignation.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Designation added successfully",
        data: newDesignation,
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
  const { id, title, details } = await req.json();

  try {
    await connectToDB();

    // Find the existing Designation document by ID
    const existingDesignation = await Designation.findById(id);
    if (!existingDesignation) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Designation not found",
        }),
        { status: 404 }
      );
    }

    // Update the fields with the new values
    existingDesignation.title = title;
    existingDesignation.details = details;

    // Save the updated document
    const updatedDesignation = await existingDesignation.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Designation updated successfully",
        data: updatedDesignation,
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
    await Designation.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Designation deleted successfully!",
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
