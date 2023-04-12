/* eslint-disable import/first */
import * as dotenv from "dotenv";

dotenv.config();

import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cors from "cors";
import * as requestIp from "request-ip";
import router from "./routes";
import * as middlewares from "./middlewares";
import * as db from "./db";

const app = express();
const publicFolder = path.join(__dirname, "public");
const staticServe = express.static(publicFolder);

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(staticServe);
app.use(requestIp.mw()); // Add user ip address
app.use(middlewares.defaultLimiter);
app.use(middlewares.startTransaction);
app.use(middlewares.commitTransaction);
app.use(middlewares.rollbackTransaction);

// Routes
app.use("/api", router);
app.use("/*", (_, res) => {
  res.sendFile(path.join(publicFolder, "index.html"));
});

// Create tables if they don't exist
db.createTables();

export default app;
