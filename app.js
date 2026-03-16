import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;
const prefix = "/api";

import authRoutes from "./routes/authRoutes.js";

app.use(`${prefix}/auth`, authRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
