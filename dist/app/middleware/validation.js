"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    schema.parse(req.body);
    next();
};
exports.validateRequest = validateRequest;
