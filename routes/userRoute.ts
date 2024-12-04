import express, { Router } from "express";
import { createdUser } from "../controllers/usersController";

const router: Router = Router();

router.route("/").post(createdUser);

export default router;
