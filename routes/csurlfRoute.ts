import express, { Router } from "express";
import { csurfProtection, getCsurlfCookie } from "../middlewares/csrf";

const router: Router = express.Router();
router.route("/").get(csurfProtection, getCsurlfCookie);

export default router;
