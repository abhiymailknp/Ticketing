import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(">>>>>>>>>>>>");
  if (!req.session?.jwt) {
    //'?' here checks whether the req.session exists or not
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY as string
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log("Error aaya");
    res;
  }
  next();
};
