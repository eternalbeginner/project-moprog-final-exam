import express from "express";

import * as controllers from "controllers/students";

const router = express.Router();

router.get("/", controllers.findAll);
router.get("/:studentId", controllers.findById);
router.post("/", controllers.create);
router.put("/:studentId", controllers.updateById);
router.delete("/:studentId", controllers.deleteById);

export default router;

