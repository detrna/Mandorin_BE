import { Router } from "express";
import authRoutes from "./authRoutes.js";
import clientRoutes from "./clientRoutes.js";
import foremanRoutes from "./foremanRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import proposalRoutes from "./proposalRoutes.js";
import projectRoutes from "./projectRoutes.js";
import milestoneRoutes from "./milestoneRoutes.js";
import revisionRoutes from "./reviewRoutes.js";
import reportRoutes from "./reportRoutes.js";

const router = Router();

router.use(`/auth`, authRoutes);
router.use(`/clients`, clientRoutes);
router.use(`/foreman`, foremanRoutes);
router.use(`/appointments`, appointmentRoutes);
router.use(`/reviews`, reviewRoutes);
router.use(`/routerointments`, appointmentRoutes);
router.use(`/proposals`, proposalRoutes);
router.use(`/projects`, projectRoutes);
router.use(`/milestones`, milestoneRoutes);
router.use(`/reports`, reportRoutes);
router.use(`/revisions`, revisionRoutes);

export default router;
