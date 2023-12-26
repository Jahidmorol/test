"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    let errorMessage = err.message;
    if (err.path && err.path.includes('_id')) {
        const invalidIdMatch = err.message.match(/"([^"]*)"/);
        const invalidId = invalidIdMatch ? invalidIdMatch[1] : null;
        if (invalidId) {
            errorMessage = `${invalidId} is not a valid ID!`;
        }
    }
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessage,
    };
};
exports.default = handleCastError;
