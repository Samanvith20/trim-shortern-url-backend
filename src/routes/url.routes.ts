import { Router } from "express";
import { createUrl, redirectToUrl } from "../controllers/url.controller.js";

const router = Router();

router.post("/", createUrl);


export default router;