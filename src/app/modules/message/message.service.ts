// import { messageQueue } from "../queue/message.queue";
// import { sendWhatsAppMessage } from "../whatsApp/whatapp.service";
// import { Message } from "./message.model";

// export const sendMessageService = async (phone: string, message: string) => {
//   const saved = await Message.create({
//     phone,
//     message,
//   });

//   await messageQueue.add("sendMessage", {
//     messageId: saved._id,
//   });

//   await sendWhatsAppMessage(phone, message);

//   return saved;
// };

import { messageQueue } from "../queue/message.queue";
import { sendWhatsAppMessage } from "../whatsApp/whatapp.service";
import { Message } from "./message.model";

export const sendMessageService = async (phone: string, message: string) => {
  const saved = await Message.create({
    phone,
    message,
  });

  await messageQueue.add("sendMessage", {
    messageId: saved._id,
  });

  // WhatsApp send using active client
  await sendWhatsAppMessage(phone, message);

  await Message.findByIdAndUpdate(saved._id, {
    status: "sent",
  });

  return saved;
};

export const getMessagesFromDB = async () => {
  const result = await Message.find().sort({ createdAt: -1 });

  return result;
};
