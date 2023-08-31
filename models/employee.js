import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Employee Full Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email already exists"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required."],
  },
  gender: {
    enum: ["male", "female"],
    // required: [true, "Gender is required."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
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
  status: {
    type: String,
    enum: ["active", "inactive", "on leave", "terminated", "other"],
    default: "active",
  },
  inactiveDate: {
    type: Date,
  },
  terminatedDate: {
    type: Date,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required and must be a numerical value."],
  },
  allowances: {
    type: Number,
    required: [true, "Allowances is required and must be a numerical value."],
  },
  overtimeRate: {
    type: Number,
    default: 500,
  },
  taxInformation: {
    type: String,
  },
  bankAccount: {
    accountName: {
      type: String,
      required: [true, "Bank account name is required."],
    },
    accountNumber: {
      type: String,
      required: [true, "Bank account number is required."],
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required."],
    },
    branchInfo: {
      type: String,
      required: [true, "Branch Info is required."],
    },
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
