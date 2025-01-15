import { NextFunction, Request, Response } from "express";
import sequelize from "../../config/Pg_Database";
import User from "../../models/userModel/usersModels";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ Error: "NO email" });
      return;
      // return next(new AppError("The Requirement should be satisfied", 400));
    }

    const uniqueUser = await User.findOne({ where: { email: email } });

    if (uniqueUser) {
      res.status(400).json({ Error: "Thats user alredy exist" });
      return;
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({ status: "successfully created", user });
  } catch (err) {
    console.error("ERRORS CAUSE:", err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uniqueUser = await User.findAll();

    if (uniqueUser.length == 0) {
      res.json({ msg: "The users List is empty" });
      return;
    }

    res.status(201).json({ status: "successfully created", uniqueUser });
  } catch (err) {
    console.error("ERRORS CAUSE:", err);
  }
};

export default createUser;
