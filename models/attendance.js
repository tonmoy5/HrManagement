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
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
    checkInSnapShoot: {
      type: String,
    },
    checkOutSnapShoot: {
      type: String,
    },
    overtimeHour: {
      type: Number,
      default: 0,
    },
    overtimeRate: {
      type: Number,
      default: 500,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
