import { Router } from "express";
import {
  createPostUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/userPostController";

const router: Router = Router();

router.route("/").post(createPostUser).get(getUsers);
router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;
