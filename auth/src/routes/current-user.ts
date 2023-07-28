import express, { Request, Response, Router } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router: Router = express.Router();

router.get(
  "/api/users/currentUser",
  [currentUser,requireAuth ],
  (req: Request, res: Response) => {
    res.send({ currentUser: "req.currentUser || null" });
  }
);

export { router as currentUserRouter };
