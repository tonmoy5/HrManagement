import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  twitter: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  image: {
    type: String, // Store image data as base64 encoded string
  },
});

const User = models.User || model("User", UserSchema);

export default User;
