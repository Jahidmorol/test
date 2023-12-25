import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  let errorMessage: string = err.message;

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

export default handleCastError;
