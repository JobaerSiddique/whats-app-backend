import { Router } from "express";
import { AuthController } from "./auth.controller";

export const createAuthRouter = (authController: AuthController) => {
  const router = Router();

  router.get("/status", rateLimiter, authController.getStatus);
  router.get("/qr", rateLimiter, authController.getQR);

  return router;
};
