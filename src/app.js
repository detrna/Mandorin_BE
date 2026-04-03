import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
