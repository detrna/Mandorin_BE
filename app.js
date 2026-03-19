import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT;
const prefix = "/api";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import foremanRoutes from "./routes/foremanRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { jwtHelper } from "./utility/jwtHelper.js";

app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/clients`, clientRoutes);
app.use(`${prefix}/foreman`, foremanRoutes);
app.use(`${prefix}/reviews`, reviewRoutes);
app.use(`${prefix}/appointments`, appointmentRoutes);
app.get("/cookie", (req, res) => {
  const refresh = req.cookies.refreshToken;
  const decoded = jwtHelper.verifyRefresh(refresh);
  res.json(decoded);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
