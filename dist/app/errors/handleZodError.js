"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorMessage = err.issues.map((issue) => issue.message).join('. ');
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage,
    };
};
exports.default = handleZodError;
