import { NextFunction, Request, Response } from "express";
import catch_Async from "../utils/CatchAsync";
import AppError from "../utils/appError";

export const createdUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass)
      return next(new AppError("Some of the fields are Missing", 400));

    const user = {
      name,
      email,
      pass,
    };
    res.status(200).json({
      status: "The user has succefully created",
      user,
    });
  }
);
