import { Router } from "express";
import { DeviceController } from "./device.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", DeviceController.index);
router.post("/", DeviceController.create);
router.put("/:id", DeviceController.update);
router.delete("/:id", DeviceController.delete);

export { router as deviceRoutes };