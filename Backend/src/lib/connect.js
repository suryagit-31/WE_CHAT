import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connect_db = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is missing in environment variables.");
    }
    const con = await mongoose.connect(process.env.DB_URL);
    console.log("connected to database" + con.connection.host);
  } catch (error) {
    console.log("Mongo_db connection error " + error);
  }
};
