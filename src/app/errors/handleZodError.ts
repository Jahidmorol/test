import { ZodError } from 'zod';

type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
};

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessage = err.issues.map((issue) => issue.message).join('. ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};

export default handleZodError;
