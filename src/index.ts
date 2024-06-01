import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { conncetDB } from "./config/db";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript checking....");
});

app.use("/api", router);
app.use(errorHandler);

conncetDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
