import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
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
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadInputError('Email in use');
    }
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);  
  }
);

export { router as signupRouter };
