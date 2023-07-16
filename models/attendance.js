import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee reference is required."],
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  checkInTime: {
    type: Date,
    required: [true, "Check-in time is required."],
  },
  checkOutTime: {
    type: Date,
    required: [true, "Check-out time is required."],
  },
});

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
