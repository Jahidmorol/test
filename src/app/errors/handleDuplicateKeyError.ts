import { TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorMessage: string = `${extractedMessage} is already exists`;

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Title',
    errorMessage,
  };
};

export default handleDuplicateError;
