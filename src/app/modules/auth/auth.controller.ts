import { Request, Response, NextFunction } from "express";
import { WhatsAppService } from "../whatsApp/whatapp.service";
import {
  qrResponseSchema,
  statusResponseSchema,
} from "../apimodels/api.models";

export class AuthController {
  constructor(private whatsappService: WhatsAppService) {}

  public getStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const status = this.whatsappService.getStatus();

      // Validate response data
      const validatedStatus = statusResponseSchema.parse(status);

      res.json({
        success: true,
        data: validatedStatus,
      });
    } catch (error) {
      next(error);
    }
  };

  public getQR = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qrCode = this.whatsappService.getQRCode();

      let response;
      if (!qrCode) {
        response = qrResponseSchema.parse({
          message:
            "No QR code available. Client might be already authenticated.",
        });
      } else {
        response = qrResponseSchema.parse({ qr: qrCode });
      }

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}
