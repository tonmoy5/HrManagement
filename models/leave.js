import { Schema, model, models } from "mongoose";

const LeaveSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee reference is required."],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required."],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required."],
  },
  halfDay: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    required: [true, "Leave reason is required."],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Leave = models.Leave || model("Leave", LeaveSchema);

export default Leave;
