import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3004, () => {
    console.log("Listening on port 3004!!!!!!!!");
  });
};
start();
