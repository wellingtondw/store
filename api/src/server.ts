import express, { Request, Response } from "express";
import compression from "compression";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import { dbProduction, dbTest } from "./config/database";
import { oneAndHalfMb } from "./utils/constants/mbCalculation";
import routes from "./routes";
// import "./models";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

//static files
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

//setup mongodb
const dbURI = isProduction ? dbProduction : dbTest;
mongoose
  .connect(dbURI)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

//global configs
if (!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable("x-powered-by");
app.use(compression());
app.use(express.json({ limit: oneAndHalfMb }));
app.use("/", routes);

//404 route
app.use((req, res, next) => {
  let err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 422, 401, 500, etc. route
app.use((err: any, req: Request, res: Response) => {
  const { message, status } = err;

  res.status(status || 500);

  if (status !== 404) {
    console.warn("Error:", message, new Date());
  }

  res.json({ errors: { message, status } });
});

export { app };
