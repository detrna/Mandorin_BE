import { Router } from "express";
import { projectController } from "../controllers/projectController.js";

const router = Router();

router.post("/", projectController.create);
router.get("/", projectController.findAll);
router.get("/:id", projectController.find);

export default router;
