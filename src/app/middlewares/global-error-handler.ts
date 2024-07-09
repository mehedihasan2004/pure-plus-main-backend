/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ZodError } from 'zod';
import env from '../../env';
import ApiError from '../../errors/api-error';
import { GenericErrorMessage } from '../../interfaces/common';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import handleZodError from '../../errors/handle-zod-error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  env.NODE_ENV === 'development' &&
    console.error('~~ 👽 globalErrorHandler 👽 ~~', error);

  let statusCode: number = 500;
  let message: string = 'Something went wrong';
  let errorMessages: GenericErrorMessage[] = [];

  if (error instanceof ZodError) {
    const simplefiedError = handleZodError(error);

    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env.NODE_ENV !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
