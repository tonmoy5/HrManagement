import { Schema, model, models } from "mongoose";

const DesignationSchema = new Schema({
  name: {
    type: String,
    required: [true, "Designation name is required."],
  },
  description: {
    type: String,
    required: [true, "Designation description is required."],
  },
});

const Designation =
  models.Designation || model("Designation", DesignationSchema);

export default Designation;
