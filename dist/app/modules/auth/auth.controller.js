"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const api_models_1 = require("../apimodels/api.models");
class AuthController {
    constructor(whatsappService) {
        this.whatsappService = whatsappService;
        this.getStatus = async (req, res, next) => {
            try {
                const status = this.whatsappService.getStatus();
                // Validate response data
                const validatedStatus = api_models_1.statusResponseSchema.parse(status);
                res.json({
                    success: true,
                    data: validatedStatus,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQR = async (req, res, next) => {
            try {
                const qrCode = this.whatsappService.getQRCode();
                let response;
                if (!qrCode) {
                    response = api_models_1.qrResponseSchema.parse({
                        message: "No QR code available. Client might be already authenticated.",
                    });
                }
                else {
                    response = api_models_1.qrResponseSchema.parse({ qr: qrCode });
                }
                res.json({
                    success: true,
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
