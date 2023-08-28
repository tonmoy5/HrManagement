import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Employee Full Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone is required."],
  },
  designation: {
    type: Schema.Types.ObjectId,
    ref: "Designation",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required and must be a numerical value."],
  },
  bankAccount: {
    accountNumber: {
      type: String,
      required: [true, "Bank account number is required."],
    },
    accountName: {
      type: String,
      required: [true, "Bank account name is required."],
    },
    branch: {
      type: String,
      required: [true, "Branch information is required."],
    },
  },
  taxInformation: {
    type: String,
  },
  allowances: {
    type: Number,
    required: [true, "Allowances is required and must be a numerical value."],
  },
  overtimeRate: {
    type: Number,
    default: 500,
  },
  address: {
    type: String,
    required: [true, "Address is required."],
  },
  payrollHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payroll",
    },
  ],
});

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;
