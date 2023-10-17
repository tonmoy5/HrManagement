import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const users = await User.find({});

    return new Response(
      JSON.stringify({
        success: true,
        message: "Users retrieved successfully",
        data: users,
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
  const { fullName, email, username, password, image, role } = await req.json();

  try {
    await connectToDB();
    const newUser = new User({
      fullName,
      email,
      username,
      password,
      image,
      role,
    });
    await newUser.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "User added successfully",
        data: newUser,
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
  const { _id, fullName, email, username, password, image, role } =
    await req.json();

  try {
    await connectToDB();

    // Find the existing User document by ID
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    // Update the fields with the new values
    existingUser.fullName = fullName;
    existingUser.email = email;
    existingUser.username = username;
    existingUser.password = password;
    existingUser.image = image;
    existingUser.role = role;

    // Save the updated document
    const updatedUser = await existingUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
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
    await User.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "User deleted successfully!",
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
