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
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
