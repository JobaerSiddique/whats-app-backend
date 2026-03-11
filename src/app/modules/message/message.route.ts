import express from "express";
import { getMessages, sendMessageController } from "./message.controller";
import { validateRequest } from "../../middleware/validation";
import { sendMessageSchema } from "./message.vaildation";

const router = express.Router();

router.post("/send", validateRequest(sendMessageSchema), sendMessageController);
// router.get("/", getMessages);
export const messageRoutes = router;
