import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema({
  fullName: {
    type: "string",
    required: [true, "Employee Full Name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
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
    default: new Date(),
  },
  salary: {
    type: Number,
    required: [true, "Salary is required."],
  },
  bankAccount: {
    type: String,
    required: [true, "Bank account number is required."],
  },
  taxInformation: {
    type: String,
    required: [true, "Tax information is required."],
  },
  allowances: {
    type: String,
    required: [true, "Allowances is required."],
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
