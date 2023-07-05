import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import env from "libs/env";
import routes from "routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["*"] }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", routes);

app.listen(env.APP_PORT, () => {
  console.log(`App listening at port ${env.APP_PORT}`);
});

