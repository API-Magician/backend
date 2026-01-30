import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectControllers.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/createProject", authenticate, createProject);

router.get("/getProjects", authenticate, getProjects);

// GET /projects/:projectId/ (TODO)

export default router;
