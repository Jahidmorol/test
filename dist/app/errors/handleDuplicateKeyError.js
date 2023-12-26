"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorMessage = `${extractedMessage} is already exists`;
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Title',
        errorMessage,
    };
};
exports.default = handleDuplicateError;
