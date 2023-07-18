import { Schema, model, models } from "mongoose";

const DesignationSchema = new Schema({
  title: {
    type: String,
    required: [true, "Designation title is required."],
  },
  details: {
    type: String,
    required: [true, "Designation details is required."],
  },
});

const Designation =
  models.Designation || model("Designation", DesignationSchema);

export default Designation;
