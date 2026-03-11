"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const message_route_1 = require("./app/modules/message/message.route");
const globalHandlerError_1 = __importDefault(require("./app/middleware/globalHandlerError"));
const rate_limit_middleware_1 = require("./app/middleware/rate-limit.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(rate_limit_middleware_1.limiter);
app.get("/", (req, res) => {
    res.send("Hurry  server is running 🚀");
});
app.use("/api/messages", message_route_1.messageRoutes);
app.use(globalHandlerError_1.default);
exports.default = app;
