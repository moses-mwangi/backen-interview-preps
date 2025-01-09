import { Router } from "express";
import {
  allUserPost,
  createUser,
  getAllUser,
  userPost,
} from "../controllers/prismaUserController";

const router: Router = Router();

router.route("/").get(getAllUser).post(createUser);

router.route("/post").get(allUserPost).post(userPost);

export default router;
