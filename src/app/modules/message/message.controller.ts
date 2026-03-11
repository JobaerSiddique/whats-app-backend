import { Request, Response } from "express";
import { getMessagesFromDB, sendMessageService } from "./message.service";

export const sendMessageController = async (req: Request, res: Response) => {
  const { phone, message } = req.body;

  const result = await sendMessageService(phone, message);

  res.json({
    success: true,
    data: result,
  });
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const result = await getMessagesFromDB();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get messages",
    });
  }
};
