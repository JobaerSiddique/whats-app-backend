import { Server } from "socket.io";
import { client } from "../whatsApp/whatapp.service";

export const initSocket = (io: Server) => {
  client.on("qr", (qr) => {
    io.emit("qr", qr);
  });

  client.on("ready", () => {
    console.log("WhatsApp Ready");
  });
};
