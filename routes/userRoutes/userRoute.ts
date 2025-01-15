import { Router } from "express";
import createUser, {
  getUsers,
} from "../../controllers/userController/UserCntroller";

const router: Router = Router();

router.route("/").post(createUser).get(getUsers);

export default router;
