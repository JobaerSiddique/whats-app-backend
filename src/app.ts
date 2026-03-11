import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { messageRoutes } from "./app/modules/message/message.route";
import globalErrorHandler from "./app/middleware/globalHandlerError";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hurry  server is running 🚀");
});

app.use("/api/messages", messageRoutes);

app.use(globalErrorHandler);

export default app;
