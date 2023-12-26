import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  let errorMessage: string = Object.values(err.errors)
    .map(
      (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
        val.message,
    )
    .join('. ');

  if (err?.errors?.categoryId?.name === 'CastError') {
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

export default handleValidationError;
