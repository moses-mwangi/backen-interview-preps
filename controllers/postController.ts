import { NextFunction } from "express";
import catch_Async from "../utils/CatchAsync";
import { Post, User } from "../models/sequelizeUserModalCopy";

const getAllPost = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findAll({
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
  }
);
