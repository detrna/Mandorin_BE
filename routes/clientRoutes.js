import { Router } from "express";
import { clientController } from "../controllers/clientController.js";

const router = Router();

router.get("/:id", clientController.findOne);
router.get("/", clientController.findAll);

export default router;
