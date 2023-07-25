import express from "express";
import "express-async-errors"; // to handle errors inside async function it provides us the utility to to use
//  'throw' keyword for throwing the errors rather than the next(err)
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abhiymailknp:Abhi1536@abhishek.ai1gxui.mongodb.net/auth"
    );
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3004, () => {
    console.log("Listening on port 3004!!!!!!!!");
  });
};
start();
