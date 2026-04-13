import express from "express";
import { createCollection } from "../controllers/collectionControllers.js";

import { authenticate } from "../middleware/auth.js";



const router = express.Router({ mergeParams: true });

router.post("/createCollection", authenticate, createCollection);



export default router;
