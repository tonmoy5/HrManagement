import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  image: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
