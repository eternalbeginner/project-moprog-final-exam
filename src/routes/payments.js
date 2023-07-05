import express from "express";

import * as controllers from "controllers/payments";

const router = express.Router();

router.get("/", controllers.findAll);
router.get("/:paymentId", controllers.findById);
router.post("/", controllers.create);
router.put("/:paymentId", controllers.updateById);
router.delete("/:paymentId", controllers.deleteById);

export default router;

