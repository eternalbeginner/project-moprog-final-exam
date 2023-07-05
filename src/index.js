import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import serverless from "serverless-http";

import routes from "routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["*"] }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/.netlify/functions/index", routes);

export const handler = serverless(app);

