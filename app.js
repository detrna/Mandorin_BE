import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { jwtHelper } from "./src/utility/jwtHelper.js";

import authRoutes from "./src/routes/authRoutes.js";
import clientRoutes from "./src/routes/clientRoutes.js";
import foremanRoutes from "./src/routes/foremanRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import proposalRoutes from "./src/routes/proposalRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import milestoneRoutes from "./src/routes/milestoneRoutes.js";
import revisionRoutes from "./src/routes/reviewRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";

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
app.use(`${prefix}/projects`, projectRoutes);
app.use(`${prefix}/milestones`, milestoneRoutes);
app.use(`${prefix}/reports`, reportRoutes);
app.use(`${prefix}/revisions`, revisionRoutes);

app.get("/cookie", (req, res) => {
  const refresh = req.cookies.refreshToken;
  const decoded = jwtHelper.verifyRefresh(refresh);
  res.json(decoded);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
