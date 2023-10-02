import { Schema, model, models } from "mongoose";

const PointSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee id is required."],
    },
    points: {
      type: Number,
      required: [true, "Points value is required."],
    },
    source: {
      type: String,
    },
  },
  { timestamps: true }
);

const Point = models.Point || model("Point", PointSchema);

export default Point;
