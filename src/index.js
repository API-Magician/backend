import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/", authRoutes);

app.listen(3000, () => console.log(`Server running on port 3000`));
