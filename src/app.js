import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { jwtHelper } from "./src/utility/jwtHelper.js";
import routes from "./src/routes/index.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

app.use("/api", routes);

app.get("/cookie", (req, res) => {
  const refresh = req.cookies.refreshToken;
  const decoded = jwtHelper.verifyRefresh(refresh);
  res.json(decoded);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
