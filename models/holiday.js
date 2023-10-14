import { Schema, model, models } from "mongoose";

const HolidaySchema = new Schema(
  {
    start: {
      type: Date,
      required: [true, "Date is required."],
    },
    end: {
      type: Date,
      required: [true, "Date is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
  },
  { timestamps: true }
);

const Holiday = models.Holiday || model("Holiday", HolidaySchema);

export default Holiday;
