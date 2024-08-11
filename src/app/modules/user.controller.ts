import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../shared/catch-async';
import sendResponse from '../../shared/send-response';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.createUser(req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User created',
    data,
  });
});

export const UserController = { createUser };
