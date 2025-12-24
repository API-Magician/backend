import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { authenticated as customer_routes } from "./routes/authRoutes.js";
import { general as genl_routes } from "./routes/generalRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(3000, () => console.log(`Server running on port 3000`));
