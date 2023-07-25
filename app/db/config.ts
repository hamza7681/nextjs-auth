import mongoose from "mongoose";

export const dbAuthenticate = async (): Promise<void> => {
  const db: string =
    "mongodb+srv://hamza7681:hamzadsc7681@cluster0.ttxcq.mongodb.net/nextjs-typescript?retryWrites=true&w=majority";
  try {
    await mongoose.connect(db);
  } catch (error) {
    console.log("Connection Failed", error);
  }
};
