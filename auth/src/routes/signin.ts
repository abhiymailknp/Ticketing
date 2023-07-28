import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadInputError } from "../errors/bad-input-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user-model";
import { Password } from "../helpers/password";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadInputError("User doesn't exist , Kindly signup");
    }
    // console.log("Password=> ",existingUser.password)
    // console.log("----Password Hashed", await Password.toHash(password));
    const passwordMatch = await Password.comparePassword(
      existingUser.password as string,
      password
    );
    // console.log('passwordMatch=>' , passwordMatch)
    if (!passwordMatch) {
      throw new BadInputError("Invalid Credentials");
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY as string
    );

    //Store it on session Object

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
