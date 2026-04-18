import express from "express";
import {
  createCollection,
  getCollections,
} from "../controllers/collectionControllers.js";

import { authenticate } from "../middleware/auth.js";

import requestMetaRoutes from "./requestMetaRoutes.js";

const router = express.Router({ mergeParams: true });

router.post("/createCollection", authenticate, createCollection);

router.get("/getCollections", authenticate, getCollections);

router.use("/:collectionId/requests", requestMetaRoutes);

export default router;
