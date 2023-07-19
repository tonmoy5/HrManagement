import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee id is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
