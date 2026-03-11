import { z } from "zod";

export const sendMessageSchema = z.object({
  phone: z.string().min(10),
  message: z.string().min(1),
});
