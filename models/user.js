import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Employee Full Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "admin",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
