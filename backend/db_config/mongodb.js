import mongoose from "mongoose";
export const connectToDataBase = async () => {
  try {
    console.log("Connecting to database.....");
    await mongoose.connect("mongodb+srv://udaypandey20000:czeyzu0CO20IoVUr@cluster0.tlw0kyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully!!!!");
  } catch (err) {
    console.log("something went wrong while connecting to database!!!!!");
  }
};
