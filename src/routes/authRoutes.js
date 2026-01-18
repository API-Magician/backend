import express from "express"; // why did i need this
import { register, login } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
