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
  },
  paymentDate: {
    type: Date,
    required: [true, "Payment date is required."],
  },
});

const Payroll = models.Payroll || model("Payroll", PayrollSchema);

export default Payroll;
