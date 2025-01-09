import { NextFunction, Request, Response } from "express";
import catch_Async from "../utils/CatchAsync";
import { Prisma, PrismaClient } from "@prisma/client";
import AppError from "../utils/appError";

const prisma = new PrismaClient();

export const createUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { id: randomId, name, email },
    });

    res.status(200).json({ status: "succesfully created", user });
  }
);

export const getAllUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany({
      include: { posts: true, profile: true },
    });

    if (!user) {
      return next(new AppError("No user that has been found", 400));
    }
    console.log(user);

    res.status(200).json({ length: user.length, users: user });
  }
);

const updateUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    const data = { name, email };
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data,
    });
    prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  }
);

const deleteUser = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  }
);

export const userPost = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });

    res.status(200).json({ status: "post succed", post });
  }
);

export const allUserPost = catch_Async(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await prisma.post.findMany({ include: { author: true } });

    res.status(200).json({ status: "post succed", post });
  }
);
