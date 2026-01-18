import express from "express";
import { home } from "../controllers/userControllers.js";
const router = express.Router();

import { authenticate } from "../middleware/auth.js";

router.use("/home", authenticate, home);
export default router;
