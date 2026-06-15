import { Router } from "express";
import { getUrlAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/:code", getUrlAnalytics);

export default router;
