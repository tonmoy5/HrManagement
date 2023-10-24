import { Schema, model, models } from "mongoose";

const PayrollSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employeeName: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      required: true,
    },
    overtimeRate: {
      type: Number,
      default: 500,
    },
    overtimeHours: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "paid"],
      default: "pending",
    },
    dateOfGeneration: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payroll = models.Payroll || model("Payroll", PayrollSchema);

export default Payroll;
