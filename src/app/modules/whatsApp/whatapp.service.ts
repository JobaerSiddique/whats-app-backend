import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

export const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath:
      "C:\\Users\\Jobaer Siddique\\.cache\\puppeteer\\chrome\\win64-146.0.7680.66\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

export const initWhatsApp = () => {
  client.initialize();

  client.on("qr", (qr) => {
    console.log("Scan this QR with WhatsApp");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("WhatsApp Ready ✅");
  });

  client.on("disconnected", () => {
    console.log("WhatsApp Disconnected");
    client.initialize();
  });
};

export const sendWhatsAppMessage = async (phone: string, message: string) => {
  const chatId = `${phone}@c.us`;

  if (!client.info) {
    throw new Error("WhatsApp not ready");
  }

  const response = await client.sendMessage(chatId, message);

  return response;
};
