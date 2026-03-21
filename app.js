import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { jwtHelper } from "./utility/jwtHelper.js";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import foremanRoutes from "./routes/foremanRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";

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

app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/clients`, clientRoutes);
app.use(`${prefix}/foreman`, foremanRoutes);
app.use(`${prefix}/reviews`, reviewRoutes);
app.use(`${prefix}/appointments`, appointmentRoutes);
app.use(`${prefix}/proposals`, proposalRoutes);
app.get("/cookie", (req, res) => {
  const refresh = req.cookies.refreshToken;
  const decoded = jwtHelper.verifyRefresh(refresh);
  res.json(decoded);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
