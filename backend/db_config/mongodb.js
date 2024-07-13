import mongoose from "mongoose";
export const connectToDataBase = async () => {
  try {
    console.log("Connecting to database.....");
    await mongoose.connect("mongodb://localhost:27017/Employee_Review_System");
    console.log("Database connected successfully!!!!");
  } catch (err) {
    console.log("something went wrong while connecting to database!!!!!");
  }
};
