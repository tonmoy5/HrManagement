import mongoose, { models } from "mongoose";

const scheduleSchema = new mongoose.Schema({
  workHours: {
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  weekend: {
    days: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
        default: ["Friday", "Saturday"],
      },
    ],
  },
});

const Schedule = models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
