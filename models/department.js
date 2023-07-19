import { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Department name is required."],
  },
  description: {
    type: String,
    required: [true, "Department description is required."],
  },
});

const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
