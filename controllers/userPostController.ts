import { NextFunction, Request, Response } from "express";
import catch_Async from "../utils/CatchAsync";
import User from "../models/sequelizeUserModal";
import AppError from "../utils/appError";

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

export const createPostUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
      return next(new AppError("The Requirement should be satisfied", 400));
    }

    const uniqueUser = await User.findOne({ where: { email: email } });

    if (uniqueUser) {
      return next(
        new AppError(`Duplicate fields ${email}:please try another value`, 400)
      );
    }

    const user = await User.create({ name, email, password, passwordConfirm });

    res.status(201).json({ status: "successfully created", user });
  }
);

export const getUsers = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();

    if (!users) {
      return next(new AppError("No user that has been found", 404));
    }

    res.status(201).json({ status: "users", length: users.length, users });
  }
);

export const updateUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return next(new AppError("No user that has been found", 404));
    }

    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(201).json({ status: "User has succesfully", updatedUser });
  }
);

export const deleteUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return next(new AppError("No user that has been found", 404));
    }

    await User.destroy({ where: { id: req.params.id } });

    res.status(201).json({ status: "User has succesfully", user });
  }
);
