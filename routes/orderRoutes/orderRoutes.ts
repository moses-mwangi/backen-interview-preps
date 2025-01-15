import { Router } from "express";
import {
  createOrder,
  getOrder,
} from "../../controllers/orderController/orderController";

const router: Router = Router();

router.route("/").post(createOrder).get(getOrder);

export default router;
