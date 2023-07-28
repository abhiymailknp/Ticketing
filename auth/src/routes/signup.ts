import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";

import { BadInputError } from "../errors/bad-input-error";
import { User } from "../models/user-model";

const router: Router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Not a valid Email"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be b/w 6 to 20 characters"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("Hello");
    if (existingUser) {
      throw new BadInputError("Email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY as string
    );

    //Store it on session Object

    req.session = { 
      jwt: userJwt 
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
