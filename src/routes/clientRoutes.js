import { Router } from "express";
import { clientController } from "../controllers/clientController.js";
import { paginate } from "../middleware/paginate.js";

const router = Router();

router.get("/:id", clientController.findOne);
router.get("/", paginate(15), clientController.findAll);

export default router;
