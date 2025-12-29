import express from "express";
const private_users = express.Router();

import { authenticate } from "../middleware/auth.js";

private_users.use("/home", authenticate, (req, res, next) => {
  res.send(`Hello ${req.user.email}`);
});

export const authenticated = private_users;
