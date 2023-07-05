import express from "express";

import paymentsRouter from "./payments";
import studentsRouter from "./students";

const router = express.Router();

router.use("/payments", paymentsRouter);
router.use("/students", studentsRouter);

export default router;

