import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { ErrorRequestHandler } from 'express';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateKeyError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorMessage = '';

  if (err instanceof ZodError) {
    const incomingError = handleZodError(err);
    statusCode = incomingError?.statusCode;
    message = incomingError?.message;
    errorMessage = incomingError?.errorMessage;
  } else if (err?.name === 'ValidationError') {
    const incomingError = handleValidationError(err);
    statusCode = incomingError?.statusCode;
    message = incomingError?.message;
    errorMessage = incomingError?.errorMessage;
  } else if (err?.name === 'CastError') {
    const incomingError = handleCastError(err);
    statusCode = incomingError?.statusCode;
    message = incomingError?.message;
    errorMessage = incomingError?.errorMessage;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
