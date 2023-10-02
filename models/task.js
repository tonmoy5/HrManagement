import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee id is required."],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "late"],
      default: "pending",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;
