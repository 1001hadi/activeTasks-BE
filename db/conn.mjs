import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connStr = process.env.mongoURI;

async function connectDB() {
  try {
    await mongoose.connect(connStr);
    console.log("Connected to DB!");
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

export default connectDB;
