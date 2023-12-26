"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    var _a, _b;
    let errorMessage = Object.values(err.errors)
        .map((val) => val.message)
        .join('. ');
    if (((_b = (_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a.categoryId) === null || _b === void 0 ? void 0 : _b.name) === 'CastError') {
        const invalidIdMatch = err.message.match(/"([^"]*)"/);
        const invalidId = invalidIdMatch ? invalidIdMatch[1] : null;
        if (invalidId) {
            errorMessage = `${invalidId} is not a valid ID!`;
        }
    }
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage,
    };
};
exports.default = handleValidationError;
