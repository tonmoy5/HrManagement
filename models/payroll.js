import { Schema, model, models } from "mongoose";

const PayrollSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee reference is required."],
  },
  payPeriodStart: {
    type: Date,
    required: [true, "Pay period start date is required."],
  },
  payPeriodEnd: {
    type: Date,
    required: [true, "Pay period end date is required."],
  },
  basicSalary: {
    type: Number,
    required: [true, "Basic salary is required."],
  },
  overtimeHours: {
    type: Number,
    default: 0,
  },
  overtimeRate: {
    type: Number,
    default: 0,
  },
  grossSalary: {
    type: Number,
    required: [true, "Gross salary is required."],
    default: 0, // Set a default value of 0 if the value is not provided or invalid
  },
  deductions: {
    type: Number,
    default: 0,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  netSalary: {
    type: Number,
    required: [true, "Net salary is required."],
    default: 0,
  },
  paymentDate: {
    type: Date,
    required: [true, "Payment date is required."],
  },
  status: {
    type: String,
    enum: ["draft", "approved", "paid"],
    default: "draft", // Set the default status to "draft"
  },
});

const Payroll = models.Payroll || model("Payroll", PayrollSchema);

export default Payroll;
