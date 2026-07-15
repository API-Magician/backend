import express from "express";

import { authenticate } from "../middleware/auth.js";
// import { createRequestMeta } from "../controllers/requestMetaControllers.js";
import { renameRequest } from "../controllers/requestMetaControllers.js";

const router = express.Router({ mergeParams: true });

router.put("/:requestId/renameRequest", authenticate, renameRequest);

export default router;
