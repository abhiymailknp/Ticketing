import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-auth-erros";

//We are making an assumption that this middleware will be used
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Hello there");
  if (!req.currentUser) {
    console.log("Hello");
    throw new NotAuthorizedError();
  }

  next();
};
