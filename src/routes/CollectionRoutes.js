import express from "express";
import { createProject } from "../controllers/projectControllers.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/createCollection", authenticate, createProject);

export default router;
