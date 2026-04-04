import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectControllers.js";

import { authenticate } from "../middleware/auth.js";

import collectionRoutes from "./CollectionRoutes.js";

const router = express.Router();

router.post("/createProject", authenticate, createProject);

router.get("/getProjects", authenticate, getProjects);

// GET /:projectId/ (TODO)

router.use("/:projectId/collections", collectionRoutes);

export default router;
