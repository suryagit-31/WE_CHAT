import mongoose from "mongoose";

const connect_db = async () => {
  try {
    const con =await mongoose.connect(process.env.DB_URL);
    console.log("connected to database"+con.connection.host);
  } catch (error) {
    console.log("Mongo_db connection error " + error);
  }
};

export default connect_db;
