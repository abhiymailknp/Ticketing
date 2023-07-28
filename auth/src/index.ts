import { config } from "dotenv";
import express from "express";
import "express-async-errors"; // to handle errors inside async function it provides us the utility to to use
//  'throw' keyword for throwing the errors rather than the next(err)
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";


import { currentUserRouter } from "./routes/current-user";

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

config()

const app = express();
app.set('trust proxy',1);
app.use(json());
app.use(
   cookieSession({
    signed:false,
    secure:false

}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
// console.log(process)

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
