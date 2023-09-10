import mongoose from "mongoose";

export default function connect() {
  try {

    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully!");
    })

    connection.on("error", (err) => {
      console.log("MongoDB Connection error, Please make sure DB is running. error: " + err);
    })

  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}