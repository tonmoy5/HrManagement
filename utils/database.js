import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async function () {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hr_management",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error);
  }
};
