"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleDuplicateKeyError_1 = __importDefault(require("../errors/handleDuplicateKeyError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorMessage = '';
    if (err instanceof zod_1.ZodError) {
        const incomingError = (0, handleZodError_1.default)(err);
        statusCode = incomingError === null || incomingError === void 0 ? void 0 : incomingError.statusCode;
        message = incomingError === null || incomingError === void 0 ? void 0 : incomingError.message;
        errorMessage = incomingError === null || incomingError === void 0 ? void 0 : incomingError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const incomingError = (0, handleValidationError_1.default)(err);
        statusCode = incomingError === null || incomingError === void 0 ? void 0 : incomingError.statusCode;
        message = incomingError === null || incomingError === void 0 ? void 0 : incomingError.message;
        errorMessage = incomingError === null || incomingError === void 0 ? void 0 : incomingError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const incomingError = (0, handleCastError_1.default)(err);
        statusCode = incomingError === null || incomingError === void 0 ? void 0 : incomingError.statusCode;
        message = incomingError === null || incomingError === void 0 ? void 0 : incomingError.message;
        errorMessage = incomingError === null || incomingError === void 0 ? void 0 : incomingError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateKeyError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.default = globalErrorHandler;
